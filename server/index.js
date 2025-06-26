const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 3001});

const rooms = {};

function getRoom(roomId) {
    if (!rooms[roomId]) {
        rooms[roomId] = {
            participants: [],
            timer: null,
        };
    }
    return rooms[roomId];
}

function broadcast(roomId, data) {
    const message = JSON.stringify(data);
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

function broadcastParticipants(roomId) {
    const room = getRoom(roomId);
    broadcast(roomId, {
        type: 'participants',
        roomId,
        participants: room.participants,
    });
}

function startTimer(roomId, duration) {
    const room = getRoom(roomId);

    if (room.timer?.intervalId) {
        clearInterval(room.timer.intervalId);
    }

    room.timer = {
        secondsLeft: duration,
        intervalId: setInterval(() => {
            const allVoted = room.participants.length > 0 && room.participants.every(p => p.hasVoted);

            if (!allVoted) {
                room.timer.secondsLeft--;
            }

            broadcast(roomId, {
                type: 'timer_tick',
                roomId,
                secondsLeft: room.timer.secondsLeft,
            });

            if (allVoted || room.timer.secondsLeft <= 0) {
                clearInterval(room.timer.intervalId);
                room.timer.intervalId = null;

                broadcast(roomId, {
                    type: 'timer_end',
                    roomId,
                    secondsLeft: room.timer.secondsLeft,
                });
            }
        }, 1000),
    };

    broadcast(roomId, {
        type: 'timer_tick',
        roomId,
        secondsLeft: duration,
    });
}

function resetRoom(roomId) {
    const room = getRoom(roomId);

    room.participants = room.participants.map((p) => ({
        ...p,
        vote: null,
        hasVoted: false,
    }));

    broadcastParticipants(roomId);
    startTimer(roomId, 60);
}

wss.on('connection', (ws) => {
    let connectedUserId = null;
    let connectedRoomId = null;

    ws.on('message', (msg) => {
        try {
            const data = JSON.parse(msg);
            const {type, roomId, participant, userId, vote, isNewUser} = data;

            const room = getRoom(roomId);

            switch (type) {
                case 'join':
                    connectedUserId = participant.id;
                    connectedRoomId = roomId;
                    room.participants = room.participants.filter(p => p.id !== participant.id);
                    room.participants.push(participant);
                    if (isNewUser) {
                        room.participants = room.participants.map(p => ({
                            ...p,
                            vote: null,
                            hasVoted: false,
                        }));
                        startTimer(roomId, 60);
                    }

                    broadcastParticipants(roomId);

                    if (!room.timer) {
                        startTimer(roomId, 60);
                    } else {
                        broadcast(roomId, {
                            type: 'timer_tick',
                            roomId,
                            secondsLeft: room.timer.secondsLeft,
                        });

                        if (!room.timer.intervalId) {
                            broadcast(roomId, {
                                type: 'timer_end',
                                roomId,
                                secondsLeft: room.timer.secondsLeft,
                            });
                        }
                    }

                    break;

                case 'vote':
                    room.participants = room.participants.map((p) =>
                        p.id === userId ? {...p, vote, hasVoted: true} : p
                    );
                    broadcastParticipants(roomId);
                    break;

                case 'reset':
                    resetRoom(roomId);
                    break;

                default:
                    console.warn('Unknown message type:', type);
            }
        } catch (err) {
            console.error('Failed to parse message:', err.message);
        }
    });

    ws.on('close', () => {
        if (!connectedRoomId || !connectedUserId) return;

        const room = getRoom(connectedRoomId);
        const before = room.participants.length;

        room.participants = room.participants.filter(p => p.id !== connectedUserId);

        if (room.participants.length !== before) {
            broadcastParticipants(connectedRoomId);
        }
    });

});

console.log('WebSocket server running on ws://localhost:3001');

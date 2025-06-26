import {useEffect, useRef, useState} from 'react';
import {useStore} from "../store/store";
import type {IParticipantModel, VoteValue} from "../types/types";
import {clearIsNewUserRoomSession, clearUserVoteRoomSession, getSession, saveSession} from "../utils/session";

export const useWebSocket = (roomId: string | undefined) => {
    const {
        setCurrentUserId,
        updateParticipants,
        setVote,
        resetVotes,
    } = useStore();

    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [timer, setTimer] = useState<number | null>(null);

    const userIdRef = useRef<string | null>(null);
    const nameRef = useRef<string | null>(null);

    useEffect(() => {
        if (!roomId) return;

        const {name, userId, vote, hasVoted, isNewUser} = getSession(roomId);

        if (!name || !userId) {
            console.warn(`Missing name: ${name} or userId: ${userId} or roomId: ${roomId} in sessionStorage`);
            return;
        }

        userIdRef.current = userId;
        nameRef.current = name;
        setCurrentUserId(userId);

        const ws = new WebSocket('ws://localhost:3001');
        setSocket(ws);

        const newParticipant: IParticipantModel = {
            id: userId,
            name,
            vote: vote as VoteValue || null,
            hasVoted,
            isCurrentUser: false,
        };

        ws.onopen = () => {
            ws.send(JSON.stringify({type: 'join', roomId, participant: newParticipant, isNewUser}));
            clearIsNewUserRoomSession(roomId)
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === 'participants' && data.roomId === roomId) {
                const newList = data.participants;

                updateParticipants(
                    roomId,
                    newList.map((p: IParticipantModel) => ({
                        ...p,
                        isCurrentUser: p.id === userIdRef.current,
                    }))
                );

                const self = newList.find((p: IParticipantModel) => p.id === userIdRef.current);
                if (self && !self.hasVoted) {
                    clearUserVoteRoomSession(roomId);
                }
            }

            if (data.type === 'timer_tick' && data.roomId === roomId) {
                setTimer(data.secondsLeft);
            }

            if (data.type === 'timer_end' && data.roomId === roomId) {
                setTimer(data.secondsLeft);
            }
        };

        return () => ws.close();
    }, [roomId]);

    const sendVote = (vote: VoteValue) => {
        if (socket && roomId && userIdRef.current) {
            saveSession({roomId, vote, hasVoted: true});
            socket.send(JSON.stringify({
                type: 'vote',
                roomId,
                userId: userIdRef.current,
                vote,
            }));
            setVote(roomId, userIdRef.current, vote);
        }
    };

    const sendReset = () => {
        if (socket && roomId) {
            clearUserVoteRoomSession(roomId);
            socket.send(JSON.stringify({type: 'reset', roomId}));
            resetVotes(roomId);
        }
    };

    return {sendVote, sendReset, timer};
};

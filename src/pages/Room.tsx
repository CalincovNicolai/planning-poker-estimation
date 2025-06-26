import {useParams} from 'react-router-dom'
import {useStore} from '../store/store'
import ParticipantList from '../components/participants/ParticipantList.tsx'
import Card from '../components/card/Card.tsx'
import {useWebSocket} from '../hooks/useWebSocket'
import Button from "../components/primitives/Button.tsx";
import {CARD_VALUES} from "../components/constants/constants.ts";
import LayoutCard from "../components/layout/LayoutCard.tsx";
import CopyToClipboardButton from "../components/primitives/CopyToClipboardButton.tsx";
import {generateRoomLabel} from "../utils/generateRoomLabel.ts";
import type {IParticipantModel} from "../types/types.ts";
import {useMemo} from "react";
import Loader from "../components/primitives/Loader.tsx";
import {FiClock} from "react-icons/fi";
import TimerDisplay from "../components/timer/TimerDisplay.tsx";
import InlineAlert from "../components/primitives/InlineAlert.tsx";
import {FiRefreshCcw} from "react-icons/fi";
import IconWrapper from "../components/primitives/IconWrapper.tsx";

export default function Room() {
    const {roomId = ''} = useParams();
    const participantsByRoom = useStore((state) => state.participantsByRoom);
    const participants = participantsByRoom[roomId] || [];
    const {sendVote, sendReset, timer} = useWebSocket(roomId);
    const roomLabel = useMemo(() => generateRoomLabel(roomId), [roomId]);
    const allVoted = participants.length > 0 && participants.every((p: IParticipantModel) => p.hasVoted);
    const isLoadingRoom = timer === null || participants.length === 0;

    return (
        <div className="flex flex-col flex-1 justify-center w-full items-center">
            <LayoutCard title={!isLoadingRoom && (
                <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span>Room: {roomLabel}</span>
                    <CopyToClipboardButton value={roomId || ''}/>
                </div>
            )
            }>
                {isLoadingRoom ? (
                    <div className="flex flex-1 items-center justify-center p-24">
                        <Loader label="Connecting to room..."/>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-6 w-full items-center lg:items-start justify-between">
                        <div className="w-full lg:w-1/3">
                            <ParticipantList participants={participants} revealVotes={allVoted}/>
                        </div>

                        <div className="flex-1 flex flex-col items-center gap-4">
                            <div className="flex gap-3 flex-wrap justify-center">
                                {CARD_VALUES.map((value) => (
                                    <Card
                                        key={value}
                                        value={value}
                                        onClick={() => sendVote(value)}
                                        disabled={allVoted || timer === 0}
                                    />
                                ))}
                            </div>

                            {timer === null ? (
                                <Loader label="Connecting to room..."/>
                            ) : (
                                <TimerDisplay seconds={timer}/>
                            )}
                            <InlineAlert show={timer === 0} icon={<FiClock/>} variant="warning">
                                Time’s up! Wait for reset to vote again.
                            </InlineAlert>

                            <Button
                                onClick={sendReset}
                                className="flex items-center justify-center gap-2 mt-4 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold cursor-pointer"
                            >
                                <IconWrapper icon={<FiRefreshCcw/>}/>
                                Reset Voting Round
                            </Button>
                        </div>
                    </div>
                )}
            </LayoutCard>
        </div>
    )
}

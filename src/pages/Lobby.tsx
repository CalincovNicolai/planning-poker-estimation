import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useStore} from '../store/store'
import Input from '../components/primitives/Input.tsx'
import Button from '../components/primitives/Button.tsx'
import LayoutCard from "../components/layout/LayoutCard.tsx";
import {v4 as uuidv4} from 'uuid';
import {saveSession} from "../utils/session.ts";
import {ROOM_ID_REGEX} from "../components/constants/constants.ts";
import type {IErrorMessageModel} from "../types/types.ts";
import InlineAlert from "../components/primitives/InlineAlert.tsx";
import {FiAlertCircle} from "react-icons/fi";

export default function Lobby() {
    const [inputName, setInputName] = useState('')
    const [inputRoomId, setInputRoomId] = useState('');
    const [errors, setErrors] = useState<IErrorMessageModel>({});
    const {setCurrentUserId} = useStore();
    const navigate = useNavigate();

    const handleJoinRoom = () => {
        const name = inputName.trim();
        const roomIdInput = inputRoomId.trim();
        const newErrors: IErrorMessageModel = {};

        if (!name) {
            newErrors.name = 'Name is required';
        }

        if (roomIdInput && !ROOM_ID_REGEX.test(roomIdInput)) {
            newErrors.roomId = 'Room ID must be a valid UUID';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const userId = uuidv4();
        const roomId = roomIdInput || uuidv4();
        setErrors({});
        setCurrentUserId(userId);
        saveSession({
            name,
            userId,
            roomId,
            isNewUser: true,
        });
        navigate(`/room/${roomId}`);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleJoinRoom()
    }

    return (
        <div className="w-full flex flex-col flex-1 justify-center items-center">
            <LayoutCard title="Planning Poker Lobby">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
                    <Input
                        type="text"
                        placeholder="Enter your name"
                        value={inputName}
                        onChange={(e) => {
                            setInputName(e.target.value);
                            if (errors.name) setErrors(prev => ({...prev, name: undefined}));
                        }}
                    />
                    <InlineAlert show={!!errors.name} icon={<FiAlertCircle/>} variant="danger">
                        {errors.name}
                    </InlineAlert>

                    <Input
                        type="text"
                        placeholder="Room ID (optional)"
                        value={inputRoomId}
                        onChange={(e) => {
                            setInputRoomId(e.target.value);
                            if (errors.roomId) setErrors(prev => ({...prev, roomId: undefined}));
                        }}
                    />
                    <InlineAlert show={!!errors.roomId} icon={<FiAlertCircle/>} variant="danger">
                        {errors.roomId}
                    </InlineAlert>

                    <Button
                        type="submit"
                        disabled={!!errors.name || !!errors.roomId}
                        className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold cursor-pointer disabled:bg-zinc-200 dark:disabled:bg-zinc-600 disabled:text-zinc-400 disabled:cursor-not-allowed transition-colors"
                    >
                        Join Room
                    </Button>
                </form>
            </LayoutCard>
        </div>
    )
}

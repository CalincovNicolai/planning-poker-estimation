import {useNavigate, useParams} from "react-router-dom";
import {FiArrowLeft} from 'react-icons/fi';
import Button from "../primitives/Button.tsx";
import {clearUserRoomSession, clearUserVoteRoomSession} from "../../utils/session.ts";
import type {IBackToLobbyButtonModel} from "../../types/types.ts";
import IconWrapper from "../primitives/IconWrapper.tsx";

export default function BackToLobbyButton({label, className}: IBackToLobbyButtonModel) {
    const navigate = useNavigate();
    const {roomId} = useParams<{ roomId: string }>();

    const handleLeaveRoom = () => {
        if (roomId) {
            clearUserRoomSession(roomId);
            clearUserVoteRoomSession(roomId);
        }

        navigate('/lobby');
    };

    return (
        <Button
            onClick={handleLeaveRoom}
            className={className}
        >
            <span className="flex gap-2 items-center justify-center">
                <IconWrapper icon={<FiArrowLeft/>}/>
                {label}
            </span>
        </Button>
    );
}

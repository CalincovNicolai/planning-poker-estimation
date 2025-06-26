import {
    USER_HAS_VOTED_KEY,
    USER_ID_KEY,
    USER_IS_NEW_USER_KEY,
    USER_NAME_KEY,
    USER_VOTE_KEY
} from "../components/constants/constants.ts";
import type {ISaveSessionModel} from "../types/types.ts";

export const saveSession = (
    {
        name,
        userId,
        roomId,
        vote,
        hasVoted,
        isNewUser
    }: ISaveSessionModel) => {
    if (name !== undefined) {
        sessionStorage.setItem(USER_NAME_KEY(roomId), name);
    }

    if (userId !== undefined) {
        sessionStorage.setItem(USER_ID_KEY(roomId), userId);
    }

    if (vote !== undefined) {
        sessionStorage.setItem(USER_VOTE_KEY(roomId), vote);
    }

    if (hasVoted !== undefined) {
        sessionStorage.setItem(USER_HAS_VOTED_KEY(roomId), JSON.stringify(hasVoted));
    }

    if (isNewUser !== undefined) {
        sessionStorage.setItem(USER_IS_NEW_USER_KEY(roomId), JSON.stringify(isNewUser));
    }
};

export const getSession = (roomId: string) => ({
    name: sessionStorage.getItem(USER_NAME_KEY(roomId)) || '',
    userId: sessionStorage.getItem(USER_ID_KEY(roomId)) || '',
    vote: sessionStorage.getItem(USER_VOTE_KEY(roomId)) || null,
    hasVoted: sessionStorage.getItem(USER_HAS_VOTED_KEY(roomId)) === 'true',
    isNewUser: sessionStorage.getItem(USER_IS_NEW_USER_KEY(roomId)) === 'true',
});

export const clearUserRoomSession = (roomId: string) => {
    sessionStorage.removeItem(USER_NAME_KEY(roomId));
    sessionStorage.removeItem(USER_ID_KEY(roomId));
};

export const clearUserVoteRoomSession = (roomId: string) => {
    sessionStorage.removeItem(USER_VOTE_KEY(roomId));
    sessionStorage.removeItem(USER_HAS_VOTED_KEY(roomId));
};

export const clearIsNewUserRoomSession = (roomId: string) => {
    sessionStorage.removeItem(USER_IS_NEW_USER_KEY(roomId));
};

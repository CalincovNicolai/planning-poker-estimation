import { create } from 'zustand';
import type { IParticipantModel, VoteValue } from '../types/types';

interface Store {
  currentUserId: string;
  participantsByRoom: Record<string, IParticipantModel[]>;
  setCurrentUserId: (id: string) => void;
  updateParticipants: (roomId: string, participants: IParticipantModel[]) => void;
  setVote: (roomId: string, userId: string, vote: VoteValue) => void;
  resetVotes: (roomId: string) => void;
}

export const useStore = create<Store>((set, get) => ({
  currentUserId: '',
  participantsByRoom: {},

  setCurrentUserId: (id) => set({ currentUserId: id }),

  updateParticipants: (roomId, participants) => {
    const current = get().participantsByRoom[roomId];
    const same = JSON.stringify(current) === JSON.stringify(participants);
    if (same) return;

    set((state) => ({
      participantsByRoom: {
        ...state.participantsByRoom,
        [roomId]: participants,
      },
    }));
  },

  setVote: (roomId, userId, vote) => {
    set((state) => {
      const list = state.participantsByRoom[roomId] || [];
      const updated = list.map((p) => (p.id === userId ? { ...p, vote, hasVoted: true } : p));

      return {
        participantsByRoom: {
          ...state.participantsByRoom,
          [roomId]: updated,
        },
      };
    });
  },

  resetVotes: (roomId) => {
    set((state) => {
      const list = state.participantsByRoom[roomId] || [];
      const reset = list.map((p) => ({
        ...p,
        vote: null,
        hasVoted: false,
      }));

      return {
        participantsByRoom: {
          ...state.participantsByRoom,
          [roomId]: reset,
        },
      };
    });
  },
}));

// store.ts
import create from 'zustand';

interface StoreState {
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  nickname: string;
  setNickname: (nickname: string) => void;
  babyname : string;
  setBabyname: (babyname: string) => void;
  dueDate :string
  setDueDate: (dueDate: string) => void;
  monthAfterBirth: string;
  setMonthAfterBirth: (monthAfterBirth: string) => void;

}

const useJoinStore = create<StoreState>((set) => ({
  currentPage: 1,
  nextPage: () => set((state) => ({ currentPage: Math.min(state.currentPage + 1, 3) })),
  prevPage: () => set((state) => ({ currentPage: Math.max(state.currentPage - 1, 1) })),
  nickname: '',
  setNickname: (nickname) => set({ nickname }),
  babyname: '',
  setBabyname: (babyname) => set({ babyname }),
  dueDate : '',
  setDueDate: (dueDate) => set({ dueDate }),
  monthAfterBirth: '',
  setMonthAfterBirth: (monthAfterBirth) => set({ monthAfterBirth }),

}));

export default useJoinStore;

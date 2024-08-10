// src/store.ts
import create from 'zustand';

interface StoreState {
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
}

const useStore = create<StoreState>((set) => ({
  currentPage: 1,
  nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
  prevPage: () => set((state) => ({ currentPage: state.currentPage - 1 })),
}));

export default useStore;

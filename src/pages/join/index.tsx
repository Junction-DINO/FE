// src/Join.tsx
import SetBabyInfo from '@/components/Join/SetBabyInfo';
import SetNickname from '@/components/Join/SetNickname';
import Layout from '@/components/layout/layout';
import React from 'react';
import create from 'zustand';

interface StoreState {
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
}

const useStore = create<StoreState>((set) => ({
  currentPage: 1,
  nextPage: () => set((state) => ({ currentPage: Math.min(state.currentPage + 1, 3) })),
  prevPage: () => set((state) => ({ currentPage: Math.max(state.currentPage - 1, 1) })),
}));

const Join = () => {
  const currentPage = useStore((state) => state.currentPage);
  const nextPage = useStore((state) => state.nextPage);
  const prevPage = useStore((state) => state.prevPage);

  return (
    <>
      {currentPage === 1 && <SetNickname />}
      {currentPage === 2 && <SetBabyInfo />}
      {currentPage === 3 && <div>페이지 3: 완료되었습니다!</div>}

      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          이전
        </button>
        <button onClick={nextPage} disabled={currentPage === 3}>
          다음
        </button>
      </div>
    </>
  );
};

export default Join;

// src/Join.tsx
import SetBabyInfo from '@/components/Join/SetBabyInfo';
import SetNickname from '@/components/Join/SetNickname';
import useJoinStore from '@/store/JoinStore';

const Join = () => {
    const { currentPage } = useJoinStore();
 
  return (
    <>
      {currentPage === 1 && <SetNickname />}
      {currentPage === 2 && <SetBabyInfo />}
    </>
  );
};

export default Join;

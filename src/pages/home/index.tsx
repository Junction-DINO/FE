import ImageSelectButton from '@/components/search/Camera/ImageButton';
import Chatbot from '@/components/chatbot/ChatBox';
import { SearchInput } from '@/components/search/SearchInput';
import Text from '@/components/common/Text';
import { useEffect, useState } from 'react';
import Love from '@/assets/Home/Love.svg';
import GridDiv from '@/components/home/GridDiv';
import getPregnancyCareText from '@/utils/getPregnancyCareText/getPregnancyCareText';
import { getUserData } from '@/services/UserAPI';
import calculatePregnancyWeeks from '@/utils/calculatePregnancyWeeks/calculatePregnancyWeeks';
import { useNavigate } from 'react-router-dom';

interface UserDataDTO {
  id: number; // 사용자 ID
  name: string; // 사용자 이름
  babyName: string; // 아기 이름 (null 허용)
  monthAfterBirth: string; // 출생 후 개월 수 (null 허용)
  dueDate: string; // 예정일 (null 허용)
}

export default function Home() {

  const [userData, setUserData] = useState<UserDataDTO>(); // 사용자 데이터 상태를 정의
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('accessToken'); // 토큰 저장
      if (token) {
        try {
          const data = await getUserData(token); // 사용자 데이터 가져오기
          setUserData(data.data); // 가져온 데이터로 상태 업데이트
        } catch (error) {
          navigate('/login')
          console.error('사용자 데이터 가져오기 실패:', error);
        }
      } else{
        navigate('/login')

      }
    };

    fetchUserData(); // 사용자 데이터 가져오기 호출
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  const dueDateOrMonthAfterBirth = userData?.dueDate || userData?.monthAfterBirth  || "기본값"; // 기본값 설정
  return (
    <div className="flex-1 flex-col w-full flex justify-center h-auto scrollbar-hide overflow-y-auto">
      <main className="max-w-[430px] w-full bg-[#FBFBFB] relative mx-auto pb-[180px] ">
        <div className="relative w-full h-auto overflow-hidden px-4">
          <>
            <div className="py-[8%] flex justify-between">
              <div className="px-4">
                <>
                  <Text text={'Hi'} align="" />
                  <Text text={userData?.name} align="" />
                </>
                <p className="text-[#49C09C] mt-7">{userData?.babyName}</p>
              </div>
              <div className="relative">
                <img className="mr-2" src={Love} alt="x" />
                <Chatbot /> {/* Chatbot 컴포넌트를 이 위치에 추가 */}
              </div>
            </div>
            <div className="grid grid-rows-[200px,1fr,1fr] gap-2">
              <GridDiv height="h-[200px]">
                {userData?.dueDate && <p className="text-customGrey">{calculatePregnancyWeeks(userData?.dueDate)}</p>}
                {userData?.monthAfterBirth && <p className="text-customGrey">{getAgeText(userData?.monthAfterBirth)}</p>}
                

                <p className="">
                  - {getPregnancyCareText(dueDateOrMonthAfterBirth).firstText}
                </p>
                <p className=""> - {getPregnancyCareText(dueDateOrMonthAfterBirth).secondText}</p>
              </GridDiv>
              <div className="grid grid-cols-[1.7fr_1.3fr] gap-2 row-span-1 h-full">
                <GridDiv height="h-40" grid="col-span-1"> {/* 첫 번째 그리드 */}
                  <p className=""> - {getPregnancyCareText(dueDateOrMonthAfterBirth).f1}</p>
                  <p className=""> - {getPregnancyCareText(dueDateOrMonthAfterBirth).f2}</p>
                  <p className=""> - {getPregnancyCareText(dueDateOrMonthAfterBirth).f3}</p>
                </GridDiv>
                <GridDiv height="h-40"> {/* 두 번째 그리드 */}
                  <p className="text-customGrey">
                    Last week’s <br />
                    score
                  </p>
                </GridDiv>
              </div>
              <GridDiv height="h-40"></GridDiv>
            </div>

          </>
        </div>
        <div className="fixed bottom-0 w-full max-w-[430px]">
          <SearchInput />
          <ImageSelectButton />
        </div>
      </main>
    </div>
  );
}

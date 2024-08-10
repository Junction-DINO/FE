import ImageSelectButton from '@/components/search/Camera/ImageButton';
import Chatbot from '@/components/chatbot/ChatBox';
import { SearchInput } from '@/components/search/SearchInput';
import Text from '@/components/common/Text';
import { useState } from 'react';
import Love from '@/assets/Home/Love.svg';
import GridDiv from '@/components/home/GridDiv';
import getPregnancyCareText from '@/utils/getPregnancyCareText/getPregnancyCareText';

export default function Home() {
  const [nickname] = useState<string>('nickname');
  // 예시 사용
  const dueDate = '2024-02-31'; // 예시 출산 예정일
  console.log(getPregnancyCareText(dueDate));
  return (
    <div className="flex-1 flex-col w-full flex justify-center h-auto scrollbar-hide overflow-y-auto">
      <main className="max-w-[430px] w-full bg-[#FBFBFB] relative mx-auto pb-[180px] ">
        <div className="relative w-full h-auto overflow-hidden px-4">
          <>
            <div className="py-[8%] flex justify-between">
              <div className="px-4">
                <>
                  <Text text={'Hi'} align="" />
                  <Text text={nickname} align="" />
                </>
                <p className="text-[#49C09C] mt-7">{'babyname'}</p>
              </div>
              <div>
                <img className="mr-2" src={Love} alt="x" />
              </div>
            </div>
            <div className="grid grid-rows-[200px,1fr,1fr] gap-2">
              <GridDiv height="h-[200px]">
                <p className="text-customGrey">8th month ago</p>
                <p className=""> - {getPregnancyCareText(dueDate).firstText}</p>
                <p className=""> - {getPregnancyCareText(dueDate).secondText}</p>
              </GridDiv>
              <div className="grid grid-cols-[1.7fr_1.3fr] gap-2 row-span-1 h-full">
  <GridDiv height="h-40" grid="col-span-1"> {/* 첫 번째 그리드 */}
    <p className=""> - {getPregnancyCareText(dueDate).f1}</p>
    <p className=""> - {getPregnancyCareText(dueDate).f2}</p>
    <p className=""> - {getPregnancyCareText(dueDate).f3}</p>
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

            <Chatbot />
          </>
        </div>
        <div className='fixed bottom-0 w-full max-w-[430px]'>
          <SearchInput />
          <ImageSelectButton />
        </div>
      </main>
    </div>
  );
}

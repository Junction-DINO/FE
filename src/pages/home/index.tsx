import ImageSelectButton from '@/components/Camera/ImageButton';
import Chatbot from '@/components/chatbot/ChatBox';
import { SearchInput } from '@/components/search/SearchInput';
import Text from '@/components/common/Text';
import { useState } from 'react';
import Love from '@/assets/Home/Love.svg';
import GridDiv from '@/components/home/GridDiv';

export default function Home() {
  const [nickname] = useState<string>('nickname');

  return (
    <div className="flex-1 flex-col w-full flex justify-center h-auto scrollbar-hide overflow-y-auto">
      {/* overflow-y-auto로 수정 */}
      <main className="max-w-[430px] w-full bg-[#FBFBFB] relative mx-auto pb-[180px] ">
        <div className="relative w-full h-auto overflow-hidden px-4">
          {' '}
          {/* h-auto로 수정 */}
          <>
            <div className="py-[8%] flex justify-between">
              <div className="px-4">
                <Text text={'Hi'} align="" />
                <Text text={nickname} align="" />

                <p className="text-[#49C09C] mt-7">{'babyname'}</p>
              </div>
              <div>
                <img className="mr-2" src={Love} alt="x" />
              </div>
            </div>
            {/* <SearchInput /> */}
            <div className="grid grid-rows-[200px,1fr,1fr] gap-2">
              {' '}
              {/* 첫 번째 행은 200px, 나머지는 유동적으로 설정 */}
              <GridDiv height="h-[200px]">
                <p className="text-custionGrey">8th month ago</p>
                <p className="">content</p>
              </GridDiv>
              <div className="grid grid-cols-3 gap-2 row-span-1 h-full">
                {' '}
                {/* h-full로 설정하여 유동적 높이 유지 */}
                <GridDiv height="h-40" grid="col-span-2">
                  {' '}
                  {/* 가운데 아이템을 1.5 비율로 설정 */}
                </GridDiv>
                <GridDiv height="h-40">
                  <p className="text-custionGrey">
                    Last week’s <br />
                    score
                  </p>
                </GridDiv>
              </div>
              <GridDiv height="h-40"></GridDiv>
            </div>

            <Chatbot />
            <SearchInput />
            <ImageSelectButton />
          </>
        </div>
      </main>
    </div>
  );
}

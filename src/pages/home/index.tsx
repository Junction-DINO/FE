import ImageSelectButton from '@/components/Camera/ImageButton';
import Chatbot from '@/components/chatbot/ChatBox';
import { SearchInput } from '@/components/search/SearchInput';

export default function Home() {
  return (
    <div className="flex-1 flex-col w-full flex justify-center">
      <main className="max-w-[430px] w-full bg-white  relative mx-auto">
        <div className="relative w-full h-screen overflow-hidden">
          <>
            <Chatbot />
            <SearchInput />
            <ImageSelectButton />
          </>
        </div>
      </main>
    </div>
  );
}

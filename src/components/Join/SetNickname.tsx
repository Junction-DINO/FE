import Layout from "../layout/layout";
import JoinText from "@/components/Join/JoinText"; // Text 컴포넌트의 경로를 맞춰주세요.
import JoinInput from "./JoinInput";
import WelcomLogo from "@/assets/Join/WelcomLogo.svg";
import useJoinStore from "@/store/JoinStore";

const SetNickname = () => {

  const Words = [
    { text: 'Please enter ' },
    { text: 'your nickname ' }
  ];

  const { nickname, setNickname, nextPage } = useJoinStore();

  const handleNext = () => {
    if (nickname) {
      nextPage(); // 닉네임이 있을 때 다음 페이지로 이동
    } else {
      // 닉네임이 없을 경우 사용자에게 알림을 추가할 수 있음
      alert("닉네임을 입력해주세요.");
    }
  };


  return (
    <Layout>
      <div className="flex flex-col h-screen px-6"> {/* 가운데 정렬을 위한 클래스 추가 */}

        <JoinText
          text='Welcom !' align='text-center' marginTop='mt-[20%]' marginBottom='mb-[36px]' />

        <div className="flex justify-center mb-[80px]"> {/* 이미지를 감싸는 div에 Flexbox 추가 */}
          <img
            className="w-[140px] h-[150px]"
            src={WelcomLogo}
            alt='Welcome Logo'
          />
        </div>

        {Words.map((words, index) => (
          <JoinText key={index} text={words.text} align='' />
        ))}

        <JoinInput
          placeholder="nickname"
          marginTop='mt-6'
          value={nickname} // 상태를 JoinInput에 전달
          onChange={(e) => setNickname(e.target.value)} // 상태 업데이트
        />
      </div>
      <button className={`fixed bottom-10 left-0 right-0 mx-auto max-w-[430px] text-center cursor-pointer py-[18px] px-[42px]
    ${nickname ? 'bg-customPink text-white' : 'bg-[#FFF] text-customPink border border-[#EF8491] opacity-50'}
    w-[124px] h-[60px] flex items-center justify-center rounded-[40px]`}
        onClick={handleNext}
      >
        <span className="w-10">Next</span>
      </button>


    </Layout>
  );
}

export default SetNickname;

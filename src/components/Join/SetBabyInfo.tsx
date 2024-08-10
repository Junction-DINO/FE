import { useEffect, useState } from "react";
import Layout from "../layout/layout";
import JoinInput from "./JoinInput";
import JoinText from "./JoinText";
import DownVector from "@/assets/Join/DownVector.svg";
import UpVector from "@/assets/Join/UpVector.svg";
import useJoinStore from "@/store/JoinStore";
import Back from "@/assets/Join/Back.svg";

const SetBabyInfo = () => {
  const { nickname, babyname, setBabyname, dueDate, setDueDate, monthAfterBirth, setMonthAfterBirth, prevPage } = useJoinStore();

  const Words = [
    { text: 'Please enter ' },
    { text: 'your baby\'s information ' },
  ];

  const [showOptions, setShowOptions] = useState(false); // 선택지 표시 여부
  const [selectedOption, setSelectedOption] = useState("When is the due date"); // 선택한 옵션

  const options = [
    "When is the due date",
    "Months after birth"
  ];

  const handleOptionClick = (option: any) => {
    setSelectedOption(option); // 선택한 옵션 설정
    setShowOptions(false); // 옵션 선택 후 목록 숨기기
  };

  useEffect(() => {
    setMonthAfterBirth('');
    setDueDate('');
  }, [selectedOption]);

  const handleNext = () => {
    // 다음 단계로 넘어가는 로직 추가
    if (nickname && babyname && (dueDate.length === 10 || monthAfterBirth)) {
      console.log(nickname, babyname, dueDate, monthAfterBirth)
    }
    else {
      alert('Not enough field')
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-screen px-7">

        <div className="mt-[10%] mb-[120px]">
          <img
            className='cursor-pointer mb-[15%] '
            onClick={prevPage}
            src={Back} alt='x' />
          {Words.map((words, index) => (
            <JoinText key={index} text={words.text} align='' />
          ))}
        </div>
        <div className="">
          <p className={`text-costomMint`}>What’s the baby’s name</p>
          <JoinInput
            placeholder="name"
            value={babyname} // 상태를 JoinInput에 전달
            onChange={(e) => setBabyname(e.target.value)} // 상태 업데이트
          />
        </div>

        <div className="p-2 w-auto rounded-[8px] border border-[#EAEAEA] bg-[#F7F7F7] mt-7 mb-1">
          <div className="flex-row space-x-2 cursor-pointer"
            onClick={() => setShowOptions((prev) => !prev)}
          >
            <button>
              <img src={showOptions ? UpVector : DownVector} alt='Toggle options' />
            </button>
            <span className="text-costomMint">{selectedOption}</span>
          </div>
          {showOptions && (
            <div>
              {options
                .filter(option => option !== selectedOption) // 선택되지 않은 옵션만 필터링
                .map((option, index) => (
                  <p
                    key={index}
                    className={`text-[#D8D8D8] mx-6`}
                    style={{ cursor: 'pointer', color: 'black' }} // 기본 색상
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </p>
                ))}
            </div>
          )}
        </div>
        {selectedOption === 'When is the due date' ?
          <JoinInput
            placeholder="due date (format: YYYY-MM-DD)"
            value={dueDate} // 상태를 JoinInput에 전달
            onChange={(e) => setDueDate(e.target.value)} // 상태 업데이트
          />
          :
          <JoinInput
            placeholder="Months after birth (only number)"
            value={monthAfterBirth}
            onChange={(e) => {
              const value = e.target.value;
              // 숫자만 허용
              if (/^\d*$/.test(value)) {
                setMonthAfterBirth(value);
              }
            }}
          />
        }

      </div>

      <button className={`fixed bottom-10 left-0 right-0 mx-auto max-w-[430px] text-center cursor-pointer py-[18px] px-[42px]
        ${babyname && (dueDate || monthAfterBirth) ? 'bg-customPink text-white hover:bg-opacity-80 active:bg-opacity-70' : 'bg-[#FFF] text-customPink border border-[#EF8491] opacity-50 cursor-not-allowed'}
        w-[124px] h-[60px] flex items-center justify-center rounded-[40px] transition duration-200`}
        onClick={babyname && (dueDate || monthAfterBirth) ? handleNext : undefined}
      >
        <span className="w-10">Next</span>
      </button>

    </Layout>
  );
}

export default SetBabyInfo;

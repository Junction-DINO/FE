import { useEffect, useState } from "react";
import Layout from "../layout/layout";
import JoinInput from "./JoinInput";
import JoinText from "./JoinText";
import DownVector from "@/assets/Join/DownVector.svg";
import UpVector from "@/assets/Join/UpVector.svg";
import useJoinStore from "@/store/JoinStore";
import Back from "@/assets/Join/Back.svg";
import { postUserData } from "@/services/UserAPI";
import { useNavigate } from "react-router-dom";

const SetBabyInfo = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const { nickname, babyname, setBabyname, dueDate, setDueDate, monthAfterBirth, setMonthAfterBirth, prevPage } = useJoinStore();

  const Words = [
    { text: 'Please enter ' },
    { text: 'your baby\'s information ' },
  ];

  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("When is the due date");
  const options = ["When is the due date", "Months after birth"];

  const handleOptionClick = (option : any) => {
    setSelectedOption(option);
    setShowOptions(false);
  };

  useEffect(() => {
    setMonthAfterBirth('');
    setDueDate('');
  }, [selectedOption]);

const handleNext = async () => {
    if (nickname && babyname && (dueDate.length === 10 || monthAfterBirth)) {
      try {
        const response = await postUserData(String(token), nickname, babyname, monthAfterBirth,dueDate );
        navigate('/')
        console.log('사용자 데이터 생성 성공:', response);
        // 다음 단계로 이동하거나 성공 메시지 표시
      } catch (error) {
        console.error('사용자 데이터 생성 실패:', error);
        alert('사용자 데이터 생성에 실패했습니다. 다시 시도해 주세요.');
      }
    } else {
      alert('모든 필드를 올바르게 입력해 주세요.');
    }
  };


  return (
    <Layout>
      <div className="flex flex-col h-screen px-7">
        <div className="mt-[10%] mb-[120px]">
          <img
            className='cursor-pointer mb-[15%]'
            onClick={prevPage}
            src={Back} alt='x' />
          {Words.map((words, index) => (
            <JoinText key={index} text={words.text} align='' />
          ))}
        </div>
        <div>
          <p className={`text-costomMint`}>What’s the baby’s name</p>
          <JoinInput
            placeholder="name"
            value={babyname}
            onChange={(e) => setBabyname(e.target.value)}
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
                .filter(option => option !== selectedOption)
                .map((option, index) => (
                  <p
                    key={index}
                    className={`text-[#D8D8D8] mx-6`}
                    style={{ cursor: 'pointer', color: 'black' }}
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
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          :
          <JoinInput
            placeholder="Months after birth (only number)"
            value={monthAfterBirth}
            onChange={(e) => {
              const value = e.target.value;
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

import { useState } from "react";
import Layout from "../layout/layout";
import JoinInput from "./JoinInput";
import JoinText from "./JoinText";
import DownVector from "@/assets/Join/DownVector.svg";
import UpVector from "@/assets/Join/UpVector.svg";

const SetBabyInfo = () => {
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

    const handleOptionClick = (option : any) => {
        setSelectedOption(option); // 선택한 옵션 설정
        setShowOptions(false); // 옵션 선택 후 목록 숨기기
    };

    return (
        <Layout>
            <div className="flex flex-col h-screen px-7">
                <div className="mt-[25%] mb-[120px]">
                    {Words.map((words, index) => (
                        <JoinText key={index} text={words.text} align='' />
                    ))}
                </div>
                <div className="">
                    <p className={`text-costomMint`}>What’s the baby’s name</p>
                    <JoinInput placeholder="name" />
                </div>


                <div className="p-2 w-auto rounded-[8px] border border-[#EAEAEA] bg-[#F7F7F7] mt-7 mb-1">
                    <div className="flex-row space-x-2 cursor-pointer"
                         onClick={() => setShowOptions((prev) => !prev)}
                    >
                        <button >
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
                <JoinInput 
                    placeholder="deu date"
                    />
            </div>
        </Layout>
    );
}

export default SetBabyInfo;

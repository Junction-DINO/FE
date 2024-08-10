import Layout from "../layout/layout";
import JoinText from "@/components/Join/JoinText"; // Text 컴포넌트의 경로를 맞춰주세요.
import JoinInput from "./JoinInput";
import WelcomLogo from "@/assets/Join/WelcomLogo.svg";

const SetNickname = () => {
    const Words = [

        {
            text: 'Please enter ',
        },
        {
            text: 'your nickname ',
        }
    ];

    return (
        <Layout>
            <div className="flex flex-col h-screen px-6"> {/* 가운데 정렬을 위한 클래스 추가 */}

                <JoinText 
                    text='Welcom !' align='text-center' marginTop='mt-[20%]' marginBottom='mb-[36px]'/>

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
                    />
            </div>
        </Layout>
    );
}

export default SetNickname;

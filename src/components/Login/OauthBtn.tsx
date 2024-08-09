interface OauthBtnProps {
    buttonText: string; // 버튼 텍스트
    iconUrl: string; // 아이콘 URL
    background: string; // 버튼 배경색
}

const OauthBtn = ({ buttonText, iconUrl, background }: OauthBtnProps) => {
    return (
        <button 
            className={`w-[90%] flex items-center justify-center text-gray-800 font-semibold py-2 px-4 rounded transition duration-300`}
            style={{ background: background }}
        >
            <img 
                className="mr-2" 
                src={iconUrl} 
                alt="Logo" 
                width="24" 
                height="24" 
            />
            {buttonText}
        </button>
    );
}

export default OauthBtn;

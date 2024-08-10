interface OauthBtnProps {
  buttonText: string; // 버튼 텍스트
  iconUrl: string; // 아이콘 URL
  background: string; // 버튼 배경색
  link : string; //오어스
  handleLogin : (link : string) => void;
}

const OauthBtn = ({ buttonText, iconUrl, background,link, handleLogin }: OauthBtnProps) => {
  return (
    <button
      className={` flex items-center justify-center text-gray-800 font-semibold py-4 px-[88px] rounded-[40px] hover:bg-opacity-80 active:bg-opacity-70 transition duration-300`}
      style={{ background: background }}
      onClick={()=>handleLogin(link)}
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

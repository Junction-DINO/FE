import OauthBtn from "@/components/Login/OauthBtn";
import Logo from "@/assets/Login/Logo.svg";
import kakao from "@/assets/Login/kakao.svg";
import google from "@/assets/Login/google.svg";

const Login = () => {
  const handleLogin = (link: string) => {
    localStorage.removeItem("accessToken");
    window.location.href = `${import.meta.env.VITE_REACT_APP_SERVER}/oauth2/authorization/${link}`;
  };

  const OAuthButtonProps = [
    {
      buttonText: 'Continue with Kakao',
      icon: kakao, // 아이콘을 직접 가져옴
      background: '#FFC400',
      link: 'kakao',
    },
    {
      buttonText: 'Continue with Google',
      icon: google, // 아이콘을 직접 가져옴
      background: '#fff',
      link: 'google',
    },
  ];

  return (
    <div className="flex items-center justify-center h-screen">
      <main className="max-w-[430px] w-full bg-customPink relative mx-auto p-4 h-screen">
        <div className="flex flex-col">
          <img 
            className='h-[400px] mt-[10%] mx-auto ' 
            src={Logo} 
            alt='Logo' 
          />
          <div className="flex flex-col items-center justify-center space-y-4">
            {OAuthButtonProps.map((props, index) => (
              <OauthBtn
                key={index}
                buttonText={props.buttonText}
                iconUrl={props.icon} // iconUrl 대신 icon 사용
                background={props.background}
                link={props.link}
                handleLogin={handleLogin}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;

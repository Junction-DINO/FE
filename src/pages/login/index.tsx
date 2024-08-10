import OauthBtn from "@/components/Login/OauthBtn";

const Login = () => {

  const handleLogin = (link : string) => {
    localStorage.removeItem("accessToken");

    window.location.href = `${import.meta.env.VITE_REACT_APP_SERVER_LOGIN}/oauth2/authorization/${link}`;
  };

  const OAuthButtonProps = [
    {
      buttonText: 'Continue to Kakao',
      iconUrl: `@/assets/Login/kakao.svg`,
      background: '#FFC400',
      link: 'kakao',
    },
    {
      buttonText: 'Continue to Google',
      iconUrl: 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg',
      background: '#fff',
      link: 'google',
    }
  ];

  return (
    <div className="flex items-center justify-center h-screen">
      <main className="max-w-[430px] w-full bg-customPink relative mx-auto p-4 h-screen">
        <div className="flex flex-col items-center justify-center">
          {OAuthButtonProps.map((props, index) => (
            <OauthBtn
              key={index}
              buttonText={props.buttonText}
              iconUrl={props.iconUrl}
              background={props.background}
              link={props.link}
              handleLogin={handleLogin}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Login;

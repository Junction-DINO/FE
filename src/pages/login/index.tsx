import OauthBtn from "@/components/Login/OauthBtn";

const Login = () => {
    const OAuthButtonProps = [
        {
            buttonText: '카카오로 로그인하기',
            iconUrl: 'https://www.kakaocdn.net/kakaocorp/brand/kakaologo.png',
            background: '#FFC400'
        },
        {
            buttonText: '구글로 로그인하기',
            iconUrl: 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg',
            background: '#fff'
        }
    ];

    return (
        <div className="flex items-center justify-center h-screen">
            <main className="max-w-[430px] w-full bg-white relative mx-auto p-4">
                <div className="flex flex-col items-center justify-center">
                    {OAuthButtonProps.map((props, index) => (
                        <OauthBtn 
                            key={index} 
                            buttonText={props.buttonText} 
                            iconUrl={props.iconUrl} 
                            background={props.background}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Login;

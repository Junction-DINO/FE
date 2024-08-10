import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserData } from "@/services/UserAPI"; // getUserData 함수 import

const fetchData = async () => {
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get("access_token");

  if (accessToken) {
    localStorage.setItem('accessToken', accessToken); // 토큰 저장
    const userData = await getUserData(accessToken); // 사용자 데이터 가져오기
    console.log('사용자 데이터:', userData); // 사용자 데이터를 콘솔에 출력
    return userData;
  }
  
  throw new Error('Access token not found'); // 토큰이 없을 경우 에러 발생
};

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectAfterFetch = async () => {
      try {
        const userData = await fetchData(); // 데이터 가져오기
        
        if (userData.data.babyName === null) {
          navigate('/join'); // 빈 경우 join 페이지로 리다이렉트
        } else {
          // navigate('/'); // 홈 페이지로 리다이렉트
        }
      } catch (error) {
        console.error('에러 발생:', error);
        navigate('/login'); // 에러 발생 시 로그인 페이지로 리다이렉트
      }
    };

    redirectAfterFetch();
  }, [navigate]); // navigate가 변경될 때마다 useEffect가 재실행됨

  return (<h2 className={"text-white"}>로그인중입니다....</h2>);
};

export default Redirect;

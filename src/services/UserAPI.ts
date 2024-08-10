import { api } from './client';
import { AxiosResponse } from 'axios';

interface UserResponseDTO {
  code: string; // "SUCCESS"
  data: UserDataDTO; // 사용자 데이터
  message: string; // "OK"
  status: number; // 200
}

interface UserDataDTO {
  id: number; // 사용자 ID
  name: string; // 사용자 이름
  babyName: string | null; // 아기 이름 (null 허용)
  monthAfterBirth: string | null; // 출생 후 개월 수 (null 허용)
  dueDate: string | null; // 예정일 (null 허용)
}

export const getUserData = async (token: string): Promise<UserResponseDTO> => {
  const url = `${import.meta.env.VITE_REACT_APP_SERVER_LOGIN}/api/v1/users`;
  try {
    // AxiosResponse<UserResponseDTO>를 사용하여 응답 처리
    const response: AxiosResponse<UserResponseDTO> = await api.get<UserResponseDTO>(url, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'ngrok-skip-brower-warning': 'true',
        Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 추가
      },
    });
    
    return response.data; // 응답의 data 속성 반환
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('Failed to fetch user info data');
  }
};

// 사용 예시
const fetchUserData = async () => {
  try {
    const token = 'your_token_here'; // 실제 토큰을 여기에 넣어주세요
    const userData = await getUserData(token); // UserResponseDTO 받기
    console.log(userData.data); // data에 접근
    // 예: userData.data.babyName에 접근
  } catch (error) {
    console.error('사용자 데이터 가져오기 실패:', error);
  }
};

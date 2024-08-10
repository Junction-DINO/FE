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

// 사용자 데이터 가져오기
export const getUserData = async (token: string): Promise<UserResponseDTO> => {
  const url = `${import.meta.env.VITE_REACT_APP_SERVER}/api/v1/users`;
  try {
    const response: AxiosResponse<UserResponseDTO, any> = await api.get<UserResponseDTO>(url, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'ngrok-skip-brower-warning': 'true',
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data; // 응답의 data 속성 반환
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('Failed to fetch user info data');
  }
};

// 사용자 데이터 생성하기
export const postUserData = async (
  accessToken: string,
  name : string,
  babyName: string ,
  monthAfterBirth: string | null,
  dueDate: string | null ,
): Promise<any> => {
  const url = `${import.meta.env.VITE_REACT_APP_SERVER}/api/v1/users`;
  console.log(name,babyName,monthAfterBirth,dueDate)
  try {
    const response = await api.post(url, {
      name : name,
      babyName: babyName,
      monthAfterbirth: monthAfterBirth,
      dueDate: dueDate,
    }, {
      withCredentials: true,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
        Authorization: `Bearer ${accessToken}`,
      }, 
    });

    console.log('Response:', response.data);
  } catch (error) {
    console.error('메시지를 하지 못했습니다:', error);
    throw new Error('메시지를 하지 못했습니다');
  }
};


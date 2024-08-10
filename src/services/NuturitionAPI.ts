import { NutritionDTO } from '@/type/product';
import { api } from './client';

interface GetTermsDataParams {
  query: string;
}

export const getNutritionData = async ({ query }: GetTermsDataParams): Promise<NutritionDTO[]> => {
  const url = `https://e44f-211-168-232-133.ngrok-free.app/api/v1/search?q=${query}`;
  try {
    const { data } = await api.get<{ data: NutritionDTO[] }>(url, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': true,
      },
    });

    console.log(data);
    return data.data;
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('Failed to fetch nutrition data');
  }
};

import { Nutrition } from '@/type/product';
import { api } from './client';

interface GetTermsDataParams {
  query: string;
  size: number;
}

export const getNutritionData = async ({
  query,
  size = 10,
}: GetTermsDataParams): Promise<Nutrition[]> => {
  const url = `/api/v1/search?q=${query}&size=${size}`;
  try {
    const { data }: { data: Nutrition[] } = await api.get<Nutrition[]>(url);
    return data;
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('Failed to fetch user info data');
  }
};

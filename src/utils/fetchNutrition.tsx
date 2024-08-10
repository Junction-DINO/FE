import { fetchMockProducts } from '@/services/NuturitionAPI';
import type { Nutrition } from '@/type/product';

export const fetchNutrition = async ({ pageParam = 1 }): Promise<Nutrition[]> => {
  const response = await fetchMockProducts();
  const startIndex = (pageParam - 1) * 10;
  const endIndex = startIndex + 10;
  return response.slice(startIndex, endIndex);
};

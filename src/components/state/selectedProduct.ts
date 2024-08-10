import { NutritionDTO } from '@/type/product';
import { atom } from 'recoil';

export const selectedProductState = atom<NutritionDTO | null>({
  key: 'selectedProductState',
  default: null,
});

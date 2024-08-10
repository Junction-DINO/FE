type NutrientType = 'carbohydrate' | 'protein' | 'fat';

export const calculateNutrientPercentage = (nutrientAmount: number, nutrientType: NutrientType) => {
  let dailyValue: number;

  switch (nutrientType) {
    case 'carbohydrate':
      dailyValue = 300;
      break;
    case 'protein':
      dailyValue = 50;
      break;
    case 'fat':
      dailyValue = 70;
      break;
    default:
      throw new Error('Invalid nutrient type');
  }

  return Math.round((nutrientAmount / dailyValue) * 100);
};

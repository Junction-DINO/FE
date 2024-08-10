type NutrientType = 'carbohydrate' | 'protein' | 'fat';

export const calculateNutrientPercentage = (
  nutrientAmount: number | undefined,
  nutrientType: NutrientType,
) => {
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

  // 계산 결과가 소수점 이하로 나올 수 있으므로 toFixed(2)로 소수점 2자리까지 반올림하여 문자열로 반환한 후,
  // 다시 숫자로 변환합니다. (ex. 0.5g 단백질 = 1%가 됩니다.)
  return Math.round((Number(nutrientAmount) / dailyValue) * 100);
};

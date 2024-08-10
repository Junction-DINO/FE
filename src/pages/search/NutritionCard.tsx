import { NutritionDTO } from '@/type/product';
import { calculateNutrientPercentage } from '@/utils/caculateNutrientPercent';

type NutritionCardProps = {
  product: NutritionDTO;
};

const NutritionCard = ({ product }: NutritionCardProps) => {
  return (
    <div className="border-b py-4 px-4 bg-white rounded-lg shadow-md mb-2">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">{product.foodName}</h3>
        <span className="text-gray-400">{product.manufacturerName}</span>
      </div>
      <div className="text-gray-400 mt-1 text-sm">
        {product.energyKcal}kcal ({product.foodWeight})
      </div>
      <div className="flex space-x-4 mt-2 text-sm">
        <span className="text-customYellow">
          carbohydrate • {product.carbohydrateG}g (
          {calculateNutrientPercentage(product.carbohydrateG, 'carbohydrate')}%)
        </span>
        <span className="text-customPink">
          protein • {product.proteinG}g ({calculateNutrientPercentage(product.proteinG, 'protein')}
          %)
        </span>
        <span className="text-customMint">
          fat • {product.fatG}g ({calculateNutrientPercentage(product.fatG, 'fat')}%)
        </span>
      </div>
    </div>
  );
};

export default NutritionCard;

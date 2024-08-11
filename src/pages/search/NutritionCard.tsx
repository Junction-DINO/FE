import { selectedProductState } from '@/components/state/selectedProduct';
import { NutritionDTO } from '@/type/product';
import { calculateNutrientPercentage } from '@/utils/caculateNutrientPercent';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

type NutritionCardProps = {
  product: NutritionDTO;
};

const NutritionCard = ({ product }: NutritionCardProps) => {
  const navigate = useNavigate();
  const [, setselectedProduct] = useRecoilState(selectedProductState);

  const handleClick = () => {
    setselectedProduct(product);
    navigate(`/search/detail/${product.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer py-4 px-4 bg-white rounded-lg border-b-2 mb-2"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-black">{product.foodName.split('_')[1]}</h3>
        <span className="text-customGrey">{product.manufacturerName}</span>
      </div>
      <div className="text-customGrey mt-1 text-sm">
        {product.energyKcal}kcal ({product.foodWeight})
      </div>
      <div className="flex space-x-4 mt-2 text-[13px] flex-nowrap">
        <span className="text-customYellow whitespace-nowrap">
          carbohydrate •
          <span className="text-customGrey">
            {product.carbohydrateG}g (
            {calculateNutrientPercentage(product.carbohydrateG, 'carbohydrate')}%)
          </span>
        </span>
        <span className="text-customYellow whitespace-nowrap">
          protein •{' '}
          <span className="text-customGrey">
            {product.proteinG}g ({calculateNutrientPercentage(product.proteinG, 'protein')}
            %)
          </span>
        </span>
        <span className="text-customYellow whitespace-nowrap">
          fat •{' '}
          <span className="text-customGrey">
            {product.fatG}g ({calculateNutrientPercentage(product.fatG, 'fat')}%)
          </span>
        </span>
      </div>
    </div>
  );
};

export default NutritionCard;

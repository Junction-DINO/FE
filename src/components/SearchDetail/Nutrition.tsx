import Dot from "@/assets/SearchDetail/Dot.svg"

import { calculateNutrientPercentage } from "@/utils/caculateNutrientPercent";

interface NutritionProps {
  data?: number;
  type: string
}

const Nutrition = ({ data, type }: NutritionProps) => {
  return (
    <>
      <div className='flex space-x-1 ml-4'>
        <span className='text-[#FFC01F]'>{type}</span>
        <img className='mx-1' src={Dot} alt='x' />
        <span className='text-customGrey'>{data} ({calculateNutrientPercentage(data, type)}%)</span>
      </div>
    </>
  )
}

export default Nutrition;
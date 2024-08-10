import Layout from '@/components/layout/layout';
// import { useParams } from 'react-router-dom';
import VeryBad from '@/assets/SearchDetail/FoodValue/VeryBad.svg'
import Bad from '@/assets/SearchDetail/FoodValue/bad.svg'
import Soso from '@/assets/SearchDetail/FoodValue/Soso.svg'
import Good from '@/assets/SearchDetail/FoodValue/Good.svg'
import VeryGood from '@/assets/SearchDetail/FoodValue/VeryGood.svg'
import Ask from '@/assets/SearchDetail/Ask.svg'
import Hr from '@/components/SearchDetail/Hr';

import Back from '@/assets/SearchDetail/Back.svg'
import { useNavigate } from 'react-router-dom';
import Nutrition from '@/components/SearchDetail/Nutrition';
import calculateFoodIndex from '@/utils/calculateFoodIndex/calculateFoodIndex';

export interface SearchDetailDTO {
  foodCode: string;
  foodName: string;
  nutritionStandardAmount: string;
  energyKcal?: number;
  waterG?: number;
  proteinG?: number;
  fatG?: number;
  ashG?: number;
  carbohydrateG?: number;
  sugarG?: number;
  dietaryFiberG?: number;
  calciumMg?: number;
  ironMg?: number;
  phosphorusMg?: number;
  potassiumMg?: number;
  sodiumMg?: number;
  vitaminAμgRAE?: number;
  retinolμg?: number;
  betaCaroteneμg?: number;
  thiamineMg?: number;
  riboflavinMg?: number;
  niacinMg?: number;
  vitaminCMg?: number;
  vitaminDμg?: number;
  cholesterolMg?: number;
  saturatedFattyAcidG?: number;
  transFattyAcidG?: number;
  servingSizeReference?: number;
  foodWeight?: number;
  manufacturerName?: string;
  providerName?: number;
}

const SearchDetail = () => {
  // const { query } = useParams();

  const dummyData: SearchDetailDTO = {
    foodCode: "001",
    foodName: "닭가슴살",
    nutritionStandardAmount: "100g",
    energyKcal: 165,
    waterG: 74,
    proteinG: 31,
    fatG: 3.6,
    ashG: 1.2,
    carbohydrateG: 0,
    sugarG: 0,
    dietaryFiberG: 0,
    calciumMg: 15,
    ironMg: 0.9,
    phosphorusMg: 210,
    potassiumMg: 256,
    sodiumMg: 70,
    vitaminAμgRAE: 0,
    retinolμg: 0,
    betaCaroteneμg: 0,
    thiamineMg: 0.07,
    riboflavinMg: 0.1,
    niacinMg: 13.4,
    vitaminCMg: 0,
    vitaminDμg: 0,
    cholesterolMg: 85,
    saturatedFattyAcidG: 1,
    transFattyAcidG: 0,
    servingSizeReference: 100,
    foodWeight: 100,
    manufacturerName: 'a',
  };

  const dangerList = ['vitaminAμgRAE', 'vitaminDμg', 'ironMg', 'sodiumMg', 'saturatedFattyAcidG', 'transFattyAcidG'];
  const safetyList = ['proteinG', 'ironMg', 'vitaminCMg', 'dietaryFiberG', 'potassiumMg'];
  const unuseList = ['foodCode', 'foodName', 'nutritionStandardAmount', 'servingSizeReference', 'foodWeight', 'energyKcal']

  // 표정배열

  const getExpression = (foodIndex: number): string => {
    const expressionList = [VeryBad, Bad, Soso, Good, VeryGood];

    // foodIndex가 -3 ~ -2일 때
    if (foodIndex >= -3 && foodIndex < -2) {
      return expressionList[0]; // VeryBad
    }
    // foodIndex가 -2 ~ -1일 때
    else if (foodIndex >= -2 && foodIndex <= -1) {
      return expressionList[1] // Bad
    }
    // 그 외의 경우는 기본값
    else if (foodIndex === 0) {
      return expressionList[2]
    }
    else if (1 <= foodIndex && 3 > foodIndex) {
      return expressionList[3]; // Good
    }
    else {
      return expressionList[4]; // VeryGood
    }
  };

  const navigate = useNavigate()

  const handleClickBackButton = () => {
    navigate(-1);
  };
  return (
    <Layout>
      <div className="relative w-full h-screen overflow-hidden scroll-hide">
        <div className="bg-white mt-[10%] w-full h-full rounded-tl-3xl overflow-y-auto"> {/* overflow-y-auto 추가 */}
          <div className='flex justify-between p-6'>
            <div className='flex space-x-2'>
              <img
                className='cursor-pointer '
                onClick={handleClickBackButton}
                src={Back} alt='x' />
              <span >
                {dummyData.foodName}
              </span>
              { }
              <img src={getExpression(calculateFoodIndex(dummyData,safetyList,dangerList))} alt='x' />
            </div>
            <p className='text-customGrey'>
              {dummyData.manufacturerName}
            </p>
          </div>

          <div className='relative p-3 rounded-lg border border-gray-300 m-4'>
            <div className='mb-2'>
              {dummyData.energyKcal} kcal ({dummyData.foodWeight} g )
            </div>
            <Nutrition data={dummyData.carbohydrateG} type="carbohydrate" />
            <Nutrition data={dummyData.proteinG} type="protein" />
            <Nutrition data={dummyData.fatG} type="fat" />
            <button className={`absolute bottom-2 right-2 
             ${calculateFoodIndex(dummyData,safetyList,dangerList) < 0 ? 'bg-[#f48187]' :
                calculateFoodIndex(dummyData,safetyList,dangerList) === 0 ? 'bg-[#898A8D]' :
                  'bg-[#49C09C]'} 
                rounded-[8px] px-2 py-1 text-[#fff] flex items-center`}
              onClick={() => navigate('/score')}
            >
              <span className='text-sm font-bold text-[16px]'>Score : {calculateFoodIndex(dummyData,safetyList,dangerList)}</span>
              <img src={Ask} alt='' className='w-5 h-5 ml-1' />
            </button>
          </div>

          <div className='px-6 py-2'>
            <span className='text-[#F6D0D2]'>Cautionary</span>
            <span className='text-[#CECECE]'>Ingredient</span>
          </div>
          <ul>
            {dangerList.map((key) => {
              const value = dummyData[key as keyof SearchDetailDTO];
              const isHealthy = Number(value) > 0; // 안전 요소 확인
              const displayKey = key.replace(/(g|mg|μg)$/i, ''); // 단위 제거
              const unit = key.endsWith('G') ? 'g' : key.endsWith('Mg') ? 'mg' : key.endsWith('μg') ? 'μg' : ''; // 단위 결정

              return isHealthy && (
                <>
                  <li className='px-6 py-2 flex justify-between' key={key}>
                    <span className='text-[#F48187]'>{displayKey}</span> <span> {value} {unit} </span>
                  </li>
                  <Hr />
                </>
              );
            })}
            {/* li 요소가 하나도 없을 때 표시할 메시지 */}
            {dangerList.every((key) => {
              const value = dummyData[key as keyof SearchDetailDTO];
              return Number(value) <= 0; // 모든 요소가 안전할 경우 true 반환
            }) && (
                <li className='px-6 py-2 text-center text-[#F48187]'>There are no results</li>
              )}
          </ul>
          <div className='h-[20px]' />
          <div className='px-6 py-2'>
            <span className='text-[#B3E5D6]'>Good</span>
            <span className='text-[#CECECE]'> Ingredient </span>
          </div>
          <ul>
            {safetyList.map((key) => {
              const value = dummyData[key as keyof SearchDetailDTO];
              const isHealthy = Number(value) > 0; // 안전 요소 확인
              const displayKey = key.replace(/(g|mg|μg)$/i, ''); // 단위 제거
              const unit = key.endsWith('G') ? 'g' : key.endsWith('Mg') ? 'mg' : key.endsWith('μg') ? 'μg' : ''; // 단위 결정

              return isHealthy && (
                <>
                  <li className='px-6 py-2 flex justify-between' key={key}>
                    <span className='text-[#49C09C]'>{displayKey}</span> <span> {value} {unit}</span>
                  </li>
                  <Hr />
                </>
              );
            })}
            {safetyList.every((key) => {
              const value = dummyData[key as keyof SearchDetailDTO];
              return Number(value) <= 0; // 모든 요소가 안전할 경우 true 반환
            }) && (
                <li className='px-6 py-2 text-center text-[#49C09C]'>There are no results</li>
              )}
          </ul>

          <div className='h-[20px]' />

          <div className='px-6 py-2'>
            <span className='text-[#CECECE]'>Other</span>
            <span className='text-[#CECECE]'> Ingredient </span>
          </div>
          <ul>
            {Object.entries(dummyData).map(([key, value]) => {
              const isDanger = dangerList.includes(key); // 위험 요소 확인
              const isHealthy = safetyList.includes(key); // 안전 요소 확인
              const unUse = unuseList.includes(key); //
              const isExcluded = !isDanger && !isHealthy && !unUse; // 둘 다 포함되지 않은 요소 확인
              const displayKey = key.replace(/(g|mg|μg)$/i, ''); // 단위 제거
              const unit = key.endsWith('G') ? 'g' : key.endsWith('Mg') ? 'mg' : key.endsWith('μg') ? 'μg' : ''; // 단위 결정

              return isExcluded && value !== 0 && (
                <>
                  <li className='px-6 py-2 flex justify-between' key={key}>
                    <span className='text-[#000]'>{displayKey}</span>  <span> {value} {unit} </span>
                  </li>
                  <Hr />
                </>
              );
            })}
             
          </ul>

        </div>
      </div>
    </Layout>
  );
}

export default SearchDetail;

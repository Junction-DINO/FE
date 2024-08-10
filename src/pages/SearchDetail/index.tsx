import Layout from '@/components/layout/layout';
// import { useParams } from 'react-router-dom';

interface SearchDetailDTO {
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
    manufacturerName:'a',
  };

  // const dangerList = ['vitaminAμgRAE', 'vitaminDμg', 'ironMg', 'sodiumMg', 'saturatedFattyAcidG', 'transFattyAcidG'];

  // const isUnhealthy = dangerList.some(nutrient => (dummyData[nutrient as keyof SearchDetailDTO] ?? 0) === 0);

  // const safetyList = ['proteinG', 'ironMg', 'vitaminCMg', 'dietaryFiberG', 'potassiumMg'];

  // const ishealthy = safetyList.some(nutrient => (dummyData[nutrient as keyof SearchDetailDTO] ?? 0) === 0);

  const calculateFoodIndex = (data: SearchDetailDTO) => {
    const dangerList = ['vitaminAμgRAE', 'vitaminDμg', 'ironMg', 'sodiumMg', 'saturatedFattyAcidG', 'transFattyAcidG'];
    const safetyList = ['proteinG', 'ironMg', 'vitaminCMg', 'dietaryFiberG', 'potassiumMg'];
  
    let index = 0;
  
    // 위험 요소 평가
    dangerList.forEach(nutrient => {
      if (data[nutrient as keyof SearchDetailDTO] === 0) {
        index -= 1; // 위험 요소가 있으면 -1
      }
    });
  
    // 안전 요소 평가
    safetyList.forEach(nutrient => {
      if (data[nutrient as keyof SearchDetailDTO] === 0) {
        index += 1; // 안전 요소가 있으면 +1
      }
    });
  
    return index; // 최종 지수 반환
  };

  console.log(calculateFoodIndex(dummyData))
  return (
    <Layout>
      <main className="max-w-[430px] w-full relative mx-auto p-6 h-screen">
        <div className='flex justify-between'>
          <p>{dummyData.foodName}</p>
          <p className='text-customGrey'>{dummyData.manufacturerName}</p>
        </div>
        {/* {Object.entries(dummyData).map(([key, value]) => {
          const isDanger = dangerList.includes(key) && value; // 위험 요소 확인
          const isHealthy = safetyList.includes(key) && value; // 안전 요소 확인
          const displayKey = key.replace(/(g|mg|μg)$/i, ''); // 단위 제거

          return (
            value !== 0 && (
              <div key={key}>
                <span style={{ color: isHealthy ? 'green' : isDanger ? 'red' : 'black' }}>
                  {displayKey}
                </span>
                {`: ${value} ${key.endsWith('G') ? 'g' : key.endsWith('Mg') ? 'mg' : key.endsWith('μg') ? 'μg' : ''}`}
              </div>
            )
          );
        })} */}
        {/* {isUnhealthy && <div style={{ color: 'red' }}>건강하지 않습니다.</div>} */}
      </main>
    </Layout>
  );
}

export default SearchDetail;

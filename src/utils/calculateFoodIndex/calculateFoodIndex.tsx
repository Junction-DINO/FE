import { SearchDetailDTO } from "@/pages/SearchDetail";

const calculateFoodIndex = (data: SearchDetailDTO,safetyList : string[],dangerList : string[]) => {
    
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

export default calculateFoodIndex
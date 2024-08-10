const calculatePregnancyWeeks = (dueDate: string): number => {
    // 현재 날짜
    const today = new Date();
    
    // 출산 예정일을 Date 객체로 변환
    const dueDateObj = new Date(dueDate);
    
    // 임신 주수 계산: (출산 예정일 - 현재 날짜) / (밀리초 단위의 일수)
    const diffTime = dueDateObj.getTime() - today.getTime(); // 밀리초 차이
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 일수로 변환
    
    // 임신 주수: 40주에서 남은 주수를 계산
    const pregnancyWeeks = Math.floor((280 - diffDays) / 7);
    
    // 음수일 경우 0으로 설정
    return Math.max(pregnancyWeeks, 0);
  }

  export default calculatePregnancyWeeks
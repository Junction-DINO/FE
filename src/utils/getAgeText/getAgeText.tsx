const getAgeText = (months: string): string => {
    // 숫자에 따라 적절한 접미사 결정
    const suffix = months === '1' ? 'st' : months === '2' ? 'nd' : 'th';
    
    return `${months}${suffix} months old`;
  };
  
export default getAgeText
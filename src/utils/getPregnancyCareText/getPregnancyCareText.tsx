type PregnancyCare = {
  f? :string;
  s? : string;
  Nutrition?: string;
  Lifestyle?: string;
  Mental_Preparation?: string;
  Medical_Consultation?: string;
  Exercise?: string;
  Emotional_Support?: string;
  Managing_Physical_Changes?: string;
  Childbirth_Education?: string;
  Physical_Preparation?: string;
  Birth_Preparation?: string;
  Physical_Care?: string;
  Birth_Plan?: string;
  Final_Preparations?: string;
  Recovery?: string;
  Regular_Checkups?: string;
};

type PregnancyStage = {
  [key: string]: PregnancyCare;
};

type PregnancyCareData = {
  Pregnancy_Care: {
    Early_Pregnancy: PregnancyStage;
    Mid_Pregnancy: PregnancyStage;
    Late_Pregnancy: PregnancyStage;
    Postpartum: PregnancyStage;
  };
};

const pregnancyCareData: PregnancyCareData = {
  Pregnancy_Care: {
    Early_Pregnancy: {
      Month_1: {
        f: "Start taking folic acid supplements. Consume fresh fruits and vegetables daily.",
        s: "Completely stop smoking and drinking. Reduce caffeine intake."
      },
      Month_2: {
        f: "Gather information about fetal development. Read books or materials about childbirth.",
        s: "Visit the obstetrician for the first time, schedule an ultrasound."
      },
      Month_3: {
        f: "Start light walking. Consider joining yoga or Pilates classes.",
        s: "Discuss the birth plan with your partner."
      }
    },
    Mid_Pregnancy: {
      Month_4: {
        f: "Increase protein intake with meat, fish, and tofu. Increase water intake.",
        s: "Consume high-fiber foods to prevent pregnancy-related constipation."
      },
      Month_5: {
        f: "Participate in pregnancy yoga classes. Engage in exercises to strengthen your body for weight gain.",
        s: "Listen to prenatal music to foster a bond with the baby."
      },
      Month_6: {
        f: "Enroll in childbirth classes. Practice breathing and relaxation techniques.",
        s: "Start shopping for baby supplies, and create a list of essential items."
      }
    },
    Late_Pregnancy: {
      Month_7: {
        f: "Choose easily digestible foods and have light snacks occasionally.",
        s: "Start preparing your hospital bag. Check necessary documents and items."
      },
      Month_8: {
        f: "Elevate your legs to reduce ankle swelling. Wear comfortable clothing.",
        s: "Build a support network for after the birth (family, friends, etc.)."
      },
      Month_9: {
        f: "Make final decisions about the hospital and birthing method.",
        s: "Recheck items needed for the hospital visit."
      }
    },
    Postpartum: {
      "0-1_Month": {
        f: "Maintain a balanced diet, focusing on protein and vitamin C. Stay hydrated during breastfeeding.",
        s: "Seek help from family and friends. Increase skin-to-skin contact with the baby."
      },
      "1-3_Months": {
        f: "Start light exercise after 6 weeks postpartum. Join postpartum exercise classes.",
        s: "Schedule postpartum check-ups with your obstetrician."
      },
      "4-6_Months": {
        f: "Introduce a variety of foods to support your baby’s taste development.",
        s: "Join parenting groups for information sharing and emotional support."
      },
      "7-12_Months": {
        f: "Maintain physical activity through walks and play with the baby.",
        s: "Continue learning about your baby’s growth and development."
      }
    }
  }
};

const calculatePregnancyWeeks = (dueDate: string): number => {
  const today = new Date();
  const dueDateObj = new Date(dueDate);
  const diffTime = dueDateObj.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const pregnancyWeeks = Math.floor((280 - diffDays) / 7);
  return Math.max(pregnancyWeeks, 0);
};const getPregnancyCareText = (dueDate: string) => {
  const weeks = calculatePregnancyWeeks(dueDate);
  let firstText = '';
  let secondText = '';

  if (weeks < 13) { // Early Pregnancy
    const month = `Month_${Math.floor(weeks / 4) + 1}`; // 1, 2, 3 월
    firstText = `
      ${pregnancyCareData.Pregnancy_Care.Early_Pregnancy[month]?.f || ''}
    `;
    secondText = `
      ${pregnancyCareData.Pregnancy_Care.Early_Pregnancy[month]?.s || ''}
    `;
  } else if (weeks < 27) { // Mid Pregnancy
    const month = `Month_${Math.floor((weeks - 13) / 4) + 4}`; // 4, 5, 6 월
    firstText = `
      ${pregnancyCareData.Pregnancy_Care.Mid_Pregnancy[month]?.f || ''}
    `;
    secondText = `
      ${pregnancyCareData.Pregnancy_Care.Mid_Pregnancy[month]?.s || ''}
    `;
  } else if (weeks < 41) { // Late Pregnancy
    const month = `Month_${Math.floor((weeks - 27) / 4) + 7}`; // 7, 8, 9 월
    firstText = `
      ${pregnancyCareData.Pregnancy_Care.Late_Pregnancy[month]?.f || ''}
    `;
    secondText = `
      ${pregnancyCareData.Pregnancy_Care.Late_Pregnancy[month]?.s || ''}
    `;
  } else { // Postpartum
    const month = weeks === 40 
      ? '0-1_Month' 
      : weeks <= 52 
        ? `${Math.floor((weeks - 40) / 3)}-3_Months` 
        : '4-6_Months';
        
    firstText = `
      ${pregnancyCareData.Pregnancy_Care.Postpartum[month]?.f || ''}
    `;
    secondText = `
      ${pregnancyCareData.Pregnancy_Care.Postpartum[month]?.s || ''}
    `;
  }

  return {firstText,secondText}; // 불필요한 공백 제거
};




export default getPregnancyCareText;

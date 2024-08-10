type PregnancyCare = {
  f?: string;
  s?: string;
  f1?: string;
  f2?: string;
  f3?: string;

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
        s: "Completely stop smoking and drinking. Reduce caffeine intake.",
        f1: "Fresh fruits (e.g., apple, banana)",
        f2: "Vegetables (e.g., spinach, broccoli)",
        f3: "Nuts (e.g., almonds, walnuts)"
      },
      Month_2: {
        f: "Gather information about fetal development. Read books or materials about childbirth.",
        s: "Visit the obstetrician for the first time, schedule an ultrasound.",
        f1: "Protein-rich foods (e.g., eggs, chicken breast)",
        f2: "Oatmeal (high in fiber)",
        f3: "Dairy products (e.g., yogurt, cheese)"
      },
      Month_3: {
        f: "Start light walking. Consider joining yoga or Pilates classes.",
        s: "Discuss the birth plan with your partner.",
        f1: "Sweet potatoes (rich in vitamins and minerals)",
        f2: "Chicken soup (nutrient boost)",
        f3: "Avocado (healthy fats)"
      }
    },
    Mid_Pregnancy: {
      Month_4: {
        f: "Increase protein intake with meat, fish, and tofu. Increase water intake.",
        s: "Consume high-fiber foods to prevent pregnancy-related constipation.",
        f1: "Fish (e.g., salmon, mackerel)",
        f2: "Legumes (e.g., lentils, chickpeas)",
        f3: "Whole grains (e.g., brown rice, oats)"
      },
      Month_5: {
        f: "Participate in pregnancy yoga classes. Engage in exercises to strengthen your body for weight gain.",
        s: "Listen to prenatal music to foster a bond with the baby.",
        f1: "Colorful vegetables (e.g., carrots, bell peppers)",
        f2: "Lean meats (e.g., turkey, beef)",
        f3: "Fruit smoothies (for vitamins and hydration)"
      },
      Month_6: {
        f: "Enroll in childbirth classes. Practice breathing and relaxation techniques.",
        s: "Start shopping for baby supplies, and create a list of essential items.",
        f1: "Yogurt (probiotics)",
        f2: "Chicken (protein source)",
        f3: "Spinach (iron and folate)"
      }
    },
    Late_Pregnancy: {
      Month_7: {
        f: "Choose easily digestible foods and have light snacks occasionally.",
        s: "Start preparing your hospital bag. Check necessary documents and items.",
        f1: "Bananas (potassium source)",
        f2: "Almonds (healthy fats)",
        f3: "Soft grains (e.g., oats, rice)"
      },
      Month_8: {
        f: "Elevate your legs to reduce ankle swelling. Wear comfortable clothing.",
        s: "Build a support network for after the birth (family, friends, etc.).",
        f1: "Fish (e.g., tuna, salmon)",
        f2: "Smoothies (with fruits and vegetables)",
        f3: "Chamomile tea (calming effect)"
      },
      Month_9: {
        f: "Make final decisions about the hospital and birthing method.",
        s: "Recheck items needed for the hospital visit.",
        f1: "Sweet potatoes (energy source)",
        f2: "Lentils (protein and fiber)",
        f3: "Soft vegetables (e.g., squash, broccoli)"
      }
    },
    Postpartum: {
      "0-1_Month": {
        f: "Maintain a balanced diet, focusing on protein and vitamin C. Stay hydrated during breastfeeding.",
        s: "Seek help from family and friends. Increase skin-to-skin contact with the baby.",
        f1: "Chicken (protein boost)",
        f2: "Salmon (omega-3 fatty acids)",
        f3: "Variety of fruits (e.g., strawberries, blueberries)"
      },
      "1-3_Months": {
        f: "Start light exercise after 6 weeks postpartum. Join postpartum exercise classes.",
        s: "Schedule postpartum check-ups with your obstetrician.",
        f1: "High-protein smoothies (with protein powder)",
        f2: "Eggs (nutrient-rich)",
        f3: "Vegetable soup (easy to digest)"

      },
      "4-6_Months": {
        f: "Introduce a variety of foods to support your baby’s taste development.",
        s: "Join parenting groups for information sharing and emotional support.",
        f1: "Avocado (healthy fats)",
        f2: "Quinoa (protein and fiber)",
        f3: "Fresh fruits (e.g., apple, pear)"
      },
      "7-12_Months": {
        f: "Maintain physical activity through walks and play with the baby.",
        s: "Continue learning about your baby’s growth and development.",
        f1: "Chicken breast (low-fat protein)",
        f2: "Green vegetables (e.g., broccoli, spinach)",
        f3: "Whole grains (e.g., brown rice, oats)"
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
}; const getPregnancyCareText = (dueDate: string) => {
  const weeks = calculatePregnancyWeeks(dueDate);
  let firstText = '';
  let secondText = '';
  let f1 = '';
  let f2 = '';
  let f3 = '';
  if (weeks < 13) { // Early Pregnancy
    const month = `Month_${Math.floor(weeks / 4) + 1}`; // 1, 2, 3 월
    firstText = `
      ${pregnancyCareData.Pregnancy_Care.Early_Pregnancy[month]?.f || ''}
    `;
    secondText = `
      ${pregnancyCareData.Pregnancy_Care.Early_Pregnancy[month]?.s || ''}
    `;
    f1 = `
      ${pregnancyCareData.Pregnancy_Care.Early_Pregnancy[month]?.f1 || ''}
  `;
    f2 = `
      ${pregnancyCareData.Pregnancy_Care.Early_Pregnancy[month]?.f2 || ''}
  `;
    f3 = `
      ${pregnancyCareData.Pregnancy_Care.Early_Pregnancy[month]?.f3 || ''}
  `;
  } else if (weeks < 27) { // Mid Pregnancy
    const month = `Month_${Math.floor((weeks - 13) / 4) + 4}`; // 4, 5, 6 월
    firstText = `
      ${pregnancyCareData.Pregnancy_Care.Mid_Pregnancy[month]?.f || ''}
    `;
    secondText = `
      ${pregnancyCareData.Pregnancy_Care.Mid_Pregnancy[month]?.s || ''}
    `;
    f1 = `
      ${pregnancyCareData.Pregnancy_Care.Mid_Pregnancy[month]?.f1 || ''}
  `;
    f2 = `
      ${pregnancyCareData.Pregnancy_Care.Mid_Pregnancy[month]?.f2 || ''}
  `;
    f3 = `
      ${pregnancyCareData.Pregnancy_Care.Mid_Pregnancy[month]?.f3 || ''}
  `;
  } else if (weeks < 41) { // Late Pregnancy
    const month = `Month_${Math.floor((weeks - 27) / 4) + 7}`; // 7, 8, 9 월
    firstText = `
      ${pregnancyCareData.Pregnancy_Care.Late_Pregnancy[month]?.f || ''}
    `;
    secondText = `
      ${pregnancyCareData.Pregnancy_Care.Late_Pregnancy[month]?.s || ''}
    `;
    f1 = `
      ${pregnancyCareData.Pregnancy_Care.Late_Pregnancy[month]?.f1 || ''}
  `;
    f2 = `
      ${pregnancyCareData.Pregnancy_Care.Late_Pregnancy[month]?.f2 || ''}
  `;
    f3 = `
      ${pregnancyCareData.Pregnancy_Care.Late_Pregnancy[month]?.f3 || ''}
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
    f1 = `
      ${pregnancyCareData.Pregnancy_Care.Postpartum[month]?.f1 || ''}
  `;
    f2 = `
      ${pregnancyCareData.Pregnancy_Care.Postpartum[month]?.f2 || ''}
  `;
    f3 = `
      ${pregnancyCareData.Pregnancy_Care.Postpartum[month]?.f3 || ''}
  `;
  }

  return { firstText, secondText,f1,f2,f3 }; // 불필요한 공백 제거
};


export default getPregnancyCareText;

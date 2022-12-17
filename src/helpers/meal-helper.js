export const handleMeals = item => {
  const mealsArray = item?.split(',').filter(item => item !== '');
  return mealsArray;
};

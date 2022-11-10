export const handleMeals = item => {
  const mealsArray = item.meal.meal.split(',').filter(item => item !== '');
  return mealsArray;
};

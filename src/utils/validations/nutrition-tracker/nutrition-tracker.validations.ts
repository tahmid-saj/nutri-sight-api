// validations for nutrition tracker

export const validateGetNutritionTrackedDaysSummary = (nutritionTrackedDaysSummary: any) => {
  if (!nutritionTrackedDaysSummary) {
    return true;
  }

  return false;
};

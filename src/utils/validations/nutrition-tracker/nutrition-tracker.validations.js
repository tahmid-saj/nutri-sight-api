// validations for nutrition tracker

const validateGetNutritionTrackedDaysSummary = (nutritionTrackedDaysSummary) => {
  if (!nutritionTrackedDaysSummary) {
    return true;
  }

  return false;
};

module.exports = {
  validateGetNutritionTrackedDaysSummary,
}
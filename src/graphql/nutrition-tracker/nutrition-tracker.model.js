const { getNutritionTrackedDays, getNutritionTrackedDaysSummary

} = require("../../models/nutrition-tracker/nutrition-tracker.mongo.crud")

async function nutritionTrackedDaysByUser(userId, email) {
  const nutritionTrackedDays = await getNutritionTrackedDays(userId, email)
  return nutritionTrackedDays.nutritionTrackedDays
}

async function nutritionTrackedDaysSummaryByUser(userId, email) {
  const nutritionTrackedDaysSummary = await getNutritionTrackedDaysSummary(userId, email)
  return nutritionTrackedDaysSummary.nutritionTrackedDaysSummary
}

module.exports = {
  nutritionTrackedDaysByUser,
  nutritionTrackedDaysSummaryByUser
}
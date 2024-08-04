const { getNutritionTrackedDays, getNutritionTrackedDaysSummary

} = require("../../models/nutrition-tracker/nutrition-tracker.mongo.crud")

async function nutritionTrackedDaysByUser(userId, email) {
  const nutritionTrackedDays = await getNutritionTrackedDays(userId, email)
  return nutritionTrackedDays.nutritionTrackedDays
}

module.exports = {
  nutritionTrackedDaysByUser
}
const { getNutritionTrackedDays, getNutritionTrackedDaysSummary,
  addNutritionTrackedDay, updateNutritionTrackedDay, removeNutritionTrackedDay,
  updateNutritionTrackedDays, updateNutritionTrackedDaysSummary
} = require("../../models/nutrition-tracker/nutrition-tracker.mongo.crud")

async function nutritionTrackedDaysByUser(userId, email) {
  const nutritionTrackedDays = await getNutritionTrackedDays(userId, email)
  return nutritionTrackedDays.nutritionTrackedDays
}

async function nutritionTrackedDaysSummaryByUser(userId, email) {
  const nutritionTrackedDaysSummary = await getNutritionTrackedDaysSummary(userId, email)
  return nutritionTrackedDaysSummary.nutritionTrackedDaysSummary
}

async function createUserNutritionTrackedDay(userId, email, nutritionTrackedDay) {
  console.log("Posting nutrition tracked day");
  addNutritionTrackedDay(userId, email, nutritionTrackedDay);
  return true
}

async function deleteUserNutritionTrackedDay(userId, email, nutritionTrackedDate) {
  removeNutritionTrackedDay(userId, email, nutritionTrackedDate);
  console.log("Deleting nutrition tracked day");
  return true
}

async function updateUserNutritionTrackedDay(userId, email, originalNutritionTrackedDay, updatedNutritionTrackedDay) {
  console.log("Updating nutrition tracked day");
  updateNutritionTrackedDay(userId, email, originalNutritionTrackedDay, updatedNutritionTrackedDay);
  return true
}

async function updateUserNutritionTrackedDays(userId, email, nutritionTrackedDays) {
  updateNutritionTrackedDays(userId, email, nutritionTrackedDays);
  console.log("Putting nutrition tracked days");
  return true
}

async function updateUserNutritionTrackedDaysSummary(userId, email, nutritionTrackedDaysSummary) {
  updateNutritionTrackedDaysSummary(userId, email, nutritionTrackedDaysSummary);
  console.log("Putting nutrition tracked days summary");
  return true
}

module.exports = {
  nutritionTrackedDaysByUser,
  nutritionTrackedDaysSummaryByUser,
  createUserNutritionTrackedDay,
  deleteUserNutritionTrackedDay,
  updateUserNutritionTrackedDay,
  updateUserNutritionTrackedDays,
  updateUserNutritionTrackedDaysSummary
}
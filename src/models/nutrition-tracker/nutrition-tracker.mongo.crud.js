const { nutritionTrackedDaysDatabase, nutritionTrackedDaysSummaryDatabase } = require("./nutrition-tracker.mongo");

// nutrition tracker crud for mongodb

// user sign in
async function getNutritionTrackedDays(userId, email) {

}

async function getNutritionTrackedDaysSummary(userId, email) {

}

// tracked days operations
async function addNutritionTrackedDay(userId, email, nutritionTrackedDay) {

}

async function updateNutritionTrackedDay(userId, email, nutritionTrackedDay) {

}

async function removeNutritionTrackedDay(userId, email, nutritionTrackedDate) {

}

// user sign out
async function updateNutritionTrackedDays(userId, email, nutritionTrackedDays) {

}

async function updateNutritionTrackedDaysSummary(userId, email, nutritionTrackedDaysSummary) {

}

module.exports = {
  getNutritionTrackedDays,
  getNutritionTrackedDaysSummary,
  addNutritionTrackedDay,
  updateNutritionTrackedDay,
  removeNutritionTrackedDay,
  updateNutritionTrackedDays,
  updateNutritionTrackedDaysSummary,
}
const { nutritionTrackedDaysDatabase, nutritionTrackedDaysSummaryDatabase } = require("./nutrition-tracker.mongo");
const axios = require("axios");

const { getNutritionTrackedDays, getNutritionTrackedDaysSummary,
  addNutritionTrackedDay, updateNutritionTrackedDay, removeNutritionTrackedDay,
  updateNutritionTrackedDays, updateNutritionTrackedDaysSummary } = require("./nutrition-tracker.mongo.crud")
 
// sign in
async function getNutritionTrackedDaysData(userId, email) {
  console.log("Getting nutrition tracked days data");
  return getNutritionTrackedDays(userId, email);
};

async function getNutritionTrackedDaysSummaryData(userId, email) {
  console.log("Getting nutrition tracked days summary data");
  return getNutritionTrackedDaysSummary(userId, email);
};

// nutrition tracked days operations
async function postNutritionTrackedDay(userId, email, nutritionTrackedDay) {
  console.log("Posting nutrition tracked day");
  addNutritionTrackedDay(userId, email, nutritionTrackedDay);
  return true
};

async function deleteNutritionTrackedDay(userId, email, nutritionTrackedDate) {
  removeNutritionTrackedDay(userId, email, nutritionTrackedDate);
  console.log("Deleting nutrition tracked day");
  return true
};

async function putNutritionTrackedDay(userId, email, originalNutritionTrackedDay, updatedNutritionTrackedDay) {
  console.log("Updating nutrition tracked day");
  updateNutritionTrackedDay(userId, email, originalNutritionTrackedDay, updatedNutritionTrackedDay);
  return true
};

// sign out
async function putNutritionTrackedDaysData(userId, email, nutritionTrackedDays) {
  updateNutritionTrackedDays(userId, email, nutritionTrackedDays);
  console.log("Putting nutrition tracked days");
  return true
};

async function putNutritionTrackedDaysSummaryData(userId, email, nutritionTrackedDaysSummary) {
  updateNutritionTrackedDaysSummary(userId, email, nutritionTrackedDaysSummary);
  console.log("Putting nutrition tracked days summary");
  return true
};

module.exports = {
  getNutritionTrackedDaysData,
  getNutritionTrackedDaysSummaryData,
  postNutritionTrackedDay,
  putNutritionTrackedDay,
  deleteNutritionTrackedDay,
  putNutritionTrackedDaysData,
  putNutritionTrackedDaysSummaryData,
}


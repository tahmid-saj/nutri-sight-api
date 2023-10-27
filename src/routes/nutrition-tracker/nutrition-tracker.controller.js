const { getNutritionTrackedDays, getNutritionTrackedDaysSummary,
  postNutritionTrackedDay, putNutritionTrackedDay, deleteNutritionTrackedDay,
  putNutritionTrackedDays, putNutritionTrackedDaysSummary } = require("../../models/nutrition-tracker/nutrient-tracker.model")

// signed in
async function httpGetNutritionTrackedDays(req, res) {
  return res.status(200).json(getNutritionTrackedDays());
};

async function httpGetNutritionTrackedDaysSummary(req, res) {
  return res.status(200).json(getNutritionTrackedDaysSummary());
};

// nutrition tracked days operations
async function httpPostNutritionTrackedDay(req, res) {
  return res.status(200).json(postNutritionTrackedDay());
};

async function httpPutNutritionTrackedDay(req, res) {
  return res.status(200).json(putNutritionTrackedDay());
};

async function httpDeleteNutritionTrackedDay(req, res) {
  return res.status(200).json(deleteNutritionTrackedDay());
};

// signed out
async function httpPutNutritionTrackedDays(req, res) {
  return res.status(200).json(putNutritionTrackedDays());
};

async function httpPutNutritionTrackedDaysSummary(req, res) {
  return res.status(200).json(putNutritionTrackedDaysSummary());
};

module.exports = {
  httpGetNutritionTrackedDays,
  httpGetNutritionTrackedDaysSummary,
  httpPostNutritionTrackedDay,
  httpPutNutritionTrackedDay,
  httpDeleteNutritionTrackedDay,
  httpPutNutritionTrackedDays,
  httpPutNutritionTrackedDaysSummary,
}

const express = require('express');

const { httpGetNutritionTrackedDays, httpGetNutritionTrackedDaysSummary,
  httpPostNutritionTrackedDay, httpPutNutritionTrackedDay, httpDeleteNutritionTrackedDay,
  httpPutNutritionTrackedDays, httpPutNutritionTrackedDaysSummary } = require("./nutrition-tracker.controller");

const nutritionTracker = express.Router();

// TODO: move to env variables
// user sign in
nutritionTracker.get("/nutrition-tracked-days/:userid/:email", httpGetNutritionTrackedDays);
nutritionTracker.get("/nutrition-tracked-days-summary/:userid/:email", httpGetNutritionTrackedDaysSummary);

// nutrition tracked days operations
nutritionTracker.post("/nutrition-tracked-days/:userid/:email/add", httpPostNutritionTrackedDay);
nutritionTracker.put("/nutrition-tracked-days/:userid/:email/update", httpPutNutritionTrackedDay);
nutritionTracker.delete("/nutrition-tracked-days/:userid/:email/remove", httpDeleteNutritionTrackedDay);

// user sign out
nutritionTracker.put("/nutrition-tracked-days/:userid/:email", httpPutNutritionTrackedDays);
nutritionTracker.put("/nutrition-tracked-days-summary/:userid/:email", httpPutNutritionTrackedDaysSummary);

module.exports = {
  nutritionTracker,
};
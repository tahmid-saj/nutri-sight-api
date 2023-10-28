const express = require('express');

const { httpGetNutritionTrackedDays, httpGetNutritionTrackedDaysSummary,
  httpPostNutritionTrackedDay, httpPutNutritionTrackedDay, httpDeleteNutritionTrackedDay,
  httpPutNutritionTrackedDays, httpPutNutritionTrackedDaysSummary } = require("./nutrition-tracker.controller");

const nutritionTrackerRouter = express.Router();

// TODO: move to env variables
// user sign in
nutritionTrackerRouter.get("/nutrition-tracked-days/:userid/:email", httpGetNutritionTrackedDays);
nutritionTrackerRouter.get("/nutrition-tracked-days-summary/:userid/:email", httpGetNutritionTrackedDaysSummary);

// nutrition tracked days operations
nutritionTrackerRouter.post("/nutrition-tracked-days/:userid/:email/add", httpPostNutritionTrackedDay);
nutritionTrackerRouter.put("/nutrition-tracked-days/:userid/:email/update", httpPutNutritionTrackedDay);
nutritionTrackerRouter.delete("/nutrition-tracked-days/:userid/:email/remove", httpDeleteNutritionTrackedDay);

// user sign out
nutritionTrackerRouter.put("/nutrition-tracked-days/:userid/:email", httpPutNutritionTrackedDays);
nutritionTrackerRouter.put("/nutrition-tracked-days-summary/:userid/:email", httpPutNutritionTrackedDaysSummary);

module.exports = {
  nutritionTrackerRouter,
};
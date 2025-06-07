import express, { Router } from 'express'

import { httpGetNutritionTrackedDays, httpGetNutritionTrackedDaysSummary,
  httpPostNutritionTrackedDay, httpPutNutritionTrackedDay, httpDeleteNutritionTrackedDay,
  httpPutNutritionTrackedDays, httpPutNutritionTrackedDaysSummary } 
from "./nutrition-tracker.controller.js"

const nutritionTrackerRouter: Router = express.Router();

// TODO: move to env variables
// user sign in
nutritionTrackerRouter.get("/nutrition-tracked-days/:userid/:email", httpGetNutritionTrackedDays);
nutritionTrackerRouter.get("/nutrition-tracked-days-summary/:userid/:email", httpGetNutritionTrackedDaysSummary);

// nutrition tracked days operations
nutritionTrackerRouter.post("/nutrition-tracked-days/:userid/:email", httpPostNutritionTrackedDay);
nutritionTrackerRouter.delete("/nutrition-tracked-days/:userid/:email", httpDeleteNutritionTrackedDay);
nutritionTrackerRouter.put("/nutrition-tracked-days/:userid/:email", httpPutNutritionTrackedDay);

// user sign out
nutritionTrackerRouter.put("/nutrition-tracked-days/:userid/:email", httpPutNutritionTrackedDays);
nutritionTrackerRouter.put("/nutrition-tracked-days-summary/:userid/:email", httpPutNutritionTrackedDaysSummary);

export { nutritionTrackerRouter }
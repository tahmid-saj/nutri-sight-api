import express, { Router } from "express"
import multer from "multer"

import { httpGetNutrientPrediction, 
  httpGetFoodPrediction } from "./nutrient-predictor.controller.js"

const nutrientPredictorRouter: Router = express.Router()

// TODO: move to env variables
// predict nutrients from description
nutrientPredictorRouter.post("/predict-nutrients", httpGetNutrientPrediction)

// setup multer to store image in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// the upload.single() middleware below will first upload the image
nutrientPredictorRouter.post("/food-prediction", upload.single("image"), httpGetFoodPrediction)


export { nutrientPredictorRouter }
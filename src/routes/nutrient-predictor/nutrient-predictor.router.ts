import express, { Router } from "express"
import multer from "multer"

import { httpGetNutrientPrediction, httpGetFoodPrediction
  // httpGeneratePresignedURL 
} from "./nutrient-predictor.controller.js"

const nutrientPredictorRouter: Router = express.Router()

// TODO: move to env variables
// predict nutrients from description
nutrientPredictorRouter.post("/predict-nutrients", httpGetNutrientPrediction)

const upload = multer({
  dest: "uploads/"
})

// the upload.single() middleware below will first upload the image
nutrientPredictorRouter.post("/food-prediction", upload.single("image"), httpGetFoodPrediction)

// nutrientPredictorRouter.post("/pre-signedurl", httpGeneratePresignedURL)

export { nutrientPredictorRouter }
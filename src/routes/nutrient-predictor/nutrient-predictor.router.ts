import express, { Router } from "express"

import { httpGetNutrientPrediction } from "./nutrient-predictor.controller.js"

const nutrientPredictorRouter: Router = express.Router()

// TODO: move to env variables
// predict nutrients from description
nutrientPredictorRouter.post("/predict-nutrients", httpGetNutrientPrediction)

export { nutrientPredictorRouter }
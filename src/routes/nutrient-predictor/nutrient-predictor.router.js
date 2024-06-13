const express = require("express")

const { httpGetNutrientPrediction } = require("./nutrient-predictor.controller")

const nutrientPredictorRouter = express.Router()

// TODO: move to env variables
// predict nutrients from description
nutrientPredictorRouter.post("/predict-nutrients", httpGetNutrientPrediction)

module.exports = {
  nutrientPredictorRouter
}
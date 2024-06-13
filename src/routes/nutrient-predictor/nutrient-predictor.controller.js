const { getNutrientPrediction } = require("../../utils/requests/nutrient-predictor/nutrient-predictor.requests")

// nutrient prediction
async function httpGetNutrientPrediction(req, res) {
  try {
    const mealDescription = String(req.body)
    const resGetNutrientPrediction = await getNutrientPrediction(mealDescription)

    if (resGetNutrientPrediction) return res.status(200).json(resGetNutrientPrediction)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

module.exports = {
  httpGetNutrientPrediction
}
import { Request, Response } from 'express';

import { getNutrientPrediction } from "../../utils/requests/nutrient-predictor/nutrient-predictor.requests.js"

// nutrient prediction
export async function httpGetNutrientPrediction(req: Request, res: Response): Promise<void> {
  try {
    const mealDescription = String(req.body)
    const resGetNutrientPrediction = await getNutrientPrediction(mealDescription)

    if (resGetNutrientPrediction) {
      res.status(200).json(resGetNutrientPrediction)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

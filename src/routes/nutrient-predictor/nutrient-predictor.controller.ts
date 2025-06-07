import { Request, Response } from 'express';

import { getNutrientPrediction } from "../../utils/requests/nutrient-predictor/nutrient-predictor.requests.js"
import { isNutrientPredictionCached, saveNutrientPrediction } from '../../redis/queries/nutrient-predictor/nutrient-predictor.queries.ts';

// nutrient prediction
export async function httpGetNutrientPrediction(req: Request, res: Response): Promise<void> {
  try {
    const mealDescription = String(req.body)

    const nutrientPredictionCached = await isNutrientPredictionCached(mealDescription)
    if (nutrientPredictionCached) {
      const resNutrientPrediction = await getNutrientPrediction(mealDescription)
      res.status(200).json(resNutrientPrediction)
    } else {
      const resGetNutrientPrediction = await getNutrientPrediction(mealDescription)
  
      if (resGetNutrientPrediction) {
        await saveNutrientPrediction(mealDescription, resGetNutrientPrediction.predictionResults)
        res.status(200).json(resGetNutrientPrediction)
      }
    }
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

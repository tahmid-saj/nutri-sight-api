import { NutrientPrediction } from "../../../models/nutrient-predictor/nutrient-predictor.types.js"
import { redisClient } from "../../../services/redis/redis.services.js"
import { CACHING_TTL } from "../../../utils/constants/shared.constants.js"
import { nutrientPredictionKey, nutrientPredictionResultsKey } from "./nutrient-predictor.keys.js"
import { v4 as uuidv4 } from "uuid"

export const serializeNutrientPrediction = (nutrientPrediction: NutrientPrediction) => {
  return {
    name: String(nutrientPrediction.name),
    servingSizeG: String(nutrientPrediction.servingSizeG),
    calories: String(nutrientPrediction.calories),
    
    carbohydratesTotalG: String(nutrientPrediction.macronutrients.carbohydratesTotalG),
    proteinG: String(nutrientPrediction.macronutrients.proteinG),
    fatTotalG: String(nutrientPrediction.macronutrients.fatTotalG),
    fatSaturatedG: String(nutrientPrediction.macronutrients.fatSaturatedG),

    sodiumMG: String(nutrientPrediction.micronutrients.sodiumMG),
    potassiumMG: String(nutrientPrediction.micronutrients.potassiumMG),
    cholesterolMg: String(nutrientPrediction.micronutrients.cholesterolMg),
    fiberG: String(nutrientPrediction.micronutrients.fiberG),
    sugarG: String(nutrientPrediction.micronutrients.sugarG)
  }
}

export const deserializeNutrientPrediction = (nutrientPrediction: { [key: string]: string }): NutrientPrediction => {
  return {
    name: nutrientPrediction.name!,
    servingSizeG: nutrientPrediction.servingSizeG!,
    calories: nutrientPrediction.calories!,

    macronutrients: {
      carbohydratesTotalG: nutrientPrediction.carbohydratesTotalG!,
      proteinG: nutrientPrediction.proteinG!,
      fatTotalG: nutrientPrediction.fatTotalG!,
      fatSaturatedG: nutrientPrediction.fatSaturatedG!,
    },

    micronutrients: {
      sodiumMG: nutrientPrediction.sodiumMG!,
      potassiumMG: nutrientPrediction.potassiumMG!,
      cholesterolMg: nutrientPrediction.cholesterolMg!,
      fiberG: nutrientPrediction.fiberG!,
      sugarG: nutrientPrediction.sugarG!
    }
  }
}

export const isNutrientPredictionCached = async (mealDescription: string) => {
  return await redisClient.exists(nutrientPredictionKey(mealDescription))
}

export const getNutrientPredictionCached = async (mealDescription: string) => {
  const resultIds = await redisClient.sMembers(nutrientPredictionKey(mealDescription))

  const resNutrientPredictions = await Promise.all(
    resultIds.map(async (resultId: string) => {
      const resNutrientPrediction = await redisClient.hGetAll(nutrientPredictionResultsKey(mealDescription, resultId))
      return deserializeNutrientPrediction(resNutrientPrediction)
    })
  )

  return {
    predictionResults: resNutrientPredictions
  }
}

export const saveNutrientPrediction = async (mealDescription: string, 
  nutrientPrediction: NutrientPrediction[]) => {
    
  await Promise.all(
    nutrientPrediction.map(async (result: NutrientPrediction) => {
    const resultId: string = uuidv4()

    await Promise.all([
      redisClient.multi()
        .sAdd(nutrientPredictionKey(mealDescription), resultId)
        .expire(nutrientPredictionKey(mealDescription), CACHING_TTL.high)
        .exec(),
      
      redisClient.multi()
        .hSet(nutrientPredictionResultsKey(mealDescription, resultId), serializeNutrientPrediction(result))
        .expire(nutrientPredictionResultsKey(mealDescription, resultId), CACHING_TTL.high)
        .exec()
    ])
  })
  )
}

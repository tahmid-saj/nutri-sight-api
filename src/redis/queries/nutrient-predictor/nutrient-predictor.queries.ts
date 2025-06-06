import { NutrientPrediction } from "../../../models/nutrient-predictor/nutrient-predictor.types.ts"
import { redisClient } from "../../../services/redis/redis.services.ts"
import { CACHING_TTL } from "../../../utils/constants/shared.constants.ts"
import { nutrientPredictionKey } from "./nutrient-predictor.keys.ts"

export const serializeNutrientPrediction = (nutrientPrediction: NutrientPrediction) => {
  return {
    name: nutrientPrediction.name,
    servingSizeG: nutrientPrediction.servingSizeG,
    calories: nutrientPrediction.calories,
    
    carbohydratesTotalG: nutrientPrediction.macronutrients.carbohydratesTotalG,
    proteinG: nutrientPrediction.macronutrients.proteinG,
    fatTotalG: nutrientPrediction.macronutrients.fatTotalG,
    fatSaturatedG: nutrientPrediction.macronutrients.fatSaturatedG,

    sodiumMG: nutrientPrediction.micronutrients.sodiumMG,
    potassiumMG: nutrientPrediction.micronutrients.potassiumMG,
    cholesterolMg: nutrientPrediction.micronutrients.cholesterolMg,
    fiberG: nutrientPrediction.micronutrients.fiberG,
    sugarG: nutrientPrediction.micronutrients.sugarG
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

export const getNutrientPrediction = async (mealDescription: string) => {
  const resNutrientPrediction = await redisClient.hGetAll(nutrientPredictionKey(mealDescription))
  return deserializeNutrientPrediction(resNutrientPrediction)
}

export const saveNutrientPrediction = async (mealDescription: string, 
  nutrientPrediction: NutrientPrediction) => {
  await redisClient.multi()
    .hSet(nutrientPredictionKey(mealDescription), serializeNutrientPrediction(nutrientPrediction))
    .expire(nutrientPredictionKey(mealDescription), CACHING_TTL.high)
    .exec()
}

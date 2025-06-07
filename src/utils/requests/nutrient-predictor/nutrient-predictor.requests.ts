import { NutrientPrediction } from "../../../models/nutrient-predictor/nutrient-predictor.types.js"
import { errorOnGetNutrientPredictions } from "../../errors/nutrient-predictor.errors.js"
import dotenv from "dotenv"

dotenv.config()


// helper functions
export function processNutrientPredictions(nutrientPredictions: any): NutrientPrediction[] {
  return nutrientPredictions.map((nutrientPrediction: any) => {
    return {
      name: nutrientPrediction.name,
      servingSizeG: nutrientPrediction.serving_size_g,
      calories: nutrientPrediction.calories,
      macronutrients: {
        carbohydratesTotalG: nutrientPrediction.carbohydrates_total_g,
        proteinG: nutrientPrediction.protein_g,
        fatTotalG: nutrientPrediction.fat_total_g,
        fatSaturatedG: nutrientPrediction.fat_saturated_g,
      },
      micronutrients: {
        sodiumMG: nutrientPrediction.sodium_mg,
        potassiumMG: nutrientPrediction.potassium_mg,
        cholesterolMg: nutrientPrediction.cholesterol_mg,
        fiberG: nutrientPrediction.fiber_g,
        sugarG: nutrientPrediction.sugar_g
      }
    } as NutrientPrediction
  })
}

export async function getNutrientPrediction(mealDescription: string) {
  try {
    const resNutrientPredictions = await fetch(`${process.env.REACT_APP_API_NINJAS_NUTRIENT_PREDICTOR_URL}${mealDescription}`, {
      method: "GET",
      headers: {
        "X-Api-Key": `${process.env.API_NINJAS_KEY}`
      }
    })

    const resJSON = await resNutrientPredictions.json()
    const res = await processNutrientPredictions(resJSON)
    
    return {
      predictionResults: res
    }
  } catch (error) {
    errorOnGetNutrientPredictions()
    if (error) {
      return console.error("Request failed: ", error)
    }
  }
}


import { Micronutrient, NutritionTrackedDay, 
  NutritionTrackedDaysSummary } from "../../../models/nutrition-tracker/nutrition-tracker.types.ts";
import { User } from "../../../models/users/users.types.ts";
import { redisClient } from "../../../services/redis/redis.services.ts";
import { nutritionTrackedDaysSummaryKey, userNutritionTrackedDayKey, 
  userNutritionTrackedDayMicronutrientsKey, userNutritionTrackedDaysKey } from "./nutrition-tracker.keys.ts";

// helper functions
export const serializeNutritionTrackedDay = (trackedDay: NutritionTrackedDay) => {
  return {
    dateTracked: trackedDay.dateTracked,
    calories: trackedDay.dateTracked,

    carbohydrates: trackedDay.dateTracked,
    protein: trackedDay.dateTracked,
    fat: trackedDay.dateTracked
  }
}

export const serializeNutritionTrackedDayMicronutrients = (micronutrients: Micronutrient[]) => {
  return micronutrients.map((micronutrient) => {
    return `name=${micronutrient.name}!amount=${micronutrient.amount}!unit=${micronutrient.unit}`
  })
}

export const serializeNutritionTrackedDaysSummary = (nutritionTrackedDaysSummary: { [key: string]: string | number }) => {
  return {
    averageDailyCaloriesConsumption: nutritionTrackedDaysSummary.averageDailyCaloriesConsumption,
    averageDailyCarbohydratesConsumption: nutritionTrackedDaysSummary.averageDailyCarbohydratesConsumption,
    averageDailyProteinConsumption: nutritionTrackedDaysSummary.averageDailyProteinConsumption,
    averageDailyFatConsumption: nutritionTrackedDaysSummary.averageDailyFatConsumption,
  }
}

export const deserializeNutritionTrackedDay = (trackedDay: { [key: string]: string }): NutritionTrackedDay => {
  return {
    dateTracked: String(trackedDay.dateTracked),
    calories: Number(trackedDay.calories),
    macronutrients: {
      carbohydrates: Number(trackedDay.carbohydrates),
      protein: Number(trackedDay.protein),
      fat: Number(trackedDay.fat)
    },
  }
}

export const deserializeNutritionTrackedDayMicronutrients = (micronutrients: string[]): Micronutrient[] => {
  return micronutrients.map((micronutrient) => {
    const data = micronutrient.split("!")
    const name = data[0]?.split("=")[1]!
    const amount = Number(data[1]?.split("=")[1])
    const unit = data[2]?.split("=")[1]!

    return {
      name, amount, unit
    }
  })
}

export const deserializeNutritionTrackedDaysSummary = (nutritionTrackedDaysSummary: NutritionTrackedDaysSummary): { nutritionTrackedDaysSummary: NutritionTrackedDaysSummary } => {
  return {
    nutritionTrackedDaysSummary: {
      averageDailyCaloriesConsumption: Number(nutritionTrackedDaysSummary.averageDailyCaloriesConsumption),
      averageDailyCarbohydratesConsumption: Number(nutritionTrackedDaysSummary.averageDailyCarbohydratesConsumption),
      averageDailyProteinConsumption: Number(nutritionTrackedDaysSummary.averageDailyProteinConsumption),
      averageDailyFatConsumption: Number(nutritionTrackedDaysSummary.averageDailyFatConsumption)
    }
  }
}

export const areNutritionTrackedDaysCached = async (user: User) => {
  return await redisClient.exists(userNutritionTrackedDaysKey(user))
}

export const isNutritionTrackedDaysSummaryCached = async (user: User) => {
  return await redisClient.exists(nutritionTrackedDaysSummaryKey(user))
}

export const getNutritionTrackedDays = async (user: User) => {
  const nutritionTrackedDays = await redisClient.sMembers(userNutritionTrackedDaysKey(user))

  const resNutritionTrackedDays = await Promise.all(
    nutritionTrackedDays.map(async (dateTracked: string) => {
      const nutritionTrackedDay = await redisClient.hGetAll(userNutritionTrackedDayKey(user, dateTracked))
      const resNutritionTrackedDay: NutritionTrackedDay = deserializeNutritionTrackedDay(nutritionTrackedDay)

      const micronutrientsExists = await redisClient.exists(userNutritionTrackedDayMicronutrientsKey(user, dateTracked))
      if (micronutrientsExists) {
        const micronutrients = await redisClient.lRange(userNutritionTrackedDayMicronutrientsKey(user, dateTracked), 0, -1)
        const deserializedMicronutrients = deserializeNutritionTrackedDayMicronutrients(micronutrients)

        resNutritionTrackedDay.micronutrients = deserializedMicronutrients
      }

      return resNutritionTrackedDay
    })
  )

  return resNutritionTrackedDays
}

export const getNutritionTrackedDaysSummary = async (user: User) => {
  const resNutritionTrackedDaysSummary = await redisClient.hGetAll(nutritionTrackedDaysSummaryKey(user))
  return deserializeNutritionTrackedDaysSummary(resNutritionTrackedDaysSummary)
}
 
export const saveNutritionTrackedDays = async (user: User, nutritionTrackedDays: NutritionTrackedDay[]) => {
  await Promise.all(
    nutritionTrackedDays.map(async (trackedDate) => {
      await Promise.all([
        redisClient.sAdd(userNutritionTrackedDaysKey(user), trackedDate.dateTracked),

        redisClient.hSet(userNutritionTrackedDayKey(user, trackedDate.dateTracked),
          serializeNutritionTrackedDay(trackedDate))
      ])

      if (trackedDate.micronutrients) {
        redisClient.rPush(userNutritionTrackedDayMicronutrientsKey(user, trackedDate.dateTracked),
        serializeNutritionTrackedDayMicronutrients(trackedDate.micronutrients))
      }
    })
  )
}

export const saveNutritionTrackedDaysSummary = async (user: User, 
  nutritionTrackedDaysSummary: NutritionTrackedDaysSummary) => {
  
  await redisClient.hSet(nutritionTrackedDaysSummaryKey(user), 
    serializeNutritionTrackedDaysSummary(nutritionTrackedDaysSummary))
}
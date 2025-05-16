// nutrition tracker types

export type UserId = string
export type Email = string
export type NutritionTrackedDate = string

export type NutritionTrackedDay = {
  dateTracked: string,
  calories: number,
  macronutrients: Macronutrients,
  micronutrients?: Micronutrient[]
}

export type Macronutrients = {
  carbohydrates: number,
  protein: number,
  fat: number
}

export type Micronutrient = {
  name: string,
  amount: number,
  unit: string
}

export type NutritionTrackedDaysSummary = {
  averageDailyCaloriesConsumption: number,
  averageDailyCarbohydratesConsumption: number,
  averageDailyProteinConsumption: number,
  averageDailyFatConsumption: number
}
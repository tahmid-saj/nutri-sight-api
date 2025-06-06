
export type NutrientPrediction = {
  name: string,
  servingSizeG: string | number,
  calories: string | number,
  macronutrients: MacronutrientPrediction,
  micronutrients: MicronutrientPrediction
}

export type MacronutrientPrediction = {
  carbohydratesTotalG: string | number,
  proteinG: string | number,
  fatTotalG: string | number,
  fatSaturatedG: string | number
}

export type MicronutrientPrediction = {
  sodiumMG: string | number,
  potassiumMG: string | number,
  cholesterolMg: string | number,
  fiberG: string | number,
  sugarG: string | number
}
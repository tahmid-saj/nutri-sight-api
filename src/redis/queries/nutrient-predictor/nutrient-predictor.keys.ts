
// hash containing nutrient prediction fields
export const nutrientPredictionKey = (mealDescription: string) => `nutrient-pred#${mealDescription}`

export const nutrientPredictionResultsKey = (mealDescription: string, resultId: string) => `nutrient-pred-result#${mealDescription}:${resultId}`

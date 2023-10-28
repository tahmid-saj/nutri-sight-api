const { nutritionTrackedDaysDatabase, nutritionTrackedDaysSummaryDatabase } = require("./nutrition-tracker.mongo");

const { validateGetNutritionTrackedDaysSummary } = require("../../utils/validations/nutrition-tracker/nutrition-tracker.validations")

// nutrition tracker crud for mongodb

// user sign in
async function getNutritionTrackedDays(userId, email) {
  const nutritionTrackedDays = await nutritionTrackedDaysDatabase.find({
    userId: userId,
    email: email
  })
  .then(res => {
    const nutritionTrackedDays = res.map(nutritionTrackedDay => {
      return {
        dateTracked: nutritionTrackedDay.dateTracked,
        calories: nutritionTrackedDay.calories,
        macronutrients: {
          carbohydrates: nutritionTrackedDay.macronutrients.carbohydrates,
          protein: nutritionTrackedDay.macronutrients.protein,
          fat: nutritionTrackedDay.macronutrients.fat
        },
        micronutrients: nutritionTrackedDay.micronutrients
      }
    })

    return nutritionTrackedDays;
  })
  .catch(error => {
    // TODO: handle error
    console.log(error)
  });

  return {
    nutritionTrackedDays: [ ...nutritionTrackedDays ]
  }
}

async function getNutritionTrackedDaysSummary(userId, email) {
  const nutritionTrackedDaysSummary = await nutritionTrackedDaysSummaryDatabase.findOne({
    userId: userId,
    email: email
  })
  .then(res => {
    if (validateGetNutritionTrackedDaysSummary(res) === true) return Object({})

    return res.toObject()
  })
  .then(res => {
    const summary = {
      averageDailyCaloriesConsumption: res.averageDailyCaloriesConsumption,
      averageDailyCarbohydratesConsumption: res.averageDailyCarbohydratesConsumption,
      averageDailyProteinConsumption: res.averageDailyProteinConsumption,
      averageDailyFatConsumption: res.averageDailyFatConsumption
    }

    return summary;
  })
  .catch(error => {
    // TODO: handle error
    console.log(error)
  })

  return {
    nutritionTrackedDaysSummary: nutritionTrackedDaysSummary
  }
}

// tracked days operations
async function addNutritionTrackedDay(userId, email, nutritionTrackedDay) {

}

async function updateNutritionTrackedDay(userId, email, nutritionTrackedDay) {

}

async function removeNutritionTrackedDay(userId, email, nutritionTrackedDate) {

}

// user sign out
async function updateNutritionTrackedDays(userId, email, nutritionTrackedDays) {

}

async function updateNutritionTrackedDaysSummary(userId, email, nutritionTrackedDaysSummary) {

}

module.exports = {
  getNutritionTrackedDays,
  getNutritionTrackedDaysSummary,
  addNutritionTrackedDay,
  updateNutritionTrackedDay,
  removeNutritionTrackedDay,
  updateNutritionTrackedDays,
  updateNutritionTrackedDaysSummary,
}
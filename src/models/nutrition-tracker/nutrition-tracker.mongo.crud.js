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
async function calculateAverageConsumption(userId, email) {
  const trackedDaysAvgConsumptions = await nutritionTrackedDaysDatabase.find({
    userId: userId,
    email: email,
  })
  .then(trackedDayConsumptions => {
    // TODO: need to move to calculations folder
    const totalCaloriesConsumption = trackedDayConsumptions.reduce((totalCaloriesConsumption, { calories }) => {
      return totalCaloriesConsumption + calories;
    }, 0)

    const totalCarbohydratesConsumption = trackedDayConsumptions.reduce((totalCarbohydratesConsumption, { macronutrients }) => {
      return totalCarbohydratesConsumption + macronutrients.carbohydrates;
    }, 0)

    const totalProteinConsumption = trackedDayConsumptions.reduce((totalProteinConsumption, { macronutrients }) => {
      return totalProteinConsumption + macronutrients.protein;
    }, 0)

    const totalFatConsumption = trackedDayConsumptions.reduce((totalFatConsumption, { macronutrients }) => {
      return totalFatConsumption + macronutrients.fat;
    }, 0)

    return {
      avgCaloriesConsumption: totalCaloriesConsumption / trackedDayConsumptions.length,
      avgCarbohydratesConsumption: totalCarbohydratesConsumption / trackedDayConsumptions.length,
      avgProteinConsumption: totalProteinConsumption / trackedDayConsumptions.length,
      avgFatConsumption: totalFatConsumption / trackedDayConsumptions.length,
    }
  });

  return trackedDaysAvgConsumptions;
}

async function addNutritionTrackedDayToSummary(userId, email) {
  const nutritionTrackedDaySummaryExists = await nutritionTrackedDaysSummaryDatabase.findOne({
    userId: userId,
    email: email
  });

  if (nutritionTrackedDaySummaryExists) {
    const { avgCaloriesConsumption, avgCarbohydratesConsumption, 
      avgProteinConsumption, avgFatConsumption } = await calculateAverageConsumption(userId, email);

    await nutritionTrackedDaysSummaryDatabase.updateOne({
      userId: userId,
      email: email,
    }, {
      averageDailyCaloriesConsumption: avgCaloriesConsumption,
      averageDailyCarbohydratesConsumption: avgCarbohydratesConsumption,
      averageDailyProteinConsumption: avgProteinConsumption,
      averageDailyFatConsumption: avgFatConsumption,
    })
  } else {
    return;
  }
}

async function updateNutritionTrackedDaySummary(userId, email, nutritionTrackedDay) {
  const nutritionTrackedDaySummaryExists = await nutritionTrackedDaysSummaryDatabase.findOne({
    userId: userId,
    email: email
  });

  if (!nutritionTrackedDaySummaryExists) {
    const newNutritionTrackedDaySummary = new nutritionTrackedDaysSummaryDatabase({
      userId: userId,
      email: email,
      averageDailyCaloriesConsumption: Number(nutritionTrackedDay.calories),
      averageDailyCarbohydratesConsumption: Number(nutritionTrackedDay.macronutrients.carbohydrates),
      averageDailyProteinConsumption: Number(nutritionTrackedDay.macronutrients.protein),
      averageDailyFatConsumption: Number(nutritionTrackedDay.macronutrients.fat),
    });

    await newNutritionTrackedDaySummary.save();
  } else {
    await addNutritionTrackedDayToSummary(userId, email, nutritionTrackedDay);
    return;
  }
}

async function createUpdatedNutritionTrackedDaysSummary(userId, email, updatedNutritionTrackedDay) {
  const nutritionTrackedDaySummaryExists = await nutritionTrackedDaysSummaryDatabase.find({
    userId: userId,
    email: email
  });

  if (!nutritionTrackedDaySummaryExists) {
    const newNutritionTrackedDaySummary = new nutritionTrackedDaysSummaryDatabase({
      userId: userId,
      email: email,
      averageDailyCaloriesConsumption: Number(updatedNutritionTrackedDay.calories),
      averageDailyCarbohydratesConsumption: Number(updatedNutritionTrackedDay.macronutrients.carbohydrates),
      averageDailyProteinConsumption: Number(updatedNutritionTrackedDay.macronutrients.protein),
      averageDailyFatConsumption: Number(updatedNutritionTrackedDay.macronutrients.fat),
    });

    await newNutritionTrackedDaySummary.save();
  } else {
    return;
  }
}

async function addNutritionTrackedDay(userId, email, nutritionTrackedDay) {
  const nutritionTrackedDayExists = await nutritionTrackedDaysDatabase.findOne({
    userId: userId,
    email: email,
    dateTracked: nutritionTrackedDay.dateTracked
  });

  console.log(nutritionTrackedDay)

  if (!nutritionTrackedDayExists) {
    const newNutritionTrackedDay = new nutritionTrackedDaysDatabase({
      userId: userId,
      email: email,
      dateTracked: nutritionTrackedDay.dateTracked,
      calories: nutritionTrackedDay.calories,
      macronutrients: {
        carbohydrates: nutritionTrackedDay.macronutrients.carbohydrates,
        protein: nutritionTrackedDay.macronutrients.protein,
        fat: nutritionTrackedDay.macronutrients.fat
      },
      micronutrients: nutritionTrackedDay.micronutrients
    });

    await newNutritionTrackedDay.save();

    await updateNutritionTrackedDaySummary(userId, email, nutritionTrackedDay);
  } else {
    return;
  }
}

async function updateNutritionTrackedDay(userId, email, originalNutritionTrackedDay, updatedNutritionTrackedDay) {
  const nutritionTrackedDayExists = await nutritionTrackedDaysDatabase.findOne({
    userId: userId,
    email: email,
    dateTracked: originalNutritionTrackedDay.dateTracked
  });

  if (nutritionTrackedDayExists) {
    await nutritionTrackedDaysDatabase.updateOne({
      userId: userId,
      email: email,
      dateTracked: originalNutritionTrackedDay.dateTracked
    }, {
      calories: updatedNutritionTrackedDay.calories,
      macronutrients: {
        carbohydrates: updatedNutritionTrackedDay.macronutrients.carbohydrates,
        protein: updatedNutritionTrackedDay.macronutrients.protein,
        fat: updatedNutritionTrackedDay.macronutrients.fat
      },
      micronutrients: updatedNutritionTrackedDay.micronutrients
    })
  } else {
    return;
  }

  const nutritionTrackedDaySummaryExists = await nutritionTrackedDaysSummaryDatabase.findOne({
    userId: userId,
    email: email,
  });

  if (nutritionTrackedDaySummaryExists) {
    console.log(Number(originalNutritionTrackedDay.calories))
    // const updatedCarbohydrates = Number(updatedNutritionTrackedDay.macronutrients.carbohydrates);
    // const updatedProtein = Number(updatedNutritionTrackedDay.macronutrients.protein);
    // const updatedFat = Number(updatedNutritionTrackedDay.macronutrients.fat);
    const { avgCaloriesConsumption, avgCarbohydratesConsumption, 
      avgProteinConsumption, avgFatConsumption } = await calculateAverageConsumption(userId, email);

    await nutritionTrackedDaysSummaryDatabase.updateOne({
      userId: userId,
      email: email,
    }, {
      averageDailyCaloriesConsumption: avgCaloriesConsumption,
      averageDailyCarbohydratesConsumption: avgCarbohydratesConsumption,
      averageDailyProteinConsumption: avgProteinConsumption,
      averageDailyFatConsumption: avgFatConsumption,
    });
  } else {
    await createUpdatedNutritionTrackedDaysSummary(userId, email, updatedNutritionTrackedDay);
  }
}

async function removeNutritionTrackedDay(userId, email, nutritionTrackedDate) {
  const nutritionTrackedDayExists = await nutritionTrackedDaysDatabase.findOne({
    userId: userId,
    email: email,
    dateTracked: nutritionTrackedDate
  });

  if (nutritionTrackedDayExists) {
    await nutritionTrackedDaysDatabase.updateOne({
      userId: userId,
      email: email,
    }, {
      $inc: {
        averageDailyCaloriesConsumption: -Number(nutritionTrackedDayExists.calories),
        averageDailyCarbohydratesConsumption: -Number(nutritionTrackedDayExists.macronutrients.carbohydrates),
        averageDailyProteinConsumption: -Number(nutritionTrackedDayExists.macronutrients.protein),
        averageDailyFatConsumption: -Number(nutritionTrackedDayExists.macronutrients.fat)
      }
    });

    await nutritionTrackedDaysDatabase.deleteOne({
      userId: userId,
      email: email,
      nutritionTrackedDate: nutritionTrackedDate
    })
  } else {
    return;
  }
}

// user sign out
async function updateNutritionTrackedDays(userId, email, nutritionTrackedDays) {
  const nutritionTrackedDaysExists = await nutritionTrackedDaysDatabase.findOne({
    userId: userId,
    email: email
  });

  if (nutritionTrackedDaysExists && nutritionTrackedDays !== undefined && nutritionTrackedDays.length !== 0) {
    nutritionTrackedDays.map(async (nutritionTrackedDay) => {
      await nutritionTrackedDaysDatabase.updateOne({
        userId: userId,
        email: email,
        dateTracked: nutritionTrackedDay.dateTracked,
      }, {
        calories: nutritionTrackedDay.calories,
        macronutrients: {
          carbohydrates: nutritionTrackedDay.macronutrients.carbohydrates,
          protein: nutritionTrackedDay.macronutrients.protein,
          fat: nutritionTrackedDay.macronutrients.fat
        },
        micronutrients: nutritionTrackedDay.micronutrients
      })
    })
  } else {
    return;
  }
}

async function updateNutritionTrackedDaysSummary(userId, email, nutritionTrackedDaysSummary) {
  const nutritionTrackedDaysSummaryExists = await nutritionTrackedDaysDatabase.findOne({
    userId: userId,
    email: email
  });

  if (nutritionTrackedDaysSummaryExists && nutritionTrackedDaysSummary !== undefined && nutritionTrackedDaysSummary !== Object({})) {
    await nutritionTrackedDaysSummaryDatabase.updateOne({
      userId: userId,
      email: email,
    }, {
      averageDailyCaloriesConsumption: nutritionTrackedDaysSummary.averageDailyCaloriesConsumption,
      averageDailyCarbohydratesConsumption: nutritionTrackedDaysSummary.averageDailyCarbohydratesConsumption,
      averageDailyProteinConsumption: nutritionTrackedDaysSummary.averageDailyProteinConsumption,
      averageDailyFatConsumption: nutritionTrackedDaysSummary.averageDailyFatConsumption,
    })
  } else {
    return;
  }
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
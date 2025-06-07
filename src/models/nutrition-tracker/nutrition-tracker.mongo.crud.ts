import { nutritionTrackedDaysDatabase, nutritionTrackedDaysSummaryDatabase } from "./nutrition-tracker.mongo.js"

import { validateGetNutritionTrackedDaysSummary } from "../../utils/validations/nutrition-tracker/nutrition-tracker.validations.js"
import { Email, NutritionTrackedDate, NutritionTrackedDay, NutritionTrackedDaysSummary, UserId } from "./nutrition-tracker.types.js";
import { Document } from "mongodb";

// nutrition tracker crud for mongodb

// user sign in
export async function getNutritionTrackedDays(userId: UserId, email: Email): Promise<{ nutritionTrackedDays: NutritionTrackedDay[] }> {
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
    return [] as NutritionTrackedDay[]
  });

  return {
    nutritionTrackedDays: [ ...nutritionTrackedDays ]
  }
}

export async function getNutritionTrackedDaysSummary(userId: UserId, email: Email): Promise<{ nutritionTrackedDaysSummary: NutritionTrackedDaysSummary | void}> {
  const nutritionTrackedDaysSummary = await nutritionTrackedDaysSummaryDatabase.findOne({
    userId: userId,
    email: email
  })
  .then((res: any) => {
    if (validateGetNutritionTrackedDaysSummary(res) === true) return Object({})

    return res.toObject()
  })
  .then((res: Document) => {
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
export async function calculateAverageConsumption(userId: UserId, email: Email): Promise<any> {
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

export async function addNutritionTrackedDayToSummary(userId: UserId, email: Email): Promise<void> {
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

export async function updateNutritionTrackedDaySummary(userId: UserId, email: Email, nutritionTrackedDay: NutritionTrackedDay) {
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
    await addNutritionTrackedDayToSummary(userId, email);
    return;
  }
}

export async function createUpdatedNutritionTrackedDaysSummary(userId: UserId, email: Email, 
  updatedNutritionTrackedDay: NutritionTrackedDay): Promise<void> {
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

export async function addNutritionTrackedDay(userId: UserId, email: Email, 
  nutritionTrackedDay: NutritionTrackedDay): Promise<void> {
  const nutritionTrackedDayExists = await nutritionTrackedDaysDatabase.findOne({
    userId: userId,
    email: email,
    dateTracked: nutritionTrackedDay.dateTracked
  });

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

export async function removeNutritionTrackedDay(userId: UserId, email: Email, 
  nutritionTrackedDate: NutritionTrackedDate): Promise<void> {
  const nutritionTrackedDayExists = await nutritionTrackedDaysDatabase.findOne({
    userId: userId,
    email: email,
    dateTracked: nutritionTrackedDate
  });

  if (nutritionTrackedDayExists) {
    await nutritionTrackedDaysDatabase.deleteOne({
      userId: userId,
      email: email,
      dateTracked: nutritionTrackedDate
    })

    const nutritionTrackedDaysAverages = await nutritionTrackedDaysDatabase.find({
      userId: userId,
      email: email
    })
    .then(res => {
      let totalCaloriesConsumption = 0
      let totalCarbohydratesConsumption = 0
      let totalProteinConsumption = 0
      let totalFatConsumption = 0
      let nutritionTrackedDays = 0

      const nutritionTrackedDaysAverages = res.map(nutritionTrackedDay => {
        totalCaloriesConsumption += nutritionTrackedDay.calories
        totalCarbohydratesConsumption += nutritionTrackedDay.macronutrients.carbohydrates
        totalProteinConsumption += nutritionTrackedDay.macronutrients.protein
        totalFatConsumption += nutritionTrackedDay.macronutrients.fat
        nutritionTrackedDays += 1
      })
  
      return {
        averageDailyCaloriesConsumption: totalCaloriesConsumption / nutritionTrackedDays,
        averageDailyCarbohydratesConsumption: totalCarbohydratesConsumption / nutritionTrackedDays,
        averageDailyProteinConsumption: totalProteinConsumption / nutritionTrackedDays,
        averageDailyFatConsumption: totalFatConsumption / nutritionTrackedDays
      }
    })

    await nutritionTrackedDaysSummaryDatabase.updateOne({
      userId: userId,
      email: email,
    }, {
      averageDailyCaloriesConsumption: nutritionTrackedDaysAverages.averageDailyCaloriesConsumption,
      averageDailyCarbohydratesConsumption: nutritionTrackedDaysAverages.averageDailyCarbohydratesConsumption,
      averageDailyProteinConsumption: nutritionTrackedDaysAverages.averageDailyProteinConsumption,
      averageDailyFatConsumption: nutritionTrackedDaysAverages.averageDailyFatConsumption
    });
  } else {
    return;
  }
}

export async function updateNutritionTrackedDay(userId: UserId, email: Email, 
  originalNutritionTrackedDay: NutritionTrackedDay, updatedNutritionTrackedDay: NutritionTrackedDay): Promise<void> {
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

// user sign out
export async function updateNutritionTrackedDays(userId: UserId, email: Email, 
  nutritionTrackedDays: NutritionTrackedDay[]): Promise<void> {
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

export async function updateNutritionTrackedDaysSummary(userId: UserId, email: Email, 
  nutritionTrackedDaysSummary: NutritionTrackedDaysSummary): Promise<void> {
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

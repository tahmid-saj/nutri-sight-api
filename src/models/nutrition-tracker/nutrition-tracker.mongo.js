const mongoose = require('mongoose');

const nutritionTrackedDaysSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateTracked: {
    type: Date,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
    default: 0,
  },
  macronutrients: {
    type: {
      carbohydrates: {
        type: Number,
        required: true,
        default: 0,
      },
      protein: {
        type: Number,
        required: true,
        default: 0,
      },
      fat: {
        type: Number,
        required: true,
        default: 0,
      }
    },
    default: {},
    required: true,
  },
  micronutrients: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
          default: 0,
        },
        unit: {
          type: String,
          required: true,
        }
      }
    ],
    default: [],
    required: false,
  }
});

const nutritionTrackedDaysSummarySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  averageDailyCaloriesConsumption: {
    type: Number,
    required: true,
    default: 0,
  },
  averageDailyCarbohydratesConsumption: {
    type: Number,
    required: true,
    default: 0,
  },
  averageDailyProteinConsumption: {
    type: Number,
    required: true,
    default: 0,
  },
  averageDailyFatConsumption: {
    type: Number,
    required: true,
    default: 0,
  }
});

const nutritionTrackedDaysDatabase = mongoose.model("NutritionTrackedDays", nutritionTrackedDaysSchema);
const nutritionTrackedDaysSummaryDatabase = mongoose.model("NutritionTrackedDaysSummary", nutritionTrackedDaysSummarySchema);

module.exports = {
  nutritionTrackedDaysDatabase,
  nutritionTrackedDaysSummaryDatabase,
}

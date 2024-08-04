const nutritionTrackerModel = require("./nutrition-tracker.model")

module.exports = {
  Query: {
    nutritionTrackedDaysByUser: (parent, args) => {
      return nutritionTrackerModel.nutritionTrackedDaysByUser(args.userId, args.email)
    },
    nutritionTrackedDaysSummaryByUser: (parent, args) => {
      return nutritionTrackerModel.nutritionTrackedDaysSummaryByUser(args.userId, args.email)
    }
  },
  Mutation: {
    createUserNutritionTrackedDay: (parent, args) => {
      return nutritionTrackerModel.createUserNutritionTrackedDay(args.userId, args.email, args.nutritionTrackedDay)
    },
    deleteUserNutritionTrackedDay: (parent, args) => {
      return nutritionTrackerModel.deleteUserNutritionTrackedDay(args.userId, args.email, args.nutritionTrackedDate)
    },
    updateUserNutritionTrackedDay: (parent, args) => {
      const originalNutritionTrackedDay = args.nutritionTrackedDayInfoUpdate.originalNutritionTrackedDay
      const updatedNutritionTrackedDay = args.nutritionTrackedDayInfoUpdate.updatedNutritionTrackedDay

      return nutritionTrackerModel.updateUserNutritionTrackedDay(args.userId, args.email, 
        originalNutritionTrackedDay, updatedNutritionTrackedDay
      )
    },
    updateUserNutritionTrackedDays: (parent, args) => {
      return nutritionTrackerModel.updateUserNutritionTrackedDays(args.userId, args.email, args.nutritionTrackedDays)
    },
    updateUserNutritionTrackedDaysSummary: (parent, args) => {
      return nutritionTrackerModel.updateUserNutritionTrackedDaysSummary(args.userId, args.email, args.nutritionTrackedDaysSummary)
    }
  }
}
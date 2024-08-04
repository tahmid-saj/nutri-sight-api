const nutritionTrackerModel = require("./nutrition-tracker.model")

module.exports = {
  Query: {
    nutritionTrackedDaysByUser: (parent, args) => {
      return nutritionTrackerModel.nutritionTrackedDaysByUser(args.userId, args.email)
    }
  }
}
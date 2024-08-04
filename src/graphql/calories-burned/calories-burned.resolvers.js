const caloriesBurnedModel = require("./calories-burned.model")

module.exports = {
  Query: {
    trackedCaloriesBurnedByUser: (parent, args) => {
      return caloriesBurnedModel.trackedCaloriesBurnedByUser(args.userId, args.email)
    }
  },
  Mutation: {
    createUserTrackedCaloriesBurned: (parent, args) => {
      return caloriesBurnedModel.createUserTrackedCaloriesBurned(args.userId, args.email, args.trackedCaloriesBurned)
    },
    deleteUserTrackedCaloriesBurned: (parent, args) => {
      return caloriesBurnedModel.deleteUserTrackedCaloriesBurned(args.userId, args.email, args.activityId)
    },
    updateUserTrackedCaloriesBurned: (parent, args) => {
      return caloriesBurnedModel.updateUserTrackedCaloriesBurned(args.userId, args.email, args.trackedCaloriesBurned)
    }
  }
}
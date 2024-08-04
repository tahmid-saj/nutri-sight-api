const fitnessModel = require("./fitness.model")

module.exports = {
  Query: {
    exercisesByUser: (parent, args) => {
      return fitnessModel.exercisesByUser(args.userId, args.email)
    }
  },
  Mutation: {
    createUserExercise: (parent, args) => {
      return fitnessModel.createUserExercise(args.userId, args.email, args.exercise)
    },
    deleteUserExercise: (parent, args) => {
      return fitnessModel.deleteUserExercise(args.userId, args.email, args.exerciseTag)
    },
    updateUserExercises: (parent, args) => {
      return fitnessModel.updateUserExercises(args.userId, args.email, args.exercises)
    }
  }
}
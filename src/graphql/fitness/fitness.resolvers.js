const fitnessModel = require("./fitness.model")

module.exports = {
  Query: {
    exercisesByUser: (parent, args) => {
      return fitnessModel.exercisesByUser(args.userId, args.email)
    }
  }
}
const { getExercises,
  addExercise, removeExercise,
  updateExercises
} = require("../../models/fitness/fitness.mongo.crud")

async function exercisesByUser(userId, email) {
  const exercises = await getExercises(userId, email)
  return exercises.exercises
}

module.exports = {
  exercisesByUser
}
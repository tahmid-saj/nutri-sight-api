const { getExercises,
  addExercise, removeExercise,
  updateExercises
} = require("../../models/fitness/fitness.mongo.crud")

async function exercisesByUser(userId, email) {
  const exercises = await getExercises(userId, email)
  return exercises.exercises
}

async function createUserExercise(userId, email, exercise) {
  addExercise(userId, email, exercise)
  console.log("Posting tracked fitness data")
  return true
}

async function deleteUserExercise(userId, email, exerciseTag) {
  removeExercise(userId, email, exerciseTag)
  console.log("Deleting tracked fitness data")
  return true
}

async function updateUserExercises(userId, email, exercises) {
  updateExercises(userId, email, exercises)
  console.log("Updating tracked fitness data")
  return true
}

module.exports = {
  exercisesByUser,
  createUserExercise,
  deleteUserExercise,
  updateUserExercises
}
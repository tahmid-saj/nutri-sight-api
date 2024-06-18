const { getExercises,
  addExercise, removeExercise,
  updateExercises
} = require("./fitness.mongo.crud")

// TODO: handle error


// sign in
async function getExercisesData(userId, email) {
  console.log("Getting tracked fitness data")
  return getExercises(userId, email)
}

// fitness operations
async function postExercise(userId, email, exercise) {
  addExercise(userId, email, exercise)
  console.log("Posting tracked fitness data")
  return true
}

async function deleteExercise(userId, email, exerciseTag) {
  removeExercise(userId, email, exerciseTag)
  console.log("Deleting tracked fitness data")
  return true
}

// sign out
async function putExercises(userId, email, exercises) {
  updateExercises(userId, email, exercises)
  console.log("Updating tracked fitness data")
  return true
}

module.exports = {
  getExercisesData,
  postExercise,
  deleteExercise,
  putExercises
}
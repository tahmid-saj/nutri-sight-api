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
  await addExercise(userId, email, exercise)
  console.log("Posting tracked fitness data")
}

async function deleteExercise(userId, email, exerciseTag) {
  await removeExercise(userId, email, exerciseTag)
  console.log("Deleting tracked fitness data")
}

// sign out
async function putExercises(userId, email, exercises) {
  await updateExercises(userId, email, exercises)
  console.log("Updating tracked fitness data")
}

module.exports = {
  getExercisesData,
  postExercise,
  deleteExercise,
  putExercises
}
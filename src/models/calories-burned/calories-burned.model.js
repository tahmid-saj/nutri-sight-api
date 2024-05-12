const { getTrackedCaloriesBurned,
  addTrackedCaloriesBurned, removeTrackedCaloriesBurned,
  updateTrackedCaloriesBurned
} = require("./calories-burned.mongo.crud")

// TODO: handle error


// sign in
async function getTrackedCaloriesBurnedData(userId, email) {
  console.log("Getting tracked calories burned data")
  return getTrackedCaloriesBurned(userId, email)
}

// calories burned operations
async function postTrackedCaloriesBurned(userId, email, trackedCaloriesBurned) {
  await addTrackedCaloriesBurned(userId, email, trackedCaloriesBurned)
  console.log("Posting tracked calories burned data")
}

async function deleteTrackedCaloriesBurned(userId, email, activityId) {
  await removeTrackedCaloriesBurned(userId, email, activityId)
  console.log("Deleting tracked calories burned data")
}

// sign out
async function putTrackedCaloriesBurned(userId, email, trackedCaloriesBurned) {
  await updateTrackedCaloriesBurned(userId, email, trackedCaloriesBurned)
  console.log("Updating tracked calories burned data")
}

module.exports = {
  getTrackedCaloriesBurnedData,
  postTrackedCaloriesBurned,
  deleteTrackedCaloriesBurned,
  putTrackedCaloriesBurned
}
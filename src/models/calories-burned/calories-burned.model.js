const { getTrackedCaloriesBurned,
  addTrackedCaloriesBurned, removeTrackedCaloriesBurned,
  updateTrackedCaloriesBurned
} = require("./calories-burned.mongo.crud")

// sign in
async function getTrackedCaloriesBurnedData(userId, email) {
  console.log("Getting tracked calories burned data")
  return getTrackedCaloriesBurned(userId, email)
}

// calories burned operations
async function postTrackedCaloriesBurned(userId, email, trackedCaloriesBurned) {
  console.log("Posting tracked calories burned data")
  return addTrackedCaloriesBurned(userId, email, trackedCaloriesBurned)
}

async function deleteTrackedCaloriesBurned(userId, email, activityId) {
  console.log("Deleting tracked calories burned data")
  return removeTrackedCaloriesBurned(userId, email, activityId)
}

// sign out
async function putTrackedCaloriesBurned(userId, email, trackedCaloriesBurned) {
  console.log("Updating tracked calories burned data")
  return updateTrackedCaloriesBurned(userId, email, trackedCaloriesBurned)
}

module.exports = {
  getTrackedCaloriesBurnedData,
  postTrackedCaloriesBurned,
  deleteTrackedCaloriesBurned,
  putTrackedCaloriesBurned
}
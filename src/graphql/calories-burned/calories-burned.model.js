const { getTrackedCaloriesBurned,
  addTrackedCaloriesBurned, removeTrackedCaloriesBurned,
  updateTrackedCaloriesBurned
} = require("../../models/calories-burned/calories-burned.mongo.crud")

async function trackedCaloriesBurnedByUser(userId, email) {
  const trackedCaloriesBurned = await getTrackedCaloriesBurned(userId, email)
  return trackedCaloriesBurned.trackedCaloriesBurned
}

async function createUserTrackedCaloriesBurned(userId, email, trackedCaloriesBurned) {
  await addTrackedCaloriesBurned(userId, email, trackedCaloriesBurned)
  console.log("Posting tracked calories burned data")
  return true
}

async function deleteUserTrackedCaloriesBurned(userId, email, activityId) {
  await removeTrackedCaloriesBurned(userId, email, activityId)
  console.log("Deleting tracked calories burned data")
  return true
}

async function updateUserTrackedCaloriesBurned(userId, email, trackedCaloriesBurned) {
  await updateTrackedCaloriesBurned(userId, email, trackedCaloriesBurned)
  console.log("Updating tracked calories burned data")
  return true
}

module.exports = {
  trackedCaloriesBurnedByUser,
  createUserTrackedCaloriesBurned,
  deleteUserTrackedCaloriesBurned,
  updateUserTrackedCaloriesBurned
}
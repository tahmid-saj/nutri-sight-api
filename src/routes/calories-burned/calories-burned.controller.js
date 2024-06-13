const { getSearchedActivity } = require("../../utils/requests/calories-burned/calories-burned.requests")
const { getTrackedCaloriesBurnedData, 
  postTrackedCaloriesBurned, deleteTrackedCaloriesBurned,
  putTrackedCaloriesBurned 
} = require("../../models/calories-burned/calories-burned.model")

// searching activity
async function httpGetSearchedActivity(req, res) {
  try {
    const activity = String(req.body.activity)
    const dateTracked = String(req.body.dateTracked)
    const weightPounds = String(req.body.weightPounds)
    const durationMinutes = String(req.body.durationMinutes)

    const resGetSearchedActivity = await getSearchedActivity(activity, dateTracked, weightPounds, durationMinutes)

    if (resGetSearchedActivity) return res.status(200).json(resGetSearchedActivity)
  } catch (error) {
    console.log(error)
  }
}

// signed in
async function httpGetTrackedCaloriesBurned(req, res) {
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const resGetTrackedCaloriesBurned = await getTrackedCaloriesBurnedData(userId, email)

    if (resGetTrackedCaloriesBurned) return res.status(200).json(resGetTrackedCaloriesBurned)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

// calories burned operations
async function httpPostTrackedCaloriesBurned(req, res) {
  try {
    const trackedCaloriesBurned = req.body
    const userId = req.params.userid;
    const email = req.params.email;
    const resPostTrackedCaloriesBurned = await postTrackedCaloriesBurned(userId, email, trackedCaloriesBurned)

    if (resPostTrackedCaloriesBurned) return res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

async function httpDeleteTrackedCaloriesBurned(req, res) {
  try {
    const activityId = Number(String(req.body)) 
    const userId = req.params.userid;
    const email = req.params.email;
    const resDeleteTrackedCaloriesBurned = await deleteTrackedCaloriesBurned(userId, email, activityId)

    if (resDeleteTrackedCaloriesBurned) return res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

// signed out
async function httpPutTrackedCaloriesBurned(req, res) {
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const { trackedCaloriesBurned } = req.body
    const resPutTrackedCaloriesBurned = await putTrackedCaloriesBurned(userId, email, trackedCaloriesBurned)

    if (resPutTrackedCaloriesBurned) return res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

module.exports = {
  httpGetSearchedActivity,
  httpGetTrackedCaloriesBurned,
  httpPostTrackedCaloriesBurned,
  httpDeleteTrackedCaloriesBurned,
  httpPutTrackedCaloriesBurned
}
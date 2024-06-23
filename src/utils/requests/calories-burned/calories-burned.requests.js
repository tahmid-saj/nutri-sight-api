const { errorOnGetSearchActivity } = require("../../errors/calories-burned.errors")
require("dotenv").config();

// helper functions
async function processSearchedActivity(activity, dateTracked, weightPounds, durationMinutes, activityResults) {
  return activityResults.map((activityResult) => {
    return {
      activity: String(activityResult.name),
      searchedActivity: String(activity),
      dateTracked: String(dateTracked),
      caloriesBurnedPerHour: Number(activityResult.calories_per_hour),
      durationMinutes: Number(activityResult.duration_minutes),
      totalCaloriesBurned: Number(activityResult.total_calories)
    }
  })
}

// searching activity
async function getSearchedActivity(activity, dateTracked, weightPounds, durationMinutes) {
  try {
    let url = `${process.env.REACT_APP_API_NINJAS_CALORIES_BURNED_URL}${activity}`

    if (weightPounds !== "") {
      url = url + `&weight=${weightPounds}`
    }
    if (durationMinutes !== "") {
      url = url + `&duration=${durationMinutes}`
    }

    const resActivityResults = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "X-Api-Key": `${process.env.API_NINJAS_KEY}`
      }
    })

    const resJSON = await resActivityResults.json()
    const res = await processSearchedActivity(activity, dateTracked, weightPounds, durationMinutes, resJSON)
    return {
      searchedActivities: res
    }
  } catch (error) {
    errorOnGetSearchActivity()
    if (error) {
      return console.error("Request failed: ", error)
    }
  }
}

module.exports = {
  getSearchedActivity
}
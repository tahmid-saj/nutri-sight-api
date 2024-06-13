const express = require("express")

const { httpGetSearchedActivity, httpGetTrackedCaloriesBurned,
  httpPostTrackedCaloriesBurned, httpDeleteTrackedCaloriesBurned,
  httpPutTrackedCaloriesBurned
} = require("./calories-burned.controller")
 
const caloriesBurnedRouter = express.Router()

// TODO: move to env variables
// searching activity
caloriesBurnedRouter.post("/search-activity", httpGetSearchedActivity)

// user sign in
caloriesBurnedRouter.get("/tracked-calories-burned/:userid/:email", httpGetTrackedCaloriesBurned)

// calories burned operations
caloriesBurnedRouter.post("/tracked-calories-burned/:userid/:email", httpPostTrackedCaloriesBurned)
caloriesBurnedRouter.delete("/tracked-calories-burned/:userid/:email", httpDeleteTrackedCaloriesBurned)

// user sign out
caloriesBurnedRouter.put("/tracked-calories-burned/:userid/:email", httpPutTrackedCaloriesBurned)

module.exports = {
  caloriesBurnedRouter
}
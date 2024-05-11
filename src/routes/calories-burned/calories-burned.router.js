const express = require("express")

const { httpGetTrackedCaloriesBurned,
  httpPostTrackedCaloriesBurned, httpDeleteTrackedCaloriesBurned,
  httpPutTrackedCaloriesBurned
} = require("./calories-burned.controller")
 
const caloriesBurnedRouter = express.Router()

// TODO: move to env variables
// user sign in
caloriesBurnedRouter.get("/tracked-calories-burned/:userid/:email", httpGetTrackedCaloriesBurned)

// calories burned operations
caloriesBurnedRouter.post("/tracked-calories-burned/:userid/:email/add", httpPostTrackedCaloriesBurned)
caloriesBurnedRouter.delete("/tracked-calories-burned/:userid/:email/remove", httpDeleteTrackedCaloriesBurned)

// user sign out
caloriesBurnedRouter.put("/tracked-calories-burned/:userid/:email/update", httpPutTrackedCaloriesBurned)

module.exports = {
  caloriesBurnedRouter
}
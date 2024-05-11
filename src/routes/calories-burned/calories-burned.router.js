const express = require("express")
 
const caloriesBurnedRouter = express.Router()

// TODO: move to env variables
// user sign in
caloriesBurnedRouter.get("/tracked-calories-burned/:userid/:email", )

// calories burned operations
caloriesBurnedRouter.post("/tracked-calories-burned/:userid/:email/add", )
caloriesBurnedRouter.delete("/tracked-calories-burned/:userid/:email/remove", )

// user sign out
caloriesBurnedRouter.put("/tracked-calories-burned/:userid/:email/update", )

module.exports = {
  caloriesBurnedRouter
}
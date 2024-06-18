const express = require("express")

const { httpGetSearchedExercise, httpGetExercises, httpPostExercise,
  httpDeleteExercise, httpPutExercises
} = require("./fitness.controller")

const fitnessRouter = express.Router()

// TODO: move to env variables
// searching exercise
fitnessRouter.post("/search-exercise", httpGetSearchedExercise)

// user sign in
fitnessRouter.get("/exercises/:userid/:email", httpGetExercises)

// fitness operations
fitnessRouter.post("/exercises/:userid/:email", httpPostExercise)
fitnessRouter.delete("/exercises/:userid/:email", httpDeleteExercise)

// user sign out
fitnessRouter.put("/exercises/:userid/:email", httpPutExercises)

module.exports = {
  fitnessRouter
}
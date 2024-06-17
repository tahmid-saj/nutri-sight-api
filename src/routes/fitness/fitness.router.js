const express = require("express")

const { httpGetSearchedExercise } = require("./fitness.controller")

const fitnessRouter = express.Router()

// TODO: move to env variables
// searching exercise
fitnessRouter.post("/search-exercise", httpGetSearchedExercise)

module.exports = {
  fitnessRouter
}
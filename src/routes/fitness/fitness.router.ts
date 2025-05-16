import express, { Router } from "express"

import { httpGetSearchedExercise, httpGetExercises, httpPostExercise,
  httpDeleteExercise, httpPutExercises
} from "./fitness.controller.js"

const fitnessRouter: Router = express.Router()

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

export { fitnessRouter }
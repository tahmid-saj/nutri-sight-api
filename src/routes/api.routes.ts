import express, { Router } from 'express'

import { testRouter } from "./test-route/test-route.router.ts"
import { chatbotRouter } from "./chatbot/chatbot.router.ts"
import { nutrientPredictorRouter } from "./nutrient-predictor/nutrient-predictor.router.ts"
import { nutritionTrackerRouter } from "./nutrition-tracker/nutrition-tracker.router.ts"
import { fitnessRouter } from "./fitness/fitness.router.ts"
import { caloriesBurnedRouter } from "./calories-burned/calories-burned.router.ts"
import { recipesRouter } from "./recipes/recipes.router.ts"

const api: Router = express.Router();

api.use("/testroute", testRouter)
api.use("/chatbot", chatbotRouter)
api.use("/nutrient-predictor", nutrientPredictorRouter)
api.use("/nutrition-tracker", nutritionTrackerRouter)
api.use("/fitness", fitnessRouter)
api.use("/calories-burned", caloriesBurnedRouter)
api.use("/recipes", recipesRouter)

export { api }
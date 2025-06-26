import express, { Router } from 'express'

import { testRouter } from "./test-route/test-route.router.js"
import { chatbotRouter } from "./chatbot/chatbot.router.js"
import { nutrientPredictorRouter } from "./nutrient-predictor/nutrient-predictor.router.js"
import { nutritionTrackerRouter } from "./nutrition-tracker/nutrition-tracker.router.js"
import { fitnessRouter } from "./fitness/fitness.router.js"
import { caloriesBurnedRouter } from "./calories-burned/calories-burned.router.js"
import { recipesRouter } from "./recipes/recipes.router.js"
import { chatroomsRouter } from './chat-rooms/chat-rooms.router.js'

const api: Router = express.Router();

api.use("/testroute", testRouter)
api.use("/chatrooms", chatroomsRouter)
api.use("/chatbot", chatbotRouter)
api.use("/nutrient-predictor", nutrientPredictorRouter)
api.use("/nutrition-tracker", nutritionTrackerRouter)
api.use("/fitness", fitnessRouter)
api.use("/calories-burned", caloriesBurnedRouter)
api.use("/recipes", recipesRouter)

export { api }
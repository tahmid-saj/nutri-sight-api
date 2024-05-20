const express = require('express');

const { testRouter } = require("./test-route/test-route.router")
const { chatbotRouter } = require("./chatbot/chatbot.router")
const { nutritionTrackerRouter } = require("./nutrition-tracker/nutrition-tracker.router");
const { caloriesBurnedRouter } = require("./calories-burned/calories-burned.router")

const api = express.Router();

api.use("/testroute", testRouter)
api.use("/chatbot", chatbotRouter)
api.use("/nutrition-tracker", nutritionTrackerRouter);
api.use("/calories-burned", caloriesBurnedRouter)

module.exports = {
  api,
}
const express = require('express');

const { nutritionTrackerRouter } = require("./nutrition-tracker/nutrition-tracker.router");
const { caloriesBurnedRouter } = require("./calories-burned/calories-burned.router")

const api = express.Router();

api.use("/nutrition-tracker", nutritionTrackerRouter);
api.use("/calories-burned", caloriesBurnedRouter)

module.exports = {
  api,
}
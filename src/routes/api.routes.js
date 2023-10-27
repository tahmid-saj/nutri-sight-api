const express = require('express');

const { nutritionTrackerRouter } = require("./nutrition-tracker/nutrition-tracker.router");

const api = express.Router();

api.use("/nutrition-tracker", nutritionTrackerRouter);

module.exports = {
  api,
}
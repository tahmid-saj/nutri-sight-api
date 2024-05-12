const mongoose = require("mongoose")

const trackedCaloriesBurnedSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateTracked: {
    type: String,
    required: true,
  },
  activity: {
    type: String,
    required: true,
  },
  durationMinutes: {
    type: Number,
    required: true,
  },
  caloriesBurnedPerHour: {
    type: Number,
    required: true,
  },
  totalCaloriesBurned: {
    type: Number,
    required: true,
  },
  activityId: {
    type: Number,
    required: true,
  },
})

const trackedCaloriesBurnedDatabase = mongoose.model("TrackedCaloriesBurned", trackedCaloriesBurnedSchema)

module.exports = trackedCaloriesBurnedDatabase
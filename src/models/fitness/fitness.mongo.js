const mongoose = require("mongoose")

const exercisesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  exerciseDate: {
    type: String,
    required: true,
  },
  exerciseName: {
    type: String,
    required: true,
  },
  exerciseSets: {
    type: Number,
    required: false,
  },
  exerciseReps: {
    type: Number,
    required: false
  },
  exerciseType: {
    type: String,
    required: true,
  },
  exerciseMuscle: {
    type: String,
    required: true,
  },
  exerciseEquipment: {
    type: String,
    required: true,
  },
  exerciseDifficulty: {
    type: String,
    required: true,
  },
  exerciseInstructions: {
    type: String,
    required: false,
  },
  exerciseTag: {
    type: Number,
    required: true
  }
})

const exercisesDatabase = mongoose.model("Exercises", exercisesSchema)

module.exports = exercisesDatabase
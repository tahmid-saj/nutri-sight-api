const exercisesDatabase = require("./fitness.mongo")

// exercises crud for mongodb

// user sign in
async function getExercises(userId, email) {
  const exercises = await exercisesDatabase.find({
    userId: userId,
    email: email
  })
  .then(res => {
    const exercises = res.map(exercise => {
      return {
        exerciseDate: exercise.exerciseDate,
        exerciseName: exercise.exerciseName,
        exerciseSets: exercise.exerciseSets,
        exerciseReps: exercise.exerciseReps,
        exerciseType: exercise.exerciseType,
        exerciseMuscle: exercise.exerciseMuscle,
        exerciseEquipment: exercise.exerciseEquipment,
        exerciseDifficulty: exercise.exerciseDifficulty,
        exerciseInstructions: exercise.exerciseInstructions,
        exerciseTag: exercise.exercisesTagLimit,
      }
    })

    return exercises
  })
  .catch(error => {
    // TODO: handle error
    console.log(error)
  })

  return {
    exercises: [ ...exercises ]
  }
}

// calories burned operations
async function addExercise(userId, email, exercise) {
  const exerciseExists = await exercisesDatabase.findOne({
    userId: userId,
    email: email,
    exerciseTag: exercise.exerciseTag
  })

  if (!exerciseExists) {
    const newExercise = new exercisesDatabase({
      userId: userId,
      email: email,
      exerciseDate: exercise.exerciseDate,
      exerciseName: exercise.exerciseName,
      exerciseSets: exercise.exerciseSets,
      exerciseReps: exercise.exerciseReps,
      exerciseType: exercise.exerciseType,
      exerciseMuscle: exercise.exerciseMuscle,
      exerciseEquipment: exercise.exerciseEquipment,
      exerciseDifficulty: exercise.exerciseDifficulty,
      exerciseInstructions: exercise.exerciseInstructions,
      exerciseTag: exercise.exercisesTagLimit,
    })
  
    const res = await newExercise.save()
    return res
  } else {
    return
  }
}

async function removeExercise(userId, email, exerciseTag) {
  const exerciseExists = await exercisesDatabase.findOne({
    userId: userId,
    email: email,
    exerciseTag: exerciseTag
  })

  if (exerciseExists) {
    await exercisesDatabase.deleteOne({
      userId: userId,
      email: email,
      exerciseTag: exerciseTag
    })
  } else {
    return
  }
}

// user sign out
async function updateExercises(userId, email, exercises) {
  const exercisesExists = await exercisesDatabase.findOne({
    userId: userId,
    email: email
  })

  if (exercisesExists && exercises !== undefined && exercises.length !== 0) {
    exercises.map(async (exercise) => {
      await exercisesDatabase.updateOne({
        userId: userId,
        email: email,
        exerciseTag: exercise.exerciseTag
      }, {
        exerciseDate: exercise.exerciseDate,
        exerciseName: exercise.exerciseName,
        exerciseSets: exercise.exerciseSets,
        exerciseReps: exercise.exerciseReps,
        exerciseType: exercise.exerciseType,
        exerciseMuscle: exercise.exerciseMuscle,
        exerciseEquipment: exercise.exerciseEquipment,
        exerciseDifficulty: exercise.exerciseDifficulty,
        exerciseInstructions: exercise.exerciseInstructions,
      })
    })
  } else {
    return
  }
}

module.exports = {
  getExercises,
  addExercise,
  removeExercise,
  updateExercises
}
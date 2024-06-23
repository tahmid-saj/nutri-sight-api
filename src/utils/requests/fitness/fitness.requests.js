const { errorOnGetSearchedExercise } = require("../../errors/fitness.errors")
require("dotenv").config();

// helper functions
async function processSearchedExercise(exercises) {
  return exercises.map((exercise) => {
    return {
      exerciseName: exercise.name,
      exerciseType: exercise.type,
      exerciseMuscle: exercise.muscle,
      exerciseEquipment: exercise.equipment,
      exerciseDifficulty: exercise.difficulty,
      exerciseInstructions: exercise.instructions,
    }
  })
}

// searching exercise
async function getSearchedExercise(exerciseQuery) {
  try {
    let url = `${process.env.REACT_APP_API_NINJAS_EXERCISES_URL}${exerciseQuery.exerciseName}`

    if (exerciseQuery.exerciseType !== "") {
      url = url + `&type=${exerciseQuery.exerciseType}`
    }
    if (exerciseQuery.exerciseMuscle !== "") {
      url = url + `&muscle=${exerciseQuery.exerciseMuscle}`
    }
    if (exerciseQuery.exerciseDifficulty !== "") {
      url = url + `&difficulty=${exerciseQuery.exerciseDifficulty}`
    }

    const resExerciseResults = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "X-Api-Key": `${process.env.API_NINJAS_KEY}`
      }
    })

    const resJSON = await resExerciseResults.json()
    const res = await processSearchedExercise(resJSON)
    return {
      searchedExercises: res
    }
  } catch (error) {
    console.log(error)
    errorOnGetSearchedExercise()
  }
}

module.exports = {
  getSearchedExercise
}
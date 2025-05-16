import { errorOnGetSearchedExercise } from "../../errors/fitness.errors.ts"
import dotenv from "dotenv"

dotenv.config()


// helper functions
export async function processSearchedExercise(exercises: any) {
  return exercises.map((exercise: any) => {
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
export async function getSearchedExercise(exerciseQuery: any) {
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

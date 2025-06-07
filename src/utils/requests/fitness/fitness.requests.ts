import { SearchedExerciseResult } from "../../../models/fitness/fitness.types.js"
import { getSearchedExerciseCached, isSearchedExerciseCached, saveSearchedExercise } from "../../../redis/queries/fitness/fitness.queries.js"
import { errorOnGetSearchedExercise } from "../../errors/fitness.errors.js"
import dotenv from "dotenv"

dotenv.config()


// helper functions
export async function processSearchedExercise(exercises: SearchedExerciseResult[]) {
  return exercises.map((exercise: SearchedExerciseResult) => {
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
    const searchedExerciseCached = await isSearchedExerciseCached(exerciseQuery.exerciseName, 
      exerciseQuery.exerciseType, exerciseQuery.exerciseMuscle, exerciseQuery.exerciseDifficulty)

    let results;
    if (searchedExerciseCached) {
      results = await getSearchedExerciseCached(exerciseQuery.exerciseName, 
        exerciseQuery.exerciseType, exerciseQuery.exerciseMuscle, exerciseQuery.exerciseDifficulty)
    } else {
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
  
      results = await resExerciseResults.json()

      // cache the exercise results
      await saveSearchedExercise(exerciseQuery.exerciseName, exerciseQuery.exerciseType, 
        exerciseQuery.exerciseMuscle, exerciseQuery.exerciseDifficulty, results)
    }
    
    const res = await processSearchedExercise(results)
    return {
      searchedExercises: res
    }
  } catch (error) {
    console.log(error)
    errorOnGetSearchedExercise()
  }
}

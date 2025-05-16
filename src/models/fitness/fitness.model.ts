import { getExercises,
  addExercise, removeExercise,
  updateExercises
} from "./fitness.mongo.crud.ts"
import { UserId, Email, Exercise, ExerciseTag } from "./fitness.types.ts"

// TODO: handle error

// sign in
export async function getExercisesData(userId: UserId, email: Email): Promise<any> {
  console.log("Getting tracked fitness data")
  return getExercises(userId, email)
}

// fitness operations
export async function postExercise(userId: UserId, email: Email, exercise: Exercise): Promise<boolean> {
  addExercise(userId, email, exercise)
  console.log("Posting tracked fitness data")
  return true
}

export async function deleteExercise(userId: UserId, email: Email, exerciseTag: ExerciseTag): Promise<boolean> {
  removeExercise(userId, email, exerciseTag)
  console.log("Deleting tracked fitness data")
  return true
}

// sign out
export async function putExercises(userId: UserId, email: Email, exercises: Exercise[]): Promise<boolean> {
  updateExercises(userId, email, exercises)
  console.log("Updating tracked fitness data")
  return true
}

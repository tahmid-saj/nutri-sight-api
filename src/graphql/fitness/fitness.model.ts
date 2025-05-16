import { Email, UserId } from "../../models/calories-burned/calories-burned.types.ts"
import  { getExercises,
  addExercise, removeExercise,
  updateExercises
} from "../../models/fitness/fitness.mongo.crud.ts"
import { Exercise, ExerciseTag } from "../../models/fitness/fitness.types.ts"

export async function exercisesByUser(userId: UserId, email: Email): Promise<Exercise[]> {
  const exercises = await getExercises(userId, email)
  return exercises.exercises
}

export async function createUserExercise(userId: UserId, email: Email, exercise: Exercise): Promise<boolean> {
  addExercise(userId, email, exercise)
  console.log("Posting tracked fitness data")
  return true
}

export async function deleteUserExercise(userId: UserId, email: Email, exerciseTag: ExerciseTag): Promise<boolean> {
  removeExercise(userId, email, exerciseTag)
  console.log("Deleting tracked fitness data")
  return true
}

export async function updateUserExercises(userId: UserId, email: Email, exercises: Exercise[]): Promise<boolean> {
  updateExercises(userId, email, exercises)
  console.log("Updating tracked fitness data")
  return true
}

import { Document } from "mongodb"
import { exercisesDatabase } from "./fitness.mongo.ts"
import { Email, Exercise, ExerciseTag, UserId } from "./fitness.types.ts"

// exercises crud for mongodb

// user sign in
export async function getExercises(userId: UserId, email: Email): Promise<{ exercises: Exercise[] }> {
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
        exerciseTag: exercise.exerciseTag,
      }
    })

    return exercises
  })
  .catch(error => {
    // TODO: handle error
    console.log(error)
    return [] as Exercise[]
  })

  return {
    exercises: [ ...exercises ]
  }
}

// calories burned operations
export async function addExercise(userId: UserId, email: Email, exercise: Exercise): Promise<any> {
  const exerciseExists = await exercisesDatabase.findOne({
    userId: userId,
    email: email,
    exerciseTag: Number(exercise.exerciseTag)
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
      exerciseTag: exercise.exerciseTag,
    })
  
    await newExercise.save()
  } else {
    return
  }
}

export async function removeExercise(userId: UserId, email: Email, exerciseTag: ExerciseTag): Promise<void> {
  const exerciseExists = await exercisesDatabase.findOne({
    userId: userId,
    email: email,
    exerciseTag: Number(exerciseTag)
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
export async function updateExercises(userId: UserId, email: Email, exercises: Exercise[]): Promise<void> {
  const exercisesExists = await exercisesDatabase.findOne({
    userId: userId,
    email: email
  })

  if (exercisesExists && exercises !== undefined && exercises.length !== 0) {
    exercises.map(async (exercise) => {
      await exercisesDatabase.updateOne({
        userId: userId,
        email: email,
        exerciseTag: Number(exercise.exerciseTag)
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
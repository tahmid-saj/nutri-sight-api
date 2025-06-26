import { Exercise, SearchedExerciseResult } from "../../../models/fitness/fitness.types.js";
import { User } from "../../../models/users/users.types.js";
import { redisClient } from "../../../services/redis/redis.service.js";
import { CACHING_TTL } from "../../../utils/constants/shared.constants.js";
import { searchedExerciseKey, userFitnessExerciseKey, userFitnessKey } from "./fitness.keys.js";

// helper functions
export const serializeExercise = (exercise: Exercise) => {
  return {
    exerciseDate: exercise.exerciseDate,
    exerciseName: exercise.exerciseName,
    exerciseSets: exercise.exerciseSets ? exercise.exerciseSets : "",
    exerciseReps: exercise.exerciseReps ? exercise.exerciseReps : "",
    exerciseType: exercise.exerciseType,
    exerciseMuscle: exercise.exerciseMuscle,
    exerciseEquipment: exercise.exerciseEquipment,
    exerciseDifficulty: exercise.exerciseDifficulty,
    exerciseInstructions: exercise.exerciseInstructions ? exercise.exerciseInstructions : "",
    exerciseTag: exercise.exerciseTag
  }
}

export const deserializeExercise = (exercise: { [key: string]: string }): Exercise => {
  const resExercise: Exercise =  {
    exerciseDate: exercise.exerciseDate!,
    exerciseName: exercise.exerciseName!,
    exerciseType: exercise.exerciseType!,
    exerciseMuscle: exercise.exerciseMuscle!,
    exerciseEquipment: exercise.exerciseEquipment!,
    exerciseDifficulty: exercise.exerciseDifficulty!,
    exerciseTag: Number(exercise.exerciseTag!)
  }
  
  if (exercise.exerciseSets != "") resExercise.exerciseSets = Number(exercise.exerciseSets)
  if (exercise.exerciseReps != "") resExercise.exerciseReps = Number(exercise.exerciseReps)
  if (exercise.exerciseInstructions != "") resExercise.exerciseInstructions = String(exercise.exerciseInstructions)
  
  return resExercise
}

export const serializeSearchedExercise = (searchedExerciseResults: SearchedExerciseResult[]): string[] => {
  return searchedExerciseResults.map((result) => {
    return `name=${result.name}!type=${result.type}!muscle=${result.muscle}!equipment=${result.equipment}!difficulty=${result.difficulty}!instructions=${result.instructions}`
  })
}

export const deserializeSearchedExercise = (searchedExerciseResults: string[]) => {
  return searchedExerciseResults.map((result) => {
    const data = result.split("!")
    const name = data[0]?.split("=")[1]
    const type = data[1]?.split("=")[1]
    const muscle = data[2]?.split("=")[1]
    const equipment = data[3]?.split("=")[1]
    const difficulty = data[4]?.split("=")[1]
    const instructions = data[5]?.split("=")[1]

    return {
      name, type, muscle, equipment, difficulty, instructions
    }
  })
}

export const areExercisesCached = async (user: User) => {
  return await redisClient.exists(userFitnessKey(user))
}

export const isSearchedExerciseCached = async (exerciseName: string, exerciseType: string, 
  exerciseMuscle: string, exerciseDifficulty: string) => {
  return await redisClient.exists(searchedExerciseKey(exerciseName, exerciseType, 
    exerciseMuscle, exerciseDifficulty))
}

export const getExercises = async (user: User) => {
  const exercises = await redisClient.sMembers(userFitnessKey(user))

  const resExercises = await Promise.all(
    exercises.map(async (exerciseTag: string) => {
      const resExercise = await redisClient.hGetAll(userFitnessExerciseKey(user, Number(exerciseTag)))
      return deserializeExercise(resExercise)
    })
  )

  return {
    exercises: resExercises
  }
}

export const getSearchedExerciseCached = async (exerciseName: string, exerciseType: string, 
  exerciseMuscle: string, exerciseDifficulty: string) => {
  const searchedExercise = await redisClient.lRange(searchedExerciseKey(exerciseName, exerciseType, 
    exerciseMuscle, exerciseDifficulty), 0, -1)
  return deserializeSearchedExercise(searchedExercise)
}

export const saveExercises = async (user: User, exercises: Exercise[]) => {
  await Promise.all(
    exercises.map(async (exercise: Exercise) => {
      await Promise.all([
        // save exercise to set
        redisClient.multi()
          .sAdd(userFitnessKey(user), String(exercise.exerciseTag))
          .expire(userFitnessKey(user), CACHING_TTL.low)
          .exec(),

        // add exercise to hash
        redisClient.multi()
          .hSet(userFitnessExerciseKey(user, exercise.exerciseTag), serializeExercise(exercise))
          .expire(userFitnessExerciseKey(user, exercise.exerciseTag), CACHING_TTL.low)
          .exec()
      ])
    })
  )
}

export const saveSearchedExercise = async (exerciseName: string, exerciseType: string, 
  exerciseMuscle: string, exerciseDifficulty: string, searchedExerciseResults: SearchedExerciseResult[]) => {

  if (!searchedExerciseResults || searchedExerciseResults.length === 0) return

  await redisClient.multi()
    .rPush(searchedExerciseKey(exerciseName, exerciseType, exerciseMuscle, exerciseDifficulty),
      serializeSearchedExercise(searchedExerciseResults))
    .expire(searchedExerciseKey(exerciseName, exerciseType, exerciseMuscle, exerciseDifficulty),
      CACHING_TTL.low)
    .exec()
}

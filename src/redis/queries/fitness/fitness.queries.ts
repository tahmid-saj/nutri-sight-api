import { Exercise, SearchedExerciseResult } from "../../../models/fitness/fitness.types.ts";
import { User } from "../../../models/users/users.types.ts";
import { redisClient } from "../../../services/redis/redis.services.ts";
import { CACHING_TTL } from "../../../utils/constants/shared.constants.ts";
import { searchedExerciseKey, userFitnessExerciseKey, userFitnessKey } from "./fitness.keys.ts";

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

export const serializeSearchedExercise = (searchedExerciseResults: SearchedExerciseResult[]) => {
  return searchedExerciseResults.map((result) => {
    return `name=${result.exerciseName}!type=${result.exerciseType}!muscle=${result.exerciseMuscle}!equipment=${result.exerciseEquipment}!difficulty=${result.exerciseDifficulty}!instructions=${result.exerciseInstructions}`
  })
}

export const deserializeSearchedExercise = (searchedExerciseResults: string[]) => {
  return searchedExerciseResults.map((result) => {
    const data = result.split("!")
    const name = data[0]?.split("=")
    const type = data[1]?.split("=")
    const muscle = data[2]?.split("=")
    const equipment = data[3]?.split("=")
    const difficulty = data[4]?.split("=")
    const instructions = data[5]?.split("=")

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
    exercises.map(async (exerciseTag: number) => {
      const resExercise = await redisClient.hGetAll(userFitnessExerciseKey(user, exerciseTag))
      return deserializeExercise(resExercise)
    })
  )

  return {
    exercises: resExercises
  }
}

export const getSearchedExercise = async (exerciseName: string, exerciseType: string, 
  exerciseMuscle: string, exerciseDifficulty: string) => {
  const searchedExercise = await redisClient.lRange(searchedExerciseKey(exerciseName, exerciseType, 
    exerciseMuscle, exerciseDifficulty), 0, -1)
  return deserializeSearchedExercise(searchedExercise)
}

export const saveExercises = async (user: User, exercises: Exercise[]) => {
  await Promise.all(
    exercises.map(async (exercise) => {
      await Promise.all([
        // save exercise to set
        redisClient.multi()
          .sAdd(userFitnessKey(user), exercise.exerciseTag)
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
  await redisClient.multi()
    .rPush(searchedExerciseKey(exerciseName, exerciseType, exerciseMuscle, exerciseDifficulty),
      serializeSearchedExercise(searchedExerciseResults))
    .expire(searchedExerciseKey(exerciseName, exerciseType, exerciseMuscle, exerciseDifficulty),
      CACHING_TTL.low)
    .exec()
}

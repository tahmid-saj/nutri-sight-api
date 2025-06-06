import { User } from "../../../models/users/users.types.ts";

// set containing exercise tags belonging to user
export const userFitnessKey = (user: User) => `user-fitness#${user.userId}:${user.email}`

export const userFitnessExerciseKey = (user: User, exerciseTag: number) => `user-exercise#${user.userId}:${user.email}:${exerciseTag}`

export const searchedExerciseKey = (exerciseName: string, exerciseType: string, exerciseMuscle: string, exerciseDifficulty: string) => `searched-exercise#${exerciseName}:${exerciseType}:${exerciseMuscle}:${exerciseDifficulty}`

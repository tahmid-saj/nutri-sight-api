// fitness types

export type UserId = string
export type Email = string
export type ExerciseTag = number

export type Exercise = {
  exerciseDate: string,
  exerciseName: string,
  exerciseSets?: number,
  exerciseReps?: number,
  exerciseType: string,
  exerciseMuscle: string,
  exerciseEquipment: string,
  exerciseDifficulty: string,
  exerciseInstructions?: string,
  exerciseTag: number
}

export type SearchedExerciseResult = {
  name: string
  type: string
  muscle: string
  equipment: string
  difficulty: string
  instructions: string
}
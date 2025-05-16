import { Exercise } from "../../models/fitness/fitness.types"
import { exercisesByUser, createUserExercise, 
  deleteUserExercise, updateUserExercises } from "./fitness.model.js"

type UserArgs = {
  userId: string,
  email: string,
  exercise: Exercise,
  exerciseTag: number,
  exercises: Exercise[]
}

module.exports = {
  Query: {
    exercisesByUser: (parent: any, args: UserArgs): Promise<Exercise[]> => {
      return exercisesByUser(args.userId, args.email)
    }
  },
  Mutation: {
    createUserExercise: (parent: any, args: UserArgs): Promise<boolean> => {
      return createUserExercise(args.userId, args.email, args.exercise)
    },
    deleteUserExercise: (parent: any, args: UserArgs): Promise<boolean> => {
      return deleteUserExercise(args.userId, args.email, args.exerciseTag)
    },
    updateUserExercises: (parent: any, args: UserArgs): Promise<boolean> => {
      return updateUserExercises(args.userId, args.email, args.exercises)
    }
  }
}
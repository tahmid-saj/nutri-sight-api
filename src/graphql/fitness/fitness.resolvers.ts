import { Exercise } from "../../models/fitness/fitness.types.ts"
import { exercisesByUser, createUserExercise, 
  deleteUserExercise, updateUserExercises } from "./fitness.model.ts"

type UserArgs = {
  userId: string,
  email: string,
  exercise: Exercise,
  exerciseTag: number,
  exercises: Exercise[]
}

export const resolvers = {
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
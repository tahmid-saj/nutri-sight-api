import { TrackedCaloriesBurned } from "../../models/calories-burned/calories-burned.types.js"
import { trackedCaloriesBurnedByUser, createUserTrackedCaloriesBurned, 
  deleteUserTrackedCaloriesBurned, updateUserTrackedCaloriesBurned } from "./calories-burned.model.js"

type UserArgs = {
  userId: string,
  email: string,
  trackedCaloriesBurned: any,
  activityId: number
}

export const resolvers = {
  Query: {
    trackedCaloriesBurnedByUser: (
      parent: any,
      args: UserArgs
    ): Promise<TrackedCaloriesBurned[]> => {
      return trackedCaloriesBurnedByUser(args.userId, args.email);
    },
  },
  Mutation: {
    createUserTrackedCaloriesBurned: (
      parent: any,
      args: UserArgs
    ): Promise<boolean> => {
      return createUserTrackedCaloriesBurned(args.userId, args.email, args.trackedCaloriesBurned);
    },
    deleteUserTrackedCaloriesBurned: (
      parent: any,
      args: UserArgs
    ): Promise<boolean> => {
      return deleteUserTrackedCaloriesBurned(args.userId, args.email, args.activityId);
    },
    updateUserTrackedCaloriesBurned: (
      parent: any,
      args: UserArgs
    ): Promise<boolean> => {
      return updateUserTrackedCaloriesBurned(args.userId, args.email, args.trackedCaloriesBurned);
    },
  },
};

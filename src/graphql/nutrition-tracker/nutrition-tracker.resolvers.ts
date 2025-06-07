import { NutritionTrackedDate, NutritionTrackedDay, 
  NutritionTrackedDaysSummary } from "../../models/nutrition-tracker/nutrition-tracker.types.js"
import { nutritionTrackedDaysByUser, nutritionTrackedDaysSummaryByUser, 
  createUserNutritionTrackedDay, deleteUserNutritionTrackedDay, 
  updateUserNutritionTrackedDay, updateUserNutritionTrackedDays,
  updateUserNutritionTrackedDaysSummary
} from "./nutrition-tracker.model.js"

type UserArgs = {
  userId: string,
  email: string,
  nutritionTrackedDayInfoUpdate: {
    originalNutritionTrackedDay: NutritionTrackedDay,
    updatedNutritionTrackedDay: NutritionTrackedDay
  }
  nutritionTrackedDays: NutritionTrackedDay[],
  nutritionTrackedDay: NutritionTrackedDay,
  nutritionTrackedDate: NutritionTrackedDate,
  nutritionTrackedDaysSummary: NutritionTrackedDaysSummary
}

export const resolvers = {
  Query: {
    nutritionTrackedDaysByUser: (parent: any, args: UserArgs) => {
      return nutritionTrackedDaysByUser(args.userId, args.email)
    },
    nutritionTrackedDaysSummaryByUser: (parent: any, args: UserArgs) => {
      return nutritionTrackedDaysSummaryByUser(args.userId, args.email)
    }
  },
  Mutation: {
    createUserNutritionTrackedDay: (parent: any, args: UserArgs) => {
      return createUserNutritionTrackedDay(args.userId, args.email, args.nutritionTrackedDay)
    },
    deleteUserNutritionTrackedDay: (parent: any, args: UserArgs) => {
      return deleteUserNutritionTrackedDay(args.userId, args.email, args.nutritionTrackedDate)
    },
    updateUserNutritionTrackedDay: (parent: any, args: UserArgs) => {
      const originalNutritionTrackedDay = args.nutritionTrackedDayInfoUpdate.originalNutritionTrackedDay
      const updatedNutritionTrackedDay = args.nutritionTrackedDayInfoUpdate.updatedNutritionTrackedDay

      return updateUserNutritionTrackedDay(args.userId, args.email, 
        originalNutritionTrackedDay, updatedNutritionTrackedDay
      )
    },
    updateUserNutritionTrackedDays: (parent: any, args: UserArgs) => {
      return updateUserNutritionTrackedDays(args.userId, args.email, args.nutritionTrackedDays)
    },
    updateUserNutritionTrackedDaysSummary: (parent: any, args: UserArgs) => {
      return updateUserNutritionTrackedDaysSummary(args.userId, args.email, args.nutritionTrackedDaysSummary)
    }
  }
}
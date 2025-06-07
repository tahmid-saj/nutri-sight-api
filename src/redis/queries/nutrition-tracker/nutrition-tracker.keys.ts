import { User } from "../../../models/users/users.types.js";

// set containing dates tracked by user
export const userNutritionTrackedDaysKey = (user: User) => `user-nutrition-tracked-days#${user.userId}:${user.email}`

// hash containing fields of tracked date
export const userNutritionTrackedDayKey = (user: User, dateTracked: string) => `user-nutrition-tracked-day#${user.userId}:${user.email}:$${dateTracked}`

// list containing micronutrients of tracked date
export const userNutritionTrackedDayMicronutrientsKey = (user: User, dateTracked: string) => `user-nutrition-tracked-day:micro#${user.userId}:${user.email}:${dateTracked}`

// hash of summary
export const nutritionTrackedDaysSummaryKey = (user: User) => `nutrition-tracked-days-summary#${user.userId}:${user.email}`

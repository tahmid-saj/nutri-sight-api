import { User } from "../../../models/users/users.types.js";

// set containing user's tracked calories burned activityIDs
export const userTrackedCaloriesBurnedKey = (user: User) => `user-tracked-calories-burned#${user.userId}:${user.email}`

// hash containing user's tracked calories burned objects
export const userActivityCaloriesBurnedKey = (user: User, activityId: number) => `user-activity-calories-burned#${user.userId}:${user.email}:${activityId}`

// list containing searched activity results
export const searchedActivityKey = (activity: string, weightPounds: string, durationMinutes: string) => `searched-activity#${activity}:${weightPounds}:${durationMinutes}`

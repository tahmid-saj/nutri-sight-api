import { ActivitySearchResult, TrackedCaloriesBurned } from "../../../models/calories-burned/calories-burned.types.ts";
import { User } from "../../../models/users/users.types.ts";
import { redisClient } from "../../../services/redis/redis.services.ts";
import { CACHING_TTL } from "../../../utils/constants/shared.constants.ts";
import { searchedActivityKey, userActivityCaloriesBurnedKey, userTrackedCaloriesBurnedKey } from "./calories-burned.keys.ts";

// helper functions
export const serializeTrackedCaloriesBurned = (trackedCaloriesBurned: TrackedCaloriesBurned) => {
  return {
    dateTracked: trackedCaloriesBurned.dateTracked,
    activity: trackedCaloriesBurned.activity,
    durationMinutes: trackedCaloriesBurned.durationMinutes,
    caloriesBurnedPerHour: trackedCaloriesBurned.caloriesBurnedPerHour,
    totalCaloriesBurned: trackedCaloriesBurned.totalCaloriesBurned,
    activityId: trackedCaloriesBurned.activityId,
  }
}

export const deserializeTrackedCaloriesBurned = (trackedCaloriesBurned: { [key: string]: string | number }): TrackedCaloriesBurned => {
  return {
    dateTracked: String(trackedCaloriesBurned.dateTracked!),
    activity: String(trackedCaloriesBurned.activity!),
    durationMinutes: Number(trackedCaloriesBurned.durationMinutes!),
    caloriesBurnedPerHour: Number(trackedCaloriesBurned.caloriesBurnedPerHour!),
    totalCaloriesBurned: Number(trackedCaloriesBurned.totalCaloriesBurned!),
    activityId: Number(trackedCaloriesBurned.activityId!)
  }
}

export const serializeActivitySearchResults = (activitySearchResults: ActivitySearchResult[]) => {
  return activitySearchResults.map((result) => {
    return `name=${result.name}!calories_per_hour=${result.calories_per_hour}!duration=${result.duration_minutes}!calories=${result.total_calories}`
  })
}

export const deserializeActivitySearchResults = (activitySearchResults: string[]): ActivitySearchResult[] => {
  return activitySearchResults.map((result) => {
    const data = result.split("!")
    const name = String(data[0]?.split("="))
    const calories_per_hour = Number(data[1]?.split("="))
    const duration_minutes = Number(data[2]?.split("="))
    const total_calories = Number(data[3]?.split("="))

    return {
      name, calories_per_hour, duration_minutes, total_calories
    }
  })
}

export const areTrackedCaloriesBurnedCached = async (user: User) => {
  return await redisClient.exists(userTrackedCaloriesBurnedKey(user))
}

export const isSearchedActivityCached = async (activity: string, weightPounds: string, durationMinutes: string) => {
  return await redisClient.exists(searchedActivityKey(activity, weightPounds, durationMinutes))
}

export const getTrackedCaloriesBurned = async (user: User) => {
  const activityIds = await redisClient.sMembers(userTrackedCaloriesBurnedKey(user))

  const resTrackedCaloriesBurned = await Promise.all(
    activityIds.map(async (activityId: string) => {
      const resTrackedDate = await redisClient.hGetAll(userActivityCaloriesBurnedKey(user, Number(activityId)))
      return deserializeTrackedCaloriesBurned(resTrackedDate)
    })
  )
 
  return {
    trackedCaloriesBurned: resTrackedCaloriesBurned
  }
}

export const getSearchedActivityCached = async (activity: string, weightPounds: string, durationMinutes: string) => {
  const resSearchedActivityResults = await redisClient.lRange(searchedActivityKey(activity, weightPounds, durationMinutes), 0, -1)
  return deserializeActivitySearchResults(resSearchedActivityResults)
}

export const saveTrackedCaloriesBurned = async (user: User, trackedCaloriesBurned: TrackedCaloriesBurned[]) => {
  await Promise.all(
    trackedCaloriesBurned.map(async (trackedDate: TrackedCaloriesBurned) => {
      await Promise.all([
        // save trackedDate in set
        redisClient.multi()
          .sAdd(userTrackedCaloriesBurnedKey(user), String(trackedDate.activityId))
          .expire(userTrackedCaloriesBurnedKey(user), CACHING_TTL.low)
          .exec(),

        // save trackedDate in hash
        redisClient.multi()
          .hSet(userActivityCaloriesBurnedKey(user, trackedDate.activityId), serializeTrackedCaloriesBurned(trackedDate))
          .expire(userActivityCaloriesBurnedKey(user, trackedDate.activityId), CACHING_TTL.low)
          .exec()
      ])
    })
  )
}

export const saveSearchedActivity = async (activity: string, weightPounds: string, durationMinutes: string, 
  activitySearchResults: ActivitySearchResult[]) => {
  await redisClient.multi()
    .rPush(searchedActivityKey(activity, weightPounds, durationMinutes),
      serializeActivitySearchResults(activitySearchResults))
    .expire(searchedActivityKey(activity, weightPounds, durationMinutes), CACHING_TTL.high)
    .exec()
}
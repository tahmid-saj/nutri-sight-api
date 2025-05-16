import { Document } from "mongodb"
import { trackedCaloriesBurnedDatabase } from "./calories-burned.mongo.ts"
import { ActivityId, Email, TrackedCaloriesBurned, UserId } from "./calories-burned.types.ts"

// calories burned crud for mongodb

// user sign in
export async function getTrackedCaloriesBurned(userId: UserId, email: Email): Promise<{ trackedCaloriesBurned: TrackedCaloriesBurned[] }> {
  const trackedCaloriesBurned = await trackedCaloriesBurnedDatabase.find({
    userId: userId,
    email: email
  })
  .then((res: any) => {
    const trackedCaloriesBurned = res.map((trackedCalories: Document) => {
      return {
        dateTracked: trackedCalories.dateTracked,
        activity: trackedCalories.activity,
        durationMinutes: trackedCalories.durationMinutes,
        caloriesBurnedPerHour: trackedCalories.caloriesBurnedPerHour,
        totalCaloriesBurned: trackedCalories.totalCaloriesBurned,
        activityId: trackedCalories.activityId
      }
    })

    return trackedCaloriesBurned
  })
  .catch((error: Error) => {
    // TODO: handle error
    console.log(error)
  })

  return {
    trackedCaloriesBurned: [ ...trackedCaloriesBurned ]
  }
}

// calories burned operations
export async function addTrackedCaloriesBurned(userId: UserId, email: Email, 
  trackedCaloriesBurned: TrackedCaloriesBurned): Promise<any> {
  const trackedCaloriesBurnedExists = await trackedCaloriesBurnedDatabase.findOne({
    userId: userId,
    email: email,
    activityId: trackedCaloriesBurned.activityId
  })

  if (!trackedCaloriesBurnedExists) {
    const newTrackedCaloriesBurned = new trackedCaloriesBurnedDatabase({
      userId: userId,
      email: email,
      dateTracked: trackedCaloriesBurned.dateTracked,
      activity: trackedCaloriesBurned.activity,
      durationMinutes: trackedCaloriesBurned.durationMinutes,
      caloriesBurnedPerHour: trackedCaloriesBurned.caloriesBurnedPerHour,
      totalCaloriesBurned: trackedCaloriesBurned.totalCaloriesBurned,
      activityId: trackedCaloriesBurned.activityId
    })
  
    const res = await newTrackedCaloriesBurned.save()
    return res
  } else {
    return
  }
}

export async function removeTrackedCaloriesBurned(userId: UserId, email: Email, activityId: ActivityId): Promise<void> {
  const trackedCaloriesBurnedExists = await trackedCaloriesBurnedDatabase.findOne({
    userId: userId,
    email: email,
    activityId: activityId
  })

  if (trackedCaloriesBurnedExists) {
    await trackedCaloriesBurnedDatabase.deleteOne({
      userId: userId,
      email: email,
      activityId: activityId
    })
  } else {
    return
  }
}

// user sign out
export async function updateTrackedCaloriesBurned(userId: UserId, email: Email, 
  trackedCaloriesBurned: TrackedCaloriesBurned[]): Promise<void> {
  const trackedCaloriesBurnedExists = await trackedCaloriesBurnedDatabase.findOne({
    userId: userId,
    email: email
  })

  if (trackedCaloriesBurnedExists && trackedCaloriesBurned !== undefined && trackedCaloriesBurned.length !== 0) {
    trackedCaloriesBurned.map(async (trackedCalories) => {
      await trackedCaloriesBurnedDatabase.updateOne({
        userId: userId,
        email: email,
        activityId: trackedCalories.activityId
      }, {
        dateTracked: trackedCalories.dateTracked,
        activity: trackedCalories.activity,
        durationMinutes: trackedCalories.durationMinutes,
        caloriesBurnedPerHour: trackedCalories.caloriesBurnedPerHour,
        totalCaloriesBurned: trackedCalories.totalCaloriesBurned
      })
    })
  } else {
    return
  }
}

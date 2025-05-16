import { getTrackedCaloriesBurned,
  addTrackedCaloriesBurned, removeTrackedCaloriesBurned,
  updateTrackedCaloriesBurned
} from "../../models/calories-burned/calories-burned.mongo.crud.js"
import { ActivityId, Email, TrackedCaloriesBurned, UserId } from "../../models/calories-burned/calories-burned.types.js"

export async function trackedCaloriesBurnedByUser(userId: UserId, email: Email): Promise<TrackedCaloriesBurned[]> {
  const trackedCaloriesBurned = await getTrackedCaloriesBurned(userId, email)
  return trackedCaloriesBurned.trackedCaloriesBurned
}

export async function createUserTrackedCaloriesBurned(userId: UserId, email: Email, trackedCaloriesBurned: TrackedCaloriesBurned): Promise<boolean> {
  await addTrackedCaloriesBurned(userId, email, trackedCaloriesBurned)
  console.log("Posting tracked calories burned data")
  return true
}

export async function deleteUserTrackedCaloriesBurned(userId: UserId, email: Email, activityId: ActivityId): Promise<boolean> {
  await removeTrackedCaloriesBurned(userId, email, activityId)
  console.log("Deleting tracked calories burned data")
  return true
}

export async function updateUserTrackedCaloriesBurned(userId: UserId, email: Email, trackedCaloriesBurned: TrackedCaloriesBurned[]): Promise<boolean> {
  await updateTrackedCaloriesBurned(userId, email, trackedCaloriesBurned)
  console.log("Updating tracked calories burned data")
  return true
}

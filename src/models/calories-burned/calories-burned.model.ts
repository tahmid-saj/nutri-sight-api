import { getTrackedCaloriesBurned,
  addTrackedCaloriesBurned, removeTrackedCaloriesBurned,
  updateTrackedCaloriesBurned
} from "./calories-burned.mongo.crud.js"
import { ActivityId, Email, TrackedCaloriesBurned, UserId } from "./calories-burned.types.js"

// TODO: handle error

// sign in
export async function getTrackedCaloriesBurnedData(userId: UserId, email: Email): Promise<any> {
  console.log("Getting tracked calories burned data")
  return getTrackedCaloriesBurned(userId, email)
}

// calories burned operations
export async function postTrackedCaloriesBurned(userId: UserId, email: Email, 
  trackedCaloriesBurned: TrackedCaloriesBurned): Promise<boolean> {
  await addTrackedCaloriesBurned(userId, email, trackedCaloriesBurned)
  console.log("Posting tracked calories burned data")
  return true
}

export async function deleteTrackedCaloriesBurned(userId: UserId, email: Email, 
  activityId: ActivityId): Promise<boolean> {
  await removeTrackedCaloriesBurned(userId, email, activityId)
  console.log("Deleting tracked calories burned data")
  return true
}

// sign out
export async function putTrackedCaloriesBurned(userId: UserId, email: Email, 
  trackedCaloriesBurned: TrackedCaloriesBurned[]): Promise<boolean> {
  await updateTrackedCaloriesBurned(userId, email, trackedCaloriesBurned)
  console.log("Updating tracked calories burned data")
  return true
}

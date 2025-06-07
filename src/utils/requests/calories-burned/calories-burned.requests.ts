import { ActivitySearchResult } from "../../../models/calories-burned/calories-burned.types.ts"
import { getSearchedActivityCached, isSearchedActivityCached, saveSearchedActivity } from "../../../redis/queries/calories-burned/calories-burned.queries.ts"
import { errorOnGetSearchActivity } from "../../errors/calories-burned.errors.ts"
import dotenv from "dotenv"

dotenv.config()


// helper functions
export async function processSearchedActivity(activity: string, dateTracked: string, 
    activityResults: ActivitySearchResult[]) {
  return activityResults.map((activityResult: ActivitySearchResult) => {
    return {
      activity: String(activityResult.name),
      searchedActivity: String(activity),
      dateTracked: String(dateTracked),
      caloriesBurnedPerHour: Number(activityResult.calories_per_hour),
      durationMinutes: Number(activityResult.duration_minutes),
      totalCaloriesBurned: Number(activityResult.total_calories)
    }
  })
}

// searching activity
export async function getSearchedActivity(activity: string, dateTracked: string, 
  weightPounds: string, durationMinutes: string) {
  try {
    let resResults;
    const searchedActivityCached = await isSearchedActivityCached(activity, weightPounds, durationMinutes)
    if (searchedActivityCached) {
      resResults = await getSearchedActivityCached(activity, weightPounds, durationMinutes) 
    } else {
      let url = `${process.env.REACT_APP_API_NINJAS_CALORIES_BURNED_URL}${activity}`
  
      if (weightPounds !== "") {
        url = url + `&weight=${weightPounds}`
      }
      if (durationMinutes !== "") {
        url = url + `&duration=${durationMinutes}`
      }
  
      const resActivityResults = await fetch(`${url}`, {
        method: "GET",
        headers: {
          "X-Api-Key": `${process.env.API_NINJAS_KEY}`
        }
      })
  
      resResults = await resActivityResults.json()
  
      // cache the activity results
      await saveSearchedActivity(activity, weightPounds, durationMinutes, resResults)
    }

    const res = await processSearchedActivity(activity, dateTracked, resResults)
    return {
      searchedActivities: res
    }
  } catch (error) {
    errorOnGetSearchActivity()
    if (error) {
      return console.error("Request failed: ", error)
    }
  }
}

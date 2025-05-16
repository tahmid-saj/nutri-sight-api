import { Request, Response } from 'express';
import { getSearchedActivity } from "../../utils/requests/calories-burned/calories-burned.requests.ts"
import { getTrackedCaloriesBurnedData, 
  postTrackedCaloriesBurned, deleteTrackedCaloriesBurned,
  putTrackedCaloriesBurned 
} from "../../models/calories-burned/calories-burned.model.ts"

// searching activity
export async function httpGetSearchedActivity(req: Request, res: Response): Promise<void> {
  try {
    const activity = String(req.body.activity)
    const dateTracked = String(req.body.dateTracked)
    const weightPounds = String(req.body.weightPounds)
    const durationMinutes = String(req.body.durationMinutes)

    const resGetSearchedActivity = await getSearchedActivity(activity, dateTracked, weightPounds, durationMinutes)

    if (resGetSearchedActivity) {
      res.status(200).json(resGetSearchedActivity)
    }
  } catch (error) {
    console.log(error)
  }
}

// signed in
export async function httpGetTrackedCaloriesBurned(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const resGetTrackedCaloriesBurned = await getTrackedCaloriesBurnedData(userId!, email!)

    if (resGetTrackedCaloriesBurned) {  
      res.status(200).json(resGetTrackedCaloriesBurned)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

// calories burned operations
export async function httpPostTrackedCaloriesBurned(req: Request, res: Response): Promise<void> {
  try {
    const trackedCaloriesBurned = req.body
    const userId = req.params.userid;
    const email = req.params.email;
    const resPostTrackedCaloriesBurned = await postTrackedCaloriesBurned(userId!, email!, trackedCaloriesBurned)

    if (resPostTrackedCaloriesBurned) {
      res.status(200)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

export async function httpDeleteTrackedCaloriesBurned(req: Request, res: Response): Promise<void> {
  try {
    const activityId = Number(String(req.body)) 
    const userId = req.params.userid;
    const email = req.params.email;
    const resDeleteTrackedCaloriesBurned = await deleteTrackedCaloriesBurned(userId!, email!, activityId)

    if (resDeleteTrackedCaloriesBurned) {
      res.status(200)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

// signed out
export async function httpPutTrackedCaloriesBurned(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const { trackedCaloriesBurned } = req.body
    const resPutTrackedCaloriesBurned = await putTrackedCaloriesBurned(userId!, email!, trackedCaloriesBurned)

    if (resPutTrackedCaloriesBurned) {
      res.status(200)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

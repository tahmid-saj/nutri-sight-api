import { Request, Response } from 'express';

import { getExercisesData, postExercise, 
  deleteExercise, putExercises } from "../../models/fitness/fitness.model.ts"
import { getSearchedExercise } from "../../utils/requests/fitness/fitness.requests.ts"

// searching exercise
export async function httpGetSearchedExercise(req: Request, res: Response): Promise<void> {
  try {
    const exerciseQuery = req.body
    const resGetSearchedExercise = await getSearchedExercise(exerciseQuery)

    if (resGetSearchedExercise) {
      res.status(200).json(resGetSearchedExercise)
    }
  } catch (error) {
    console.log(error)
  }
}

// user sign in
// signed in
export async function httpGetExercises(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const resGetExercises = await getExercisesData(userId!, email!)

    if (resGetExercises) {
      res.status(200).json(resGetExercises)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

// fitness operations
export async function httpPostExercise(req: Request, res: Response): Promise<void> {
  try {
    const exercise = req.body
    const userId = req.params.userid;
    const email = req.params.email;
    const resPostExercise = await postExercise(userId!, email!, exercise)

    if (resPostExercise) {
      res.status(200)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

export async function httpDeleteExercise(req: Request, res: Response): Promise<void> {
  try {
    const exerciseTag = Number(String(req.body))
    const userId = req.params.userid;
    const email = req.params.email;
    const resDeleteExercise = await deleteExercise(userId!, email!, exerciseTag)

    if (resDeleteExercise) {
      res.status(200)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

// signed out
export async function httpPutExercises(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const { exercises } = req.body
    const resPutExercises = await putExercises(userId!, email!, exercises)

    if (resPutExercises) {
      res.status(200)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

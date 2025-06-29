import { Request, Response } from 'express';

import { getExercisesData, postExercise, 
  deleteExercise, putExercises } from "../../models/fitness/fitness.model.js"
import { getSearchedExercise } from "../../utils/requests/fitness/fitness.requests.js"
import { User } from '../../models/users/users.types.js';
import { areExercisesCached, getExercises, saveExercises } from '../../redis/queries/fitness/fitness.queries.js';

// searching exercise
export async function httpGetSearchedExercise(req: Request, res: Response): Promise<any> {
  try {
    const exerciseQuery = req.body
    const resGetSearchedExercise = await getSearchedExercise(exerciseQuery)

    if (resGetSearchedExercise) {
      return res.status(200).json(resGetSearchedExercise)
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// user sign in
// signed in
export async function httpGetExercises(req: Request, res: Response): Promise<any> {
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const user: User = {
      userId: userId!,
      email: email!
    }

    const exercisesCached = await areExercisesCached(user)
    if (exercisesCached) {
      const resExercises = await getExercises(user)
      return res.status(200).json(resExercises)
    } else {
      const resGetExercises = await getExercisesData(userId!, email!)
  
      if (resGetExercises) {
        await saveExercises(user, resGetExercises.exercises)
        return res.status(200).json(resGetExercises)
      }
    }

  } catch (error) {
    // TODO: handle error
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// fitness operations
export async function httpPostExercise(req: Request, res: Response): Promise<any> {
  try {
    const exercise = req.body
    const userId = req.params.userid;
    const email = req.params.email;
    const resPostExercise = await postExercise(userId!, email!, exercise)

    if (resPostExercise) {
      return res.status(200)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function httpDeleteExercise(req: Request, res: Response): Promise<any> {
  try {
    const exerciseTag = Number(String(req.body))
    const userId = req.params.userid;
    const email = req.params.email;
    const resDeleteExercise = await deleteExercise(userId!, email!, exerciseTag)

    if (resDeleteExercise) {
      return res.status(200)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// signed out
export async function httpPutExercises(req: Request, res: Response): Promise<any> {
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const user: User = {
      userId: userId!,
      email: email!
    }

    const { exercises } = req.body
    await saveExercises(user, exercises)
    const resPutExercises = await putExercises(userId!, email!, exercises)

    if (resPutExercises) {
      return res.status(200)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

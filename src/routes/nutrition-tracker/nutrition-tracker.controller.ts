import { Request, Response } from 'express';

import { getNutritionTrackedDaysData, getNutritionTrackedDaysSummaryData,
  postNutritionTrackedDay, putNutritionTrackedDay, deleteNutritionTrackedDay,
  putNutritionTrackedDaysData, putNutritionTrackedDaysSummaryData } 
from "../../models/nutrition-tracker/nutrition-tracker.model.js"
import { User } from '../../models/users/users.types.js';
import { areNutritionTrackedDaysCached, getNutritionTrackedDays, getNutritionTrackedDaysSummary, 
  isNutritionTrackedDaysSummaryCached, saveNutritionTrackedDays, 
  saveNutritionTrackedDaysSummary } from '../../redis/queries/nutrition-tracker/nutrition-tracker.queries.js';

// signed in
export async function httpGetNutritionTrackedDays(req: Request, res: Response) {
  // return res.status(200).json(getNutritionTrackedDays());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const user: User = {
      userId: userId!,
      email: email!
    }

    const nutritionTrackedDaysCached = await areNutritionTrackedDaysCached(user)
    if (nutritionTrackedDaysCached) {
      const resNutritionTrackedDays = await getNutritionTrackedDays(user)
      return res.status(200).json(resNutritionTrackedDays)
    } else {
      const resGetNutritionTrackedDays = await getNutritionTrackedDaysData(userId!, email!);
  
      if (resGetNutritionTrackedDays) {
        await saveNutritionTrackedDays(user, resGetNutritionTrackedDays.nutritionTrackedDays)
        return res.status(200).json(resGetNutritionTrackedDays)
      }
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export async function httpGetNutritionTrackedDaysSummary(req: Request, res: Response): Promise<any> {
  // return res.status(200).json(getNutritionTrackedDaysSummary());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const user: User = {
      userId: userId!,
      email: email!
    }

    const nutritionTrackedDaysSummaryCached = await isNutritionTrackedDaysSummaryCached(user)
    if (nutritionTrackedDaysSummaryCached) {
      const resNutritionTrackedDaysSummary = await getNutritionTrackedDaysSummary(user)
      return res.status(200).json(resNutritionTrackedDaysSummary)
    } else {
      const resGetNutritionTrackedDaysSummary = await getNutritionTrackedDaysSummaryData(userId!, email!);
  
      if (resGetNutritionTrackedDaysSummary) {
        await saveNutritionTrackedDaysSummary(user, resGetNutritionTrackedDaysSummary.nutritionTrackedDaysSummary)
        return res.status(200).json(resGetNutritionTrackedDaysSummary)
      }
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// nutrition tracked days operations
export async function httpPostNutritionTrackedDay(req: Request, res: Response): Promise<any> {
  // return res.status(200).json(postNutritionTrackedDay());
  try {
    const nutritionTrackedDay = req.body;
    const userId = req.params.userid;
    const email = req.params.email;
    const resPostNutritionTrackedDay = await postNutritionTrackedDay(userId!, email!, nutritionTrackedDay);

    if (resPostNutritionTrackedDay) {
      return res.status(200)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export async function httpDeleteNutritionTrackedDay(req: Request, res: Response): Promise<any> {
  // return res.status(200).json(deleteNutritionTrackedDay());
  try {
    const nutritionTrackedDate = String(req.body)
    const userId = req.params.userid;
    const email = req.params.email;
    const resDeleteNutritionTrackedDay = await deleteNutritionTrackedDay(userId!, email!, nutritionTrackedDate);

    if (resDeleteNutritionTrackedDay) {
      return res.status(200)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export async function httpPutNutritionTrackedDay(req: Request, res: Response): Promise<any> {
  // return res.status(200).json(putNutritionTrackedDay());
  try {
    const { originalNutritionTrackedDay } = req.body;
    const { updatedNutritionTrackedDay } = req.body;
    const userId = req.params.userid;
    const email = req.params.email;
    const resPutNutritionTrackedDay = await putNutritionTrackedDay(userId!, email!, originalNutritionTrackedDay, updatedNutritionTrackedDay);

    if (resPutNutritionTrackedDay) {
      return res.status(200)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// signed out
export async function httpPutNutritionTrackedDays(req: Request, res: Response): Promise<any> {
  // return res.status(200).json(putNutritionTrackedDays());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const user: User = {
      userId: userId!,
      email: email!
    }

    const { nutritionTrackedDays } = req.body;
    await saveNutritionTrackedDays(user, nutritionTrackedDays)
    const resPutNutritionTrackedDays = await putNutritionTrackedDaysData(userId!, email!, nutritionTrackedDays);

    if (resPutNutritionTrackedDays) {
      return res.status(200)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export async function httpPutNutritionTrackedDaysSummary(req: Request, res: Response): Promise<any> {
  // return res.status(200).json(putNutritionTrackedDaysSummary());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const user: User = {
      userId: userId!,
      email: email!
    }

    const { nutritionTrackedDaysSummary } = req.body;
    await saveNutritionTrackedDaysSummary(user, nutritionTrackedDaysSummary)
    const resPutNutritionTrackedDaysSummary = await putNutritionTrackedDaysSummaryData(userId!, email!, nutritionTrackedDaysSummary);

    if (resPutNutritionTrackedDaysSummary) {
      return res.status(200)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
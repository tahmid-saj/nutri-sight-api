import { Request, Response } from 'express';

import { getNutritionTrackedDaysData, getNutritionTrackedDaysSummaryData,
  postNutritionTrackedDay, putNutritionTrackedDay, deleteNutritionTrackedDay,
  putNutritionTrackedDaysData, putNutritionTrackedDaysSummaryData } 
from "../../models/nutrition-tracker/nutrition-tracker.model.js"

// signed in
export async function httpGetNutritionTrackedDays(req: Request, res: Response) {
  // return res.status(200).json(getNutritionTrackedDays());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const resGetNutritionTrackedDays = await getNutritionTrackedDaysData(userId!, email!);

    if (resGetNutritionTrackedDays) {
      res.status(200).json(resGetNutritionTrackedDays)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
};

export async function httpGetNutritionTrackedDaysSummary(req: Request, res: Response): Promise<void> {
  // return res.status(200).json(getNutritionTrackedDaysSummary());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const resGetNutritionTrackedDaysSummary = await getNutritionTrackedDaysSummaryData(userId!, email!);

    if (resGetNutritionTrackedDaysSummary) {
      res.status(200).json(resGetNutritionTrackedDaysSummary)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
};

// nutrition tracked days operations
export async function httpPostNutritionTrackedDay(req: Request, res: Response): Promise<void> {
  // return res.status(200).json(postNutritionTrackedDay());
  try {
    const nutritionTrackedDay = req.body;
    const userId = req.params.userid;
    const email = req.params.email;
    const resPostNutritionTrackedDay = await postNutritionTrackedDay(userId!, email!, nutritionTrackedDay);

    if (resPostNutritionTrackedDay) {
      res.status(200)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
};

export async function httpDeleteNutritionTrackedDay(req: Request, res: Response): Promise<void> {
  // return res.status(200).json(deleteNutritionTrackedDay());
  try {
    const nutritionTrackedDate = String(req.body)
    const userId = req.params.userid;
    const email = req.params.email;
    const resDeleteNutritionTrackedDay = await deleteNutritionTrackedDay(userId!, email!, nutritionTrackedDate);

    if (resDeleteNutritionTrackedDay) {
      res.status(200)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
};

export async function httpPutNutritionTrackedDay(req: Request, res: Response): Promise<void> {
  // return res.status(200).json(putNutritionTrackedDay());
  try {
    const { originalNutritionTrackedDay } = req.body;
    const { updatedNutritionTrackedDay } = req.body;
    const userId = req.params.userid;
    const email = req.params.email;
    const resPutNutritionTrackedDay = await putNutritionTrackedDay(userId!, email!, originalNutritionTrackedDay, updatedNutritionTrackedDay);

    if (resPutNutritionTrackedDay) {
      res.status(200)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
};

// signed out
export async function httpPutNutritionTrackedDays(req: Request, res: Response): Promise<void> {
  // return res.status(200).json(putNutritionTrackedDays());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const { nutritionTrackedDays } = req.body;
    const resPutNutritionTrackedDays = await putNutritionTrackedDaysData(userId!, email!, nutritionTrackedDays);

    if (resPutNutritionTrackedDays) {
      res.status(200)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
};

export async function httpPutNutritionTrackedDaysSummary(req: Request, res: Response): Promise<void> {
  // return res.status(200).json(putNutritionTrackedDaysSummary());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const { nutritionTrackedDaysSummary } = req.body;
    const resPutNutritionTrackedDaysSummary = await putNutritionTrackedDaysSummaryData(userId!, email!, nutritionTrackedDaysSummary);

    if (resPutNutritionTrackedDaysSummary) {
      res.status(200)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
};
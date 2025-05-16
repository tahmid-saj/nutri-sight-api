import axios from "axios"

import { getNutritionTrackedDays, getNutritionTrackedDaysSummary,
  addNutritionTrackedDay, updateNutritionTrackedDay, removeNutritionTrackedDay,
  updateNutritionTrackedDays, updateNutritionTrackedDaysSummary } 
from "./nutrition-tracker.mongo.crud.ts"
import { UserId } from "./nutrition-tracker.types.ts";
import { Email } from "./nutrition-tracker.types.ts";
import { NutritionTrackedDay } from "./nutrition-tracker.types.ts";
import { NutritionTrackedDate } from "./nutrition-tracker.types.ts";
import { NutritionTrackedDaysSummary } from "./nutrition-tracker.types.ts";
 
// sign in
export async function getNutritionTrackedDaysData(userId: UserId, email: Email): Promise<any> {
  console.log("Getting nutrition tracked days data");
  return getNutritionTrackedDays(userId, email);
};

export async function getNutritionTrackedDaysSummaryData(userId: UserId, email: Email): Promise<any> {
  console.log("Getting nutrition tracked days summary data");
  return getNutritionTrackedDaysSummary(userId, email);
};

// nutrition tracked days operations
export async function postNutritionTrackedDay(userId: UserId, email: Email, 
  nutritionTrackedDay: NutritionTrackedDay): Promise<boolean> {
  console.log("Posting nutrition tracked day");
  addNutritionTrackedDay(userId, email, nutritionTrackedDay);
  return true
};

export async function deleteNutritionTrackedDay(userId: UserId, email: Email, 
  nutritionTrackedDate: NutritionTrackedDate): Promise<Boolean> {
  removeNutritionTrackedDay(userId, email, nutritionTrackedDate);
  console.log("Deleting nutrition tracked day");
  return true
};

export async function putNutritionTrackedDay(userId: UserId, email: Email, 
  originalNutritionTrackedDay: NutritionTrackedDay, updatedNutritionTrackedDay: NutritionTrackedDay): Promise<boolean> {
  console.log("Updating nutrition tracked day");
  updateNutritionTrackedDay(userId, email, originalNutritionTrackedDay, updatedNutritionTrackedDay);
  return true
};

// sign out
export async function putNutritionTrackedDaysData(userId: UserId, email: Email, 
  nutritionTrackedDays: NutritionTrackedDay[]): Promise<boolean> {
  updateNutritionTrackedDays(userId, email, nutritionTrackedDays);
  console.log("Putting nutrition tracked days");
  return true
};

export async function putNutritionTrackedDaysSummaryData(userId: UserId, email: Email, 
  nutritionTrackedDaysSummary: NutritionTrackedDaysSummary): Promise<boolean> {
  updateNutritionTrackedDaysSummary(userId, email, nutritionTrackedDaysSummary);
  console.log("Putting nutrition tracked days summary");
  return true
};

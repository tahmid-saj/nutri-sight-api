import { getNutritionTrackedDays, getNutritionTrackedDaysSummary,
  addNutritionTrackedDay, updateNutritionTrackedDay, removeNutritionTrackedDay,
  updateNutritionTrackedDays, updateNutritionTrackedDaysSummary
} from "../../models/nutrition-tracker/nutrition-tracker.mongo.crud.ts"
import { Email, NutritionTrackedDate, NutritionTrackedDay, 
  NutritionTrackedDaysSummary, UserId } from "../../models/nutrition-tracker/nutrition-tracker.types.ts"

export async function nutritionTrackedDaysByUser(userId: UserId, email: Email): Promise<NutritionTrackedDay[]> {
  const nutritionTrackedDays = await getNutritionTrackedDays(userId, email)
  return nutritionTrackedDays.nutritionTrackedDays
}

export async function nutritionTrackedDaysSummaryByUser(userId: UserId, email: Email): Promise<NutritionTrackedDaysSummary | void> {
  const nutritionTrackedDaysSummary = await getNutritionTrackedDaysSummary(userId, email)
  return nutritionTrackedDaysSummary.nutritionTrackedDaysSummary
}

export async function createUserNutritionTrackedDay(userId: UserId, email: Email, 
  nutritionTrackedDay: NutritionTrackedDay): Promise<boolean> {
  console.log("Posting nutrition tracked day");
  addNutritionTrackedDay(userId, email, nutritionTrackedDay);
  return true
}

export async function deleteUserNutritionTrackedDay(userId: UserId, email: Email, 
  nutritionTrackedDate: NutritionTrackedDate): Promise<boolean> {
  removeNutritionTrackedDay(userId, email, nutritionTrackedDate);
  console.log("Deleting nutrition tracked day");
  return true
}

export async function updateUserNutritionTrackedDay(userId: UserId, email: Email, 
  originalNutritionTrackedDay: NutritionTrackedDay, updatedNutritionTrackedDay: NutritionTrackedDay): Promise<boolean> {
  console.log("Updating nutrition tracked day");
  updateNutritionTrackedDay(userId, email, originalNutritionTrackedDay, updatedNutritionTrackedDay);
  return true
}

export async function updateUserNutritionTrackedDays(userId: UserId, email: Email, 
  nutritionTrackedDays: NutritionTrackedDay[]): Promise<boolean> {
  updateNutritionTrackedDays(userId, email, nutritionTrackedDays);
  console.log("Putting nutrition tracked days");
  return true
}

export async function updateUserNutritionTrackedDaysSummary(userId: UserId, email: Email, 
  nutritionTrackedDaysSummary: NutritionTrackedDaysSummary): Promise<boolean> {
  updateNutritionTrackedDaysSummary(userId, email, nutritionTrackedDaysSummary);
  console.log("Putting nutrition tracked days summary");
  return true
}

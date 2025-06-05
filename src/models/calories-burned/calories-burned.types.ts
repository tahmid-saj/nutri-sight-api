// calories burned types

export type UserId = string
export type Email = string
export type ActivityId = number

export type TrackedCaloriesBurned = {
  dateTracked: string,
  activity: string,
  durationMinutes: number,
  caloriesBurnedPerHour: number,
  totalCaloriesBurned: number,
  activityId: number
}

export type ActivitySearchResult = {
  name: string,
  calories_per_hour: string | number,
  duration_minutes: string | number,
  total_calories: string | number
}
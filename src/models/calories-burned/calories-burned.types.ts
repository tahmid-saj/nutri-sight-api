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
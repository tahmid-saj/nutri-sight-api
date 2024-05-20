const trackedCaloriesBurnedDatabase = require("./calories-burned.mongo")

// calories burned crud for mongodb

// user sign in
async function getTrackedCaloriesBurned(userId, email) {
  const trackedCaloriesBurned = await trackedCaloriesBurnedDatabase.find({
    userId: userId,
    email: email
  })
  .then(res => {
    const trackedCaloriesBurned = res.map(trackedCalories => {
      return {
        dateTracked: trackedCalories.dateTracked,
        activity: trackedCalories.activity,
        durationMinutes: trackedCalories.durationMinutes,
        caloriesBurnedPerHour: trackedCalories.caloriesBurnedPerHour,
        totalCaloriesBurned: trackedCalories.totalCaloriesBurned,
        activityId: trackedCalories.activityId
      }
    })

    return trackedCaloriesBurned
  })
  .catch(error => {
    // TODO: handle error
    console.log(error)
  })

  return {
    trackedCaloriesBurned: [ ...trackedCaloriesBurned ]
  }
}

// calories burned operations
async function addTrackedCaloriesBurned(userId, email, trackedCaloriesBurned) {
  const trackedCaloriesBurnedExists = await trackedCaloriesBurnedDatabase.findOne({
    userId: userId,
    email: email,
    activityId: trackedCaloriesBurned.activityId
  })

  if (!trackedCaloriesBurnedExists) {
    const newTrackedCaloriesBurned = new trackedCaloriesBurnedDatabase({
      userId: userId,
      email: email,
      dateTracked: trackedCaloriesBurned.dateTracked,
      activity: trackedCaloriesBurned.activity,
      durationMinutes: trackedCaloriesBurned.durationMinutes,
      caloriesBurnedPerHour: trackedCaloriesBurned.caloriesBurnedPerHour,
      totalCaloriesBurned: trackedCaloriesBurned.totalCaloriesBurned,
      activityId: trackedCaloriesBurned.activityId
    })
  
    const res = await newTrackedCaloriesBurned.save()
    return res
  } else {
    return
  }
}

async function removeTrackedCaloriesBurned(userId, email, activityId) {
  const trackedCaloriesBurnedExists = await trackedCaloriesBurnedDatabase.findOne({
    userId: userId,
    email: email,
    activityId: activityId
  })

  if (trackedCaloriesBurnedExists) {
    await trackedCaloriesBurnedDatabase.deleteOne({
      userId: userId,
      email: email,
      activityId: activityId
    })
  } else {
    return
  }
}

// user sign out
async function updateTrackedCaloriesBurned(userId, email, trackedCaloriesBurned) {
  const trackedCaloriesBurnedExists = await trackedCaloriesBurnedDatabase.findOne({
    userId: userId,
    email: email
  })

  if (trackedCaloriesBurnedExists && trackedCaloriesBurned !== undefined && trackedCaloriesBurned.length !== 0) {
    trackedCaloriesBurned.map(async (trackedCalories) => {
      await trackedCaloriesBurnedDatabase.updateOne({
        userId: userId,
        email: email,
        activityId: trackedCalories.activityId
      }, {
        dateTracked: trackedCalories.dateTracked,
        activity: trackedCalories.activity,
        durationMinutes: trackedCalories.durationMinutes,
        caloriesBurnedPerHour: trackedCalories.caloriesBurnedPerHour,
        totalCaloriesBurned: trackedCalories.totalCaloriesBurned
      })
    })
  } else {
    return
  }
}

module.exports = {
  getTrackedCaloriesBurned,
  addTrackedCaloriesBurned,
  removeTrackedCaloriesBurned,
  updateTrackedCaloriesBurned
}
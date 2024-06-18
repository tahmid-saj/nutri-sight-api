const { getExercisesData, postExercise, deleteExercise, putExercises } = require("../../models/fitness/fitness.model")
const { getSearchedExercise } = require("../../utils/requests/fitness/fitness.requests")

// searching exercise
async function httpGetSearchedExercise(req, res) {
  try {
    const exerciseQuery = req.body
    const resGetSearchedExercise = await getSearchedExercise(exerciseQuery)

    if (resGetSearchedExercise) return res.status(200).json(resGetSearchedExercise)
  } catch (error) {
    console.log(error)
  }
}

// user sign in
// signed in
async function httpGetExercises(req, res) {
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const resGetExercises = await getExercisesData(userId, email)

    if (resGetExercises) return res.status(200).json(resGetExercises)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

// fitness operations
async function httpPostExercise(req, res) {
  try {
    const exercise = req.body
    const userId = req.params.userid;
    const email = req.params.email;
    const resPostExercise = await postExercise(userId, email, exercise)

    if (resPostExercise) return res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

async function httpDeleteExercise(req, res) {
  try {
    const exerciseTag = Number(String(req.body))
    const userId = req.params.userid;
    const email = req.params.email;
    const resDeleteExercise = await deleteExercise(userId, email, exerciseTag)

    if (resDeleteExercise) return res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

// signed out
async function httpPutExercises(req, res) {
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const { exercises } = req.body
    const resPutExercises = await putExercises(userId, email, exercises)

    if (resPutExercises) return res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

module.exports = {
  httpGetSearchedExercise,
  httpGetExercises,
  httpPostExercise,
  httpDeleteExercise,
  httpPutExercises
}
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

module.exports = {
  httpGetSearchedExercise
}
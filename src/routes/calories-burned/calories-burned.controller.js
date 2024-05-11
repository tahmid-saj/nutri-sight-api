const {  }

// signed in
async function httpGetTrackedCaloriesBurned(req, res) {
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const resGetTrackedCaloriesBurned = await getTrackedCaloriesBurned(userId, email)

    if (resGetTrackedCaloriesBurned) return res.status(200).json(resGetTrackedCaloriesBurned)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

// calories burned operations
async function httpPostTrackedCaloriesBurned(req, res) {
  try {
    const trackedCaloriesBurned = req.body
    const userId = req.params.userid;
    const email = req.params.email;
    const resPostTrackedCaloriesBurned = await postTrackedCaloriesBurned(userId, email, trackedCaloriesBurned)

    if (resPostTrackedCaloriesBurned) return res.status(200).json(resPostTrackedCaloriesBurned)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

async function httpDeleteTrackedCaloriesBurned(req, res) {
  try {
    const trackedCaloriesBurned = String(req.body) 
    const userId = req.params.userid;
    const email = req.params.email;
    const resDeleteTrackedCaloriesBurned = await deleteTrackedCaloriesBurned(userId, email, trackedCaloriesBurned)

    if (resDeleteTrackedCaloriesBurned) return res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

// signed out
async function httpPutTrackedCaloriesBurned(req, res) {
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const { trackedCaloriesBurned } = req.body
    const resPutTrackedCaloriesBurned = await putTrackedCaloriesBurned(userId, email, trackedCaloriesBurned)

    if (resPutTrackedCaloriesBurned) return res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

module.exports = {
  httpGetTrackedCaloriesBurned,
  httpPostTrackedCaloriesBurned,
  httpDeleteTrackedCaloriesBurned,
  httpPutTrackedCaloriesBurned
}
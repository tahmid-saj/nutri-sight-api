const { getNutritionTrackedDaysData, getNutritionTrackedDaysSummaryData,
  postNutritionTrackedDay, putNutritionTrackedDay, deleteNutritionTrackedDay,
  putNutritionTrackedDaysData, putNutritionTrackedDaysSummaryData } = require("../../models/nutrition-tracker/nutrient-tracker.model")

// signed in
async function httpGetNutritionTrackedDays(req, res) {
  // return res.status(200).json(getNutritionTrackedDays());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const resGetNutritionTrackedDays = await getNutritionTrackedDaysData(userId, email);

    if (resGetNutritionTrackedDays) return res.status(200).json(resGetNutritionTrackedDays);
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
};

async function httpGetNutritionTrackedDaysSummary(req, res) {
  // return res.status(200).json(getNutritionTrackedDaysSummary());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const resGetNutritionTrackedDaysSummary = await getNutritionTrackedDaysSummaryData(userId, email);

    if (resGetNutritionTrackedDaysSummary) return res.status(200).json(resGetNutritionTrackedDaysSummary);
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
};

// nutrition tracked days operations
async function httpPostNutritionTrackedDay(req, res) {
  // return res.status(200).json(postNutritionTrackedDay());
  try {
    const nutritionTrackedDay = req.body;
    const userId = req.params.userid;
    const email = req.params.email;
    const resPostNutritionTrackedDay = await postNutritionTrackedDay(userId, email, nutritionTrackedDay);

    if (resPostNutritionTrackedDay) return res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
};

async function httpPutNutritionTrackedDay(req, res) {
  // return res.status(200).json(putNutritionTrackedDay());
  try {
    const { originalNutritionTrackedDay } = req.body;
    const { updatedNutritionTrackedDay } = req.body;
    const userId = req.params.userid;
    const email = req.params.email;
    const resPutNutritionTrackedDay = await putNutritionTrackedDay(userId, email, originalNutritionTrackedDay, updatedNutritionTrackedDay);

    if (resPutNutritionTrackedDay) return res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
};

async function httpDeleteNutritionTrackedDay(req, res) {
  // return res.status(200).json(deleteNutritionTrackedDay());
  try {
    const nutritionTrackedDate = String(req.body)
    const userId = req.params.userid;
    const email = req.params.email;
    const resDeleteNutritionTrackedDay = await deleteNutritionTrackedDay(userId, email, nutritionTrackedDate);

    if (resDeleteNutritionTrackedDay) return res.status(200)
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
};

// signed out
async function httpPutNutritionTrackedDays(req, res) {
  // return res.status(200).json(putNutritionTrackedDays());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const { nutritionTrackedDays } = req.body;
    const resPutNutritionTrackedDays = await putNutritionTrackedDaysData(userId, email, nutritionTrackedDays);

    if (resPutNutritionTrackedDays) return res.status(200);
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
};

async function httpPutNutritionTrackedDaysSummary(req, res) {
  // return res.status(200).json(putNutritionTrackedDaysSummary());
  try {
    const userId = req.params.userid;
    const email = req.params.email;
    const { nutritionTrackedDaysSummary } = req.body;
    const resPutNutritionTrackedDaysSummary = await putNutritionTrackedDaysSummaryData(userId, email, nutritionTrackedDaysSummary);

    if (resPutNutritionTrackedDaysSummary) return res.status(200);
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
};

module.exports = {
  httpGetNutritionTrackedDays,
  httpGetNutritionTrackedDaysSummary,
  httpPostNutritionTrackedDay,
  httpPutNutritionTrackedDay,
  httpDeleteNutritionTrackedDay,
  httpPutNutritionTrackedDays,
  httpPutNutritionTrackedDaysSummary,
}

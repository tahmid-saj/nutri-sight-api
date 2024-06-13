const { getRecipes, getRecipe } = require("../../utils/requests/recipes/recipes.requests")

// multiple recipes
async function httpGetRecipes(req, res) {
  try {
    const recipe = String(req.body)
    const resGetRecipes = await getRecipes(recipe)

    if (resGetRecipes) return res.status(200).json(resGetRecipes)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

// single recipe info
async function httpGetRecipe(req, res) {
  try {
    const recipe = req.body
    const resGetRecipe = await getRecipe(recipe)

    if (resGetRecipe) return res.status(200).json(resGetRecipe)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

module.exports = {
  httpGetRecipes,
  httpGetRecipe
}
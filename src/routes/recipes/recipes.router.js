const express = require("express")

const { httpGetRecipes, httpGetRecipe } = require("./recipes.controller")

const recipesRouter = express.Router()

// TODO: move to env variables
// get multiple recipes
recipesRouter.post("/recipes", httpGetRecipes)

// get single recipe info
recipesRouter.post("/recipe", httpGetRecipe)

module.exports = {
  recipesRouter
}
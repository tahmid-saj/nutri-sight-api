import express, { Router } from "express"

import { httpGetRecipes, httpGetRecipe } from "./recipes.controller.ts"

const recipesRouter: Router = express.Router()

// TODO: move to env variables
// get multiple recipes
recipesRouter.post("/recipes", httpGetRecipes)

// get single recipe info
recipesRouter.post("/recipe", httpGetRecipe)

export { recipesRouter }
import express, { Router } from "express"

import { httpGetRecipes, httpGetRecipe, httpGetUserLikedRecipes, 
  httpGetUserRequestedRecipes, httpGetLikedRecipes, 
  httpGetRequestedRecipes, httpGetViewedRecipes, 
  httpPostUserLikesRecipe,
  httpPostUserUnlikesRecipe,
  httpGetRecipeForUser} from "./recipes.controller.js"

const recipesRouter: Router = express.Router()

// TODO: move to env variables
// get multiple recipes
recipesRouter.post("/recipes", httpGetRecipes)

// get single recipe info
recipesRouter.post("/recipe", httpGetRecipe)

// get single recipe info for user
recipesRouter.post("/recipe/:userId/:email", httpGetRecipeForUser)

// get user's liked recipes
recipesRouter.get("/recipes-liked/:userId/:email", httpGetUserLikedRecipes)

// get user's requested recipes
recipesRouter.get("/recipes-requested/:userId/:email", httpGetUserRequestedRecipes)

// get most liked recipes by all users
recipesRouter.get("/recipes-liked", httpGetLikedRecipes)

// get most requested recipes by all users
recipesRouter.get("/recipes-requested", httpGetRequestedRecipes)

// get most viewed recipes by all users
recipesRouter.get("/recipes-viewed", httpGetViewedRecipes)

// user likes a recipe
recipesRouter.post("/recipes-liked/:userId/:email", httpPostUserLikesRecipe)

// user unlikes a recipe
recipesRouter.post("/recipes-unliked/:userId/:email", httpPostUserUnlikesRecipe)

export { recipesRouter }

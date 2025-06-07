import { Request, Response } from 'express';

import { getRecipes, getRecipe } from "../../utils/requests/recipes/recipes.requests.js"

// multiple recipes
export async function httpGetRecipes(req: Request, res: Response): Promise<void> {
  try {
    const recipe = String(req.body)
    const resGetRecipes = await getRecipes(recipe)

    if (resGetRecipes) {
      res.status(200).json(resGetRecipes)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

// single recipe info
export async function httpGetRecipe(req: Request, res: Response): Promise<void> {
  try {
    const recipe = req.body
    const resGetRecipe = await getRecipe(recipe)

    if (resGetRecipe) {
      res.status(200).json(resGetRecipe)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

import { Request, Response } from 'express';

import { getRecipes, getRecipe } from "../../utils/requests/recipes/recipes.requests.js"
import { User } from '../../models/users/users.types.js';
import { areLikedRecipesCached, areRequestedRecipesCached, areUserLikedRecipesCached, 
  areUserRequestedRecipesCached, areViewedRecipesCached, getAllUserLikedRecipes, 
  getAllUserRequestedRecipes, getMostLikedRecipes, getMostRequestedRecipes, getMostViewedRecipes, userLikesRecipe, 
  userLikesRecipeWithLock, 
  userRequestsRecipe, userRequestsRecipeWithLock, userUnlikesRecipe, userUnlikesRecipeWithLock, userViewsRecipe, 
  userViewsRecipeWithLock} from '../../redis/queries/recipes/recipes.queries.js';

// multiple recipes
export async function httpGetRecipes(req: Request, res: Response): Promise<any> {
  try {
    const recipe = String(req.body)
    const resGetRecipes = await getRecipes(recipe)

    if (resGetRecipes) {
      return res.status(200).json(resGetRecipes)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// single recipe info
export async function httpGetRecipe(req: Request, res: Response): Promise<any> {
  try {
    const recipe = req.body
    const resGetRecipe = await getRecipe(recipe)

    if (resGetRecipe) {
      return res.status(200).json(resGetRecipe)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// single recipe info for user
export async function httpGetRecipeForUser(req: Request, res: Response): Promise<any> {
  try {
    const userId = req.params.userId
    const email = req.params.email
    const user: User = {
      userId: userId!,
      email: email!
    }

    const recipe = req.body
    const resGetRecipe = await getRecipe(recipe)

    if (resGetRecipe) {
      await userRequestsRecipeWithLock(user, recipe.id, recipe.title)
      await userViewsRecipeWithLock(user, recipe.id, recipe.title)
      return res.status(200).json(resGetRecipe)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// get user's liked recipes
export async function httpGetUserLikedRecipes(req: Request, res: Response): Promise<any> {
  try {
    const userId = req.params.userId
    const email = req.params.email
    const user: User = {
      userId: userId!,
      email: email!
    }

    const userLikedRecipesCached = await areUserLikedRecipesCached(user)
    if (userLikedRecipesCached) {
      const resUserLikedRecipes = await getAllUserLikedRecipes(user)
      return res.status(200).json(resUserLikedRecipes)
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// get user's requested recipes
export async function httpGetUserRequestedRecipes(req: Request, res: Response): Promise<any> {
  try {
    const userId = req.params.userId
    const email = req.params.email
    const user: User = {
      userId: userId!,
      email: email!
    }

    const userRequestedRecipesCached = await areUserRequestedRecipesCached(user)
    if (userRequestedRecipesCached) {
      const resUserRequestedRecipes = await getAllUserRequestedRecipes(user)
      return res.status(200).json(resUserRequestedRecipes)
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// get most liked recipes by all users
export async function httpGetLikedRecipes(req: Request, res: Response): Promise<any> {
  try {
    const likedRecipesCached = await areLikedRecipesCached()
    if (likedRecipesCached) {
      const resLikedRecipesCached = await getMostLikedRecipes()
      return res.status(200).json(resLikedRecipesCached)
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// get most requested recipes by all users
export async function httpGetRequestedRecipes(req: Request, res: Response): Promise<any> {
  try {
    const requestedRecipesCached = await areRequestedRecipesCached()
    if (requestedRecipesCached) {
      const resRequestedRecipes = await getMostRequestedRecipes()
      return res.status(200).json(resRequestedRecipes)
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// get most viewed recipes by all users
export async function httpGetViewedRecipes(req: Request, res: Response): Promise<any> {
  try {
    const viewedRecipesCached = await areViewedRecipesCached()
    if (viewedRecipesCached) {
      const resViewedRecipes = await getMostViewedRecipes()
      return res.status(200).json(resViewedRecipes)
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// user likes a recipe
export async function httpPostUserLikesRecipe(req: Request, res: Response): Promise<any> {
  try {
    const userId = req.params.userId
    const email = req.params.email
    const user: User = {
      userId: userId!,
      email: email!
    }

    const recipe = req.body

    await userLikesRecipeWithLock(user, recipe.id, recipe.title)
    return res.status(200).send(true)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// user unlikes a recipe
export async function httpPostUserUnlikesRecipe(req: Request, res: Response): Promise<any> {
  try {
    const userId = req.params.userId
    const email = req.params.email
    const user: User = {
      userId: userId!,
      email: email!
    }

    const recipe = req.body

    await userUnlikesRecipeWithLock(user, recipe.id, recipe.title)
    return res.status(200).send(true)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
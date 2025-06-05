import { User } from "../../../models/users/users.types.ts";
import { redisClient } from "../../../services/redis/redis.services.ts";
import { CACHING_TTL } from "../../../utils/constants/shared.constants.ts";
import { usersKey } from "../users/users.keys.ts";
import { likedRecipesKey, recipeKey, recipeViewsKey, requestedRecipesKey, 
  userLikedRecipesKey, userRequestedRecipesKey, 
  viewedRecipesKey} from "./recipes.keys.ts";

// helper functions

// checkers

export const areUserLikedRecipesCached = async (user: User) => {
  return await redisClient.exists(userLikedRecipesKey(user))
}

export const areLikedRecipesCached = async () => {
  return await redisClient.exists(likedRecipesKey())
}

export const areUserRequestedRecipesCached = async (user: User) => {
  return await redisClient.exists(userRequestedRecipesKey(user))
}

export const areRequestedRecipesCached = async () => {
  return await redisClient.exists(requestedRecipesKey())
}

export const areViewedRecipesCached = async () => {
  return await redisClient.exists(viewedRecipesKey())
}

// getters

// gets all liked recipe names of user
export const getAllUserLikedRecipes = async (user: User) => {
  return await redisClient.sMembers(userLikedRecipesKey(user))
}

// gets the most liked recipe names
export const getMostLikedRecipes = async () => {
  return await redisClient.zrevrange(likedRecipesKey(), 0, 9, "WITHSCORES")
}

// gets all the requested recipe names of user
export const getAllUserRequestedRecipes = async (user: User) => {
  return await redisClient.sMembers(userRequestedRecipesKey(user))
}

// gets the most requested recipe names
export const getMostRequestedRecipes = async () => {
  return await redisClient.zrevrange(requestedRecipesKey(), 0, 9, "WITHSCORES")
}

// gets the most viewed recipe names
export const getMostViewedRecipes = async () => {
  return await redisClient.zrevrange(viewedRecipesKey(), 0, 0, "WITHSCORES")
}

// setters

// when a user likes a recipe
export const userLikesRecipe = async (user: User, recipeName: string) => {
  const userLikedRecipe = await redisClient.sIsMember(userLikedRecipesKey(user), recipeName)
  
  if (!userLikedRecipe) {
    // update recipe hash
    await Promise.all([
      redisClient.multi()
        .hIncrBy(recipeKey(recipeName), {
          likes: 1
        })
        .expire(recipeKey(recipeName), CACHING_TTL.high)
        .exec(),
  
      // update user liked recipes set
      redisClient.multi()
        .sAdd(userLikedRecipesKey(user), recipeName)
        .expire(userLikedRecipesKey(user), CACHING_TTL.high)
        .exec(),
  
      // update liked recipes sorted set
      redisClient.multi()
        .zIncrBy(likedRecipesKey(), 1, recipeName)
        .expire(likedRecipesKey(), CACHING_TTL.high)
        .exec()
    ])
  }
}

// when a user unlikes a recipe
export const userUnlikesRecipe = async (user: User, recipeName: string) => {
  const userLikedRecipe = await redisClient.sIsMember(userLikedRecipesKey(user), recipeName)
  
  if (userLikedRecipe) {
    // update recipe hash
    await Promise.all([
      redisClient.multi()
        .hIncrBy(recipeKey(recipeName), {
          likes: -1
        })
        .expire(recipeKey(recipeName), CACHING_TTL.high)
        .exec(),
  
      // update user liked recipes set
      redisClient.multi()
        .sRem(userLikedRecipesKey(user), recipeName)
        .expire(userLikedRecipesKey(user), CACHING_TTL.high)
        .exec(),
  
      // update liked recipes sorted set
      redisClient.multi()
        .zIncrBy(likedRecipesKey(), -1, recipeName)
        .expire(likedRecipesKey(), CACHING_TTL.high)
        .exec()
    ])
  }
}

// when a user requests a recipe
export const userRequestsRecipe = async (user: User, recipeName: string) => {
  await Promise.all([
    // update recipe hash
    redisClient.multi()
      .hIncrBy(recipeKey(recipeName), {
        requests: 1
      })
      .expire(recipeKey(recipeName), CACHING_TTL.high)
      .exec(),

    // update user requested recipes set
    redisClient.multi()
      .sAdd(userRequestedRecipesKey(user), recipeName)
      .expire(userRequestedRecipesKey(user), CACHING_TTL.high)
      .exec(),

    // update requested recipes sorted set
    redisClient.multi()
      .zIncrBy(requestedRecipesKey(), 1, recipeName)
      .expire(requestedRecipesKey(), CACHING_TTL.high)
      .exec()
  ])
}

// when a user views a recipe
export const userViewsRecipe = async (user: User, recipeName: string) => {
  const inserted = await redisClient.pfAdd(recipeViewsKey(recipeName), usersKey(user))
  if (inserted) {
    await Promise.all([
      // update the recipe hash
      redisClient.multi()
        .hIncrBy(recipeKey(recipeName), {
          views: 1
        })
        .expire(recipeKey(recipeName), CACHING_TTL.high)
        .exec(),

      // update viewed recipes sorted set
      redisClient.multi()
        .zIncrBy(viewedRecipesKey(), 1, recipeName)
        .expire(viewedRecipesKey(), CACHING_TTL.high)
        .exec()
    ])
  }
}
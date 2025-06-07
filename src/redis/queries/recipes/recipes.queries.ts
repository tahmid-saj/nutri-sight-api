import { User } from "../../../models/users/users.types.js";
import { redisClient } from "../../../services/redis/redis.services.js";
import { CACHING_TTL } from "../../../utils/constants/shared.constants.js";
import { withLock } from "../../locks/lock.js";
import { usersKey } from "../users/users.keys.js";
import { likedRecipesKey, recipeKey, recipeViewsKey, requestedRecipesKey, 
  userLikedRecipesKey, userRequestedRecipesKey, 
  viewedRecipesKey} from "./recipes.keys.js";
import { v4 as uuidv4 } from "uuid"

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

// gets all liked recipeIds of user
export const getAllUserLikedRecipes = async (user: User) => {
  return await redisClient.sMembers(userLikedRecipesKey(user))
}

// gets the most liked recipeIds
export const getMostLikedRecipes = async () => {
  return await redisClient.zRange(likedRecipesKey(), 0, 9, { REV: true, WITHSCORES: true });
}

// gets all the requested recipeIds of user
export const getAllUserRequestedRecipes = async (user: User) => {
  return await redisClient.sMembers(userRequestedRecipesKey(user))
}

// gets the most requested recipeIds
export const getMostRequestedRecipes = async () => {
  return await redisClient.zRange(requestedRecipesKey(), 0, 9, { REV: true, WITHSCORES: true });
}

// gets the most viewed recipeIds
export const getMostViewedRecipes = async () => {
  return await redisClient.zRange(viewedRecipesKey(), 0, 9, { REV: true, WITHSCORES: true });  
}

// setters

// when a user likes a recipe
export const userLikesRecipe = async (user: User, recipeId: string, recipeName: string) => {
  await redisClient.executeIsolated(async (isolatedClient: any) => {
    // watch for the below keys
    await initializeRecipeHash(recipeId, recipeName)
    await isolatedClient.watch(recipeKey(recipeId))
    await isolatedClient.watch(userLikedRecipesKey(user))
    await isolatedClient.watch(likedRecipesKey())

    const userLikedRecipe = await isolatedClient.sIsMember(userLikedRecipesKey(user), recipeId)
    
    if (!userLikedRecipe) {
      // update recipe hash
      // update user liked recipes set
      // update liked recipes sorted set
      await isolatedClient.multi()
        .hIncrBy(recipeKey(recipeId), "likes", 1)
        .expire(recipeKey(recipeId), CACHING_TTL.high)
        .sAdd(userLikedRecipesKey(user), recipeId)
        .expire(userLikedRecipesKey(user), CACHING_TTL.high)
        .zIncrBy(likedRecipesKey(), 1, recipeId)
        .expire(likedRecipesKey(), CACHING_TTL.high)
        .exec()
    }
  })
}

// when a user likes a recipe - with a lock
export const userLikesRecipeWithLock = async (user: User, recipeId: string, recipeName: string) => {
  const lockId = uuidv4()

  await withLock(lockId, async (signal: any) => {
    await initializeRecipeHash(recipeId, recipeName)

    const userLikedRecipe = await redisClient.sIsMember(userLikedRecipesKey(user), recipeId)

    if (!userLikedRecipe) {
      if (signal.expired) {
        throw new Error("Lock expired, can't write any more data")
      }

      // update recipe hash
      // update user liked recipes set
      // update liked recipes sorted set
      await redisClient.multi()
        .hIncrBy(recipeKey(recipeId), "likes", 1)
        .expire(recipeKey(recipeId), CACHING_TTL.high)
        .sAdd(userLikedRecipesKey(user), recipeId)
        .expire(userLikedRecipesKey(user), CACHING_TTL.high)
        .zIncrBy(likedRecipesKey(), 1, recipeId)
        .expire(likedRecipesKey(), CACHING_TTL.high)
        .exec()
    }
  })
}

// when a user unlikes a recipe
export const userUnlikesRecipe = async (user: User, recipeId: string, recipeName: string) => {
  await redisClient.executeIsolated(async (isolatedClient: any) => {
    await initializeRecipeHash(recipeId, recipeName)
    await isolatedClient.watch(recipeKey(recipeId))
    await isolatedClient.watch(userLikedRecipesKey(user))
    await isolatedClient.watch(likedRecipesKey())

    const userLikedRecipe = await isolatedClient.sIsMember(userLikedRecipesKey(user), recipeId)

    if (userLikedRecipe) {
      // update recipe hash
      // update user liked recipes set
      // update liked recipes sorted set
      isolatedClient.multi()
        .hIncrBy(recipeKey(recipeId), "likes", -1)

        .expire(recipeKey(recipeId), CACHING_TTL.high)
        .sRem(userLikedRecipesKey(user), recipeId)
        .expire(userLikedRecipesKey(user), CACHING_TTL.high)
        .zIncrBy(likedRecipesKey(), -1, recipeId)
        .expire(likedRecipesKey(), CACHING_TTL.high)
        .exec()
    }
  })
}

// when a user unlikes a recipe - with a lock
export const userUnlikesRecipeWithLock = async (user: User, recipeId: string, recipeName: string) => {
  const lockId = uuidv4()

  await withLock(lockId, async (signal: any) => {
    await initializeRecipeHash(recipeId, recipeName)

    const userLikedRecipe = await redisClient.sIsMember(userLikedRecipesKey(user), recipeId)

    if (userLikedRecipe) {
      if (signal.expired) {
        throw new Error("Lock expired, can't write any more data")
      }

      // update recipe hash
      // update user liked recipes set
      // update liked recipes sorted set
      await redisClient.multi()
        .hIncrBy(recipeKey(recipeId), "likes", -1)
        .expire(recipeKey(recipeId), CACHING_TTL.high)
        .sRem(userLikedRecipesKey(user), recipeId)
        .expire(userLikedRecipesKey(user), CACHING_TTL.high)
        .zIncrBy(likedRecipesKey(), -1, recipeId)
        .expire(likedRecipesKey(), CACHING_TTL.high)
        .exec()
    }
  })
}

// when a user requests a recipe
export const userRequestsRecipe = async (user: User, recipeId: string, recipeName: string) => {
  await redisClient.executeIsolated(async (isolatedClient: any) => {
    // watch for the below keys
    await initializeRecipeHash(recipeId, recipeName)
    await isolatedClient.watch(recipeKey(recipeId))
    await isolatedClient.watch(userRequestedRecipesKey(user))
    await isolatedClient.watch(requestedRecipesKey())

    // update recipe hash
    // update user requested recipes set
    // update requested recipes sorted set
    await redisClient.multi()
      .hIncrBy(recipeKey(recipeId), "requests", 1)
      .expire(recipeKey(recipeId), CACHING_TTL.high)
      .sAdd(userRequestedRecipesKey(user), recipeId)
      .expire(userRequestedRecipesKey(user), CACHING_TTL.high)
      .zIncrBy(requestedRecipesKey(), 1, recipeId)
      .expire(requestedRecipesKey(), CACHING_TTL.high)
      .exec()
  })
}

// when a user requests a recipe - with a lock
export const userRequestsRecipeWithLock = async (user: User, recipeId: string, recipeName: string) => {
  const lockId = uuidv4()
  
  await withLock(lockId, async (signal: any) => {
    await initializeRecipeHash(recipeId, recipeName)

    if (signal.expired) {
      throw new Error("Lock expired, can't write any more data")
    }

    console.log(recipeKey(recipeId))

    // update recipe hash
    // update user requested recipes set
    // update requested recipes sorted set
    await redisClient.multi()
      .hIncrBy(recipeKey(recipeId), "requests", 1)
      .expire(recipeKey(recipeId), CACHING_TTL.high)
      .sAdd(userRequestedRecipesKey(user), recipeId)
      .expire(userRequestedRecipesKey(user), CACHING_TTL.high)
      .zIncrBy(requestedRecipesKey(), 1, recipeId)
      .expire(requestedRecipesKey(), CACHING_TTL.high)
      .exec()
  })
}

// when a user views a recipe
export const userViewsRecipe = async (user: User, recipeId: string, recipeName: string) => {
  await redisClient.executeIsolated(async (isolatedClient: any) => {
    await initializeRecipeHash(recipeId, recipeName)
    await isolatedClient.watch(recipeKey(recipeId))
    await isolatedClient.watch(viewedRecipesKey())

    const inserted = await isolatedClient.pfAdd(recipeViewsKey(recipeId), usersKey(user))
    if (inserted) {
      // update the recipe hash
      // update viewed recipes sorted set
      await isolatedClient.multi()
        .hIncrBy(recipeKey(recipeId), "views", 1)
        .expire(recipeKey(recipeId), CACHING_TTL.high)
        .zIncrBy(viewedRecipesKey(), 1, recipeId)
        .expire(viewedRecipesKey(), CACHING_TTL.high)
        .exec()
    }
  })
}

// when a user views a recipe - with a lock
export const userViewsRecipeWithLock = async (user: User, recipeId: string, recipeName: string) => {
  const lockId = uuidv4()
  
  await withLock(lockId, async (signal: any) => {
    await initializeRecipeHash(recipeId, recipeName)

    const inserted = await redisClient.pfAdd(recipeViewsKey(recipeId), usersKey(user))
    
    if (signal.expired) {
      throw new Error("Lock expired, can't write any more data")
    }

    if (inserted) {
      // update the recipe hash
      // update viewed recipes sorted set
      await redisClient.multi()
        .hIncrBy(recipeKey(recipeId), "views", 1)
        .expire(recipeKey(recipeId), CACHING_TTL.high)
        .zIncrBy(viewedRecipesKey(), 1, recipeId)
        .expire(viewedRecipesKey(), CACHING_TTL.high)
        .exec()
    }
  })
}

export const initializeRecipeHash = async (recipeId: string, recipeName: string) => {
  // if the recipe is not yet cached, then initialize it
  const recipeExists = await redisClient.exists(recipeKey(recipeId))

  if (!recipeExists) {
    await redisClient.multi()
      .hSet(recipeKey(recipeId), {
        recipeName: recipeName,
        likes: 0,
        requests: 0,
        views: 0
      })
      .expire(recipeKey(recipeId), CACHING_TTL.high)
      .exec()
  }
}
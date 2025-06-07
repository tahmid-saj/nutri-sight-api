import { User } from "../../../models/users/users.types.js";
import { redisClient } from "../../../services/redis/redis.services.js";
import { CACHING_TTL } from "../../../utils/constants/shared.constants.js";
import { withLock } from "../../locks/lock.js";
import { usersKey } from "../users/users.keys.js";
import { likedRecipesKey, recipeKey, recipeViewsKey, requestedRecipesKey, 
  userLikedRecipesKey, userRequestedRecipesKey, 
  viewedRecipesKey} from "./recipes.keys.js";

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
  await redisClient.executeIsolated(async (isolatedClient: any) => {
    // watch for the below keys
    await isolatedClient.watch(recipeKey(recipeName))
    await isolatedClient.watch(userLikedRecipesKey(user))
    await isolatedClient.watch(likedRecipesKey())

    const userLikedRecipe = await isolatedClient.sIsMember(userLikedRecipesKey(user), recipeName)
    
    if (!userLikedRecipe) {
      // update recipe hash
      // update user liked recipes set
      // update liked recipes sorted set
      await isolatedClient.multi()
        .hIncrBy(recipeKey(recipeName), {
          likes: 1
        })
        .expire(recipeKey(recipeName), CACHING_TTL.high)
        .sAdd(userLikedRecipesKey(user), recipeName)
        .expire(userLikedRecipesKey(user), CACHING_TTL.high)
        .zIncrBy(likedRecipesKey(), 1, recipeName)
        .expire(likedRecipesKey(), CACHING_TTL.high)
        .exec()
    }
  })
}

// when a user likes a recipe - with a lock
export const userLikesRecipeWithLock = async (user: User, recipeName: string) => {
  return await withLock(recipeName, async (signal: any) => {
    const userLikedRecipe = await redisClient.sIsMember(userLikedRecipesKey(user), recipeName)

    if (!userLikedRecipe) {
      if (signal.expired) {
        throw new Error("Lock expired, can't write any more data")
      }

      // update recipe hash
      // update user liked recipes set
      // update liked recipes sorted set
      await redisClient.multi()
        .hIncrBy(recipeKey(recipeName), {
          likes: 1
        })
        .expire(recipeKey(recipeName), CACHING_TTL.high)
        .sAdd(userLikedRecipesKey(user), recipeName)
        .expire(userLikedRecipesKey(user), CACHING_TTL.high)
        .zIncrBy(likedRecipesKey(), 1, recipeName)
        .expire(likedRecipesKey(), CACHING_TTL.high)
        .exec()
    }
  })
}

// when a user unlikes a recipe
export const userUnlikesRecipe = async (user: User, recipeName: string) => {
  await redisClient.executeIsolated(async (isolatedClient: any) => {
    await isolatedClient.watch(recipeKey(recipeName))
    await isolatedClient.watch(userLikedRecipesKey(user))
    await isolatedClient.watch(likedRecipesKey())

    const userLikedRecipe = await isolatedClient.sIsMember(userLikedRecipesKey(user), recipeName)

    if (userLikedRecipe) {
      // update recipe hash
      // update user liked recipes set
      // update liked recipes sorted set
      isolatedClient.multi()
        .hIncrBy(recipeKey(recipeName), {
          likes: -1
        })
        .expire(recipeKey(recipeName), CACHING_TTL.high)
        .sRem(userLikedRecipesKey(user), recipeName)
        .expire(userLikedRecipesKey(user), CACHING_TTL.high)
        .zIncrBy(likedRecipesKey(), -1, recipeName)
        .expire(likedRecipesKey(), CACHING_TTL.high)
        .exec()
    }
  })
}

// when a user unlikes a recipe - with a lock
export const userUnlikesRecipeWithLock = async (user: User, recipeName: string) => {
  return await withLock(recipeName, async (signal: any) => {
    const userLikedRecipe = await redisClient.sIsMember(userLikedRecipesKey(user), recipeName)

    if (userLikedRecipe) {
      if (signal.expired) {
        throw new Error("Lock expired, can't write any more data")
      }

      // update recipe hash
      // update user liked recipes set
      // update liked recipes sorted set
      await redisClient.multi()
        .hIncrBy(recipeKey(recipeName), {
          likes: -1
        })
        .expire(recipeKey(recipeName), CACHING_TTL.high)
        .sRem(userLikedRecipesKey(user), recipeName)
        .expire(userLikedRecipesKey(user), CACHING_TTL.high)
        .zIncrBy(likedRecipesKey(), -1, recipeName)
        .expire(likedRecipesKey(), CACHING_TTL.high)
        .exec()
    }
  })
}

// when a user requests a recipe
export const userRequestsRecipe = async (user: User, recipeName: string) => {
  await redisClient.executeIsolated(async (isolatedClient: any) => {
    // watch for the below keys
    await isolatedClient.watch(recipeKey(recipeName))
    await isolatedClient.watch(userRequestedRecipesKey(user))
    await isolatedClient.watch(requestedRecipesKey())

    // update recipe hash
    // update user requested recipes set
    // update requested recipes sorted set
    await isolatedClient.multi()
      .hIncrBy(recipeKey(recipeName), {
        requests: 1
      })
      .expire(recipeKey(recipeName), CACHING_TTL.high)
      .sAdd(userRequestedRecipesKey(user), recipeName)
      .expire(userRequestedRecipesKey(user), CACHING_TTL.high)
      .zIncrBy(requestedRecipesKey(), 1, recipeName)
      .expire(requestedRecipesKey(), CACHING_TTL.high)
      .exec()
  })
}

// when a user requests a recipe - with a lock
export const userRequestsRecipeWithLock = async (user: User, recipeName: string) => {
  return await withLock(recipeName, async (signal: any) => {
    if (signal.expired) {
      throw new Error("Lock expired, can't write any more data")
    }

    // update recipe hash
    // update user requested recipes set
    // update requested recipes sorted set
    await redisClient.multi()
      .hIncrBy(recipeKey(recipeName), {
        requests: 1
      })
      .expire(recipeKey(recipeName), CACHING_TTL.high)
      .sAdd(userRequestedRecipesKey(user), recipeName)
      .expire(userRequestedRecipesKey(user), CACHING_TTL.high)
      .zIncrBy(requestedRecipesKey(), 1, recipeName)
      .expire(requestedRecipesKey(), CACHING_TTL.high)
      .exec()
  })
}

// when a user views a recipe
export const userViewsRecipe = async (user: User, recipeName: string) => {
  await redisClient.executeIsolated(async (isolatedClient: any) => {
    await isolatedClient.watch(recipeKey(recipeName))
    await isolatedClient.watch(viewedRecipesKey())

    const inserted = await isolatedClient.pfAdd(recipeViewsKey(recipeName), usersKey(user))
    if (inserted) {
      // update the recipe hash
      // update viewed recipes sorted set
      await isolatedClient.multi()
        .hIncrBy(recipeKey(recipeName), {
          views: 1
        })
        .expire(recipeKey(recipeName), CACHING_TTL.high)
        .zIncrBy(viewedRecipesKey(), 1, recipeName)
        .expire(viewedRecipesKey(), CACHING_TTL.high)
        .exec()
    }
  })
}

// when a user views a recipe - with a lock
export const userViewsRecipeWithLock = async (user: User, recipeName: string) => {
  return await withLock(recipeName, async (signal: any) => {
    const inserted = await redisClient.pfAdd(recipeViewsKey(recipeName), usersKey(user))
    
    if (signal.expired) {
      throw new Error("Lock expired, can't write any more data")
    }

    if (inserted) {
      // update the recipe hash
      // update viewed recipes sorted set
      await redisClient.multi()
        .hIncrBy(recipeKey(recipeName), {
          views: 1
        })
        .expire(recipeKey(recipeName), CACHING_TTL.high)
        .zIncrBy(viewedRecipesKey(), 1, recipeName)
        .expire(viewedRecipesKey(), CACHING_TTL.high)
        .exec()
    }
  })
}
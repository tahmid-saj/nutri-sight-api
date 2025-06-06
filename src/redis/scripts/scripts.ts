import { redisClient } from "../../services/redis/redis.services.ts"

export const userLikesRecipe = `
  local recipeKey = KEYS[1]
  local userLikedRecipesKey = KEYS[2]
  local likedRecipesKey = KEYS[3]

  local recipeName = ARGV[1]

  local userLikedRecipe = redis.call('SISMEMBER', userLikedRecipesKey, recipeName)

  if userLikedRecipe == false then
    redis.call('HINCRBY', recipeKey, 'likes', 1)
    redis.call('SADD', userLikedRecipesKey, recipeName)
    redis.call('ZINCRBY', likedRecipesKey, 1, recipeName)
  end
`

export const userUnlikesRecipe = `
  local recipeKey = KEYS[1]
  local userLikedRecipesKey = KEYS[2]
  local likedRecipesKey = KEYS[3]

  local recipeName = ARGV[1]

  local userLikedRecipe = redis.call('SISMEMBER', userLikedRecipesKey, recipeName)

  if userLikedRecipe == true then
    redis.call('HINCRBY', recipeKey, 'likes', -1)
    redis.call('SADD', userLikedRecipesKey, recipeName)
    redis.call('ZINCRBY', likedRecipesKey, -1, recipeName)
  end
`

export const userRequestsRecipe = `
  local recipeKey = KEYS[1]
  local userRequestedRecipesKey = KEYS[2]
  local requestedRecipesKey = KEYS[3]

  local recipeName = ARGV[1]

  redis.call('HINCRBY', recipeKey, 'requests', 1)
  redis.call('SADD', userRequestedRecipesKey, recipeName)
  redis.call('ZINCRBY', requestedRecipesKey, 1, recipeName)
`

export const userViewsRecipe = `
  local recipeKey = KEYS[1]
  local viewedRecipesKey = KEYS[2]
  local usersKey = KEYS[3]

  local recipeName = ARGV[1]

  local inserted = redis.call('PFADD', recipeViewsKey, usersKey)

  if inserted then
    redis.call('HINCRBY', recipeKey, 'views', 1)
    redis.call('ZINCRBY', viewedRecipesKey, 1, recipeName)
  end
`

export const unlockScript = `
  if redis.call('GET', KEYS[1]) == ARGV[1] then
    return redis.call('DEL', KEYS[1])
  end
`
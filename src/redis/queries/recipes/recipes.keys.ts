import { User } from "../../../models/users/users.types.js"

// hash containing fields like recipe name, likes, requests, views, etc of recipe
export const recipeKey = (recipeId: string) => `recipe#${recipeId}`

// set containing recipeIds which user has liked
export const userLikedRecipesKey = (user: User) => `user:liked:recipes#${user.userId}:${user.email}`

// sorted set containing recipeIds which user has requested
export const userRequestedRecipesKey = (user: User) => `user:requested:recipes#${user.userId}:${user.email}`

// hyperloglog containing users who viewed recipe
export const recipeViewsKey = (recipeId: string) => `recipe:views#${recipeId}`

// sorted set containing recipe names which have been liked frequently
export const likedRecipesKey = () => `recipes:liked`

// sorted set containing recipe names which have been requested frequently
export const requestedRecipesKey = () => `recipes:requested`

// sorted set containing recipe names which have been viewed frequently
export const viewedRecipesKey = () => `recipes:viewed`
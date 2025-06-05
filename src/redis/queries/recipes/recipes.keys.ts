import { User } from "../../../models/users/users.types.ts"

// hash containing fields like likes, requests, views, etc of recipe
export const recipeKey = (recipeName: string) => `recipe#${recipeName}`

// set containing recipe names which user has liked
export const userLikedRecipesKey = (user: User) => `user:liked:recipes#${user.userId}:${user.email}`

// sorted set containing recipe names which user has requested
export const userRequestedRecipesKey = (user: User) => `user:requested:recipes#${user.userId}:${user.email}`

// hyperloglog containing users who viewed recipe
export const recipeViewsKey = (recipeName: string) => `recipe:views#${recipeName}`

// sorted set containing recipe names which have been liked frequently
export const likedRecipesKey = () => `recipes:liked`

// sorted set containing recipe names which have been requested frequently
export const requestedRecipesKey = () => `recipes:requested`

// sorted set containing recipe names which have been viewed frequently
export const viewedRecipesKey = () => `recipes:viewed`
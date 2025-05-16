import { errorOnDisplaySearchedRecipes } from "../../errors/recipes.errors.ts"
import { TIMEOUT_SEC } from "../../constants/recipes.constants.ts"
import dotenv from "dotenv"

dotenv.config()


// helpers functions
function timeout(seconds: number) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${seconds} seconds`));
    }, seconds * 1000);
  });
};

// requests
// multiple recipes
export async function getRecipes(recipe: string) {
  try {
    const fetchPromiseRecipes = fetch(`${process.env.REACT_APP_RECIPES_URL}${recipe}?${process.env.REACT_APP_RECIPES_API_KEY_NAME}${process.env.REACT_APP_RECIPES_API_KEY}`)
    const resRecipes: any = await Promise.race([fetchPromiseRecipes, timeout(TIMEOUT_SEC)]);
    const dataRecipes = await resRecipes.json();

    if (!resRecipes.ok) {
      throw new Error(`${dataRecipes.message} (${dataRecipes.status})`);
    }

    return {
      recipes: dataRecipes.data.recipes
    }
  } catch (error) {
    errorOnDisplaySearchedRecipes(recipe);
    console.log(error);
  }
}

// single recipe info
export async function getRecipe(recipe: any) {
  try {
    const fetchPromiseRecipe = fetch(`${process.env.REACT_APP_RECIPE_URL}${recipe.id}?${process.env.REACT_APP_RECIPES_API_KEY_NAME}${process.env.REACT_APP_RECIPES_API_KEY}`);
    const resRecipe: any = await Promise.race([fetchPromiseRecipe, timeout(TIMEOUT_SEC)]);
    const dataRecipe = await resRecipe.json();

    if (!resRecipe.ok) {
      throw new Error(`${dataRecipe.message} (${dataRecipe.status})`);
    }

    return {
      recipe: dataRecipe.data.recipe
    }
  } catch (error) {
    errorOnDisplaySearchedRecipes(recipe.title);
    console.log(error);
  }
}

// errors on recipes

const errorOnDisplaySearchedRecipes = (recipeNameSearched) => {
  console.log(`${recipeNameSearched} could not be found`);
};

module.exports = {
  errorOnDisplaySearchedRecipes
}
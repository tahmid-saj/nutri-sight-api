const resNutrition = async (food) => {
  try {
    const resActivityResults = await fetch(`https://api.api-ninjas.com/v1/nutrition?query=` + food.description, {
      method: "GET",
      headers: {
        "X-Api-Key": ``
      }
    })

    const res = await resActivityResults.json()
    return res
  } catch (error) {
    // errorOnGetSearchActivity()

    if (error) {
      return console.error("Request failed:", error)
    }
  }
}

resNutrition({
  description: "1 pound of steak with mashed potatoes and a can of sprite"
})

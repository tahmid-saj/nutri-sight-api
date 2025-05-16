export const resNutrition = async (food: any) => {
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
  food: "1 pound of steak with mashed potatoes and a can of sprite"
})

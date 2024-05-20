const res = async (trackedDayInfo) => {
  try {
    const resActivityResults = await fetch(``, {
      method: "GET",
      headers: {
        "X-Api-Key": ``
      }
    })

    const res = await resActivityResults.json()
    console.log(res)
    return res
  } catch (error) {
    if (error) {
      return console.error("Request failed: ", error)
    }
  }
}

res({
  activity: "running"
})
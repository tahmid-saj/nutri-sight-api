import OpenAI from "openai"

import dotenv from "dotenv"

dotenv.config()

export const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPEN_API_KEY
})

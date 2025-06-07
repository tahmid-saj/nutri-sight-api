import express, { Router } from "express"

import { httpGetChatBotResponse, httpGetChatBotResponseStream } from "./chatbot.controller.js"

const chatbotRouter: Router = express.Router()

// TODO: move to env variables
// chatbot responses
chatbotRouter.post("/response", httpGetChatBotResponse)

// chatbot stream
chatbotRouter.post("/stream", httpGetChatBotResponseStream)

export { chatbotRouter }
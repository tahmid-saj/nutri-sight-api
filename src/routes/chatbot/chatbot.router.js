const express = require("express")

const { httpGetChatBotResponse } = require("./chatbot.controller")

const chatbotRouter = express.Router()

// TODO: move to env variables
// chatbot responses
chatbotRouter.post("/response", httpGetChatBotResponse)

module.exports = {
  chatbotRouter
}
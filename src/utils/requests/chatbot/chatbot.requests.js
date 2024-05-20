const { errorOnGetChatBotResponse } = require("../../errors/chatbot.errors")
const { DEFAULT_CHATBOT_MAX_TOKENS } = require("../../constants/chatbot.constants")
const { openai } = require("../../../services/open-ai/open-ai.service")

async function getChatBotResponse(messageInput) {
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: process.env.REACT_APP_OPEN_API_ROLE, content: messageInput }],
      model: process.env.REACT_APP_OPEN_API_MODEL,
      max_tokens: DEFAULT_CHATBOT_MAX_TOKENS
    });

    return {
      message: response.choices[0].message.content
    }
  } catch (error) {
    console.log("Error getting chatbot response")
    errorOnGetChatBotResponse()
  }
}

module.exports = {
  getChatBotResponse
}
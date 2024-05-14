const { getChatBotResponse } = require("../../utils/requests/chatbot/chatbot.requests")

// chatbot response
async function httpGetChatBotResponse(req, res) {
  try {
    const messageInput = String(req.body)
    const resGetChatBotResponse = await getChatBotResponse(messageInput)

    if (resGetChatBotResponse) return res.status(200).json(resGetChatBotResponse)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

module.exports = {
  httpGetChatBotResponse
}
import { errorOnGetChatBotResponse } from "../../errors/chatbot.errors.ts"
import { DEFAULT_CHATBOT_MAX_TOKENS } from "../../constants/chatbot.constants.ts"
import { openai } from "../../../services/open-ai/open-ai.service.ts"

export async function getChatBotResponse(messageInput: string) {
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: messageInput }],
      model: process.env.REACT_APP_OPEN_API_MODEL!,
      max_tokens: DEFAULT_CHATBOT_MAX_TOKENS
    });

    return {
      message: response?.choices[0]?.message.content
    }
  } catch (error) {
    console.log("Error getting chatbot response")
    errorOnGetChatBotResponse()
  }
}

export async function getChatBotResponseStream(
  messageInput: string,
  onChunk: (chunk: string) => void
) {
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: messageInput }],
      model: process.env.REACT_APP_OPEN_API_MODEL!,
      max_tokens: DEFAULT_CHATBOT_MAX_TOKENS,
      stream: true
    })

    for await (const part of response) {
      const chunk = part?.choices?.[0]?.delta?.content

      if (chunk !== undefined) {
        onChunk(chunk!)
      }
    }
  } catch (error) {
    console.log("Error getting chatbot stream")
    errorOnGetChatBotResponse()
  }
}
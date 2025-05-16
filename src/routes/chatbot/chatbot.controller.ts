import { Request, Response } from 'express';

import { getChatBotResponse } from "../../utils/requests/chatbot/chatbot.requests"

// chatbot response
export async function httpGetChatBotResponse(req: Request, res: Response): Promise<void> {
  try {
    const messageInput = String(req.body)
    const resGetChatBotResponse = await getChatBotResponse(messageInput)

    if (resGetChatBotResponse) {
      res.status(200).json(resGetChatBotResponse)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}


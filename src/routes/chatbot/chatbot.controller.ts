import { Request, Response } from 'express';

import { getChatBotResponse, getChatBotResponseStream } from "../../utils/requests/chatbot/chatbot.requests.ts"
import { RANDOM_SEPARATOR } from '../../utils/constants/chatbot.constants.ts';

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

// chatbot response as a stream via SSE
export async function httpGetChatBotResponseStream(req: Request, res: Response) {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
  })
  res.flushHeaders()

  const messageInput = String(req.body)

  await getChatBotResponseStream(messageInput, (chunk: string) => {
    res.write(`data: ${chunk}${RANDOM_SEPARATOR}`)
  })

  res.write(`data: [DONE]${RANDOM_SEPARATOR}`)
  res.end()
}
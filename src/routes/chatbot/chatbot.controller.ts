import { Request, response, Response } from 'express';

import { getChatBotResponse, getChatBotResponseStream } from "../../utils/requests/chatbot/chatbot.requests.ts"
import { RANDOM_SEPARATOR } from '../../utils/constants/chatbot.constants.ts';
import { getChatbotSessionRequests, saveChatbotSessionRequest, sessionIdExists } from '../../redis/queries/chatbot/chatbot.queries.ts';

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
  
  // const response: string[] = []
  await getChatBotResponseStream(messageInput, (chunk: string) => {
    // response.push(chunk)
    res.write(`data: ${chunk}${RANDOM_SEPARATOR}`)
  })

  // const sessionId = await saveChatbotSessionRequest(messageInput, response.join(""))

  res.write(`data: [DONE]${RANDOM_SEPARATOR}`)
  res.end()
}

// get chatbot session (requests and responses)
export async function httpGetChatBotSession(req: Request, res: Response) {
  const sessionId = String(req.body)

  // if the session exists, then return the session's requests and responses
  const sessionExists = await sessionIdExists(sessionId)
  if (sessionExists) {
    const sessionData = await getChatbotSessionRequests(sessionId)
    if (sessionData) {
      res.status(200).json(sessionData)
    }
  }
}
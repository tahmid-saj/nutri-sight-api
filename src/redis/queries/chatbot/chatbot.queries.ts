import { redisClient } from "../../../services/redis/redis.service.js"
import { CACHING_TTL } from "../../../utils/constants/shared.constants.js"
import { chatbotSessionRequestKey, chatbotSessionResponseKey } from "./chatbot.keys.js"
import { v4 as uuidv4 } from "uuid"

export const serializeChatbotSessionRequest = (request: string) => {
  return String(request)
}

export const serializeChatbotSessionResponse = (response: string) => {
  return String(response)
}

export const deserializeChatbotSessionRequest = (requests: string[]) => {
  return requests.map(request => {
    return String(request)
  })
}

export const deserializeChatbotSessionResponse = (responses: string[]) => {
  return responses.map(response => {
    return String(response)
  })
}

export const sessionIdExists = async (sessionId: string) => {
  // verify if both the requests and responses of the sessionId exists
  const requestsExists = await redisClient.exists(chatbotSessionRequestKey(sessionId))
  const responsesExists = await redisClient.exists(chatbotSessionResponseKey(sessionId))

  if (requestsExists && responsesExists) {
    return true
  }

  return false
}

export const getChatbotSessionRequests = async (sessionId: string) => {
  // verify if both the requests and responses of the sessionId exists
  const sessionExists = await sessionIdExists(sessionId)
  if (sessionExists) {
    const requests = await redisClient.lRange(chatbotSessionRequestKey(sessionId), 0, -1)
    const responses = await redisClient.lRange(chatbotSessionResponseKey(sessionId), 0, -1)
    
    return {
      requests: deserializeChatbotSessionRequest(requests),
      responses: deserializeChatbotSessionResponse(responses)
    }
  }

  return null
}

export const saveChatbotSessionRequest = async (request: string, response: string) => {
  const sessionId = uuidv4()
  const requestKey = chatbotSessionRequestKey(sessionId)
  const responseKey = chatbotSessionResponseKey(sessionId)

  await Promise.all([
    // first insert the request
    redisClient.multi()
    .rPush(requestKey, serializeChatbotSessionRequest(request))
    .expire(requestKey, CACHING_TTL.medium)
    .exec(),

    // then insert the response
    redisClient.multi()
    .rPush(responseKey, serializeChatbotSessionResponse(response))
    .expire(responseKey, CACHING_TTL.medium)
    .exec(),
  ])

  return sessionId
}
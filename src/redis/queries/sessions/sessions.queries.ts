import { Session } from "../../../models/users/users.types.js"
import { redisClient } from "../../../services/redis/redis.services.js"
import { CACHING_TTL } from "../../../utils/constants/shared.constants.js"
import { sessionsKey } from "./sessions.keys.js"

// helper functions
const serialize = (session: Session) => {
  return {
    userId: session.userId,
    email: session.email
  }
}

const deserialize = (sessionId: string, session: { [key: string]: string }) => {
  return {
    sessionId,
    userId: session.userId,
    email: session.email
  }
}

export const getSession = async (sessionId: string) => {
  const session = await redisClient.hGetAll(sessionsKey(sessionId))

  if (Object.keys(session).length === 0) {
    return null
  }

  return deserialize(sessionId, session)
}

export const saveSession = async (session: Session) => {
  return redisClient.multi()
    .hSet(sessionsKey(session.sessionId), serialize(session))
    .expire(sessionsKey(session.sessionId), CACHING_TTL.high)
    .exec()
}
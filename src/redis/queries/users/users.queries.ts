import { User } from "../../../models/users/users.types.js";
import { redisClient } from "../../../services/redis/redis.service.js";
import { CACHING_TTL } from "../../../utils/constants/shared.constants.js";
import { usersKey, usersUniqueKey } from "./users.keys.js";

// helper functions
const serialize = (user: User) => {
  return {
    userId: user.userId,
    email: user.email
  }
}

const deserialize = (userId: string, user: { [key: string]: string }) => {
  return {
    userId: userId,
    email: user.email
  }
}

export const getUser = async (user: User) => {
  const resUser = await redisClient.hGetAll(usersKey(user))

  return deserialize(resUser.userId!, resUser)
}

export const createUser = async (user: User) => {
  const userKey = usersKey(user)

  const exists = await redisClient.sIsMember(usersUniqueKey(), userKey)
  if (exists) return

  await Promise.all([
    redisClient.multi()
      .hSet(userKey, serialize(user))
      .expire(userKey, CACHING_TTL.high)
      .exec(),

    redisClient.sAdd(usersUniqueKey(), userKey)
  ])
}
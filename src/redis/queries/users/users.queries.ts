import { User } from "../../../models/users/users.types.ts";
import { redisClient } from "../../../services/redis/redis.services.ts";
import { CACHING_TTL } from "../../../utils/constants/shared.constants.ts";
import { usersKey, usersUniqueKey } from "./users.keys.ts";

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
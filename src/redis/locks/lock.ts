import { randomBytes } from "crypto"
import { redisClient } from "../../services/redis/redis.services.ts"
import { locksKey } from "./lock.keys.ts"

export const withLock = async (key: string, cb: (signal: any) => any) => {
  // initialize the retry behavior
  const retryDelayMs = 100
  let retries = 20

  // generate random value to store at the lock key
  const token = randomBytes(6).toString("hex")

  // implementing the retry behavior
  while (retries >= 0) {
    retries--

    // setting the lock value / acquiring the lock
    const acquired = await redisClient.set(locksKey(key), token, {
      NX: true,
      PX: 2000
    })

    if (!acquired) {
      // if the lock was not acquired, we'll have a brief pause (retryDelayMs), then we'll retry again
      await pause(retryDelayMs)
      continue
    }

    // if the set is successful, then run the callback provided
    try {
      const signal = { expired: false }
      setTimeout(() => {
        signal.expired = true
      }, 2000)

      const result = await cb(signal)
      return result
    } finally {
      // after the callback is run, we'll unset the locked key
      await unlock(locksKey(key), token)
    }
  }
}

const pause = async (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

export const unlock = async (key: string, token: string) => {
  const resToken = await redisClient.get(key)

  if (resToken === token) {
    await redisClient.del(key)
  }
}
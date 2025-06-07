import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { createClient } = require("redis")

export const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT!)
  },
  password: process.env.REDIS_PW
})

redisClient.on("connect", async () => {
  console.log("Connected to redis instance")
})

redisClient.on("error", (err: any) => {
  console.log(err)
})

export async function redisConnect() {
  await redisClient.connect()
}
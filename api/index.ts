import dotenv from 'dotenv';
dotenv.config();

import { app } from "../src/app.js";
import { mongoConnect } from "../src/services/mongodb/mongodb.service.js";
import { redisConnect } from '../src/services/redis/redis.service.js';

import serverless from 'serverless-http';

let isConnected = false;

async function bootstrap() {
  if (!isConnected) {
    await mongoConnect();
    await redisConnect();
    isConnected = true;
  }
}

const handler = async (req: any, res: any) => {
  await bootstrap();
  return serverless(app)(req, res);
};

export default handler;

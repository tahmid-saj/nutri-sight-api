import dotenv from 'dotenv';
dotenv.config();

import { app } from "../src/app.js";
import { mongoConnect } from "../src/services/mongodb/mongodb.service.js";
import { redisConnect } from '../src/services/redis/redis.service.js';
import serverless from 'serverless-http';

let isConnected = false;
const handler = serverless(app);

async function bootstrap() {
  if (!isConnected) {
    await mongoConnect();
    await redisConnect();
    isConnected = true;
  }
}

export default async function (req: any, res: any) {
  await bootstrap();
  return handler(req, res);
}

export const config = {
  runtime: 'nodejs',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
};

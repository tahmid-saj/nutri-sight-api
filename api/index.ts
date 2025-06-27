import dotenv from 'dotenv';
dotenv.config();

import { app } from "../src/app";
import { mongoConnect } from "../src/services/mongodb/mongodb.service";
import { redisConnect } from '../src/services/redis/redis.service';
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
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.nutritiontracker.io');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.status(204).end();
    return;
  }

  await bootstrap();
  return handler(req, res);
}

export const config = {
  runtime: 'nodejs',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
};

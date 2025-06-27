import dotenv from 'dotenv';
dotenv.config();

import { app } from "../src/app.js";
import { mongoConnect } from "../src/services/mongodb/mongodb.service.js";
import { redisConnect } from '../src/services/redis/redis.service.js';
import serverless from 'serverless-http';

let isConnected = false;
const handler = serverless(app); // wrap ONCE

async function bootstrap() {
  if (!isConnected) {
    await mongoConnect();
    await redisConnect();
    isConnected = true;
  }
}

export default async function (req: any, res: any) {
  await bootstrap();

  // Add CORS headers here
  res.setHeader('Access-Control-Allow-Origin', 'https://www.nutritiontracker.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return handler(req, res);
}

// This enables Vercel CORS preflight support
export const config = {
  runtime: 'nodejs',
  // Optional — Vercel will handle OPTIONS method automatically
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
};

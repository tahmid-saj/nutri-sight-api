import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import { mongoConnect } from "../src/services/mongodb/mongodb.service.js";
import { app } from "../src/app.js"
import { redisConnect } from '../src/services/redis/redis.service.js';

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;  // Provide a default port if PORT is undefined

async function startServer(): Promise<void> {
  console.log("App is starting...");

  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
  });

  process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
  });

  try {
    await mongoConnect();
    await redisConnect();

    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Fatal startup error: ", err);
    process.exit(1); // Optionally fail fast
  }
};

startServer();

export default app
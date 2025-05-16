import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import { mongoConnect } from "../src/services/mongodb/mongodb.service.js";
import { app } from "../src/app.js"

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;  // Provide a default port if PORT is undefined

async function startServer(): Promise<void> {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();

export default app
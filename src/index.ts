import path from "path";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { mongoConnect } from "./services/mongodb/mongodb.service.js";
import { redisConnect } from "./services/redis/redis.service.js";
import { app } from "./app.js";

import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";

import { resolvers as caloriesBurnedResolvers } from "./graphql/calories-burned/calories-burned.resolvers.js";

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

async function startServer() {
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

    const typesArray = loadFilesSync(path.join(path.resolve(), "**/*.graphql"));

    const schema = makeExecutableSchema({
      typeDefs: typesArray,
      resolvers: [caloriesBurnedResolvers],
    });

    const apolloServer = new ApolloServer({ schema });

    await apolloServer.start();

    apolloServer.applyMiddleware({
      app,
      path: "/graphql",
    });

    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Fatal startup error: ", err);
    process.exit(1); // Optionally fail fast
  }
}

startServer();

import path from "path";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { mongoConnect } from "./services/mongodb/mongodb.service.ts";
import { redisConnect } from "./services/redis/redis.services.ts";
import { app } from "./app.js";

import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";

// ✅ Import resolvers directly
import { resolvers as caloriesBurnedResolvers } from "./graphql/calories-burned/calories-burned.resolvers.ts";

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

async function startServer() {
  await mongoConnect();
  await redisConnect()

  // ✅ TypeDefs can still be loaded from .graphql files
  const typesArray = loadFilesSync(path.join(path.resolve(), "**/*.graphql"));

  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: [caloriesBurnedResolvers], // ✅ Use array of imported resolvers
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
}

startServer();

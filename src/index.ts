import path from "path";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { mongoConnect } from "./services/mongodb/mongodb.service.js";
import { app } from "./app.js";

import { buildSchema } from "graphql";
import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

async function startServer() {
  await mongoConnect();

  const typesArray = loadFilesSync("**/*", {
    extensions: ["graphql"]
  })

  const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"))

  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray
  })

  const apolloServer = new ApolloServer({
    schema: schema
  })

  await apolloServer.start()
  apolloServer.applyMiddleware({
    app,
    path: "/graphql"
  })

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();
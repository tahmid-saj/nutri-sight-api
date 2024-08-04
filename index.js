const path = require("path")
const http = require('http');
const mongoose = require('mongoose');
require("dotenv").config();
const { mongoConnect } = require("./src/services/mongodb/mongodb.service");
const { app } = require("./src/app");
const server = http.createServer(app);

const { buildSchema } = require("graphql")
const { loadFilesSync } = require("@graphql-tools/load-files")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const { ApolloServer } = require("apollo-server-express")

const PORT = process.env.PORT;

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

module.exports = app
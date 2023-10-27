const http = require('http');
const mongoose = require('mongoose');
require("dotenv").config();

const { mongoConnect } = require("./services/mongodb/mongodb.service");

const { app } = require("./app");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();
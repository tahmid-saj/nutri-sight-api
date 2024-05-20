const http = require('http');
const mongoose = require('mongoose');
require("dotenv").config();
const { mongoConnect } = require("./src/services/mongodb/mongodb.service");
const { app } = require("./src/app");
const server = http.createServer(app);

const PORT = process.env.PORT;

async function startServer() {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();

module.exports = app
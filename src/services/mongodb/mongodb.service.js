const mongoose = require("mongoose");
require('dotenv').config();

const MONGO_URL = process.env.MONGODB_URL_1 + process.env.MONGODB_PASSWORD + process.env.MONGODB_URL_2

mongoose.connection.once("open", () => {
  console.log("MongoDB connection open")
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

async function mongoDisconnect() {
  await mongoose.disconnect();
};

module.exports = {
  mongoConnect,
  mongoDisconnect,
}

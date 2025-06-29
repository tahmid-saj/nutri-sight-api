import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

const MONGO_URL = process.env.MONGODB_URL_1! + process.env.MONGODB_PASSWORD! + process.env.MONGODB_URL_2!

mongoose.connection.once("open", () => {
  console.log("MongoDB connection open")
});

mongoose.connection.on("error", (err: Error) => {
  console.log(err);
});

export async function mongoConnect() {
  await mongoose.connect(MONGO_URL, 
  // {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // }
  );
};

export async function mongoDisconnect() {
  await mongoose.disconnect();
};

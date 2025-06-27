import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import { api } from "./routes/api.routes.js";

const app = express();

// CORS middleware
app.use(cors({
  origin: "https://www.nutritiontracker.io",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.nutritiontracker.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.options("*", cors()); // For preflight

app.use(morgan("combined"));
app.use(helmet());
app.use(express.json());
app.use(bodyParser.text());
app.use("/v1", api);

export { app };

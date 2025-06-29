import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import { api } from "./routes/api.routes.js";

const app = express();

// middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // only if you need cookies/auth headers
}));

app.options("*", cors());

app.use(morgan("combined"));
app.use(helmet());
app.use(express.json());
app.use(bodyParser.text());

app.use("/v1", api);

export { app };

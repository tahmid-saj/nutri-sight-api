import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import { api } from "./routes/api.routes.js";

const app = express();

// CORS middleware (early)
app.use(cors({
  origin: "https://www.nutritiontracker.io",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Handle preflight before any other route
app.options("*", cors());

app.use(morgan("combined"));
app.use(helmet());
app.use(express.json());
app.use(bodyParser.text());

// All API routes
app.use("/v1", api);

// Global error handler (add headers again)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Global error handler caught:", err);
  res.setHeader('Access-Control-Allow-Origin', 'https://www.nutritiontracker.io');
  res.status(500).json({ error: "Internal Server Error" });
});

export { app };

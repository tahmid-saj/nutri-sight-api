import express, { Request, Response } from "express";
import cors from "cors";
import serverless from "serverless-http";

const app = express();

app.use(cors({
  origin: "https://www.nutritiontracker.io",
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options("*", cors());

// Correct usage of app.all with a route path and handler function
app.all("*", (req: Request, res: Response) => {
  res.json({ message: "CORS test passed ✅" });
});

export default serverless(app);

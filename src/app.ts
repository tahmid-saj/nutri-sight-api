import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import { api } from "./routes/api.routes.ts";

const app = express() as any

// middleware
// TODO: move to env
app.use(cors());
app.use(morgan("combined"));
app.use(helmet())
app.use(express.json());
app.use(bodyParser.text());
app.use("/v1", api);

export { app }

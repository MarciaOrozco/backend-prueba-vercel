import express, { json, Request, Response } from "express";
import cors from "cors";
import router from "./routes/index";
import connectDB from "./database";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

connectDB();

app.use(cors());
app.use(json());
app.use(router);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Backend funcionando correctamente 🚀");
});

app.use((_req: Request, res: Response) => {
  res.status(404).send("Route not found");
});

app.listen(port);

module.exports = app;

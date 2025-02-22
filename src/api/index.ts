import express, { json, Request, Response } from "express";
import cors from "cors";
import router from "../routes/index";
import connectDB from "../database";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

connectDB();

app.use(cors());
app.use(json());

// 🔹 Aquí modificamos el router para asegurarnos de que Express responda en /api/
app.use("/api", router);

// 🔹 Ruta de prueba en /api/ para ver si el backend está vivo
app.get("/api", (_req: Request, res: Response) => {
  res.status(200).send("🚀 Backend funcionando en /api/");
});

// 🔹 Ruta 404 en caso de que algo no se encuentre
app.use((_req: Request, res: Response) => {
  res.status(404).send("Route not found");
});

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});

// 🔹 Esto es clave para que Vercel reconozca la API
module.exports = app;

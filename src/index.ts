import express, { json, Request, Response } from "express";
import cors from "cors";
import router from "./routes/index";
import connectDB from "./database";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

connectDB()
  .then(() => console.log("✅ Conectado a la base de datos"))
  .catch((err) =>
    console.error("❌ Error al conectar a la base de datos", err)
  );

app.use(cors());
app.use(json());
app.use("/", router);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("🚀 Backend funcionando en /api/");
});

app.use((_req: Request, res: Response) => {
  res.status(404).send("Route not found");
});

try {
  app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  });
} catch (error) {
  console.error("❌ Error al iniciar el servidor:", error);
}
module.exports = app;

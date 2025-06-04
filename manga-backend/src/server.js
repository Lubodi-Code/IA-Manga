import express from "express";
import dotenv from "dotenv";
import imageRoutes from "./routes/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON (en caso de otros endpoints)
app.use(express.json());

// Montar rutas
app.use("/", imageRoutes);

app.listen(port, () => {
  console.log(`🖥️  Servidor listo en http://localhost:${port}`);
});
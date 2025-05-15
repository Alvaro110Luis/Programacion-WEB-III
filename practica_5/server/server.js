import express from "express";
import cors from "cors";
import rutas from "./routes/routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/medicamento", rutas);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`corriendo en el puerto http://localhost:${PORT}`);
});

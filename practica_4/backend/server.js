import express from "express";
import rutas from "./routes/routes.js";
import cors from "cors";
import { PORT } from "./env/enviroment.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: `http://localhost:3000` }));
app.use("/api", rutas);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

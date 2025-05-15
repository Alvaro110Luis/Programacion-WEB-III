import express from "express";
import {
  ActualizarMedicamento,
  AgregarMedicamentos,
  EliminarMedicamento,
  ObtenerMedicamentos,
} from "../controller/FarmaciaController.js";

const rutas = express.Router();

rutas.get("/", ObtenerMedicamentos);
rutas.post("/", AgregarMedicamentos);
rutas.put("/:id_medicamento", ActualizarMedicamento);
rutas.delete("/:id_medicamento", EliminarMedicamento);

export default rutas;

import { Router } from "express";
import {
  obtenerAutores,
  crearAutor,
  ActualizarNuevoAutor,
  EliminarAutores,
  obtenerLibros,
} from "../controller/ProductController.js";
const router = Router();
//autores
router.get("/autores", obtenerAutores);
router.post(`/autores`, crearAutor);
router.put(`/autores/:id_autor`, ActualizarNuevoAutor);
router.delete(`/autores/:id_autor`, EliminarAutores);
//libros
router.get("/libros", obtenerLibros);
export default router;

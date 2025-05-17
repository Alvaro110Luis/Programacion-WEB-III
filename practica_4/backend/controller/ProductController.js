import * as Producto from "../model/ProductModel.js";
//autores
export const obtenerAutores = async (req, res) => {
  try {
    const autores = await Producto.obtenerTodosAutores();
    res.status(200).json(autores);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al oben er autores", error: error.message });
  }
};

export const crearAutor = async (req, res) => {
  try {
    const { nombre, nacionalidad, fecha_nacimiento, biografia } = req.body;
    const newAutor = await Producto.crearNuevoAutor(
      nombre,
      nacionalidad,
      fecha_nacimiento,
      biografia
    );
    res.status(201).json({ id: newAutor, message: "Autor creado" });
  } catch (error) {
    res.status(500).json({ message: "Error al cargar el Autor controller" });
  }
};

export const ActualizarNuevoAutor = async (req, res) => {
  try {
    const { id_autor } = req.params;
    const buscar = await Producto.buscarAutor(id_autor);
    if (!buscar)
      return res.status(404).json({ message: "producto no encontrado" });
    await Producto.ActualizarAutor(
      id_autor,
      req.body.nombre,
      req.body.nacionalidad,
      req.body.fecha_nacimiento,
      req.body.biografia
    );
    res.status(200).json({ message: "autor actualizado" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "error al actualizar autor", error: error.message });
  }
};

export const EliminarAutores = async (req, res) => {
  try {
    const { id_autor } = req.params;
    const buscar = await Producto.buscarAutor(id_autor);
    if (!buscar) return res.status(404).json({ message: "producto eliminado" });
    await Producto.EliminarAutor(id_autor);
    res.status(200).json({ message: "producto eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error al eliminar producto" });
  }
};

//libros
export const obtenerLibros = async (req, res) => {
  try {
    const libros = await Producto.obtenerTodosLibros();
    res.status(200).json(libros);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener libros", error: error.message });
  }
};
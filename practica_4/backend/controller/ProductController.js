import * as Producto from "../model/ProductModel.js";
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.obtenerTodosProductos();
    res.status(200).json(productos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obener productos", error: error.message });
  }
};
export const crearProducto = async (req, res) => {
  try {
    const { nombre } = req.body;
    const newProducto = await Producto.crearNuevoProducto(nombre);
    res.status(201).json({ id: newProducto, message: "Producto creado" });
  } catch (error) {
    res.status(500).json({ message: "Error al cargar el producto" });
  }
};

export const ActualizarNuevoProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const buscar = await Producto.buscarProducto(id);
    if (!buscar)
      return res.status(404).json({ message: "producto no encontrado" });
    await Producto.ActualizarProducto(id, req.body.nombre);
    res.status(200).json({ message: "producto actualizado" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "error al actualizar producto", error: error.message });
  }
};

export const EliminarProductos = async (req, res) => {
  try {
    const { id } = req.params;
    const buscar = await Producto.buscarProducto(id);
    if (!buscar) return res.status(404).json({ message: "producto eliminado" });
    await Producto.EliminarProducto(id);
    res.status(200).json({ message: "producto eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error al eliminar producto" });
  }
};

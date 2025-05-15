import * as FarmaciaModel from "../models/FarmaciaModel.js";

export const ObtenerMedicamentos = async (req, res) => {
  try {
    const medicamento = await FarmaciaModel.obtenerMedicamentos();
    res.json(medicamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const AgregarMedicamentos = async (req, res) => {
  try {
    const { nombre, precio, stock } = req.body;
    const medicamento = await FarmaciaModel.agregarMedicamentos(
      nombre,
      precio,
      stock
    );
    res.status(200).json(medicamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const ActualizarMedicamento = async (req, res) => {
  try {
    const { id_medicamento } = req.params;
    const { nombre, precio, stock } = req.body;
    const medicamento = await FarmaciaModel.actualizarMedicamento(
      id_medicamento,
      nombre,
      precio,
      stock
    );
    res.status(200).json(medicamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const EliminarMedicamento = async (req, res) => {
  try {
    const { id_medicamento } = req.params;
    const medicamento = await FarmaciaModel.eliminarMedicamento(id_medicamento);
    res.status(200).json(medicamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import pool from "../config/db.js";

export const obtenerMedicamentos = async () => {
  const [medicamento] = await pool.query("SELECT * FROM medicamento");
  return medicamento;
};

export const agregarMedicamentos = async (nombre, precio, stock) => {
  const [medicamento] = await pool.query(
    "INSERT INTO medicamento(nombre,precio,stock) VALUE(?,?,?)",
    [nombre, precio, stock]
  );
  return { id: medicamento.insertId, nombre, precio, stock };
};

export const actualizarMedicamento = async (
  id_medicamento,
  nombre,
  precio,
  stock
) => {
  await pool.query(
    "UPDATE medicamento SET nombre=?, precio=?, stock=? WHERE id_medicamento=?",
    [nombre, precio, stock, id_medicamento]
  );
  return { message: "actualizado correctamente" };
};

export const eliminarMedicamento = async (id_medicamento) => {
  await pool.query("DELETE FROM medicamento WHERE id_medicamento=?", [id_medicamento]);
  return { message: "eliminado con exito" };
};

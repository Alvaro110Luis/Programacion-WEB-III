import pool from "../config/db.js";

//autores
export const obtenerTodosAutores = async () => {
  const [array] = await pool.query("SELECT * FROM autor");
  return array;
};

export const crearNuevoAutor = async (
  nombre,
  nacionalidad,
  fecha_nacimiento,
  biografia
) => {
  const resultado = await pool.query(
    "INSERT INTO autor(nombre,nacionalidad,fecha_nacimiento,biografia) VALUES(?,?,?,?)",
    [nombre, nacionalidad, fecha_nacimiento, biografia]
  );
  return resultado.insertId;
};

export const ActualizarAutor = async (
  id_autor,
  nombre,
  nacionalidad,
  fecha_nacimiento,
  biografia
) => {
  await pool.query(
    "UPDATE autor SET nombre=?, nacionalidad=?, fecha_nacimiento=?, biografia=? WHERE id_autor=?",
    [nombre, nacionalidad, fecha_nacimiento, biografia, id_autor]
  );
};
export const buscarAutor = async (id) => {
  const [array] = await pool.query("SELECT * FROM autor WHERE id_autor=?", [id]);
  return array[0];
};

export const EliminarAutor = async (id) => {
  await pool.query("DELETE FROM autor WHERE id_autor=?", [id]);
};

//libros
export const obtenerTodosLibros = async()=>{
  const [array]=await pool.query("SELECT * FROM libro")
  return array
}
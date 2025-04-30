import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useEffect, useState } from "react";
/* libreria de boostrap */
import Table from "react-bootstrap/Table";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

/* libreria del swetalert */
import Swal from "sweetalert2";

/* libreria de iconos */
import { PiBooks } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

function App() {
  /* hooks para consultas */
  /* autores */
  const [autores, setAutores] = useState([]);

  const [formularioAgregarAutor, setFormularioAgregarAutor] = useState({
    nombre: "",
    nacionalidad: "",
    fecha_nacimiento: "",
    biografia: "",
  });

  const [formularioEditarAutor, setFormularioEditarAutor] = useState({
    nombre: "",
    nacionalidad: "",
    fecha_nacimiento: "",
    biografia: "",
  });
  const [autorId, setAutorId] = useState(null);

  /* libros */
  const [libros, setLibros] = useState([]);

  /* hooks para los modales */
  const [modalAgregarAutores, setModalAgregarAutores] = useState(false);
  const cerrarModalAgregarAutores = () => setModalAgregarAutores(false);
  const abrirModalAgregarAutores = () => setModalAgregarAutores(true);

  const [modalEditarAutores, setModalEditarAutores] = useState(false);
  const cerrarModalEditarAutores = () => setModalEditarAutores(false);
  const abrirModalEditarAutores = () => setModalEditarAutores(true);

  const [modalVerLibros, setModalVerLibros] = useState(false);
  const cerrarModalVerLibros = () => setModalVerLibros(false);
  const abrirModalVerLibros = (id_autor) => {
    setAutorId(id_autor);
    setModalVerLibros(true);
  };

  /* consulta y actualizacion de datos */
  const fetchProductos = useCallback(async () => {
    try {
      const respuestaAut = await fetch("http://localhost:3001/api/autores");
      const dataAutores = await respuestaAut.json();
      setAutores(dataAutores);
      const respuestaLib = await fetch("http://localhost:3001/api/libros");
      const dataLibros = await respuestaLib.json();
      setLibros(dataLibros);
    } catch (error) {
      alert("ERROR: " + error);
    }
  }, []);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  const AgregarAutor = async (e) => {
    e.preventDefault();
    if (!formularioAgregarAutor.nombre.trim()) {
      alert("nombre requerido");
      return;
    }
    try {
      const respuesta = await fetch("http://localhost:3001/api/autores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formularioAgregarAutor }),
      });
      if (!respuesta.ok) {
        let errorMensaje = "error al cargar";
        try {
          const error = await respuesta.json();
          errorMensaje = error.message || errorMensaje;
        } catch (error) {
          console.log(errorMensaje);
        }
        throw new Error(errorMensaje);
      }
      cerrarModalAgregarAutores();
      Swal.fire({
        title: "autor agregado",
        icon: "success",
        draggable: true,
        timer: 2000,
      });
      fetchProductos();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "no se pudo agregar el autor",
        icon: "error",
        draggable: true,
        timer: 2000,
      });
    }
  };
  const cambiosFormularioAgregarAutor = async (e) => {
    setFormularioAgregarAutor({
      ...formularioAgregarAutor,
      [e.target.name]: e.target.value,
    });
  };

  const EditarAutores = (autor) => {
    setFormularioEditarAutor({
      nombre: autor.nombre,
      nacionalidad: autor.nacionalidad,
      fecha_nacimiento: autor.fecha_nacimiento,
      biografia: autor.biografia,
    });
    setAutorId(autor.id_autor);
    abrirModalEditarAutores();
  };
  const cambiosFormularioEditar = (e) => {
    setFormularioEditarAutor({
      ...formularioEditarAutor,
      [e.target.name]: e.target.value,
    });
  };
  const EditarAutor = async (e) => {
    e.preventDefault();
    if (!formularioEditarAutor.nombre.trim()) {
      alert("nombre requerido");
      return;
    }
    try {
      const respuesta = await fetch(
        `http://localhost:3001/api/autores/${autorId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formularioEditarAutor }),
        }
      );
      if (!respuesta.ok) {
        let errorMensaje = "error al cargar";
        try {
          const error = await respuesta.json();
          errorMensaje = error.message || errorMensaje;
        } catch (error) {
          console.log(errorMensaje);
        }
        throw new Error(errorMensaje);
      }
      cerrarModalEditarAutores();
      Swal.fire({
        title: "autor editado",
        icon: "success",
        draggable: true,
        timer: 2000,
      });
      fetchProductos();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "no se pudo editar el autor",
        icon: "error",
        draggable: true,
        timer: 2000,
      });
    }
  };

  const EliminarAutor = async (id_autor) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "SI, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`http://localhost:3001/api/autores/${id_autor}`, {
            method: "DELETE",
          });
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            timer: 2000,
          });
          fetchProductos();
        } catch (error) {
          Swal.fire({
            title: "no se puedo eliminar el producto!",
            text: "Your file has been deleted.",
            icon: "error",
            timer: 2000,
          });
        }
      }
    });
  };
  return (
    <div className="contenedor">
      <Button variant="primary" onClick={abrirModalAgregarAutores}>
        Crear
      </Button>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>id</th>
            <th>nombre</th>
            <th>nacionalidad</th>
            <th>fecha de nacimiento</th>
            <th>biografia</th>
            <th>opciones</th>
          </tr>
        </thead>
        <tbody>
          {autores.map((autor) => {
            return (
              <tr key={autor.id_autor}>
                <td>{autor.id_autor}</td>
                <td>{autor.nombre}</td>
                <td>{autor.nacionalidad}</td>
                <td>{autor.fecha_nacimiento.split("T")[0]}</td>
                <td>{autor.biografia}</td>

                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => {
                        abrirModalVerLibros(autor.id_autor);
                      }}
                    >
                      <PiBooks />
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        EditarAutores(autor);
                      }}
                    >
                      <CiEdit />
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        EliminarAutor(autor.id_autor);
                      }}
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* modla para agregar nuevo autor */}
      <Modal show={modalAgregarAutores} onHide={cerrarModalAgregarAutores}>
        <Modal.Header closeButton>
          <Modal.Title>Crear nuevo Autor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="ingrese el nombre"
                name="nombre"
                onChange={cambiosFormularioAgregarAutor}
                value={formularioAgregarAutor.nombre}
              />
              <Form.Label>nacionalidad</Form.Label>
              <Form.Control
                type="text"
                placeholder="ingrese la nacionalidad"
                name="nacionalidad"
                onChange={cambiosFormularioAgregarAutor}
                value={formularioAgregarAutor.nacionalidad}
              />
              <Form.Label>fecha de nacimiento</Form.Label>
              <Form.Control
                type="date"
                placeholder="ingrese la fecha de nacimiento"
                name="fecha_nacimiento"
                onChange={cambiosFormularioAgregarAutor}
                value={formularioAgregarAutor.fecha_nacimiento.split("T")[0]}
              />
              <Form.Label>biografia</Form.Label>
              <Form.Control
                type="text"
                placeholder="ingrese la biografia"
                name="biografia"
                onChange={cambiosFormularioAgregarAutor}
                value={formularioAgregarAutor.biografia}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModalAgregarAutores}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={AgregarAutor}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modla para editar producto */}
      <Modal show={modalEditarAutores} onHide={cerrarModalEditarAutores}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Autor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="ingrese el nombre"
                name="nombre"
                onChange={cambiosFormularioEditar}
                value={formularioEditarAutor.nombre}
              />
              <Form.Label>nacionalidad</Form.Label>
              <Form.Control
                type="text"
                placeholder="ingrese la nacionalidad"
                name="nacionalidad"
                onChange={cambiosFormularioEditar}
                value={formularioEditarAutor.nacionalidad}
              />
              <Form.Label>fecha de nacimiento</Form.Label>
              <Form.Control
                type="date"
                placeholder="ingrese la fecha de nacimiento"
                name="fecha_nacimiento"
                onChange={cambiosFormularioEditar}
                value={formularioEditarAutor.fecha_nacimiento.split("T")[0]}
              />
              <Form.Label>biografia</Form.Label>
              <Form.Control
                type="text"
                placeholder="ingrese la biografia"
                name="biografia"
                onChange={cambiosFormularioEditar}
                value={formularioEditarAutor.biografia}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModalEditarAutores}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={EditarAutor}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal para ver los libros */}
      <Modal show={modalVerLibros} onHide={cerrarModalVerLibros}>
        <Modal.Header closeButton>
          <Modal.Title>Libros del autor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {libros.map((libro) => {
              if (libro.id_autor === autorId) {
                return (
                  <li key={libro.id_libro}>
                    {libro.titulo} ({libro.año_publicacion}) - {libro.genero} :{" "}
                    {libro.resumen}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModalVerLibros}>
            Cerrar
          </Button>
          <Button variant="primary">Guardar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;

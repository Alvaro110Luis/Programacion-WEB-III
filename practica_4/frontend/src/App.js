import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import Swal from "sweetalert2";

import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [productos, setProductos] = useState([]);
  const [formularioAgregar, setAgregarProducto] = useState({
    nombre: "",
  });

  const [formularioEditar, setEditarProducto] = useState({
    nombre: "",
  });
  const [productoId, setProductoId] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [mostrar, setMostrar] = useState(false);
  const cerrarModal = () => setMostrar(false);
  const abrirModal = () => setMostrar(true);

  const fetchProductos = useCallback(async () => {
    try {
      const respuesta = await fetch("http://localhost:3001/api/productos");
      const data = await respuesta.json();
      setProductos(data);
    } catch (error) {
      alert("ERROR: " + error);
    }
  }, []);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  const Agregar = async (e) => {
    e.preventDefault();
    if (!formularioAgregar.nombre.trim()) {
      alert("nombre requerido");
      return;
    }
    try {
      const respuesta = await fetch("http://localhost:3001/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formularioAgregar }),
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
      handleClose();
      Swal.fire({
        title: "producto agregado",
        icon: "success",
        draggable: true,
        timer: 2000,
      });
      fetchProductos();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "no se pudo agregar el producto",
        icon: "error",
        draggable: true,
        timer: 2000,
      });
    }
  };
  const cambiosFormularioAgregar = async (e) => {
    setAgregarProducto({
      ...formularioAgregar,
      [e.target.name]: e.target.value,
    });
  };

  const EditarProductos = (producto) => {
    setEditarProducto({ nombre: producto.nombre });
    setProductoId(producto.id);
    abrirModal();
  };
  const cambiosFormularioEditar = (e) => {
    setEditarProducto({
      ...formularioEditar,
      [e.target.name]: e.target.value,
    });
  };
  const EditarProducto = async (e) => {
    e.preventDefault();
    if (!formularioEditar.nombre.trim()) {
      alert("nombre requerido");
      return;
    }
    try {
      const respuesta = await fetch(
        `http://localhost:3001/api/productos/${productoId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formularioEditar }),
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
      cerrarModal();
      Swal.fire({
        title: "producto editado",
        icon: "success",
        draggable: true,
        timer: 2000,
      });
      fetchProductos();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "no se pudo editar el producto",
        icon: "error",
        draggable: true,
        timer: 2000,
      });
    }
  };

  const EliminarProducto = async (id) => {
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
          await fetch(`http://localhost:3001/api/productos/${id}`, {
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
      <Button variant="primary" onClick={handleShow}>
        Crear
      </Button>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>id</th>
            <th>nombre</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => {
            return (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      className="btn btn-secondary"
                      variant="warning"
                      onClick={() => {
                        EditarProductos(producto);
                      }}
                    >
                      <CiEdit />
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        EliminarProducto(producto.id);
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
      {/* modla para agregar nuevo producto */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear nuevo Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="ingrese el nombre"
                name="nombre"
                onChange={cambiosFormularioAgregar}
                value={formularioAgregar.nombre}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={Agregar}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modla para editar producto */}
      <Modal show={mostrar} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Registro</Modal.Title>
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
                value={formularioEditar.nombre}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={EditarProducto}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;

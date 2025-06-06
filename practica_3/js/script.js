document.getElementById("formulario").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  try {
    const respuesta = await fetch("/guardar", {
      method: "POST",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: `nombre=${encodeURIComponent(nombre)}`,
    });
    if (respuesta.ok) {
      Swal.fire({
        title: "guardado correctamente",
        icon: "success",
        draggable: true,
        timer: 3000,
      });
    } else {
      console.log("error del servidor");
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "ERROR",
      timer: 3000,
    });
  }
});

async function elimnarUsuario(id) {
  try {
    const response = await fetch(`/elim/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function actualizarUser(id, nombre) {
  try {
    const response = await fetch(`/actualizar/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: `nom=${encodeURIComponent(nombre)} `,
    });
    const data = await response.json();
    console.log(data);
    console.log(nombre);
  } catch (err) {
    console.error("no se pudo actualizar el usuario", err);
  }
}

async function loadUsers() {
  try {
    const response = await fetch("/datos"); // Pedimos los datos al servidor
    const users = await response.json(); // Convertimos la respuesta en JSON
    const tableBody = document.getElementById("mostrar"); // Seleccionamos el tbody
    tableBody.innerHTML = ""; // Limpiamos la tabla antes de insertar nuevos datos

    users.forEach((user) => {
      const row = `<tr>
                            <td>${user.id}</td>
                            <td><input type="text" class="texto" value='${user.nombre}'></td>
                            <td><button type="button" class="btn btn-primary elim" usuario=${user.id}>Eliminar</button></td>
                            <td><button type="button" class="btn btn-primary actua" usuario=${user.id} usuario=${user.id}>Actualizar</button></td>
                         </tr>`;
      tableBody.innerHTML += row; // Insertamos cada fila en la tabla
    });
    console.log(users);
    document.querySelectorAll(".elim").forEach((elem) => {
      elem.addEventListener("click", (e) => {
        console.log(e.target.getAttribute("usuario"));
        elimnarUsuario(e.target.getAttribute("usuario"));
      });
    });
    document.querySelectorAll(".actua").forEach((elem, index) => {
      const nuevo = document.querySelectorAll(".texto")[index];
      elem.addEventListener("click", (e) => {
        console.log(nuevo.value);
        console.log(e.target.getAttribute("usuario"));
        actualizarUser(e.target.getAttribute("usuario"), nuevo.value);
      });
    });
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
  }
}
loadUsers();

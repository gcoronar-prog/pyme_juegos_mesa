const tablaUsuarios = document.getElementById("tablaUsuarios");
const mensajeUsuarios = document.getElementById("mensajeUsuarios");

const usuarios = obtenerUsuarios();

function avisar(texto) {
  mensajeUsuarios.textContent = texto;
  mensajeUsuarios.classList.remove("d-none");
}

function mostrarUsuarios() {
  tablaUsuarios.innerHTML = "";

  usuarios.forEach((u, i) => {
    const userPropio = sesion && u.usuario === sesion.usuario;
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td class="usuario"></td>
        <td class="nombre"></td>
        <td class="correo"></td>
        <td>
            <select class="form-select rol">
                <option value="cliente">Cliente</option>
                <option value="admin">Administrador</option>
            </select>
        </td>
        <td>
            <button class="btn btn-outline-danger btn-sm eliminar">
                <i class="bi bi-trash"></i>
            </button>
        </td>`;

    fila.querySelector(".usuario").textContent = userPropio
      ? `${u.usuario}(Usuario actual)`
      : u.usuario;
    fila.querySelector(".nombre").textContent =
      `${u.nombre || ""} ${u.apellido || ""}`.trim() || "-";
    fila.querySelector(".correo").textContent = u.correo;

    const rol = fila.querySelector(".rol");
    rol.value = u.rol;
    rol.disabled = userPropio;
    rol.setAttribute("aria-label", `Rol de ${u.usuario}`);
    rol.addEventListener("change", () => {
      u.rol = rol.value;
      guardarUsuarios(usuarios);
      avisar(`${u.usuario} tiene rol ${rol.selectedOptions[0].text}`);
    });

    const eliminar = fila.querySelector(".eliminar");
    eliminar.disabled = userPropio;
    eliminar.setAttribute("aria-label", `Eliminar a ${u.usuario}`);
    eliminar.addEventListener("click", () => {
      if (!confirm(`¿Eliminar usuario ${u.usuario}?`)) return;
      usuarios.splice(i, 1);
      guardarUsuarios(usuarios);

      localStorage.removeItem(`carrito_${u.usuario}`);
      localStorage.removeItem(`historial_${u.usuario}`);
      avisar(`Se eliminó al usuario ${u.usuario}`);
      mostrarUsuarios();
    });
    tablaUsuarios.append(fila);
  });
}
mostrarUsuarios();

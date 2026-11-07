const formEditar = document.getElementById("formEditar");
const alertaEditar = document.getElementById("alertaEditar");
const btnModificar = document.getElementById("btnModificar");
const btnGuardar = document.getElementById("btnGuardar");
const direccion = document.getElementById("direccion");
const campos = formEditar.querySelectorAll("input");

const usuarios = obtenerUsuarios();
const actual = sesion && usuarios.find((u) => u.usuario === sesion.usuario);

function mostrarDatos() {
  nombUsuario.value = actual.usuario;
  correo.value = actual.correo;
  password.value = actual.password;
  repeatPass.value = actual.password;
  nombre.value = actual.nombre || "";
  apellido.value = actual.apellido || "";
  fecha.value = actual.fechaNacimiento || "";
  direccion.value = actual.direccion || "";
}

function bloquear(bloqueado) {
  campos.forEach((c) => (c.disabled = bloqueado));
  nombUsuario.disabled = true; // el nombre de usuario identifica la cuenta, no se edita
  btnGuardar.disabled = bloqueado;
  btnModificar.disabled = !bloqueado;
}

btnModificar.addEventListener("click", () => {
  alertaEditar.classList.add("d-none");
  bloquear(false);
});

formEditar.addEventListener("submit", (e) => {
  e.preventDefault();
  revisarCorreo();
  revisarTexto(nombre, errorNombre, "nombre");
  revisarTexto(apellido, errorApellido, "apellido");
  revisarFecha();
  igualdadPass();
  if (!formEditar.checkValidity()) {
    formEditar.classList.add("was-validated");
    return;
  }

  Object.assign(actual, {
    correo: correo.value.trim(),
    password: password.value,
    nombre: nombre.value.trim(),
    apellido: apellido.value.trim(),
    fechaNacimiento: fecha.value,
    direccion: direccion.value.trim(),
  });
  guardarUsuarios(usuarios);
  formEditar.classList.remove("was-validated");
  bloquear(true);
  alertaEditar.textContent = "Tus datos se guardaron correctamente.";
  alertaEditar.classList.remove("d-none");
});

if (actual) {
  mostrarDatos();
  bloquear(true);
} else {
  location.href = "login.html";
}

const correo = document.getElementById("mail");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const fecha = document.getElementById("fechaNacimiento");
const password = document.getElementById("userPassword");
const repeatPass = document.getElementById("repeatPass");
const nombUsuario = document.getElementById("username");

const errorCorreo = document.getElementById("errorCorreo");
const errorNombre = document.getElementById("errorNombre");
const errorApellido = document.getElementById("errorApellido");
const errorFecha = document.getElementById("errorFecha");
const errorPassword = document.getElementById("errorPassword");
const errorPassRep = document.getElementById("errorPassRep");

function correoValido(valor) {
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return patron.test(valor.trim());
}

function textoValido(valor) {
  const patron = /^\p{L}+([ '-]\p{L}+)*$/u;
  return patron.test(valor.trim());
}

function caracterEspecial(valor) {
  return /[^\p{L}\d\s]/u.test(valor);
}

function edadValida(fecha) {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");
  return fecha <= `${hoy.getFullYear() - 13}-${mes}-${dia}`;
}

function passwordValido(valor) {
  const patron = /^(?=.*\d)(?=.*\p{Lu}).+$/u;
  return patron.test(valor);
}

function correoRepetido(correo) {
  const registroCorreo = correo.trim().toLowerCase();
  return obtenerUsuarios().some(
    (u) =>
      u.correo.toLowerCase() === registroCorreo &&
      u.usuario !== sesion?.usuario,
  );
}

function revisarCorreo() {
  if (correo.value.trim() === "") {
    errorCorreo.textContent = "El correo es obligatorio.";
    correo.setCustomValidity("vacío");
  } else if (!correoValido(correo.value) || correo.validity.typeMismatch) {
    errorCorreo.textContent = "El formato debe ser nombre@dominio.cl";
    correo.setCustomValidity("formato");
  } else if (correoRepetido(correo.value)) {
    errorCorreo.textContent = "Ese correo ya está registrado.";
    correo.setCustomValidity("repetido");
  } else {
    correo.setCustomValidity("");
  }
}

function revisarTexto(campo, error, etiqueta) {
  if (campo.value.trim() === "") {
    error.textContent = `El ${etiqueta} es obligatorio.`;
    campo.setCustomValidity("vacio");
  } else if (!textoValido(campo.value)) {
    error.textContent = `El ${etiqueta} solo puede contener letras.`;
    campo.setCustomValidity("formato");
  } else {
    campo.setCustomValidity("");
  }
}

function revisarUsuario() {
  const valor = nombUsuario.value.trim();
  const existe = obtenerUsuarios().some((u) => u.usuario === valor);
  nombUsuario.nextElementSibling.textContent = existe
    ? "Ese nombre de usuario ya existe."
    : "Campo requerido";
  nombUsuario.setCustomValidity(valor === "" || existe ? "invalido" : "");
}

function revisarPassword(campo, error, etiqueta) {
  if (campo.value.trim() === "") {
    error.textContent = `La ${etiqueta} es obligatoria.`;
    campo.setCustomValidity("vacio");
  } else if (campo.value.length < 6 || campo.value.length > 18) {
    error.textContent = `La ${etiqueta} debe tener entre 6 y 18 caracteres.`;
    campo.setCustomValidity("rango");
  } else if (!passwordValido(campo.value)) {
    error.textContent = `La ${etiqueta} debe contener al menos un número y una mayúscula.`;
    campo.setCustomValidity("formato");
  } else if (!caracterEspecial(campo.value)) {
    error.textContent = `La ${etiqueta} debe contener al menos un carácter especial (por ejemplo ! @ # $ %).`;
    campo.setCustomValidity("especial");
  } else {
    campo.setCustomValidity("");
  }
}

function comparaPass() {
  if (password.value !== repeatPass.value) {
    errorPassRep.textContent = `Las contraseñas no coinciden.`;
    repeatPass.setCustomValidity("compara");
  }
}

function igualdadPass() {
  revisarPassword(password, errorPassword, "contraseña");
  revisarPassword(repeatPass, errorPassRep, "contraseña");
  comparaPass();
}

function revisarFecha() {
  if (fecha.value === "") {
    errorFecha.textContent = "La fecha de nacimiento es obligatoria.";
    fecha.setCustomValidity("vacio");
  } else if (fecha.value.length !== 10 || fecha.value < "1900-01-01") {
    errorFecha.textContent = "Escribe una fecha de nacimiento válida.";
    fecha.setCustomValidity("rango");
  } else if (!edadValida(fecha.value)) {
    errorFecha.textContent = "Debes tener al menos 13 años para registrarte.";
    fecha.setCustomValidity("edad");
  } else {
    fecha.setCustomValidity("");
  }
}

//comprobación inputs del form
correo.addEventListener("input", revisarCorreo);
nombre.addEventListener("input", () =>
  revisarTexto(nombre, errorNombre, "nombre"),
);
apellido.addEventListener("input", () =>
  revisarTexto(apellido, errorApellido, "apellido"),
);
fecha.addEventListener("input", revisarFecha);
password.addEventListener("input", igualdadPass);
repeatPass.addEventListener("input", igualdadPass);
nombUsuario.addEventListener("input", revisarUsuario);

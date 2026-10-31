const formu = document.getElementById("formRegistro");
const errorCorreo = document.getElementById("errorCorreo");
const correo = document.getElementById("mail");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const fecha = document.getElementById("fechaNacimiento");
const password = document.getElementById("userPassword");
const repeatPass = document.getElementById("repeatPass");
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

function edadValida(fecha) {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");
  return fecha <= `${hoy.getFullYear() - 13}-${mes}-${dia}`;
}

function passwordValido(valor) {
  const patron = /^(?=.*\d)(?=.*[A-Z]).+$/;
  return patron.test(valor);
}

function revisarCorreo() {
  if (correo.value.trim() === "") {
    errorCorreo.textContent = "El correo es obligatorio.";
    correo.setCustomValidity("vacío");
  } else if (!correoValido(correo.value)) {
    errorCorreo.textContent = "El formato debe ser nombre@dominio.cl";
    correo.setCustomValidity("formato");
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

function revisarPassword(campo, error, etiqueta) {
  if (campo.value.trim() === "") {
    error.textContent = `La ${etiqueta} es obligatoria.`;
    campo.setCustomValidity("vacio");
  } else if (campo.value.length < 6 || campo.value.length > 18) {
    error.textContent = `La ${etiqueta} debe tener entre 6 y 18 caracteres.`;
    campo.setCustomValidity("rango");
  } else if (!passwordValido(campo.value)) {
    error.textContent = `La ${etiqueta} debe contener al menos un número y una mayuscula.`;
    campo.setCustomValidity("formato");
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

function revisarFecha() {
  if (fecha.value === "") {
    errorFecha.textContent = "La fecha de nacimiento es obligatoria.";
    fecha.setCustomValidity("vacio");
  } else if (!edadValida(fecha.value)) {
    errorFecha.textContent = "Debes tener al menos 13 años para registrarte.";
    fecha.setCustomValidity("edad");
  } else {
    fecha.setCustomValidity("");
  }
}

formu.addEventListener("submit", function (e) {
  revisarCorreo();
  revisarTexto(nombre, errorNombre, "nombre");
  revisarTexto(apellido, errorApellido, "apellido");
  revisarFecha();
  revisarPassword(password, errorPassword, "contraseña");
  revisarPassword(repeatPass, errorPassRep, "contraseña");
  comparaPass();
  if (!formu.checkValidity()) {
    e.preventDefault();
  }
  formu.classList.add("was-validated");
});

formu.addEventListener("reset", function () {
  formu.classList.remove("was-validated");
});

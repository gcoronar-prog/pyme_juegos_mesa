const loginForm = document.getElementById("formLogin");
const userName = document.getElementById("userName");
const password = document.getElementById("contrasenia");

const errorUser = document.getElementById("errorUser");
const errorPass = document.getElementById("errorPass");

function passwordValido(valor) {
  const patron = /^(?=.*\d)(?=.*\p{Lu}).+$/u;
  return patron.test(valor);
}

function revisarTexto(campo, error, etiqueta) {
  if (campo.value.trim() === "") {
    error.textContent = `${etiqueta} es obligatorio.`;
    campo.setCustomValidity("vacio");
  } else {
    error.textContent = "";
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
    error.textContent = `La ${etiqueta} debe contener al menos un número y una mayúscula.`;
    campo.setCustomValidity("formato");
  } else {
    error.textContent = "";
    campo.setCustomValidity("");
  }
}

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  revisarTexto(userName, errorUser, "El nombre de usuario ");
  revisarPassword(password, errorPass, " contraseña ");
  loginForm.classList.add("was-validated");
});

loginForm.addEventListener("input", (e) => {
  if (e.target === userName) {
    revisarTexto(userName, errorUser, "El nombre de usuario");
  } else if (e.target === password) {
    revisarPassword(password, errorPass, "contraseña");
  }
});

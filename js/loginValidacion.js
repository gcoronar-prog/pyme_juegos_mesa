const loginForm = document.getElementById("formLogin");
const userMail = document.getElementById("userMail");
const password = document.getElementById("contrasenia");

const errorUser = document.getElementById("errorUser");
const errorPass = document.getElementById("errorPass");

function passwordValido(valor) {
  const patron = /^(?=.*\d)(?=.*\p{Lu}).+$/u;
  return patron.test(valor);
}

function correoValido(valor) {
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return patron.test(valor.trim());
}

function revisarCorreo() {
  if (userMail.value.trim() === "") {
    errorUser.textContent = "El correo es obligatorio.";
    userMail.setCustomValidity("vacío");
  } else if (!correoValido(userMail.value) || userMail.validity.typeMismatch) {
    errorUser.textContent = "El formato debe ser nombre@dominio.cl";
    userMail.setCustomValidity("formato");
  } else {
    errorUser.textContent = "";
    userMail.setCustomValidity("");
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
  revisarCorreo();
  revisarPassword(password, errorPass, " contraseña");
  loginForm.classList.add("was-validated");
  if (!loginForm.checkValidity()) return;

  const correoUser = userMail.value.trim().toLowerCase();
  const encontrado = obtenerUsuarios().find(
    (u) =>
      u.correo.toLowerCase() === correoUser && u.password === password.value,
  );
  if (!encontrado) {
    errorPass.textContent = "Usuario o contraseña incorrectos.";
    return;
  }
  sessionStorage.setItem(
    "sesion",
    JSON.stringify({ usuario: encontrado.usuario, rol: encontrado.rol }),
  );
  location.href = "index.html";
});

loginForm.addEventListener("input", (e) => {
  if (e.target === userMail) {
    revisarCorreo();
  } else if (e.target === password) {
    revisarPassword(password, errorPass, "contraseña");
  }
});

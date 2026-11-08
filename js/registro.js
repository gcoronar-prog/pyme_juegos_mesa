const formu = document.getElementById("formRegistro");
const alerta = document.getElementById("alertaFormu");
const alertaTexto = document.getElementById("alertaTexto");

function alertaSuccess() {
  if (formu.checkValidity()) {
    const usuario = nombUsuario.value.trim();
    const usuarios = obtenerUsuarios();
    usuarios.push({
      usuario,
      correo: correo.value.trim().toLowerCase(),
      password: password.value,
      nombre: nombre.value.trim(),
      apellido: apellido.value.trim(),
      fechaNacimiento: fecha.value,
      direccion: document.getElementById("direccion").value.trim(),
      rol: "cliente",
    });
    guardarUsuarios(usuarios);
    alerta.scrollIntoView({ block: "center" });
    formu.reset();
    alertaTexto.textContent = `El usuario ${usuario} ha sido registrado`;
    alerta.classList.remove("d-none");
  } else {
    alerta.classList.add("d-none");
    formu.classList.add("was-validated");
  }
}

formu.addEventListener("submit", function (e) {
  e.preventDefault();
  revisarCorreo();
  revisarTexto(nombre, errorNombre, "nombre");
  revisarTexto(apellido, errorApellido, "apellido");
  revisarFecha();
  igualdadPass();
  revisarUsuario();

  alertaSuccess();
});

formu.addEventListener("reset", function () {
  formu.classList.remove("was-validated");
  alerta.classList.add("d-none");
});

alerta.querySelector(".btn-close").addEventListener("click", () => {
  alerta.classList.add("d-none");
});

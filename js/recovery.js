const formRecovery = document.getElementById("formRecovery");
const mailRecovery = document.getElementById("mail");
const errorMail = document.getElementById("errorMail");
const mensajeRecovery = document.getElementById("mailRecovery");

function revisarMailRecovery() {
  const valor = mailRecovery.value.trim().toLowerCase();
  if (valor === "") {
    errorMail.textContent = "El correo es obligatorio.";
    mailRecovery.setCustomValidity("vacio");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
    errorMail.textContent = "El formato debe ser nombre@dominio.cl";
    mailRecovery.setCustomValidity("formato");
  } else if (!obtenerUsuarios().some((u) => u.correo.toLowerCase() === valor)) {
    errorMail.textContent = "No hay una cuenta registrada con ese correo.";
    mailRecovery.setCustomValidity("noexiste");
  } else {
    mailRecovery.setCustomValidity("");
  }
}

formRecovery.addEventListener("submit", (e) => {
  e.preventDefault();
  revisarMailRecovery();
  formRecovery.classList.add("was-validated");
  mensajeRecovery.classList.add("d-none");
  if (!formRecovery.checkValidity()) return;

  mensajeRecovery.textContent = `Te enviamos un enlace para recuperar tu contraseña a ${mailRecovery.value.trim()}.`;
  mensajeRecovery.classList.remove("d-none");
});

mailRecovery.addEventListener("input", revisarMailRecovery);

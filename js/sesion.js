function obtenerUsuarios() {
  return (
    JSON.parse(localStorage.getItem("usuarios")) || [
      {
        usuario: "admin",
        correo: "admin@calabozos.cl",
        password: "Admin123",
        rol: "admin",
      },
    ]
  );
}

function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function obtenerSesion() {
  return JSON.parse(sessionStorage.getItem("sesion"));
}

const sesion = obtenerSesion();
const loginBtn = document.getElementById("loginBtn");
const registroBtn = document.getElementById("registroBtn");

if (sesion && loginBtn) {
  loginBtn.textContent = `Cerrar sesión (${sesion.usuario})`;
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.removeItem("sesion");
    location.reload();
  });
  registroBtn.classList.add("d-none");
  const perfilBtn = document.createElement("a");
  perfilBtn.id = "perfilBtn";
  perfilBtn.className = loginBtn.className;
  perfilBtn.href = loginBtn
    .getAttribute("href")
    .replace("login.html", "editUser.html");
  perfilBtn.textContent = "Mi perfil";
  loginBtn.before(perfilBtn);
}

const sesion = obtenerSesion();
const loginBtn = document.getElementById("loginBtn");
const registroBtn = document.getElementById("registroBtn");

const base = loginBtn
  ? loginBtn.getAttribute("href").replace("login.html", "")
  : "";

//roles de usuario asignados a paginas especificas
const opcionesRol = {
  admin: [
    ["Bodega", "administrador/bodega.html"],
    ["Usuarios", "administrador/edicionUsuarios.html"],
  ],
  cliente: [
    ["Carrito Compras", "cliente/carritoCompra.html"],
    ["Mis compras", "cliente/historialCompra.html"],
  ],
};

// usuarios creados desde el codigo
function obtenerUsuarios() {
  return (
    JSON.parse(localStorage.getItem("usuarios")) || [
      {
        usuario: "admin",
        correo: "admin@calabozos.cl",
        password: "Admin123!",
        rol: "admin",
      },
      {
        usuario: "cliente",
        correo: "cliente@calabozos.cl",
        password: "Cliente123!",
        rol: "cliente",
      },
    ]
  );
}

const rolPagina = document.body.dataset.rol;
if (rolPagina && (!sesion || sesion.rol !== rolPagina)) {
  location.href = base + "index.html";
}

//creacion de botones
function crearBoton(texto, ruta) {
  const boton = document.createElement("a");
  boton.className = loginBtn.className;
  boton.href = base + ruta;
  boton.textContent = texto;
  loginBtn.before(boton);
}

function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function obtenerSesion() {
  return JSON.parse(sessionStorage.getItem("sesion"));
}

//creacion de boton perfil
if (sesion && loginBtn) {
  loginBtn.textContent = `Cerrar sesión (${sesion.usuario})`;
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.removeItem("sesion");
    location.reload();
  });
  registroBtn.classList.add("d-none");
  (opcionesRol[sesion.rol] || []).forEach(([texto, ruta]) =>
    crearBoton(texto, ruta),
  );
  crearBoton("Mi perfil", "editUser.html");
}

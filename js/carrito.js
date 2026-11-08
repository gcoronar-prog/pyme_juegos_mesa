const claveCarrito = sesion ? `carrito_${sesion.usuario}` : null;

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem(claveCarrito)) || [];
}

function guardarCarrito(carro) {
  localStorage.setItem(claveCarrito, JSON.stringify(carro));
}

const claveHistorial = sesion ? `historial_${sesion.usuario}` : null;

function obtenerHistorial() {
  return JSON.parse(localStorage.getItem(claveHistorial)) || [];
}

function guardarHistorial(historial) {
  localStorage.setItem(claveHistorial, JSON.stringify(historial));
}

function formatoPrecio(precio) {
  return "$" + precio.toLocaleString("es-CL");
}

const btnAgregar = document.querySelectorAll(".card-footer button");

btnAgregar.forEach((btn) => {
  if (sesion && sesion.rol !== "cliente") {
    btn.classList.add("d-none");
    return;
  }

  const textoOriginal = btn.innerHTML;

  btn.addEventListener("click", () => {
    if (!sesion) {
      location.href = base + "login.html";
      return;
    }

    const tarjeta = btn.closest(".card");
    const nombre = tarjeta.querySelector(".card-title").textContent.trim();
    const precio = Number(
      tarjeta.querySelector(".precio").textContent.replace(/\D/g, ""),
    );

    const carrito = obtenerCarrito();
    const producto = carrito.find((p) => p.nombre === nombre);
    if (producto) {
      producto.cantidad++;
    } else {
      carrito.push({ nombre, precio, cantidad: 1 });
    }
    guardarCarrito(carrito);

    btn.textContent = "Agregado";
    setTimeout(() => (btn.innerHTML = textoOriginal), 1000);
  });
});

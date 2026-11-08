const items = document.getElementById("items");
const tabla = document.getElementById("tabla");
const total = document.getElementById("total");
const vacio = document.getElementById("vacio");

const btnComprar = document.getElementById("btnComprar");
const alertaCompra = document.getElementById("alertaCompra");

function mostrarCarrito() {
  const carrito = obtenerCarrito();
  items.innerHTML = "";

  carrito.forEach((producto, i) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td class="nombre"></td>
        <td class="precio-unidad"></td>
        <td><input type="number" min="1" class="form-control cantidad"/></td>
        <td class="subtotal"></td>
        <td>
        <button class="btn btn-outline-danger btn-sm eliminar" aria-label="Eliminar">
            <i class="bi bi-trash"></i>
        </button>
        </td>`;
    fila.querySelector(".nombre").textContent = producto.nombre;
    fila.querySelector(".precio-unidad").textContent = formatoPrecio(
      producto.precio,
    );
    fila.querySelector(".subtotal").textContent = formatoPrecio(
      producto.precio * producto.cantidad,
    );

    const cantidad = fila.querySelector(".cantidad");
    cantidad.value = producto.cantidad;
    cantidad.addEventListener("change", () => {
      carrito[i].cantidad = Math.max(
        1,
        Math.floor(Number(cantidad.value)) || 1,
      );
      guardarCarrito(carrito);
      mostrarCarrito();
    });

    fila.querySelector(".eliminar").addEventListener("click", () => {
      carrito.splice(i, 1);
      guardarCarrito(carrito);
      mostrarCarrito();
    });
    items.append(fila);
  });

  const totalCarro = carrito.reduce(
    (suma, p) => suma + p.precio * p.cantidad,
    0,
  );
  total.textContent = formatoPrecio(totalCarro);
  tabla.classList.toggle("d-none", carrito.length === 0);
  vacio.classList.toggle("d-none", carrito.length > 0);
  btnComprar.classList.toggle("d-none", carrito.length === 0);
}

btnComprar.addEventListener("click", () => {
  const carrito = obtenerCarrito();
  const historial = obtenerHistorial();
  historial.push({
    fecha: new Date().toLocaleString("es-CL"),
    productos: carrito,
    total: carrito.reduce((suma, p) => suma + p.precio * p.cantidad, 0),
  });
  guardarHistorial(historial);
  guardarCarrito([]);

  alertaCompra.classList.remove("d-none");
  mostrarCarrito();
});
mostrarCarrito();

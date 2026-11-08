const listaHistorial = document.getElementById("listaHistorial");
const sinCompra = document.getElementById("sinCompra");

const historial = obtenerHistorial();
sinCompra.classList.toggle("d-none", historial.length > 0);

historial
  .slice()
  .reverse()
  .forEach((compra) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "card mb-3 text-start";
    tarjeta.innerHTML = `
    <div class="card-header d-flex justify-content-between">
        <span class="fecha"></span>
        <strong class="total"></strong>
    </div>
    <ul class="list-group list-group-flush"></ul>
    `;
    tarjeta.querySelector(".fecha").textContent = compra.fecha;
    tarjeta.querySelector(".total").textContent = formatoPrecio(compra.total);

    compra.productos.forEach((p) => {
      const item = document.createElement("li");
      item.className = "list-group-item d-flex justify-content-between";
      item.innerHTML = "<span></span><span></span>";
      item.children[0].textContent = `${p.cantidad} x ${p.nombre}`;
      item.children[1].textContent = formatoPrecio(p.precio * p.cantidad);
      tarjeta.querySelector("ul").append(item);
    });
    listaHistorial.append(tarjeta);
  });

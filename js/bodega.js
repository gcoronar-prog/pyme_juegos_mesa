const STOCK_MINIMO = 5;

const inventarioBase = [
  { nombre: "Booster Pokémon", categoria: "Juegos de cartas", stock: 20 },
  {
    nombre: "POKEMON TCG LUGIA EX SPECIAL COLLECT ESPAÑOL",
    categoria: "Juegos de cartas",
    stock: 4,
  },
  {
    nombre: "Booster Magic The Hobbit",
    categoria: "Juegos de cartas",
    stock: 15,
  },
  {
    nombre: "Caja de inicio Dungeons & Dragons",
    categoria: "Juegos de rol",
    stock: 8,
  },
  {
    nombre: "Pathfinder Libro de reglas",
    categoria: "Juegos de rol",
    stock: 2,
  },
  { nombre: "Dragonbane", categoria: "Juegos de rol", stock: 10 },
  {
    nombre: "Comienza aqui con Warhammer Age of Sigmar (ESP) Citadel",
    categoria: "Wargames y estrategia",
    stock: 6,
  },
  {
    nombre: "Kill Team Starter Set (Español) Citadel",
    categoria: "Wargames y estrategia",
    stock: 0,
  },
  {
    nombre: "Lord of the Rings War Of The Rohirrim Battle Of Edoras Citadel",
    categoria: "Wargames y estrategia",
    stock: 3,
  },
  {
    nombre: "Carpeta 4 bolsillos: Mega Charizard - Ultra PRO",
    categoria: "Accesorios",
    stock: 12,
  },
  {
    nombre: "Torre de Dados a Color - Folded Space",
    categoria: "Accesorios",
    stock: 7,
  },
  {
    nombre: "Portamazo Bastion 100+ XL Azul GameGenic",
    categoria: "Accesorios",
    stock: 9,
  },
];

const tablaBodega = document.getElementById("tablaBodega");
const alertaStock = document.getElementById("alertaStock");
const btnGuardarStock = document.getElementById("btnGuardarStock");
const stockGuardado = document.getElementById("stockGuardado");
const inventario = obtenerInventario();

function obtenerInventario() {
  return JSON.parse(localStorage.getItem("inventario")) || inventarioBase;
}

function guardarInventario(inventario) {
  localStorage.setItem("inventario", JSON.stringify(inventario));
}

function estadoStock(stock) {
  if (stock === 0) return ["Agotado", "text-bg-danger"];
  if (stock <= STOCK_MINIMO) return ["Stock bajo", "text-bg-warning"];
  return ["Disponible", "text-bg-success"];
}

function mostrarBodega() {
  tablaBodega.innerHTML = "";

  inventario.forEach((producto, i) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
            <td class="nombre"></td>
            <td class="categoria"></td>
            <td><input type="number" min="0" class="form-control stock"/></td>
            <td><span class="badge estado"></span></td>
        `;
    fila.querySelector(".nombre").textContent = producto.nombre;
    fila.querySelector(".categoria").textContent = producto.categoria;

    const [texto, color] = estadoStock(producto.stock);
    const estado = fila.querySelector(".estado");
    estado.textContent = texto;
    estado.classList.add(color);

    const stock = fila.querySelector(".stock");
    stock.value = producto.stock;
    stock.setAttribute("aria-label", `Stock de ${producto.nombre}`);

    stock.addEventListener("change", () => {
      inventario[i].stock = Math.max(0, Math.floor(Number(stock.value)) || 0);
      stockGuardado.classList.add("d-none");
      mostrarBodega();
    });
    tablaBodega.append(fila);
  });

  const pocos = inventario.filter((p) => p.stock <= STOCK_MINIMO);
  alertaStock.classList.toggle("d-none", pocos.length === 0);
  alertaStock.innerHTML = `<strong>Atención hay productos con bajo 
  stock</strong><ul class="mb-0"></ul>`;
  pocos.forEach((p) => {
    const item = document.createElement("li");
    item.textContent = `${p.nombre}: ${p.stock === 0 ? "agotado" : p.stock + " unidades"}`;
    alertaStock.querySelector("ul").append(item);
  });
}

btnGuardarStock.addEventListener("click", () => {
  guardarInventario(inventario);
  stockGuardado.classList.remove("d-none");
});

mostrarBodega();

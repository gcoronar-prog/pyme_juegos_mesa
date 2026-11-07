const formu = document.getElementById("formRegistro");
const alerta = document.getElementById("alertaFormu");
const alertaTexto = document.getElementById("alertaTexto");

usuarios.push({
  usuario,
  correo: correo.value.trim(),
  password: password.value,
  nombre: nombre.value.trim(),
  apellido: apellido.value.trim(),
  fechaNacimiento: fecha.value,
  direccion: document.getElementById("direccion").value.trim(),
  rol: "cliente",
});

$(document).ready(function () {
  var envelope = $("#envelope");
  var btn_open = $("#open");
  var btn_reset = $("#reset");

  function open() {
    envelope.addClass("open").removeClass("close");
  }
  function close() {
    envelope.addClass("close").removeClass("open");
  }

  btn_open.click(open);
  btn_reset.click(close);

  // Navegación
  $(".nav-btn").click(function () {
    var target = $(this).data("target");
    $(".view").removeClass("active");
    $(".menu").removeClass("active");
    $("#" + target).addClass("active");
  });
});

$(".nav-btn").click(function () {
  var target = $(this).data("target");
  $(".view").removeClass("active");
  $(".menu").removeClass("active");
  $("#" + target).addClass("active");

  // Si se sale de la carta, cerrar el sobre
  if (target !== "carta") {
    envelope.addClass("close").removeClass("open");
  }
});

// 💭 Caja de deseos con almacenamiento local
const deseoInput = document.getElementById("deseoInput");
const listaDeseos = document.getElementById("listaDeseos");
const agregarDeseo = document.getElementById("agregarDeseo");

// Cargar deseos guardados
window.addEventListener("DOMContentLoaded", () => {
  const deseosGuardados = JSON.parse(localStorage.getItem("misDeseos")) || [];
  deseosGuardados.forEach((deseo) => agregarElementoDeseo(deseo));
});

agregarDeseo.addEventListener("click", () => {
  const texto = deseoInput.value.trim();
  if (texto !== "") {
    agregarElementoDeseo(texto);
    guardarDeseo(texto);
    deseoInput.value = "";
  }
});

function agregarElementoDeseo(texto) {
  const li = document.createElement("li");
  li.style.display = "flex";
  li.style.justifyContent = "space-between";
  li.style.alignItems = "center";
  li.style.padding = "8px";
  li.style.backgroundColor = "#fff0f0";
  li.style.margin = "5px auto";
  li.style.border = "1px solid #c20000";
  li.style.borderRadius = "10px";
  li.style.maxWidth = "70%";

  const span = document.createElement("span");
  span.textContent = "🌟 " + texto;
  span.style.flex = "1";

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "❌";
  btnEliminar.style.border = "none";
  btnEliminar.style.background = "transparent";
  btnEliminar.style.color = "#c20000";
  btnEliminar.style.fontSize = "1.2rem";
  btnEliminar.style.cursor = "pointer";

  btnEliminar.addEventListener("click", () => {
    li.remove();
    eliminarDeseo(texto);
  });

  li.appendChild(span);
  li.appendChild(btnEliminar);
  listaDeseos.appendChild(li);
}

function guardarDeseo(texto) {
  const deseos = JSON.parse(localStorage.getItem("misDeseos")) || [];
  deseos.push(texto);
  localStorage.setItem("misDeseos", JSON.stringify(deseos));
}

function eliminarDeseo(texto) {
  let deseos = JSON.parse(localStorage.getItem("misDeseos")) || [];
  deseos = deseos.filter((d) => d !== texto);
  localStorage.setItem("misDeseos", JSON.stringify(deseos));
}

// 🖼️ Lightbox para galería
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const cerrarLightbox = document.getElementById("cerrarLightbox");

document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.style.display = "flex";
  });
});

cerrarLightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
  lightboxImg.src = "";
});

function cambiarCancion(ruta, titulo) {
  const audio = document.getElementById("audioPlayer");
  const trackTitle = document.getElementById("trackTitle");

  audio.pause();          // Pausa la canción actual
  audio.src = ruta;       // Cambia la ruta
  audio.load();           // Recarga el audio
  audio.play();           // Reproduce
  trackTitle.textContent = titulo; // Actualiza título
}

function lanzarDinos() {
  const dinoEmojis = ["🦕", "🦖", "🦎"]; // dinos que caerán
  const confettiContainer = document.getElementById("dino-confetti");

  for (let i = 0; i < 25; i++) {  // cantidad de dinos que caerán
    const dino = document.createElement("div");
    dino.classList.add("dino");
    dino.textContent = dinoEmojis[Math.floor(Math.random() * dinoEmojis.length)];

    // posición random en X
    dino.style.left = Math.random() * 100 + "vw";
    // duración random de caída
    dino.style.animationDuration = 3 + Math.random() * 2 + "s";

    confettiContainer.appendChild(dino);

    // eliminar después de animación
    setTimeout(() => {
      dino.remove();
    }, 6000);
  }
}

// Lanzar dinos automáticamente al cargar la página
window.addEventListener("load", lanzarDinos);

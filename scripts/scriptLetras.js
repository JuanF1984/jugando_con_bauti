import { imagenes } from "./variablesLetras.js"
const botones = document.querySelectorAll("button");
let imagen = document.getElementById("imagen");
let letra = document.getElementById("letra");
let nombre = document.getElementById("nombre");
let contenedor = document.getElementsByClassName('.container')

botones.forEach((boton) => {
    boton.addEventListener("click", () => {
        scrollToBottom()
        if (boton.getAttribute("id") == 'botonActivo') {
            boton.removeAttribute("id");
        } else {
            botones.forEach(boton => boton.removeAttribute("id"));
            boton.setAttribute("id", "botonActivo");
        }
        const letra = boton.textContent.toLowerCase();
        mostrarImagen(letra);
    });
});

document.addEventListener("keydown", (event) => {
    const letra = event.key.toLowerCase();
    scrollToBottom();
    botones.forEach((boton) => {
        if (boton.textContent.toLowerCase() == letra) {
            boton.setAttribute("id", "botonActivo");
        } else {
            boton.removeAttribute("id");
        }
    });
    mostrarImagen(letra);
});

function mostrarImagen(codigo) {
    if (codigo in imagenes) {
        imagen.src = imagenes[codigo].src;
        imagen.className = "visible";
        nombre.textContent = imagenes[codigo].name;
        letra.className = "visible";
        letra.textContent = codigo.toUpperCase();
    } else {
        // Si no, ocultar
        imagen.src = "";
        imagen.className = "oculto";
        letra.textContent = "";
        nombre.textContent = "";
        letra.className = "oculto";
    }
}

function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}


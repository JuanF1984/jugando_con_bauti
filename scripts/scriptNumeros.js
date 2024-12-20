// constante que contiene los nombre de los objetos y su ubicación
const itemsData = {
    1: { name: 'manzana', image: '/assets/img/numeros/1.png' },
    2: { name: 'pelota', image: '/assets/img/numeros/2.png' },
    3: { name: 'banana', image: '/assets/img/numeros/3.png' },
    4: { name: 'gato', image: '/assets/img/numeros/4.png' },
    5: { name: 'pulpo', image: '/assets/img/numeros/5.png' },
    6: { name: 'naranja', image: '/assets/img/numeros/6.png' },
    7: { name: 'perro', image: '/assets/img/numeros/7.png' },
    8: { name: 'zapallo', image: '/assets/img/numeros/8.png' },
    9: { name: 'gallina', image: '/assets/img/numeros/9.png' },
    10: { name: 'palmera', image: '/assets/img/numeros/10.png' }
};

// declaracion de variables de los elementos que se van a usar de la pagina
const botones = document.querySelectorAll("button");
let imagen = document.getElementById("imagenContenedor");
let nombre = document.getElementById("nombre");

botones.forEach((boton,i) => {
    boton.addEventListener("click", () => {
        // se llama a la funcion en la que se activa el formato para mostrar boton activo
        activarBoton(i)
        // se convierte en numero el valor del boton y se llama a la funcion que va a cargar imagenes
        const numero = parseInt(boton.textContent);
        mostrar(numero)
    });
});

// se modifica los atributos para que se vea distinto el boton que esta activo
const activarBoton = (posicion) =>{
    botones.forEach(boton => boton.removeAttribute("id"));
    botones[posicion].setAttribute("id", "botonActivo");
}


// funcion que carga imagenes y escribe la cantidad de objetos cargados
const mostrar = (indice) => {
    imagen.innerHTML = '';
    const item = itemsData[indice];
    for (let i = 1; i <= indice; i++) {
        const div = document.createElement('div');
        div.className = 'imagenSeccion';
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        const p = document.createElement('p');
        p.textContent = i;
        div.appendChild(img);
        div.appendChild(p);
        imagen.appendChild(div);
    }

}

document.addEventListener("keydown", (event) => {
    const numero = parseInt(event.key);
    if (numero >= 1 && numero <= 10) {
        // Se llama a la función para que se vea que boton es el que esta activo
        activarBoton(numero-1);
        // se llama a la función para que se carguen las imagenes y numeros
        mostrar(numero);
    }
})

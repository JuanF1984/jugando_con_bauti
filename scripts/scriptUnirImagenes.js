import { imagenes } from "./variablesLetras.js";

document.addEventListener("DOMContentLoaded", () => {
    const imgContainer = document.getElementById("img-container");
    const nameContainer = document.getElementById("name-container");
    const keys = Object.keys(imagenes);

    function iniciarJuego() {
        // Limpiar contenedores
        imgContainer.innerHTML = '';
        nameContainer.innerHTML = '';

        const selectedKeys = keys.sort(() => 0.6 - Math.random()).slice(0, 6);
        const selectedImages = selectedKeys.map(key => imagenes[key]);

        // Mostrar imágenes
        selectedImages.forEach((imgObj, index) => {
            let imgDiv = document.createElement("div");
            imgDiv.classList.add("image-box");
            imgDiv.dataset.name = imgObj.name;

            let img = document.createElement("img");
            img.src = imgObj.src;
            img.alt = imgObj.alt;
            img.title = imgObj.title;

            imgDiv.appendChild(img);
            imgContainer.appendChild(imgDiv);
        });

        // Mostrar nombres desordenados
        let names = [...selectedImages.map(img => img.name)].sort(() => 0.6 - Math.random());

        names.forEach(name => {
            let nameDiv = document.createElement("div");
            nameDiv.classList.add("name-box");
            nameDiv.textContent = name;
            nameDiv.dataset.name = name;

            nameContainer.appendChild(nameDiv);
        });

        // Añadir eventos de selección
        document.querySelectorAll(".image-box, .name-box").forEach(element => {
            element.addEventListener("click", () => {
                // Si ya está correcto, no hacer nada
                if (element.classList.contains("correct")) return;

                // Deseleccionar otros elementos del mismo tipo
                const elementType = element.classList.contains('image-box') ? '.image-box' : '.name-box';
                document.querySelectorAll(elementType).forEach(el => {
                    if (el !== element) el.classList.remove("selected");
                });

                // Alternar selección del elemento actual
                element.classList.toggle("selected");

                // Verificar si hay una selección coincidente
                const selectedImage = document.querySelector(".image-box.selected");
                const selectedName = document.querySelector(".name-box.selected");

                if (selectedImage && selectedName) {
                    // Verificar si coinciden
                    if (selectedImage.dataset.name === selectedName.dataset.name) {
                        selectedImage.classList.add("correct");
                        selectedName.classList.add("correct");
                        selectedImage.classList.remove("selected");
                        selectedName.classList.remove("selected");

                        // Ocultar imagen original
                        let img = selectedImage.querySelector('img');
                        img.style.display = 'none';

                        // Crear un span con el nombre para mostrarlo dentro de la imagen
                        let nameTag = document.createElement("span");
                        nameTag.textContent = selectedName.dataset.name;
                        nameTag.classList.add("matched-name");

                        selectedImage.appendChild(nameTag);
                        
                        // Verificar si se completó el juego
                        checkGameCompletion();
                    } else {
                        // Si no coinciden, deseleccionar
                        selectedImage.classList.remove("selected");
                        selectedName.classList.remove("selected");
                        alert("¡Incorrecto! Inténtalo de nuevo.");
                    }
                }
            });
        });
    }

    function checkGameCompletion() {
        const correctMatches = document.querySelectorAll('.image-box.correct');
        const totalImages = document.querySelectorAll('.image-box').length;

        if (correctMatches.length === totalImages) {
            // Crear botón de reinicio
            const restartButton = document.createElement('button');
            restartButton.textContent = 'Volver a empezar';
            restartButton.classList.add('restart-btn');
            restartButton.addEventListener('click', iniciarJuego);

            // Mostrar mensaje de felicitación
            const congratsMessage = document.createElement('div');
            congratsMessage.textContent = '¡Felicidades! Has completado el juego.';
            congratsMessage.classList.add('congrats-message');

            // Limpiar contenedor de nombres y agregar botón y mensaje
            nameContainer.innerHTML = '';
            nameContainer.appendChild(congratsMessage);
            nameContainer.appendChild(restartButton);
        }
    }

    // Iniciar el juego por primera vez
    iniciarJuego();
});
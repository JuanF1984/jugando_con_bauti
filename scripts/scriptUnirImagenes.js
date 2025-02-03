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
        let names = [...selectedImages.map(img => img.name)].sort(() => 0.5 - Math.random());

        names.forEach(name => {
            let nameDiv = document.createElement("div");
            nameDiv.classList.add("name-box");
            nameDiv.textContent = name;
            nameDiv.draggable = true;
            nameDiv.dataset.name = name;

            nameDiv.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text", e.target.dataset.name);
            });

            nameContainer.appendChild(nameDiv);
        });

        // Habilitar arrastrar y soltar
        document.querySelectorAll(".image-box").forEach(imgBox => {
            imgBox.addEventListener("dragover", (e) => e.preventDefault());

            imgBox.addEventListener("drop", (e) => {
                e.preventDefault();
                let draggedName = e.dataTransfer.getData("text");
                let draggedElement = document.querySelector(`.name-box[data-name='${draggedName}']`);

                if (draggedName === imgBox.dataset.name) {
                    // Si aún no tiene nombre correcto
                    if (!imgBox.classList.contains("correct")) {
                        imgBox.classList.add("correct");

                        // Ocultar imagen
                        let img = imgBox.querySelector('img');
                        img.style.display = 'none';

                        // Crear un span con el nombre para mostrarlo dentro de la imagen
                        let nameTag = document.createElement("span");
                        nameTag.textContent = draggedName;
                        nameTag.classList.add("matched-name");

                        imgBox.appendChild(nameTag);

                        // Eliminar la palabra arrastrada de la lista de nombres
                        if (draggedElement) {
                            draggedElement.remove();
                        }

                        // Verificar si se completó el juego
                        checkGameCompletion();
                    }
                } else {
                    alert("¡Incorrecto! Inténtalo de nuevo.");
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
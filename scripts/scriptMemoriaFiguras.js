const cardsContainer = document.getElementById('cards-container');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');
let cards = [];
let flippedCards = [];
let matchedPairs = 0;

async function fetchArasaacImages() {
    try {
        // Obtenemos una lista de palabras aleatorias en español
        const words = ['casa', 'perro', 'gato', 'árbol', 'sol', 'luna', 'coche', 'flor', 'libro', 'pelota', 'manzana', 'pájaro'];
        const shuffledWords = words.sort(() => 0.5 - Math.random()).slice(0, 8);
        
        const images = await Promise.all(shuffledWords.map(async (word) => {
            const response = await fetch(`https://api.arasaac.org/api/pictograms/es/search/${word}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.length > 0) {
                return `https://static.arasaac.org/pictograms/${data[0]._id}/${data[0]._id}_300.png`;
            }
            return null;
        }));

        console.log('Imágenes obtenidas:', images);
        return images.filter(img => img !== null);
    } catch (error) {
        console.error('Error al obtener imágenes de ARASAAC:', error);
        return [];
    }
}

async function initializeGame() {
    message.textContent = 'Cargando imágenes...';
    const images = await fetchArasaacImages();
    
    if (images.length < 8) {
        console.error('No se obtuvieron suficientes imágenes');
        message.textContent = 'Error al cargar las imágenes. Por favor, recarga la página.';
        restartButton.style.display = 'inline-block';
        restartButton.textContent = 'Reintentar';
        return;
    }
    
    cards = [...images, ...images].sort(() => Math.random() - 0.5);
    
    cardsContainer.innerHTML = '';
    cards.forEach((img, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<img src="${img}" alt="Pictograma ${index}">`;
        card.addEventListener('click', () => flipCard(card, index));
        cardsContainer.appendChild(card);
    });

    message.textContent = '';
    restartButton.style.display = 'none';
    matchedPairs = 0;
    flippedCards = [];
}

function flipCard(card, index) {
    if (flippedCards.length < 2 && !flippedCards.includes(index) && !card.classList.contains('matched')) {
        card.classList.add('flipped');
        flippedCards.push(index);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [index1, index2] = flippedCards;
    const card1 = cardsContainer.children[index1];
    const card2 = cardsContainer.children[index2];

    if (cards[index1] === cards[index2]) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;

        if (matchedPairs === cards.length / 2) {
            endGame();
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    flippedCards = [];
}

function endGame() {
    message.textContent = '¡Felicidades! Has completado el juego.';
    restartButton.style.display = 'inline-block';
    restartButton.textContent = 'Jugar de nuevo';
}

restartButton.addEventListener('click', initializeGame);

initializeGame();
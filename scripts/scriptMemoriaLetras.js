const cardsContainer = document.getElementById('cards-container');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');
let cards = [];
let flippedCards = [];
let matchedPairs = 0;

function generateRandomLetter() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function initializeGame() {
    cards = [];
    for (let i = 0; i < 8; i++) {
        const letter = generateRandomLetter();
        cards.push(letter, letter);
    }
    cards.sort(() => Math.random() - 0.5);
    
    cardsContainer.innerHTML = '';
    cards.forEach((letter, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">${letter}</div>
            </div>
        `;
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
}

restartButton.addEventListener('click', initializeGame);

initializeGame();
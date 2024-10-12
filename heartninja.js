const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Sprawdź kontekst 2D
if (!ctx) {
    console.error("Kontekst 2D nie został prawidłowo zainicjowany");
} else {
    console.log("Kontekst 2D załadowany poprawnie");
}

const heartImg = new Image();
heartImg.src = 'https://media.istockphoto.com/id/1439973042/vector/red-heart-flat-icon-the-symbol-of-love-vector-illustration.jpg?s=612x612&w=0&k=20&c=i2vL1DR3XaqPcLAUBiaQzeQOj8uqksXED6wI66MO3h0='; // URL obrazka serca

const hearts = [];
const heartSize = 50;
const fallSpeed = 2;

// Funkcja, która tworzy nowe serduszko
function createHeart() {
    const x = Math.random() * (canvas.width - heartSize);
    hearts.push({ x: x, y: -heartSize });
}

// Funkcja, która rysuje serduszka
function drawHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hearts.forEach((heart, index) => {
        ctx.drawImage(heartImg, heart.x, heart.y, heartSize, heartSize); // Rysuj obrazek serca

        heart.y += fallSpeed;

        if (heart.y > canvas.height) {
            hearts.splice(index, 1); // Usuń serce, które spadło poza ekran
        }
    });
}

// Funkcja, która obsługuje kliknięcie w serce
canvas.addEventListener('click', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    hearts.forEach((heart, index) => {
        if (
            mouseX >= heart.x && mouseX <= heart.x + heartSize &&
            mouseY >= heart.y && mouseY <= heart.y + heartSize
        ) {
            hearts.splice(index, 1); // Usuń serce po kliknięciu

            // Dodaj napis "Kocham Cię" w miejscu kliknięcia
            showLoveMessage(mouseX, mouseY);
        }
    });
});

// Funkcja, która wyświetla napis "Kocham Cię"
function showLoveMessage(x, y) {
    const loveMessage = document.createElement('div');
    loveMessage.classList.add('love-message');
    loveMessage.innerText = 'Kocham Cię';
    loveMessage.style.position = 'absolute'; // Ustaw pozycję na absolutną
    loveMessage.style.left = `${x}px`; // Użyj backticków dla template literal
    loveMessage.style.top = `${y}px`;  // Użyj backticków dla template literal
    document.body.appendChild(loveMessage);

    // Usuń napis po zakończeniu animacji
    setTimeout(() => {
        loveMessage.remove();
    }, 2000);
}

// Pętla gry
function gameLoop() {
    drawHearts();

    if (Math.random() < 0.03) { // Częstość spadania serduszek
        createHeart();
    }

    requestAnimationFrame(gameLoop);
}

// Sprawdź ładowanie obrazka
heartImg.onload = () => {
    console.log("Obrazek serca załadowany");
    gameLoop(); // Uruchom grę po załadowaniu obrazka serca
};

heartImg.onerror = () => {
    console.error("Błąd ładowania obrazka serca");
};

// Obsługa zmiany rozmiaru okna
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

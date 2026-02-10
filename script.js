// Frases de amor del código Python
const lovePhrases = [
    "te amo mas de lo que las palabras pueden decir",
    "davs y oliver, la mejor combinacion",
    "si estas leyendo esto me debes un beso",
    "El amor es la poesia de los sentidos",
    "Te amo mas alla de las palabras",
    "Nuestro destino es estar juntos",
    "Eres mi pensamiento favorito",
    "el mundo es mejor contigo a mi lado",
    "eres la casualidad mas bonita que ha llegado a mi vida",
    "en tus ojos encuentro mi paz",
    "amarte es un privilegio",
    "contigo a mi lado todos los dias son san valentin",
    "el amor verdadero no tiene final feliz porque simplemente nunca termina",
    "este amor es mi suerte favorita:3"
];

let secretNumber = 0;
let attempts = 0;

// Crear estrellas animadas al cargar la página
function createStars() {
    const container = document.getElementById('starsContainer');
    const starCount = 50;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const types = ['small', 'medium', 'large'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        star.classList.add(randomType);

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = 2 + Math.random() * 2;

        star.style.left = x + '%';
        star.style.top = y + '%';
        star.style.animationDelay = delay + 's';
        star.style.animationDuration = duration + 's';

        container.appendChild(star);
    }
}

// Cambiar entre pantallas
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// Ir desde intro a portada principal
function goToHome() {
    showScreen('home-screen');
}

// Iniciar el juego
function startGame() {
    secretNumber = Math.floor(Math.random() * 14) + 1;
    attempts = 0;
    document.getElementById('numberInput').value = '';
    document.getElementById('message').textContent = '';
    document.getElementById('love-phrase').textContent = '';
    document.getElementById('attempts').textContent = '0';
    showScreen('game-screen');
    document.getElementById('numberInput').focus();
    // Intentar reproducir música al iniciar (puede ser bloqueado por el navegador)
    const audio = document.getElementById('bgm');
    if (audio) {
        audio.play().then(() => {
            document.getElementById('audioToggle').textContent = '🔊';
        }).catch(() => {
            // autoplay bloqueado; dejar en estado pausado
        });
    }
}

// Enviar adivinanza
function submitGuess() {
    const input = document.getElementById('numberInput');
    const guess = parseInt(input.value);
    const messageDiv = document.getElementById('message');
    const phraseDiv = document.getElementById('love-phrase');

    // Validar entrada
    if (isNaN(guess) || guess < 1 || guess > 14) {
        messageDiv.textContent = 'Por favor elige un número del 1 al 14 ❤️';
        phraseDiv.textContent = '';
        return;
    }

    // Incrementar intentos
    attempts++;
    document.getElementById('attempts').textContent = attempts;

    // Mostrar frase de amor
    const phraseIndex = (attempts - 1) % lovePhrases.length;
    phraseDiv.textContent = '💟 ' + lovePhrases[phraseIndex];

    // Verificar adivinanza
    if (guess === secretNumber) {
        // Victoria
        document.getElementById('finalAttempts').textContent = attempts;
        setTimeout(() => {
            showScreen('victory-screen');
        }, 1000);
    } else if (guess < secretNumber) {
        messageDiv.textContent = '💗 El número secreto es más grande... ¡Sigue buscando en tu corazón!';
    } else {
        messageDiv.textContent = '💗 El número secreto es más pequeño... ¡El amor está cerca!';
    }

    // Limpiar input
    input.value = '';
    input.focus();
}

// Manejar Enter en el input
function handleEnter(event) {
    if (event.key === 'Enter') {
        submitGuess();
    }
}

// Resetear el juego
function resetGame() {
    startGame();
}

// Volver a la portada
function goHome() {
    showScreen('home-screen');
}

// Audio controls
function toggleAudio() {
    const audio = document.getElementById('bgm');
    const btn = document.getElementById('audioToggle');
    if (!audio) return;
    if (audio.paused) {
        audio.play().then(() => {
            btn.textContent = '🔊';
        }).catch(() => {
            // reproducción fallida
        });
    } else {
        audio.pause();
        btn.textContent = '🔈';
    }
}

// Permite cargar una URL externa preguntando al usuario
function setAudioUrl(url) {
    const src = document.getElementById('bgmSource');
    const audio = document.getElementById('bgm');
    if (!src || !audio) return;
    src.src = url;
    audio.load();
    audio.play().then(() => {
        document.getElementById('audioToggle').textContent = '🔊';
    }).catch(() => {});
}

// Atajo: si el usuario mantiene Shift y hace click en el botón, pregunta la URL
document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'audioToggle' && e.shiftKey) {
        const url = prompt('Pega la URL directa de un archivo MP3 (ej. https://.../song.mp3)');
        if (url) setAudioUrl(url);
    }
});

// Inicializar cuando carga la página
window.addEventListener('DOMContentLoaded', () => {
    createStars();
    showScreen('intro-screen');
});

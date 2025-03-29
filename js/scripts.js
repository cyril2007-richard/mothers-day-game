const gameContainer = document.querySelector(".game-container");
const timerDisplay = document.querySelector(".time");
const scoreDisplay = document.querySelector(".click-count");
const resultScreen = document.querySelector(".result-screen");
const finalScore = document.querySelector(".final-score");
const softMusic = new Audio("assets/audio/soft-music.mp3");
const mumSong = new Audio("assets/audio/mum-song.mp3");

let score = 0;
let timeLeft = 30;
let gameActive = true;
let musicStarted = false;


const messages = [
    "Keep clicking! 💖",
    "Almost there! ❤️",
    "You're doing great! 💕",
    "I love you so much, Mum! 🥰",
];

function showMotivationalMessage() {
    if (!gameActive) return;


    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

   
    const messageElement = document.createElement("div");
    messageElement.classList.add("motivation-message");
    messageElement.textContent = randomMessage;
    document.body.appendChild(messageElement);

 

    
  
    setTimeout(() => {
        messageElement.style.opacity = "0";
        setTimeout(() => messageElement.remove(), 1000);
    }, 3000);
}


const messageInterval = setInterval(showMotivationalMessage, 7000);


const timerInterval = setInterval(() => {
    if (timeLeft > 0) {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}`;
    } else {
        endGame();
    }
}, 1000);


document.addEventListener("click", (event) => {
    if (!gameActive) return;

  
    if (!musicStarted) {
        softMusic.loop = true;
        softMusic.play().catch(error => console.error("Audio Play Error:", error));
        musicStarted = true;
    }

    score++;
    scoreDisplay.textContent = `Score: ${score}`;


    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "❤️";
    document.body.appendChild(heart);

   
    heart.style.left = `${event.clientX}px`;
    heart.style.top = `${event.clientY}px`;

   
    setTimeout(() => {
        heart.remove();
    }, 2000);
});


function endGame() {
    gameActive = false;
    clearInterval(timerInterval);
    clearInterval(messageInterval);


    gameContainer.style.display = "none";
    resultScreen.style.visibility = "visible";
    resultScreen.style.opacity = "1";

  
    softMusic.pause();
    mumSong.play().catch(error => console.error("Audio Play Error:", error));
}

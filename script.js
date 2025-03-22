let score = 0;
let highscore = localStorage.getItem("highscore") || 0;
document.getElementById("highscore").innerText = highscore;

let obstacleSpeed = 2;
let scored = false;

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        jump();
    }
});

document.getElementById("jump-button").addEventListener("click", jump);


function jump() {
    let player = document.getElementById("player");
    if (!player.classList.contains("jump")) {
        player.classList.add("jump");
        setTimeout(() => {
            player.classList.remove("jump");
        }, 500);
    }
}

let gameOver = false;

function restartGame() {
    gameOver = false;
    score = 0;
    document.getElementById("score").innerText = score;
    
    obstacleSpeed = 2;
    scored = false;

    document.getElementById("player").style.display = "block";
    document.getElementById("obstacle").style.display = "block";

    document.getElementById("game-over").style.display = "none";
    document.getElementById("obstacle").style.animation = `move ${obstacleSpeed}s linear infinite`;
}

setInterval(() => {
    let player = document.getElementById("player");
    let obstacle = document.getElementById("obstacle");
    let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    if (!gameOver) {
        if (obstacleLeft > 50 && obstacleLeft < 90 && playerBottom <= 50) {
            gameOver = true;
            document.getElementById("game-over").style.display = "block";

            if (score > highscore) {
                highscore = score;
                localStorage.setItem("highscore", highscore);
                document.getElementById("highscore").innerText = highscore;
            }

            document.getElementById("player").style.display = "none";
            document.getElementById("obstacle").style.display = "none";

            score = 0;
            document.getElementById("score").innerText = score;
            obstacleSpeed = 2;
            document.getElementById("obstacle").style.animationDuration = `${obstacleSpeed}s`;
            scored = false;
            gameOver = false;
        }

        if (obstacleLeft <=0  && scored==false) {
            score++;
            document.getElementById("score").innerText = score;
            scored = true;

            if (score % 10 === 0) {
                obstacleSpeed = obstacleSpeed - 0.1;

                obstacle.style.animation = "none";
                setTimeout(() => {
                    obstacle.style.animation = `move ${obstacleSpeed}s linear infinite`;
                }, 50);
            }
        }

        if (obstacleLeft > 500) {
            scored = false;
        }
    }
}, 50);


document.addEventListener("DOMContentLoaded", () => {
    const snowContainer = document.querySelector(".snow");
    for (let i = 0; i < 50; i++) {
        let snowflake = document.createElement("span");
        let size = Math.random() * 5 + 2;
        let position = Math.random() * 100;
        let duration = Math.random() * 7 + 5;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${position}%`;
        snowflake.style.top = `${-Math.random() * 100}px`;
        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        snowContainer.appendChild(snowflake);
    }
});
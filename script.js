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

            checkUnlockSkin50();
            checkUnlockSkin70();

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
let unlockedSkins = ["images/cat2-removebg-preview.png"]; // Skin mặc định
let currentSkin = "images/cat2-removebg-preview.png"; // Skin hiện tại
const skins = [
    "images/cat2-removebg-preview.png",
    "images/bi-removebg-preview.png", 
    "images/cá-removebg-preview.png", 
];

// Kiểm tra nếu có skin đã mở khóa trước đó
if (localStorage.getItem("unlockedSkins")) {
    unlockedSkins = JSON.parse(localStorage.getItem("unlockedSkins"));
}

// Hiển thị cửa hàng skin
document.getElementById("open-skin-shop").addEventListener("click", () => {
    let skinList = document.getElementById("skin-list");
    skinList.innerHTML = ""; // Xóa danh sách cũ

    unlockedSkins.forEach((skin, index) => {
        let img = document.createElement("img");
        img.src = skin;
        img.dataset.index = index;
        if (skin === currentSkin) img.classList.add("selected");

        img.addEventListener("click", function () {
            document.querySelectorAll("#skin-list img").forEach(img => img.classList.remove("selected"));
            img.classList.add("selected");
            currentSkin = skin;
        });

        skinList.appendChild(img);
    });

    document.getElementById("skin-shop").classList.remove("hidden");
});

// Xác nhận chọn skin
document.getElementById("confirm-skin").addEventListener("click", () => {
    document.querySelector(".player").style.backgroundImage = `url('${currentSkin}')`;
    localStorage.setItem("currentSkin", currentSkin);
    document.getElementById("skin-shop").classList.add("hidden");
});

// Đóng cửa hàng
document.getElementById("close-skin-shop").addEventListener("click", () => {
    document.getElementById("skin-shop").classList.add("hidden");
});

// Mở khóa skin khi đạt 100 điểm
function checkUnlockSkin50() {
    if (highscore >= 50 && !unlockedSkins.includes(skins[1])) {
        unlockedSkins.push(skins[1]); // Mở khóa skin 2
        localStorage.setItem("unlockedSkins", JSON.stringify(unlockedSkins));
        alert("Chúc mừng! Bạn đã mở khóa một bộ trang phục mới!");
    }
}
function checkUnlockSkin70() {
    if (highscore >= 70 && !unlockedSkins.includes(skins[2])) {
        unlockedSkins.push(skins[2]); // Mở khóa skin 2
        localStorage.setItem("unlockedSkins", JSON.stringify(unlockedSkins));
        alert("Chúc mừng! Bạn đã mở khóa một bộ trang phục mới!");
    }
}

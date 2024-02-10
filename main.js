// Create a funnction where luigi.png is showing
// Create a function where enemies/objects move from one direction to another
// Create a function for scoring 
// Create a function for when luigi.png collides with enemies/objects 
// Create a function to make luigi.png jump 
// Create a function when game is over 

let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

let luigiWidth = 100;
let luigiHeight = 105;
let luigiX = 50;
let luigiY = boardHeight - luigiHeight;
let luigiImg;

let luigi = {
    x: luigiX,
    y: luigiY,
    width: luigiWidth,
    height: luigiHeight
};

let enemyArray = [];

let bulletWidth = 60;
let piranhaWidth = 30;
let bowserWidth = 80;

let enemyHeight = 90;
let enemyX = 700;
let enemyY = boardHeight - enemyHeight;

let bulletImg;
let piranhaImg;
let bowserImg;

let velocityX = -8;
let velocityY = 0;
let gravity = 0.4;

let gameOver = true;
let score = 0;

let music = new Audio('./music/Super Mario 64 Slider Race Theme Song.mp3');
music.addEventListener('error', function(e) {
    console.error('Error occurred while loading the audio:', e);
});
window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");

    luigiImg = new Image();
    luigiImg.src = "./img/luigi.png";

    bulletImg = new Image();
    bulletImg.src = "./img/bullet.png";

    piranhaImg = new Image();
    piranhaImg.src = "./img/piranha-plant.png";

    bowserImg = new Image();
    bowserImg.src = "./img/bowser.png";

    // Display title
    context.fillStyle = "black";
    context.font = "20px courier";
    context.fillText("Press any key to begin dodging", boardWidth / 4, boardHeight / 2);

    // Add event listener for keydown event to start the game
    document.addEventListener("keydown", startGame);
};

function startGame(event) {
    // Start the game loop only if it's not already started
    if (gameOver) {
        gameOver = false;
        document.removeEventListener("keydown", startGame);
        setInterval(placeEnemy, 1000);
        requestAnimationFrame(update);
        document.addEventListener("keydown", moveLuigi);
        playMusic();
    }
}

function update() {
    if (gameOver) return;

    context.clearRect(0, 0, board.width, board.height);
    velocityY += gravity;
    luigi.y = Math.min(luigi.y + velocityY, luigiY);
    context.drawImage(luigiImg, luigi.x, luigi.y, luigi.width, luigi.height);

    for (let i = 0; i < enemyArray.length; i++) {
        let enemy = enemyArray[i];
        enemy.x += velocityX;
        context.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);

        if (detectCollision(luigi, enemy)) {
            gameOver = true;
        }
    }

    context.fillStyle = "black";
    context.font = "30px courier";
    score++;
    context.fillText(score, 5, 20);

    requestAnimationFrame(update);
}

function moveLuigi(e) {
    if (gameOver) return;

    if ((e.code == "Space" || e.code == "ArrowUp") && luigi.y == luigiY) {
        velocityY = -10;
    }
}

function placeEnemy() {
    if (gameOver) return;

    let enemy = {
        img: null,
        x: enemyX,
        y: enemyY,
        width: null,
        height: enemyHeight
    };

    let placeEnemyChance = Math.random();

    if (placeEnemyChance > 0.9) {
        enemy.img = bowserImg;
        enemy.width = bowserWidth;
        enemyArray.push(enemy);
    } else if (placeEnemyChance > 0.7) {
        enemy.img = piranhaImg;
        enemy.width = piranhaWidth;
        enemyArray.push(enemy);
    } else if (placeEnemyChance > 0.5) {
        enemy.img = bulletImg;
        enemy.width = bulletWidth;
        enemyArray.push(enemy);
    }

    if (enemyArray.length > 5) {
        enemyArray.shift();
    }
}

function detectCollision(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}
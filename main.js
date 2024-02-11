// Create a funnction where luigi.png is showing
// Create a function where enemies/objects move from one direction to another
// Create a function for scoring 
// Create a function for when luigi.png collides with enemies/objects 
// Create a function to make luigi.png jump 
// Create a function when game is over 


// Game 

let board;
let boardWidth = 850;
let boardHeight = 350;
let context;

// let cloudImg;
// let cloudWidth = 750;
// let cloudHeight = 100;
// let cloudX = 0;
// let cloudY = 0;

let backgroundImg;
let backgroundWidth = 850;
let backgroundHeight = 350; 
let backgroundX = 0;
let backgroundY = 0;
// Main character 

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


// Enemies Character 

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

// Game Basics 

let gameOver = true;
let score = 0;

// Added music to when the game starts 

let mySound = new Audio('./music/Super Mario 64 Slider Race Theme Song.mp3')
mySound.play()
function startPlaying() {

    mySound.play();
}
document.addEventListener('keydown', function(event) {
    
    if (event.keyCode === 32) { 
        event.preventDefault();
        
        startPlaying();
    }
});

// When page is loaded 
// Retrieved from MDN Window: Load Event 
// Following function is to create the characters 
window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");

    backgroundImg = new Image(); 
    backgroundImg.src = "./img/canvas-background.jpg";


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
    context.font = "bold 25px courier";
    context.fillText("Press any key to begin dodging", boardWidth / 4, boardHeight / 2);

    document.addEventListener("keydown", startGame);
};

// Start the game loop only if it's not already started
function startGame(event) {
    
    if (gameOver) {
        gameOver = false;
        document.removeEventListener("keydown", startGame);
        setInterval(placeEnemy, 1000);
        requestAnimationFrame(update);
        document.addEventListener("keydown", moveLuigi);
        
    }
}


 // To add on the board 

function update() {
    if (gameOver) {
        mySound.pause(); // Stop the music when game is over
        return;
    }
    context.clearRect(0, 0, board.width, board.height);
    velocityY += gravity;

    context.drawImage(backgroundImg, backgroundX, backgroundY, backgroundWidth, backgroundHeight);

  

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

// Character movement

function moveLuigi(e) {
    if (gameOver) return;

    if ((e.code == "Space" || e.code == "ArrowUp") && luigi.y == luigiY) {
        velocityY = -10;
    }
}

// Spawning of enemies randomly with math.random

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

// Was able to achieve collision thanks to Stack Over Flow coding website ps. it was so tough :C

function detectCollision(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}
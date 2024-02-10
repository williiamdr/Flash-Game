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


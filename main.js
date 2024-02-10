// Create a funnction where luigi.png is showing
// Create a function where enemies/objects move from one direction to another
// Create a function for scoring 
// Create a function for when luigi.png collides with enemies/objects 
// Create a function to make luigi.png jump 
// Create a function when game is over 

const luigi = document.getElementById("luigi");
const bullet = document.getElementById("bullet");

function jump (){
    luigi.classList.add("jump");

    setTimeout(function (){
        luigi.classList.remove("jump");
    }, 300);
}


document.addEventListener("keydown", function(event) {
jump();
})


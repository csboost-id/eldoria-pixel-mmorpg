const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


let player = {
    x:400,
    y:220,
    size:30
};


function gameLoop(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.fillStyle="blue";

    ctx.fillRect(
        player.x,
        player.y,
        player.size,
        player.size
    );


    requestAnimationFrame(gameLoop);

}


gameLoop();

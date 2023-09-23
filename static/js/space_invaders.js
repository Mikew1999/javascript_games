const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext('2d');

class Ship
{
    constructor(height, width, color)
    {
        this.height = height;
        this.width = width;
        this.color = color;
        this.x = 350;
        this.y = 350;
    }

    moveLeft()
    {
        
    }
}

function gameLoop()
{

}

let ship = new Ship(30, 50, "red");

window.onload = () =>
{
    gameLoop();
}
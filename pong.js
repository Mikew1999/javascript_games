// set canvas and context
const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
let playerLeftScore = 0;
let playerRightScore = 0;
let keyPressed;
let interval;
const offset = 50;

function DegreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}


// class to represent a paddle
class Paddle
{
    constructor(x, y)
    {
        this.height = 100;
        this.width = 15;
        this.color = "white";
        this.x = x;
        this.y = y;
    }
}

// class to re
class Ball
{
    constructor(x, y, angle)
    {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.angle = angle;
        this.color = "white";
        this.speed = 10;
    }

    // moves the ball based on it's angle
    move()
    {
        this.x += Math.floor(Math.cos(DegreesToRadians(this.angle)) * this.speed);
        this.y += Math.floor(Math.sin(DegreesToRadians(this.angle)) * this.speed);
    }
}

// creates instances of classes
const playerLeft = new Paddle(offset, 180);
const playerRight = new Paddle(canvas.width - offset, 180);
let ball = new Ball(Math.floor(canvas.width / 2), 225, Math.floor(Math.random() * 260));


// function to create rectangle
function createRect(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}

// function to create a circle
function createCircle(x, y, width, color)
{
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(x, y, width, 0, 2 * Math.PI);
    canvasContext.fill();
}

// creates the separation line between the 2 halves
function createSeparationLine()
{
    canvasContext.strokeStyle = "white";
    canvasContext.beginPath();
    canvasContext.moveTo(Math.floor(canvas.width / 2), 0);
    canvasContext.lineTo(Math.floor(canvas.width / 2), 750);
    canvasContext.stroke();
}


// draws the game
function draw()
{
    // set background
    createRect(0,0,canvas.width, canvas.height, "black");
    createRect(0,0, canvas.width, canvas.height);
    // creates paddles
    createRect(playerLeft.x, playerLeft.y, playerLeft.width, playerLeft.height, playerLeft.color);
    createRect(playerRight.x, playerRight.y, playerRight.width, playerRight.height, playerRight.color);
    // creates separation line
    createSeparationLine();
    // create ball
    createCircle(ball.x, ball.y, ball.width, ball.color);
    // add text to show score
    canvasContext.font = "20px Arial"
    canvasContext.fillStyle = "#00FF42"
    canvasContext.fillText(`Score: ${playerRightScore}`,canvas.width - 340, 20);
    canvasContext.fillText(`Score: ${playerLeftScore}`,340, 20);
}

// updates the game
function update()
{
    // clear frame
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    // move the ball
    ball.move();
}

// function to check if the ball hits the top 
function checkHitY()
{
    if (ball.y <= 0)
    {
        console.log(ball.angle);
        console.log(DegreesToRadians(ball.angle));
    }
}

function show()
{
    update();
    checkHitY();
    draw();
}

function gameLoop()
{
    show();
}

window.onload = () =>
{
    interval = setInterval(gameLoop, 60);
}


window.addEventListener("keydown", function(event) 
{
    keyPressed = event.key.toLowerCase();
    switch(keyPressed)
    {
        case "w":
            if (playerLeft.y > 0)
            {
                playerLeft.y = playerLeft.y - 20;
            }
            break;
        case "s":
            if (playerLeft.y < 585)
            {
                playerLeft.y = playerLeft.y + 20;
            }
            break;
        case 'arrowup':
            event.preventDefault();
            if (playerRight.y > 0)
            {
                playerRight.y = playerRight.y - 20;
            }
            break;
        case "arrowdown":
            event.preventDefault();
            if (playerRight.y < 585)
            {
                playerRight.y = playerRight.y + 20;
            }
        default:
            break;
    }
});
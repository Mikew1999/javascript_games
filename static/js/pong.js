// set canvas and context
const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
// init scores
let playerLeftScore = 0;
let playerRightScore = 0;
// init key pressed
let keyPressed;
// init interval
let interval;
let radians;
let angle;
let gameEnded = false;
let winner;
// 
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
        radians = DegreesToRadians(this.angle);
        if (this.angle >= 75 && this.angle <= 90)
        {
            this.angle = 40;
        }
        else if (this.angle > 90 && this.angle <= 105)
        {
            this.angle = 130;
        }
        this.x += Math.floor(Math.cos(radians) * this.speed);
        this.y += Math.floor(Math.sin(radians) * this.speed);
    }
}

// creates instances of classes
const playerLeft = new Paddle(offset, 180);
const playerRight = new Paddle(canvas.width - offset, 180);
let ball = new Ball(Math.floor(canvas.width / 2), 225, Math.floor(Math.random() * 360));
if (ball.angle >= 75 && ball.angle <= 90)
{
    ball.angle = 40;
}
else if (ball.angle > 90 && ball.angle <= 105)
{
    ball.angle = 130;
}


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
    checkHitPaddle();

}

// function to check if the ball hits the top 
function checkHitY()
{
    // check if ball hit top or bottom
    if (ball.y <= 10 || ball.y >= (canvas.height - 10))
    {
        // set new angle
        ball.angle = (360 - ball.angle);
        console.log(ball.angle);
        /* 
            handle edge cases
        */
        if (ball.angle >= 60 && ball.angle <= 90)
        {
            ball.angle = 40;
        }
        else if (ball.angle >= 90 && ball.angle <= 110)
        {
            ball.angle = 130;
        }
        else if (ball.angle >= 240 && ball.angle <= 270)
        {
            // needs changing
            ball.angle = 200;
        }
        else if (ball.angle >= 270 && ball.angle <= 300)
        {
            ball.angle = 330
        }
        else if (ball.angle >= 200 && ball.angle <= 230)
        {
            ball.angle = 200
        }
        else if (ball.angle >= 300 && ball.angle <= 330)
        {
            ball.angle = 300
        }

    }
}

// function to check if ball hit paddles
function checkHitPaddle()
{
    if (ball.x <= 60 && ball.x >= 50 && ball.y <= (playerLeft.y + 75) && ball.y >= (playerLeft.y - 75))
    {
        console.log("1")
        ball.angle = (180 - ball.angle);
        if (ball.angle > 330)
        {
            ball.angle = 300;
        }
        else if (ball.angle < 30)
        {
            ball.angle = 50;
        }
    }
    else if (ball.x >= (canvas.width - 60) && ball.x <= (canvas.width - 50) && ball.y <= (playerRight.y + 75) && ball.y >= (playerRight.y - 75))
    {
        console.log("2")
        ball.angle = (180 - ball.angle);
        if (ball.angle > 330)
        {
            ball.angle = 300;
        }
        else if (ball.angle < 30)
        {
            ball.angle = 50;
        }
    }
}

function resetGame()
{
    ball = new Ball(Math.floor(canvas.width / 2), 225, Math.floor(Math.random() * 360));
    if (playerLeftScore == 10)
    {
        winner = 'Player Left ';
        endGame();
    }
    else if (playerRightScore == 10)
    {
        winner = 'Player Right ';
        endGame();
    }
}

function endGame()
{
    clearInterval(interval);
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    createRect(0,0,canvas.width, canvas.height, "black");
    canvasContext.font = "20px Arial"
    canvasContext.fillStyle = "#00FF42"
    canvasContext.fillText(`Game Over! ${winner} wins!`,200, 50);
    canvasContext.fillText(`Score: ${playerRightScore}`,canvas.width - 340, 250);
    canvasContext.fillText(`Score: ${playerLeftScore}`,340, 250);
    winner = undefined;
}

function score()
{
    if (ball.x <= 0)
    {
        playerRightScore += 1;
        resetGame();
    }
    if (ball.x >= canvas.width)
    {
        playerLeftScore += 1;
        resetGame();
    }
}

function show()
{
    update();
    checkHitY();
    draw();
    score();
}

function gameLoop()
{
    show();
}

window.onload = () =>
{
    // run game at 30fps
    interval = setInterval(gameLoop, 30);
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
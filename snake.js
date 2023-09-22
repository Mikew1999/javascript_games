const canvas = document.getElementById("canvas")
const canvasContext = canvas.getContext('2d')
let hitwall;
let interval;
let gameover;
let keyPressed;


// class to represent the snake
class Snake {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.tail = [{x: this.x, y: this.y}];
        this.facing = 90;
    }

    // method to move the snake
    move() {
        let newRect;

        // values are at 90 degree intervals to represent which way we're pointing
        switch (this.facing) {
            case 0:
                newRect = {
                    x: this.tail[this.tail.length - 1].x,
                    y: this.tail[this.tail.length - 1].y - this.size
                }
                break;
            case 90:
                newRect = {
                    x: this.tail[this.tail.length - 1].x + this.size,
                    y: this.tail[this.tail.length - 1].y
                }
                break;
            case 180:
                newRect = {
                    x: this.tail[this.tail.length - 1].x,
                    y: this.tail[this.tail.length - 1].y + this.size
                }
                break;
        
            case 270:
                newRect = {
                    x: this.tail[this.tail.length - 1].x - this.size,
                    y: this.tail[this.tail.length - 1].y
                }
            default:
                
                break;
        }

        this.tail.shift();
        this.tail.push(newRect);
    }

    eatApple()
    {
        if (this.tail[this.tail.length - 1].x == apple.x && this.tail[this.tail.length - 1].y == apple.y)
        {
            this.tail[this.tail.length] = {x:apple.x, y: apple.y};
            apple = new Apple();
        }
    }
}


// class to represent apple
class Apple{
    constructor(){
        let isTouching;
        
        // check
        while (true) {
            isTouching = false;
            this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size;
            if (this.x < snake.size)
            {
                this.x = snake.size * 2;
            }
            else if (this.x > (canvas.width - snake.size))
            {
                this.x = canvas.width - snake.size;
            }
            this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size;
            if (this.y < snake.size)
            {
                this.y = snake.size * 2;
            }
            else if (this.y > (canvas.height - snake.size))
            {
                this.x = canvas.height - (snake.size * 2);
            }
            
            for (let i = 0; i < snake.tail.length; i++) {
                if (this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
                    isTouching = true;
                }
            }

            this.size = snake.size;
            this.color = "red";

            if (!isTouching) {
                break;
            }
        }
    }
}


function createRect(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}



function show()
{
    if (!update())
    {
        return endGame();
    }
    draw();
    
}


function checkHitWall()
{
    let head = snake.tail[snake.tail.length - 1];

    if (head.x < (snake.size - 2.5))
    {
        return true;
    }
    else if (head.x > (canvas.width))
    {
        return true;
    }
    else if (head.y < (snake.size - 2.5))
    {
        return true;
    }
    else if (head.y > (canvas.height))
    {
        return true;
    }
    else 
    {
        return false;
    }
}

function checkHitSelf()
{
    let head = snake.tail[snake.tail.length - 1];

    for (item of snake.tail)
    {
        console.log(head, item)
        if (head != item)
        {
            if (head.x == item.x && head.y == item.y)
            {
                return true;
            }
        }
    }
    return false;
}

function endGame()
{
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    createRect(0,0,canvas.width, canvas.height, "black");
    canvasContext.font = "20px Arial"
    canvasContext.fillStyle = "#00FF42"
    canvasContext.fillText("Game Over! Final Score:" + (snake.tail.length -1 ),canvas.width - 340, 20);
    clearInterval(interval);
}

function update()
{
    // clear the canvas
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    // move snake
    snake.move();
    hitSelf = checkHitSelf();
    if(hitSelf)
    {
        // end game if snake hit self
        gameover = true;
        return false;
    }
    // check if apple eaten, place new apple etc
    snake.eatApple();
    // check if snake hit wall
    hitwall = checkHitWall();
    if(hitwall)
    {
        // end game if snake hit wall
        gameover = true;
        return false;
    }
    
    return true;
    
}

function draw()
{
    // create frame
    createRect(0,0,canvas.width, canvas.height, "black");
    // 
    createRect(0,0, canvas.width, canvas.height);

    for (let i = 0; i < snake.tail.length; i++){
        createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5,
            snake.size - 5, snake.size- 5, "white")
    }

    canvasContext.font = "20px Arial"
    canvasContext.fillStyle = "#00FF42"
    canvasContext.fillText("Score: " + (snake.tail.length -1),canvas.width - 120, 18)
    createRect(apple.x, apple.y, apple.size, apple.size, apple.color);
}

function gameLoop()
{
    gameover = false;
    // 1000/20
    interval = setInterval(show, 2000/20)
}

let snake = new Snake(20,20,20);
let apple = new Apple();

window.onload = () =>
{
    gameLoop();
}

window.addEventListener("keydown", (event) => {
    setTimeout(() => {
        keyPressed = event.key.toLowerCase();
        if (keyPressed == "w" && (snake.facing != 0 && snake.facing != 180)) {
            snake.facing = 0;
        } else if (keyPressed == "d" && (snake.facing != 90 && snake.facing != 270)) {
            snake.facing = 90;
        } else if (keyPressed == "s" && (snake.facing != 180 && snake.facing != 0)) {
            snake.facing = 180;
        } else if (keyPressed == "a" && (snake.facing != 270 && snake.facing!= 90)) {
            snake.facing = 270;
        }
        else if ((keyPressed == "enter" || keyPressed == " ") && gameover)
        {
            snake = new Snake(20,20,20)
            gameLoop();
        }
    }, 1)
})
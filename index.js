let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
let stopX = undefined;
let stopY = undefined

leftBorder = 10;
rightBorder = 10;
topBorder = 50;
bottomBorder = 10;;


// classes
class Square{
    constructor() {
        this.width = 25;
        this.height = 25;
        this.object = undefined;
    }
}

class GameGrid{
    constructor() {
        this.canvasGrid = new Array(canvas.height);

        for (let i = 0; i < canvas.height ; i++) {
            this.canvasGrid[i] = new Array(canvas.width );
            for (let j = 0; j < canvas.width ; j++) {
                this.canvasGrid[i][j] = new Square();
            }
        }
    }

    getSquare(x, y){
        return this.canvasGrid[Math.round(y/25)][Math.round(x/25)];
    }
}

class Duck{
    constructor() {
        this.width = 80
        this.height = 50;
        this.image = new Image(this.width, this.height);
        this.image.src = 'images/duck.png';
        this.x = canvas.width - this.width - rightBorder;
        this.y = 0 + topBorder;
        this.moveX = 0;
        this.moveY = 0;
        this.speed = 5;
    }

    move() {
        this.x += this.moveX;
        this.y += this.moveY;

        this.checkBoundaries();
        this.checkIfReachedStopPoint();
    }

    checkBoundaries() {
        let duckX = this.x + canvas.offsetLeft;
        let duckY = this.y + canvas.offsetTop;

        if(duckX + this.width > canvas.offsetLeft + canvas.width - rightBorder){
            this.x -= this.moveX;
            this.y -= this.moveY;

            this.moveX = 0;
            this.moveY = 0;

            return false;
        }

        return true;
    }

    draw(){
        context.drawImage(this.image, this.x, this.y);
    }

    contains(x, y){
        let duckX = duck.x + canvas.offsetLeft
        let duckY = duck.y + canvas.offsetTop;

        // if point is within duck's rectangle
        if(x <= duckX + duck.width && x >= duckX
            && y <= duckY + duck.height && y >= duckY){
            console.log('clicked');
        }
        return false;
    }

    checkIfReachedStopPoint() {
        // check if need to stop
        if (stopX != undefined && stopY != undefined) {

            let currentDistanceToStopPoint = squareOf(this.x + canvas.offsetLeft - stopX)
                + squareOf(this.y + canvas.offsetTop - stopY);
            let distanceAfterMove = squareOf(this.x + this.moveX + canvas.offsetLeft - stopX)
                + squareOf(this.y + this.moveY + canvas.offsetTop - stopY)
            if (distanceAfterMove > currentDistanceToStopPoint ) {
                this.moveX = 0;
                this.moveY = 0;
            }
        }
    }
}

// functions

function updateData(){
    duck.move();
    context.clearRect(0, 0, canvas.width, canvas.height);
    updateCanvas();
    requestAnimationFrame(updateData);
}

function updateCanvas(){
    duck.draw();
}

function pointInCanvas(x, y){
    if(x <= canvas.offsetLeft + canvas.width - rightBorder && x >= canvas.offsetLeft + leftBorder
    && y <= canvas.offsetTop + canvas.height - bottomBorder && y >= canvas.offsetTop + topBorder){
        return true;
    }

    return false;
}

function onDuckClick(mouseEvent){
    if(duck.contains(mouseEvent.x, mouseEvent.y)){
        console.log('clicked');
    }

    // move duck to where user clicks
    if(pointInCanvas(mouseEvent.x, mouseEvent.y)) {
        stopX = mouseEvent.x;
        stopY = mouseEvent.y;

        let duckX = duck.x + canvas.offsetLeft;
        let duckY = duck.y + canvas.offsetTop;
        let distanceToPoint = Math.sqrt(squareOf(duckX - stopX) + squareOf(duckY - stopY));

        duck.moveX = duck.speed * (mouseEvent.x - duckX) / distanceToPoint;
        duck.moveY = duck.speed * (mouseEvent.y - duckY) / distanceToPoint;
    }
    }

function squareOf(num){
    return num*num;
}

function myFunction(){
    console.log('hi');
}

// main
let gameGrid = new GameGrid();
let duck = new Duck();
requestAnimationFrame(updateData);
canvas.addEventListener("mousedown", onDuckClick);
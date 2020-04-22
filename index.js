let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
let stopX = undefined;
let stopY = undefined;


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
        this.x = canvas.width - this.width;
        this.y = 0;
        this.moveX = -3;
        this.moveY = 0;
    }

    move() {
        this.x += this.moveX;
        this.y += this.moveY;
        if (this.x < 0) {
            this.x = canvas.width - this.image.width;
        }
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
    if(x <= canvas.offsetLeft + canvas.width && x >= canvas.offsetLeft
    && y <= canvas.offsetTop + canvas.height && y >= canvas.offsetTop){
        return true;
    }

    return false;
}

function onDuckClick(mouseEvent){
    if(duck.contains(mouseEvent.x, mouseEvent.y)){
        console.log('clicked');
    }

    // move duck to where user clicks
    if(pointInCanvas(mouseEvent.x, mouseEvent.y)){
        stopX = mouseEvent.x;
        stopY = mouseEvent.y;
        let duckX = duck.x + canvas.offsetLeft;
        let duckY = duck.y + canvas.offsetTop;

        // y = mx + c
        let directionAngle = undefined;
        if(duckX - mouseEvent.x != 0){
            directionAngle = (duckY - mouseEvent.y) / (duckX - mouseEvent.x);
        }

        if(mouseEvent.x > duckX){
            duck.moveX =     3;
        }
        else{
            duck.moveX = -3;
        }

        duck.moveY = directionAngle * duck.moveX;
        console.log(duck.moveY);
    }
    else{
        console.log('wrong');
    }
}

function squareOf(num){
    return num*num;
}

// main
let gameGrid = new GameGrid();
let duck = new Duck();
requestAnimationFrame(updateData);
canvas.addEventListener("mousedown", onDuckClick);






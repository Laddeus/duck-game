let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
let stopX = undefined;
let stopY = undefined

leftBorder = 10;
rightBorder = 10;
topBorder = 30;
bottomBorder = 10;


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

        this.checkIfReachedStopPoint();
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

function adjustPointToCanvas(x,y,width,height)
{
    var newX, newY;
    newX = x;
    newY = y;
    // If to the RIGHT of workable area of canvas, make X coordinate = rightmost X coordinate possible
    if(x + width > canvas.offsetLeft + canvas.width - rightBorder - leftBorder) { newX = canvas.offsetLeft+canvas.width-rightBorder-width; }
    // and for LEFT
    if(x < canvas.offsetLeft + leftBorder) {   newX = canvas.offsetLeft+leftBorder;}
    // and for TOP (idk why but offset fucks it up!)
    if(y + height > canvas.offsetTop + canvas.height - bottomBorder) { newY = canvas.height+topBorder+bottomBorder-height; }
    // and for BOTTOM
    if(y < canvas.offsetTop + topBorder) {  newY = canvas.offsetTop+topBorder;}
    
    return { x:newX, y:newY }
    
}

function pointInCanvas(x, y){
    if(x <= canvas.offsetLeft + canvas.width - rightBorder && x >= canvas.offsetLeft + leftBorder
    && y <= canvas.offsetTop + canvas.height - bottomBorder && y >= canvas.offsetTop + topBorder){
        return true;
    }

    return false;
}

function onDuckClick(mouseEvent){
    
    var mousetmp = adjustPointToCanvas(mouseEvent.x, mouseEvent.y, 100,100);
    if(duck.contains(mouseEvent.x, mouseEvent.y)){
        console.log('clicked');
    }

    // move duck to where user clicks

        var adjustedMouse = adjustPointToCanvas(mouseEvent.x, mouseEvent.y, duck.width, duck.height);
        stopX = adjustedMouse.x;
        stopY = adjustedMouse.y;
        

        let duckX = duck.x + canvas.offsetLeft;
        let duckY = duck.y + canvas.offsetTop;
        let distanceToPoint = Math.sqrt(squareOf(duckX - stopX) + squareOf(duckY - stopY));

        duck.moveX = duck.speed * (stopX - duckX) / distanceToPoint;
        duck.moveY = duck.speed * (stopY - duckY) / distanceToPoint;
    
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
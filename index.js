let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');

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
    }

    move(){
        this.x += this.moveX;
        if(this.x < 0){
            this.x = canvas.width - this.image.width;
        }
    }

    draw(){
        context.drawImage(this.image, this.x, this.y);
    }

    contains(x, y){
        let duckX = duck.x + canvas.offsetLeft
        let duckY = duck.y + canvas.offsetTop;

        // if clicked on mouse
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

    if(pointInCanvas(mouseEvent.x, mouseEvent.y)){
        duck.x = mouseEvent.x - canvas.offsetLeft;
        duck.y = mouseEvent.y - canvas.offsetTop;
    }
    else{
        console.log('wrong');
    }
}

// main
let gameGrid = new GameGrid();
let duck = new Duck();
requestAnimationFrame(updateData);
canvas.addEventListener("mousedown", onDuckClick);






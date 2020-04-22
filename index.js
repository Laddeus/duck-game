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
        this.x = canvas.width - 80;
        this.y = 0;
        this.image = new Image(80, 50);
        this.image.src = 'images/duck.png';
    }


    draw(){
        context.drawImage(this.image, this.x, this.y);
    }
}

// functions

function updateData(){
    duck.draw();
    requestAnimationFrame(updateData);
}


// main

let gameGrid = new GameGrid();
let duck = new Duck();
requestAnimationFrame(updateData);






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
        this.canvasGrid = new Array(800 / 25);

        for (let i = 0; i < 800 / 25 ; i++) {
            this.canvasGrid[i] = new Array(600 / 25 );
            for (let j = 0; j < 600 / 25 ; j++) {
                this.canvasGrid[i][j] = new Square();
            }
        }
    }

    getSquare(x, y){
        return this.canvasGrid[Math.round(y/25)][Math.round(x/25)];
    }
}

// functions





// main
/*let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');*/

let squareSize = 25; // 25x25 god
let gameGrid = new GameGrid();
let someSquare = gameGrid.getSquare(42, 456);

for (let i = 0; i < gameGrid.canvasGrid.length; i++) {
    let index = gameGrid.canvasGrid[i].indexOf(someSquare);

    if(index != -1){
        console.log("found index" + index);
    }
}


/*let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');*/

let squareSize = 25; // 25x25
let canvasGrid = [];

for (let i = 0; i < 800 / 25 ; i++) {
    canvasGrid.push(new Array(600 / 25 ));
    for (let j = 0; j < 600 / 25; j++) {
        canvasGrid[i][j] = "test";
    }
}

for (let i = 0; i < canvasGrid.length; i++) {
    console.log(canvasGrid[i].toString());
}

squareWidth = 25;
squareHeight = 25;

class Square{
    constructor(x, y) {
        this.width = squareWidth;
        this.height = squareHeight;
        this.x = x;
        this.y = y;
        this.object = undefined;
        this.isTopLeft = false;
    }

    draw(){
        context.globalAlpha = 0.1;
        context.setLineDash([3, 3]);
        context.beginPath();
        context.rect(this.left() - canvas.offsetLeft, this.top() - canvas.offsetTop, this.width, this.height);
        context.stroke();
        context.globalAlpha = 1;
        context.setLineDash([0,0]);

        if(this.object != undefined && this.isTopLeft == true){
            this.object.draw();
        }
    }

    left(){
        return this.x;
    }

    right(){
        return this.x + this.width;
    }

    top(){
        return this.y;
    }

    bottom(){
        return this.y + this.height;
    }

    addObjectToSquare(object){
        this.object = object;
    }

    setTopLeft(bool){
        this.isTopLeft = bool;
    }
}

class GameGrid{
    constructor() {
        let gridRowSize = Math.round((canvas.height - bottomBorder - topBorder*2)/squareHeight);
        let gridColumnSize = Math.round((canvas.width - leftBorder - rightBorder)/squareWidth)

        this.canvasGrid = new Array(gridRowSize);
        for (let i = 0; i < gridRowSize ; i++) {
            this.canvasGrid[i]= new Array(gridColumnSize);
            for (let j = 0; j < gridColumnSize ; j++) {
                this.canvasGrid[i][j] = new Square(j*25 + canvas.offsetLeft + leftBorder, i*25 + canvas.offsetTop + topBorder*2);
            }
        }
    }

    getSquare(x, y){
        let adjustedY = Math.floor((y - canvas.offsetTop - topBorder*2)/squareHeight);
        let adjustedX = Math.floor((x - canvas.offsetLeft - leftBorder)/squareWidth);
        // console.log(adjustedY + ' ' + adjustedX);
        if(adjustedY < this.canvasGrid.length && adjustedY >= 0 && adjustedX >= 0 && adjustedX < this.canvasGrid[0].length) {
            return this.canvasGrid[adjustedY][adjustedX];
        }

        return undefined;
    }

    addObjectToGrid(object){
        let rows = object.height / squareHeight;
        let cols = object.width / squareWidth;
        let x = object.left();
        let y = object.top();

        let squareToOccupy = this.getSquare(x, y);
        squareToOccupy.addObjectToSquare(object);
        squareToOccupy.setTopLeft(true);

        x += squareWidth;
        for (y; y < object.top() + rows * squareHeight; y += squareHeight) {
            for (x; x < object.left() + cols-1 * squareWidth; x += squareWidth) {
                squareToOccupy = this.getSquare(x, y);
                squareToOccupy.addObjectToSquare(object);
            }
            x = object.left();
        }
    }
}
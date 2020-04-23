class Square{
    constructor(x, y) {
        this.width = 25;
        this.height = 25;
        this.x = x + this.width/2;
        this.y = y + this.height/2;
        this.object = undefined;
    }

    draw(){
        if(this.object != undefined){
            context.drawImage(this.object.image, this.left() - canvas.offsetLeft, this.top() - canvas.offsetTop)
        }
    }

    left(){
        return this.x - this.width/2;
    }

    right(){
        return this.x + this.width/2;
    }

    top(){
        return this.y - this.height/2;
    }

    bottom(){
        return this.y + this.height/2;
    }
}

class GameGrid{
    constructor() {
        let gridRowSize = Math.round((canvas.height - bottomBorder - topBorder)/25);
        let gridColumnSize = Math.round((canvas.width - leftBorder - rightBorder)/25)

        this.canvasGrid = new Array(gridRowSize);
        for (let i = 0; i < gridRowSize ; i++) {
            this.canvasGrid[i]= new Array(gridColumnSize);
            for (let j = 0; j < gridColumnSize ; j++) {
                this.canvasGrid[i][j] = new Square(j*25 + canvas.offsetLeft + leftBorder, i*25 + canvas.offsetTop + topBorder);
            }
        }
    }

    getSquare(x, y){
        return this.canvasGrid[Math.round(y/25)][Math.round(x/25)];
    }
}
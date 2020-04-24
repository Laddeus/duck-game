objectWidth = 25;
objectHeight = 25;

class Square{
    constructor(x, y) {
        this.width = objectWidth;
        this.height = objectHeight;
        this.x = x +this.width/2;
        this.y = y + this.height/2;
        this.object = undefined;
    }

    draw(){
        context.globalAlpha = 0.2;
        context.beginPath();
        context.rect(this.left() - canvas.offsetLeft, this.top() - canvas.offsetTop, this.width, this.height);
        context.stroke();
        context.globalAlpha = 1;
        if(this.object != undefined){
            this.object.draw();
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

    addObject(object){
        this.object = object;
        this.object.x = this.x;
        this.object.y = this.y;
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
                this.canvasGrid[i][j] = new Square(j*25 + canvas.offsetLeft + leftBorder , i*25 + canvas.offsetTop + topBorder);
            }
        }
    }

    getSquare(x, y){
        let adjustedY = Math.round((y - canvas.offsetTop - topBorder - objectHeight/2)/25);
        let adjustedX = Math.round((x -canvas.offsetLeft - leftBorder - objectWidth/2)/25);
        return this.canvasGrid[adjustedY][adjustedX];
    }
}
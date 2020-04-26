class Net{



    constructor() {
        this.x = -1;
        this.y = -1;
        this.width = 25 * SCALE;
        this.height = 75 * SCALE;
        this.image = new Image(this.width, this.height);
        this.image.src = 'images/duplicator.png';


    }
    destroy()
    {
        gameGrid.getSquare(this.x, this.y).object = undefined; 
        
    }
    
    draw(){
        
        if(currentHover == this) { 
            context.globalAlpha = 0.1;
            context.beginPath();
            context.moveTo(this.left() - canvas.offsetLeft, this.top() - canvas.offsetTop);
            context.lineTo(this.right() - canvas.offsetLeft, this.bottom() - canvas.offsetTop);
            context.stroke();

            context.beginPath();
            context.moveTo(this.left() - canvas.offsetLeft, this.bottom() - canvas.offsetTop);
            context.lineTo(this.right() - canvas.offsetLeft, this.top() - canvas.offsetTop);
            context.stroke();
        }
        
        context.drawImage(this.image, this.left() - canvas.offsetLeft, this.top() - canvas.offsetTop, this.width, this.height);
        context.globalAlpha = 1;
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



    breadCollide(bread){
        bread.destroy();
        Bread.spawnABread(this.x+this.width/2,this.y-(25*SCALE)/2);
        userScore -= 5;
        amountOfBreadCaught -= 1;
    }
}
class Bread{

    static allBreads = [];
    static count = 0;
    constructor(x, y) {
        Bread.count += 1;
        this.num = Bread.count;
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.moveX = 1;
        this.moveY = 0;
        this.image = new Image(this.width, this.height);
        this.image.src = 'images/bread.png';
    }

    step(){
        this.x += this.moveX;
        this.y += this.moveY;
    }

    stepBack(){
        this.x -= this.moveX;
        this.y -= this.moveY;
    }

    move(){
        this.step();
        if(this.x > canvas.offsetLeft + canvas.width - rightBorder - this.width){
            this.x = canvas.offsetLeft + leftBorder;
        }
    }

    draw(){
        context.beginPath();
        context.drawImage(this.image, this.x - canvas.offsetLeft, this.y - canvas.offsetTop);
        context.fillText(this.num.toString(), this.x - canvas.offsetLeft, this.y - canvas.offsetTop);
        context.stroke();
    }

    // check if bread intersects with another rectangular object
    intersects(object){
        if(this.x + this.width >= object.x && this.x <= object.x + object.width
        && this.y + this.height >= object.y && this.y <= object.y + object.height){
            return true;
        }

        return false;
    }

    destroy(){
        let indexOfBreadToDestroy = Bread.allBreads.indexOf(this);
        Bread.allBreads.splice(indexOfBreadToDestroy, 1);
        console.log('bread with id number ' + this.num + ' has been destroyed');
    }
}
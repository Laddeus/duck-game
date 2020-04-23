class Bread{

    static allBreads = [];
    constructor(x, y) {
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
        // if bread hit right wall of canvas
        if(this.right() > canvas.offsetLeft + canvas.width - rightBorder){
            this.destroy();
        }
    }

    draw(){
        context.beginPath();
        context.drawImage(this.image, this.left() - canvas.offsetLeft, this.top() - canvas.offsetTop);
        context.stroke();
    }

    // check if bread intersects with another rectangular object
    intersects(object){
        if(this.right() >= object.left() && this.left() <= object.right()
        && this.bottom() >= object.top() && this.top() <= object.bottom()){
            return true;
        }

        return false;
    }

    destroy(){
        Bread.count -= 1;
        let indexOfBreadToDestroy = Bread.allBreads.indexOf(this);
        Bread.allBreads.splice(indexOfBreadToDestroy, 1);
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
class Bread{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.moveX = 3;
        this.moveY = 0;
        this.image = undefined;
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
    }

    draw(){
        context.beginPath();
        context.rect(this.x - canvas.offsetLeft, this.y - canvas.offsetTop, this.width, this.height);
        context.stroke();
    }
}
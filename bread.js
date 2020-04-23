class Bread{

    static count = 0;
    constructor(x, y) {
        Bread.count += 1;
        this.num = Bread.count;
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.moveX = 0;
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
        context.fillText(this.num.toString(), this.x - canvas.offsetLeft, this.y - canvas.offsetTop);
        context.stroke();
    }
}
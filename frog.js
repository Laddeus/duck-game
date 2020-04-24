class Frog{
    constructor() {
        this.x = -1;
        this.y = -1;
        this.width = 25;
        this.height = 25;
        this.image = new Image(this.width, this.height);
    }

    draw(){
        context.beginPath();
        context.arc( this.x - canvas.offsetLeft,this.y - canvas.offsetTop,this.width/2, 0, 180);
        context.stroke();
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
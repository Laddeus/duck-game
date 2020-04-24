class Frog{
    constructor() {
        this.x = -1;
        this.y = -1;
        this.width = 50;
        this.height = 50;
        this.image = new Image(this.width, this.height);
        this.image.src = 'images/frog.png';
    }

    draw(){
        context.drawImage(this.image, this.left() - canvas.offsetLeft, this.top() - canvas.offsetTop);
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
    }
}
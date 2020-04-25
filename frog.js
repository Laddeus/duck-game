class Frog{
    constructor() {
        this.x = -1;
        this.y = -1;
        this.width = 50 * SCALE;
        this.height = 50 * SCALE;
        this.image = new Image(this.width, this.height);
        this.image.src = 'images/frog.png';
        this.sound = new Audio('sound/frogSound.mp3');
        setInterval(this.makeSound.bind(this), 5000);
    }

    draw(){
        context.drawImage(this.image, this.left() - canvas.offsetLeft, this.top() - canvas.offsetTop, this.width, this.height);
    }

    makeSound(){
        this.sound.play();
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
class Duck{
    constructor() {
        this.width = 80
        this.height = 50;
        this.image = new Image(this.width, this.height);
        this.image.src = 'images/duck.png';
        this.x = canvas.width / 2 + canvas.offsetLeft;
        this.y = canvas.height / 2 + canvas.offsetTop;
        this.moveX = 0;
        this.moveY = 0;
        this.speed = 5;
    }

    step(){
        this.x += this.moveX;
        this.y += this.moveY;
    }

    stepBack(){
        this.x -= this.moveX;
        this.y -= this.moveY;
    }

    stop(){
        this.moveX = 0;
        this.moveY = 0;
    }

    move() {
        this.step();
        this.checkIfReachedStopPoint();
    }

    draw(){
        context.drawImage(this.image, this.x - canvas.offsetLeft, this.y - canvas.offsetTop);
    }

    contains(x, y){
        // if point is within duck's rectangle
        if(x <= this.x + this.width && x >= this.x
            && y <= this.y + this.height && y >= this.y){

            return true;
        }

        return false;
    }

    checkIfReachedStopPoint() {
        // check if need to stop
        if (stopX != undefined && stopY != undefined) {

            let currentDistanceToStopPoint = squareOf(this.x - stopX)
                + squareOf(this.y - stopY);
            let distanceAfterStep = squareOf(this.x + this.moveX - stopX)
                + squareOf(this.y + this.moveY - stopY)
            if (distanceAfterStep > currentDistanceToStopPoint ) {
                this.stop();
            }
        }
    }

    breadCollide(bread){
        bread.destroy();
    }
}
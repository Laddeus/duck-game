class Duck{
    constructor() {
        this.width = 129;
        this.height = 53;
        this.image = new Image(this.width, this.height);
        this.image.src = 'images/duck.png';
        this.reverseImage = new Image(this.width, this.height);
        this.reverseImage.src = 'images/duckReverse.png';
        this.currentImage = this.image;
        this.x = canvas.width / 2 + canvas.offsetLeft;
        this.y = canvas.height / 2 + canvas.offsetTop;
        this.moveX = 0;
        this.moveY = 0;
        this.speed = 5;
        this.image
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
        context.drawImage(this.currentImage, this.x - canvas.offsetLeft, this.y - canvas.offsetTop);
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

            let currentDistanceToStopPoint = squareOf(this.x + this.width / 2 - stopX)
                + squareOf(this.y + this.height / 2- stopY);
            let distanceAfterStep = squareOf(this.x + this.width/2+ this.moveX - stopX)
                + squareOf(this.y +this.height/2 + this.moveY - stopY)
            if (distanceAfterStep > currentDistanceToStopPoint ) {
                this.stop();
            }
        }
    }

    breadCollide(bread){
        bread.destroy();
    }

    faceRight(){
        this.currentImage = this.reverseImage;
    }

    faceLeft(){
        this.currentImage = this.image;
    }
}
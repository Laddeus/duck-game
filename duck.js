class Duck{
    constructor(x, y, width, height, imageSrc, reverseImageSrc, imageJetSrc, reverseImageJetSrc, initialMoveX, initialMoveY, speed) {
        this.jetpack = false;
        this.width = width;
        this.height = height;
        this.image = new Image(this.width, this.height);
        this.image.src = imageSrc;
        this.reverseImage = new Image(this.width, this.height);
        this.reverseImage.src = reverseImageSrc;
        this.jetImage = new Image(this.width, this.height);
        this.jetImage.src = imageJetSrc;
        this.jetReverseImage = new Image(this.width, this.height);
        this.jetReverseImage.src = reverseImageJetSrc;    
        
        this.currentImage = this.image;
        this.x = x;
        this.y = y;
        this.moveX = initialMoveX;
        this.moveY = initialMoveY;
        this.speed = speed;
        this.stopX = undefined;
        this.stopY = undefined
    
    }

    step(){
        if(this.jetpack) {
            this.x += this.moveX;
            this.y += this.moveY;  
        }
        else {
            this.x += this.moveX/2;
            this.y += this.moveY/2;
        }
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
        context.drawImage(this.currentImage, this.left() - canvas.offsetLeft, this.top() - canvas.offsetTop);
    }

    contains(x, y){
        // if point is within duck's rectangle
        if(x <= this.x + this.width/2 && x >= this.x - this.width/2
            && y <= this.y + this.height/2 && y >= this.y - this.width/2){

            return true;
        }

        return false;
    }

    checkIfReachedStopPoint() {
        // check if need to stop
        if (this.stopX != undefined && this.stopY != undefined) {

            let currentDistanceToStopPoint = squareOf(this.x - this.stopX)
                + squareOf(this.y - this.stopY);
            let distanceAfterStep = squareOf(this.x + this.moveX - this.stopX)
                + squareOf(this.y + this.moveY - this.stopY)
            if (distanceAfterStep > currentDistanceToStopPoint ) {
                this.stop();
            }
        }
    }

    breadCollide(bread){
        bread.destroy();
    }

    faceRight(){
        if(this.jetpack) { this.currentImage = this.jetReverseImage;}
        else{ this.currentImage = this.reverseImage; }
    }

    faceLeft(){
        if(this.jetpack) { this.currentImage = this.jetImage;}
        else{ this.currentImage = this.image; }
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
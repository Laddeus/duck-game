class Turtle extends Duck{
    static allTurtles = [];
    constructor(x, y, width, height, imageSrc, reverseImageSrc, initialMoveX, initialMoveY, speed) {
        super(x, y, width, height, imageSrc, reverseImageSrc, initialMoveX, initialMoveY, speed);
    }

    static moveTurtlesToNearestBread(){
        for (let turtle of Turtle.allTurtles) {
            turtle.setDirectionToNearestBread();
            turtle.move();
        }
    }

    setDirectionToNearestBread() {
        let closestBread = this.getClosestBread();
        if(closestBread != undefined) {
            this.stopX = closestBread.x;
            this.stopY = closestBread.y;
            let distanceToClosestBread = this.getDistanceToBread(closestBread);

            this.moveX = this.speed * (this.stopX - this.x) / distanceToClosestBread;
            this.moveY = this.speed * (this.stopY - this.y) / distanceToClosestBread;
        }
        else{
            this.stop();
        }
    }

    getClosestBread(){
        if(Bread.allBreads.length == 0){
            return undefined;
        }
        let closestBread = Bread.allBreads[0];

        for (let i = 1; i < Bread.allBreads.length; i++) {
            let currentBread = Bread.allBreads[i];
            let distanceToCurrentBread = this.getSquaredDistanceToBread(currentBread);
            let distanceToClosestBread = this.getSquaredDistanceToBread(closestBread);

            if(distanceToCurrentBread < distanceToClosestBread){
                closestBread = currentBread;
            }
        }
        return closestBread;
    }


    getSquaredDistanceToBread(bread) {
        return squareOf(this.x - bread.x) + squareOf(this.y - bread.y);
    }

    getDistanceToBread(bread){
        return Math.sqrt(squareOf(this.x - bread.x) + squareOf(this.y - bread.y));
    }

    static drawTurtles(){
        for (let turtle of Turtle.allTurtles) {
            turtle.draw();
        }
    }
}
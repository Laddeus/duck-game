class Bread{

    static allBreads = [];
    static idOfSpawnBread = setInterval(Bread.spawnBread, 100); // no ID
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

    static drawBreads(){
        for (let bread of Bread.allBreads) {
            bread.draw();
        }
    }

    static moveBreads(){
        for (let bread of Bread.allBreads) {
            bread.move();
        }
    }

    static checkBreadCollisionWithObjects(){
        for (let bread of Bread.allBreads) {
            if(bread.intersects(duck)){
                duck.breadCollide(bread);
                userScore += 5;
                amountOfBreadCaught += 1;
            }

            let squareToCheckBottom = gameGrid.getSquare(bread.right(), bread.top());
            let squareToCheckTop = gameGrid.getSquare(bread.right(), bread.bottom());
            if(squareToCheckBottom != undefined && squareToCheckBottom.object != undefined) {
                squareToCheckBottom.object.breadCollide(bread);
                userScore += 5;
                amountOfBreadCaught += 1;
            }
            else if(squareToCheckTop != undefined && squareToCheckTop.object != undefined){
                squareToCheckTop.object.breadCollide(bread);
                userScore += 5;
                amountOfBreadCaught += 1;
            }

            for (let turtle of Turtle.allTurtles) {
                if(bread.intersects(turtle)){
                    turtle.breadCollide(bread);
                    userScore += 5;
                    amountOfBreadCaught += 1;
                }
            }
        }
    }

    static spawnBread(){
        let x = Math.random()*(canvas.width - rightBorder - leftBorder - 10) + canvas.offsetLeft + leftBorder;
        let y = Math.random()*(canvas.height - bottomBorder - topBorder - 10) + canvas.offsetTop + topBorder;
        Bread.allBreads.push(new Bread(x, y))
    }

    static startSpawnBread(){
        Bread.idOfSpawnBread = setInterval(Bread.spawnBread, 100);
    }

    static stopSpawnBread(){
        clearInterval(Bread.idOfSpawnBread);
    }
}

window.addEventListener('blur', Bread.stopSpawnBread);
window.addEventListener('focus', Bread.startSpawnBread);
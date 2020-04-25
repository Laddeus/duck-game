    class Duplicator{

    constructor() {
        this.x = -1;
        this.y = -1;
        this.storage = 0;
        this.width = 25 * SCALE;
        this.height = 25 * SCALE;
        this.image = new Image(this.width, this.height);
        this.image.src = 'images/duplicator.png';
        this.timer = setInterval(this.releaseBread.bind(this), 1000);
        
    }
    
    draw(){
        context.drawImage(this.image, this.left() - canvas.offsetLeft, this.top() - canvas.offsetTop, this.width, this.height);
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
    
    releaseBread(){
        if(this.storage > 0)
        {
            this.storage--;
            Bread.spawnABread(this.x+this.width,this.y+this.height/4);
        }


    }
    
    breadCollide(bread){
        bread.destroy();
        this.storage+=2;

        this.timer = setInterval(this.releaseBread.bind(this), 5000);
        // Bread.spawnABread(this.x+this.width,this.y+this.height/(3/2));
    }
}
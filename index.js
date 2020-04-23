// initialize variables
let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
canvas.scrollX =  0;
canvas.scrollY = -window.scrollY;
context.font = "10px Arial";
let stopX = undefined;
let stopY = undefined

leftBorder = 10;
rightBorder = 10;
topBorder = 30;
bottomBorder = 10;

// functions
function updateData(){
    duck.move();

    for (let bread of Bread.allBreads) {
        bread.move()

        if(bread.intersects(duck)){
            duck.breadCollide(bread);
        }
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    updateCanvas();
    requestAnimationFrame(updateData);
}

function updateCanvas(){
    for (let bread of Bread.allBreads) {
        bread.draw();
    }

    duck.draw();
}

function adjustPointToCanvas(x,y,width,height)
{
    let newX = x;
    let newY = y;
    // If to the RIGHT of workable area of canvas, make X coordinate = rightmost X coordinate possible
    if(x + width > canvas.offsetLeft + canvas.width - rightBorder - leftBorder)
    { newX = canvas.offsetLeft+canvas.width-rightBorder-width; }
    // and for LEFT
    if(x < canvas.offsetLeft + leftBorder) {   newX = canvas.offsetLeft+leftBorder;}
    // and for TOP (idk why but offset fucks it up!)
    if(y + height > canvas.offsetTop + canvas.height - bottomBorder) { newY = canvas.height+topBorder+bottomBorder-height; }
    // and for BOTTOM
    if(y < canvas.offsetTop + topBorder) {  newY = canvas.offsetTop+topBorder;}
    
    return { x:newX, y:newY }
    
}

function pointInCanvas(x, y){
    if(x <= canvas.offsetLeft + canvas.width - rightBorder && x >= canvas.offsetLeft + leftBorder
    && y <= canvas.offsetTop + canvas.height - bottomBorder && y >= canvas.offsetTop + topBorder){
        return true;
    }

    return false;
}

function onDuckClick(mouseEvent){

    if(duck.contains(mouseEvent.x, mouseEvent.y)){
        console.log('clicked');
    }

    // move duck to where user clicks

        let adjustedMouse = adjustPointToCanvas(mouseEvent.pageX, mouseEvent.pageY, duck.width, duck.height);
        stopX = adjustedMouse.x;
        stopY = adjustedMouse.y;

        let distanceToPoint = Math.sqrt(squareOf(duck.x - stopX) + squareOf(duck.y - stopY));

        duck.moveX = duck.speed * (stopX - duck.x) / distanceToPoint;
        duck.moveY = duck.speed * (stopY - duck.y) / distanceToPoint;
}

function squareOf(num){
    return num*num;
}

function myFunction(){
    console.log('hi');
}

// main
let gameGrid = new GameGrid();
let duck = new Duck();

for (let i = 0; i < 50 ; i++) {
    let x = Math.random()*(canvas.width - rightBorder - leftBorder - 10) + canvas.offsetLeft + leftBorder;
    let y = Math.random()*(canvas.height - bottomBorder - topBorder - 10) + canvas.offsetTop + topBorder;
    Bread.allBreads.push(new Bread(x, y))
}
requestAnimationFrame(updateData);

// event listeners
canvas.addEventListener("mousedown", onDuckClick);
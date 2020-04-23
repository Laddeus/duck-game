// initialize variables
let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
let stopX = undefined;
let stopY = undefined

leftBorder = 10;
rightBorder = 10;
topBorder = 30;
bottomBorder = 10;

// functions
function updateData(){
    duck.move();

    for (let bread of allBreads) {
        bread.move();
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    updateCanvas();
    requestAnimationFrame(updateData);
}

function updateCanvas(){
    duck.draw();

    for (let bread of allBreads) {
        bread.draw();
    }
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

    let mousetmp = adjustPointToCanvas(mouseEvent.x, mouseEvent.y, 100,100);
    if(duck.contains(mouseEvent.x, mouseEvent.y)){
        console.log('clicked');
    }

    // move duck to where user clicks

        let adjustedMouse = adjustPointToCanvas(mouseEvent.x, mouseEvent.y, duck.width, duck.height);
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
let allBreads = [];

for (let i = 0; i < 50 ; i++) {
    let x = Math.random()*(canvas.offsetLeft + canvas.width - rightBorder);
    let y = Math.random()*(canvas.offsetTop + canvas.height - bottomBorder);
    allBreads.push(new Bread(x, y))
}
requestAnimationFrame(updateData);

// event listeners
canvas.addEventListener("mousedown", onDuckClick);

// initialize variables
let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
/*canvas.scrollX =  0;
canvas.scrollY = -window.scrollY;*/
let stopX = undefined;
let stopY = undefined

leftBorder = 10;
rightBorder = 10;
topBorder = 50;
bottomBorder = 140;

let userScore = 0;
let timer = 0;
let amountOfBreadCaught = 0;
let scoreElement = document.getElementById('score');
let timerElement = document.getElementById('time');
let breadElement = document.getElementById('bread');

// functions
function updateData(){
    duck.move();

    for (let bread of Bread.allBreads) {
        bread.move()

        if(bread.intersects(duck)){
            duck.breadCollide(bread);
            userScore += 5;
            amountOfBreadCaught += 1;
        }
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    updateCanvas();
    updateUserScore();
    updateBreadCaught();
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
    // and for bottom (idk why but offset fucks it up!)
    if(y + height > canvas.offsetTop + canvas.height - bottomBorder) { newY = canvas.height+canvas.offsetTop-bottomBorder-height; }
    // and for top
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

function onCanvasClick(mouseEvent){

    if(duck.contains(mouseEvent.x, mouseEvent.y)){
        console.log('clicked');
    }
    


    // moves duck to where user clicks
    let adjustedMouse = adjustPointToCanvas(mouseEvent.pageX, mouseEvent.pageY, duck.width, duck.height);
    
    if(adjustedMouse.y > canvas.offsetTop + canvas.height-bottomBorder) { return console.log('clicked button area!');}
    
    stopX = adjustedMouse.x;
    stopY = adjustedMouse.y;

    let distanceToPoint = Math.sqrt(squareOf(duck.x - stopX) + squareOf(duck.y - stopY));

    duck.moveX = duck.speed * (stopX - duck.x) / distanceToPoint;
    duck.moveY = duck.speed * (stopY - duck.y) / distanceToPoint;

    if(duck.moveX > 0){
        duck.faceRight();
    }
    else{
        duck.faceLeft();
    }

}

function squareOf(num){
    return num*num;
}

function myFunction(){
    console.log('hi');
}

function updateUserScore() {
    scoreElement.textContent = 'Score: ' + userScore;
}

function updateBreadCaught(){
    breadElement.textContent = 'Bread: ' + amountOfBreadCaught;
}

function updateTimer() {
    let seconds = timer % 60;
    let minutes = (Math.floor(timer / 60))%60;
    let hours = Math.floor((Math.floor(timer / 60))/60);
    let timerText = 'Time: ' + (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes)
    + ':' + (seconds < 10 ? '0' + seconds : seconds)

    timerElement.textContent = timerText;

}

function spawnBread(){
    let x = Math.random()*(canvas.width - rightBorder - leftBorder - 10) + canvas.offsetLeft + leftBorder;
    let y = Math.random()*(canvas.height - bottomBorder - topBorder - 10) + canvas.offsetTop + topBorder;
    Bread.allBreads.push(new Bread(x, y))
    timer +=1;
    updateTimer();
}


// main
let gameGrid = new GameGrid();
let duck = new Duck();

requestAnimationFrame(updateData);
setInterval(spawnBread, 1000);

// event listeners
canvas.addEventListener("mousedown", onCanvasClick);
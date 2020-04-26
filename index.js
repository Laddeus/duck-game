// initialize variables
let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
context.font  = '30px ariel';
/*canvas.scrollX =  0;
canvas.scrollY = -window.scrollY;*/


// SCALE AND BORDERS
const SCALE = 1; 

let leftBorder = 10;
let rightBorder = 10;
let topBorder = 50;
let bottomBorder = 30;



let userScore = 0;
let timer = 0;
let amountOfBreadCaught = 0;
let scoreElement = document.getElementById('score');
let timerElement = document.getElementById('time');
let breadElement = document.getElementById('bread');

// functions
function updateData(){
    duck.move();
    Bread.moveBreads();
    Turtle.moveTurtlesToNearestBread();
    Bread.checkBreadCollisionWithObjects();

    context.clearRect(0, 0, canvas.width, canvas.height);
    updateCanvas();
    updateUserScore();
    updateBreadCaught();
    requestAnimationFrame(updateData);
}

function updateCanvas(){
    GameGrid.drawGameGrid();
    drawSigns();

    if(itemSelected != null){
        context.strokeStyle = 'black';
        itemSelected.draw();
        if(isWrongPositionOnGrid == true){
            context.strokeStyle = 'red';

            context.beginPath();
            context.moveTo(itemSelected.left() - canvas.offsetLeft, itemSelected.top() - canvas.offsetTop);
            context.lineTo(itemSelected.right() - canvas.offsetLeft, itemSelected.bottom() - canvas.offsetTop);
            context.stroke();

            context.beginPath();
            context.moveTo(itemSelected.left() - canvas.offsetLeft, itemSelected.bottom() - canvas.offsetTop);
            context.lineTo(itemSelected.right() - canvas.offsetLeft, itemSelected.top() - canvas.offsetTop);
            context.stroke();
        }
    }



    Bread.drawBreads();
    Turtle.drawTurtles();
    duck.draw();
}

function adjustPointToCanvas(x,y,width,height)
{
    let newX = x;
    let newY = y;
    // If to the RIGHT of workable area of canvas, make X coordinate = rightmost X coordinate possible
    if(x + width/2 > canvas.offsetLeft + canvas.width - rightBorder - leftBorder)
    { newX = canvas.offsetLeft+canvas.width-rightBorder-width/2; }
    // and for LEFT
    if(x < canvas.offsetLeft + leftBorder + width/2) {   newX = canvas.offsetLeft+leftBorder + width/2;}
    // and for bottom (idk why but offset fucks it up!)
    if(y + height/2 > canvas.offsetTop + canvas.height - bottomBorder) { newY = canvas.height+canvas.offsetTop-bottomBorder-height/2; }
    // and for top
    if(y < canvas.offsetTop + topBorder + height/2) {  newY = canvas.offsetTop+topBorder + height/2;}

    return { x:newX, y:newY }
}

/*function pointInCanvas(x, y){
    if(x <= canvas.offsetLeft + canvas.width - rightBorder && x >= canvas.offsetLeft + leftBorder
    && y <= canvas.offsetTop + canvas.height - bottomBorder && y >= canvas.offsetTop + topBorder){
        return true;
    }

    return false;
}*/

function onCanvasClick(mouseEvent){

    if(itemSelected != null){
        gameGrid.addObjectToGrid(itemSelected);
        itemSelected = null;
    }
    else if(mouseEvent.which === 3 && currentHover != null )
    {
        currentHover.destroy();
        currentHover = null;

        
    }
    else{
        // moves duck to where user clicks
        let adjustedMouse = adjustPointToCanvas(mouseEvent.pageX, mouseEvent.pageY, duck.width, duck.height);

        duck.stopX = adjustedMouse.x;
        duck.stopY = adjustedMouse.y;

        let distanceToPoint = Math.sqrt(squareOf(duck.x - duck.stopX) + squareOf(duck.y - duck.stopY));
        duck.moveX = duck.speed * (duck.stopX - duck.x) / distanceToPoint;
        duck.moveY = duck.speed * (duck.stopY - duck.y) / distanceToPoint;

        if(duck.moveX > 0){
            duck.faceRight();
        }
        else{
            duck.faceLeft();
        }

        //duck.makeSound();
    }
}

function squareOf(num){
    return num*num;
}

function drawSigns(){

    let dist = (canvas.width-leftBorder-rightBorder-signImage.width)/signCount;
    if(signCount > 0)
    {
        for (let i = 0; i < signCount; i++)
        {

            context.drawImage(signImage, leftBorder+i*dist, topBorder-20);

        }
    }
}


function updateUserScore() {
    scoreElement.textContent = 'Score: ' + userScore;
}

function updateBreadCaught(){
    breadElement.textContent = 'Bread: ' + amountOfBreadCaught;
}

function updateTimer() {
    timer +=1;

    let seconds = timer % 60;
    let minutes = (Math.floor(timer / 60))%60;
    let hours = Math.floor((Math.floor(timer / 60))/60);
    let timerText = 'Time: ' + (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes)
    + ':' + (seconds < 10 ? '0' + seconds : seconds)

    timerElement.textContent = timerText;

}

function onMouseMove(mouseEvent){
    if(itemSelected != null) {

        let lastRow = gameGrid.canvasGrid.length - 1;
        let lastColumn = gameGrid.canvasGrid[0].length - 1;
        let lastSquare = gameGrid.canvasGrid[lastRow][lastColumn];
        if(itemSelected.right() > lastSquare.right()
            || itemSelected.bottom() > lastSquare.bottom() ){
            isWrongPositionOnGrid= true;
        }
        else{
            isWrongPositionOnGrid = false;
        }
        let currentSquare = gameGrid.getSquare(mouseEvent.pageX, mouseEvent.pageY);
        if(currentSquare != undefined) {
            itemSelected.x = currentSquare.x;
            itemSelected.y = currentSquare.y;
        }
    }
    let currentSquare = gameGrid.getSquare(mouseEvent.pageX, mouseEvent.pageY);
    if(currentSquare != undefined && itemSelected == null) {
        currentHover = currentSquare.object;    
    }
}

function btnFrog(){
    if(itemSelected == null){
        itemSelected = new Frog();
    }
}
function btnNet(){
    if(itemSelected == null){
        itemSelected = new Net();
    }
}
function btnDuplicator(){
    if(itemSelected == null){
        itemSelected = new Duplicator();
    }
}

function btnJet(){
    duck.addJetpack();

}

function btnTurtle(){
    Turtle.allTurtles.push(new Turtle(canvas.width / 2 + canvas.offsetLeft,
        canvas.height / 2 + canvas.offsetTop,
        50, 50,
        'images/turtleReverse.png',
        'images/turtle.png',
        0, 0,
        1.2));
}

function btnBread(){
    
    signCount++;

}

// main
let gameGrid = new GameGrid();
let duck = new Duck(canvas.width / 2 + canvas.offsetLeft,
    canvas.height / 2 + canvas.offsetTop,
    93, 44,
    'images/duck.png',
    'images/duckReverse.png',
    0, 0,
    5,
);
requestAnimationFrame(updateData);

let itemSelected = null;
let currentHover = null;
let isWrongPositionOnGrid = false;

let idOfUpdateTimer = setInterval(updateTimer, 1000);
let signCount = 0;
let signImage = new Image(100, 50);
signImage.src = 'images/sign.png';

// event listeners
canvas.addEventListener("mousedown", onCanvasClick);
canvas.addEventListener('mousemove', onMouseMove);
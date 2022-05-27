const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width/2;
let y = canvas.height-100;
let speedx = 5;
let speedy = -5;
let ballRadius = 10;
let rectW = 100;
let rectH = 20;
let rectX = 450
let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

function drawRect(){
    ctx.beginPath;
    ctx.fillRect(rectX,430,rectW,rectH);
    ctx.fillStyle = 'red';
    ctx.fill()
    ctx.closePath
}

function border(){
    if(x + speedx > canvas.width || x + speedx < 0) {
        speedx = -speedx;
    }
    if(y + speedy > canvas.height || y + speedy < 0) {
        speedy = -speedy;
    }
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
        
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
        
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
        console.log("rightup")
        
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
        console.log("leftup")
    }
}

function moveRect(){
    if(rightPressed) {
        console.log("rightdown")
        rectX += 10;
        if (rectX + rectW > canvas.width){
            rectX = canvas.width - rectW;
        }
    }
    else if(leftPressed) {
        rectX -= 10;
        console.log("leftdown")
        if (rectX < 0){
            rectX = 0;
        }
    }    
}

function touchRect(){
    if(y>=430-ballRadius && x+speedx-ballRadius>rectX && x+speedx+ballRadius<rectX+rectW ){
        speedx = -speedx;
        speedy = -speedy;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawRect();
    moveRect();
    x+=speedx;
    y+=speedy;
    border();
    touchRect();
}
setInterval(draw, 10)



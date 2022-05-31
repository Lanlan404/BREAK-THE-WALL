//window
window.onload=function(){
const body= document.querySelector("body")
let W, H, AR;

function updateWH() {
    console.log('resizing...')
    W=window.innerWidth
    H=window.innerHeight
    AR=W/H
}
window.addEventListener("resize", updateWH)

function drawCanvas(){
    body.innerHTML=`<canvas id="myCanvas" width="${1900}" height="${900}"></canvas>
                    <div id="ath">
                        <button class="fullscreenbtn" type="button">Fullscreen</button>
                    </div>`      
}

updateWH()
drawCanvas()
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


//bouton fullscreen
const btn = document.querySelector(".fullscreenbtn")
btn.addEventListener("click",toggleFullScreen,false)

function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      }   

//ball 
let ballX = canvas.width/2;
let ballY = canvas.height-100;
let speedx = 5;
let speedy = -5;
let ballRadius = 10;
//rect
let rectW = canvas.width/10;
let rectH = canvas.height/25;
let rectX = canvas.width/2-rectW/2;
let rectY = canvas.height-rectH*1.5;
let rightPressed = false;
let leftPressed = false;
//bricks
let brickRowCount = 3;
let brickColumnCount = 9;
let brickWidth = 100;
let brickHeight = 50;
let brickPadding = 10;
let brickOffsetTop = 10;
let brickOffsetLeft = 10;
let bricks = [];
for(let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status:1};
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("touchstart", mobileTouch,false);
document.addEventListener("touchend",mobileStopTouch,false);



function drawBall(){
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

function touchBorder(){
    if(ballX + speedx > canvas.width || ballX + speedx < 0) {
        speedx = -speedx;
    }
    if(ballY + speedy > canvas.height || ballY + speedy < 0) {
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
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function mobileTouch(e){
    screenX = e.touches[0].screenX;
    if (screenX>canvas.width/2){
        rightPressed=true
    }
    if (screenX<=canvas.width/2){
        leftPressed=true
    }
}

function mobileStopTouch(e){
    rightPressed=false
    leftPressed=false
}

function drawRect(){
    ctx.beginPath;
    ctx.fillRect(rectX,rectY,rectW,rectH);
    ctx.fillStyle = 'red';
    ctx.fill()
    ctx.closePath
}

function moveRect(){
    if(rightPressed) {
        rectX += 10;
        if (rectX + rectW > canvas.width){
            rectX = canvas.width - rectW;
        }
    }
    else if(leftPressed) {
        rectX -= 10;
        if (rectX < 0){
            rectX = 0;
        }
    }    
}

function touchRect(){
    if(ballY>=rectY-ballRadius && ballX+speedx-ballRadius>rectX && ballX+speedx+ballRadius<rectX+rectW ){
        speedy = -speedy;
    }
}

function drawBricks(){
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            if (bricks[c][r].status === 1){
                let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.strokeRect(brickX,brickY,brickWidth,brickHeight)
                ctx.fillStyle = "green";
                ctx.strokeStyle = "white";
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

function touchBrick(){
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status===1){
                if(ballX > b.x && ballX < b.x+brickWidth && ballY > b.y && ballY < b.y+brickHeight) {
                    speedy = -speedy;
                    b.status = 0
                }    
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateWH();
    drawBall();
    drawRect();
    moveRect();
    drawBricks();
    ballX+=speedx;
    ballY+=speedy;
    touchBorder();
    touchRect();
    touchBrick();
}
setInterval(draw, 20)
}

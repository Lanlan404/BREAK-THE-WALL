window.onload=function(){
//////////////////////////////////////////////////window
const gameArea = document.getElementById('gameArea');
let AR = 16 / 9;
let W = window.innerWidth;
let H = window.innerHeight;
let newAR = W / H;
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
window.addEventListener('resize', resizeGame, false);
window.addEventListener('orientationchange', resizeGame, false);

function resizeGame() {
    if (newAR > AR) {
        W = H * AR;
        gameArea.style.height = H*.9+ 'px';
        gameArea.style.width = W *.9+ 'px';
        canvas.width = W;
        canvas.height = H;
    } 
    else {
        H = W / AR;
        gameArea.style.width = W *.9+ 'px';
        gameArea.style.height = H*.9 + 'px';
        canvas.width = H;
        canvas.height = W;
    }
}
resizeGame()

/////////////////////////////////////////////////////rect
let rectW = canvas.width/10;
let rectH = canvas.height/25;
let rectX = canvas.width/2-rectW/2;
let rectY = canvas.height-rectH*1.5;

let rectTopY=rectY
let rectTopW=rectW
let rectTopX=rectX
let rectTopH=1

let rectLeftY=rectY
let rectLeftW=1
let rectLeftX=rectX
let rectLeftH=rectH

let rectRightY=rectY
let rectRightW=1
let rectRightX=rectX+rectW
let rectRightH=rectH



function drawRect(){
    ctx.beginPath;
    ctx.fillRect(rectX,rectY,rectW,rectH);
    ctx.fillStyle = 'red';
    ctx.fill()
    ctx.closePath
}

///////////////////////////////////////////////////ball 
let ballRadius = canvas.width/100;
let ballX=rectX+(rectX/2)
let ballY = rectY-ballRadius
let speedx = canvas.width/200;
let speedy = -(canvas.height/200);
let life = 3
function drawBall(){
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
    ballX+=speedx;
    ballY+=speedy;
}

// function lostBall(){
//     if (life>0){
//         if (ballY+ballRadius>canvas.height){
//             life -= 1
//             ballX=rectX+(rectW/2)
//             ballY=rectY-ballRadius
//         }
//     }
//     if (life===0){
//     }
// }

/////////////////////////////////////////////////////bricks
let brickWidth = canvas.width/12;
let brickHeight = canvas.height/15;
let brickRowCount = 5;
let brickColumnCount = Math.floor(canvas.width/brickWidth);
let bricks = [];
for(let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status:1};
    }
}

function drawBricks(){
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            if (bricks[c][r].status === 1){
                let brickX = c*(brickWidth);
                let brickY = r*(brickHeight)
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

////////////////////////////////////////////////////////touch
function touchBorder(){
    if(ballX+speedx > canvas.width || ballX+speedx < 0) {
        speedx = -speedx;
    }
    if(ballY+speedy > canvas.height || ballY+speedy < 0) {
        speedy = -speedy;
    }
}

function touchRect(){
    //if(ballY+ballRadius>rectY && ballY-ballRadius<rectY+rectH && ballX+ballRadius>rectX && ballX-ballRadius<rectX+rectW ){
        if(ballY+ballRadius>rectTopY && ballY-ballRadius<rectTopY+rectTopH && ballX + ballRadius >rectTopX && ballX-ballRadius<rectTopX+rectTopW){ // rectTOP
            speedy = -speedy
        }
        else if(ballY+ballRadius>rectLeftY && ballY+ballRadius< rectLeftY+rectLeftH && ballX+ballRadius>rectLeftX && ballX-ballRadius< rectLeftX+rectLeftW){ //rectLEFT
            speedx = -speedx
         }
        else if(ballY+ballRadius>rectRightY && ballY+ballRadius< rectRightY+rectRightH && ballX+ballRadius>rectRightX && ballX-ballRadius< rectRightX+rectRightW){ //rectLEFT
            speedx = -speedx
         }
    //}
}

function touchBrick(){
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status===1){
                if(ballX+ballRadius > b.x && ballX-ballRadius < b.x+brickWidth && ballY+ballRadius > b.y && ballY-ballRadius < b.y+brickHeight) {
                    speedy = -speedy;
                    b.status = 0
                }    
            }
        }
    }
}


/////////////////////////////////////////////////////move
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("touchstart", mobileTouch,false);
document.addEventListener("touchend",mobileStopTouch,false);
let rightPressed = false;
let leftPressed = false;
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

function moveRect(){
    if(rightPressed) {
        rectX += canvas.width/175;
        if (rectX + rectW > canvas.width){
            rectX = canvas.width - rectW;
        }
    }
    else if(leftPressed) {
        rectX -= canvas.width/175;
        if (rectX < 0){
            rectX = 0;
        }
    }    
}



////////////////////draw
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawRect();
    moveRect();
    drawBricks();
    touchBorder();
    touchRect();
    touchBrick();
    //lostBall()
}
setInterval(draw, 16)
}

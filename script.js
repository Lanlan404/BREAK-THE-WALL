//window.onload=function(){
//////////////////////////////////////////////////window
const startMenu = document.getElementById('startMenu');
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
        startMenu.style.height = H*0.8 + 'px';
        startMenu.style.width = W + 'px';
        gameArea.style.height = H + 'px';
        gameArea.style.width = W + 'px';
        canvas.width = W;
        canvas.height = H;
    } 
    else {
        H = W / AR;
        startMenu.style.height = H*0.8 + 'px';
        startMenu.style.width = W + 'px';
        gameArea.style.height = H + 'px';
        gameArea.style.width = W + 'px';
        canvas.width = H;
        canvas.height = W;
    }
}
resizeGame()

/////////////////////////////////////////////////////rect
let rect ={
    w: canvas.width/10,
    h: canvas.height/25,
    x: canvas.width/2-(canvas.width/10)/2,
    y: canvas.height-(canvas.height/25)*1.5,
}

let rectTopDetector = {
    w:rect.w,
    h:1,
    x:rect.x,
    y:rect.y,
}

let rectLeftDetector = {
    w:1,
    h:rect.h,
    x:rect.x,
    y:rect.y,
}

let rectRightDetector ={
    w:1,
    h:rect.h,
    x:rect.x+rect.w,
    y:rect.y
}

function drawRect(){
    ctx.beginPath;
    ctx.fillRect(rect.x,rect.y,rect.w,rect.h);
    ctx.fillStyle = "red";
    ctx.fill()
    ctx.closePath
}

function touchRect(){    
    if(ball.x+ball.radius+ball.speedx > rectTopDetector.x &&
       ball.x-ball.radius+ball.speedx < rectTopDetector.x+rectTopDetector.w &&
       ball.y+ball.radius+ball.speedy > rectTopDetector.y &&
       ball.y-ball.radius+ball.speedy < rectTopDetector.y+rectTopDetector.h) {
        console.log("topRectDetector")
        ball.speedy = -ball.speedy
        }
    if((ball.x+ball.radius+ball.speedx > rectLeftDetector.x &&
        ball.x-ball.radius+ball.speedx < rectLeftDetector.x+rectLeftDetector.w &&
        ball.y+ball.radius+ball.speedy > rectLeftDetector.y &&
        ball.y-ball.radius+ball.speedy < rectLeftDetector.y+rectLeftDetector.h)||
       (ball.x+ball.radius+ball.speedx > rectRightDetector.x &&
        ball.x-ball.radius+ball.speedx < rectRightDetector.x+rectRightDetector.w &&
        ball.y+ball.radius+ball.speedy> rectRightDetector.y &&
        ball.y-ball.radius+ball.speedy< rectRightDetector.y+rectRightDetector.h)){
        console.log("sideRectDetector")
        ball.speedx = -ball.speedx
        }
}

///////////////////////////////////////////////////ball 
let ball ={
    radius: canvas.width/100,
    x: rect.x+rect.x/2,
    y: rect.y-canvas.width/100,
    speedx: canvas.width/200,
    speedy: -(canvas.height/200),
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
    ball.x+=ball.speedx;
    ball.y+=ball.speedy;
}

function touchBorder(){
    if(ball.x+ball.speedx > canvas.width || ball.x+ball.speedx < 0) {
        ball.speedx = -ball.speedx;
    }
    if(ball.y+ball.speedy > canvas.height || ball.y+ball.speedy < 0) {
        ball.speedy = -ball.speedy;
    }
}
// let life = 3
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
let brick ={
    w:canvas.width/12,
    h:canvas.height/15,
    x:0,
    y:0,
    rows:5,
    columns:Math.floor(canvas.width/(canvas.width/12))
}

let bricks = [];
for(let c=0; c<brick.columns; c++) {
    bricks[c] = [];
    for(let r=0; r<brick.rows; r++) {
        bricks[c][r] = { x: 0, y: 0, status:1}; 
    }
}

function drawBricks(){
    for(let c=0; c<brick.columns; c++) {
        for(let r=0; r<brick.rows; r++) {
            if (bricks[c][r].status === 1){
                brick.x = c*(brick.w);
                brick.y = r*(brick.h)
                bricks[c][r].x = brick.x;
                bricks[c][r].y = brick.y;
                ctx.beginPath();
                ctx.rect(brick.x, brick.y, brick.w, brick.h);
                ctx.strokeRect(brick.x,brick.y,brick.w,brick.h)
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
    for(var c=0; c<brick.columns; c++) {
        for(var r=0; r<brick.rows; r++) {
            var b = bricks[c][r];
            if (b.status===1){
                let brickTopDetector={
                    w:brick.w,
                    h:1,
                    x:b.x,
                    y:b.y,
                }
                
                let brickBottomDetector={
                    w:brick.w,
                    h:1,
                    x:b.x,
                    y:b.y+brick.h,
                }
                
                let brickLeftDetector={
                    w:1,
                    h:brick.h,
                    x:b.x,
                    y:b.y,
                }
                
                let brickRightDetector={
                    w:1,
                    h:brick.h,
                    x:b.x+brick.w,
                    y:b.y,
                }

                if (ball.x+ball.radius+ball.speedx > brickTopDetector.x &&
                    ball.x-ball.radius+ball.speedx < brickTopDetector.x+brickTopDetector.w &&
                    ball.y+ball.radius+ball.speedy > brickTopDetector.y &&
                    ball.y-ball.radius+ball.speedy < brickTopDetector.y+brickTopDetector.h){
                    console.log("brick top detector")
                    ball.speedy = -ball.speedy 
                    b.status = 0     
                    }
                if (ball.x+ball.radius+ball.speedx > brickBottomDetector.x &&
                    ball.x-ball.radius+ball.speedx < brickBottomDetector.x+brickBottomDetector.w &&
                    ball.y+ball.radius+ball.speedy > brickBottomDetector.y &&
                    ball.y-ball.radius+ball.speedy < brickBottomDetector.y+brickBottomDetector.h){
                    console.log("brick bottom detector")
                    ball.speedy = -ball.speedy
                    b.status = 0  
                    }
                if (ball.x+ball.radius+ball.speedx > brickLeftDetector.x &&
                    ball.x-ball.radius+ball.speedx < brickLeftDetector.x+brickLeftDetector.w &&
                    ball.y+ball.radius+ball.speedy > brickLeftDetector.y &&
                    ball.y-ball.radius+ball.speedy < brickLeftDetector.y+brickLeftDetector.h){
                    console.log("brick left detector")
                    ball.speedx = -ball.speedx
                    b.status = 0
                }
                if (ball.x+ball.radius+ball.speedx > brickRightDetector.x &&
                    ball.x-ball.radius+ball.speedx < brickRightDetector.x+brickRightDetector.w &&
                    ball.y+ball.radius+ball.speedy > brickRightDetector.y &&
                    ball.y-ball.radius+ball.speedy < brickRightDetector.y+brickRightDetector.h){
                    console.log("brick right detector")
                    ball.speedx = -ball.speedx
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
        rect.x += canvas.width/175;
        if (rect.x + rect.w > canvas.width){
            rect.x = canvas.width - rect.w;
        } 
    }
    else if(leftPressed) {
        rect.x -= canvas.width/175;
        if (rect.x < 0){
            rect.x = 0;
        }
    }  
    rectTopDetector.x=rect.x                        // Pourquoi dois-je redéclarer ici? l'initialisation des valeurs de l'objet ne se met pas a jour?
    rectLeftDetector.x=rect.x
    rectRightDetector.x=rect.x+rect.w 
}


////////////////////draw
let currentTime=0
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

const button = document.querySelector('.button');
button.addEventListener('click', pressButton, false);
const startBtn = document.getElementById('startBtn')
const pauseBtn = document.getElementById('pauseBtn')
const playBtn = document.getElementById('playBtn')
function pressButton(){
    let intervalID
    if(button.id==='startBtn'){
    startMenu.style.visibility = 'hidden';
    button.innerHTML = "PAUSE"
    button.id="pauseBtn"
    intervalID=setInterval(draw, 16)
    console.log("start!",button.id)
    }
    else if(button.id==='pauseBtn'){
        button.innerHTML = "PLAY"
        button.id = "playBtn"
        currentTime = currentTime
        console.log("pause!",button.id)
    }
    else if(button.id==='playBtn'){
        button.innerHTML = "PAUSE"
        button.id = 'pauseBtn'
        console.log("play!",button.id)
    }
    console.log(button.id,intervalID)
    
}


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
let rect ={
    w: canvas.width/10,
    h: canvas.height/25,
    x: canvas.width/2-(canvas.width/10)/2,
    y: canvas.height-(canvas.height/25)*1.5,
}

// let rectW = canvas.width/10;
// let rectH = canvas.height/25;
// let rectX = canvas.width/2-rectW/2;
// let rectY = canvas.height-rectH*1.5;

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

// let rectLeftY=rectY
// let rectLeftW=1
// let rectLeftX=rectX
// let rectLeftH=rectH

// let rectRightY=rectY
// let rectRightW=1
// let rectRightX=rectX+rectW
// let rectRightH=rectH

function drawRect(){
    ctx.beginPath;
    ctx.fillRect(rect.x,rect.y,rect.w,rect.h);
    ctx.fillStyle = "red";
    ctx.fill()
    ctx.closePath
}

///////////////////////////////////////////////////ball 
let ball ={
    radius: canvas.width/100,
    x: rect.x+rect.x/2,
    y: rect.y-canvas.width/100,
    speedx: canvas.width/200,
    speedy: -(canvas.height/200),
}


// let ballRadius = canvas.width/100;
// let ballX=rectX+(rectX/2)
// let ballY = rectY-ballRadius
// let speedx = canvas.width/200;
// let speedy = -(canvas.height/200);
let life = 3
function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
    ball.x+=ball.speedx;
    ball.y+=ball.speedy;
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
// let brick ={
//     w:canvas.width/12,
//     h:canvas.height/15,
// }


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
    if(ball.x+ball.speedx > canvas.width || ball.x+ball.speedx < 0) {
        ball.speedx = -ball.speedx;
    }
    if(ball.y+ball.speedy > canvas.height || ball.y+ball.speedy < 0) {
        ball.speedy = -ball.speedy;
    }
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

function touchBrick(){
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status===1){
                if(ball.x+ball.radius > b.x && ball.x-ball.radius < b.x+brickWidth && ball.y+ball.radius > b.y && ball.y-ball.radius < b.y+brickHeight) {
                    ball.speedy = -ball.speedy;
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

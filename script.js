//////////////////////////////////////////////////window
const startMenu = document.getElementById('startMenu');
const button = document.querySelector('.button');
const gameOver=document.getElementById('gameOver')
const finalScore=document.getElementById('finalScore')
let animation
const gameArea = document.getElementById('gameArea');
const AR = 16 / 9;
let W = window.innerWidth;
let H = window.innerHeight;
let newAR = W / H;

window.addEventListener('resize', resizeGame)
function resizeGame() {
    console.log("resize")
    W = window.innerWidth;
    H = window.innerHeight;
    newAR = W / H;
    console.log('ratio ecran:', newAR)
    let w, h
    if (newAR < AR) {
        console.log('r ecran < 16/9: calcul de h')
        w = W
        h = W / AR;
        canvas.style.width = '100vw'
        canvas.style.height = 'auto'
    } else {
        console.log('r ecran > 16/9: calcul de w')
        w = H * AR
        h = H; 
        canvas.style.width = 'auto'
        canvas.style.height = '100vh'
    }
    canvas.width = w;
    canvas.height = h;
  }
  resizeGame()

let lives = 3
function lostBall(){
    if (lives>0){
        if (ball.y+ball.radius>canvas.height){
            lives -= 1
            ball.x=canvas.width/2;
            ball.y=canvas.height-(canvas.height/25)*1.5-(canvas.width/100)
            ball.speedy=-(canvas.height/200);
            console.log("lives:",lives)
        }
    }
    if (lives===0){
        gameOver.style.visibility = 'visible'
        button.innerHTML="START"
        button.id="startBtn"
        finalScore.innerHTML=`SCORE : ${points} points`
        animation=false
    }
}

let points = 0

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
    rect.rectTopDetector.x=rect.x
    rect.rectLeftDetector.x=rect.x
    rect.rectRightDetector.x=rect.x+rect.w 
}
///////////////////////////////button

button.addEventListener('click', pressButton, false);

function pressButton(){
    if(button.id==='startBtn'){
    start()
    animation=true
    startMenu.style.visibility = 'hidden';
    gameOver.style.visibility='hidden';
    button.innerHTML = "PAUSE"
    button.id="pauseBtn"
    console.log("start!",button.id)
    draw()
    }
    else if(button.id==='pauseBtn'){
        animation=false
        button.innerHTML = "PLAY"
        button.id = "playBtn"
        console.log("pause!",button.id)
    }
    else if(button.id==='playBtn'){
        animation=true
        button.innerHTML = "PAUSE"
        button.id = 'pauseBtn'
        console.log("play!",button.id)
        draw()
    }
}

////////////////////draw
function draw() {
    let intervalID
    if(animation===true){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ball.drawBall();
        ball.touchBorder();
        rect.drawRect();
        moveRect();
        rect.touchRect();
        console.log("bricks",bricks)
        
        bricks.forEach((brick) => {
            brick.drawBricks();
            brick.touchBrick();
        })

        lostBall();
    }
    else{
        clearInterval(intervalID)
        return false;}   
}

intervalID=setInterval(draw,16)

let bricks = []
let b =''

function start(){
    ball = new Ball()
    rect = new Rect()
    for(let c=0; c<12; c++) {
        //bricks[c] = [];
        for(let r=0; r<5; r++) {
            let brick=new Brick()
            //let brick = bricks[c][r]
            brick.x=brick.x+brick.w*c
            brick.y=brick.y+brick.h*r
            brick.brickTopDetector={
                w:brick.w,
                h:1,
                x:brick.x,
                y:brick.y,
            }
                
            brick.brickBottomDetector={
                w:brick.w,
                h:1,
                x:brick.x,
                y:brick.y+brick.h,
            }
                
            brick.brickLeftDetector={
                w:1,
                h:brick.h,
                x:brick.x,
                y:brick.y,
            }
                
            brick.brickRightDetector={
                w:1,
                h:brick.h,
                x:brick.x+brick.w,
                y:brick.y,
            }
            brick.drawBricks()

            bricks.push(brick)
        }
        
    }
    lives=3
}

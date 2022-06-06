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
const actualscore = document.getElementById("score")
const remainingLives = document.getElementById("lives")
function draw() {
    let intervalID
    if(animation===true){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ball.drawBall();
        ball.touchBorder();
        rect.drawRect();
        moveRect();
        rect.touchRect();
        bricks.forEach((brick) => {
            brick.drawBricks();
            brick.touchBrick();
            brick.drawBonus();
            brick.touchBonus();
        })
        lostBall();
        actualscore.innerHTML =`SCORE : ${points}`
        remainingLives.innerHTML=`LIVES : ${lives}`
    }
    else{
        clearInterval(intervalID)
        return false;}   
}

intervalID=setInterval(draw,16)

let bricks = []
//let b =''

function start(){
    points=0
    ball = new Ball()
    rect = new Rect()
    for(let c=0; c<12; c++) {
        for(let r=0; r<5; r++) {
            let brick=new Brick()
            brick.x=brick.x+brick.w*c
            brick.y=brick.y+brick.h*r
            brick.bonus={
                x:brick.x+brick.w/2,
                y:brick.y+brick.h/2,
                radius:canvas.width/100,
                speedy:canvas.height/400,
                status:0,
            }
            brick.bonusX=brick.x+brick.w/2
            brick.bonusY=brick.y+brick.h/2
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


let bonusArr=[
    function largeRect(){
        console.log("largeRect")
        rect.w+=canvas.width/10
        rect.rectTopDetector.w+=canvas.width/10
    },
    // function smallRect(){
    //     console.log("smallRect")
    // },
    // function speedRect(){
    //     console.log("speedRect")
    // },
    // function slowRect(){
    //     console.log("slowRect")
    // },
    // function largeBall(){
    //     console.log("largeBall")
    // },
    // function smallBall(){
    //     console.log("smallBall")
    // },
    // function speedBall(){
    //     console.log("speedBall")
    // },
    // function smallBall(){
    //     console.log("smallBall")
    // },
    // function doublePoints(){
    //     console.log("doublePoints")
    // }
]

function pickBonus(){
    let dice = Math.floor(Math.random()*2)
    if (dice===1){
            let randomIndex =Math.floor(Math.random()*bonusArr.length) 
            console.log("dice=",dice ,"BONUS!")
            return bonusArr[randomIndex]()
        
    }
    else{
        console.log("dice=",dice ,"NO BONUS!")
        return false
    }
}


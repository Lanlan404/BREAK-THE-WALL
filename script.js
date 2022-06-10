//html Elements
const gameArea = document.getElementById('gameArea');
const startMenu = document.getElementById('startMenu');
const button = document.querySelector('.button');
const controlPage = document.getElementById('controlPage')
const gameOver=document.getElementById('gameOver');
const youWin=document.getElementById('youWin');
const finalScore=document.querySelector('.finalScore')
const actualscore = document.getElementById("score")
const remainingLives = document.getElementById("lives")
const bonusEl=document.getElementById('bonus')
const volumeDownBtn=document.getElementById('volumeDown')
const volumeUpBtn=document.getElementById('volumeUp')
const controlsBtn=document.getElementById('controlsBtn')


//event Listeners
window.addEventListener('resize', resizeGame);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("touchstart", mobileTouch,false);
document.addEventListener("touchend",mobileStopTouch,false);
button.addEventListener('click', pressMainBtn);
volumeDownBtn.addEventListener('click', volumeDown);
volumeUpBtn.addEventListener('click',volumeUp);
controlsBtn.addEventListener('click', showControls,false);




//variables
const AR = 16 / 9;
let W = window.innerWidth;
let H = window.innerHeight;
let newAR = W / H;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let animation
let lives = 3
let points
let bricks = []
let bonusInt
let hiddenControls = 1


//sounds
let boing = new Audio("sounds/boing.mp3")
let cri = new Audio("sounds/cri.mp3")
let pop = new Audio("sounds/pop.mp3")
let ooh = new Audio("sounds/ooh.mp3")
let bouh = new Audio("sounds/bouh.mp3")
let ouais = new Audio("sounds/ouais.mp3")
let pouet = new Audio("sounds/pouet.mp3")
let mariocoin = new Audio("sounds/mario-coin.mp3")


// sizing
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
        canvas.style.width = '90vw'
        canvas.style.height = 'auto'
    } else {
        console.log('r ecran > 16/9: calcul de w')
        w = H * AR
        h = H; 
        canvas.style.width = 'auto'
        canvas.style.height = '80vh'
    }
    canvas.width = w;
    canvas.height = h;
  }
resizeGame()


// win/lose
function lostBall(){
     if (lives>0){
        if (ball.y+ball.radius>canvas.height){
            lives -= 1
            clearTimeout(largRectInt)
            clearTimeout(smallRectInt)
            clearTimeout(speedRectInt)
            clearTimeout(slowRectInt)
            clearTimeout(largeBallInt)
            clearTimeout(extraLifeInt)
            clearTimeout(slowBallInt)
            clearTimeout(speedBallInt)
            clearTimeout(smallBallInt)
            bonusEl.innerHTML="NO BONUS"
            ball = new Ball
            ooh.play()
        } 
    }
    else if (lives===0){
        gameOver.style.visibility = 'visible'
        button.innerHTML="NEW GAME"
        button.id="newGameBtn"
        finalScore.innerHTML=`SCORE : ${points} points`
        animation=false
        bouh.play()
    }
            
}

function winGame(){
    if (points===60){
        youWin.style.visibility='visible'
        button.innerHTML="NEW GAME"
        button.id="newGameBtn"
        finalScore.innerHTML=`SCORE : ${points} points`
        animation=false
        ouais.play()
    }
}


// move
function keyDownHandler(e) {
    if(e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
        e.preventDefault()
    }
    else if(e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;    
        e.preventDefault()
    }
    else if (e.key === "Up" || e.key=== "ArrowUp"){
        upPressed = true
        e.preventDefault()
    }
    else if (e.key === ','){
        volumeDown();
        e.preventDefault()
    }
    else if (e.key === ';'){
        volumeUp()
        e.preventDefault()
    }
}

function keyUpHandler(e) {
    if(e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
    else if (e.key === "Up" || e.key === "ArrowUp"){
        upPressed = false
    }
    else if (e.key === ','){
        return false
    }
    else if (e.key === ';'){
        return false
    }
}

function mobileTouch(e){
    screenX = e.touches[0].screenX;
    if (screenX>canvas.width/2){
        rightPressed=true
        upPressed=true
    }
    if (screenX<=canvas.width/2){
        leftPressed=true
        upPressed=true
    }
}

function mobileStopTouch(e){
    rightPressed=false
    leftPressed=false
    upPressed=false
}

function moveRect(){
    if(rightPressed) {
        rect.x += rect.speedx
        if (rect.x + rect.w +rect.speedx > canvas.width){
            rect.x = canvas.width - rect.w;
        } 
    }
    else if(leftPressed) {
        rect.x -= rect.speedx
        if (rect.x < 0){
            rect.x = 0;
        }
    }  
    rect.rectTopDetector.x=rect.x
    rect.rectLeftDetector.x=rect.x
    rect.rectRightDetector.x=rect.x+rect.w 
}

// interface
function pressMainBtn(){
    if(button.id==='startBtn'){
    start()
    animation=true
    startMenu.style.visibility = 'hidden';
    gameOver.style.visibility='hidden';
    button.innerHTML = "PAUSE"
    button.id="pauseBtn"
    console.log("start!",button.id)
    mariocoin.play()
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
    else if (button.id==="newGameBtn"){
        location.reload()
    }
}

function volumeDown(){
    console.log("volumeDown")
    boing.volume-=0.1
    bouh.volume-=0.1
    cri.volume-=0.1
    ooh.volume-=0.1
    ouais.volume-=0.1
    pop.volume-=0.1
    pouet.volume-=0.1
    mariocoin.volume-=0.1
    pop.play()
    console.log("volume=",pop.volume)
}

function volumeUp(){
    console.log("volumeUp")
    boing.volume+=0.1
    bouh.volume+=0.1
    cri.volume+=0.1
    ooh.volume+=0.1
    ouais.volume+=0.1
    pop.volume+=0.1
    pouet.volume+=0.1
    mariocoin.volume+=0.1
    pop.play()
    console.log("volume=",pop.volume)
}

function showControls(){
    console.log("showcontrols")
    if (hiddenControls===1){
        controlPage.style.visibility = "visible"
        hiddenControls=0
        animation=false
    }
    else if (hiddenControls===0){
        controlPage.style.visibility = "hidden"
        hiddenControls=1
    }

}

//game
function start(){
    points=0
    ball = new Ball()
    rect = new Rect()
    for(let c=0; c<12; c++) {
        for(let r=0; r<5; r++) {
            let brick=new Brick()
            brick.x=brick.x+brick.w*c
            brick.y=brick.y+brick.h*r
            // brick.bonus = new Bonus(brick.x+brick.w/2, brick.y+brick.h/2, ...)
            brick.bonus={
                x:brick.x+brick.w/2,
                y:brick.y+brick.h/2,
                radius:canvas.width/100,
                speedy:canvas.height/400,
                status:0,
                animation:0
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
    
    lives=3;
}

function draw() {
    let intervalID
    let requestID
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
        winGame();
        actualscore.innerHTML =`SCORE : ${points}`
        remainingLives.innerHTML=`LIVES : ${lives}`
        ball.checkBallAnimation()
        if (ball.animation===true){
            ball.moveBall();
            }
    }
    else{
        clearInterval(intervalID)
        // cancelAnimationFrame(requestID)
        return false;}
        // requestID=window.requestAnimationFrame(draw)   
}
intervalID=setInterval(draw,16)



// bonus
let largRectInt
let smallRectInt
let speedRectInt
let slowRectInt
let largeBallInt
let extraLifeInt
let slowBallInt
let speedBallInt
let smallBallInt

let bonusArr=[
    function largeRect(){
        console.log("largeRect")
        rect.w*=1.5
        rect.rectTopDetector.w*=1.5
        bonusEl.innerHTML="PADDLE SIZE +"
        if (largRectInt){
            clearTimeout(largRectInt)
        }
        largRectInt=setTimeout(function(){
            rect.w=canvas.width/10;
            rect.rectTopDetector.w=canvas.width/10;
            bonusEl.innerHTML="NO BONUS"
        },7500)
    },
    function smallRect(){
        console.log("smallRect")
        bonusEl.innerHTML="PADDLE SIZE -"
        rect.w/=1.5
        rect.rectTopDetector.w/=1.5
        if (smallRectInt){
            clearTimeout(smallRectInt)
        }
        smallRectInt=setTimeout(function(){
            rect.w=canvas.width/10;
            rect.rectTopDetector.w=canvas.width/10;
            bonusEl.innerHTML="NO BONUS"
        },7500)
    },
    function speedRect(){
        console.log("speedRect")
        bonusEl.innerHTML="PADDLE SPEED+"
        rect.speedx*=2
        if (speedRectInt){
            clearTimeout(speedRectInt)
        }
        speedRectInt=setTimeout(function(){
            rect.speedx=canvas.width/150
            bonusEl.innerHTML="NO BONUS"
        },7500)
    },
    function slowRect(){
        console.log("slowRect")
        bonusEl.innerHTML="PADDLE SPEED-"
        rect.speedx/=2
        if (slowRectInt){
            clearTimeout(slowRectInt)
        }
        bonusInt=setTimeout(function(){
            rect.speedx=canvas.width/150
            bonusEl.innerHTML="NO BONUS"
        },7500)
    },
    function largeBall(){
        console.log("largeBall")
        bonusEl.innerHTML="BALL SIZE +"
        ball.radius*=2
        if (largeBallInt){
            clearTimeout(largeBallInt)
        }
        largeBallInt=setTimeout(function(){
            ball.radius = canvas.width/80;
            bonusEl.innerHTML="NO BONUS"
        },7500)
    },
    function smallBall(){
        console.log("smallBall") 
        bonusEl.innerHTML="BALL SIZE -"
        ball.radius/=2
        if (smallBallInt){
            clearTimeout(smallBallInt)
        }
        smallBallInt=setTimeout(function(){
            ball.radius = canvas.width/80;
            bonusEl.innerHTML="NO BONUS"
        },7500)
    },
    function speedBall(){
        console.log("speedBall")
        bonusEl.innerHTML="BALL SPEED +"
        ball.speedx*=2
        ball.speedy*=2
        if (speedBallInt){
            clearTimeout(speedBallInt)
        }
        speedBallInt=setTimeout(function(){
            ball.speedx/=2
            ball.speedy/=2
            bonusEl.innerHTML="NO BONUS"
        },7500)
    },
    function slowBall(){
        console.log("slowBall")
        bonusEl.innerHTML="BALL SPEED -"
        ball.speedx/=2
        ball.speedy/=2
        if (slowBallInt){
            clearTimeout(slowBallInt)
        }
        slowBallInt=setTimeout(function(){
            ball.speedx*=2
            ball.speedy*=2
            bonusEl.innerHTML="NO BONUS"
        },6000)
    },
    function extraLife(){
        console.log("extraLife")
        
        bonusEl.innerHTML="EXTRA LIFE"
        lives+=1
        if(extraLifeInt){
            clearTimeout(extraLifeInt)
        }
        extraLifeInt=setTimeout(function(){
            bonusEl.innerHTML="NO BONUS"
        },4000)
    }
]

function pickBonus(){
    let randomIndex = Math.floor(Math.random()*bonusArr.length) 
    console.log("pickbonus!",bonusArr[randomIndex])
    return bonusArr[randomIndex]() 
}


// class Bonus {
//     constructor(x, y, ...) {
//         this.x = x
//         this.y = 
//         this.speedy
//         this.status = 

//         this.int = undefined
//     }
//     draw() {}
//     on() {}
//     off() {}
// }

// const bonuses = {
//     'large': {
//         int: undefined,
//         on: function () {
//             rect.w+=canvas.width/10
//             rect.rectTopDetector.w+=canvas.width/10

//             if (this.int) clearTimeout(this.int)

//             this.int=setTimeout(this.off,10000)
//         },
//         off: function () {
//             rect.w=Rect.PLATEFORM_WIDTH
//             rect.rectTopDetector.w=Rect.PLATEFORM_WIDTH
//         },
//     },
//     // ...
// }







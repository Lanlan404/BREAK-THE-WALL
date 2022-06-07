const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

class Ball {
    constructor() {
        this.x = canvas.width/2;
        this.y = canvas.height-(canvas.height/25)*1.5-(canvas.width/100)
        this.radius = canvas.width/80;
        this.speedx= canvas.width/200;
        this.speedy=-(canvas.height/200);
    }
    drawBall(){
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
        this.x+=this.speedx;
        this.y+=this.speedy;
    }
    
    touchBorder(){
        if(this.x+this.speedx > canvas.width || this.x+this.speedx < 0) {
            this.speedx = -this.speedx;
        }
        if(this.y+this.speedy > canvas.height || this.y+this.speedy < 0) {
            this.speedy = -this.speedy;
        }
    }
}

class Rect {
    constructor(){
        this.w=canvas.width/10;
        this.h=canvas.height/25;
        this.x=canvas.width/2-(canvas.width/10)/2;
        this.y=canvas.height-(canvas.height/25)*1.5;
        this.speedx=canvas.width/150

        this.rectTopDetector= {
            w:this.w,
            h:1,
            x:this.x,
            y:this.y,
        }

        this.rectLeftDetector = {
            w:1,
            h:this.h,
            x:this.x,
            y:this.y,
        }
        this.rectRightDetector ={
            w:1,
            h:this.h,
            x:this.x+this.w,
            y:this.y
        }
    }
    
    drawRect(){
        ctx.fillStyle = "blue";
        ctx.strokeStyle = "white";
        ctx.lineWidth = "3";
        ctx.fillRect(this.x,this.y,this.w,this.h);
        ctx.strokeRect(this.x,this.y,this.w,this.h);
    }
    touchRect(){
        if(ball.x+ball.radius+ball.speedx > this.rectTopDetector.x &&
           ball.x-ball.radius+ball.speedx < this.rectTopDetector.x+this.rectTopDetector.w &&
           ball.y+ball.radius+ball.speedy > this.rectTopDetector.y &&
           ball.y-ball.radius+ball.speedy < this.rectTopDetector.y+this.rectTopDetector.h) {
            //console.log("topRectDetector")
            ball.speedy = -ball.speedy
            cri.play();
            }
        if((ball.x+ball.radius+ball.speedx > this.rectLeftDetector.x &&
            ball.x-ball.radius+ball.speedx < this.rectLeftDetector.x+this.rectLeftDetector.w &&
            ball.y+ball.radius+ball.speedy > this.rectLeftDetector.y &&
            ball.y-ball.radius+ball.speedy < this.rectLeftDetector.y+this.rectLeftDetector.h)||
           (ball.x+ball.radius+ball.speedx > this.rectRightDetector.x &&
            ball.x-ball.radius+ball.speedx < this.rectRightDetector.x+this.rectRightDetector.w &&
            ball.y+ball.radius+ball.speedy > this.rectRightDetector.y &&
            ball.y-ball.radius+ball.speedy < this.rectRightDetector.y+this.rectRightDetector.h)){
            //console.log("sideRectDetector")
            ball.speedx = -ball.speedx
            cri.play()
            }
    }
}

class Brick{
    constructor(){
        this.w=canvas.width/12;
        this.h=canvas.height/15;
        this.x=0;
        this.y=0;
        this.rows=5;
        this.columns=Math.floor(canvas.width/(canvas.width/12))
        this.status=1
        // this.bonusX= this.x+this.w/2;
        // this.bonusY = this.y+this.h/2;
        // this.bonusRadius= canvas.width/100;
        // this.bonusSpeedy=canvas.height/200;
        // this.bonusStatus=1;
        // this.bricks=[]
        // for(let c=0; c<this.columns; c++) {
        //     this.bricks[c] = [];
        //     for(let r=0; r<this.rows; r++) {
        //         this.bricks[c][r] = { x: 0, y: 0, status:1}; 
        //         this.b = this.bricks[c][r];
        //         this.brickTopDetector={
        //             w:this.w,
        //             h:1,
        //             x:this.b.x,
        //             y:this.b.y,
        //         }
                    
        //         this.brickBottomDetector={
        //             w:this.w,
        //             h:1,
        //             x:this.b.x,
        //             y:this.b.y+this.h,
        //         }
                    
        //         this.brickLeftDetector={
        //             w:1,
        //             h:this.h,
        //             x:this.b.x,
        //             y:this.b.y,
        //         }
                    
        //         this.brickRightDetector={
        //             w:1,
        //             h:this.h,
        //             x:this.b.x+this.w,
        //             y:this.b.y,
        //         }
        //     }
        // }
    }       
     
            
    drawBricks(){
        if (this.status === 1){
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.w, this.h);
            ctx.strokeRect(this.x,this.y,this.w,this.h)
            ctx.fillStyle = "rgb(178,34,34)";
            ctx.lineWidth ="2";
            ctx.strokeStyle = "white";
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
    }
    
    rollDice(){
        let dice = Math.floor(Math.random()*6)
        console.log("dice=",dice)
        if (dice===1){
            this.bonus.status=1
            console.log("BONUS!")
        }
        else{
            //console.log("NO BONUS!")
            return false
            
        }
    }

    touchBrick(){
        // let touchBrick=false
        if (this.status === 1){
            if (ball.x+ball.radius+ball.speedx > this.brickTopDetector.x &&
                ball.x-ball.radius+ball.speedx < this.brickTopDetector.x+this.brickTopDetector.w &&
                ball.y+ball.radius+ball.speedy > this.brickTopDetector.y &&
                ball.y-ball.radius+ball.speedy < this.brickTopDetector.y+this.brickTopDetector.h){
                //console.log("brick top detector")
                ball.speedy = -ball.speedy 
                this.status = 0 
                points +=1
                this.rollDice()
                boing.currentTime=0
                boing.play()
            }
            else if (ball.x+ball.radius+ball.speedx > this.brickBottomDetector.x &&
                ball.x-ball.radius+ball.speedx < this.brickBottomDetector.x+this.brickBottomDetector.w &&
                ball.y+ball.radius+ball.speedy > this.brickBottomDetector.y &&
                ball.y-ball.radius+ball.speedy < this.brickBottomDetector.y+this.brickBottomDetector.h){
                //console.log("brick bottom detector")
                ball.speedy = -ball.speedy
                this.status = 0 
                points +=1
                this.rollDice()
                boing.currentTime=0
                boing.play()
            }
            else if (ball.x+ball.radius+ball.speedx > this.brickLeftDetector.x &&
                ball.x-ball.radius+ball.speedx < this.brickLeftDetector.x+this.brickLeftDetector.w &&
                ball.y+ball.radius+ball.speedy > this.brickLeftDetector.y &&
                ball.y-ball.radius+ball.speedy < this.brickLeftDetector.y+this.brickLeftDetector.h){
                //console.log("brick left detector")
                ball.speedx = -ball.speedx
                this.status = 0
                points +=1
                this.rollDice()
                boing.currentTime=0
                boing.play()
            }
            else if (ball.x+ball.radius+ball.speedx > this.brickRightDetector.x &&
                ball.x-ball.radius+ball.speedx < this.brickRightDetector.x+this.brickRightDetector.w &&
                ball.y+ball.radius+ball.speedy > this.brickRightDetector.y &&
                ball.y-ball.radius+ball.speedy < this.brickRightDetector.y+this.brickRightDetector.h){
                //console.log("brick right detector")
                ball.speedx = -ball.speedx
                this.status = 0 
                this.rollDice()
                boing.currentTime=0
                boing.play()
            }
        }
    }

    drawBonus(){
        if (this.bonus.status===1){
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.arc(this.bonus.x, this.bonus.y, this.bonus.radius, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
        this.bonus.y+=this.bonus.speedy
        }
        else{
        ctx.fillStyle ="rgba(0, 0, 0, 0)"
        }
    }

    touchBonus(){
        if(this.bonus.x+this.bonus.radius > rect.x &&
           this.bonus.x-this.bonus.radius < rect.x+rect.w &&
           this.bonus.y+this.bonus.radius+this.bonus.speedy > rect.y &&
           this.bonus.y-this.bonus.radius+this.bonus.speedy < rect.y+rect.h) {
             this.bonus.status=0
             this.bonus.speedy=-this.bonus.speedy
             console.log("bonustouch")
             pickBonus()
             pop.play()
        }
    }
}


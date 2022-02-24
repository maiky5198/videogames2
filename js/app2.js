//canvas setup
const canvas = document.getElementById('gameArea');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let score = 0;
let gameFrame = 0;
ctx.font = '50px Georgia';

//mouse interactivity
let canvasPosition = canvas.getBoundingClientRect();
const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}
canvas.addEventListener('mousedown',function(event){
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
    console.log(mouse.x, mouse.y);
});
canvas.addEventListener('mouseup', function(){
    mouse.click = false;
})

//player
class Player {
      constructor(){
          //this.x = canvas.width;
          this.x = 0;
          this.y = 0;
          //this.y = canvas.height/2;
          this.radius = 50;
          this.angle = 0;
          this.frameX = 0;
          this.frameY = 0;
          this.frame = 0;
          this.spriteWidth = 498;
          this.spriteHeight = 327;
      }
      update(){
         const dx = this.x - mouse.x;
         const dy = this.y - mouse.y;
         if (mouse.x != this.x) {
             this.x -= dx/10;
         }
         if(mouse.y != this.y) {
             this.y -= dy/10;
         }
        }
        draw(){
            if (mouse.click) {
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
                }
          ctx.fillStyle = 'brown';
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);  
          ctx.fill();
          ctx.closePath();
        }
      }
const player = new Player();

//cheese
const cheeseArray = [];
class Cheese {
    constructor(){
         this.x = Math.random() * canvas.width;
         this.y = canvas.height + 100;
         this.radius = 25;
         this.speed = 1.5;
         this.distance;
          }
    update(){
        this.y -= this.speed;
        //this.y -= Math.random() + canvas.height;
        //this.x -= Math.random() + canvas.width;
    
    }
    draw(){
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }      
}
function handleCheese(){
    if (gameFrame % 400== 0){
        cheeseArray.push(new Cheese());
        console.log(cheeseArray.length);
    }
    for (let i = 0; i < cheeseArray.length; i++) {
        cheeseArray[i].update();
        cheeseArray[i].draw();

    }
    for (let i = 0; i < cheeseArray.length; i++){
        if(cheeseArray[i].y < 0){
        cheeseArray.splice(i, 1);
        }
        if (cheeseArray[i].distance < bubbleArray[i].radius + player.radius)
    }
}

//animation loop
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleCheese();
    player.update();
    player.draw();
    ctx.fillStyle = 'black';
    ctx.fillText('Gabagool: ' + score, 10, 50);
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();
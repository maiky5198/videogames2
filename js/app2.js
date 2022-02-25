//canvas setup
const canvas = document.getElementById('gameArea');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let gameOver = false;
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
          this.radius = 50;
          this.angle = 0;
      }
      update(){
         const dx = this.x - mouse.x;
         const dy = this.y - mouse.y;
         if (mouse.x != this.x) {
             this.x -= dx/20;
         }
         if(mouse.y != this.y) {
             this.y -= dy/20;
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
         //this.distance;
         this.counted = false;
          }
    update(){
        this.y -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx*dx + dy*dy);
    
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
    if (gameFrame % 400 == 0){
        cheeseArray.push(new Cheese());
    }
    for (let i = 0; i < cheeseArray.length; i++) {
        cheeseArray[i].update();
        cheeseArray[i].draw();

    }
    for (let i = 0; i < cheeseArray.length; i++){
        if(cheeseArray[i].y < 0){
        cheeseArray.splice(i, 1);
        }
        if (cheeseArray[i].distance < cheeseArray[i].radius + player.radius){
            if(!cheeseArray[i].counted){
            score++;
            cheeseArray[i].counted = true;
            cheeseArray.splice(i, 1);
            }
    }
  }
}

class Enemy {
    constructor(){
        this.x = canvas.width + 200;
        this.y = Math.random() * (canvas.height - 150) + 90;
        this.radius = 60;
        this.speed = 3;
    }
  draw() {
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
  }
  update() {
      this.x -= this.speed;
      if (this.x < 0 - this.radius * 2){
          this.x = canvas.width + 200;
          this.y = Math.random() * (canvas.height - 150) + 90;
          this.speed = 5;
      }
      //collision detection
      const dx = this.x - player.x;
      const dy = this.y - player.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.radius + player.radius){
          handleYouDied();
      }
      if (score == 10){
          handleYouWin();
      }
  }
}
const enemyCat = new Enemy();
function handleCat(){
    enemyCat.update();
    enemyCat.draw();
}
function handleYouWin(){
    ctx.fillStyle = 'black';
    ctx.fillText('Gabagooooool', 100, 580);
    gameOver = true;
    
}
function handleYouDied(){
    ctx.fillStyle = 'black';
    ctx.fillText('You Lost: Eat more Gabagool', 100, 580);
    gameOver = true;
}

//animation loop
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleCheese();
    handleCat();
    player.update();
    player.draw();
    ctx.fillStyle = 'black';
    ctx.fillText('Gabagool: ' + score, 10, 50);
    gameFrame++;
    if (gameOver == false) requestAnimationFrame(animate);
    // if (score == 10) gameOver == false;
}
animate();


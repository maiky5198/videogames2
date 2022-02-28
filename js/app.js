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
const image = new Image();
image.src = '/Users/maikynunez/sei/projects2/videogames2/img/rat_naked_fat10.png';
class Player {
      constructor(){
          //this.x = canvas.width;
          this.x = 0;
          this.y = 0;
          this.radius = 30;
          this.angle = 0;
          this.spriteWidth = 120;
          this.spriteHeight = 120;
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
          ctx.drawImage(image, this.x - 50, this.y - 70, this.spriteWidth, this.spriteHeight); 
        }
      }
const player = new Player();

//CHEESE
const cheeseImg = new Image();
cheeseImg.src = '/Users/maikynunez/sei/projects2/videogames2/img/trianglecheese_ccexpress.png';
const cheeseArray = [];
class Cheese {
    constructor(){
         this.x = Math.random() * canvas.width;
         this.y = canvas.height + 100;
         this.radius = 25;
         this.speed = 1.5;
         this.distance = 0;
         this.counted = false;
         this.spriteWidth = 70;
         this.spriteHeight = 70;
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
        ctx.drawImage(cheeseImg, this.x - 40, this.y - 35, this.spriteWidth, this.spriteHeight); 

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
        cheeseArray.splice(i,1);
        }
        if (cheeseArray[i].distance < cheeseArray[i].radius + player.radius){
            if(!cheeseArray[i].counted){
            score++;
            cheeseArray[i].counted = true;
            cheeseArray.splice(i,1);
            }
    }
  }
}


//GABAGOOL
const gabaImg = new Image();
gabaImg.src = '/Users/maikynunez/sei/projects2/videogames2/img/gabagool_ccexpress.png';
const gabaArray = [];
class Gaba {
    constructor(){
         this.x = Math.random() * canvas.width;
         this.y = canvas.height + 100;
         this.radius = 25;
         this.speed = 3;
         this.distance = 0;
         this.counted = false;
         this.spriteWidth = 60;
         this.spriteHeight = 60;
          }
    update(){
        this.y -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx*dx + dy*dy);
    
    }
    draw(){
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        ctx.drawImage(gabaImg, this.x - 30, this.y - 30, this.spriteWidth, this.spriteHeight); 

    }      
}


function handleGaba(){
    if (gameFrame % 200 == 0){
        gabaArray.push(new Gaba());
    }
    for (let i = 0; i < gabaArray.length; i++) {
        gabaArray[i].update();
        gabaArray[i].draw();

    }
    for (let i = 0; i < gabaArray.length; i++){
        if(gabaArray[i].y < 0){
        gabaArray.splice(i, 1);
        }
        if (gabaArray[i].distance < gabaArray[i].radius + player.radius){
            if(!gabaArray[i].counted){
            score++;
            gabaArray[i].counted = true;
            gabaArray.splice(i, 1);
            }
    }
  }
}
//ENEMY
const enemyImg = new Image();
enemyImg.src = '/Users/maikynunez/sei/projects2/videogames2/img/enemycat_ccexpress.png';
class Enemy {
    constructor(){
        this.x = canvas.width + 200;
        this.y = Math.random() * (canvas.height - 150) + 90;
        this.radius = 50;
        this.speed = 3;
        this.spriteWidth = 170;
        this.spriteHeight = 170;
  
         
    }
  draw() {
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(this.x,this.y,this.radius,10);
      ctx.drawImage(enemyImg, this.x - 100, this.y - 60, this.spriteWidth, this.spriteHeight); 
      
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
    ctx.fillText('You Won: Happy Rat', 150, 580);
    gameOver = true;
    
}
function handleYouDied(){
    ctx.fillStyle = 'black';
    ctx.fillText('You Lost: Evil Cat Got You', 100, 580);
    gameOver = true;
}

//animation loop
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleCheese();
    handleCat();
    handleGaba();
    player.update();
    player.draw();
    ctx.fillStyle = 'black';
    ctx.fillText('Eatery: ' + score, 10, 50);
    gameFrame++;
    if (gameOver == false) requestAnimationFrame(animate);
}
animate();
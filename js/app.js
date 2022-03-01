//CAVAS SETUP
//I want to call my canvas Id
const canvas = document.getElementById('gameArea');
//I want to get all the drawing methods 
const ctx = canvas.getContext('2d');
//here I give javascript the instruction to size of game area so I can reference it later
canvas.width = 800;
canvas.height = 600;

//I want to create global variables that I can call later within functions
let gameOver = false;
let score = 0;
//I want to control my frames so I can spawn things when I want
let gameFrame = 0;
ctx.font = '40px Arial';

//MOUSE CLICK
//I want to have the player click the mouse to move
//create object to determine the click and call the object later in event listener
//When console logging the positions of click, it refered to the whole website not the canvas
let canvasPosition = canvas.getBoundingClientRect();
const mouse = {
   //I specify the x and y coordinates to determine where the object starts
   //Without dividing by 2 the objects draws on the bottom left of the canvas
    x: canvas.width/2,
    y: canvas.height/2,
    //Set click to false so the event listener can determine otherwise (pressed)
    click: false
}
//create event that overwrites the current mouse position
//An event listener takes two properties type of event to listen to and a call back function
//Event object holds all the information we are listening for
canvas.addEventListener('mousedown',function(event){
    //here I set what the function does when it hears the mousedown event
    mouse.click = true;
    // now the mouse x and y needs to equal where the event x and y happened
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
    
});
canvas.addEventListener('mouseup', function(){
    mouse.click = false;
})

//PLAYER
const image = new Image();
image.src = '/Users/maikynunez/sei/projects2/videogames2/img/rat_naked_fat10.png';
//I want to control every part of my player so a class with constructor to contain all the properties
class Player {
      constructor(){
          //I start the player character at 0,0 then it updates to the mouse which is /2
          this.x = 0;
          this.y = 0;
          //create size of the player using circle so radius
          this.radius = 30;
          //Instead of controlling sprite measurements in drawImage I construct that here
          this.spriteWidth = 120;
          this.spriteHeight = 120;
      }
      //create update method to change current player position to the mouse click position
      update(){
        //here I want to subtract the distance between the currrent playey position and the mouse click 
        const dx = this.x - mouse.x;
         const dy = this.y - mouse.y;
         //If statement so that if the mouse click position is not equal to the player position the player moves
         if (mouse.x != this.x) {
            //this exucutes player x postition to dx position
            this.x -= dx/20;
         }
         if(mouse.y != this.y) {
             this.y -= dy/20;
         }
        }
        draw(){
            //built in canvas  
          ctx.fillStyle = 'brown';
          //begin circle path
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);  
          ctx.fill();
          //close cirlce
          ctx.closePath();
          //use drawImage to call in sprite 
          ctx.drawImage(image, this.x - 50, this.y - 70, this.spriteWidth, this.spriteHeight); 
        }
      }
      //here we use key word new to call constructor and asign the properties everytime page loads
const player = new Player();

//CHEESE
const cheeseImg = new Image();
cheeseImg.src = '/Users/maikynunez/sei/projects2/videogames2/img/trianglecheese_ccexpress.png';
//create an empty array  
const cheeseArray = [];
class Cheese {
    constructor(){
        //Want the cheese to appear in random x axis coordinates 
        this.x = Math.random() * canvas.width;
         this.y = canvas.height + 100;
         this.radius = 25;
         //how quick the circle moves
         this.speed = 1.5;
         //tracks distance between circle and player
         this.distance;
         //need to count each collison 
         this.counted = false;
         this.spriteWidth = 70;
         this.spriteHeight = 70;
          }
    update(){
        //allow circle to move up across y axis at the speed its told
        this.y -= this.speed;
        //same as player for distance
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        //here we are calculating distance bewteen 2 circles
        this.distance = Math.sqrt(dx * dx + dy * dy);
    
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


function createCheese(){
    //statement so that at every 400 frames new cheese appears
    if (gameFrame % 400 == 0){
        //use push to add new Cheese to array
        cheeseArray.push(new Cheese());
    }
    //I look at every in cheese array and update/draw whatever is inside
    for (let i = 0; i < cheeseArray.length; i++) {
        cheeseArray[i].update();
        cheeseArray[i].draw();

    }
    //dont want the array to endlessly grow
    for (let i = 0; i < cheeseArray.length; i++){
       //if the cheese in the array y axis is 0 remove that cheese
        if(cheeseArray[i].y < 0){
        //remove index that has y value less than zero of array then remove 1 object in array
            cheeseArray.splice(i,1);
        }
        if (cheeseArray[i].distance < cheeseArray[i].radius + player.radius){
            //only if cheese is collided with once
           //only want score to add 1 if counted is false in cheese
            if(!cheeseArray[i].counted){
            score++;
            cheeseArray[i].counted = true;
            //when true we remove the cheese 
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
         this.distance;
         this.counted = false;
         this.spriteWidth = 60;
         this.spriteHeight = 60;
          }
    update(){
        this.y -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    
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


function createGaba(){
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
     //needed to setup the score here so an animation lag didnt occur
      if (score == 10){
          handleYouWin();
      }
  }
}
const enemyCat = new Enemy();
function createCat(){
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

//ANIMATION LOOP
//here we create a function to animate everything we want
function animate(){
    //here we want to clear the canvas between every animate frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //1 new cheese is added every 400 frames
    createCheese();
    createCat();
    createGaba();
    player.update();
    player.draw();
    ctx.fillStyle = 'black';
    //text on cavnas uses 3 agruments
    ctx.fillText('Eatery: ' + score, 10, 50);
    //want to increase frame by 1 every animation to add/remove at specified frame
    gameFrame++;
    //built in javascript method for looping and pass its parent function animate which creates recurrsion 
    //a function continously calling itself
    //call gameover so that when its true the animate function stops
    if (gameOver == false) requestAnimationFrame(animate);
}
//call animate
animate();
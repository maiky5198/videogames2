const canvas = document.getElementById("gameArea"); 
const ctx = canvas.getContext("2d"); 

// mouse variables
let mouseX = 100; // the x position of the mouse
let mouseY = 100; // the y position of the mouse
let mouseSize = 20; // the radius of the mouse is 20 pixels
let mouseXSpeed = 0; // the horizontal speed of the mouse
let mouseYSpeed = 0; // the vertical speed of the mouse
 
// cat variables
let catX = 700; // the x positon of the cat
let catY = 500; // the y position of the cat
let catSize = 60; // the radius of the cat is 60 pixels

//cheese variables
let cheeseY = 400;
let cheeseX = 400;
let cheeseSize = 30;
 
// game variables
let stopGame = false; // game stops when this variable is true
 
// canvas properties
// identify the correct canvas
const canvas = document.getElementById("gameArea"); 
const ctx = canvas.getContext("2d"); // get the 2D context
 
// capture keyboard events
window.addEventListener("keydown", moveMouse);
window.addEventListener("keyup", stopMouse);
 
function moveMouse(event)
{
  if(event.key =="d")
  {     
    mouseXSpeed = 10;
  }
  else if(event.key == "a")
  {
    mouseXSpeed = -10;
  }
  else if(event.key == "s")
  {
    mouseYSpeed = 10;
  }
  else if(event.key == "w")
  {
    mouseYSpeed = -10;
  }
}
 
function stopMouse(event)
{
  if(event.key == "d")
  {     
    mouseXSpeed = 0;
  }
  else if(event.key == "a")
  {
    mouseXSpeed = 0;
  }
  else if(event.key == "s")
  {
    mouseYSpeed = 0;
  }
  else if(event.key == "w")
  {
    mouseYSpeed = 0;
  }
}
 
 
 
function update()
{
  mouseX = mouseX + mouseXSpeed; // update horizontal position
  mouseY = mouseY + mouseYSpeed; // update vertical position
 
  // the distance between the mouse and cat
  let distance = Math.sqrt((mouseX - catX)*(mouseX - catX) 
     + (mouseY - catY)*(mouseY - catY));

     let distanceC = Math.sqrt((mouseX - cheeseX)*(mouseX - cheeseX)
  + (mouseY - cheeseY)*(mouseY - cheeseY)); 

 // mouse and cat have hit each other if they the distance is
  if(distance <= mouseSize + catSize) {
    stopGame = true;
  }

if (distanceC <= mouseSize + cheeseSize) {
   remove (cheeseY, cheeseX, cheeseSize);
 }
}

function draw()
{
  // clear canvas by painting the whole canvas white
  ctx.fillStyle="white";
  ctx.fillRect(0,0,1400,700);
 
  // draw mouse
  ctx.fillStyle="#614F4B"; 
  ctx.beginPath(); 
  ctx.arc(mouseX, mouseY, mouseSize, 0, Math.PI * 2); 
  ctx.fill(); 
 
  // draw cat
  ctx.fillStyle="#56138E"; 
  ctx.beginPath(); 
  ctx.arc(catX, catY, catSize, 0, Math.PI * 2); 
  ctx.fill(); 

  // draw cheese
  ctx.fillStyle="#EFF410"
  ctx.beginPath();
  ctx.arc(cheeseX, cheeseY, cheeseSize, 0, Math.PI * 2, );
  ctx.fill();

}
 
function render()
{
  update();
  draw();
   
  if(stopGame == false)
  {
    
    window.requestAnimationFrame(render);
  }
  else // stopGame is true
  {
    
    alert("Eat more gabagool!");
  }


}
 
window.requestAnimationFrame(render);
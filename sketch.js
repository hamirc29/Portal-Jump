//Make Variables at the Top


let player;
let enemy;
let spike;
let coin;
let bg;

//Player

var pX;
var pY;
var pSize;
var pVy;

//enemy
var eX;
var eY;
var eVx;
var eSize;

//coin
var cX;
var cY;
var cVx;
var cSize;

var lives;
var points;

//Spike
var sX;
var sY;
var spikeXMultiplier;
var spikeYMultiplier;
var sVx;
var sVy;
var sSize;

var lose;

var tick;
var time;
var gameOver;


function preload()
{
  player = loadImage("Super Trey Himself.png");
  enemy = loadImage("Wheatley.png");
  spike = loadImage("redCore.png");
  coin = loadImage("Companion Cube.png");
  bg = loadImage("Portal Background.jpg");
}

function setup()
{
  gameOver = false;
  createCanvas(windowWidth, windowHeight);
  tick = 0;
  time = 0;
  pixelDensity(1);

  //loadImage("filename.png")
  imageMode(CENTER);
  lives = 5;
  points = 0;
  pX = width/2;
  pY = height/2;
  pSize = 100;
  pVy = 0;

  //Sets default coin and enemy values
  resetE();
  resetC();

  //Spike Values
  sX = width/4+1;
  sY = height/2;
  sSize = 40;
  spikeXMultiplier = 1;
  spikeYMultiplier = 1;
  sVx = 2;
  sVy = 2;
}

function draw()
{

  rectMode(CORNER);
  image(bg, width/2, height/2, width, height);
  stroke(255);

  tick += 1;

  if (tick % 60 == 0)
  {
    time += 1;
  }

  //Floor
  noStroke();
  fill(0);
  rect(0, height-100, width, 100);



  //Draw Player
  stroke(255);
  fill(0, 255, 200);

  image(player, pX, pY, pSize, pSize);

  //Gravity
  pY += pVy;
  pVy += 0.2;
  bounce();
  wrap();
  bounceS();





  //Draw Enemy
  strokeWeight(8);
  fill(100, 12, 35);
  stroke(150, 150, 0);
  image(enemy, eX, eY, eSize, eSize);
  eVx = -1*time/4;
  eX += eVx;

  if (collision(eX, eY, eSize))
  {
    background(255, 0, 0);
    resetE();
    lives -= 1;
  }

  //Draw Coin
  noStroke();
  fill(255, 255, 0);
  image(coin, cX, cY, cSize, cSize);
  cX += cVx;

  if (collision(cX, cY, cSize))
  {
    background(0, 255, 0);
    resetC();
    points += 10;
  }

  //Draw SPIKE
  noStroke();
  fill(150, 0, 150);
  rectMode(CENTER);
  image(spike, sX, sY, sSize, sSize);
  sX += sVx * spikeXMultiplier;
  sY += sVy * spikeYMultiplier;

  //Spike Speed

  if (time == 20)
  {
    sVx = 3;
    sVy = 3;
  }

  if (time > 25)
  {
    sVx = time/10;
    sVy = time/10;
  }

  if (collision(sX, sY, sSize))
  {
    lose = true;
    background(255, 0, 0);
    points /= 2;
    sX = random(sSize/2, width-sSize/2);
    sY = random(sSize/2, height-sSize/2-100);
    // lives = 0;
  }


  //Game Over Screen
  if (lives <= 0)
  {
    eVx = 0;
    pVy = 0;
    
    fill(0);
    rect(width/2, height/2, width, height);
    textAlign(CENTER);
    
    if (points >= 500)
    {
    textSize(100);
    fill(0, 255, 0);
    text("WINNER", width/2, height/2);
    
    } else {
    textSize(100);
    fill(255, 0, 0);
    text("Game Over", width/2, height/2);
    }
    
    
    fill(255);
    textSize(70);
    text("Points: " + points, width/2, height/2+200);

    //Stop Game
    pVy = 0;
    eVx = 0;
    cVx = 0;
    sVx= 0;
    sVy = 0;
    
    // Allows Game to be restarted
    gameOver = true;
  } else {
    //Show Lives
    textAlign(LEFT);
    fill(255);
    textSize(50);
    text("Lives: " + lives, 10, 50);

    //Show Score
    textAlign(LEFT);
    fill(255);
    textSize(50);
    text("Points: " + int(points), 10, 100);
  }



}

function bounce()
{
  if (pY > height-100 - pSize/2)
    pVy = -windowHeight/55;
}

function wrap()
{
  if (eX < -eSize/2)
  {
    resetE();
  }
  if (cX > width+cSize/2)
  {
    resetC();
  }

  if (pX > width + pSize/2)
    pX = -pSize/2;

  if (pX < -pSize/2)
    pX = width+ pSize/2;
}

function resetE()
{
  eSize =  random(20, 50);
  eX = width + eSize/2;
  eY = random(eSize/2, height-100-eSize/2);
  
  //eVx = random(-10, -4);
}

function resetC()
{
  cSize =  random(40, 80);
  cX = -cSize/2;
  cY = random(eSize/2, height-100-eSize/2);
  cVx = random(4, 10);
}

function bounceS()
{
  if (sX >= width-sSize/2 || sX < sSize/2) {
    spikeXMultiplier *= -1;
  }

  if (sY >= height-100-sSize/2 || sY < sSize/2) {
    spikeYMultiplier *= -1;
  }
}


function keyPressed() {
  if (key === "s") pVy = 0;
  if (key === "a") pX -= pSize;
  if (key === "d") pX += pSize;

  if (lives <= 0 && keyCode === ENTER) {
    restartGame();
  }
}

function collision(x, y,size)
{
  let distP = dist(pX, pY, x, y);
  return (distP < pSize/2 + size/2)
}

function restartGame()
{
      points = 0;
      lives = 5;
      pX = width/2;
      pY = height/2;
      resetC();
      resetE();
      spikeXMultiplier = 1;
      spikeYMultiplier = 1;
      sVx = 2;
      sVy = 2;
      sX = width/4+1;
      sY = height/2;

      tick = 0;
      time = 0;
}

var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climbersGroup;
var frog, frogImg;
var gameState = "play"
var score = 0;

function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  
}

function setup(){
  createCanvas(580,450);
  
  ocean = createSprite(300,300);
  ocean.addImage("ocean",oceanImg);
  
  frog = createSprite(200,200,50,50);
  frog.scale = 0.1;
  frog.addImage("frog", frogImg);  
  
  //create coin group and climber group
  coinGroup = new Group();
  climbersGroup=new Group();
  
  
}

function draw(){
  background(0);
  drawSprites();
  textSize(20);
  text("SCORE "+score,200,50)
  ocean.velocityY=4;
  if(ocean.position.y > 280){
    ocean.position.y = 150;
  }

  if (gameState == "play") 
  {
    spawnCoin();
    
    if(keyDown("space") && frog.position.y>0)
    {
      frog.velocityY=-4;
    }
    else
    {
      frog.velocityY=4;
    }
    
    if(keyDown("Right_Arrow"))
    {
      frog.position.x+=3;
    }
    if(keyDown("Left_Arrow"))
    {
       frog.position.x-=3;
    }

    

    
    
    
    
    if(coinGroup.isTouching(frog))
    {
      score++;
      coinGroup.destroyEach();

    }
    

    if(frog.position.y>450)
    {
      textSize(50);
      text("GAME OVER",150,200);
      gameState="end";
    
    }
    
  }
  
    
  
  
  if (gameState == "end"){
    ocean.velocityY=0;
    coinGroup.destroyEach();
    frog.destroyEach();

  }
    
    
}

// create the coin and climber in the same function

function spawnCoin() {
  
  if (frameCount % 80 === 0) {
    //make the x position of the coin and climber the same
      climber =createSprite(Math.round(random(50,250)),80,10,10);
      climber.addImage("climber",climberImg);
      climber.scale=.2;
      climber.velocityY=5;
      climber.lifetime=160;
      climbersGroup.add(climber);
      coin = createSprite(climber.x,40,10,20);
      coin.addImage("coin",coinImg);
            
      coin.scale = 0.1;
      coin.velocityY=5;
      coin.lifetime = 160;
      coinGroup.add(coin);
        
  }
}


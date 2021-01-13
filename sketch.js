
var monkey , monkey_running , monkey_collided , ground;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score = 0;
var survival = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  monkey_running = loadAnimation("sprite_0.png" , "sprite_1.png" , "sprite_2.png" , "sprite_3.png", "sprite_4.png" , "sprite_5.png" , "sprite_6.png" , "sprite_7.png" , "sprite_8.png");
  
  monkey_collided = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup(){
 createCanvas(600,300);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
 
  monkey = createSprite(80,235,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkey_collided);
  
  ground = createSprite(300,300,600,10)
  
}

function draw(){
  background("green");
  fill("black");
  text("SURVIVAL TIME: "+score, 470, 20);
  text("Score: "+survival,300,20);
  
  if (monkey.isTouching(ground)){
    monkey.collide(ground)
  }
  
  if (gameState === PLAY){
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);
    
  
    if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.8;
    
    if (monkey.isTouching(bananaGroup)){
      survival++;  
      bananaGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
      monkey.changeAnimation("collider" , monkey_collided);
    }
    
  }
  
  if (gameState === END){    
    monkey.y = 235;
    monkey.scale = 0.12;
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    fill("black");
    textSize(15);
    text("Press '5' to play again", 240, 200);
    
    if (keyDown("5")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
  
  
  
  drawSprites(); 
  
  
}

function bananas(){
  if (frameCount%40 === 0){
    
    banana = createSprite(620,160, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);

    
  }
  

  
}

function obstacles(){
  if (frameCount%100 === 0){
    
    obstacle = createSprite(620,289,50,50);
    obstacle.addAnimation("obsales", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
  
  
}







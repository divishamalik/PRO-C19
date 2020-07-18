//Global Variables
var monkey,mimg,bgimg,bg,ground,bimg,oimg,bananasGroup,obstaclesGroup,gameOver,gimg,restart,rimg;
var score=0;
var PLAY=1;
var END=0;
var gameState=1;
var count=0;

function preload(){
 mimg=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png"); 
 
  bimg=loadImage("Banana.png");
  oimg=loadImage("stone.png");
  bgimg=loadImage("jungle.jpg");
  gimg=loadImage("gameOver.png");
  rimg=loadImage("restart.png");
  
}


function setup() {
  createCanvas(600,300);
  
  bg=createSprite(300,80,600,300);
  bg.addImage(bgimg);   
  
  monkey=createSprite(100,250,80,100);
  monkey.addAnimation("monkey",mimg);
  monkey.scale=0.1;

  ground=createSprite(400,300,800,10);
  ground.velocityX=-4;
  ground.visible=false;
  
  gameOver=createSprite(300,120,80,30);
  gameOver.addImage(gimg);
  gameOver.visible=false;
  
  restart=createSprite(300,150,20,10);
  restart.addImage(rimg);
  restart.visible=false;

  bananasGroup=new Group();
  obstaclesGroup=new Group();
}


function draw(){
  background(255);
  
  if(gameState==PLAY){
  ground.x=ground.width/2;
  
  bg.velocityX=-4;
  if(bg.x<100){
    bg.x=bg.width/2;
  }
  
  monkey.collide(ground);
  
  if(keyDown("space")){
    monkey.velocityY=-13;
  }
  monkey.velocityY=monkey.velocityY+0.7;
  
  bananas();
  obstacles();
    
  if(bananasGroup.isTouching(monkey)){
  score=score+1;
    bananasGroup.destroyEach();
    
  }
  
  if(obstaclesGroup.isTouching(monkey)){
   monkey.scale=0.05; 
    score=0;
    count=count+1;
  }
  
  if(count===3){
   gameState=END; 
  }
    
    if(count<3){
    gameState=PLAY;
    }
    
    switch(score){
    case 10:monkey.scale=0.12;
        break;
    case 20:monkey.scale=0.14;
        break;
    case 30:monkey.scale=0.16;
        break;
    case 40:nonkey.scale=0.18
        break;
        default:break;
        
    }
  }
  
  else if(gameState===END){
    gameOver.visible=true;
    gameOver.scale=0.7;
    restart.visible=true;
    restart.scale=0.4;
    bananasGroup.setVelocityXEach(0);
    bananasGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    monkey.velocityX=0;
    monkey.lifetime=-1;
    bg.velocityX=0;
    
    
  }
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,500,50);
   
}
 
function bananas(){
  if(frameCount%100===0){
    var banana=createSprite(600,250,40,10);
    banana.addImage(bimg);
    banana.scale=0.05;
    banana.velocityX=-5;
    banana.y=random(100,200);
    banana.lifetime=200;
    bananasGroup.add(banana);
  }
  
}

function obstacles(){
  if(frameCount%300===0){
    var obstacle=createSprite(600,260,60,60);
    obstacle.addImage(oimg);
    obstacle.scale=0.2;
    obstacle.velocityX=-5;
    obstacle.lifetime=200;
    obstaclesGroup.add(obstacle);
    }
}
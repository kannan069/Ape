
var monkey , monkey_running,monkey_jump;
var bananaImage, rockImage;
var bananaGot =0;
var bananaGroup, obstacleGroup;
var gameOverImg, gameOver;
var bg, bgImg;
var ground;
var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  /*
  monkey_running =  loadAnimation("ape1.png","ape2.png","ape3.png
  */
   monkey_running =  loadAnimation("ape12.png","ape22.png","ape32.png");
  monkey_jumb = loadAnimation("ape1.png");
  //bgImg = loadImage('bg.png');
  bgImg = loadImage('bg2.png');
  
  
  bananaImage = loadAnimation("banana3.png","banana1.png","banana2.png");
  rockImage = loadImage("stone.png");
  
  gameOverImg = loadImage('gameOver2.png');
 
}



function setup() {
  createCanvas(600,200);
  ground = createSprite(0,100);
  ground.addImage(bgImg);
  
  monkey = createSprite(80,130,20,20);
  monkey.addAnimation('jumbing',monkey_jumb);
  monkey.addAnimation('running',monkey_running);
  //monkey.setCollider('circle',0,0,200)
 // monkey.debug = true;
  
  monkey.scale = 0.1;
  
  InvisibleGround = createSprite(200,200,600,10);
  InvisibleGround.visible = false;

  
  bananaGroup = createGroup();

  rockGroup = createGroup();
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  
}


function draw() {
  background(0,0,0);
  drawSprites();
  
  if(gameState === PLAY){
    score = score+ Math.round((getFrameRate()/60));
    if(keyDown("space")&& monkey.y>140){
      monkey.velocityY = -12;
      //console.log('yay');
    }
    
    if(monkey.y<140){
      monkey.changeAnimation('jumbing',monkey_jumb);
    } else{
      monkey.changeAnimation('running',monkey_running);
    }
    
    ground.velocityX = -8;
    if (ground.x < 0){
        ground.x = ground.width/2;
      }


 

    if(monkey.isTouching(bananaGroup)){
      for(var i=0;i<bananaGroup.length;i++){
        if(monkey.isTouching(bananaGroup[i])){
          bananaGroup[i].destroy();
          bananaGot +=1;
          //i = 0;
        }
      }
    }
    if(monkey.isTouching(rockGroup)){
      monkey.changeAnimation('jumbing',monkey_jumb);
      gameState = END;
    }
      DisplayRocks();
      DisplayBanana();
  }
  else if(gameState === END){
    ground.velocityX = 0;
    rockGroup.setVelocityXEach(0);
    bananaGroup.destroyEach();
    rockGroup.setLifetimeEach(-1);
    gameOver.visible = true;
    fill(255,255,0);
    text('Weird Flying banana got: '+bananaGot,430,20);
    fill(255,0,0);
    textSize(20)
    text("Press 'R' to restart",420,180);
    if(keyDown('r')){
      gameOver.visible = false;
      rockGroup.destroyEach();
      score = 0;
      bananaGot = 0;
      gameState = PLAY;
    }
   
  }
  
  
      
 
  
  monkey.velocityY = monkey.velocityY+0.8;
  monkey.collide(InvisibleGround);
  
  fill(255,200,0);
  textSize(15)
  text('Survival Time: ' +score,20,20);
  
  
  
}


function DisplayBanana(){
  if(frameCount%80 === 0){
    var banana = createSprite(600,Math.round(random(60,100)),20,20)
    //banana.debug = true;
    banana.addAnimation('flying',bananaImage);
    banana.scale = 0.2;
    banana.velocityX = -5;
    banana.lifetime = 120;
    bananaGroup.add(banana);
  }
}

function DisplayRocks(){
  if(frameCount%300 === 0){
    var rock = createSprite(600,180,20,20)
    rock.setCollider('circle',0,0,50);
    //rock.debug = true;
    rock.addImage(rockImage);
    rock.scale = 0.5;
    rock.velocityX = -8;
    rock.lifetime = 120;
    rockGroup.add(rock);
  }
}




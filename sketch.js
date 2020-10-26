var bananaImage;
var obstacleImage;
var monkey,monkeyRunning;
var background1,backgroundImage;
var score;
var foodGroup;
var obstacleGroup;
var invisibleGround;
var hits;
var gameState;
var play;
var end;

function preload() {
  backgroundImage = loadImage("jungle.jpg");
  
  monkeyRunning = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  
  background1 = createSprite(200,200,10,10);
  background1.addImage("background",backgroundImage);
  background1.velocityX = -2;
  
  monkey = createSprite(50,340,10,10);
  monkey.addAnimation("monkey",monkeyRunning);
  monkey.scale = 0.15;
  
  invisibleGround = createSprite(50,380,100,5);
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
  
  hits = 0;
  
  gameState = 1;
  play = 1;
  end = 0;
  
  monkey.setCollider("circle",0,0,270);
  monkey.debug = false;
}

function draw() {
  background(220);
  
  drawSprites();
  
  if(gameState === play) {

    invisibleGround.visible = false;

    if(keyDown("space") && monkey.y >= 300){
      monkey.velocityY = -6.3;
    }

    if(monkey.isTouching(foodGroup)) {
      score = score + 2;
      foodGroup.destroyEach();
    }

      switch(score){
        case 10 : monkey.scale = 0.16;
                  break;
        case 20 : monkey.scale = 0.17;
                  break;
        case 30 : monkey.scale = 0.18;
                  break
        case 40 : monkey.scale = 0.19;
                  break;
        default: break;         
      }

    if(frameCount % 250 === 0 && monkey.isTouching) {
      monkey.scale = 0.13;
      hits = hits + 1;
    }
    
    if(hits === 1000) {
      gameState = 0;
    }

    monkey.velocityY = monkey.velocityY + 0.2;

    food();
    obstacle();
  }
  
  if(gameState === end) {
    stroke("white");
    textSize(40);
    fill("white");
    text("GAME OVER",95,200);
  }
  
  if(background1.x === background1.x/2) {
      background1.x = 200;
  }
  
  monkey.collide(invisibleGround);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score,150,50);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("hits: " + hits,200,50);
}

function food() {
  if(frameCount % 180 === 0) {
    var banana = createSprite(400,300,10,10);
    banana.y = Math.round(random(245,345))
    banana.addImage("banana",bananaImage);
    banana.velocityX = -3;
    banana.lifetime = 200;
    banana.scale = 0.05;
    foodGroup.add(banana);
  }
}


function obstacle() {
  if(frameCount % 250 === 0) {
    var obstacles = createSprite(400,300,10,10);
    obstacles.setCollider("circle",0,0,150);
    obstacles.debug = false;
    obstacles.y = 355;
    obstacles.addImage("obstacles",obstacleImage);
    obstacles.velocityX = -3;
    obstacles.lifetime = 200;
    obstacles.scale = 0.17;
    obstacleGroup.add(obstacles);
  }
}
var tower, towerImg;
var door, doorImg, doorGroup;
var climber, climberImg, climberGroup;
var ghost, ghostImg;
var spookySound;
var block;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(1200,600);
  tower = createSprite(600,300,1200,600);
  tower.addImage("tower", towerImg);
  tower.velocityY = 2;
  
  ghost = createSprite(600,300,200,250);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.5;
  ghost.debug = true;
  ghost.setCollider("rectangle", 0,25, 100, 125);
  
  doorGroup = new Group();
  climberGroup = new Group();
  blockGroup = new Group();
}

function draw(){
  background(0);
  if (gameState===PLAY){
  if (tower.y > 1200){
    tower.y = 300;
  }
  camera.position.y=ghost.y;
  if (keyDown("space")){
    ghost.velocityY = -10;
  }
  
  if (keyDown("left")){
    ghost.x = ghost.x-3;
  }
  
  if (keyDown("right")){
    ghost.x = ghost.x+3;
  }
  
  ghost.velocityY = ghost.velocityY+0.5;
    
  if (ghost.isTouching(climberGroup)){
    ghost.velocityY = 0;
  }
  
  if (ghost.isTouching(blockGroup)|| ghost.y > 600){
    ghost.destroy();
    gameState = END;
  }
  
  spawnDoors();
  drawSprites();
  }
  if (gameState===END){
    textSize(50);
    fill("yellow");
    text ("GAME OVER", 500,300);
  }

}

function spawnDoors(){
  if (frameCount% 250===0){
    door = createSprite(200, 0, 50, 100);
    door.x = Math.round(random(100,450));
    door.shapeColor="skyblue";
    door.addImage("door", doorImg);
    door.velocityY = 2;
    door.lifetime = 315;
    
    climber = createSprite(200, 50, 50, 20);
    climber.x = door.x;
    climber.shapeColor="red"
    climber.addImage("climber", climberImg);
    climber.velocityY = 2;
    climber.lifetime = 315;
    climber.scale=0.7;
    
    block = createSprite(200, 70, 30, 20);
    block.width = climber.width-60;
    block.height = 2;
    block.x = door.x;
    block.velocityY = 2;
    block.lifetime = 315;
    
    doorGroup.add(door);
    climberGroup.add(climber);
    blockGroup.add(block);
    
    door.depth = ghost.depth;
    ghost.depth = ghost.depth+1;
  }
}
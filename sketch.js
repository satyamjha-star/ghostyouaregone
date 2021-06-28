var bg, bg1;
var PLAY = 1, END =0,gameState = PLAY;
var packman1, packmanImage1, packmanImage2;
var coin, coinImage, coinGroup;
var score = 0;
var monster, monsterImage, monsterGroup;
var fire, fireImage, fireGroup;
var resetImage, reset;
var s1, s2, s3;

function preload(){
bg1 = loadImage("images/background.png");
packmanImage1 = loadImage("images/Pac man.png")
packmanImage2 = loadImage("images/Pac_man.png")
coinImage = loadImage("images/Coin.png")
monsterImage = loadImage("images/ghost.png")
fireImage = loadImage("images/fireball.png")
resetImage = loadImage("images/restart.png")
s1 =loadSound("sounds/fire.mp3");
s2 =loadSound("sounds/over.wav");
s3 =loadSound("sounds/point.wav");
   }
function setup(){
 createCanvas(800,400);
bg = createSprite(400,200,10,10);
bg.addImage(bg1);

packman1 = createSprite(100,200,10,10);
packman1.addImage(packmanImage2);
packman1.scale = 0.1;

reset = createSprite(400,300,10,10);
reset.addImage(resetImage);
reset.visible = false;
reset.scale = 0.2;
coinGroup = createGroup();
monsterGroup = createGroup();
fireGroup = createGroup();
   }

function draw(){
background("black");
if (gameState === PLAY){
 bg.velocityX = -5;
packman1.velocityX = 0;
packman1.velocityY = 0;
packman1.addImage(packmanImage2)
 if (bg.x < 0){
bg.x = 400;
 }

if (keyDown("w")){
    packman1.velocityY = -2;
}


if (keyDown("s")){
    packman1.velocityY = 2;
}
if (keyDown("space")){
fireball();
}
 spawnCoins();
 spawnmonster();

 if (coinGroup.isTouching(packman1)){
     score = score+5;
     coinGroup.destroyEach();
     packman1.addImage(packmanImage1)
     s3.play();
 }

 if (fireGroup.isTouching(monsterGroup)){
    score = score+10;
    fireGroup.destroyEach();
    monsterGroup.destroyEach();
    packman1.addImage(packmanImage1)
    s1.play();
}
if (monsterGroup.isTouching(packman1)){
    gameState = END;
    s2.play();
}
}
if (gameState === END){
bg.visible = false;
packman1.velocityX = 0;
packman1.velocityY = 0;
monsterGroup.destroyEach();
fireGroup.destroyEach();
coinGroup.destroyEach();
fill("yellow")
textSize(30);
text("game Over",350,200);
reset.visible = true;
if (mousePressedOver(reset)){
    restart();
}
}

drawSprites();

textSize(20);
text("score:"+score,700,50);
}
function spawnCoins(){
    if (frameCount% 40 === 0){
var coin = createSprite(800,Math.round(random(100,300)))
coin.addImage(coinImage);
coin.scale = 0.05;
coin.velocityX = -5;
coin.lifetime = 400;
coinGroup.add(coin);
    }
}

function spawnmonster(){
    if (frameCount% 50 === 0){
        var monster = createSprite(800,Math.round(random(100,300)))
        monster.addImage(monsterImage);
        monster.scale = 0.05;
        monster.velocityX = -5;
        monster.lifetime = 400;
        monsterGroup.add(monster);
    }
}

function fireball(){
        var fire = createSprite(packman1.x,packman1.y,10,10)
        fire.addImage(fireImage);
        fire.scale = 0.05;
        fire.velocityX = 15;
        fire.lifetime = 400;
        fireGroup.add(fire);
    
}

function restart(){
gameState = PLAY;
bg.visible = true;
reset.visible = false;
score = 0;



}
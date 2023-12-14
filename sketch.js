//global variables 
var player, shootingImg, playerImg;
var zombies, zombieImg, zombieGroup;
var bullets, bulletImg, bulletGroup;

var heart1, heart2, heart3, heart1Img, heart2Img, heart3Img;
var bg, bgImg;


var life = 3;
var noOfBullets = 100;
var score = 0;
var gameState = "fight";

var loseSound, winningSound, explosionSound;

function preload()
{
  playerImg = loadImage("./assets/shooter_1.png");
  shootingImg = loadImage("./assets/shooter_3.png");

  zombieImg = loadImage("./assets/Zombie.png");

  bulletImg = loadImage("./assets/shooter_3.png");

  heart1Img = loadImage("./assets/heart_1.png");
  heart2Img = loadImage("./assets/heart_2.png");
  heart3Img = loadImage("./assets/heart_3.png");

  bgImg = loadImage("./assets/bg.jpeg");

  loseSound = loadSound("./assets/lose.mp3");
  winningSound = loadSound("./assets/win.mp3");
  explosionSound = loadSound("./assets/explosion.mp3");
}

function setup()
{
createCanvas(windowWidth, windowHeight);

bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg);
bg.scale = 1.1;

player = createSprite(100, 200, 50, 50);
player.scale = 0.3;
player.addImage(playerImg);
player.debug = true;
player.setCollider("rectangle", 0, 0, 300, 300);

heart1 = createSprite(displayWidth-300, 30, 20, 20);
heart1.addImage(heart1Img);
heart1.scale = 0.4;
heart1.visible = false;

heart2 = createSprite(displayWidth-250, 30, 20, 20);
heart2.addImage(heart2Img);
heart2.scale = 0.4;
heart2.visible = false;

heart3 = createSprite(displayWidth-200, 30, 20, 20);
heart3.addImage(heart3Img);
heart3.scale = 0.4;

zombieGroup = new Group();
bulletGroup = new Group();
}

function draw()
{

  if(gameState == "fight")
  {
    if(life === 3)
    {
      heart3.visible = true;
      heart2.visible = false;
      heart1.visible = false;
    }

    if(life === 2)
    {
      heart2.visible = true;
      heart1.visible = false;
      heart3.visible = false;
    }
    
    if(life === 1)
    {
      heart1.visible = true;
      heart2.visible = false;
      heart3.visible = false;
    }
    
    if(life === 0 || noOfBullets === 0)
    {
        gameState = "lost"
    }

    if(score === 50)
    {
      gameState = "win"

    }
     
      if(keyDown(UP_ARROW))
      {
        player.y = player.y - 10;
      }

      if(keyDown(DOWN_ARROW))
      {
        player.y = player.y + 10;
      }
      }
      if(keyWentDown("space"))
      {
        bullets = createSprite(displayWidth-1150, player.y, 10, 10);
        bullets.velocityX = 20;
        bulletGroup.add(bullets);
        player.addImage(shootingImg);
        noOfBullets -= 1;
      }
      else if(keyWentUp("space"))
      {
        player.addImage(playerImg);
      }
      
      if(zombieGroup.isTouching(bulletGroup))
      {
        for(var i=0;i<zombieGroup.length;i++)
        { 
          if(zombieGroup[i].isTouching(bulletGroup))
          { 
            score += 1;
            zombieGroup[i].destroy()
            bulletGroup.destroyEach()
        } }

      }

      if(zombieGroup.isTouching(player))
      {        
        for(var i = 0; i<=zombieGroup.length; i++)
        {
          if(zombieGroup[i].isTouching(player))
          {
            zombieGroup[i].destroy();
            life-=1;
          }
        }
      }
      drawSprites();
      textSize(20);
      fill("white");
      text("score " + score, displayWidth-200,displayHeight/2-220);
      text("life " + life, displayWidth-200,displayHeight/2-280 );
      text("bullets " + noOfBullets, displayWidth-210,displayHeight/2-250);
      enemy();
}

function enemy()
{
  if(frameCount % 220 == 0)
  {
    var rand = random(500, 250);

    zombies = createSprite(width, rand, 10, 10);
  zombies.addImage(zombieImg);
  zombies.scale = 0.2;

  zombieGroup.add(zombies);
  zombies.velocityX = -1;

  zombies.lifeTime = 1100;
  }

}

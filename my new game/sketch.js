var score = 0;
var rocket, rock, bullet, backround;

var rockImg, bulletImg, blastImg, backroundImg, rocketImg, rockImg2;
var shootSound;
var rockGroup;

var life = 3;
var score = 0;
var gameState = 1

function preload() {
  rocketImg = loadImage("rocket.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  rockImg = loadImage("rock1.png")
  rockImg2=loadImage("rock2.png")
  backroundImg = loadImage("backround.png")
  shootSound=loadSound("shoot.mp3")
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  rocket = createSprite(100, height / 2, 50, 50);
  rocket.addImage(rocketImg)
  rocket.scale = 0.4

  bulletGroup = createGroup();
  rockGroup = createGroup();

  heading = createElement("h1");
  scoreboard = createElement("h1");
}

function draw() {
  background(backroundImg);

  heading.html("Life: " + life)
  heading.style('color:white');
  heading.position(150, 20)

  scoreboard.html("Score: " + score)
  scoreboard.style('color:white');
  scoreboard.position(width - 200, 20)

  if (gameState === 1) {
    rocket.y = mouseY

    if (frameCount % 150 === 0) {
      drawrock();
    }

    if  (frameCount % 200 ===0) {
      drawrock2();
    }
    if (keyDown("space")) {
      shootBullet();
    }


    if (rockGroup.collide(rocket)) {
      handleGameover(rockGroup);
    }

    if (rockGroup.collide(bulletGroup)) {
      handleRockCollision(rockGroup);
      shootSound.play()
    }

    drawSprites();
  }

  if(gameState === 2){
    textSize(100); 
    fill("white");
    text("GameOver", 500, 400)
     //gameOver.scale= 1;
     
  }


}

function drawrock() {
  rock = createSprite(800, random(20, 780), 40, 40);
  rock.addImage(rockImg);
  rock.scale = 0.1;
  rock.velocityX = -4;
  rock.lifetime = 800;
  rockGroup.add(rock);
}
function drawrock2() {
  rock2 = createSprite(800, random(20, 780), 40, 40);
  rock2.addImage(rockImg2);
  rock2.scale = 0.1;
  rock2.velocityX = -8;
  rock2.lifetime = 400;
  rockGroup.add(rock2);
}

function shootBullet() {
  bullet = createSprite(150, width / 2, 50, 20)
  bullet.y = rocket.y - 20
  bullet.addImage(bulletImg)
  bullet.scale = 0.10
  bullet.velocityX = 10
  bulletGroup.add(bullet)
}

function handleRockCollision(rockGroup) {
  if (life > 0) {
    score = score + 1;
  }

  blast = createSprite(bullet.x + 60, bullet.y, 50, 50);
  blast.addImage(blastImg);
  blast.scale = 0.1
  blast.life = 20
  bulletGroup.destroyEach()
}

function handleGameover(rockGroup) {
  life = life - 1;
  rockGroup.destroyEach();
  if (life === 0) {
    gameState = 2
  }
}

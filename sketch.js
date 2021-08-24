var spaceBackground,spaceBackgroundImg;
var spacecraft,spacecraftImg;
var fireball,fireballImg;
var fuel,fuelImg;
var spacebar,spacebarImg;
var gameOver,gameOverImg;
var restart,restartImg;
var edges;


var score = 0;
var points = 0

var gameState = "start";



function preload(){
spaceBackgroundImg = loadImage("spaceBackground.png");
spacecraftImg = loadImage("spacecraft.png");
fireballImg = loadImage("fireball.png");
fuelImg = loadImage("fuel.png");
spacebarImg = loadImage("spacebar.png");
gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");
}

function setup() {
 createCanvas(400,500);
 
 spaceBackground = createSprite(200,300,50,50);
 spaceBackground.addImage(spaceBackgroundImg);
 
 spacecraft = createSprite(200,450,20,20);
 spacecraft.addImage(spacecraftImg);
 spacecraft.scale = 0.2;
 spacecraft.velocityY=-0.2;

 spacebar = createSprite(200,200,20,20);
 spacebar.addImage(spacebarImg);
 spacebar.scale = 0.5;
 spacebar.visible = false;

 gameOver = createSprite(200,200,20,20);
 gameOver.addImage(gameOverImg);
 gameOver.scale = 0.5;
 gameOver.visible = false;

 restart = createSprite(200,300,20,20);
 restart.addImage(restartImg);
 restart.scale = 0.2;
 restart.visible = false;
 edges = createEdgeSprites();



 fireballGroup = new Group()
 fuelGroup = new Group()
 
 score = 0;
 points = 0;
}

function draw() {
 background(0);
 createEdgeSprites();
 spacecraft.bounce(edges)

 //spacecraft.debug = true;
 spacecraft.setCollider("circle",10,20,130);

 if(gameState==="start"){
     spaceBackground.velocityY = 1;
     spacecraft.velocityY = 0;
     spacecraft.visible = false;
     fireballGroup.velocityY = 0;
     
     spacebar.visible = true;

     if(keyDown("space")){
         gameState = "play";
        }
     
    }

 if(gameState==="play"){
     spaceBackground.velocityY = 1;
     score = score + Math.round(getFrameRate()/50);
     spacecraft.visible = true;
     spacecraft.velocityY = -0.2;
     spacebar.visible = false;

     if(spaceBackground.y>300){
        spaceBackground.y=200
     } 

     if(keyDown("left_arrow")){
     spacecraft.x-=3;
      }

     if(keyDown("right_arrow")){
     spacecraft.x+=3;
     }

     if(keyDown(UP_ARROW)){
     spacecraft.y-=3;
     }

     if(keyDown(DOWN_ARROW)){
     spacecraft.y+=3
     }

     spawnFireballs()
     spawnFuel()
    }
    
    if(fuelGroup.isTouching(spacecraft)){
     points+=1;
     fuel.destroy()
    }

    if(fireballGroup.isTouching(spacecraft)){
     gameState = "end";     
    }

    if(gameState==="end"){
     gameOver.visible = true;
     restart.visible = true;
     spacebar.visible = false;

     spaceBackground.velocityY = 0;
     fireballGroup.setVelocityYEach(0);
     fireballGroup.destroyEach()
     fuelGroup.destroyEach()
     fireballGroup.setLifetimeEach(-1);
     fuelGroup.setLifetimeEach(-1);

     spacecraft.destroy()
     
     

     if(mousePressedOver(restart)){
         reset();
     }
     
    }

 drawSprites();
 textSize(10)
 fill("yellow")
 text("SCORE:" + score,320,50);
 
 text("FUEL:" + points,320,65)
 
}

function spawnFireballs(){
    if(gamestate = "play"){
        if(frameCount%60===0) {
         fireball = createSprite(200,5,20,20);
         fireball.x = Math.round(random(50,350))
         fireball.addImage(fireballImg);
         fireball.scale = 0.04;
         fireball.velocityY = 3;
        
         fireball.lifetime = 300;

         fireball.depth = spacecraft.depth;
         spacecraft.depth = fireball.depth + 1;

         fireballGroup.add(fireball);        
        }
    }
}

function spawnFuel(){
    if(gamestate = "play"){
     if(frameCount%200===0){
         fuel = createSprite(100,50,20,20);
         fuel.x = Math.round(random(50,350));
         fuel.y = Math.round(random(50,450));
         fuel.addImage(fuelImg);
         fuel.scale = 0.08;

         fuel.lifetime = 200;

         fuel.depth = spacecraft.depth;
         spacecraft.depth = fuel.depth + 1;

         fuelGroup.add(fuel)
        }
    }
}


function reset(){
 gameState = "play";
 gameOver.visible = false;
 restart.visible = false;


 spacecraft = createSprite(200,450,20,20);
 spacecraft.addImage(spacecraftImg);
 spacecraft.scale = 0.2;
 spacecraft.velocityY=-0.2;

 score = 0;
 points = 0;

}

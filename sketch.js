var frameCount = 0;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trex_running;
var ground, ground_image;
var cloud, cloud_image;
var cactus1, cactus1_Image, cactus2_Image, cactus3_Image, cactus4_Image, cactus5_Image, cactus6_Image;
var trex_Collided
var gameOver, GameOver_Image
var restart, restart_Image
var jump_sound, die_sound, checkpoint_sound


function preload() {

    trex_Collided = loadAnimation("trex_collided.png");
    trex_running = loadAnimation("trx1.png", "trx3.png", "trx4.png");
    ground_image = loadImage("ground2.png");
    cloud_image = loadImage("cloud.png");
    cactus1_Image = loadImage("obstacle1.png");
    cactus2_Image = loadImage("obstacle2.png");
    cactus3_Image = loadImage("obstacle3.png");
    cactus4_Image = loadImage("obstacle4.png");
    cactus5_Image = loadImage("obstacle5.png");
    cactus6_Image = loadImage("obstacle6.png");
    gameOver_Image = loadImage("gameOver.png");
    restart_Image = loadImage("restart.png");

    jump_sound = loadSound("jump.mp3");
    die_sound = loadSound("die.mp3");
    checkpoint_sound = loadSound("checkpoint.mp3");

}

function setup() {
    createCanvas(600, 200)



    cloudsGroup = createGroup();
    obstacleGroup = createGroup();
    ground = createSprite(300, 189);
    ground.addImage("ground", ground_image)


    trex = createSprite(50, 195, 10, 10);
    trex.addAnimation("trex", trex_running)
    trex.addAnimation("collided", trex_Collided)
    trex.scale = 0.35;

    for (var i = 0; i <= 6; i++) {
        cloud = createSprite(random(0, 600), 50, 50, 50);
        cloud.addImage("cloud", cloud_image);
        cloud.scale = random(0.5, 0.75);
        cloud.velocityX = random(-0.75, -1.25);
        cloud.y = Math.round(random(25, 150));
        //console.log(cloud.y, int(cloud.velocityX));
        cloudsGroup.add(cloud);
        cloud.lifetime = cloud.x / cloud.velocityX;
        cloud.depth = trex.depth
        trex.depth++;
        console.log(trex.depth + ", " + cloud.depth);
    }

    ground1 = createSprite(300, 200, 600, 15);
    ground1.visible = false;



    //create a trex sprite


    trex.setCollider("circle", 10, 0, 50)


    restart = createSprite(300, 100);
    restart.addImage("restart", restart_Image);
    restart.scale = 0.50;
    gameOver = createSprite(300, 75);
    gameOver.addImage("gameOver", gameOver_Image);
    restart.visible = false;
    gameOver.visible = false;


    Edges = createEdgeSprites();
}

function draw() {
    background("180")

    text("Score: " + score, 10, 10)

    trex.collide(ground1);


    if (gameState === PLAY) {


        ground.velocityX = -6 + ((score / 5000) * -1);

        score = score + Math.round((frameCount / 60));
        if (score > 0 && score % 1000 == 0) {
            checkpoint_sound.play();
        }

        if (trex.y >= 172 && keyDown("up")) {
            trex.velocityY = -9
            jump_sound.play();
            //-(8 + frameCount / 60)
        }

        if (trex.y >= 172 && keyDown("space")) {
            trex.velocityY = -9
            jump_sound.play();
        }



        if (ground.x <= 0) {
            ground.x = ground.width / 2;
        }


        trex.velocityY += 0.5;

        clouds();
        cactus();



        //console.log(trex.velocityY);

        if (obstacleGroup.isTouching(trex)) {
            //trex.velocityY = -10;
            //jump_sound.play();
            gameState = END;
            die_sound.play();

        }
    } else if (gameState === END) {
        trex.changeAnimation("collided", trex_Collided);
        ground.velocityX = 0;
        cloudsGroup.setVelocityXEach(0);
        trex.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        cloudsGroup.setLifetimeEach(-1);
        obstacleGroup.setLifetimeEach(-1);
        restart.visible = true;
        gameOver.visible = true;

        if (mousePressedOver(restart)) {

            reset()
        }

    }
    console.log(gameState)

    drawSprites()


}

function reset() {
    cloudsGroup.destroyEach()
    obstacleGroup.destroyEach()
    gameState = PLAY;
    for (var i = 0; i <= 6; i++) {
        cloud = createSprite(random(0, 600), 50, 50, 50);
        cloud.addImage("cloud", cloud_image);
        cloud.scale = random(0.5, 0.75);
        cloud.velocityX = random(-0.75, -1.25);
        cloud.y = Math.round(random(25, 150));
        console.log(cloud.y, int(cloud.velocityX));
        cloudsGroup.add(cloud);
        cloud.lifetime = cloud.x / cloud.velocityX;
    }
    score = 0;

    //ground.velocityX = -6;

    //    score = score + Math.round((frameCount / 60));
    frameCount = 0;

    restart.visible = false;
    gameOver.visible = false;
    trex.changeAnimation("trex", trex_running)

}

function clouds() {
    if (frameCount % 60 === 0) {
        cloud = createSprite(650, 50, 50, 50);
        cloud.addImage("cloud", cloud_image);
        cloud.scale = random(0.5, 0.75);
        cloud.velocityX = random(-0.75, -1.25);
        cloud.y = Math.round(random(25, 150));
        //cloud.depth = 0
        cloud.depth = trex.depth
        trex.depth += 1
        console.log(cloud.depth, trex.depth);
        cloud.lifetime = 200;
        cloudsGroup.add(cloud);
        //if (cloudsGroup.x === 300) {
        //    cloud.destroy()
        //}
        cloud.lifetime = cloud.x / cloud.velocityX;
    }
}

function cactus() {
    if (frameCount % 60 === 0) {
        cactus1 = createSprite(650, 172, 50, 50);
        var ran = Math.round(random(1, 6));
        switch (ran) {
            case 1:
                cactus1.addImage(cactus1_Image);
                break;
            case 2:
                cactus1.addImage(cactus2_Image);
                break;
            case 3:
                cactus1.addImage(cactus3_Image);
                break;
            case 4:
                cactus1.addImage(cactus4_Image);
                break;
            case 5:
                cactus1.addImage(cactus5_Image);
                break;
            case 6:
                cactus1.addImage(cactus6_Image);
                break;
            default:
                break;

        }
        cactus1.scale = 0.5;
        cactus1.velocityX = -6 + ((score / 5000) * -1);
        obstacleGroup.add(cactus1);
        cactus1.lifetime = cactus1.x / cactus1.velocityX;
        //obstacleGroup.collide(ground1);
        //cactus1.velocityY += 0.5;


    }
}
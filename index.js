
const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4
};

// game gravity
const gravity = 0.17
// **

// collisions
const floorCollisions2D = [];
for (let i = 0; i < floorCollisions.length; i += 36) {
    floorCollisions2D.push(floorCollisions.slice(i, i + 36));
};
const platformCollisions2D = [];
for (let i = 0; i < platformCollisions.length; i += 36) {
    platformCollisions2D.push(platformCollisions.slice(i, i + 36));
};
const collisionBlocks = [];
floorCollisions2D.forEach((row, y) => {
    row.forEach((Symbol, x) => {
        if (Symbol === 202 || Symbol === 78 || Symbol === 80 || Symbol === 82) {
            collisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 16,
                        y: y * 16,
                    }
                })
            )
        }
    })
});
const platformCollisionBlocks = [];
platformCollisions2D.forEach((row, y) => {
    row.forEach((Symbol, x) => {
        if (Symbol === 202) {
            platformCollisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 16,
                        y: y * 16,
                    },
                    height: 6
                })
            )
        }
    })
});
// **

// background and camera
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './assets/background.png'
});
const backgroundImageHeight = 432
const camera = {
    position: {
        x: 0,
        y: -backgroundImageHeight + scaledCanvas.height
    }
};
// **

// Player declaration,
const player = new Player({
    position: {
        x: 80, y: 320
    },
    collisionBlocks: collisionBlocks,
    platformCollisionBlocks: platformCollisionBlocks,
    imageSrc: './assets/warrior/Idle.png',
    frameRate: 8,
    animations: {
        Idle: {
            imageSrc: './assets/warrior/Idle.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        IdleLeft: {
            imageSrc: './assets/warrior/IdleLeft.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        Run: {
            imageSrc: './assets/warrior/Run.png',
            frameRate: 8,
            frameBuffer: 5,
        },
        RunLeft: {
            imageSrc: './assets/warrior/RunLeft.png',
            frameRate: 8,
            frameBuffer: 5,
        },
        Jump: {
            imageSrc: './assets/warrior/Jump.png',
            frameRate: 2,
            frameBuffer: 2,
        },
        JumpLeft: {
            imageSrc: './assets/warrior/JumpLeft.png',
            frameRate: 2,
            frameBuffer: 2,
        },
        Fall: {
            imageSrc: './assets/warrior/Fall.png',
            frameRate: 2,
            frameBuffer: 2,
        },
        FallLeft: {
            imageSrc: './assets/warrior/FallLeft.png',
            frameRate: 2,
            frameBuffer: 2,
        },
        Attack: {
            imageSrc: './assets/warrior/Attack1.png',
            frameRate: 4,
            frameBuffer: 8
        }
    }
});
// Player Movement declaration
window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
const keys = {
    left: false,
    right: false,
    attack: false,
};

function keyDown(e) {
    switch (e.key) {
        case 'd':
            keys.right = true;
            break;
        case 'a':
            keys.left = true;
            break;
        case 'w':
            jump();
            break;
        case 'j':
            player.attack();
            break
    }
};

function keyUp(e) {
    switch (e.key) {
        case 'd':
            keys.right = false;
            break;
        case 'a':
            keys.left = false;
            break;
        // case 'j':
        //     player.isAttacking = false
        // break;
    }
};

function jump() {
    if (player.jumpsLeft > 0) {
        player.velocity.y = -4;
        if (player.jumpsLeft == 1) {
            player.velocity.y *= 1.5;
        }
    }
    player.jumpsLeft--;
}

function applyPlayerMovement() {
    player.velocity.x = 0;


    if (keys.right) {
        player.switchSprite('Run');
        player.velocity.x = 2;
        player.lastDirection = "right";
        player.panCameraToTheLeft({ camera, canvas });
    }
    else if (keys.left) {
        player.lastDirection = "left"
        player.switchSprite('RunLeft');
        player.velocity.x = -2;
        player.panCameraToTheRight({ camera, canvas });

    }
    else if (player.velocity.y === 0 ) {
        if(player.isAttacking){
            player.switchSprite("Attack")
        }else if (player.lastDirection === "right") 
            player.switchSprite("Idle");
        else
             player.switchSprite("IdleLeft");
    }


    if (player.velocity.y < 0) {
        player.panCameraDown({ canvas, camera });
        if (player.lastDirection === "right") player.switchSprite("Jump");
        else
            player.switchSprite("JumpLeft");
    } else if (player.velocity.y > 0) {
        player.panCameraUp({ canvas, camera });
        if (player.lastDirection === "right")
            player.switchSprite("Fall");
        else
            player.switchSprite("FallLeft");
    }



};
// ***
// Animation 
function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = "white";

    c.save()
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.scale(4, 4);
    c.translate(camera.position.x, camera.position.y);
    background.update();

    // collisionBlocks.forEach(collisionBlock => {
    //     collisionBlock.update();
    // });
    // platformCollisionBlocks.forEach(block => {
    //     block.update();
    // });

    player.update();
    applyPlayerMovement();
    c.restore();
};
animate();

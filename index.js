const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height /4
};

const floorCollisions2D = [];
for(let i = 0; i < floorCollisions.length; i += 36){
    floorCollisions2D.push(floorCollisions.slice(i, i + 36));
};

const platformCollisions2D =[];
for(let i = 0; i < platformCollisions.length; i += 36){
    platformCollisions2D.push(platformCollisions.slice(i, i + 36));
};

const collisionBlocks = [];
floorCollisions2D.forEach((row, y)=>{
    row.forEach((Symbol, x)=>{
        if(Symbol === 202|| Symbol ===78 || Symbol ===80 || Symbol===82){
            collisionBlocks.push(
                new CollisionBlock({position:{
                    x:x * 16,
                    y:y * 16,
                }})
            )
        }
    })
});
const platformCollisionBlock = [];

platformCollisions2D.forEach((row, y)=>{
    row.forEach((Symbol, x)=>{
        if(Symbol === 202){
            platformCollisionBlock.push(
                new CollisionBlock({position:{
                    x:x * 16,
                    y:y * 16,
                }})
            )
        }
    })
});

const gravity = 0.5;

const player  =  new Player({
    position:{
        x:100, y:0
    },
    collisionBlocks:collisionBlocks,
});

const keys = {
    left:false,
    right:false,
};

const background = new Sprite({
    position:{
        x:0,
        y:0
    },
    imageSrc:'./assets/background.png'
}); 

function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle = "white";
    c.fillRect(0,0, canvas.width, canvas.height);

    c.save()
    c.scale(4,4);
    c.translate(0, -background.image.height + scaledCanvas.height);
    background.update();
    collisionBlocks.forEach(collisionBlock=>{
        collisionBlock.update();
    });
    platformCollisionBlock.forEach(block=>{
        block.update();
    });

    player.update();

    c.restore();

    applyPlayerMovement();
}; 

animate();

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);

function keyDown(e){
    switch(e.key){
        case 'd':
           keys.right = true;
            break;
        case 'a':
            keys.left = true;
            break;
        case 'w':
            player.velocity.y = -8;
            break;
    }
};

function keyUp(e){
    switch(e.key){
        case 'd':
           keys.right = false;
            break;
        case 'a':
            keys.left = false;
            break;
    }
};

function applyPlayerMovement(){
    player.velocity.x = 0;
    if(keys.right) player.velocity.x = 5
    if(keys.left) player.velocity.x = -5;
};
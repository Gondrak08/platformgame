class Player extends Sprite {
    constructor({ position, collisionBlocks, imageSrc, frameRate, scale= 0.5 }) {
        super({imageSrc, frameRate, scale});
        this.position = position;
        this.velocity = {
            x: 0,
            y: 1
        }
        this.collisionBlocks = collisionBlocks;
        this.hitBox={
            position:{
                x: this.position.x,
                y: this.position.y
            },
            width:10,
            height:10,
        }
    };

    update() {
        this.updateFrames();
        this.updateHitBox();
// 
        c.fillStyle = 'rgba(255,0,0,0.2)';
        c.fillRect(
            this.hitBox.position.x,
            this.hitBox.position.y,
            this.hitBox.width,
            this.hitBox.height,
        )
// 
        this.draw();
        this.position.x += this.velocity.x;
        this.updateHitBox();
        this.checkForHorizontalCollisions();
        this.applyGravity();
        this.updateHitBox();
        this.checkForVerticalCollisions();
    };

    updateHitBox(){
        this.hitBox={
            position:{
                x: this.position.x + 35,
                y: this.position.y + 26
            },
            width:14,
            height:27,
        }
    };

    applyGravity() {
        this.position.y += this.velocity.y;
        this.velocity.y += gravity;

    };

    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            if (
                collision({ player: this.hitBox, collisionBlock: collisionBlock })
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offset = this.hitBox.position.y - this.position.y + this.hitBox.height;
                    this.position.y = collisionBlock.position.y - offset - 0.01;
                    break;
                }

                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    const offset = this.hitBox.position.y - this.position.y;
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01;
                    break;
                }
            }
        }
    };

    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            if (
                collision({ player: this.hitBox, collisionBlock: collisionBlock })
            ) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0
                    const offset = this.hitBox.position.x - this.position.x + this.hitBox.width;
                    this.position.x = collisionBlock.position.x - offset - 0.01;
                    break;
                }

                if (this.velocity.x < 0) {
                    this.velocity.x = 0;
                    const offset = this.hitBox.position.x - this.position.x;
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
                    break;
                }
            }
        }
    };


};

class Sprite {
    constructor({ position, imageSrc, frameRate = 1, frameBuffer = 3, scale = 1 }) {
        this.position = position;
        this.scale = scale
        this.loaded = false;
        this.image = new Image();
        this.image.src = imageSrc;
        this.image.onload = () => {
            this.width = (this.image.width / this.frameRate) * this.scale;
            this.height = this.image.height * this.scale;
            this.loaded = true;
        };
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.frameBuffer = frameBuffer;
        this.elapsedFrames = 0;
    };

    draw() {
        if (!this.image) return;

        const cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0
            },
            
            width: this.image.width / this.frameRate,
            height: this.image.height
        }

        c.save();
        if (this.isAttacking && this.lastDirection === "left") {
            // Espelha a imagem horizontalmente
            c.scale(-1, 1);
            // Ajusta a posição para desenhar corretamente a imagem espelhada
            const adjustedX = -this.position.x - this.width;
            c.drawImage(
                this.image,
                cropbox.position.x,
                cropbox.position.y,
                cropbox.width,
                cropbox.height,
                adjustedX,
                this.position.y,
                this.width,
                this.height
            );
        } else {
            c.drawImage(
                this.image,
                cropbox.position.x,
                cropbox.position.y,
                cropbox.width,
                cropbox.height,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            );
        }

        c.restore()
        // defaultOne
        // c.drawImage(
        //     this.image,
        //     cropbox.position.x,
        //     cropbox.position.y,
        //     cropbox.width,
        //     cropbox.height,
        //     this.position.x,
        //     this.position.y,
        //     this.width,
        //     this.height
        // );
    };

    update() {
        this.draw();
        this.updateFrames();
    };

    updateFrames() {
        this.elapsedFrames++;

        if(this.elapsedFrames % this.frameBuffer ===0){
            if (this.currentFrame < this.frameRate - 1)
                this.currentFrame++;
            else
                this.currentFrame = 0;
        }
    };
};

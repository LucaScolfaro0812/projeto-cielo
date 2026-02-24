class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.4);
        this.setCollideWorldBounds(true);

        this.velocidade = 200;
    }

    movimentar(teclas) {
        this.setVelocity(0);

        if (teclas.A.isDown) {
            this.setVelocityX(-this.velocidade);
        }
        if (teclas.D.isDown) {
            this.setVelocityX(this.velocidade);
        }
        if (teclas.W.isDown) {
            this.setVelocityY(-this.velocidade);
        }
        if (teclas.S.isDown) {
            this.setVelocityY(this.velocidade);
        }
    }
}
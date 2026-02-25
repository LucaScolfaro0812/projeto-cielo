export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.4);
        this.setCollideWorldBounds(true);

        this.velocidade = 200;

        this.criarAnimacoes(scene);
    }

    criarAnimacoes(scene) {
        scene.anims.create({
            key: "andar-direita",
            frames: scene.anims.generateFrameNumbers("player", { start: 0, end: 2 }),
            duration: 2,
            repeat: -1
        });

        scene.anims.create({
            key: "andar-esquerda",
            frames: scene.anims.generateFrameNumbers("player", { start: 0, end: 2 }),
            repeat: -1
        });

        scene.anims.create({
            key: "andar-cima",
            frames: scene.anims.generateFrameNumbers("player", { start: 0, end: 2 }),
            duration: 2,
            repeat: -1
        });

        scene.anims.create({
            key: "andar-baixo",
            frames: scene.anims.generateFrameNumbers("player", { start: 0, end: 2}),
            duration: 2,
            repeat: -1
        });
    }

    movimentar(teclas) {
        this.setVelocity(0);

        let movendo = false;

        if (teclas.A.isDown) {
            this.setVelocityX(-this.velocidade);
            this.anims.play("andar-esquerda", true);
            movendo = true;
        }
        else if (teclas.D.isDown) {
            this.setVelocityX(this.velocidade);
            this.anims.play("andar-direita", true);
            movendo = true;
        }
        else if (teclas.W.isDown) {
            this.setVelocityY(-this.velocidade);
            this.anims.play("andar-cima", true);
            movendo = true;
        }
        else if (teclas.S.isDown) {
            this.setVelocityY(this.velocidade);
            this.anims.play("andar-baixo", true);
            movendo = true;
        }

        if (!movendo) {
            this.anims.stop();
        }
    }
}
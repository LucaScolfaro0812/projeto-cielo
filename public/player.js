export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.8);
        this.setCollideWorldBounds(false);

        this.velocidade = 350;

        this.teclas = this.scene.input.keyboard.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D
        });

        this.criarAnimacoes(scene);
    }

    update(){
        this.movimentar();
    }

    movimentar() {
        this.setVelocity(0);

        let movendo = false;
        let forca = [0, 0]

        if (this.teclas.A.isDown) {
            forca[0] = -1;
            this.anims.play("andar-esquerda", true);
            movendo = true;
        }
        if (this.teclas.D.isDown) {
            forca[0] = 1;
            this.anims.play("andar-direita", true);
            movendo = true;
        }
        if (this.teclas.W.isDown) {
            forca[1] = -1;
            this.anims.play("andar-cima", true);
            movendo = true;
        }
        if (this.teclas.S.isDown) {
            forca[1] = 1;
            this.anims.play("andar-baixo", true);
            movendo = true;
        }

        let modulo = Math.sqrt(Math.abs(forca[0] * forca[0]) + Math.abs(forca[1] * forca[1]));
        if(modulo > 0){
            forca[0] /= modulo;
            forca[1] /= modulo;
        }
        
        forca[0] *= this.velocidade;
        forca[1] *= this.velocidade;

        this.setVelocity(forca[0], forca[1]);
        
        if (!movendo) {
            this.anims.stop();
        }
    }

    criarAnimacoes(scene) {
        scene.anims.create({
            key: "andar-direita",
            frames: scene.anims.generateFrameNumbers("player", { start: 1, end: 1 }),
            repeat: -1
        });

        scene.anims.create({
            key: "andar-esquerda",
            frames: scene.anims.generateFrameNumbers("player", { start: 3, end: 3 }),
            repeat: -1
        });

        scene.anims.create({
            key: "andar-cima",
            frames: scene.anims.generateFrameNumbers("player", { start: 2, end: 2 }),
            duration: 2,
            repeat: -1
        });

        scene.anims.create({
            key: "andar-baixo",
            frames: scene.anims.generateFrameNumbers("player", { start: 0, end: 0}),
            duration: 2,
            repeat: -1
        });
    }
}
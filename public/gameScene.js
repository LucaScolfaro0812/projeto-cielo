import Player from './player.js';

class gameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'gameScene' });
    }

    preload() {
        this.load.image('rua', 'assets/rua.png');
        this.load.image('npc', 'assets/npc.png');
        this.load.image('player', 'assets/marcielo.png');
    }

    create() {

        this.add.image(0, 0, 'rua')
            .setOrigin(0)
            .setScale(6);

        this.npc = this.physics.add.sprite(400, 300, 'npc')
            .setScale(0.3)
            .setImmovable(true);

        // 👇 AGORA USANDO A CLASSE
        this.player = new Player(this, 200, 200);

        this.physics.add.collider(this.player, this.npc);

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(0.75);

        // Teclas
        this.teclas = this.input.keyboard.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    update() {
        this.player.movimentar(this.teclas);
    }
}

export default gameScene;
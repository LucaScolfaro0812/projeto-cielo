class PadariaScene extends Phaser.Scene {

    constructor() {
        super({ key: 'PadariaScene' });
    }

    preload() {
        // Carregamento futuro de assets da padaria
        this.load.image('padaria', 'assets/padaria-bg-2.png');
        this.load.image('npc-padeiro', 'assets/npc.png');
        this.load.image('player', 'assets/marcielo.png');
    }

    create() {
        // Estrutura inicial da cena
        this.add.image(480, 270, 'padaria').setScale(2.1); // Cenário da padaria
        this.add.image(550, 180, 'npc-padeiro').setScale(0.4); // NPC padeiro
        this.player = this.add.image(100, 100, 'player').setScale(0.5); // Jogador 

        // Configura as teclas do teclado
        this.teclaW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.teclaA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.teclaS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.teclaD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        // Atualizações futuras
        let velocidade = 2.5;

        if (this.teclaA.isDown) {
            this.player.x -= velocidade;
        } else if (this.teclaD.isDown) {
            this.player.x += velocidade;
        }

        if (this.teclaW.isDown) {
            this.player.y -= velocidade;
        } else if (this.teclaS.isDown) {
            this.player.y += velocidade;
        }
    }
}
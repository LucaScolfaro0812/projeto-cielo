class PadariaScene extends Phaser.Scene {

    constructor() {
        super({ key: 'PadariaScene' });
    }

    preload() {
        // Carrega os assets da cena
        this.load.image('padaria', 'assets/padaria-bg-2.png');
        this.load.image('npc-padeiro', 'assets/npc.png');
        this.load.image('player', 'assets/marcielo.png');
    }

    create() {
        // Adiciona cenário, NPC e jogador
        this.add.image(480, 200, 'padaria').setScale(2.1);
        this.npcPadeiro = this.add.image(550, 180, 'npc-padeiro').setScale(0.4);
        this.player = this.add.image(100, 100, 'player').setScale(0.5);

        // Configura teclas de movimento e interação
        this.teclaW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.teclaA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.teclaS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.teclaD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }

    update() {
        let velocidade = 2.5;

        // Movimentação horizontal
        if (this.teclaA.isDown) {
            this.player.x -= velocidade;
        } else if (this.teclaD.isDown) {
            this.player.x += velocidade;
        }

        // Movimentação vertical
        if (this.teclaW.isDown) {
            this.player.y -= velocidade;
        } else if (this.teclaS.isDown) {
            this.player.y += velocidade;
        }

        // Verifica proximidade com o NPC
        let distancia = Phaser.Math.Distance.Between(
            this.player.x, this.player.y,
            this.npcPadeiro.x, this.npcPadeiro.y
        );

        // Abre o quiz se estiver perto e apertar E
        if (distancia < 100 && Phaser.Input.Keyboard.JustDown(this.teclaE)) {
            console.log('Interagiu com o padeiro!');
        }
    }
}

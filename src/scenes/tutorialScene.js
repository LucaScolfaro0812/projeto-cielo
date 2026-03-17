export class tutorialScene extends Phaser.Scene {

    constructor() {
        super({ key: 'tutorialScene' });
    }

    preload() {
        this.load.image('tutorial', 'assets/tutorial2.png');
    }

    create() {

        const w = this.scale.width;
        const h = this.scale.height;

        // ===============================
        // IMAGEM DO TUTORIAL
        // ===============================

        const tutorial = this.add.image(w/2, h/2, 'tutorial');
        tutorial.setDisplaySize(w, h);

        // ===============================
        // ESTILO BOTÃO
        // ===============================

        const estiloBotao = {
            fontFamily: 'Poppins',
            fontSize: '34px',
            color: '#ffffff',
            backgroundColor: '#001caa',
            padding: { x: 20, y: 8 },
            align: 'center'
        };

        // BOTÃO SAIR
        const botaoSair = this.add.text(w/2, h - 20, 'SAIR', estiloBotao)
        .setOrigin(0.5,1)
        .setFixedSize(260,60)
        .setAlign('center')
        .setDepth(10);

        botaoSair.setInteractive({ useHandCursor: true });

        botaoSair.on('pointerover', () => {

            botaoSair.setStyle({
                backgroundColor: '#6FB7FF',
                color: '#1B2A4A'
            });

            botaoSair.setScale(1.05);
        });

        botaoSair.on('pointerout', () => {

            botaoSair.setStyle({
                backgroundColor: '#001caa',
                color: '#ffffff'
            });

            botaoSair.setScale(1);
        });

        botaoSair.on('pointerdown', () => {
            this.scene.start('gameScene');
        });

    }

}
export class tutorialScene extends Phaser.Scene {

    constructor() {
        super({ key: 'tutorialScene' });
    }

    preload() {
        this.load.image('tutorial', 'assets/imagens/tutorial2.png');
    }

    create() {

        const w = this.scale.width;
        const h = this.scale.height;

        // IMAGEM TUTORIAL
        const tutorial = this.add.image(w/2, h/2, 'tutorial');

        // força ocupar a tela toda
        tutorial.setDisplaySize(w,h);

        // ===============================
        // ESTILO PADRÃO BOTÃO (igual menu)
        // ===============================

        const estiloBotao = {
            fontFamily: 'Poppins',
            fontSize: '34px',
            color: '#ffffff',
            backgroundColor: '#001caa',
            padding: { x: 20, y: 8 },
            align: 'center'
        };

        // BOTÃO VOLTAR
        const botaoVoltar = this.add.text(w/2, h - 15, 'VOLTAR', estiloBotao)
        .setOrigin(0.5,1)
        .setFixedSize(260,60)
        .setAlign('center')
        .setDepth(10);

        botaoVoltar.setInteractive({ useHandCursor: true });

        botaoVoltar.on('pointerover', () => {

            botaoVoltar.setStyle({
                backgroundColor: '#6FB7FF',
                color: '#1B2A4A'
            });

            botaoVoltar.setScale(1.05);
        });

        botaoVoltar.on('pointerout', () => {

            botaoVoltar.setStyle({
                backgroundColor: '#001caa',
                color: '#ffffff'
            });

            botaoVoltar.setScale(1);
        });

        botaoVoltar.on('pointerdown', () => {
            this.scene.start('menuScene');
        });

    }
}

export class CenaTutorial extends Phaser.Scene {

    constructor() {
        super({ key: 'tutorialScene' });
    }

    preload() {
        this.load.image('tutorial', 'assets/imagens/tutorial2.png');
    }

    create() {

        const w = this.scale.width;
        const h = this.scale.height;

        // ===============================
        // OVERLAY ESCURO
        // ===============================
        this.add.rectangle(w/2, h/2, w, h, 0x000000, 0.6)
            .setScrollFactor(0)
            .setDepth(0);

        // ===============================
        // IMAGEM DO TUTORIAL
        // ===============================
        const tutorial = this.add.image(w/2, h/2, 'tutorial')
            .setDisplaySize(w * 0.9, h * 0.85) // 👈 deixa margem embaixo
            .setScrollFactor(0)
            .setDepth(1);

        // ===============================
        // BOTÃO SAIR (AJUSTADO)
        // ===============================
        const estiloBotao = {
            fontFamily: 'Poppins',
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#001caa',
            padding: { x: 30, y: 12 },
            align: 'center'
        };

        const botaoSair = this.add.text(w/2, h - 50, 'SAIR', estiloBotao)
            .setOrigin(0.5, 1)
            .setScrollFactor(0)
            .setDepth(10)
            .setInteractive({ useHandCursor: true });

        // hover
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

        // clique
        botaoSair.on('pointerdown', () => {
            this.scene.stop();
            this.scene.resume('gameScene');
        });
    }
}

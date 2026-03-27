export class CenaTutorial extends Phaser.Scene {

    constructor() {
        super({ key: 'tutorialScene', transparent: true });
    }

    init(data = {}) {
        this.cenaOrigem = data.cenaOrigem ?? 'gameScene';
        this.modoOverlay = Boolean(data.modoOverlay);
    }

    preload() {
        this.load.image('tutorial', 'assets/imagens/tutorial2.png');
        if (!this.cache.audio.exists('somClicando')) {
            this.load.audio('somClicando', 'assets/sons/somClicando.mp3');
        }
    }

    create() {

        const w = this.scale.width;
        const h = this.scale.height;

        this.scene.bringToTop();
        this.cameras.main.setBackgroundColor('rgba(0,0,0,0)');

        const tutorial = this.add.image(w/2, h/2, 'tutorial');
        const escalaTutorial = Math.min((w * 0.94) / tutorial.width, (h * 0.94) / tutorial.height);
        tutorial.setScale(escalaTutorial);
        tutorial.setScrollFactor(0);
        tutorial.setDepth(1);

        const estiloBotao = {
            fontFamily: 'Poppins',
            fontSize: '28px',
            color: '#ffffff',
            backgroundColor: '#001caa',
            padding: { x: 16, y: 6 },
            align: 'center'
        };

        const yBotaoSair = Math.min(tutorial.getBounds().bottom + 16, h - 60);

        const botaoSair = this.add.text(w / 2, yBotaoSair, 'SAIR', estiloBotao)
            .setOrigin(0.5, 0)
            .setFixedSize(200, 48)
            .setAlign('center')
            .setDepth(10);

        botaoSair.setInteractive({ useHandCursor: true });

        botaoSair.on('pointerover', () => {
            botaoSair.setStyle({ backgroundColor: '#6FB7FF', color: '#1B2A4A' });
            botaoSair.setScale(1.05);
        });

        botaoSair.on('pointerout', () => {
            botaoSair.setStyle({ backgroundColor: '#001caa', color: '#ffffff' });
            botaoSair.setScale(1);
        });

        botaoSair.on('pointerdown', () => {
            if (this.cache.audio.exists('somClicando')) this.sound.play('somClicando', { volume: 0.5 });

            if (this.modoOverlay) {
                this.scene.resume(this.cenaOrigem);
                this.scene.stop();
                return;
            }

            this.scene.start('gameScene', { mostrarTutorial: false });
        });
    }
}
export class CenaTutorial extends Phaser.Scene {

    constructor() {
        super({ key: 'tutorialScene', transparent: true });
    }

    init(data = {}) {
        this.cenaOrigem = data.cenaOrigem ?? 'gameScene';
        this.modoOverlay = Boolean(data.modoOverlay);
    }

    preload() {
        if (!this.cache.audio.exists('somClicando')) {
            this.load.audio('somClicando', 'assets/sons/somClicando.mp3');
        }
    }

    create() {
        const w = this.scale.width;
        const h = this.scale.height;
        const larguraCard = Math.min(w * 0.82, 760);
        const alturaCard = Math.min(h * 0.8, 560);
        const topoCard = (h - alturaCard) / 2;
        const esquerdaCard = (w - larguraCard) / 2;
        const controles = [
            ['W A S D', 'Mover personagem'],
            ['E', 'Interagir com NPC'],
            ['T', 'Abrir tutorial'],
            ['ESC', 'Abrir pausa'],
            ['Mouse', 'Selecionar alternativa no quiz']
        ];

        this.scene.bringToTop();
        this.cameras.main.setBackgroundColor('rgba(0,0,0,0)');

        this.add.rectangle(w / 2, h / 2, w, h, 0x03111f, 0.7).setDepth(1);

        this.add.rectangle(w / 2, h / 2, larguraCard, alturaCard, 0x071a2d, 0.95)
            .setStrokeStyle(3, 0x6fd1ff, 0.6)
            .setDepth(2);

        this.add.rectangle(w / 2, topoCard + 58, larguraCard - 42, 82, 0x0d2e4f, 0.95)
            .setDepth(3);

        this.add.text(w / 2, topoCard + 44, 'CONTROLES', {
            fontFamily: 'Arial Black',
            fontSize: `${Math.max(30, Math.round(larguraCard * 0.06))}px`,
            color: '#f4fbff',
            align: 'center'
        })
            .setOrigin(0.5, 0.5)
            .setDepth(4);

        this.add.text(w / 2, topoCard + 84, 'Use estes comandos durante a partida', {
            fontFamily: 'Arial',
            fontSize: `${Math.max(15, Math.round(larguraCard * 0.024))}px`,
            color: '#b7d9ef',
            align: 'center'
        })
            .setOrigin(0.5, 0.5)
            .setDepth(4);

        const inicioListaY = topoCard + 160;
        const alturaLinha = Math.min(68, Math.max(54, alturaCard * 0.12));
        const larguraEtiqueta = Math.min(180, larguraCard * 0.28);

        controles.forEach(([tecla, descricao], index) => {
            const y = inicioListaY + (index * alturaLinha);
            const corLinha = index % 2 === 0 ? 0x0a2239 : 0x0c2944;

            this.add.rectangle(w / 2, y, larguraCard - 64, alturaLinha - 10, corLinha, 0.98)
                .setDepth(3);

            this.add.rectangle(esquerdaCard + 44 + (larguraEtiqueta / 2), y, larguraEtiqueta, alturaLinha - 18, 0x6fd1ff, 0.18)
                .setStrokeStyle(2, 0x6fd1ff, 0.5)
                .setDepth(4);

            this.add.text(esquerdaCard + 44 + (larguraEtiqueta / 2), y, tecla, {
                fontFamily: 'Arial Black',
                fontSize: `${Math.max(18, Math.round(larguraCard * 0.03))}px`,
                color: '#f4fbff',
                align: 'center'
            })
                .setOrigin(0.5)
                .setDepth(5);

            this.add.text(esquerdaCard + 44 + larguraEtiqueta + 26, y, descricao, {
                fontFamily: 'Arial',
                fontSize: `${Math.max(18, Math.round(larguraCard * 0.028))}px`,
                color: '#d7ecf8',
                wordWrap: { width: larguraCard - larguraEtiqueta - 130 },
                align: 'left'
            })
                .setOrigin(0, 0.5)
                .setDepth(5);
        });

        const estiloBotao = {
            fontFamily: 'Arial Black',
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#0b63ce',
            padding: { x: 22, y: 10 },
            align: 'center'
        };

        const yBotaoSair = topoCard + alturaCard - 42;

        const botaoSair = this.add.text(w / 2, yBotaoSair, 'FECHAR', estiloBotao)
            .setOrigin(0.5, 0)
            .setFixedSize(200, 48)
            .setAlign('center')
            .setDepth(10);

        botaoSair.setInteractive({ useHandCursor: true });

        botaoSair.on('pointerover', () => {
            botaoSair.setStyle({ backgroundColor: '#6fd1ff', color: '#07304f' });
            botaoSair.setScale(1.05);
        });

        botaoSair.on('pointerout', () => {
            botaoSair.setStyle({ backgroundColor: '#0b63ce', color: '#ffffff' });
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

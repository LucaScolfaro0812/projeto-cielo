// Cena inicial do jogo: exibe o menu com fundo animado,
// imagem de título, loja decorativa e botões de navegação

export class menuScene extends Phaser.Scene {

    constructor() {
        super({ key: 'menuScene' });
    }

    preload() {
        this.load.image('nuvens', 'assets/imagens/ambiente/cloud-bg.png');
        this.load.image('ceu', 'assets/imagens/ambiente/sky-bg.png');
        this.load.image('titulo', 'assets/ui/titulo-jogo.webp');
        this.load.image('loja', 'assets/imagens/lojas/interior/store-bg.webp');
    }

    create() {

        const w = this.scale.width;
        const h = this.scale.height;

        // Fundo céu
        this.add.tileSprite(0, 0, w, h, "ceu")
            .setOrigin(0, 0)
            .setScrollFactor(0);

        // Nuvens
        this.spriteNuvens = this.add.tileSprite(0, 0, w, 250, 'nuvens')
            .setOrigin(0, 0)
            .setAlpha(0.8)
            .setScale(1.8);

        // Título
        const imagemTitulo = this.add.image(w / 2, h * 0.25, 'titulo')
            .setOrigin(0.5);

        imagemTitulo.setScale(w / imagemTitulo.width * 0.75);

        // Loja
        const imagemLoja = this.add.image(w / 2, h, 'loja')
            .setOrigin(0.5, 1);

        const escalaX = w / imagemLoja.width;
        imagemLoja.setScale(escalaX, escalaX);

        // ===============================
        // ESTILO PADRÃO DOS BOTÕES
        // ===============================

        const estiloBotao = {
            fontFamily: 'Poppins',
            fontSize: '34px',
            color: '#ffffff',
            backgroundColor: '#001caa',
            padding: { x: 20, y: 8 },
            align: 'center'
        };

        // ===============================
        // BOTÃO JOGAR
        // ===============================

        const botaoJogar = this.add.text(w/2, h/2, 'JOGAR', estiloBotao)
        .setOrigin(0.5)
        .setFixedSize(260,60)
        .setAlign('center');

        botaoJogar.setInteractive({ useHandCursor: true });

        botaoJogar.on('pointerover', () => {

            botaoJogar.setStyle({
                backgroundColor: '#6FB7FF',
                color: '#1B2A4A'
            });

            botaoJogar.setScale(1.05);
        });

        botaoJogar.on('pointerout', () => {

            botaoJogar.setStyle({
                backgroundColor: '#001caa',
                color: '#ffffff'
            });

            botaoJogar.setScale(1);
        });

        botaoJogar.on('pointerdown', () => {
            this.scene.start('gameScene');
        });

        this.tweens.add({
            targets: botaoJogar,
            y: botaoJogar.y - 6,
            duration: 900,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // ===============================
        // BOTÃO TUTORIAL
        // ===============================

        const botaoTutorial = this.add.text(w/2, h/2 + 80, 'TUTORIAL', estiloBotao)
        .setOrigin(0.5)
        .setFixedSize(260,60)
        .setAlign('center');

        botaoTutorial.setInteractive({ useHandCursor: true });

        botaoTutorial.on('pointerover', () => {

            botaoTutorial.setStyle({
                backgroundColor: '#6FB7FF',
                color: '#1B2A4A'
            });

            botaoTutorial.setScale(1.05);
        });

        botaoTutorial.on('pointerout', () => {

            botaoTutorial.setStyle({
                backgroundColor: '#001caa',
                color: '#ffffff'
            });

            botaoTutorial.setScale(1);
        });

        botaoTutorial.on('pointerdown', () => {
            this.scene.start('tutorialScene');
        });

        this.tweens.add({
            targets: botaoTutorial,
            y: botaoTutorial.y - 6,
            duration: 900,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        

    }

    update() {
        this.spriteNuvens.tilePositionX += 0.5;
    }
}

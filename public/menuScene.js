/**
 * menuScene - Cena inicial. Fundo, título, botão Jogar.
 */

export class menuScene extends Phaser.Scene {

    constructor() {
        super({ key: 'menuScene' });
    }

    preload() {
        this.load.image('nuvens', 'public/assets/cloud-bg.png');
        this.load.image('ceu', 'public/assets/sky-bg.png');
        this.load.image('titulo', 'public/assets/titulo-jogo.png');
        this.load.image('loja', 'public/assets/store-bg.png');
    }

    create() {
        const w = this.scale.width;
        const h = this.scale.height;

        // Fundo fixo
        this.add.tileSprite(0, 0, w, h, "ceu").setOrigin(0, 0).setScrollFactor(0);

        // Nuvens animadas
        this.spriteNuvens = this.add.tileSprite(0, 0, w, 250, 'nuvens').setOrigin(0, 0).setAlpha(0.8).setScale(1.8);

        // Título e loja
        const imagemTitulo = this.add.image(w / 2, h * 0.25, 'titulo').setOrigin(0.5);
        imagemTitulo.setScale(w / imagemTitulo.width * 0.8);

        const imagemLoja = this.add.image(w / 2, h, 'loja').setOrigin(0.5, 1);
        const escalaX = w / imagemLoja.width;
        imagemLoja.setScale(escalaX, escalaX);

        // Botão Jogar
        const botaoJogar = this.add.text(w / 2, h / 2, 'JOGAR', {
            fontFamily: 'Poppins',
            fontSize: '48px',
            color: '#ffffff',
            backgroundColor: '#001caa',
            padding: { x: 10, y: 5 },
            align: 'center'
        }).setOrigin(0.5);

        botaoJogar.setInteractive({ useHandCursor: true });
        botaoJogar.on('pointerover', () => {
            botaoJogar.setStyle({ backgroundColor: '#6FB7FF', color: '#1B2A4A' });
            botaoJogar.setScale(1.1);
        });
        botaoJogar.on('pointerout', () => {
            botaoJogar.setStyle({ backgroundColor: '#1C6ED5', color: '#ffffff' });
            botaoJogar.setScale(1);
        });
        botaoJogar.on('pointerdown', () => this.scene.start('gameScene'));

        // Efeito bouncing
        this.tweens.add({
            targets: botaoJogar,
            y: botaoJogar.y - 10,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    update() {
        this.spriteNuvens.tilePositionX += 0.5;
    }
}

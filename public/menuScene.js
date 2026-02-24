export class menuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'menuScene' });
    }

    preload() {

        this.load.image('nuvens', 'public/assets/cloud-bg.png');
        this.load.image('ceu', 'public/assets/sky-bg.png')
        this.load.image('titulo', 'public/assets/titulo-jogo.png');
        this.load.image('loja', 'public/assets/store-bg.png')
    }
    create() {

        const width = this.scale.width;
        const height = this.scale.height;

        // Fundo céu

        this.add.tileSprite(0, 0, width, height, "ceu")
            .setOrigin(0, 0)
            .setScrollFactor(0); // Fica fixo na tela

        // Nuvens animadas
        this.nuvens = this.add.tileSprite(0, 0, width, 250, 'nuvens').setOrigin(0, 0).setAlpha(0.8).setScale(1.8);

        // Título
        const titulo = this.add.image(width / 2, height * 0.25, 'titulo').setOrigin(0.5);

        titulo.setScale(width / titulo.width * 0.8);

        // Loja
        const loja = this.add.image(width / 2, height, 'loja')
            .setOrigin(0.5, 1);

        const escalaX = width / loja.width;
        const escalaY = escalaX * 1.0;

        loja.setScale(escalaX, escalaY);

        // Botão
        const playButton = this.add.text(width / 2, height / 2, 'JOGAR', {
            fontFamily: 'Poppins',
            fontSize: '48px',
            color: '#ffffff',
            backgroundColor: '#001caa',
            padding: { x: 10, y: 5 },
            align: 'center'
        }).setOrigin(0.5);

        // Tornar interativo
        playButton.setInteractive({ useHandCursor: true });

        // Hover: muda cor e aumenta levemente
        playButton.on('pointerover', () => {
            playButton.setStyle({ backgroundColor: '#6FB7FF', color: '#1B2A4A' });
            playButton.setScale(1.1); // aumenta um pouco
        });

        playButton.on('pointerout', () => {
            playButton.setStyle({ backgroundColor: '#1C6ED5', color: '#ffffff' });
            playButton.setScale(1); // volta ao tamanho normal
        });

        // Efeito “bouncing” 
        this.tweens.add({
            targets: playButton,
            y: playButton.y - 10,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Clique: inicia a cena do jogo
        playButton.on('pointerdown', () => {
            this.scene.start('padariaScene');
        });
    }

    update() {
        this.nuvens.tilePositionX += 0.5; // faz a textura da imagem deslizar horizontalmente, criando efeito de movimento contínuo.
    }
}

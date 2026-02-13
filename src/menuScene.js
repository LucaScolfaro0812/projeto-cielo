class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {

        this.load.image('titulo', '/assets/titulo.png');
        this.load.image('nuvens', '/assets/cloud-bg1.png');
        this.load.image('cidade', '/assets/city.png')
    }
    create() {

        const width = this.scale.width;
        const height = this.scale.height;


        // Fundo simples
        this.cameras.main.setBackgroundColor('#2f5a79');

        // Cidade
        this.add.image(width / 2, height, 'cidade')
            .setOrigin(0.5, 1);


        // Nuvens animadas
        this.nuvens = this.add.tileSprite(0, 0, width, 250, 'nuvens').setOrigin(0, 0).setAlpha(0.8);
        // .setScale(0.3)
        // this.nuvens.tileScaleX = 0.3;
        // this.nuvens.tileScaleY = 0.3;

        // Escurecer aos poucos
        this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.3);


        // Título
        this.add.image(width / 2, height / 3, 'titulo').setOrigin(0.5);

        // Botão 
        const playButton = this.add.text(width / 2, height / 2, 'JOGAR', {
            fontSize: '36px',
            backgroundColor: '#001caa',
            padding: { x: 30, y: 10 }
        }).setOrigin(0.5);

        playButton.setInteractive();

        playButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

    }

    update() {
        this.nuvens.tilePositionX += 0.2; // faz a textura da imagem deslizar horizontalmente, criando efeito de movimento contínuo.
    }
}

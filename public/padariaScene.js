class PadariaScene extends Phaser.Scene {

    constructor() {
        super({ key: 'PadariaScene' });
    }

    preload() {
        // Carregamento futuro de assets da padaria
        this.preload.image('padaria', './assets/padaria-bg.png');
    }

    create() {
        // Estrutura inicial da cena

        this.add.image(480, 270)
    }

    update() {
        // Atualizações futuras
    }
}
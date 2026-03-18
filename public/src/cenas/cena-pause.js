export class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'pauseScene' });
    }

    create() {
        const largura = this.scale.width;
        const altura = this.scale.height;

        // Fundo escuro semitransparente
        this.add.rectangle(largura / 2, altura / 2, largura, altura, 0x000000, 0.6);

        // Título
        this.add.text(largura / 2, altura / 2 - 120, 'PAUSADO', {
            fontSize: '48px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // ESC fecha o pause e volta ao jogo
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.resume('gameScene');
            this.scene.stop();
        });

        // Botão Continuar
        this._criarBotao(largura / 2, altura / 2 - 20, 'Continuar', () => {
            this.scene.resume('gameScene');
            this.scene.stop();
        });

        // Botão Novo Jogo
        this._criarBotao(largura / 2, altura / 2 + 60, 'Novo Jogo', () => {
            // Limpa todo o progresso salvo no localStorage
            localStorage.removeItem('npcsConquistadosQuantidade');
            localStorage.removeItem('npcsQuizAbertos');
            localStorage.removeItem('npcsConquistadosIds');
            localStorage.removeItem('perguntasJaFeitas');

            this.scene.stop();
            this.scene.stop('gameScene');
            this.scene.start('gameScene');
        });

        // Botão Menu
        this._criarBotao(largura / 2, altura / 2 + 140, 'Menu', () => {
            this.scene.stop();
            this.scene.stop('gameScene');
            this.scene.start('menuScene');
        });
    }

    // Cria um botão de texto clicável com efeito hover
    _criarBotao(x, y, texto, onClick) {
        const botao = this.add.text(x, y, texto, {
            fontSize: '32px',
            fill: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

        // Efeito hover
        botao.on('pointerover', () => botao.setStyle({ fill: '#ffff00' }));
        botao.on('pointerout', () => botao.setStyle({ fill: '#ffffff' }));
        botao.on('pointerdown', onClick);
    }
}

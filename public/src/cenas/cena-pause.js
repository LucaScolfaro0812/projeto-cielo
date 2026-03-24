/**
 * Cena de pausa do jogo.
 * É exibida por cima da gameScene quando o jogador pressiona ESC.
 * Oferece três opções: continuar o jogo, iniciar um novo jogo ou voltar ao menu principal.
 */
export class CenaPausa extends Phaser.Scene {

    /**
     * Define a chave única da cena no Phaser.
     */
    constructor() {
        super({ key: 'pauseScene' });
    }

    /**
     * Cria todos os elementos visuais do menu de pause:
     * fundo escuro, título e botões de ação.
     */
    create(data) {
        // Garante que o pause apareça acima de qualquer outra cena (lojas são adicionadas depois)
        this.scene.bringToTop();

        // Pega as dimensões da tela para centralizar os elementos
        const largura = this.scale.width;
        const altura = this.scale.height;

        // Chave da cena que foi pausada (cidade ou loja)
        const cenaAnterior = data?.cenaAnterior ?? 'gameScene';

        // Fundo escuro semitransparente para escurecer o jogo por baixo
        this.add.rectangle(largura / 2, altura / 2, largura, altura, 0x000000, 0.6);

        // Título do menu de pause centralizado no topo
        this.add.text(largura / 2, altura / 2 - 120, 'PAUSADO', {
            fontSize: '48px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Pressionar ESC novamente fecha o pause e retoma o jogo
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.resume(cenaAnterior);
            this.scene.stop();
        });

        // Botão Continuar — retoma o jogo de onde parou
        this._criarBotao(largura / 2, altura / 2 - 20, 'Continuar', () => {
            this.scene.resume(cenaAnterior);
            this.scene.stop();
        });

        // Botão Novo Jogo — apaga o progresso salvo e reinicia o jogo do zero
        this._criarBotao(largura / 2, altura / 2 + 60, 'Novo Jogo', () => {
            // Remove todas as chaves de progresso do localStorage
            localStorage.removeItem('npcsConquistadosQuantidade');
            localStorage.removeItem('npcsQuizAbertos');
            localStorage.removeItem('npcsConquistadosIds');
            localStorage.removeItem('perguntasJaFeitas');
            localStorage.removeItem('lojaBloqueada');

            // Para a cena pausada e reinicia o jogo do zero
            this.scene.stop();
            this.scene.stop(cenaAnterior);
            this.scene.start('gameScene');
        });

        // Botão Menu — volta para a tela inicial do jogo
        this._criarBotao(largura / 2, altura / 2 + 140, 'Menu', () => {
            this.scene.stop();
            this.scene.stop(cenaAnterior);
            this.scene.start('menuScene');
        });
    }

    /**
     * Cria um botão de texto clicável com efeito de hover.
     * @param {number} x - posição X do botão (centralizado)
     * @param {number} y - posição Y do botão
     * @param {string} texto - texto exibido no botão
     * @param {Function} onClick - função chamada ao clicar no botão
     */
    _criarBotao(x, y, texto, onClick) {
        const botao = this.add.text(x, y, texto, {
            fontSize: '32px',
            fill: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true }); // Muda o cursor para mão ao passar por cima

        // Amarelo ao passar o mouse por cima
        botao.on('pointerover', () => botao.setStyle({ fill: '#ffff00' }));
        // Volta ao branco ao tirar o mouse
        botao.on('pointerout', () => botao.setStyle({ fill: '#ffffff' }));
        // Executa a ação ao clicar
        botao.on('pointerdown', onClick);
    }
}

/**
 * Cena de pausa do jogo.
 * É exibida por cima da gameScene quando o jogador pressiona ESC.
 * Oferece três opções: continuar o jogo, iniciar um novo jogo ou voltar ao menu principal.
 */
import { transicionarPara } from '../utilitarios/transicao-cena.js';
import { resetarSessaoJogo } from '../utilitarios/sessao-jogo.js';

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
        // Reseta o flag de transição para que futuras transições deste menu funcionem
        this._transicionando = false;

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
        this._criarBotao(largura / 2, altura / 2 - 40, 'Continuar', () => {
            this.scene.resume(cenaAnterior);
            this.scene.stop();
        });

        // Botão Configurações — abre o menu de configurações por cima do pause
        this._criarBotao(largura / 2, altura / 2 + 40, 'Configurações', () => {
            this.scene.launch('configScene', { cenaOrigem: 'pauseScene' });
            this.scene.bringToTop('configScene');
        });

        // Botão Novo Jogo — apaga o progresso salvo e reinicia o jogo do zero
        this._criarBotao(largura / 2, altura / 2 + 120, 'Novo Jogo', () => {
            resetarSessaoJogo();

            // Para a cena pausada e inicia novo jogo com fade azul Cielo
            this.scene.stop(cenaAnterior);
            transicionarPara(this, 'gameScene', { mostrarTutorial: false }, 'Iniciando novo jogo...');
        });

        // Botão Menu — para a cena pausada e volta ao menu com fade azul Cielo
        this._criarBotao(largura / 2, altura / 2 + 200, 'Menu', () => {
            this.scene.stop(cenaAnterior);
            transicionarPara(this, 'menuScene', {}, 'Voltando ao menu...');
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

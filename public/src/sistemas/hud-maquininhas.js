import { Maquininhas } from './maquininhas.js';

/**
 * HudMaquininhas - Exibe o estoque de maquininhas do jogador na tela.
 *
 * Cria um container fixo (scrollFactor 0) com uma maquininha e um contador textual.
 * O contador usa o formato "3x", "2x", "1x" ou "0x".
 */
export default class HudMaquininhas {

    /**
     * @param {Phaser.Scene} cena - Cena onde o HUD será criado
     * @param {number} xTela - Posição X base do HUD na tela (padrão: 160)
     * @param {number} yTela - Posição Y base do HUD na tela (padrão: 100)
     */
    constructor(cena, xTela = 160, yTela = 100) {
        this.cena = cena;
        this.xTela = xTela;
        this.yTela = yTela;
        this.slotSize = 100;
        this._criarHud();
    }

    /**
     * Cria os elementos visuais do HUD: uma maquininha e o texto de quantidade.
     * Os tamanhos são ajustados pelo zoom da câmera para manter proporção visual
     * independente do nível de zoom da cena.
     */
    _criarHud() {
        const cam = this.cena.cameras.main;
        // Divide pelo zoom para que o HUD apareça no tamanho correto em tela
        const zoom = cam.zoom || 1;
        const tamanho = this.slotSize / zoom;

        const pad = 10 / zoom;
        const largura = tamanho + pad * 2;
        const altura = tamanho + pad * 2;
        const tamanhoIcone = tamanho * 2.5;
        const posicaoX = cam.width - largura + 430;
        const posicaoY = 5;

        // Container fixo na tela (não se move com a câmera)
        this.container = this.cena.add.container(posicaoX, posicaoY)
            .setScrollFactor(0)
            .setDepth(9999);

        // Fundo escuro semitransparente com borda branca
        const fundo = this.cena.add.rectangle(0, 0, largura, altura, 0x102040, 0.88)
            .setOrigin(0, 0)
            .setStrokeStyle(2 / zoom, 0xffffff, 0.8);

        this.icone = this.cena.add.image(
            pad + tamanho / 2,
            pad + tamanho / 2,
            'maquininhaCielo'
        ).setDisplaySize(tamanhoIcone, tamanhoIcone).setOrigin(0.5, 0.5);

        this.textoQuantidade = this.cena.add.text(
            pad + tamanho,
            pad,
            '0x',
            {
                fontFamily: 'Arial',
                fontSize: `${Math.round(30 / zoom)}px`,
                fontStyle: 'bold',
                color: '#ffffff',
                stroke: '#0b1a2b',
                strokeThickness: Math.max(2, Math.round(3 / zoom))
            }
        ).setOrigin(1, 0);

        this.container.add([fundo, this.icone, this.textoQuantidade]);

        // Sincroniza visualmente com o estoque atual ao criar
        this.atualizar();
    }

    /**
     * Atualiza o contador textual conforme a quantidade atual de maquininhas.
     * Exemplo: 3x, 2x, 1x ou 0x.
     */
    atualizar() {
        const qnt = Maquininhas.qntMaquininhas;
        this.textoQuantidade.setText(`${qnt}x`);
        this.icone.setAlpha(qnt > 0 ? 1 : 0.55);
    }

    /**
     * Remove o container do HUD da cena.
     * Deve ser chamado ao destruir a cena para evitar vazamento de objetos.
     */
    destroy() {
        this.container.destroy();
    }
}

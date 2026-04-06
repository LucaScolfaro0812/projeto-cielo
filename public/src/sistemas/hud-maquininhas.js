import { Maquininhas } from './maquininhas.js';

/**
 * HudMaquininhas - Exibe o estoque de maquininhas do jogador na tela.
 *
 * Cria um container fixo (scrollFactor 0) com um slot para cada maquininha possível.
 * Slots com maquininha disponível ficam opacos; slots vazios ficam translúcidos.
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
        this.slotSize = 140;
        this.espacamento = 4;
        this._criarHud();
    }

    /**
     * Cria os elementos visuais do HUD: fundo e slots de maquininha.
     * Os tamanhos são ajustados pelo zoom da câmera para manter proporção visual
     * independente do nível de zoom da cena.
     */
    _criarHud() {
        const cam = this.cena.cameras.main;
        // Divide pelo zoom para que o HUD apareça no tamanho correto em tela
        const zoom = cam.zoom || 1;
        const tamanho = this.slotSize / zoom;
        const espaco = this.espacamento / zoom;
        const max = Maquininhas.maximoMaquininhas;

        // Deslocamento em relação à posição base para posicionar no canto superior direito
        const offSetX = 870;
        const offSetY = -150;

        const pad = 3 / zoom;

        // Calcula dimensões totais do fundo com base na quantidade de slots
        const largura = max * tamanho + (max - 1) * espaco + pad * 2;
        const altura = tamanho + pad * 2;

        // Container fixo na tela (não se move com a câmera)
        this.container = this.cena.add.container(this.xTela / zoom + offSetX, this.yTela / zoom + offSetY)
            .setScrollFactor(0)
            .setDepth(9999);

        // Fundo escuro semitransparente com borda branca
        const fundo = this.cena.add.rectangle(0, 0, largura, altura, 0x102040, 0.88)
            .setOrigin(0, 0)
            .setStrokeStyle(2 / zoom, 0xffffff, 0.8);

        this.slots = [];
        for (let i = 0; i < max; i++) {
            const img = this.cena.add.image(
                pad + i * (tamanho + espaco),
                pad,
                'maquininhaCielo'
            ).setDisplaySize(tamanho, tamanho).setOrigin(0, 0);
            this.slots.push(img);

            // Aplica escala extra para que a imagem da maquininha fique maior que o slot base
            const fator = 1.5;
            const escala = Math.min(
                tamanho / img.width,
                tamanho / img.height
            ) * fator;

            img.setScale(escala);
        }

        this.container.add([fundo, ...this.slots]);

        // Sincroniza visualmente com o estoque atual ao criar
        this.atualizar();
    }

    /**
     * Atualiza a opacidade de cada slot conforme a quantidade atual de maquininhas.
     * Slots com maquininha: alpha 1 (totalmente visíveis).
     * Slots vazios: alpha 0.25 (translúcidos, indicando que estão indisponíveis).
     */
    atualizar() {
        const qnt = Maquininhas.qntMaquininhas;
        this.slots.forEach((slot, i) => {
            slot.setAlpha(i < qnt ? 1 : 0.25);
        });
    }

    /**
     * Remove o container do HUD da cena.
     * Deve ser chamado ao destruir a cena para evitar vazamento de objetos.
     */
    destroy() {
        this.container.destroy();
    }
}

import { Maquininhas } from './maquininhas.js';

/**
 * HudMaquininhas - Exibe o estoque de maquininhas do jogador na tela.
 */
export default class HudMaquininhas {

    constructor(cena, xTela = 160, yTela = 100) {
        this.cena = cena;
        this.xTela = xTela;
        this.yTela = yTela;
        this.slotSize = 100;
        this._criarHud();
    }

    _criarHud() {
        const cam = this.cena.cameras.main;
        const zoom = cam.zoom || 1;
        const tamanho = this.slotSize / zoom;

        const pad = 10 / zoom;
        const largura = tamanho + pad * 2 + 20 / zoom;
        const altura = tamanho + pad * 2;
        const tamanhoIcone = tamanho * 2.5;
        const posicaoX = cam.width - largura + 430;
        const posicaoY = 5;
        const raio = 12 / zoom;

        this.container = this.cena.add.container(posicaoX, posicaoY)
            .setScrollFactor(0)
            .setDepth(9999);

        // Fundo com cantos arredondados via Graphics
        this.graphics = this.cena.add.graphics();
        this._desenharFundo(largura, altura, raio, 0x10b981); // começa verde

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

        // Guarda dimensões para redesenhar depois
        this._largura = largura;
        this._altura = altura;
        this._raio = raio;

        this.container.add([this.graphics, this.icone, this.textoQuantidade]);
        this.atualizar();
    }

    /**
     * Retorna as cores de fundo e borda do HUD conforme a quantidade de maquininhas.
     * Verde (≥2) → amarelo (1) → vermelho (0) para indicar urgência de recarga.
     */
    _corPorQuantidade(qnt) {
        if (qnt >= 2) return { fundo: 0x0d3b26, borda: 0x10b981 }; // verde
        if (qnt === 1) return { fundo: 0x3b2200, borda: 0xf59e0b }; // laranja
        return { fundo: 0x3b0000, borda: 0xef4444 };                // vermelho
    }

    /**
     * (Re)desenha o fundo arredondado do HUD com sombra, fundo e borda colorida.
     * Chamado na criação e sempre que o estoque muda, para refletir a nova cor.
     */
    _desenharFundo(largura, altura, raio, corBorda) {
        const qnt = Maquininhas.qntMaquininhas;
        const cores = this._corPorQuantidade(qnt);
        this.graphics.clear();
        // Sombra
        this.graphics.fillStyle(0x000000, 0.3);
        this.graphics.fillRoundedRect(3, 3, largura, altura, raio);
        // Fundo
        this.graphics.fillStyle(cores.fundo, 0.95);
        this.graphics.fillRoundedRect(0, 0, largura, altura, raio);
        // Borda
        this.graphics.lineStyle(2, cores.borda, 1);
        this.graphics.strokeRoundedRect(0, 0, largura, altura, raio);
    }

    atualizar() {
        const qnt = Maquininhas.qntMaquininhas;
        this.textoQuantidade.setText(`${qnt}x`);
        this.icone.setAlpha(qnt > 0 ? 1 : 0.45);

        // Redesenha fundo com cor dinâmica
        this._desenharFundo(this._largura, this._altura, this._raio);

        // Pulse no ícone
        this.cena.tweens.add({
            targets: this.icone,
            scaleX: this.icone.scaleX * 1.25,
            scaleY: this.icone.scaleY * 1.25,
            duration: 100,
            yoyo: true,
            ease: 'Sine.easeOut'
        });
    }

    destroy() {
        this.container.destroy();
    }
}

import { Maquininhas } from './maquininhas.js';

export default class HudMaquininhas {
    constructor(cena, xTela = 160, yTela = 100) {
        this.cena = cena;
        this.xTela = xTela;
        this.yTela = yTela;
        this.slotSize = 200;
        this.espacamento = 4;
        this._criarHud();
    }

    _criarHud() {
        const cam = this.cena.cameras.main;
        const zoom = cam.zoom || 1;
        const tamanho = this.slotSize / zoom;
        const espaco = this.espacamento / zoom;
        const padding = 8 / zoom;
        const max = Maquininhas.maximoMaquininhas;

        const larguraFundo = max * tamanho + (max - 1) * espaco + padding * 2;
        const alturaFundo = tamanho + padding * 2;

        // Com setScrollFactor(0) e posição dividida pelo zoom,
        // o HUD sempre aparece em (xTela, yTela) pixels de tela — fixo e estático
        this.container = this.cena.add.container(this.xTela / zoom, this.yTela / zoom)
            .setScrollFactor(0)
            .setDepth(9999);

        this.fundo = this.cena.add.rectangle(0, 0, larguraFundo, alturaFundo, 0x102040, 0.88)
            .setOrigin(0, 0)
            .setStrokeStyle(3 / zoom, 0xffffff, 0.8);

        this.slots = [];
        for (let i = 0; i < max; i++) {
            const img = this.cena.add.image(
                padding + i * (tamanho + espaco),
                padding,
                'maquininhaCielo'
            ).setDisplaySize(tamanho, tamanho).setOrigin(0, 0);
            this.slots.push(img);
        }

        this.container.add([this.fundo, ...this.slots]);
        this.atualizar();
    }

    atualizar() {
        const qnt = Maquininhas.qntMaquininhas;
        this.slots.forEach((slot, i) => {
            slot.setAlpha(i < qnt ? 1 : 0.25);
        });
    }

    destroy() {
        this.container.destroy();
    }
}

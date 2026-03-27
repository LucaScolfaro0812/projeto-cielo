import { Maquininhas } from './maquininhas.js';

export default class HudMaquininhas {
    constructor(cena, xTela = 160, yTela = 100) {
        this.cena = cena;
        this.xTela = xTela;
        this.yTela = yTela;
        this.slotSize = 140;
        this.espacamento = 4;
        this._criarHud();
    }

    _criarHud() {
        const cam = this.cena.cameras.main;
        const zoom = cam.zoom || 1;
        const tamanho = this.slotSize / zoom;
        const espaco = this.espacamento / zoom;
        const max = Maquininhas.maximoMaquininhas;

        const pad = 3 / zoom;
        const largura = max * tamanho + (max - 1) * espaco + pad * 2;
        const altura = tamanho + pad * 2;

        this.container = this.cena.add.container(this.xTela / zoom, this.yTela / zoom)
            .setScrollFactor(0)
            .setDepth(9999);

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
        }

        this.container.add([fundo, ...this.slots]);
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

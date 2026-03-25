/**
 * InterfaceProgressoNpc - HUD visual de progresso dos NPCs (Phaser)
 * Exibe portrait, contador e fundo estilizado fixos no canto superior direito.
 */

export default class InterfaceProgressoNpc {
    /**
     * @param {Phaser.Scene} cena - Cena onde o HUD será exibido
     * @param {function} aoClicarPortrait - Função chamada ao clicar no portrait
     */
    constructor(cena, conquistados, totalNpcs, aoClicarPortrait = null) {
        this.cena = cena;
        this.conquistados = conquistados;
        this.totalNpcs = totalNpcs;
        this.aoClicarPortrait = aoClicarPortrait;
        this._criarHud();
    }

    _criarHud() {
        const larguraTela = this.cena.cameras.main.width;
        const margem = -200; // HUD bem colado no topo
        const portraitSize = 180; // portrait ainda maior
        const padding = 0;

        // HUD super visível e nítido
        const alturaHud = portraitSize + padding * 2;
        const larguraHud = portraitSize + 340 + padding * 2;

        // Container HUD
        this.container = this.cena.add.container(0, 0).setScrollFactor(0).setDepth(9999);

        // Sombra
        this.sombra = this.cena.add.rectangle(
            larguraTela - larguraHud + 10 + 300,
            margem + alturaHud / 2 + 10,
            larguraHud,
            alturaHud,
            0x000000,
            0.35
        ).setOrigin(0, 0).setScrollFactor(0);

        // Fundo arredondado
        this.fundo = this.cena.add.rectangle(
            larguraTela - larguraHud + 300,
            margem + portraitSize / 2,
            larguraHud,
            alturaHud,
            0x102040,
            0.98
        ).setOrigin(0, 0.5).setScrollFactor(0);
        this.fundo.setStrokeStyle(8, 0xffffff, 1);
        this.portrait = this.cena.add.image(
            larguraTela - larguraHud + padding + portraitSize / 2 + 300,
            margem + alturaHud / 2,
            "npcPortraitHud"
        ).setDisplaySize(portraitSize, portraitSize).setScrollFactor(0);

        // Texto de progresso grande e claro 
        this.texto = this.cena.add.text(
            larguraTela - larguraHud + padding + portraitSize + 80 + 300,
            margem + alturaHud / 2,
            this._formatarTexto(),
            {
                font: "680px Arial Black, Arial, sans-serif",
                fill: "#fff",
                fontStyle: "bold",
                align: "left",
                stroke: "#000",
                strokeThickness: 16,
                shadow: { offsetX: 8, offsetY: 8, color: "#000", blur: 12, fill: true }
            }
        ).setOrigin(0, 0.5).setScrollFactor(0);

        // Adiciona ao container
        this.container.add([this.sombra, this.fundo, this.portrait, this.texto]);

        // Clique no portrait abre painel
        this.portrait.setInteractive({ useHandCursor: true });
        this.portrait.on('pointerdown', () => {
            if (this.aoClicarPortrait) {
                this.aoClicarPortrait();
            }
        });
    }

    atualizar(conquistados, totalNpcs) {
        this.conquistados = conquistados;
        this.totalNpcs = totalNpcs;
        this.texto.setText(this._formatarTexto());
    }

    _formatarTexto() {
        return `${this.conquistados.toString().padStart(2, "0")}/${this.totalNpcs.toString().padStart(2, "0")}`;
    }

    setVisible(visible) {
        this.container.setVisible(visible);
    }

    destroy() {
        this.container.destroy();
    }
}

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
        this.container = this.cena.add.container(160, 0).setScrollFactor(0).setDepth(9999);

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
        // Seleciona o NPC principal para o HUD (exemplo: o primeiro da lista)
        const npcs = window?.obterListaNpcs ? window.obterListaNpcs() : [];
        let portraitKey = "npc_cafeScene-nao-interagido";
        if (npcs && npcs.length > 0) {
            // Mostra o primeiro NPC conquistado, ou o primeiro da lista
            const npcConquistado = npcs.find(n => n.estado === "conquistado");
            const npc = npcConquistado || npcs[0];
            portraitKey = `${npc.id}-${npc.estado}`;
        }
        this.portrait = this.cena.add.image(
            larguraTela - larguraHud + padding + portraitSize / 2 + 300,
            margem + alturaHud / 2,
            portraitKey
        ).setDisplaySize(portraitSize, portraitSize).setScrollFactor(0);
        this.portrait.setScale(0.25);

        // Texto de progresso grande e claro 
        this.texto = this.cena.add.text(
            larguraTela - larguraHud + padding + portraitSize + 80 + 300,
            margem + alturaHud / 2,
            this._formatarTexto(),
            {
                font: "120px Arial Black, Arial, sans-serif",
                fill: "#fff",
                fontStyle: "bold",
                align: "left"
            }
        ).setOrigin(0, 0.5).setScrollFactor(0);
        this.texto.setScale(5);

        // Adiciona ao container
        this.container.add([this.fundo, this.portrait, this.texto]);

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

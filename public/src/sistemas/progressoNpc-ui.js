import { carregarDados, salvarDados } from "../utilitarios/armazenamento.js";
import { obterListaNpcs } from "../utilitarios/progresoNPCs.js";

/**
 * InterfaceProgressoNpc - HUD visual de progresso dos NPCs (Phaser)
 * Exibe portrait, contador e fundo estilizado fixos no canto superior direito.
 */

export default class InterfaceProgressoNpc {
    /**
     * @param {Phaser.Scene} cena - Cena onde o HUD será exibido
     * @param {number} conquistados - Quantidade de NPCs já conquistados
     * @param {number} totalNpcs - Total de NPCs no jogo
     * @param {function} aoClicarPortrait - Função chamada ao clicar no portrait (abre painel)
     */
    constructor(cena, conquistados, totalNpcs, aoClicarPortrait = null) {
        this.cena = cena;
        this.conquistados = conquistados;
        this.totalNpcs = totalNpcs;
        this.aoClicarPortrait = aoClicarPortrait;
        this.chaveAssinaturaReconhecida = "hudNpcAssinaturaReconhecida";
        this.escalaBaseExclamacao = 2.4;
        this.temMudancaPendente = false;
        this.tweenExclamacao = null;
        this.eventoMonitoramentoExclamacao = null;
        this._criarHud();
    }

    /**
     * Cria todos os elementos visuais do HUD: fundo, portrait e texto de progresso.
     *
     * O portrait exibe o primeiro NPC conquistado encontrado na lista global,
     * ou o primeiro NPC da lista se nenhum foi conquistado ainda.
     * O texto mostra o progresso no formato "XX/YY" (ex: "03/12").
     *
     * Os elementos são fixos na tela (scrollFactor 0) e ficam no topo da pilha de renderização.
     */
    _criarHud() {
        const larguraTela = this.cena.cameras.main.width;
        const margem = -200; // HUD bem colado no topo
        const portraitSize = 180; // portrait ainda maior
        const padding = 0;

        // Dimensões totais do fundo do HUD
        const alturaHud = portraitSize + padding * 2;
        const larguraHud = portraitSize + 340 + padding * 2;

        // Container HUD fixo na tela (não se move com a câmera)
        this.container = this.cena.add.container(160, 0).setScrollFactor(0).setDepth(9999);

        // Fundo escuro com borda branca
        this.fundo = this.cena.add.rectangle(
            larguraTela - larguraHud + 300,
            margem + portraitSize / 2,
            larguraHud,
            alturaHud,
            0x102040,
            0.98
        ).setOrigin(0, 0.5).setScrollFactor(0);
        this.fundo.setStrokeStyle(8, 0xffffff, 1);

        // Seleciona o NPC a exibir no portrait:
        // prioriza o primeiro conquistado; se nenhum, usa o primeiro da lista
        const npcs = obterListaNpcs();
        let portraitKey = "npc_cafeScene-nao-interagido";
        if (npcs && npcs.length > 0) {
            const npcConquistado = npcs.find(n => n.estado === "conquistado");
            const npc = npcConquistado || npcs[0];
            portraitKey = `${npc.id}-${npc.estado}`;
        }

        // Portrait do NPC selecionado
        this.portrait = this.cena.add.image(
            larguraTela - larguraHud + padding + portraitSize / 2 + 300,
            margem + alturaHud / 2,
            portraitKey
        ).setDisplaySize(portraitSize, portraitSize).setScrollFactor(0);
        this.portrait.setScale(0.25);

        // Indicador simples: apenas exclamação vermelha, sem círculo de fundo.
        this.indicadorExclamacao = this.cena.add.container(
            larguraTela - larguraHud + padding + portraitSize / 2 + 360,
            margem + 62
        ).setScrollFactor(0);
        this.indicadorExclamacao.setScale(this.escalaBaseExclamacao);
        const hasteExclamacao = this.cena.add.rectangle(0, -6, 8, 24, 0xff2d2d);
        const pontoExclamacao = this.cena.add.circle(0, 12, 4, 0xff2d2d);
        this.indicadorExclamacao.add([hasteExclamacao, pontoExclamacao]);

        this._inicializarNotificacaoExclamacao();

        // Texto de progresso em formato "XX/YY"
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

        // Adiciona todos os elementos ao container
        this.container.add([this.fundo, this.portrait, this.indicadorExclamacao, this.texto]);

        // Clique no portrait aciona o callback (abre painel lateral de NPCs)
        this.portrait.setInteractive({ useHandCursor: true });
        this.portrait.on('pointerdown', () => {
            this._reconhecerMudancasNpcs();
            if (this.aoClicarPortrait) {
                this.aoClicarPortrait();
            }
        });
    }

    _obterAssinaturaEstadosNpcs() {
        const npcs = obterListaNpcs();
        return npcs.map((npc) => `${npc.id}:${npc.estado}`).join("|");
    }

    _inicializarNotificacaoExclamacao() {
        const assinaturaAtual = this._obterAssinaturaEstadosNpcs();
        const assinaturaReconhecida = carregarDados(this.chaveAssinaturaReconhecida, null);

        if (!assinaturaReconhecida) {
            this._salvarAssinaturaReconhecida(assinaturaAtual);
            this.temMudancaPendente = false;
        } else {
            this.temMudancaPendente = assinaturaReconhecida !== assinaturaAtual;
        }

        this.ultimaAssinaturaObservada = assinaturaAtual;
        this._atualizarEstadoVisualExclamacao();

        this.eventoMonitoramentoExclamacao = this.cena.time.addEvent({
            delay: 500,
            loop: true,
            callback: () => {
                const novaAssinatura = this._obterAssinaturaEstadosNpcs();
                if (novaAssinatura !== this.ultimaAssinaturaObservada) {
                    this.ultimaAssinaturaObservada = novaAssinatura;
                    this.temMudancaPendente = true;
                    this._atualizarEstadoVisualExclamacao();
                }
            }
        });
    }

    _salvarAssinaturaReconhecida(assinatura) {
        salvarDados(this.chaveAssinaturaReconhecida, assinatura);
    }

    _reconhecerMudancasNpcs() {
        const assinaturaAtual = this._obterAssinaturaEstadosNpcs();
        this.ultimaAssinaturaObservada = assinaturaAtual;
        this._salvarAssinaturaReconhecida(assinaturaAtual);
        this.temMudancaPendente = false;
        this._atualizarEstadoVisualExclamacao();
    }

    _atualizarEstadoVisualExclamacao() {
        if (this.temMudancaPendente) {
            if (!this.tweenExclamacao) {
                this.tweenExclamacao = this.cena.tweens.add({
                    targets: this.indicadorExclamacao,
                    scaleX: this.escalaBaseExclamacao + 0.3,
                    scaleY: this.escalaBaseExclamacao + 0.3,
                    alpha: 0.65,
                    duration: 650,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });
            }
            return;
        }

        if (this.tweenExclamacao) {
            this.tweenExclamacao.stop();
            this.cena.tweens.remove(this.tweenExclamacao);
            this.tweenExclamacao = null;
        }

        this.indicadorExclamacao.setScale(this.escalaBaseExclamacao);
        this.indicadorExclamacao.setAlpha(1);
    }

    /**
     * Atualiza os valores de progresso e re-renderiza o texto.
     * @param {number} conquistados - Novo valor de NPCs conquistados
     * @param {number} totalNpcs - Total de NPCs (geralmente fixo)
     */
    atualizar(conquistados, totalNpcs) {
        this.conquistados = conquistados;
        this.totalNpcs = totalNpcs;
        this.texto.setText(this._formatarTexto());
    }

    /**
     * Formata o texto de progresso com zero-padding para sempre exibir dois dígitos.
     * Exemplo: 3 conquistados de 12 → "03/12"
     * @returns {string}
     */
    _formatarTexto() {
        return `${this.conquistados.toString().padStart(2, "0")}/${this.totalNpcs.toString().padStart(2, "0")}`;
    }

    /**
     * Mostra ou oculta o container do HUD.
     * @param {boolean} visible
     */
    setVisible(visible) {
        this.container.setVisible(visible);
    }

    /**
     * Remove o container e todos seus filhos da cena.
     * Deve ser chamado ao trocar de cena para evitar vazamento de objetos.
     */
    destroy() {
        if (this.tweenExclamacao) {
            this.tweenExclamacao.stop();
            this.cena.tweens.remove(this.tweenExclamacao);
            this.tweenExclamacao = null;
        }
        if (this.eventoMonitoramentoExclamacao) {
            this.eventoMonitoramentoExclamacao.remove(false);
            this.eventoMonitoramentoExclamacao = null;
        }
        this.container.destroy();
    }
}

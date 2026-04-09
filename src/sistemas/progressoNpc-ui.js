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
        const xFundo = larguraTela - larguraHud + 300;
        const yFundo = margem + portraitSize / 2;

        // Guarda para reuso na barra
        this._xFundo = xFundo;
        this._yFundo = yFundo;
        this._larguraHud = larguraHud;
        this._alturaHud = alturaHud;

        // Container HUD fixo na tela (não se move com a câmera)
        this.container = this.cena.add.container(160, 0).setScrollFactor(0).setDepth(9999);

        // Fundo com cantos arredondados via Graphics
        this.fundoGraphics = this.cena.add.graphics().setScrollFactor(0);
        this._desenharFundoProgresso();
        this.fundo = this.fundoGraphics; // compatibilidade com código existente

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

        // Texto de progresso em formato "XX/YY" com cor dinâmica
        this.texto = this.cena.add.text(
            larguraTela - larguraHud + padding + portraitSize + 80 + 300,
            margem + alturaHud / 2 - 20,
            this._formatarTexto(),
            {
                font: "120px Arial Black, Arial, sans-serif",
                fill: this._corTextoProgresso(),
                fontStyle: "bold",
                align: "left"
            }
        ).setOrigin(0, 0.5).setScrollFactor(0);
        this.texto.setScale(5);

        // Barra de progresso horizontal
        const barraX = xFundo + 8;
        const barraY = yFundo + alturaHud / 2 - 14;
        const barraLarguraTotal = larguraHud - 16;
        const barraAltura = 10;
        this.barraGraphics = this.cena.add.graphics().setScrollFactor(0);
        this._xBarra = barraX;
        this._yBarra = barraY;
        this._barraLarguraTotal = barraLarguraTotal;
        this._barraAltura = barraAltura;
        this._desenharBarra();

        // Adiciona todos os elementos ao container
        this.container.add([this.fundoGraphics, this.barraGraphics, this.portrait, this.indicadorExclamacao, this.texto]);

        // Clique no portrait aciona o callback (abre painel lateral de NPCs)
        this.portrait.setInteractive({ useHandCursor: true });
        this.portrait.on('pointerdown', () => {
            this._reconhecerMudancasNpcs();
            if (this.aoClicarPortrait) {
                this.aoClicarPortrait();
            }
        });
    }

    _corTextoProgresso() {
        const pct = this.conquistados / this.totalNpcs;
        if (pct >= 0.75) return '#10b981'; // verde
        if (pct >= 0.4)  return '#f59e0b'; // amarelo
        return '#ffffff';                   // branco
    }

    _desenharFundoProgresso() {
        const { _xFundo: x, _yFundo: y, _larguraHud: w, _alturaHud: h } = this;
        this.fundoGraphics.clear();
        // Sombra
        this.fundoGraphics.fillStyle(0x000000, 0.3);
        this.fundoGraphics.fillRoundedRect(x + 4, y - h / 2 + 4, w, h, 14);
        // Fundo
        this.fundoGraphics.fillStyle(0x102040, 0.97);
        this.fundoGraphics.fillRoundedRect(x, y - h / 2, w, h, 14);
        // Borda
        this.fundoGraphics.lineStyle(4, 0x3b82f6, 1);
        this.fundoGraphics.strokeRoundedRect(x, y - h / 2, w, h, 14);
    }

    _desenharBarra() {
        const { _xBarra: x, _yBarra: y, _barraLarguraTotal: wTotal, _barraAltura: bh } = this;
        const preenchimento = Math.max(0, (this.conquistados / this.totalNpcs)) * wTotal;
        const pct = this.conquistados / this.totalNpcs;
        const corBarra = pct >= 0.75 ? 0x10b981 : pct >= 0.4 ? 0xf59e0b : 0x3b82f6;

        this.barraGraphics.clear();
        // Fundo da barra
        this.barraGraphics.fillStyle(0x000000, 0.4);
        this.barraGraphics.fillRoundedRect(x, y, wTotal, bh, 5);
        // Preenchimento
        if (preenchimento > 0) {
            this.barraGraphics.fillStyle(corBarra, 1);
            this.barraGraphics.fillRoundedRect(x, y, preenchimento, bh, 5);
        }
    }

    /**
     * Gera uma string que representa o estado atual de todos os NPCs.
     * Formato: "id1:estado1|id2:estado2|..." — usada para detectar mudanças sem comparar objeto a objeto.
     * @returns {string}
     */
    _obterAssinaturaEstadosNpcs() {
        const npcs = obterListaNpcs();
        return npcs.map((npc) => `${npc.id}:${npc.estado}`).join("|");
    }

    /**
     * Inicializa o sistema de notificação de mudanças nos NPCs.
     *
     * Na primeira execução (sem assinatura salva), registra o estado atual como "já visto".
     * Nas execuções seguintes, compara a assinatura salva com a atual para saber se
     * houve mudanças desde a última vez que o jogador abriu o painel.
     *
     * Um evento periódico (a cada 500ms) monitora mudanças em tempo real e aciona
     * o indicador de exclamação quando o estado dos NPCs muda.
     */
    _inicializarNotificacaoExclamacao() {
        const assinaturaAtual = this._obterAssinaturaEstadosNpcs();
        const assinaturaReconhecida = carregarDados(this.chaveAssinaturaReconhecida, null);

        if (!assinaturaReconhecida) {
            // Primeira execução: salva estado atual para não mostrar exclamação sem motivo
            this._salvarAssinaturaReconhecida(assinaturaAtual);
            this.temMudancaPendente = false;
        } else {
            // Compara com a última assinatura vista — diferença = mudança pendente
            this.temMudancaPendente = assinaturaReconhecida !== assinaturaAtual;
        }

        this.ultimaAssinaturaObservada = assinaturaAtual;
        this._atualizarEstadoVisualExclamacao();

        // Polling leve a cada 500ms para detectar mudanças durante a partida
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

    /**
     * Persiste a assinatura atual dos NPCs como "reconhecida" no localStorage.
     * @param {string} assinatura
     */
    _salvarAssinaturaReconhecida(assinatura) {
        salvarDados(this.chaveAssinaturaReconhecida, assinatura);
    }

    /**
     * Marca todas as mudanças de NPC como "vistas" pelo jogador.
     * Chamado ao abrir o painel, para zerar o indicador de exclamação.
     */
    _reconhecerMudancasNpcs() {
        const assinaturaAtual = this._obterAssinaturaEstadosNpcs();
        this.ultimaAssinaturaObservada = assinaturaAtual;
        this._salvarAssinaturaReconhecida(assinaturaAtual);
        this.temMudancaPendente = false;
        this._atualizarEstadoVisualExclamacao();
    }

    /**
     * Liga ou desliga a animação de pulsação do indicador de exclamação.
     * Pulsa enquanto houver mudanças pendentes; para e restaura o estado base quando não há.
     */
    _atualizarEstadoVisualExclamacao() {
        if (this.temMudancaPendente) {
            // Inicia a pulsação apenas se ainda não estiver rodando
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

        // Para a pulsação e restaura o visual padrão
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
        this.texto.setFill(this._corTextoProgresso());
        this._desenharBarra();

        // Pulse no texto ao atualizar o progresso
        const escalaOriginal = this.texto.scaleX;
        this.cena.tweens.add({
            targets: this.texto,
            scaleX: escalaOriginal * 1.3,
            scaleY: escalaOriginal * 1.3,
            duration: 120,
            yoyo: true,
            ease: 'Sine.easeOut'
        });
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
        if (this.barraGraphics) this.barraGraphics.destroy();
    }
}

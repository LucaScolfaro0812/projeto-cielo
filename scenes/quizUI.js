/**
 * QuizUI - Interface visual do quiz (Phaser). Core do jogo - design impecável.
 */

// Bloco 1: dimensões
const NUMERO_OPCOES = 4;
const ALTURA_BOTAO = 46;
const ESPACO_BOTOES = 8;
const LARGURA_PORTRAIT_NPC = 72;
const ALTURA_CABECALHO = 100;
const LARGURA_BARRA = 26;
const ALTURA_BARRA = 150;
const LARGURA_COLUNA_BARRA = 48;
const LARGURA_BADGE = 38;

// Bloco 2: cores (identidade Cielo - paleta atraente)
const COR_OVERLAY = 0x0f172a;
const OPAC_OVERLAY = 0.65;
const COR_FUNDO_MODAL = 0xffffff;
const COR_SOMBRA = 0x0c4a6e;
const COR_BORDA_MODAL = 0x0284c7;
const COR_FUNDO_CABECALHO = 0xf0f9ff;
const COR_PORTRAIT_NPC = 0xe0f2fe;
const COR_BADGE = 0x0369a1;
const COR_TEXTO = "#0c4a6e";
const COR_TEXTO_SECUNDARIO = "#64748b";
const COR_BOTAO_FUNDO = 0xffffff;
const COR_BOTAO_HOVER = 0xe0f2fe;
const COR_BOTAO_BORDA = 0x7dd3fc;
const COR_BARRA_FUNDO = 0xe0f2fe;
const COR_BARRA_BAIXA = 0xef4444;
const COR_BARRA_MEDIA = 0xf59e0b;
const COR_BARRA_ALTA = 0x10b981;

// Bloco 3: fontes e estilo
const ESCALA_NPC = 0.22;
const PROFUNDIDADE_UI = 1000;
const TAM_FONTE_PERGUNTA = "17px";
const TAM_FONTE_OPCAO = "14px";
const TAM_FONTE_BADGE = "13px";
const TAM_FONTE_TIMER = "15px";
const TAM_FONTE_FEEDBACK = "16px";
const TAM_FONTE_CONVERSAO = "11px";

export default class QuizUI {

    constructor(cena, opcoes = {}) {
        this.cena = cena;
        this.larguraModal = opcoes.larguraModal ?? 660;
        this.alturaModal = opcoes.alturaModal ?? 420;
        this.padding = opcoes.padding ?? 18;
        this.larguraColunaBarra = opcoes.larguraColunaBarra ?? LARGURA_COLUNA_BARRA;
        this.alturaMaxBarra = opcoes.alturaMaxBarraConversao ?? ALTURA_BARRA;
        this.duracaoFeedback = opcoes.duracaoFeedback ?? 1.5;
        this.chaveImagemNpc = opcoes.chaveImagemNpc ?? "npc";
        this.aoSelecionarResposta = null;

        this._criarInterface();
    }

    _criarInterface() {
        this._criarContainerRaiz();
        this._criarOverlay();
        this._criarModal();
        this._criarBarraConversao();
        this._criarConteudo();
    }

    _criarContainerRaiz() {
        this.containerPrincipal = this.cena.add.container(0, 0).setDepth(PROFUNDIDADE_UI);
    }

    _criarOverlay() {
        const cam = this.cena.cameras.main;

        const w = cam.displayWidth;
        const h = cam.displayHeight;

        const cx = cam.worldView.centerX - (w / 2);
        const cy = cam.worldView.centerY - (h / 2);

        this.fundoOverlayRectangle = this.cena.add.rectangle(cx, cy, w, h, COR_OVERLAY, OPAC_OVERLAY).setOrigin(0);
        this.fundoOverlayRectangle.setInteractive({ useHandCursor: false });
        this.fundoOverlayRectangle.on("pointerdown", () => {});
        this.containerPrincipal.add(this.fundoOverlayRectangle);
    }

    _criarModal() {
        const cam = this.cena.cameras.main;
        const cx = cam.worldView.centerX;
        const cy = cam.worldView.centerY;


        this.containerModal = this.cena.add.container(cx, cy);

        this.retanguloSombra = this.cena.add.rectangle(5, 5, this.larguraModal + 10, this.alturaModal + 10, COR_SOMBRA, 0.15).setOrigin(0.5);
        this.retanguloFundoModal = this.cena.add.rectangle(0, 0, this.larguraModal, this.alturaModal, COR_FUNDO_MODAL).setOrigin(0.5);
        this.retanguloFundoModal.setStrokeStyle(2, COR_BORDA_MODAL);

        this.containerPrincipal.add(this.containerModal);
    }

    _criarBarraConversao() {
        const metadeLargura = this.larguraModal / 2;
        const posXBarra = -metadeLargura + this.padding + this.larguraColunaBarra / 2;
        this.containerBarra = this.cena.add.container(posXBarra, 40);

        this.textoLabelConversao = this.cena.add.text(0, -this.alturaMaxBarra / 2 - 18, "Conversão", {
            fontSize: TAM_FONTE_CONVERSAO, color: COR_TEXTO_SECUNDARIO, fontStyle: "bold"
        }).setOrigin(0.5);

        this.retanguloBarraFundo = this.cena.add.rectangle(0, 0, LARGURA_BARRA, this.alturaMaxBarra, COR_BARRA_FUNDO).setOrigin(0.5);
        this.retanguloBarraFundo.setStrokeStyle(1, 0xbae6fd);

        const yBase = this.alturaMaxBarra / 2;
        this.retanguloBarraPreenchimento = this.cena.add.rectangle(0, yBase, LARGURA_BARRA - 4, 0, COR_BARRA_MEDIA).setOrigin(0.5, 1);

        this.textoValorConversao = this.cena.add.text(0, yBase + 16, "50", {
            fontSize: "12px", color: COR_TEXTO, fontStyle: "bold"
        }).setOrigin(0.5);

        this.containerBarra.add([
            this.textoLabelConversao,
            this.retanguloBarraFundo,
            this.retanguloBarraPreenchimento,
            this.textoValorConversao
        ]);

        this.containerModal.add(this.retanguloSombra);
        this.containerModal.add(this.retanguloFundoModal);
        this.containerModal.add(this.containerBarra);
    }

    // NPC em portrait isolado à esquerda; pergunta à direita, sem sobreposição
    _criarConteudo() {
        const metadeLargura = this.larguraModal / 2;
        const metadeAltura = this.alturaModal / 2;
        const posXConteudo = -metadeLargura + this.larguraColunaBarra + this.padding;
        const posYConteudo = -metadeAltura + this.padding;
        const larguraConteudo = this.larguraModal - this.larguraColunaBarra - this.padding * 2;

        this.containerConteudo = this.cena.add.container(posXConteudo, posYConteudo);

        this._criarCabecalho(larguraConteudo);
        this._criarPergunta(larguraConteudo);
        this._criarBotoes(larguraConteudo);
        this._criarAreaFeedback(larguraConteudo);

        this.containerConteudo.add([
            this.containerCabecalho,
            this.containerPergunta,
            this.containerBotoes,
            this.textoFeedback
        ]);
        this.containerModal.add(this.containerConteudo);
    }

    _criarCabecalho(larguraConteudo) {
        this.containerCabecalho = this.cena.add.container(0, 0);

        // Portrait do NPC: caixa fixa à esquerda, jogador dentro (não invade a pergunta)
        const posXPortrait = 0;
        const posYPortrait = 0;
        this.retanguloPortraitNpc = this.cena.add.rectangle(
            posXPortrait, posYPortrait,
            LARGURA_PORTRAIT_NPC, ALTURA_CABECALHO,
            COR_PORTRAIT_NPC
        ).setOrigin(0, 0);
        this.retanguloPortraitNpc.setStrokeStyle(1, 0x7dd3fc);

        this.imagemNpc = this.cena.add.image(
            posXPortrait + LARGURA_PORTRAIT_NPC / 2,
            posYPortrait + ALTURA_CABECALHO / 2,
            this.chaveImagemNpc
        ).setOrigin(0.5).setScale(ESCALA_NPC);

        // Caixa da pergunta: à direita do portrait, com margem
        const margemEntrePortraitEPergunta = 12;
        const posXCaixa = LARGURA_PORTRAIT_NPC + margemEntrePortraitEPergunta;
        const larguraCaixa = larguraConteudo - LARGURA_PORTRAIT_NPC - margemEntrePortraitEPergunta - 8;

        this.retanguloCabecalho = this.cena.add.rectangle(
            posXCaixa, 0, larguraCaixa, ALTURA_CABECALHO, COR_FUNDO_CABECALHO
        ).setOrigin(0, 0);
        this.retanguloCabecalho.setStrokeStyle(1, 0xbae6fd);

        // Timer em badge (pill)
        const posXTimer = posXCaixa + larguraCaixa - 42;
        this.retanguloTimer = this.cena.add.rectangle(posXTimer, 6, 38, 22, COR_BADGE).setOrigin(0, 0);
        this.textoTimer = this.cena.add.text(posXTimer + 19, 17, "15s", {
            fontSize: TAM_FONTE_TIMER, color: "#ffffff", fontStyle: "bold"
        }).setOrigin(0.5);
        this.containerCabecalho.add([
            this.retanguloPortraitNpc,
            this.imagemNpc,
            this.retanguloCabecalho,
            this.retanguloTimer,
            this.textoTimer
        ]);
    }

    // Pergunta inicia após o portrait, com margem para não ser coberta
    _criarPergunta(larguraConteudo) {
        const margemEsquerda = LARGURA_PORTRAIT_NPC + 20;
        const posX = margemEsquerda;
        const posY = 36;
        const larguraTexto = larguraConteudo - margemEsquerda - 24;

        this.containerPergunta = this.cena.add.container(0, 0);
        this.textoPergunta = this.cena.add.text(posX, posY, "", {
            fontSize: TAM_FONTE_PERGUNTA,
            color: COR_TEXTO,
            fontStyle: "bold",
            wordWrap: { width: larguraTexto }
        });
        this.containerPergunta.add(this.textoPergunta);
    }

    _criarBotoes(larguraConteudo) {
        const posYInicio = ALTURA_CABECALHO + 14;
        this.containerBotoes = this.cena.add.container(0, posYInicio);
        this.listaTextoBotoes = [];

        const letras = ["A", "B", "C", "D"];
        for (let i = 0; i < NUMERO_OPCOES; i++) {
            const posY = i * (ALTURA_BOTAO + ESPACO_BOTOES);

            const retanguloFundoBotao = this.cena.add.rectangle(
                LARGURA_PORTRAIT_NPC, posY,
                larguraConteudo - LARGURA_PORTRAIT_NPC, ALTURA_BOTAO,
                COR_BOTAO_FUNDO
            ).setOrigin(0, 0).setInteractive({ useHandCursor: true });
            retanguloFundoBotao.setStrokeStyle(1, COR_BOTAO_BORDA);

            const retanguloBadge = this.cena.add.rectangle(
                LARGURA_PORTRAIT_NPC, posY, LARGURA_BADGE, ALTURA_BOTAO, COR_BADGE
            ).setOrigin(0, 0);

            const textoBadgeLetra = this.cena.add.text(
                LARGURA_PORTRAIT_NPC + LARGURA_BADGE / 2, posY + ALTURA_BOTAO / 2,
                letras[i],
                { fontSize: TAM_FONTE_BADGE, color: "#ffffff", fontStyle: "bold" }
            ).setOrigin(0.5);

            const textoOpcaoBotao = this.cena.add.text(
                LARGURA_PORTRAIT_NPC + LARGURA_BADGE + 10, posY + ALTURA_BOTAO / 2,
                "",
                { fontSize: TAM_FONTE_OPCAO, color: COR_TEXTO }
            ).setOrigin(0, 0.5);
            textoOpcaoBotao.setWordWrapWidth(larguraConteudo - LARGURA_PORTRAIT_NPC - LARGURA_BADGE - 70);

            retanguloFundoBotao.on("pointerover", () => retanguloFundoBotao.setFillStyle(COR_BOTAO_HOVER));
            retanguloFundoBotao.on("pointerout", () => retanguloFundoBotao.setFillStyle(COR_BOTAO_FUNDO));

            const idx = i;
            retanguloFundoBotao.on("pointerdown", () => {
                if (this.aoSelecionarResposta && idx >= 0 && idx < NUMERO_OPCOES) {
                    this.aoSelecionarResposta(idx);
                }
            });

            this.containerBotoes.add([retanguloFundoBotao, retanguloBadge, textoBadgeLetra, textoOpcaoBotao]);
            this.listaTextoBotoes.push(textoOpcaoBotao);
        }
    }

    _criarAreaFeedback(larguraConteudo) {
        const posY = ALTURA_CABECALHO + 14 + NUMERO_OPCOES * (ALTURA_BOTAO + ESPACO_BOTOES) + 12;
        this.textoFeedback = this.cena.add.text(larguraConteudo / 2, posY, "", {
            fontSize: TAM_FONTE_FEEDBACK, color: COR_TEXTO, fontStyle: "bold"
        }).setOrigin(0.5).setVisible(false);
    }

    definirPergunta(pergunta) {
        if (!pergunta) return;
        this.textoPergunta.setText(pergunta.pergunta ?? "");
        const opcoes = pergunta.opcoes ?? [];
        for (let i = 0; i < NUMERO_OPCOES; i++) {
            if (this.listaTextoBotoes[i]) this.listaTextoBotoes[i].setText(opcoes[i] ?? "");
        }
    }

    definirTimer(segundos) {
        this.textoTimer.setText(`${segundos}s`);
    }

    definirConversao(valor) {
        const v = Phaser.Math.Clamp(valor, 0, 100);
        const alturaPreenchimento = v <= 0 ? 0 : (v / 100) * (this.alturaMaxBarra - 4);
        const alturaFinal = Math.max(0, Math.min(alturaPreenchimento, this.alturaMaxBarra - 4));

        let cor = COR_BARRA_BAIXA;
        if (v > 70) cor = COR_BARRA_ALTA;
        else if (v > 40) cor = COR_BARRA_MEDIA;

        this.retanguloBarraPreenchimento.setFillStyle(cor);
        this.retanguloBarraPreenchimento.setSize(LARGURA_BARRA - 4, Math.max(1, alturaFinal));
        this.textoValorConversao.setText(String(Math.round(v)));
    }

    exibirFeedback(pontos) {
        let msg = "Resposta fraca.";
        if (pontos === 3) msg = "Excelente!";
        else if (pontos === 2) msg = "Boa resposta!";
        this.textoFeedback.setText(msg);
        this.textoFeedback.setVisible(true);
        this.cena.time.delayedCall(this.duracaoFeedback, () => this.textoFeedback.setVisible(false));
    }

    /**
     * Exibe tela de resultado ao fim do quiz
     * @param {boolean} conquistou - Se o jogador conquistou o NPC
     * @param {Function} callback - Chamado após fechar o resultado
     */
    exibirResultado(conquistou, callback) {
        const cam = this.cena.cameras.main;
        const cx = cam.worldView.centerX;
        const cy = cam.worldView.centerY;

        const largura = 340;
        const altura = 160;

        const fundo = this.cena.add.rectangle(cx, cy, largura, altura, conquistou ? 0x10b981 : 0xef4444)
            .setOrigin(0.5)
            .setDepth(PROFUNDIDADE_UI + 1);

        const msg = conquistou ? "NPC Conquistado!" : "NPC não conquistado";
        const texto = this.cena.add.text(cx, cy, msg, {
            fontSize: "26px",
            color: "#ffffff",
            fontStyle: "bold"
        }).setOrigin(0.5).setDepth(PROFUNDIDADE_UI + 2);

        this.cena.time.delayedCall(2500, () => {
            fundo.destroy();
            texto.destroy();
            if (callback) callback();
        });
    }

    mostrar() {
        this.containerPrincipal.setVisible(true);
    }

    esconder() {
        this.containerPrincipal.setVisible(false);
    }
}

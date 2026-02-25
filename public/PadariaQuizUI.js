// Constantes de layout e estilo
const NUMERO_BOTOES = 4;
const ALTURA_BOTAO = 38;
const ESPACAMENTO_BOTAO = 48;
const OFFSET_TEXTO_BOTAO_X = 12;
const OFFSET_TEXTO_BOTAO_Y = 10;
const PADDING_TEXTO_BOTAO = 20;
const POSICAO_CONTAINER_BOTOES_Y = 130;
const POSICAO_FEEDBACK_Y = 330;
const POSICAO_PERGUNTA_Y = 70;
const POSICAO_TIMER_X = 80;
const POSICAO_TIMER_Y = 10;

const LARGURA_BARRA_SATISFACAO = 24;
const ALTURA_MAX_BARRA_FUNDO = 220;
const POSICAO_Y_BARRA_INICIAL = 110;

const COR_OVERLAY = 0x000000;
const OPACIDADE_OVERLAY = 0.6;
const COR_FUNDO_MODAL = 0xffffff;
const COR_BORDA_MODAL = 0x1e40af;
const COR_BARRA_FUNDO = 0xdddddd;
const COR_BARRA_SATISFACAO_INICIAL = 0xff3b30;
const COR_HOVER_BOTAO = 0x1e40af;
const OPACIDADE_HOVER_BOTAO = 0.15;

const ESCALA_NPC = 0.3;
const DEPTH_CONTAINER_UI = 1000;
const LARGURA_STROKE_MODAL = 2;
const LARGURA_STROKE_BOTAO = 1;

const TAMANHO_FONTE_TIMER = "20px";
const TAMANHO_FONTE_PERGUNTA = "18px";
const TAMANHO_FONTE_BOTAO = "14px";
const TAMANHO_FONTE_FEEDBACK = "18px";

export class PadariaQuizUI {

    constructor(scene, {
        modalWidth,
        modalHeight,
        padding,
        colunaBarraLargura,
        temperaturaMaxAltura,
        feedbackDuration
    }) {
        this.scene = scene;
        this.modalWidth = modalWidth;
        this.modalHeight = modalHeight;
        this.padding = padding;
        this.colunaBarraLargura = colunaBarraLargura;
        this.temperaturaMaxAltura = temperaturaMaxAltura;
        this.feedbackDuration = feedbackDuration;

        this.onAnswerSelected = null;

        this._criarUI();
    }

    _criarUI() {
        const { scene } = this;
        const larguraModal = this.modalWidth;
        const alturaModal = this.modalHeight;
        const padding = this.padding;
        const larguraColunaBarra = this.colunaBarraLargura;
        const larguraConteudo = larguraModal - larguraColunaBarra - padding * 3;

        this._criarContainersBase(scene);
        this._criarOverlay(scene);
        this._criarModal(scene, larguraModal, alturaModal);
        this._criarTermometro(scene, larguraModal, padding, larguraColunaBarra);
        this._criarConteudo(scene, larguraModal, alturaModal, larguraColunaBarra, padding, larguraConteudo);
    }

    _criarContainersBase(scene) {
        this.containerQuizUI = scene.add.container(0, 0).setDepth(DEPTH_CONTAINER_UI);
    }

    _criarOverlay(scene) {
        this.fundoOverlay = scene.add.rectangle(
            0, 0,
            scene.scale.width,
            scene.scale.height,
            COR_OVERLAY,
            OPACIDADE_OVERLAY
        ).setOrigin(0);
    }

    _criarModal(scene, larguraModal, alturaModal) {
        this.containerModal = scene.add.container(
            scene.scale.width / 2,
            scene.scale.height / 2
        );

        this.fundoModal = scene.add.rectangle(
            0, 0,
            larguraModal,
            alturaModal,
            COR_FUNDO_MODAL
        ).setStrokeStyle(LARGURA_STROKE_MODAL, COR_BORDA_MODAL).setOrigin(0.5);
    }

    _criarTermometro(scene, larguraModal, padding, larguraColunaBarra) {
        this.containerBarra = scene.add.container(
            -larguraModal / 2 + padding + larguraColunaBarra / 2,
            0
        );

        this.barraFundo = scene.add.rectangle(
            0, 0,
            LARGURA_BARRA_SATISFACAO,
            ALTURA_MAX_BARRA_FUNDO,
            COR_BARRA_FUNDO
        );

        this.barraSatisfacao = scene.add.rectangle(
            0, POSICAO_Y_BARRA_INICIAL,
            LARGURA_BARRA_SATISFACAO,
            0,
            COR_BARRA_SATISFACAO_INICIAL
        ).setOrigin(0.5, 1);

        this.containerBarra.add([this.barraFundo, this.barraSatisfacao]);
    }

    _criarConteudo(scene, larguraModal, alturaModal, larguraColunaBarra, padding, larguraConteudo) {
        const inicioConteudoX = -larguraModal / 2 + larguraColunaBarra + padding * 2;

        this.containerConteudo = scene.add.container(
            inicioConteudoX,
            -alturaModal / 2 + padding
        );

        this._criarHeader(scene);
        this._criarPergunta(scene, larguraConteudo);
        this._criarBotoes(scene, larguraConteudo);
        this._criarFeedback(scene, larguraConteudo);

        this.containerConteudo.add([
            this.containerHeader,
            this.textoPergunta,
            this.containerBotoes,
            this.textoFeedback
        ]);

        this.containerModal.add([
            this.fundoModal,
            this.containerBarra,
            this.containerConteudo
        ]);

        this.containerQuizUI.add([
            this.fundoOverlay,
            this.containerModal
        ]);
    }

    _criarHeader(scene) {
        this.containerHeader = scene.add.container(0, 0);

        this.imagemNpc = scene.add.image(0, 0, 'npc-padeiro')
            .setOrigin(0, 0)
            .setScale(ESCALA_NPC);

        this.textoTimer = scene.add.text(POSICAO_TIMER_X, POSICAO_TIMER_Y, "15s", {
            fontSize: TAMANHO_FONTE_TIMER,
            color: "#1e40af",
            fontStyle: "bold"
        });

        this.containerHeader.add([
            this.imagemNpc,
            this.textoTimer
        ]);
    }

    _criarPergunta(scene, larguraConteudo) {
        this.textoPergunta = scene.add.text(0, POSICAO_PERGUNTA_Y, "", {
            fontSize: TAMANHO_FONTE_PERGUNTA,
            color: "#1e3a5f",
            wordWrap: { width: larguraConteudo }
        });
    }

    _criarBotoes(scene, larguraConteudo) {
        this.containerBotoes = scene.add.container(0, POSICAO_CONTAINER_BOTOES_Y);
        this.botoes = [];

        for (let i = 0; i < NUMERO_BOTOES; i++) {
            const posicaoYBotao = i * ESPACAMENTO_BOTAO;
            const posicaoYTextoBotao = posicaoYBotao + OFFSET_TEXTO_BOTAO_Y;

            const fundoBotao = scene.add.rectangle(
                0,
                posicaoYBotao,
                larguraConteudo,
                ALTURA_BOTAO,
                COR_FUNDO_MODAL
            )
                .setStrokeStyle(LARGURA_STROKE_BOTAO, COR_BORDA_MODAL)
                .setOrigin(0)
                .setInteractive({ useHandCursor: true });

            const textoBotao = scene.add.text(
                OFFSET_TEXTO_BOTAO_X,
                posicaoYTextoBotao,
                "",
                {
                    fontSize: TAMANHO_FONTE_BOTAO,
                    color: "#1e3a5f",
                    wordWrap: { width: larguraConteudo - PADDING_TEXTO_BOTAO }
                }
            );

            fundoBotao.on("pointerover", () => {
                fundoBotao.setFillStyle(COR_HOVER_BOTAO, OPACIDADE_HOVER_BOTAO);
            });

            fundoBotao.on("pointerout", () => {
                fundoBotao.setFillStyle(COR_FUNDO_MODAL);
            });

            fundoBotao.on("pointerdown", () => {
                if (this.onAnswerSelected) {
                    this.onAnswerSelected(i);
                }
            });

            this.containerBotoes.add([fundoBotao, textoBotao]);
            this.botoes.push(textoBotao);
        }
    }

    _criarFeedback(scene, larguraConteudo) {
        this.textoFeedback = scene.add.text(
            larguraConteudo / 2,
            POSICAO_FEEDBACK_Y,
            "",
            {
                fontSize: TAMANHO_FONTE_FEEDBACK,
                color: "#000"
            }
        ).setOrigin(0.5).setVisible(false);
    }

    setQuestion(pergunta) {
        this.textoPergunta.setText(pergunta.pergunta);
        pergunta.opcoes.forEach((opcao, index) => {
            if (this.botoes[index]) {
                this.botoes[index].setText(opcao);
            }
        });
    }

    setTimer(tempo) {
        this.textoTimer.setText(`${tempo}s`);
    }

    setSatisfacao(valor) {
        const altura = (valor / 100) * this.temperaturaMaxAltura;

        let cor = 0xff3b30;
        if (valor > 40) cor = 0xffcc00;
        if (valor > 70) cor = 0x34c759;

        this.barraSatisfacao.setFillStyle(cor);
        this.barraSatisfacao.setSize(24, altura);
    }

    showFeedback(pontos) {
        let mensagem = "Resposta fraca.";
        if (pontos === 3) mensagem = "Excelente!";
        else if (pontos === 2) mensagem = "Boa resposta!";

        this.textoFeedback.setText(mensagem);
        this.textoFeedback.setVisible(true);

        this.scene.time.delayedCall(this.feedbackDuration, () => {
            this.textoFeedback.setVisible(false);
        });
    }

    show() {
        this.containerQuizUI.setVisible(true);
    }

    hide() {
        this.containerQuizUI.setVisible(false);
    }
}


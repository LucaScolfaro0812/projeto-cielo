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

        this.containerQuizUI = scene.add.container(0, 0).setDepth(1000);

        this.fundoOverlay = scene.add.rectangle(
            0, 0,
            scene.scale.width,
            scene.scale.height,
            0x000000, 0.6
        ).setOrigin(0);

        const larguraModal = this.modalWidth;
        const alturaModal = this.modalHeight;
        const padding = this.padding;
        const larguraColunaBarra = this.colunaBarraLargura;

        this.containerModal = scene.add.container(
            scene.scale.width / 2,
            scene.scale.height / 2
        );

        this.fundoModal = scene.add.rectangle(
            0, 0,
            larguraModal,
            alturaModal,
            0xffffff
        ).setStrokeStyle(2, 0x1e40af).setOrigin(0.5);

        this.containerBarra = scene.add.container(
            -larguraModal / 2 + padding + larguraColunaBarra / 2,
            0
        );

        this.barraFundo = scene.add.rectangle(0, 0, 24, 220, 0xdddddd);
        this.barraSatisfacao = scene.add.rectangle(0, 110, 24, 0, 0xff3b30).setOrigin(0.5, 1);

        this.containerBarra.add([this.barraFundo, this.barraSatisfacao]);

        const inicioConteudoX = -larguraModal / 2 + larguraColunaBarra + padding * 2;
        const larguraConteudo = larguraModal - larguraColunaBarra - padding * 3;

        this.containerConteudo = scene.add.container(
            inicioConteudoX,
            -alturaModal / 2 + padding
        );

        this.containerHeader = scene.add.container(0, 0);

        this.imagemNpc = scene.add.image(0, 0, 'npc-padeiro')
            .setOrigin(0, 0)
            .setScale(0.3);

        this.textoTimer = scene.add.text(80, 10, "15s", {
            fontSize: "20px",
            color: "#1e40af",
            fontStyle: "bold"
        });

        this.containerHeader.add([
            this.imagemNpc,
            this.textoTimer
        ]);

        this.textoPergunta = scene.add.text(0, 70, "", {
            fontSize: "18px",
            color: "#1e3a5f",
            wordWrap: { width: larguraConteudo }
        });

        this.containerBotoes = scene.add.container(0, 130);
        this.botoes = [];

        for (let i = 0; i < 4; i++) {

            const fundoBotao = scene.add.rectangle(0, i * 48, larguraConteudo, 38, 0xffffff)
                .setStrokeStyle(1, 0x1e40af)
                .setOrigin(0)
                .setInteractive({ useHandCursor: true });

            const textoBotao = scene.add.text(12, i * 48 + 10, "", {
                fontSize: "14px",
                color: "#1e3a5f",
                wordWrap: { width: larguraConteudo - 20 }
            });

            fundoBotao.on("pointerover", () => fundoBotao.setFillStyle(0x1e40af, 0.15));
            fundoBotao.on("pointerout", () => fundoBotao.setFillStyle(0xffffff));

            fundoBotao.on("pointerdown", () => {
                if (this.onAnswerSelected) {
                    this.onAnswerSelected(i);
                }
            });

            this.containerBotoes.add([fundoBotao, textoBotao]);
            this.botoes.push(textoBotao);
        }

        this.textoFeedback = scene.add.text(
            larguraConteudo / 2,
            330,
            "",
            { fontSize: "18px", color: "#000" }
        ).setOrigin(0.5).setVisible(false);

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


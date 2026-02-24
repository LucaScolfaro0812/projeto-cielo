import { perguntasPadaria } from './quizPadaria.js';
import { GerenciadorQuizPadaria } from './GerenciadorQuizPadaria.js';

export class padariaScene extends Phaser.Scene {

    constructor() {
        super({ key: 'padariaScene' });
    }

    preload() {
        this.load.image('padaria', 'public/assets/padaria-bg-2.png');
        this.load.image('npc-padeiro', 'public/assets/npc.png');
        this.load.image('player', 'public/assets/marcielo.png');
    }

    create() {

        // ===== CENÁRIO =====
        this.add.image(480, 200, 'padaria').setScale(2.1);
        this.npcPadeiro = this.add.image(550, 180, 'npc-padeiro').setScale(0.4);
        this.player = this.add.image(100, 100, 'player').setScale(0.5);

        // ===== CONTROLES =====
        this.teclaW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.teclaA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.teclaS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.teclaD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        this.quizPadariaAberto = false;

        // GERENCIADOR
        this.gerenciadorQuiz = new GerenciadorQuizPadaria(perguntasPadaria);

        // UI
        this.criarInterfaceQuiz();
        this.mostrarInterfaceQuiz(false);

        // CALLBACKS
        this.gerenciadorQuiz.quandoPerguntaMudar = (pergunta) => {
            this.textoPergunta.setText(pergunta.pergunta);
            this.atualizarBotoes(pergunta.opcoes);
        };

        this.gerenciadorQuiz.quandoTempoMudar = (tempo) => {
            this.textoTimer.setText(tempo + "s");
        };

        this.gerenciadorQuiz.quandoResponder = (pontos, nivel) => {
            this.atualizarSatisfacao(nivel);
            this.mostrarFeedback(pontos);
        };

        this.gerenciadorQuiz.quandoFinalizar = () => {
            this.finalizarQuiz();
        };
    }

    update() {

        if (this.quizPadariaAberto) return;

        let velocidade = 2.5;

        if (this.teclaA.isDown) this.player.x -= velocidade;
        else if (this.teclaD.isDown) this.player.x += velocidade;

        if (this.teclaW.isDown) this.player.y -= velocidade;
        else if (this.teclaS.isDown) this.player.y += velocidade;

        let distancia = Phaser.Math.Distance.Between(
            this.player.x, this.player.y,
            this.npcPadeiro.x, this.npcPadeiro.y
        );

        if (distancia < 100 && Phaser.Input.Keyboard.JustDown(this.teclaE)) {
            this.abrirQuizPadaria();
        }
    }

    // ================= UI =================

    criarInterfaceQuiz() {

        this.containerQuizUI = this.add.container(0, 0).setDepth(1000);

        this.fundoOverlay = this.add.rectangle(
            0, 0,
            this.scale.width,
            this.scale.height,
            0x000000, 0.6
        ).setOrigin(0);

        const larguraModal = 700;
        const alturaModal = 430;
        const padding = 30;
        const larguraColunaBarra = 60;

        this.containerModal = this.add.container(
            this.scale.width / 2,
            this.scale.height / 2
        );

        this.fundoModal = this.add.rectangle(
            0, 0,
            larguraModal,
            alturaModal,
            0xffffff
        ).setStrokeStyle(2, 0x1e40af).setOrigin(0.5);

        // ===== TERMÔMETRO =====
        this.containerBarra = this.add.container(
            -larguraModal / 2 + padding + larguraColunaBarra / 2,
            0
        );

        this.barraFundo = this.add.rectangle(0, 0, 24, 220, 0xdddddd);
        this.barraSatisfacao = this.add.rectangle(0, 110, 24, 0, 0xff3b30).setOrigin(0.5, 1);

        this.containerBarra.add([this.barraFundo, this.barraSatisfacao]);

        // ===== CONTEÚDO =====
        const inicioConteudoX = -larguraModal / 2 + larguraColunaBarra + padding * 2;
        const larguraConteudo = larguraModal - larguraColunaBarra - padding * 3;

        this.containerConteudo = this.add.container(
            inicioConteudoX,
            -alturaModal / 2 + padding
        );

        // HEADER
        this.containerHeader = this.add.container(0, 0);

        this.imagemNpc = this.add.image(0, 20, 'npc-padeiro').setScale(0.35);

        this.textoTimer = this.add.text(70, 0, "15s", {
            fontSize: "20px",
            color: "#1e40af",
            fontStyle: "bold"
        });

        this.containerHeader.add([this.imagemNpc, this.textoTimer]);

        // PERGUNTA
        this.textoPergunta = this.add.text(0, 70, "", {
            fontSize: "18px",
            color: "#1e3a5f",
            wordWrap: { width: larguraConteudo }
        });

        // BOTÕES
        this.containerBotoes = this.add.container(0, 130);
        this.botoes = [];

        for (let i = 0; i < 4; i++) {

            const fundoBotao = this.add.rectangle(0, i * 48, larguraConteudo, 38, 0xffffff)
                .setStrokeStyle(1, 0x1e40af)
                .setOrigin(0)
                .setInteractive({ useHandCursor: true });

            const textoBotao = this.add.text(12, i * 48 + 10, "", {
                fontSize: "14px",
                color: "#1e3a5f",
                wordWrap: { width: larguraConteudo - 20 }
            });

            fundoBotao.on("pointerover", () => fundoBotao.setFillStyle(0x1e40af, 0.15));
            fundoBotao.on("pointerout", () => fundoBotao.setFillStyle(0xffffff));

            fundoBotao.on("pointerdown", () => {
                this.gerenciadorQuiz.responder(i);
            });

            this.containerBotoes.add([fundoBotao, textoBotao]);
            this.botoes.push(textoBotao);
        }

        // FEEDBACK
        this.textoFeedback = this.add.text(
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

    atualizarBotoes(opcoes) {
        opcoes.forEach((opcao, index) => {
            this.botoes[index].setText(opcao);
        });
    }

    atualizarSatisfacao(valor) {
        const alturaMax = 200;
        const altura = (valor / 100) * alturaMax;

        let cor = 0xff3b30;
        if (valor > 40) cor = 0xffcc00;
        if (valor > 70) cor = 0x34c759;

        this.barraSatisfacao.setFillStyle(cor);
        this.barraSatisfacao.setSize(24, altura);
    }

    mostrarFeedback(pontos) {
        let mensagem = "Resposta fraca.";
        if (pontos === 3) mensagem = "Excelente!";
        else if (pontos === 2) mensagem = "Boa resposta!";

        this.textoFeedback.setText(mensagem);
        this.textoFeedback.setVisible(true);

        this.time.delayedCall(1500, () => {
            this.textoFeedback.setVisible(false);
        });
    }

    mostrarInterfaceQuiz(estado) {
        this.containerQuizUI.setVisible(estado);
    }

    abrirQuizPadaria() {
        this.quizPadariaAberto = true;
        this.mostrarInterfaceQuiz(true);
        this.gerenciadorQuiz.iniciar(this);
    }

    finalizarQuiz() {
        this.textoPergunta.setText("Quiz finalizado!");

        this.time.delayedCall(2500, () => {
            this.quizPadariaAberto = false;
            this.mostrarInterfaceQuiz(false);
        });
    }
}
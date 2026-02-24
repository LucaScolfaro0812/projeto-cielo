import { perguntasPadaria } from './quizPadaria.js';
import { GerenciadorQuizPadaria } from './GerenciadorQuizPadaria.js';

const PLAYER_SPEED = 2.5;
const INTERACAO_DISTANCIA_NPC = 100;

const QUIZ_MODAL_WIDTH = 700;
const QUIZ_MODAL_HEIGHT = 430;
const QUIZ_PADDING = 30;
const QUIZ_LARGURA_COLUNA_BARRA = 60;

const QUIZ_TEMPERATURE_MAX_HEIGHT = 200;
const QUIZ_FEEDBACK_DURATION = 1500;
const QUIZ_FINALIZAR_FECHAR_DELAY = 2500;

export class PadariaScene extends Phaser.Scene {

    constructor() {
        super({ key: 'padariaScene' });
    }

    preload() {
        this.load.image('padaria', 'public/assets/padaria-bg-2.png');
        this.load.image('npc-padeiro', 'public/assets/npc.png');
        this.load.image('player', 'public/assets/marcielo.png');
    }

    create() {
        this.criarCenario();
        this.configurarControles();
        this.quizPadariaAberto = false;
        this.configurarQuiz();
    }

    criarCenario() {
        // ===== CENÁRIO =====
        this.add.image(480, 200, 'padaria').setScale(2.1);
        this.npcPadeiro = this.add.image(550, 180, 'npc-padeiro').setScale(0.4);
        this.player = this.add.image(100, 100, 'player').setScale(0.5);
    }

    configurarControles() {
        // ===== CONTROLES =====
        const { KeyCodes } = Phaser.Input.Keyboard;

        this.teclaW = this.input.keyboard.addKey(KeyCodes.W);
        this.teclaA = this.input.keyboard.addKey(KeyCodes.A);
        this.teclaS = this.input.keyboard.addKey(KeyCodes.S);
        this.teclaD = this.input.keyboard.addKey(KeyCodes.D);
        this.teclaE = this.input.keyboard.addKey(KeyCodes.E);
    }

    configurarQuiz() {
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
            this.textoTimer.setText(`${tempo}s`);
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

        if (this.teclaA.isDown) this.player.x -= PLAYER_SPEED;
        else if (this.teclaD.isDown) this.player.x += PLAYER_SPEED;

        if (this.teclaW.isDown) this.player.y -= PLAYER_SPEED;
        else if (this.teclaS.isDown) this.player.y += PLAYER_SPEED;

        let distancia = Phaser.Math.Distance.Between(
            this.player.x, this.player.y,
            this.npcPadeiro.x, this.npcPadeiro.y
        );

        if (distancia < INTERACAO_DISTANCIA_NPC && Phaser.Input.Keyboard.JustDown(this.teclaE)) {
            this.abrirQuizPadaria();
        }
    }

    // ================= UI =================

    criarInterfaceQuiz() {

        this.containerQuizUI = this.add.container(0, 0).setDepth(1000);

        // ===== OVERLAY =====
        this.fundoOverlay = this.add.rectangle(
            0, 0,
            this.scale.width,
            this.scale.height,
            0x000000, 0.6
        ).setOrigin(0);

        const larguraModal = QUIZ_MODAL_WIDTH;
        const alturaModal = QUIZ_MODAL_HEIGHT;
        const padding = QUIZ_PADDING;
        const larguraColunaBarra = QUIZ_LARGURA_COLUNA_BARRA;

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

        // ===== HEADER =====
        this.containerHeader = this.add.container(0, 0);

        this.imagemNpc = this.add.image(0, 0, 'npc-padeiro')
            .setOrigin(0, 0)
            .setScale(0.3);

        this.textoTimer = this.add.text(80, 10, "15s", {
            fontSize: "20px",
            color: "#1e40af",
            fontStyle: "bold"
        });

        this.containerHeader.add([
            this.imagemNpc,
            this.textoTimer
        ]);

        // ===== PERGUNTA (APENAS UMA) =====
        this.textoPergunta = this.add.text(0, 70, "", {
            fontSize: "18px",
            color: "#1e3a5f",
            wordWrap: { width: larguraConteudo }
        });

        // ===== BOTÕES =====
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

        // ===== FEEDBACK =====
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
        const altura = (valor / 100) * QUIZ_TEMPERATURE_MAX_HEIGHT;

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

        this.time.delayedCall(QUIZ_FEEDBACK_DURATION, () => {
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

        this.time.delayedCall(QUIZ_FINALIZAR_FECHAR_DELAY, () => {
            this.quizPadariaAberto = false;
            this.mostrarInterfaceQuiz(false);
        });
    }
}
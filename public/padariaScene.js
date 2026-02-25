import Player from './player.js';
import { perguntasPadaria } from './quizPadaria.js';
import { GerenciadorQuizPadaria } from './GerenciadorQuizPadaria.js';
import { PadariaQuizUI } from './PadariaQuizUI.js';

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

        // SPRITESHEET DO PLAYER
        this.load.spritesheet('player', 'public/assets/spite-player.jpg', {
            frameWidth: 32,
            frameHeight: 32
        });
    }

    create() {
        this.criarCenario();
        this.configurarControles();
        this.quizPadariaAberto = false;
        this.configurarQuiz();
    }

    criarCenario() {

        // FUNDO
        this.add.image(480, 200, 'padaria').setScale(2.1);

        // NPC COM FÍSICA ESTÁTICA
        this.npcPadeiro = this.physics.add.staticImage(550, 180, 'npc-padeiro')
            .setScale(0.4);

        // PLAYER USANDO CLASSE
        this.player = new Player(this, 100, 100);
        this.player.setScale(0.5);

        // COLISÃO
        this.physics.add.collider(this.player, this.npcPadeiro);

        // CÂMERA
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1);
    }

    configurarControles() {
        const { KeyCodes } = Phaser.Input.Keyboard;

        this.teclaW = this.input.keyboard.addKey(KeyCodes.W);
        this.teclaA = this.input.keyboard.addKey(KeyCodes.A);
        this.teclaS = this.input.keyboard.addKey(KeyCodes.S);
        this.teclaD = this.input.keyboard.addKey(KeyCodes.D);
        this.teclaE = this.input.keyboard.addKey(KeyCodes.E);
    }

    configurarQuiz() {

        this.gerenciadorQuiz = new GerenciadorQuizPadaria(perguntasPadaria);

        this.quizUI = new PadariaQuizUI(this, {
            modalWidth: QUIZ_MODAL_WIDTH,
            modalHeight: QUIZ_MODAL_HEIGHT,
            padding: QUIZ_PADDING,
            colunaBarraLargura: QUIZ_LARGURA_COLUNA_BARRA,
            temperaturaMaxAltura: QUIZ_TEMPERATURE_MAX_HEIGHT,
            feedbackDuration: QUIZ_FEEDBACK_DURATION
        });

        this.quizUI.hide();

        this.quizUI.onAnswerSelected = (index) => {
            this.gerenciadorQuiz.responder(index);
        };

        this.gerenciadorQuiz.quandoPerguntaMudar = (pergunta) => {
            this.quizUI.setQuestion(pergunta);
        };

        this.gerenciadorQuiz.quandoTempoMudar = (tempo) => {
            this.quizUI.setTimer(tempo);
        };

        this.gerenciadorQuiz.quandoResponder = (pontos, nivel) => {
            this.quizUI.setSatisfacao(nivel);
            this.quizUI.showFeedback(pontos);
        };

        this.gerenciadorQuiz.quandoFinalizar = () => {
            this.finalizarQuiz();
        };
    }

    update() {

        if (this.quizPadariaAberto) return;

        const teclas = {
            W: this.teclaW,
            A: this.teclaA,
            S: this.teclaS,
            D: this.teclaD
        };

        this.player.movimentar(teclas);

        let distancia = Phaser.Math.Distance.Between(
            this.player.x, this.player.y,
            this.npcPadeiro.x, this.npcPadeiro.y
        );

        if (
            distancia < INTERACAO_DISTANCIA_NPC &&
            Phaser.Input.Keyboard.JustDown(this.teclaE)
        ) {
            this.abrirQuizPadaria();
        }
    }

    abrirQuizPadaria() {
        this.quizPadariaAberto = true;
        this.quizUI.show();
        this.gerenciadorQuiz.iniciar(this);
    }

    finalizarQuiz() {

        this.quizUI.setQuestion({
            pergunta: "Quiz finalizado!",
            opcoes: ["", "", "", ""]
        });

        this.time.delayedCall(QUIZ_FINALIZAR_FECHAR_DELAY, () => {
            this.quizPadariaAberto = false;
            this.quizUI.hide();
        });
    }
}
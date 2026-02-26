import { perguntasPadaria } from './quizPerguntas.js';
import { GerenciadorQuizPadaria } from './GerenciadorQuizPadaria.js';
import { PadariaQuizUI } from './PadariaQuizUI.js';
import Player from './player.js';
import Quiz from './quiz.js'

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
        this.load.spritesheet('player', 'public/assets/marcielo.png', {
            frameWidth: 128,
            frameHeight: 128
        });
    }

    create() {
        this.criarCenario();
        this.quiz = new Quiz();

        this.player = new Player(this, 0, 0);

        this.physics.add.collider(this.player, this.npc);

        this.physics.add.overlap(this.npc, this.player, () =>
        {
            this.quiz.iniciar();
        });
    }

    criarCenario() {

        // FUNDO
        this.add.image(480, 200, 'padaria').setScale(2.1);
        this.npc = this.add.image(550, 180, 'npc-padeiro').setScale(0.4);
    }

    update() {
        this.player.update();
    }
}
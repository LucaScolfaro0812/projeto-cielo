/**
 * PadariaScene - Cena da padaria. Player, NPC e quiz ao se aproximar.
 */

import Player from './player.js';
import Quiz from './quiz.js';
import Npc from './npc.js';
import { perguntasPadaria } from './quizPerguntas.js';

export class PadariaScene extends Phaser.Scene {

    constructor() {
        super({ key: 'padariaScene' });
    }

    preload() {
        this.load.image('padaria', 'public/assets/padaria-bg-2.png');
        this.load.image('npc', 'public/assets/npc.png');
        this.load.spritesheet('player', 'public/assets/marcielo.png', { frameWidth: 128, frameHeight: 128 });
    }

    create() {
        this._criarCenario();
        this._configurarPlayerNpcQuiz();
    }

    _criarCenario() {
        this.add.image(480, 200, 'padaria').setScale(2.1);
    }

    _configurarPlayerNpcQuiz() {
        this.quiz = new Quiz(this);
        this.player = new Player(this, 20, 80);
        this.npc = new Npc(this, 550, 180, perguntasPadaria);

        this.physics.add.overlap(this.npc, this.player, () => {
            if (!this.npc.vendeu) this.quiz.iniciar(this.npc);
        });
    }

    update() {
        this.player.update();
        this.npc.update();
    }
}

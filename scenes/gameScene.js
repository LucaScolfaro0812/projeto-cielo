/**
 * GameScene - Cena da rua. Player, NPC, porta de entrada para padaria.
 */

import Player from './player.js';
import Npc from './npc.js';
import Quiz from './quiz.js';
import Entrada from './lojaEntrar.js';
import { perguntasNpcRua } from './quizPerguntas.js';

export class gameScene extends Phaser.Scene {

    constructor() {
        super({ key: 'gameScene' });
    }

    preload() {
        this.load.image('entrada', 'assets/entrada.png');
        this.load.image('rua', 'assets/rua.png');
        this.load.image('npc', 'assets/npc.png');
        this.load.spritesheet('player', 'assets/marcielo.png', { frameWidth: 120, frameHeight: 120 });
    }

    create() {
        this.add.image(0, 0, 'rua').setOrigin(0).setScale(6);

        this._configurarPlayerNpcQuiz();
        this._criarPortas();

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(0.75);
    }

    _configurarPlayerNpcQuiz() {
        this.quiz = new Quiz(this);
        this.player = new Player(this, 200, 2000);
        this.npc = new Npc(this, 800, 1800, perguntasNpcRua);

        this.physics.add.overlap(this.npc, this.player, () => {
            if (!this.npc.vendeu) this.quiz.iniciar(this.npc);
        });
    }

    _criarPortas() {
        this.portaEntrada = new Entrada(this, 625, 1650, this, 'padariaScene');
        this.physics.add.overlap(this.portaEntrada, this.player, () => {
            this.portaEntrada.trocarDeCena();
        });
    }

    update() {
        this.player.update();
    }
}

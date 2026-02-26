import Player from './player.js';
import Npc from './npc.js'
import Quiz from './quiz.js'
import Entrada from './lojaEntrar.js';
import {perguntasNpcRua} from './quizPerguntas.js'

export class gameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'gameScene' });
    }

    preload() {
        this.load.image('entrada', 'public/assets/entrada.png');
        this.load.image('rua', 'public/assets/rua.png');
        this.load.image('npc', 'public/assets/npc.png');
        this.load.spritesheet('player', 'public/assets/marcielo.png', {
            frameWidth: 120,
            frameHeight: 120
        });
    }

    create() {

        this.add.image(0, 0, 'rua')
            .setOrigin(0)
            .setScale(6);

        this.configurarPlayerNpcQuiz();
        this.criarPortas();
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(0.75);

    }

    configurarPlayerNpcQuiz(){
        this.quiz = new Quiz(this);

        this.player = new Player(this, 200, 2000);

        this.npc = new Npc(this, 800, 1800, perguntasNpcRua);

        //this.physics.add.collider(this.player, this.npc);

        this.physics.add.overlap(this.npc, this.player, () =>
        {
            if(!this.npc.vendeu){
                this.quiz.iniciar(this.npc);
            }
        });
    }

    criarPortas(){
        this.porta = new Entrada(this, 625, 1650, this, 'padariaScene');

        
        this.physics.add.overlap(this.porta, this.player, () =>
        {
            this.porta.trocarDeCena();
        });
    }

    update() {
        this.player.movimentar(this.teclas);
    }
}
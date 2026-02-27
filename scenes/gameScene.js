
// importa as outras classes que contém objetos e dados do jogo
import Player from './player.js';
import Npc from './npc.js';
import Quiz from './quiz.js';
import Entrada from './lojaEntrar.js';
import { perguntasNpcRua } from './quizPerguntas.js';

// Definição da cena principal do jogo
export class GameScene extends Phaser.Scene {

    constructor() {
        // Define a chave única da cena dentro do Phaser
        super({ key: 'gameScene' });
    }

    // Método responsável por carregar todos os assets antes da cena iniciar
    preload() {
        // Imagens estáticas
        this.load.image('entrada', 'assets/entrada.png');
        this.load.image('rua', 'assets/rua.png');
        this.load.image('npc', 'assets/npc.png');

        // Spritesheet do jogador (animações)
        this.load.spritesheet('player', 'assets/marcielo.png', { 
            frameWidth: 120, 
            frameHeight: 120 
        });
    }

    // Método executado quando a cena é criada
    create() {

        // Adiciona o background da rua na posição (0,0)
        // setOrigin(0) posiciona a imagem pelo canto superior esquerdo
        // setScale(6) amplia a imagem
        this.add.image(0, 0, 'rua')
            .setOrigin(0)
            .setScale(6);

        // Configura player, npc e sistema de quiz
        this._configurarPlayerNpcQuiz();

        // Cria portas e define troca de cena
        this._criarPortas();

        // Faz a câmera seguir o jogador
        this.cameras.main.startFollow(this.player);

        // Define nível de zoom da câmera
        this.cameras.main.setZoom(0.75);
    }

    /**
     * Cria e configura:
     * - Player
     * - NPC
     * - Sistema de Quiz
     * - Colisão entre Player e NPC
     */
    _configurarPlayerNpcQuiz() {

        // Instancia o sistema de perguntas
        this.quiz = new Quiz(this);

        // Cria o jogador em uma posição específica do mapa
        this.player = new Player(this, 200, 2000);

        // Cria o NPC com suas perguntas associadas
        this.npc = new Npc(this, 800, 1800, perguntasNpcRua);

        // Detecta sobreposição entre NPC e Player
        this.physics.add.overlap(this.npc, this.player, () => {

            // Se o NPC ainda não vendeu (condição de controle)
            if (!this.npc.vendeu) {

                // Inicia o quiz associado ao NPC
                this.quiz.iniciar(this.npc);
            }
        });
    }

    /**
     * Cria portas de entrada para outras cenas
     * e configura a troca de cena ao colidir com o player
     */
    _criarPortas() {

        // Cria objeto de entrada que leva para a cena "padariaScene"
        this.portaEntrada = new Entrada(
            this,          // referência da cena atual
            625,           // posição X
            1650,          // posição Y
            this,          // contexto da cena
            'padariaScene' // nome da cena de destino
        );

        // Detecta sobreposição entre porta e jogador
        this.physics.add.overlap(this.portaEntrada, this.player, () => {

            // Executa método responsável por trocar de cena
            this.portaEntrada.trocarDeCena();
        });
    }

    // Método executado a cada frame do jogo
    update() {

        // Atualiza lógica de movimentação e estado do jogador
        this.player.update();
    }
}
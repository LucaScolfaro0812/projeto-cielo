
// importa as outras classes que contém objetos e dados do jogo
import Player from '../entities/player.js';
import Npc from '../entities/npc.js';
import Quiz from '../quiz/quiz.js';
import Loja from '../entities/loja.js';
import { perguntasNpcRua } from '../quiz/quizPerguntas.js';

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
        this.load.image('rua', 'assets/novoMapa.jpeg');
        this.load.image('npc', 'assets/npc.png');
        this.load.image('lojaCupCake', 'assets/lojaCupCake.png');

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
        this.fundo=
        this.add.image(0, 0, 'rua')
            .setOrigin(0.5,0.5)
            .setScale(2.5);

            this.fundo.x=this.fundo.displayWidth/2;
            this.fundo.y=this.fundo.displayHeight/2;

            this.physics.world.setBounds(
                0 - this.fundo.displayWidht/2,
                0 - this.fundo.displayHeight/2,
                
                this.fundo.displayWidht/2,
                this.fundo.displayHeight/2
            )
        // Configura player, npc e sistema de quiz
        this._configurarPlayerNpcQuiz();
            this.player.setCollideWorldBounds (true);

        // Cria portas e define troca de cena
        this._criarLojasEPortas();

        // Faz a câmera seguir o jogador
        this.cameras.main.startFollow(this.player);

        // Define nível de zoom da câmera
        this.cameras.main.setZoom(0.60);
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
        this.player.setScale(1.3);

        // Cria o NPC com suas perguntas associadas
        this.npc = new Npc(this, 800, 1800, perguntasNpcRua);
        this.npc.setScale(0.5);

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
     * Cria lojas para entrar
     * e configura a troca de cena ao colidir com o player
     */
    _criarLojasEPortas() {
        // Cria uma loja nova
        this.loja1 = new Loja(
            this,
            730,
            1150,
            'lojaCupCake',
            'padariaScene'
        );

        // salva a porta da loja
        this.portaEntrada = this.loja1.getPorta();

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
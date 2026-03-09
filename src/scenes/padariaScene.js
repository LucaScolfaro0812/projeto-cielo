// Importação das entidades utilizadas na cena
import Player from '../entities/player.js';
import Quiz from '../quiz/quiz.js';
import Npc from '../entities/npc.js';
import Entrada from '../entities/lojaEntrar.js';
import { perguntasPadaria } from '../quiz/quizPerguntas.js';

// Cena responsável pelo ambiente interno da padaria
export class PadariaScene extends Phaser.Scene {

    constructor() {
        // Define a chave única da cena no Scene Manager do Phaser
        super({ key: 'padariaSceneKKKKKKKKKKKKK' });
    }

    // Carrega os assets necessários antes da criação da cena
    preload() {
        // Imagem de fundo da padaria
        this.load.image('padaria', 'assets/lojas/lojaPadaria.png');

        // Pré carrega os objetos com uma função estática
        Player.preload(this);
        Npc.preload(this);
    }

    // Executado quando a cena é criada
    create() {
        this._criarCenario();
        this._configurarPlayerNpcQuiz();
        this._criarPortas();
    }

    /**
     * Cria o cenário visual da padaria
     */
    _criarCenario() {
        // Adiciona imagem de fundo na posição especificada
        // setScale ajusta o tamanho da imagem para o layout da cena
        this.fundo = this.add.image(710, 370, 'padaria')
            .setScale(2.9)
            .setOrigin(0.5, 0.5);
    }

    /**
     * Configura:
     * - Instância do Quiz
     * - Criação do Player
     * - Criação do NPC
     * - Colisão para iniciar o quiz
     */
    _configurarPlayerNpcQuiz() {

        // Instancia sistema de perguntas
        this.quiz = new Quiz(this);

        // Cria jogador na posição inicial dentro da padaria
        this.player = new Player(this, 190, 290);

        // Cria NPC com perguntas específicas da padaria
        this.npc = new Npc(this, 800, 350, perguntasPadaria, "npc", "npc_padaria");

        // Detecta sobreposição entre jogador e NPC
        this.physics.add.overlap(this.npc, this.player, () => {

            // Inicia o quiz apenas se o NPC ainda não realizou sua ação principal
            if (!this.npc.vendeu) {
                this.quiz.iniciar(this.npc);
            }
        });
    }

    /**
     * Cria porta de saída que retorna para a cena principal
     */
    _criarPortas() {

        // Cria objeto de entrada que redireciona para 'gameScene'
        this.portaEntrada = new Entrada(
            this,        // cena atual
            195,         // posição X
            150,           // posição Y
            this,        // referência da cena
            'gameScene'  // nome da cena de destino
        );

        // Define o tamanho da porta
        this.portaEntrada.setScale(0.5);

        // Detecta sobreposição entre jogador e porta
        this.physics.add.overlap(this.portaEntrada, this.player, () => {
            this.portaEntrada.trocarDeCena();
        });
    }

    // Executado a cada frame do jogo
    update() {

        // Atualiza lógica do jogador (movimento, animações, etc.)
        this.player.update();

        // Atualiza lógica do NPC (caso haja comportamento futuro)
        this.npc.update();
    }
}
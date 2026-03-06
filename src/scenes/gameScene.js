
// importa as outras classes que contém objetos e dados do jogo
import Player from '../entities/player.js';
import Npc from '../entities/npc.js';
import Quiz from '../quiz/quiz.js';
import LojaFisica from '../entities/lojaFisica.js';
import LojaScene from '../scenes/lojaScene.js';
import { perguntasNpcRua } from '../quiz/quizPerguntas.js';

// Definição da cena principal do jogo
export class GameScene extends Phaser.Scene {

    constructor() {
        // Define a chave única da cena dentro do Phaser
        super({ key: 'gameScene' });

        this.lojas = [];
        this.lojasNomes = [
            'Padaria',
            // 'Games',
            'Cupcake',
            // 'Beleza',
            // 'Roupas', 
            // 'Pet',
            // 'Movel',
            // 'Frutaria', 
            // 'Lanchonete',
            // 'Chocolate',
            // 'Pelucia',
            // 'AutoEscola', 
            // 'Joalheria'
        ]
        this.lojasNomesScene = [
            'padariaScene',
            // 'gamesScene',
            'cupcakeScene',
            // 'belezaScene',
            // 'roupasScene', 
            // 'petScene',
            // 'movelScene',
            // 'frutariaScene', 
            // 'lanchoneteScene',
            // 'chocolateScene',
            // 'peluciaScene',
            // 'autoEscolaScene', 
            // 'joalheriaScene'
        ]
    }

    // Método responsável por carregar todos os assets antes da cena iniciar
    preload() {
        // Imagens estáticas
        this.load.image('rua', 'assets/novoMapa.jpeg');

        // Carrega todas as imagens de lojas
        for(let i = 0; i < this.lojasNomes.length; i++){
            this.load.image('loja' + this.lojasNomes[i], `assets/loja${this.lojasNomes[i]}.png`);
        }

        // Pré carrega os objetos com uma função estática
        Player.preload(this);
        Npc.preload(this);
        LojaFisica.preload(this);
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
        // Configura player, npc e sistema de quiz
        this._configurarPlayerNpcQuiz();

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
        // Cria todas as lojas da lista de lojas
        for(let i = 0; i < this.lojasNomes.length; i++){
            this.lojas[i] = this._criarLoja(
                250 + (500 * i),
                1150,
                'loja' + this.lojasNomes[i],
                this.lojasNomesScene[i],
                this.lojasNomes[i].toLowerCase()
            );
        }
    }

    _criarLoja(posX, posY, sprite, sceneKey, sceneName){
        // cria nova cena apenas se ela não existir
        if (!this.scene.manager.getScene(sceneKey)){
            let cena = new LojaScene({
                nomeDaLoja: sceneName,
                nomeDaCena: sceneKey,
                bgScale: 2.9,

                npcX: 800,
                npcY: 350,

                portaX: 195,
                portaY: 150,

                playerX: 190,
                playerY: 290
            });
            this.scene.add(sceneKey, cena);
        }
        
        // cria o objeto da loja
        let l = new LojaFisica(
            this,
            posX,
            posY,
            sprite,
            sceneKey,
            sceneName
        );

        // salva a porta da loja
        let portaEntrada = l.getPorta();

        // Detecta sobreposição entre porta e jogador
        this.physics.add.overlap(portaEntrada, this.player, () => {

            // Executa método responsável por trocar de cena
            portaEntrada.trocarDeCena();
        });

        return l;
    }

    // Método executado a cada frame do jogo
    update() {

        // Atualiza lógica de movimentação e estado do jogador
        this.player.update();
    }
}
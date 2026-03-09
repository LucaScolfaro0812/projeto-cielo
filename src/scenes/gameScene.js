
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
        
        // lista de todas as lojas fisicas do jogo
        this.lojas = [];

        // lista de configurações de cada loja
        this.lojasConfigs = [
            {
                nomeLoja: 'Padaria',
                cena: 'padariaScene',
                bgScale: 2.9,

                npcX: 90,
                npcY: 0,

                portaX: -605,
                portaY: -200,

                playerX: -610,
                playerY: -60
            },
            {
                nomeLoja: 'Games',
                cena: 'gamesScene',
                bgScale: 2.9,

                npcX: 90,
                npcY: 0,

                portaX: -605,
                portaY: -200,

                playerX: -610,
                playerY: -60
            },
            {
                nomeLoja: 'Cupcake',
                cena: 'cupcakeScene',
                bgScale: 2.9,

                npcX: 90,
                npcY: 0,

                portaX: -605,
                portaY: -200,

                playerX: -610,
                playerY: -60
            },
            {
                nomeLoja: 'Beleza',
                cena: 'belezaScene',
                bgScale: 2.9,

                npcX: 90,
                npcY: 0,

                portaX: -605,
                portaY: -200,

                playerX: -610,
                playerY: -60
            },
            {
                nomeLoja: 'Roupas',
                cena: 'roupasScene',
                bgScale: 2.9,

                npcX: 90,
                npcY: 0,

                portaX: -605,
                portaY: -200,

                playerX: -610,
                playerY: -60
            },
            {
                nomeLoja: 'Pet',
                cena: 'petScene',
                bgScale: 2.9,

                npcX: 90,
                npcY: 0,

                portaX: -605,
                portaY: -200,

                playerX: -610,
                playerY: -60
            },
            {
                nomeLoja: 'Movel',
                cena: 'movelScene',
                bgScale: 2.9,

                npcX: 90,
                npcY: 0,

                portaX: -605,
                portaY: -200,

                playerX: -610,
                playerY: -60
            },
            {
                nomeLoja: 'Frutaria',
                cena: 'frutariaScene',
                bgScale: 2.9,

                npcX: 90,
                npcY: 0,

                portaX: -605,
                portaY: -200,

                playerX: -610,
                playerY: -60
            },
            {
                nomeLoja: 'Lanchonete',
                cena: 'lanchoneteScene',
                bgScale: 2.9,

                npcX: 90,
                npcY: 0,

                portaX: -605,
                portaY: -200,

                playerX: -610,
                playerY: -60
            },
            {
                nomeLoja: 'Chocolate',
                cena: 'chocolateScene',
                bgScale: 2.9,

                npcX: 90,
                npcY: 0,

                portaX: -605,
                portaY: -200,

                playerX: -610,
                playerY: -60
            },
            {
                nomeLoja: 'Pelucia',
                cena: 'peluciaScene',
                bgScale: 2.9,

                npcX: 90,
                npcY: 0,

                portaX: -605,
                portaY: -200,

                playerX: -610,
                playerY: -60
            },
            {
                nomeLoja: 'AutoEscola',
                cena: 'autoEscolaScene',
                bgScale: 2.9,

                npcX: 90,
                npcY: 0,

                portaX: -605,
                portaY: -200,

                playerX: -610,
                playerY: -60
            },
            {
                nomeLoja: 'Joalheria',
                cena: 'joalheriaScene',
                bgScale: 2.9,

                npcX: 90,
                npcY: 0,

                portaX: -605,
                portaY: -200,

                playerX: -610,
                playerY: -60
            }
        ];
    }

    // Método responsável por carregar todos os assets antes da cena iniciar
    preload() {
        // Imagens estáticas
        this.load.image('rua', 'assets/novoMapa.jpeg');

        // Carrega todas as imagens de lojas
        for(let i = 0; i < this.lojasConfigs.length; i++){
            this.load.image('loja' + this.lojasConfigs[i].nomeLoja, `assets/lojas/loja${this.lojasConfigs[i].nomeLoja}.png`);
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
             this.physics.world.setBounds(
                0,
                0,
                
                this.fundo.displayWidth,
                this.fundo.displayHeight
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
        // Cria todas as lojas da lista de lojas
        for(let i = 0; i < this.lojasConfigs.length; i++){
            this.lojas[i] = this._criarLoja(
                250 + (500 * i),
                1150,
                'loja' + this.lojasConfigs[i].nomeLoja,
                this.lojasConfigs[i]
            );
        }
    }

    _criarLoja(posX, posY, sprite, config){
        // cria nova cena apenas se ela não existir
        if (!this.scene.manager.getScene(config.cena)){
            let cena = new LojaScene({
                nomeDaLoja: config.nomeLoja,
                nomeDaCena: config.cena,
                bgScale: 2.9,

                npcX: 90,
                npcY: 0,

                portaX: -605,
                portaY: -200,

                playerX: -610,
                playerY: -60
            });
            this.scene.add(config.cena, cena);
        }
        
        // cria o objeto da loja
        let l = new LojaFisica(
            this,
            posX,
            posY,
            sprite,
            config.cena,
            config.nomeLoja
        );

        // salva a porta da loja
        let portaEntrada = l.getPorta();

        // Detecta sobreposição entre porta e jogador
        this.physics.add.overlap(portaEntrada, this.player, () => {

            // Executa método responsável por trocar de cena
            portaEntrada.trocarDeCena();
        });

        // retornando a loja criada
        return l;
    }

    // Método executado a cada frame do jogo
    update() {

        // Atualiza lógica de movimentação e estado do jogador
        this.player.update();
    }
}
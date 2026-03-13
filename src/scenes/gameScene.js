
// importa as outras classes que contém objetos e dados do jogo
import Player from '../entities/player.js';
import { definirProximoSpawnCidade, consumirSpawnCidade } from "../utils/estadoJogo.js";
import { obterSpawnCidadePorLoja } from "../utils/spawnCidade.js";
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
        this.CenaDeTesteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee = 'joalheriaScene';
        // lista de configurações de cada loja
        this.lojasConfigs = [
            {
                nomeLoja: 'Cafe',
                cena: 'cafeScene',
                bgScale: 1,

                lojaFisicaOriginX: 0.7,
                lojaFisicaOriginY: 0.62,

                npcX: 600,
                npcY: 300,

                portaX: 190,
                portaY: 225,

                playerX: 190,
                playerY: 300
            },
            {
                nomeLoja: 'Games',
                cena: 'gamesScene',
                bgScale: 1.4,

                lojaFisicaOriginX: 0.55,
                lojaFisicaOriginY: 0.62,

                npcX: 600,
                npcY: 300,

                portaX: 190,
                portaY: 225,

                playerX: 190,
                playerY: 300
            },
            ////////errrrrrrrrrrrrrrrroooooooooooooooooooooo
            {
                nomeLoja: 'Beleza',
                cena: 'belezaScene',
                bgScale: 1,

                lojaFisicaOriginX: 0.64,
                lojaFisicaOriginY: 0.6,

                npcX: 600,
                npcY: 300,

                portaX: 190,
                portaY: 225,

                playerX: 190,
                playerY: 300
            },
            {
                nomeLoja: 'Roupas',
                cena: 'roupasScene',
                bgScale: 1,

                lojaFisicaOriginX: 0.63,
                lojaFisicaOriginY: 0.61,

                npcX: 600,
                npcY: 300,

                portaX: 190,
                portaY: 225,

                playerX: 190,
                playerY: 300
            },
            {
                nomeLoja: 'Pet',
                cena: 'petScene',
                bgScale: 1,

                lojaFisicaOriginX: 0.62,
                lojaFisicaOriginY: 0.61,

                npcX: 600,
                npcY: 300,

                portaX: 190,
                portaY: 225,

                playerX: 190,
                playerY: 300
            },
            {
                nomeLoja: 'Movel',
                cena: 'movelScene',
                bgScale: 1,

                lojaFisicaOriginX: 0.62,
                lojaFisicaOriginY: 0.6,

                npcX: 650,
                npcY: 300,

                portaX: 190,
                portaY: 225,

                playerX: 190,
                playerY: 300
            },
            {
                nomeLoja: 'Frutaria',
                cena: 'frutariaScene',
                bgScale: 1,

                lojaFisicaOriginX: 0.64,
                lojaFisicaOriginY: 0.60,

                npcX: 600,
                npcY: 300,

                portaX: 190,
                portaY: 225,

                playerX: 190,
                playerY: 300
            },
            {
                nomeLoja: 'Lanchonete',
                cena: 'lanchoneteScene',
                bgScale: 1,

                lojaFisicaOriginX: 0.57,
                lojaFisicaOriginY: 0.66,

                npcX: 600,
                npcY: 300,

                portaX: 215,
                portaY: 225,

                playerX: 190,
                playerY: 300
            },
            {
                nomeLoja: 'Chocolate',
                cena: 'chocolateScene',
                bgScale: 1,

                lojaFisicaOriginX: 0.62,
                lojaFisicaOriginY: 0.63,

                npcX: 600,
                npcY: 320,

                portaX: 180,
                portaY: 275,

                playerX: 190,
                playerY: 350
            },
            {
                nomeLoja: 'Pelucia',
                cena: 'peluciaScene',
                bgScale: 1,

                lojaFisicaOriginX: 0.625,
                lojaFisicaOriginY: 0.6,

                npcX: 600,
                npcY: 300,

                portaX: 190,
                portaY: 225,

                playerX: 190,
                playerY: 300
            },
            {
                nomeLoja: 'Autoescola',
                cena: 'autoEscolaScene',
                bgScale: 1,

                lojaFisicaOriginX: 0.69,
                lojaFisicaOriginY: 0.61,

                npcX: 600,
                npcY: 300,

                portaX: 210,
                portaY: 225,

                playerX: 190,
                playerY: 300
            },
            {
                nomeLoja: 'Joalheria',
                cena: 'joalheriaScene',
                bgScale: 1,

                lojaFisicaOriginX: 0.69,
                lojaFisicaOriginY: 0.62,

                npcX: 600,
                npcY: 300,

                portaX: 230,
                portaY: 240,

                playerX: 230,
                playerY: 340
            }
        ];
    }

    // Método responsável por carregar todos os assets antes da cena iniciar
    preload() {
        // Imagens estáticas
        this.load.image('rua', 'assets/Mapa.png');

        // Carrega todas as imagens de lojas
        for (let i = 0; i < this.lojasConfigs.length; i++) {
            let lojaKey = 'loja' + this.lojasConfigs[i].nomeLoja + 'Fisica';
            this.load.image(lojaKey, `assets/lojas/fisica/${lojaKey}.png`);
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
        this.fundo =
            this.add.image(0, 0, 'rua')
                .setOrigin(0.5, 0.5)
                .setScale(3);

        this.fundo.x = this.fundo.displayWidth / 2;
        this.fundo.y = this.fundo.displayHeight / 2;
        this.physics.world.setBounds(
            0,
            0,
            this.fundo.displayWidth,
            this.fundo.displayHeight
        )

        // Configura player, npc e sistema de quiz
        this._configurarPlayerNpcQuiz();
        this.player.setCollideWorldBounds(true);

        // Cria portas e define troca de cena
        this._criarLojasEPortas();

        // Faz a câmera seguir o jogador
        this.cameras.main.startFollow(this.player);

        // Define nível de zoom da câmera
        this.cameras.main.setZoom(0.60);



        //this.scene.start(this.CenaDeTesteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee);

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
        const idSpawnCidade = consumirSpawnCidade(); // Lê qual foi o último spawn salvo para a cidade e já limpa esse estado para não reutilizar indevidamente.

        // Converte o nome da loja em coordenadas reais x e y.
        const coordenadasSpawnCidade = obterSpawnCidadePorLoja(idSpawnCidade);

        // Cria o Marcielo na posição correta em frente da loja de retorno.
        this.player = new Player(
            this,
            coordenadasSpawnCidade.x,
            coordenadasSpawnCidade.y
        );
        this.player.setScale(0.8);
        /*
        // Cria o NPC com suas perguntas associadas
        this.npc = new Npc(this, 800, 1800, perguntasNpcRua, "npc-vermelho", "npc_rua", "Chocolate");
        this.npc.setScale(0.5);

        this.quiz.aplicarVisualConquistado(this.npc);
        // Detecta sobreposição entre NPC e Player
        this.physics.add.overlap(this.npc, this.player, () => {

            // Se o NPC ainda não vendeu (condição de controle)
            if (!this.npc.vendeu) {

                // Inicia o quiz associado ao NPC
                this.quiz.iniciar(this.npc);
            }
        });*/
    }

    /**
     * Cria portas de entrada para outras cenas
     * Cria lojas para entrar
     * e configura a troca de cena ao colidir com o player
     */
    _criarLojasEPortas() {
        // Cria todas as lojas da lista de lojas
        for (let i = 0; i < this.lojasConfigs.length; i++) {
            let posX = 600 + ((i % 4) * 550) + (Math.floor(i % 4 / 2) * 500);
            let posY = 750 + (Math.floor(i / 4) * 1100);

            this.lojas[i] = this._criarLoja(
                posX,
                posY,
                'loja' + this.lojasConfigs[i].nomeLoja + 'Fisica',
                this.lojasConfigs[i]
            );
        }
    }

    _criarLoja(posX, posY, sprite, config) {
        // cria nova cena apenas se ela não existir
        if (!this.scene.manager.getScene(config.cena)) {
            let cena = new LojaScene({
                nomeDaLoja: config.nomeLoja,
                nomeDaCena: config.cena,
                bgScale: config.bgScale,

                npcX: config.npcX,
                npcY: config.npcY,

                portaX: config.portaX,
                portaY: config.portaY,

                playerX: config.playerX,
                playerY: config.playerY
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
        ).setOrigin(config.lojaFisicaOriginX, config.lojaFisicaOriginY);

        // salva a porta da loja
        let portaEntrada = l.getPorta();

        // Detecta sobreposição entre porta e jogador
        this.physics.add.overlap(portaEntrada, this.player, () => {

            //Salva o nome da loja atual, por exemplo Cafe, Pet, Joalheria.
            definirProximoSpawnCidade(config.nomeLoja);

            // Só depois de salvar o contexto, troca para a cena interna da loja.
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
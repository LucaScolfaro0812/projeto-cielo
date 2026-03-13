
// importa as outras classes que contém objetos e dados do jogo
import Player from '../entities/player.js';
import { definirProximoSpawnCidade, consumirSpawnCidade } from "../utils/estadoJogo.js";
import { obterSpawnCidadePorLoja } from "../utils/spawnCidade.js";
import Npc from '../entities/npc.js';
import Quiz from '../quiz/quiz.js';
import LojaFisica from '../entities/lojaFisica.js';
import LojaScene from '../scenes/lojaScene.js';
import { perguntasNpcRua } from '../quiz/quizPerguntas.js';
import { lojaFoiConquistada } from '../utils/progressoLojas.js';
import { VariantesBaloes, obterDecoracaoBaloesDaLoja } from '../utils/configuracaoBaloesLojas.js';

// Definição da cena principal do jogo
export class GameScene extends Phaser.Scene {

    constructor() {
        // Define a chave única da cena dentro do Phaser
        super({ key: 'gameScene' });

        // lista de todas as lojas fisicas do jogo
        this.lojas = [];
        this.decoracoesBaloes = [];
        this.portasPorNomeLoja = {};
        this.nomeLojaRetornoBloqueada = null;
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
                npcY: 320,

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
            ////////errrrrrrrrrrrrrrrroooooooooooooooooooooooooooooooooooooooooooooooo
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
                npcY: 230,

                portaX: 190,
                portaY: 220,

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
                npcY: 270,

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
                npcY: 280,

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
                npcY: 350,

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
                npcY: 325,

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

        // Preload das variacoes de baloes usadas como decoracao externa.
        Object.values(VariantesBaloes).forEach((item) => {
            if (!this.textures.exists(item.chave)) {
                this.load.image(item.chave, item.caminho);
            }
        });

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

        this.posicaoSpawnCidadeX = this.player.x;
        this.posicaoSpawnCidadeY = this.player.y;
        this.tempoMinimoLiberarEntradaLojas = this.time.now + 900;

        // Cria portas e define troca de cena
        this._criarLojasEPortas();

        // Só libera entrada em loja depois que o jogador sair da área de qualquer porta.
        this.entradaLojasLiberada = false;

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
        this.nomeLojaRetornoBloqueada = idSpawnCidade;

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

        //conecta collider com o player
        if (this.corpoColisaoBancada) {
            this.physics.add.collider(this.player, this.corpoColisaoBancada);
        }
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

        this._criarDecoracaoBaloesDaLoja(l, config.nomeLoja);

        // salva a porta da loja
        let portaEntrada = l.getPorta();
        this.portasPorNomeLoja[config.nomeLoja] = portaEntrada;

        this.physics.add.collider(this.player, l);

        // Detecta sobreposição entre porta e jogador
        this.physics.add.overlap(portaEntrada, this.player, () => {
            if (!this.entradaLojasLiberada) {
                return;
            }

            // Evita reentrada imediata na mesma loja de onde o jogador acabou de sair.
            if (config.nomeLoja === this.nomeLojaRetornoBloqueada) {
                return;
            }

            // Salva o nome da loja atual, por exemplo Cafe, Pet, Joalheria.
            definirProximoSpawnCidade(config.nomeLoja);

            // Só depois de salvar o contexto, troca para a cena interna da loja.
            portaEntrada.trocarDeCena();
        });

        if(config.nomeLoja === "Beleza"){
            /////////////////////////////////////erroooooooooooooooooooooooooooo da loja beleza
            this.physics.world.removeCollider(l.getPorta());
            l.getPorta().setVisible(false);
        }
        // retornando a loja criada
        return l;
    }

    _criarDecoracaoBaloesDaLoja(loja, nomeLoja) {
        if (!lojaFoiConquistada(nomeLoja)) {
            return;
        }

        const decoracao = obterDecoracaoBaloesDaLoja(nomeLoja);
        if (!decoracao) {
            return;
        }

        const variante = VariantesBaloes[decoracao.variante];
        if (!variante) {
            return;
        }

        const quantidadeBaloes = Math.max(1, decoracao.quantidade ?? 3);
        const espacamentoEntreBaloes = decoracao.espacamentoX ?? 28;
        const escalaBaloes = decoracao.escala ?? 0.45;
        const deslocamentoInicialX = -((quantidadeBaloes - 1) * espacamentoEntreBaloes) / 2;

        for (let i = 0; i < quantidadeBaloes; i++) {
            const spriteBaloes = this.add.image(
                loja.x + decoracao.offsetX + deslocamentoInicialX + (i * espacamentoEntreBaloes),
                loja.y + decoracao.offsetY,
                variante.chave
            );

            spriteBaloes.setScale(escalaBaloes);
            spriteBaloes.setDepth((loja.depth ?? 0) + 1);

            this.decoracoesBaloes.push(spriteBaloes);
        }
    }

    // Método executado a cada frame do jogo
    update() {

        // Atualiza lógica de movimentação e estado do jogador
        this.player.update();

        // Evita reentrada automática: só libera entrada após sair do contato com portas.
        if (!this.entradaLojasLiberada) {
            const passouTempoMinimo = this.time.now >= this.tempoMinimoLiberarEntradaLojas;
            const distanciaDoSpawnCidade = Phaser.Math.Distance.Between(
                this.player.x,
                this.player.y,
                this.posicaoSpawnCidadeX,
                this.posicaoSpawnCidadeY
            );
            const afastouDoSpawnCidade = distanciaDoSpawnCidade > 120;

            if (passouTempoMinimo && (afastouDoSpawnCidade || !this._jogadorSobrepoeAlgumaPorta())) {
                this.entradaLojasLiberada = true;
            }
        }

        this._atualizarBloqueioLojaRetorno();
    }

    _atualizarBloqueioLojaRetorno() {
        if (!this.nomeLojaRetornoBloqueada) {
            return;
        }

        const portaRetorno = this.portasPorNomeLoja[this.nomeLojaRetornoBloqueada];

        if (!portaRetorno) {
            this.nomeLojaRetornoBloqueada = null;
            return;
        }

        const distanciaAtePorta = Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            portaRetorno.x,
            portaRetorno.y
        );

        // Libera a loja de retorno quando o jogador se afasta da porta.
        if (distanciaAtePorta > 260) {
            this.nomeLojaRetornoBloqueada = null;
        }
    }

    _jogadorSobrepoeAlgumaPorta() {
        for (let i = 0; i < this.lojas.length; i++) {
            const loja = this.lojas[i];

            if (!loja) {
                continue;
            }

            const porta = loja.getPorta();

            if (porta && this.physics.overlap(this.player, porta)) {
                return true;
            }
        }

        return false;
    }
}
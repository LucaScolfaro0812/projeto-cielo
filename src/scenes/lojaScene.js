// Importação das entidades utilizadas na cena
import Player from '../entities/player.js';
import { definirProximoSpawnCidade } from "../utils/estadoJogo.js"; // Importa função para definir próximo spawn na cidade
import { obterBancadaDaLoja, obterTipoBancada } from "../utils/configuracaoBancadas.js";
import Quiz from '../quiz/quiz.js';
import Npc from '../entities/npc.js';
import Entrada from '../entities/lojaEntrar.js';
import { perguntasMovel, perguntasNpcRua, perguntasPelucia, perguntasPet, perguntasCafe, perguntasAutoescola, perguntasChocolate, perguntasLanchonete } from '../quiz/quizPerguntas.js';

// Cena responsável pelo ambiente interno da loja
export default class LojaScene extends Phaser.Scene {

    constructor(configs) {

        // Define a chave única da cena no Scene Manager do Phaser
        super({ key: configs.nomeDaCena });

        this.nomeLoja = configs.nomeDaLoja;
        this.sceneLoja = configs.nomeDaCena;
        this.backgroundScale = configs.bgScale;

        this.npcX = configs.npcX;
        this.npcY = configs.npcY;

        this.portaX = configs.portaX;
        this.portaY = configs.portaY;


        this.playerX = configs.playerX;
        this.playerY = configs.playerY;

        this.fundoImage = 'loja' + this.nomeLoja + 'Interior';
    }

    // Carrega os assets necessários antes da criação da cena
    preload() {
        // Imagem de fundo da padaria
        this.load.image(this.fundoImage, `assets/lojas/interior/${this.fundoImage}.png`);

        // Pré carrega os objetos com uma função estática
        Player.preload(this);
        Npc.preload(this);

        // Carrega sprite da bancada da loja atual, se houver configuração
        this._precarregarBancadaDaLoja();
    }

    // Executado quando a cena é criada
    create() {
        this._criarCenario();
        this._criarBancadaDaLoja();
        this._configurarPlayerNpcQuiz();
        this._criarPortas();

        // Faz a câmera seguir o jogador
        this.cameras.main.startFollow(this.player);

        // Define nível de zoom da câmera
        this.cameras.main.setZoom(0.60);
    }

    /**
     * Cria o cenário visual
     */
    _criarCenario() {
        // Adiciona imagem de fundo na posição especificada
        // setScale ajusta o tamanho da imagem para o layout da cena
        this.fundo =
            this.add.image(0, 0, this.fundoImage)
                .setOrigin(0.5, 0.5)
                .setScale(this.backgroundScale);

        this.fundo.x = this.fundo.displayWidth / 2;
        this.fundo.y = this.fundo.displayHeight / 2;
        this.physics.world.setBounds(
            0,
            0,
            this.fundo.displayWidth,
            this.fundo.displayHeight
        )
    }

    // Cria a imagem da bancada na posição configurada.
    _criarBancadaDaLoja() {
        const configuracaoBancadaDaLoja = obterBancadaDaLoja(this.nomeLoja);

        if (!configuracaoBancadaDaLoja) {
            this.bancadaDaLoja = null;
            return;
        }

        const tipoBancada = obterTipoBancada(configuracaoBancadaDaLoja.TipoBancada);

        if (!tipoBancada || !this.textures.exists(tipoBancada.ChaveSprite)) {
            this.bancadaDaLoja = null;
            return;
        }

        this.bancadaDaLoja = this.add.image(
            configuracaoBancadaDaLoja.PosicaoX,
            configuracaoBancadaDaLoja.PosicaoY,
            tipoBancada.ChaveSprite
        ).setOrigin(0.5, 0.5);
    }

    // Busca qual bancada a loja atual usa.
    _precarregarBancadaDaLoja() {
        const configuracaoBancadaDaLoja = obterBancadaDaLoja(this.nomeLoja);

        if (!configuracaoBancadaDaLoja) {
            return;
        }

        const tipoBancada = obterTipoBancada(configuracaoBancadaDaLoja.TipoBancada);

        if (!tipoBancada) {
            return;
        }

        if (!this.textures.exists(tipoBancada.ChaveSprite)) {
            this.load.image(tipoBancada.ChaveSprite, tipoBancada.CaminhoSprite);
        }
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

        // Cria jogador na posição inicial dentro da cena
        this.player = new Player(this, this.playerX, this.playerY);
        this.player.setCollideWorldBounds(true);

        // Mapa de perguntas por loja
        const perguntasPorLoja = {
            Movel: perguntasMovel,
            Cafe: perguntasCafe,
            Pet: perguntasPet,
            Lanchonete: perguntasLanchonete,
            Autoescola: perguntasAutoescola,
            Pelucia: perguntasPelucia,
            Chocolate: perguntasChocolate
        };

        // Seleciona as perguntas da loja atual, fallback para perguntasNpcRua se não encontrar
        const perguntasDaLoja = perguntasPorLoja[this.nomeLoja] ?? perguntasNpcRua;

        // Cria NPC com perguntas específicas da cena
        this.npc = new Npc(
            this,
            this.npcX,
            this.npcY,
            perguntasDaLoja,
            "npc-vermelho",
            `npc_${this.sceneLoja}`,
        );

        this.quiz.aplicarVisualConquistado(this.npc);

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
            this.portaX,         // posição X
            this.portaY,           // posição Y
            this,        // referência da cena
            'gameScene'  // nome da cena de destino
        );

        // Define o tamanho da porta
        this.portaEntrada.setScale(0.5);

        // Detecta sobreposição entre jogador e porta
        this.physics.add.overlap(this.portaEntrada, this.player, () => {
            // Salva o identificador da loja atual
            definirProximoSpawnCidade(this.nomeLoja);

            // Depois de salvar o contexto, faz a transição para a cidade.
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
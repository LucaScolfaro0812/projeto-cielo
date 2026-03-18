// Importação das entidades utilizadas na cena
import Player from '../entidades/jogador.js';
import { definirProximoSpawnCidade } from "../utilitarios/estado-jogo.js"; // Importa função para definir próximo spawn na cidade
import { obterBancadaDaLoja, obterTipoBancada } from "../utilitarios/configuracao-bancadas.js";
import Quiz from '../sistemas/quiz.js';
import Npc from '../entidades/npc.js';
import Entrada from '../entidades/loja-entrar.js';
import { perguntasMovel, perguntasNpcRua, perguntasPelucia, perguntasPet, perguntasCafe, perguntasAutoescola, perguntasChocolate, perguntasLanchonete } from '../sistemas/quiz-perguntas.js';
import { ObjetosInterior } from '../utilitarios/configuracao-interior.js';

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

        this.fundoImage = 'lojaVazia' + this.nomeLoja;
    }

    // Carrega os assets necessários antes da criação da cena
    preload() {
        // Imagem de fundo da padaria
        this.load.image(this.fundoImage, `assets/imagens/lojas/interior/${this.fundoImage}.png`);

        // Pré carrega os objetos com uma função estática
        Player.preload(this);
        Npc.preload(this);

        // Carrega sprite da bancada da loja atual, se houver configuração
        this._precarregarBancadaDaLoja();


        // --- AUTOESCOLA ---
        this.load.image('autoEscolaBancada', 'assets/imagens/itens-lojas/autoEscolaBancada.png');
        this.load.image('autoEscolaBanquinho', 'assets/imagens/itens-lojas/autoEscolaBanquinho.png');
        this.load.image('autoEscolaMesa', 'assets/imagens/itens-lojas/autoEscolaMesa.png');
        this.load.image('autoEscolaPlaca', 'assets/imagens/itens-lojas/autoEscolaPlaca.png');

        // --- BRINQUEDOS (Pelúcia) ---
        this.load.image('brinquedoBancada', 'assets/imagens/itens-lojas/brinquedoBancada.png');
        this.load.image('brinquedoEstante', 'assets/imagens/itens-lojas/brinquedoEstante.png');
        this.load.image('brinquedoLetreiro', 'assets/imagens/itens-lojas/brinquedoLetreiro.png');
        this.load.image('brinquedoMesa', 'assets/imagens/itens-lojas/brinquedoMesa.png');
        this.load.image('brinquedoPosters', 'assets/imagens/itens-lojas/brinquedoPosters.png');

        // --- CHOCOLATE ---
        this.load.image('chocolateBancada', 'assets/imagens/itens-lojas/chocolateBancada.png');
        this.load.image('chocolateMesa', 'assets/imagens/itens-lojas/chocolateMesa.png');
        this.load.image('chocolatePlaca', 'assets/imagens/itens-lojas/chocolatePlaca.png');

        // --- DOCES MOMENTOS (Café/Lanchonete?) ---
        this.load.image('docesMomentosBancada', 'assets/imagens/itens-lojas/docesMomentosBancada.png');
        this.load.image('docesMomentosMesa1', 'assets/imagens/itens-lojas/docesMomentosMesa1.png');
        this.load.image('docesMomentosMesa2', 'assets/imagens/itens-lojas/docesMomentosMesa2.png');

        // --- FRUTARIA ---
        this.load.image('frutaAbacaxi', 'assets/imagens/itens-lojas/frutaAbacaxi.png');
        this.load.image('frutaCaixaFrutaVermelha', 'assets/imagens/itens-lojas/frutaCaixaFrutaVermelha.png');
        this.load.image('frutaCestaDeFrutas', 'assets/imagens/itens-lojas/frutaCestaDeFrutas.png');
        this.load.image('frutaFrutasVermelhas', 'assets/imagens/itens-lojas/frutaFrutasVermelhas.png');
        this.load.image('frutaFrutaVerde', 'assets/imagens/itens-lojas/frutaFrutaVerde.png');
        this.load.image('frutaMaçaLaranja', 'assets/imagens/itens-lojas/frutaMaçaLaranja.png');
        this.load.image('frutaManga', 'assets/imagens/itens-lojas/frutaManga.png');
        this.load.image('frutaMelão', 'assets/imagens/itens-lojas/frutaMelão.png');
        this.load.image('frutaMesa', 'assets/imagens/itens-lojas/frutaMesa.png');
        this.load.image('frutaPrateleira', 'assets/imagens/itens-lojas/frutaPrateleira.png');

        // --- JOALHERIA ---
        this.load.image('joalheriaBancada', 'assets/imagens/itens-lojas/joalheriaBancada.png');
        this.load.image('joalheriaMesa', 'assets/imagens/itens-lojas/joalheriaMesa.png');

        // --- LANCHONETE ---
        this.load.image('lanchoneteBancada', 'assets/imagens/itens-lojas/lanchoneteBancada.png');
        this.load.image('lanchoneteMesa', 'assets/imagens/itens-lojas/lanchoneteMesa.png');
        this.load.image('lanchonetePosters', 'assets/imagens/itens-lojas/lanchonetePosters.png');
        this.load.image('lanchonetePrateleiras', 'assets/imagens/itens-lojas/lanchonetePrateleiras.png');

        // --- MODA (Roupas) ---
        this.load.image('modaArmarios1', 'assets/imagens/itens-lojas/modaArmarios1.png');
        this.load.image('modaArmarios2', 'assets/imagens/itens-lojas/modaArmarios2.png');
        this.load.image('modaBancada', 'assets/imagens/itens-lojas/modaBancada.png');
        this.load.image('modaEspelho', 'assets/imagens/itens-lojas/modaEspelho.png');
        this.load.image('modaManiquins', 'assets/imagens/itens-lojas/modaManiquins.png');
        this.load.image('modaMesa', 'assets/imagens/itens-lojas/modaMesa.png');
        this.load.image('modaSapatos', 'assets/imagens/itens-lojas/modaSapatos.png');

        // --- MÓVEIS ---
        this.load.image('moveisBancada', 'assets/imagens/itens-lojas/moveisBancada.png');
        this.load.image('moveisCadeiras', 'assets/imagens/itens-lojas/moveisCadeiras.png');
        this.load.image('moveisEstanteLuminárias', 'assets/imagens/itens-lojas/moveisEstanteLuminárias.png');
        this.load.image('moveisImpressora', 'assets/imagens/itens-lojas/moveisImpressora.png');
        this.load.image('moveisMesa1', 'assets/imagens/itens-lojas/moveisMesa1.png');
        this.load.image('moveisMesa2', 'assets/imagens/itens-lojas/moveisMesa2.png');
        this.load.image('moveisPoltrona', 'assets/imagens/itens-lojas/moveisPoltrona.png');
        this.load.image('moveisSofas', 'assets/imagens/itens-lojas/moveisSofas.png');

        // --- PETSHOP ---
        this.load.image('petshopAquario', 'assets/imagens/itens-lojas/petshopAquario.png');
        this.load.image('petshopBancada', 'assets/imagens/itens-lojas/petshopBancada.png');
        this.load.image('petshopGaiolas', 'assets/imagens/itens-lojas/petshopGaiolas.png');
        this.load.image('petshopMesa', 'assets/imagens/itens-lojas/petshopMesa.png');
        this.load.image('petshopPrateleiras', 'assets/imagens/itens-lojas/petshopPrateleiras.png');

        // --- SALÃO DE BELEZA ---
        this.load.image('salaodebelezaBancada', 'assets/imagens/itens-lojas/salaodebelezaBancada.png');
        this.load.image('salaodebelezaCadeira1', 'assets/imagens/itens-lojas/salaodebelezaCadeira1.png');
        this.load.image('salaodebelezaCadeira2', 'assets/imagens/itens-lojas/salaodebelezaCadeira2.png');
        this.load.image('salaodebelezaCadeirasCabelo', 'assets/imagens/itens-lojas/salaodebelezaCadeirasCabelo.png');
        this.load.image('salaodebelezaCadeirasCabeloCortar', 'assets/imagens/itens-lojas/salaodebelezaCadeirasCabeloCortar.png'); 
        this.load.image('salaodebelezaMesa', 'assets/imagens/itens-lojas/salaodebelezaMesa.png');
        this.load.image('salaodebelezaToalhas', 'assets/imagens/itens-lojas/salaodebelezaToalhas.png');

        // --- VIDEOGAME (Games) ---
        this.load.image('videogameBancada', 'assets/imagens/itens-lojas/videogameBancada.png');
        this.load.image('videogameEstante', 'assets/imagens/itens-lojas/videogameEstante.png');
        this.load.image('videogameFliperama1', 'assets/imagens/itens-lojas/videogameFliperama1.png');
        this.load.image('videogameFliperama2', 'assets/imagens/itens-lojas/videogameFliperama2.png');
        this.load.image('videogameFliperama3', 'assets/imagens/itens-lojas/videogameFliperama3.png');
        this.load.image('videogameFliperamaDeLado', 'assets/imagens/itens-lojas/videogameFliperamaDeLado.png');
        this.load.image('videogameMesa', 'assets/imagens/itens-lojas/videogameMesa.png');
        this.load.image('videogameMesaNerd', 'assets/imagens/itens-lojas/videogameMesaNerd.png');
}


    // Executado quando a cena é criada
    create() {
        this._criarCenario();
        this._criarBancadaDaLoja();
        this._configurarPlayerNpcQuiz();
        this._criarPortas();

        if (this.player) {
            this.player.setDepth(150);
        }

        // Faz a câmera seguir o jogador
        this.cameras.main.startFollow(this.player);

        // Define nível de zoom da câmera
        this.cameras.main.setZoom(0.60);

            this.input.on('pointerdown', (pointer) => {
            // Pega as coordenadas X e Y do clique e converte considerando a câmera
            let worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
            console.log(`Coordenadas -> X: ${Math.round(worldPoint.x)}, Y: ${Math.round(worldPoint.y)}`);
});

            this.objetosFisicos = this.physics.add.staticGroup(); // Grupo para objetos que não se movem
            this._criarMobiliario();

            // Colisão geral do jogador com todos os móveis da loja
            this.physics.add.collider(this.player, this.objetosFisicos);
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
            this.corpoColisaoBancada = null;
            return;
        }

        const tipoBancada = obterTipoBancada(configuracaoBancadaDaLoja.TipoBancada);

        if (!tipoBancada || !this.textures.exists(tipoBancada.ChaveSprite)) {
            this.bancadaDaLoja = null;
            this.corpoColisaoBancada = null;
            return;
        }

        const deveRenderizarSpriteBancada = configuracaoBancadaDaLoja.RenderizarSprite !== false;

        if (deveRenderizarSpriteBancada) {
            const escalaSpriteX = tipoBancada.EscalaSpriteX ?? 1;
            const escalaSpriteY = tipoBancada.EscalaSpriteY ?? 1;

            this.bancadaDaLoja = this.add.image(
                configuracaoBancadaDaLoja.PosicaoX,
                configuracaoBancadaDaLoja.PosicaoY,
                tipoBancada.ChaveSprite
            ).setOrigin(0.5, 0.5)
                .setScale(escalaSpriteX, escalaSpriteY);
        } else {
            this.bancadaDaLoja = null;
        }

        // Cria um corpo físico invisível para bloquear o jogador.
        this.corpoColisaoBancada = this.add.rectangle(
            configuracaoBancadaDaLoja.PosicaoX + tipoBancada.OffsetColliderX,
            configuracaoBancadaDaLoja.PosicaoY + tipoBancada.OffsetColliderY,
            tipoBancada.LarguraCollider,
            tipoBancada.AlturaCollider
        );
        this.corpoColisaoBancada.setVisible(false);

        this.physics.add.existing(this.corpoColisaoBancada, true);
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

        // Collider da bancada interna desativado temporariamente.
        // Para reativar, descomente o bloco abaixo.
        /*
        if (this.corpoColisaoBancada) {
            this.physics.add.collider(this.player, this.corpoColisaoBancada);
        }
        */

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

    _criarMobiliario() {
        console.log("-> 1. Iniciando montagem dos móveis para a loja:", this.nomeLoja);
        
        const listaObjetos = ObjetosInterior[this.nomeLoja];
        
        if (!listaObjetos) {
            console.log("-> ❌ Nenhuma lista de móveis encontrada para essa loja!");
            return;
        }

        console.log("-> 2. Encontrei a lista! Quantidade de móveis para criar:", listaObjetos.length);

        listaObjetos.forEach(config => {
            console.log(`-> 3. Desenhando: ${config.imagem} em X: ${config.x}, Y: ${config.y}`);
            
            let movel = this.objetosFisicos.create(config.x, config.y, config.imagem);
            
            // 🚨 FORÇA o móvel a renderizar por cima de TUDO (z-index bem alto)
            movel.setDepth(100); 

            if (config.escala) {
                movel.setScale(config.escala);
            }

            // 🚨 No Phaser, quando mudamos o tamanho de um objeto estático, 
            // precisamos pedir pra física recalcular o tamanho dele:
            movel.refreshBody();

            if (config.hitWidth && config.hitHeight) {
                // Atualiza o tamanho da caixa
                movel.body.setSize(config.hitWidth, config.hitHeight);

                // Força as variáveis de offset (se não existirem, valem 0)
                let recuoX = config.offsetX !== undefined ? config.offsetX : 0;
                let recuoY = config.offsetY !== undefined ? config.offsetY : 0;

                // 🚨 O TRUQUE MÁGICO PARA OBJETOS ESTÁTICOS:
                // Calcula a posição exata da caixa azul forçando as coordenadas top-left
                movel.body.x = (movel.x - (config.hitWidth / 2)) + recuoX;
                movel.body.y = (movel.y - (config.hitHeight / 2)) + recuoY;
            }
        });
    }
}

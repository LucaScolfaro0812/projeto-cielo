import Jogador from '../entidades/jogador.js';
import { definirProximoSpawnCidade } from "../utilitarios/estado-jogo.js";
import Quiz from '../sistemas/quiz.js';
import { Maquininhas } from '../sistemas/maquininhas.js';
import HudMaquininhas from '../sistemas/hud-maquininhas.js';
import { sortearPerguntasAleatorias } from '../utilitarios/sorteio-perguntas.js';
import Npc from '../entidades/npc.js';
import Entrada from '../entidades/loja-entrar.js';
import { revelarCena } from '../utilitarios/transicao-cena.js';
import {
    perguntasMovel,
    perguntasPelucia,
    perguntasPet,
    perguntasCafe,
    perguntasAutoescola,
    perguntasChocolate,
    perguntasLanchonete,
    perguntasBeleza,
    perguntasGames,
    perguntasJoalheria,
    perguntasRoupas,
    perguntasFrutaria
} from '../sistemas/quiz-perguntas.js';
import { ObjetosInterior } from '../utilitarios/configuracao-interior.js';

// Cena base usada por todas as lojas do jogo.
// Recebe um objeto de configs no construtor, o que permite reutilizar
// essa mesma classe para lojas diferentes sem duplicar código.
export default class CenaLoja extends Phaser.Scene {

    constructor(configs) {
        super({ key: configs.nomeDaCena });

        this.nomeLoja = configs.nomeDaLoja;
        this.sceneLoja = configs.nomeDaCena;
        this.backgroundScale = configs.bgScale;

        // Posição do NPC dentro da loja
        this.npcX = configs.npcX;
        this.npcY = configs.npcY;

        // Posição da porta de saída
        this.portaX = configs.portaX;
        this.portaY = configs.portaY;

        // Posição inicial do jogador ao entrar na loja
        this.playerX = configs.playerX;
        this.playerY = configs.playerY;

        // Chave da imagem de fundo do interior da loja
        this.fundoImage = 'lojaVazia' + this.nomeLoja;

        // Mapeia cada loja ao arquivo de som ambiente correspondente.
        this.somAmbientePorLoja = {
            Autoescola: 'ambienteAutoEscola',
            Pelucia: 'ambientePelucia',
            Chocolate: 'ambienteChocolateria',
            Pet: 'ambientePetShop',
            Roupas: 'ambienteRoupas',
            Beleza: 'ambienteSalaoDeBeleza',
            Cafe: 'ambienteCafeteria',
            Frutaria: 'ambienteFrutaria',
            Movel: 'ambienteMóveis',
            Games: 'ambienteVideoGame',
            Joalheria: 'ambienteJoalheria',
            Lanchonete: 'ambienteLanchonete'
        };

        // Diálogos divididos em partes (máximo 3) exibidos letra a letra ao entrar em cada loja.
        // Cada loja tem um array com até 3 strings — cada string é uma "página" do diálogo.
        this.dialogosPorLoja = {
            Autoescola: [
                'Olá, pode entrar, eu sou a responsável pela autoescola, e fico feliz em te receber.',
                'Como trabalho com pacotes de maior valor, preciso de boas opções de parcelamento, taxas equilibradas e soluções como links de pagamento para facilitar o dia a dia dos alunos.',
                'Você teria um tempinho para me explicar melhor como suas soluções podem me ajudar?'
            ],
            Pelucia: [
                'Oi! Seja bem-vindo ao Mundo das Pelúcias, fico feliz em te receber.',
                'Aqui preciso de um atendimento rápido no pagamento e boas opções de parcelamento para facilitar as compras.',
                'Você teria um tempinho para entrar e me explicar algumas coisas?'
            ],
            Chocolate: [
                'Oi, seja bem-vindo à ChocoMania! Sou o dono daqui e fico feliz em te receber.',
                'Como tenho picos de movimento, preciso de uma solução de pagamento rápida, que aceite diferentes formas e ofereça antecipação.',
                'Você pode me explicar melhor como suas soluções funcionam?'
            ],
            Pet: [
                'Oi! Seja bem-vindo ao Lar dos Amiguinhos.',
                'Aqui tenho bastante movimento, com vendas de produtos e serviços, então preciso de um sistema rápido, organizado e que separe bem cada tipo de operação, além de ajudar na fidelização dos clientes.',
                'Você teria um tempinho para me explicar melhor como suas soluções podem me ajudar?'
            ],
            Roupas: [
                'Oi! Seja bem-vindo à Camila Concept Store, eu sou a Camila e fico feliz em te receber.',
                'Como vendo muito online, preciso de soluções de pagamento seguras, com envio fácil de links e bom controle das vendas.',
                'Você teria um tempinho para me explicar melhor como isso pode funcionar?'
            ],
            Beleza: [
                'Olá, seja bem-vindo à Barbearia!',
                'Aqui preciso de soluções de pagamento práticas e modernas, com aproximação, bom parcelamento e taxas bem configuradas para garantir um atendimento ágil e eficiente.',
                'Você pode entrar um instante para me mostrar como suas soluções funcionam?'
            ],
            Cafe: [
                'Seja bem-vindo ao Café da Mariana! Fico muito feliz em te receber.',
                'Aqui me preocupo com cada detalhe do negócio, então busco soluções de pagamento que sejam eficientes, tenham boas taxas, aceitem vouchers e também combinem com a estética do café.',
                'Agora que você já chegou, gostaria de entrar para conversarmos mais?'
            ],
            Frutaria: [
                'Oi! Pode entrar, seja bem-vindo ao meu Pomar! Muito prazer.',
                'Aqui preciso de soluções simples e rápidas para o caixa, que funcionem bem mesmo com a loja cheia e aceitem vale alimentação, já que muitos clientes pedem essa opção.',
                'Você teria um tempinho para me explicar melhor como isso pode funcionar?'
            ],
            Movel: [
                'Olá, seja bem-vindo!',
                'Trabalho com vendas de maior valor, então preciso de taxas claras, boas opções de parcelamento e um bom controle financeiro para garantir que tudo funcione bem no dia a dia.',
                'Você teria um tempinho para entrar e me explicar algumas coisas?'
            ],
            Games: [
                'E aí, seja bem-vindo à Estação de Jogos! Eu sou o dono daqui, e é um prazer te receber.',
                'Aqui preciso de soluções de pagamento rápidas e modernas, tanto no físico quanto no online, com opções como Pix e bom parcelamento para vendas de maior valor.',
                'Você teria um tempinho para entrar e me explicar melhor como isso pode funcionar aqui?'
            ],
            Joalheria: [
                'Olá, seja bem-vindo! Eu sou o joalheiro e responsável pelo atelier, é um prazer te receber.',
                'Trabalho com peças exclusivas e transações de alto valor, então preciso de soluções seguras, com bom parcelamento, recebimento ágil e que estejam alinhadas com a estética do espaço.',
                'Você teria um tempinho para entrar e me explicar melhor como suas soluções funcionam?'
            ],
            Lanchonete: [
                'Seja bem-vindo à Lanchonete do Carlos!',
                'Aqui busco oferecer um atendimento rápido, prático e acessível, então preciso de soluções que me permitam atender com agilidade, inclusive direto nas mesas.',
                'Você teria um tempinho para entrar e conversarmos mais?'
            ]
        };

        this.metaPopupPorLoja = {
            Autoescola: { nome: 'Patricia', mcc: 'MCC 8299', segmento: 'Educação e cursos' },
            Pelucia: { nome: 'Ana', mcc: 'MCC 5945', segmento: 'Brinquedos e presentes' },
            Chocolate: { nome: 'Rafael', mcc: 'MCC 5441', segmento: 'Doces e chocolateria' },
            Pet: { nome: 'Bruna', mcc: 'MCC 5995', segmento: 'Pet shop e serviços' },
            Roupas: { nome: 'Camila', mcc: 'MCC 5651', segmento: 'Moda e vestuário' },
            Beleza: { nome: 'Diego', mcc: 'MCC 7241', segmento: 'Barbearia e cuidados pessoais' },
            Cafe: { nome: 'Mariana', mcc: 'MCC 5814', segmento: 'Cafeteria' },
            Frutaria: { nome: 'João', mcc: 'MCC 5499', segmento: 'Hortifruti' },
            Movel: { nome: 'Roberto', mcc: 'MCC 5712', segmento: 'Móveis e decoração' },
            Games: { nome: 'Lucas', mcc: 'MCC 5734', segmento: 'Games e eletrônicos' },
            Joalheria: { nome: 'Eduardo', mcc: 'MCC 5944', segmento: 'Joalheria' },
            Lanchonete: { nome: 'Carlos', mcc: 'MCC 5812', segmento: 'Lanchonete e refeições rápidas' }
        };

        // Cor de destaque e ícone temático por loja — cores retiradas das fachadas
        this.temaPorLoja = {
            Autoescola: { cor: 0xc8a800, corHex: '#c8a800', icone: '🚗' },
            Pelucia:    { cor: 0xd93030, corHex: '#d93030', icone: '🧸' },
            Chocolate:  { cor: 0x8b3a1a, corHex: '#8b3a1a', icone: '🍫' },
            Pet:        { cor: 0x2979d9, corHex: '#2979d9', icone: '🐾' },
            Roupas:     { cor: 0x1a50c8, corHex: '#1a50c8', icone: '👗' },
            Beleza:     { cor: 0xd44f8a, corHex: '#d44f8a', icone: '✂️' },
            Cafe:       { cor: 0x7b4c2a, corHex: '#7b4c2a', icone: '☕' },
            Frutaria:   { cor: 0xe02020, corHex: '#e02020', icone: '🍎' },
            Movel:      { cor: 0xd97c2a, corHex: '#d97c2a', icone: '🛋️' },
            Games:      { cor: 0x7b2fb5, corHex: '#7b2fb5', icone: '🎮' },
            Joalheria:  { cor: 0x2ab5a0, corHex: '#2ab5a0', icone: '💍' },
            Lanchonete: { cor: 0xd9940a, corHex: '#d9940a', icone: '🍔' },
        };

    }

    preload() {
        // Carrega o fundo do interior da loja
        this.load.image(this.fundoImage, `assets/imagens/lojas/interior/${this.fundoImage}.png`);

        Jogador.preload(this);
        Npc.preload(this);

        this.load.image('botaoInteracao', 'assets/imagens/botao.interacao.png');
        this.load.image('maquininhaCielo', 'assets/imagens/maquininha-cielo.png');

        // Itens de mobiliário de todas as lojas
        this.load.image('autoEscolaBancada', 'assets/imagens/itens-lojas/autoEscolaBancada.png');
        this.load.image('autoEscolaBanquinho', 'assets/imagens/itens-lojas/autoEscolaBanquinho.png');
        this.load.image('autoEscolaMesa', 'assets/imagens/itens-lojas/autoEscolaMesa.png');
        this.load.image('autoEscolaPlaca', 'assets/imagens/itens-lojas/autoEscolaPlaca.png');
        this.load.image('brinquedoBancada', 'assets/imagens/itens-lojas/brinquedoBancada.png');
        this.load.image('brinquedoEstante', 'assets/imagens/itens-lojas/brinquedoEstante.png');
        this.load.image('brinquedoLetreiro', 'assets/imagens/itens-lojas/brinquedoLetreiro.png');
        this.load.image('brinquedoMesa', 'assets/imagens/itens-lojas/brinquedoMesa.png');
        this.load.image('brinquedoPosters', 'assets/imagens/itens-lojas/brinquedoPosters.png');
        this.load.image('chocolateBancada', 'assets/imagens/itens-lojas/chocolateBancada.png');
        this.load.image('chocolateMesa', 'assets/imagens/itens-lojas/chocolateMesa.png');
        this.load.image('chocolatePlaca', 'assets/imagens/itens-lojas/chocolatePlaca.png');
        this.load.image('docesMomentosBancada', 'assets/imagens/itens-lojas/docesMomentosBancada.png');
        this.load.image('docesMomentosMesa1', 'assets/imagens/itens-lojas/docesMomentosMesa1.png');
        this.load.image('docesMomentosMesa2', 'assets/imagens/itens-lojas/docesMomentosMesa2.png');
        this.load.image('frutaAbacaxi', 'assets/imagens/itens-lojas/frutaAbacaxi.png');
        this.load.image('frutaBancada', 'assets/imagens/itens-lojas/frutaBancada.png');
        this.load.image('frutaCaixaFrutaVermelha', 'assets/imagens/itens-lojas/frutaCaixaFrutaVermelha.png');
        this.load.image('frutaCestaDeFrutas', 'assets/imagens/itens-lojas/frutaCestaDeFrutas.png');
        this.load.image('frutaFrutasVermelhas', 'assets/imagens/itens-lojas/frutaFrutasVermelhas.png');
        this.load.image('frutaFrutaVerde', 'assets/imagens/itens-lojas/frutaFrutaVerde.png');
        this.load.image('frutaMaçaLaranja', 'assets/imagens/itens-lojas/frutaMaçaLaranja.png');
        this.load.image('frutaManga', 'assets/imagens/itens-lojas/frutaManga.png');
        this.load.image('frutaMelão', 'assets/imagens/itens-lojas/frutaMelão.png');
        this.load.image('frutaMesa', 'assets/imagens/itens-lojas/frutaMesa.png');
        this.load.image('frutaPrateleira', 'assets/imagens/itens-lojas/frutaPrateleira.png');
        this.load.image('joalheriaBancada', 'assets/imagens/itens-lojas/joalheriaBancada.png');
        this.load.image('joalheriaMesa', 'assets/imagens/itens-lojas/joalheriaMesa.png');
        this.load.image('lanchoneteBancada', 'assets/imagens/itens-lojas/lanchoneteBancada.png');
        this.load.image('lanchoneteMesa', 'assets/imagens/itens-lojas/lanchoneteMesa.png');
        this.load.image('lanchonetePosters', 'assets/imagens/itens-lojas/lanchonetePosters.png');
        this.load.image('lanchonetePrateleiras', 'assets/imagens/itens-lojas/lanchonetePrateleiras.png');
        this.load.image('modaArmarios1', 'assets/imagens/itens-lojas/modaArmarios1.png');
        this.load.image('modaArmarios2', 'assets/imagens/itens-lojas/modaArmarios2.png');
        this.load.image('modaBancada', 'assets/imagens/itens-lojas/modaBancada.png');
        this.load.image('modaEspelho', 'assets/imagens/itens-lojas/modaEspelho.png');
        this.load.image('modaManiquins', 'assets/imagens/itens-lojas/modaManiquins.png');
        this.load.image('modaMesa', 'assets/imagens/itens-lojas/modaMesa.png');
        this.load.image('modaSapatos', 'assets/imagens/itens-lojas/modaSapatos.png');
        this.load.image('moveisBancada', 'assets/imagens/itens-lojas/moveisBancada.png');
        this.load.image('moveisCadeiras', 'assets/imagens/itens-lojas/moveisCadeiras.png');
        this.load.image('moveisEstanteLuminárias', 'assets/imagens/itens-lojas/moveisEstanteLuminárias.png');
        this.load.image('moveisImpressora', 'assets/imagens/itens-lojas/moveisImpressora.png');
        this.load.image('moveisMesa1', 'assets/imagens/itens-lojas/moveisMesa1.png');
        this.load.image('moveisMesa2', 'assets/imagens/itens-lojas/moveisMesa2.png');
        this.load.image('moveisPoltrona', 'assets/imagens/itens-lojas/moveisPoltrona.png');
        this.load.image('moveisSofas', 'assets/imagens/itens-lojas/moveisSofas.png');
        this.load.image('petshopAquario', 'assets/imagens/itens-lojas/petshopAquario.png');
        this.load.image('petshopBancada', 'assets/imagens/itens-lojas/petshopBancada.png');
        this.load.image('petshopGaiolas', 'assets/imagens/itens-lojas/petshopGaiolas.png');
        this.load.image('petshopMesa', 'assets/imagens/itens-lojas/petshopMesa.png');
        this.load.image('petshopPrateleiras', 'assets/imagens/itens-lojas/petshopPrateleiras.png');
        this.load.image('salaodebelezaBancada', 'assets/imagens/itens-lojas/salaodebelezaBancada.png');
        this.load.image('salaodebelezaCadeira1', 'assets/imagens/itens-lojas/salaodebelezaCadeira1.png');
        this.load.image('salaodebelezaCadeira2', 'assets/imagens/itens-lojas/salaodebelezaCadeira2.png');
        this.load.image('salaodebelezaCadeirasCabelo', 'assets/imagens/itens-lojas/salaodebelezaCadeirasCabelo.png');
        this.load.image('salaodebelezaCadeirasCabeloCortar', 'assets/imagens/itens-lojas/salaodebelezaCadeirasCabeloCortar.png');
        this.load.image('salaodebelezaMesa', 'assets/imagens/itens-lojas/salaodebelezaMesa.png');
        this.load.image('salaodebelezaToalhas', 'assets/imagens/itens-lojas/salaodebelezaToalhas.png');
        this.load.image('videogameBancada', 'assets/imagens/itens-lojas/videogameBancada.png');
        this.load.image('videogameEstante', 'assets/imagens/itens-lojas/videogameEstante.png');
        this.load.image('videogameFliperama1', 'assets/imagens/itens-lojas/videogameFliperama1.png');
        this.load.image('videogameFliperama2', 'assets/imagens/itens-lojas/videogameFliperama2.png');
        this.load.image('videogameFliperama3', 'assets/imagens/itens-lojas/videogameFliperama3.png');
        this.load.image('videogameFliperamaDeLado', 'assets/imagens/itens-lojas/videogameFliperamaDeLado.png');
        this.load.image('videogameMesa', 'assets/imagens/itens-lojas/videogameMesa.png');
        this.load.image('videogameMesaNerd', 'assets/imagens/itens-lojas/videogameMesaNerd.png');

        // Carrega o som ambiente da loja, se houver e ainda não estiver em cache
        const chaveSomAmbiente = this.somAmbientePorLoja[this.nomeLoja];
        if (chaveSomAmbiente) {
            if (!this.cache.audio.exists(chaveSomAmbiente)) {
                this.load.audio(chaveSomAmbiente, `assets/sons/${chaveSomAmbiente}.mp3`);
            }
        }

        // Carrega o som da porta, se ainda não estiver em cache
        if (!this.cache.audio.exists('portaAbrindo')) {
            this.load.audio('portaAbrindo', 'assets/sons/portaAbrindo.mp3');
        }

        if (!this.cache.audio.exists('somEscrita')) {
            this.load.audio('somEscrita', 'assets/sons/somEscrita.mp3');
        }
    }

    create() {
        revelarCena(this);
        this._criarCenario();

        const zoomX = this.cameras.main.width / this.fundo.displayWidth;
        const zoomY = this.cameras.main.height / this.fundo.displayHeight;
        this.cameras.main.setZoom(Math.max(zoomX, zoomY));
        this.cameras.main.centerOn(this.fundo.displayWidth / 2, this.fundo.displayHeight / 2);

        if (this.cache.audio.exists('portaAbrindo')) {
            this.sound.play('portaAbrindo');
        }

        const chaveSomAmbiente = this.somAmbientePorLoja[this.nomeLoja];
        if (chaveSomAmbiente && this.cache.audio.exists(chaveSomAmbiente)) {
            this.somAmbiente = this.sound.add(chaveSomAmbiente, { loop: true, volume: 0.3 });
            this.somAmbiente.play();
        }

        // --- POPUP DE DIÁLOGO POR PARTES ---
        // Pega o array de partes do diálogo (máximo 3). Fallback para array vazio.
        const partes = this.dialogosPorLoja?.[this.nomeLoja] ?? [];
        const { centerX, centerY, width, height } = this.cameras.main;

        const metaPopup = this.metaPopupPorLoja[this.nomeLoja] ?? {
            nome: 'Cliente',
            mcc: 'MCC não informado',
            segmento: 'Segmento comercial'
        };
        const chaveRetratoNpc = this.textures.exists(`npc-vermelho${this.nomeLoja}`)
            ? `npc-vermelho${this.nomeLoja}`
            : 'npc-vermelho';

        const tema = this.temaPorLoja[this.nomeLoja] ?? { cor: 0x0a6ebd, corHex: '#0a6ebd', icone: '🏪' };

        const overlay = this.add.rectangle(centerX, centerY, width, height, 0x03111f, 0.72)
            .setDepth(999)
            .setScrollFactor(0);

        const painelSombra = this.add.rectangle(centerX + 10, centerY + 12, width * 0.92, height * 0.82, 0x00101a, 0.28)
            .setDepth(1000)
            .setScrollFactor(0);

        const painel = this.add.rectangle(centerX, centerY, width * 0.92, height * 0.82, 0xf7fbff, 0.99)
            .setDepth(1000)
            .setScrollFactor(0)
            .setStrokeStyle(6, tema.cor, 1);

        const faixaTitulo = this.add.rectangle(centerX, centerY - height * 0.30, width * 0.92, 90, tema.cor, 1)
            .setDepth(1001)
            .setScrollFactor(0);

        const tituloPopup = this.add.text(centerX, faixaTitulo.y, `${tema.icone}  ${this.nomeLoja}`, {
            fontSize: '38px',
            fontFamily: 'Verdana, Arial, sans-serif',
            color: '#ffffff',
            fontStyle: 'bold'
        })
            .setDepth(1002)
            .setScrollFactor(0)
            .setOrigin(0.5);


        const faixaLateral = this.add.rectangle(centerX - width * 0.28, centerY + 14, width * 0.22, height * 0.55, tema.cor, 1)
            .setDepth(1001)
            .setScrollFactor(0)
            .setStrokeStyle(3, 0xffffff, 0.3);

        const etiquetaCliente = this.add.text(faixaLateral.x, faixaLateral.y - height * 0.17, 'CLIENTE', {
         fontSize: '18px',
     fontFamily: 'Arial Black, Arial, sans-serif', // fonte mais forte
    color: '#bfe9ff', // azul mais suave (menos estourado)
    fontStyle: 'bold',
        })
            .setDepth(1002)
            .setScrollFactor(0)
            .setOrigin(0.5);

        const painelRetrato = this.add.rectangle(faixaLateral.x, faixaLateral.y - 20, width * 0.14, height * 0.2, 0xe3f4ff, 1)
            .setDepth(1001)
            .setScrollFactor(0)
            .setStrokeStyle(4, 0x78c9f5, 1);

        const retratoNpc = this.add.image(painelRetrato.x, painelRetrato.y + 17, chaveRetratoNpc)
            .setDepth(1002)
            .setScrollFactor(0)
            .setDisplaySize(182, 182)
            .setOrigin(0.5);

        const faixaNomeNpc = this.add.rectangle(faixaLateral.x, faixaLateral.y + 62, width * 0.2, 58, 0x000000, 0.3)
            .setDepth(1003)
            .setScrollFactor(0);

        const nomeNpc = this.add.text(faixaNomeNpc.x, faixaNomeNpc.y - 10, metaPopup.nome, {
            fontSize: '23px',
            fontFamily: 'Verdana, Arial, sans-serif',
            color: '#ffffff',
            fontStyle: 'bold'
        })
            .setDepth(1004)
            .setScrollFactor(0)
            .setOrigin(0.5);

        const segmentoNpc = this.add.text(faixaNomeNpc.x, faixaNomeNpc.y + 14, metaPopup.segmento, {
            fontSize: '14px',
            fontFamily: 'Verdana, Arial, sans-serif',
            color: '#d8f3ff'
        })
            .setDepth(1004)
            .setScrollFactor(0)
            .setOrigin(0.5);

  // --- CARD MCC PADRONIZADO ---
const cartaoMcc = this.add.rectangle(
    faixaLateral.x,
    faixaNomeNpc.y + height * 0.10,
    width * 0.16,
    84,
    0x000000,
    0.25
);

// Título
const tituloMcc = this.add.text(cartaoMcc.x, cartaoMcc.y - 20, 'MCC', {
    fontSize: '18px',
     fontFamily: 'Arial Black, Arial, sans-serif', // fonte mais forte
    color: '#bfe9ff', // azul mais suave (menos estourado)
    fontStyle: 'bold',
})
    .setDepth(1003)
    .setScrollFactor(0)
    .setOrigin(0.5);

// Remove "MCC " do valor pra padronizar visual
const codigoMcc = metaPopup.mcc.replace('MCC ', '');

// Valor centralizado
const valorMcc = this.add.text(cartaoMcc.x, cartaoMcc.y + 10, codigoMcc, {
    fontSize: '26px',
    fontFamily: 'Verdana, Arial, sans-serif',
    color: '#ffffff',
    fontStyle: 'bold',
    align: 'center',
    fixedWidth: 120
})
    .setDepth(1002)
    .setScrollFactor(0)
    .setOrigin(0.5);
        const cartaoTexto = this.add.rectangle(centerX + width * 0.12, centerY + 10, width * 0.46, height * 0.38, 0xffffff, 1)
            .setDepth(1001)
            .setScrollFactor(0)
            .setStrokeStyle(3, 0xd6ebf9, 1);

        const etiquetaDialogo = this.add.text(
    cartaoTexto.x - cartaoTexto.width / 2 + 20,
    cartaoTexto.y - cartaoTexto.height / 2 + 15,
    'NECESSIDADE DO CLIENTE',
    {
        fontSize: '18px',
        fontFamily: 'Verdana, Arial, sans-serif',
        color: tema.corHex,
        fontStyle: 'bold',
        letterSpacing: 1.2
    }
)
    .setDepth(1002)
    .setScrollFactor(0)
    .setOrigin(0, 0);

        this.physics.pause();

        // Captura as teclas do popup para evitar que o navegador trate o espaço como rolagem.
        this.input.keyboard.addCapture(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.input.keyboard.addCapture(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // Texto digitado letra por letra
      const padding = 20;

const textoChat = this.add.text(
    cartaoTexto.x - cartaoTexto.width / 2 + padding,
    cartaoTexto.y - cartaoTexto.height / 2 + padding + 20, 
    '',
    {
        fontSize: '26px',
        fontFamily: 'Verdana, Arial, sans-serif',
        color: '#16324a',
        wordWrap: { width: cartaoTexto.width - padding * 2 },
        align: 'left',
        lineSpacing: 10
    }
)
    .setDepth(1002)
    .setScrollFactor(0)
    .setOrigin(0, 0);

        // Indicador "ESPAÇO para continuar" no canto inferior do popup
        const indicadorX = centerX;
        const indicadorY = centerY + height * 0.22;

      const textoIndicador = this.add.text(
    centerX + 150,
    cartaoTexto.y + cartaoTexto.height / 2 + 40,
    'Pressione [ESPAÇO]',
    {
        fontSize: '22px',
        fontFamily: 'Verdana, Arial, sans-serif',
        color: '#ffd166', // 🔥 amarelo destaque
        fontStyle: 'bold'
    }
)
    .setDepth(1002)
    .setScrollFactor(0)
    .setOrigin(0.5);

        // Estado interno do popup
        let parteAtual = 0;
        let charIndex = 0;
        let digitando = false;
        let eventoDigitacao = null;
        let somEscrita = null;
        let podePressionar = false;

        // Pisca o indicador de espaço
        let tweenIndicador = null;

const mostrarIndicador = () => {
    // Garante que não exista animação ativa
    if (tweenIndicador) {
        tweenIndicador.stop();
        tweenIndicador = null;
    }

    // Deixa o texto visível e FIXO (sem piscar)
    textoIndicador.setAlpha(1);
};
       const esconderIndicador = () => {
    if (tweenIndicador) {
        tweenIndicador.stop();
        tweenIndicador = null;
    }

    textoIndicador.setAlpha(0);
};
        // Inicia a digitação de uma parte do texto
        const iniciarDigitacao = (indiceParte) => {
            if (indiceParte >= partes.length) return;

            const textoCompleto = partes[indiceParte];
            charIndex = 0;
            digitando = true;
            podePressionar = false;
            textoChat.setText('');
            esconderIndicador();

            if (somEscrita) {
                somEscrita.stop();
                somEscrita.destroy();
            }
            somEscrita = this.sound.add('somEscrita', { loop: true, volume: 1 });
            somEscrita.play();

            if (eventoDigitacao) eventoDigitacao.remove();

            eventoDigitacao = this.time.addEvent({
                delay: 15,
                repeat: textoCompleto.length - 1,
                callback: () => {
                    charIndex++;
                    textoChat.setText(textoCompleto.substring(0, charIndex));

                    // Digitação concluída
                    if (charIndex >= textoCompleto.length) {
                        somEscrita.stop();
                        digitando = false;
                        podePressionar = true;
                        mostrarIndicador();
                    }
                }
            });
        };

        // Avança para a próxima parte ou fecha o popup
        const avancarOuFechar = () => {
    // Se ainda está digitando → termina instantaneamente
    if (digitando && eventoDigitacao) {
        eventoDigitacao.remove();
        if (somEscrita) somEscrita.stop();

        textoChat.setText(partes[parteAtual]);
        digitando = false;
        podePressionar = true;

        mostrarIndicador();
        return;
    }

    // Só avança se puder
    if (!podePressionar) return;

    parteAtual++;

    if (parteAtual < partes.length) {
        iniciarDigitacao(parteAtual);
    } else {
        // 🔴 FINALIZAÇÃO CORRETA DO POPUP

        // Limpa eventos
        if (eventoDigitacao) eventoDigitacao.remove();
        if (somEscrita) {
            somEscrita.stop();
            somEscrita.destroy();
        }

        this.input.keyboard.off('keydown-SPACE', avancarOuFechar);
        this.input.keyboard.off('keydown-ENTER', avancarOuFechar);
        this.input.off('pointerdown', avancarOuFechar);

        // Destrói TODOS os elementos (proteção com ?)
        overlay?.destroy();
        painel?.destroy();
        painelSombra?.destroy();
        faixaTitulo?.destroy();
        faixaLateral?.destroy();
        etiquetaCliente?.destroy();
        tituloPopup?.destroy();
        painelRetrato?.destroy();
        retratoNpc?.destroy();
        faixaNomeNpc?.destroy();
        nomeNpc?.destroy();
        segmentoNpc?.destroy();
        cartaoMcc?.destroy();
        tituloMcc?.destroy();
        valorMcc?.destroy();
        cartaoTexto?.destroy();
        etiquetaDialogo?.destroy();
        textoChat?.destroy();
        textoIndicador?.destroy();

        this.physics.resume();

        // Garante que pode interagir de novo
        this.scene.resume();
    }
};

        // Escuta as teclas e o clique para avançar o texto do popup.
        this.input.keyboard.on('keydown-SPACE', avancarOuFechar);
        this.input.keyboard.on('keydown-ENTER', avancarOuFechar);
        this.input.on('pointerdown', avancarOuFechar);

        // Começa pela primeira parte
        if (partes.length > 0) {
            iniciarDigitacao(0);
        } else {
            // Sem texto, fecha na hora
            this.physics.resume();
            painel.destroy();
            painelSombra.destroy();
            faixaTitulo.destroy();
            faixaLateral.destroy();
            etiquetaCliente.destroy();
            tituloPopup.destroy();
            painelRetrato.destroy();
            retratoNpc.destroy();
            faixaNomeNpc.destroy();
            nomeNpc.destroy();
            segmentoNpc.destroy();
            cartaoMcc.destroy();
            tituloMcc.destroy();
            valorMcc.destroy();
            cartaoTexto.destroy();
            etiquetaDialogo.destroy();
            textoChat.destroy();
            textoIndicador.destroy();
            overlay.destroy();
            this.input.keyboard.off('keydown-SPACE', avancarOuFechar);
            this.input.keyboard.off('keydown-ENTER', avancarOuFechar);
            this.input.off('pointerdown', avancarOuFechar);
        }
        // --- FIM DO POPUP ---

        this._configurarPlayerNpcQuiz();
        this._criarPortas();


        // Atalho para abrir o menu de pausa
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('pauseScene', { cenaAnterior: this.sys.settings.key });
        });

        // Atalho para abrir o tutorial
        this.input.keyboard.on('keydown-T', () => {
            this._abrirTutorial();
        });

        this.objetosFisicos = this.physics.add.staticGroup();
        this._criarMobiliario();
        this._criarParedesInternas();

        // Aplica colisão entre o jogador e os móveis da loja
        this.physics.add.collider(this.player, this.objetosFisicos);

        // Garante que o áudio pare ao sair ou destruir a cena
        this.events.on('shutdown', () => this._pararAudio());
        this.events.on('destroy', () => this._pararAudio());
    }

    atualizarHudMaquininhas() {
        this.hudMaquininhas?.atualizar();
    }

    // Para o som ambiente caso esteja tocando
    _pararAudio() {
        if (this.somAmbiente && this.somAmbiente.isPlaying) {
            this.somAmbiente.stop();
        }
    }

    // Abre o tutorial em overlay sem destruir a cena atual
    _abrirTutorial() {
        if (this.scene.isActive('tutorialScene')) {
            return;
        }

        this.scene.pause();
        this.scene.launch('tutorialScene', {
            cenaOrigem: this.sys.settings.key,
            modoOverlay: true
        });
        this.scene.bringToTop('tutorialScene');
    }

    // Cria o fundo da loja e define os limites do mundo físico
    _criarCenario() {
        this.fundo = this.add.image(0, 0, this.fundoImage)
            .setOrigin(0.5)
            .setScale(this.backgroundScale);

        this.fundo.x = this.fundo.displayWidth / 2;
        this.fundo.y = this.fundo.displayHeight / 2;

        this.physics.world.setBounds(
            0,
            0,
            this.fundo.displayWidth,
            this.fundo.displayHeight
        );
    }

    /**
     * Cria colisores invisíveis que delimitam o interior da loja em forma de "U" invertido:
     *   - Parede de topo: faixa horizontal cobrindo toda a largura do fundo
     *   - Quina esquerda: bloco vertical no canto superior esquerdo
     *   - Quina direita: bloco vertical no canto superior direito
     *
     * Isso impede o jogador de atravessar as paredes do cenário sem precisar de tilemap.
     * Os retângulos são invisíveis — apenas a física é ativa.
     * Chama destroy() nas paredes antigas antes de recriar para evitar acúmulo ao reiniciar a cena.
     */
    _criarParedesInternas() {
        this.paredesInternas?.forEach((parede) => parede.destroy());
        this.paredesInternas = [];

        const largura = this.fundo.displayWidth;
        const altura = this.fundo.displayHeight;
        // Altura mínima de 170px ou 24% da tela — para funcionar em resoluções variadas
        const alturaParedeTopo = Math.max(170, altura * 0.24);
        const larguraQuina = Math.max(70, largura * 0.05);
        const alturaQuina = Math.max(120, altura * 0.20);

        const paredes = [
            // Topo: cobertura horizontal completa
            { x: largura / 2, y: alturaParedeTopo / 2, w: largura, h: alturaParedeTopo },
            // Quina esquerda: bloco logo abaixo do topo, no canto esquerdo
            { x: larguraQuina / 2, y: alturaParedeTopo + alturaQuina / 2, w: larguraQuina, h: alturaQuina },
            // Quina direita: espelhamento do bloco esquerdo
            { x: largura - larguraQuina / 2, y: alturaParedeTopo + alturaQuina / 2, w: larguraQuina, h: alturaQuina }
        ];

        paredes.forEach(({ x, y, w, h }) => {
            const parede = this.add.rectangle(x, y, w, h);
            parede.setVisible(false);
            this.physics.add.existing(parede, true);
            this.physics.add.collider(this.player, parede);
            this.paredesInternas.push(parede);
        });
    }

    // Instancia o jogador, o NPC e o sistema de quiz da loja
    _configurarPlayerNpcQuiz() {
        this.quiz = new Quiz(this);

        this.player = new Jogador(this, this.playerX, this.playerY);
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(150);

        // Associa cada loja ao seu banco de perguntas.
        const perguntasPorLoja = {
            Movel: perguntasMovel,
            Cafe: perguntasCafe,
            Pet: perguntasPet,
            Lanchonete: perguntasLanchonete,
            Autoescola: perguntasAutoescola,
            Pelucia: perguntasPelucia,
            Chocolate: perguntasChocolate,
            Beleza: perguntasBeleza,
            Games: perguntasGames,
            Joalheria: perguntasJoalheria,
            Roupas: perguntasRoupas,
            Frutaria: perguntasFrutaria
        };

        const perguntasOriginais = perguntasPorLoja[this.nomeLoja] || [];

        let perguntas = [];
        if (perguntasOriginais.length > 0) {
            perguntas = sortearPerguntasAleatorias(perguntasOriginais, 3);
        }

        this.npc = new Npc(
            this,
            this.npcX,
            this.npcY,
            perguntas,
            "npc-vermelho",
            `npc_${this.sceneLoja}`
        );

        // Algumas lojas precisam que o NPC fique na frente de certos elementos
        if (['Cafe','Chocolate','Autoescola','Lanchonete','Joalheria','Frutaria'].includes(this.nomeLoja)) {
            this.npc.setDepth(101);
        }

        // Aplica o visual de NPC já conquistado, se for o caso
        this.quiz.aplicarVisualConquistado(this.npc);

        // Reduz o volume do ambiente enquanto o quiz estiver aberto
        this.quiz.events?.on('quiz-aberto', () => {
            if (this.somAmbiente) this.somAmbiente.setVolume(0.1);
        });
        this.quiz.events?.on('quiz-fechado', () => {
            if (this.somAmbiente) this.somAmbiente.setVolume(0.3);
        });

        // Botão flutuante acima do NPC que indica que ele pode ser interagido
        this.botaoInteracao = this.add.image(this.npcX, this.npcY - 120, 'botaoInteracao')
            .setScale(0.4)
            .setVisible(!this.npc.vendeu)
            .setDepth(300);

        this.tempoAnimacaoBotao = 0;

        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }

    // Cria a porta de saída e configura o overlap que troca de cena ao passar por ela
    _criarPortas() {
        this.portaEntrada = new Entrada(
            this,
            this.portaX,
            this.portaY,
            this,
            'gameScene'
        );

        this.portaEntrada.setScale(2.8);

        this.portaEntrada.setTexture('entrada_animada', 0);
        this.portaEntrada.anims.stop();

        this.portaEntrada.podeUsar = false;
        this.time.delayedCall(1000, () => {
            this.portaEntrada.podeUsar = true;
        });

        const glowOffsetX = -5;  // positivo = direita, negativo = esquerda
        const glowOffsetY = -95;  // positivo = baixo, negativo = cima

        const portaTexture = this.textures.get('entrada_animada');
        const portaWidth = portaTexture.getSourceImage().width;
        const portaHeight = portaTexture.getSourceImage().height;

     this.portaGlow = this.add.rectangle(
        this.portaX + glowOffsetX,
        this.portaY + glowOffsetY,
        portaWidth - 103,
        portaHeight + 35,
        0xffffff
    );
    this.portaGlow.setDepth(141);
    this.portaGlow.setScale(1.5);
    this.portaGlow.setBlendMode(Phaser.BlendModes.ADD);
    this.portaGlow.setAlpha(0.25);

    this.tweens.add({
        targets: this.portaGlow,
        alpha: 0.01,
        duration: 1500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
    });

        this.physics.add.overlap(this.portaEntrada, this.player, () => {
            if (this.portaEntrada.trocaDeCenaEmAndamento) return;

            this._pararAudio();
            if (this.cache.audio.exists('portaAbrindo')) {
                this.sound.play('portaAbrindo');
            }

            definirProximoSpawnCidade(this.nomeLoja);
            this.portaEntrada.trocarDeCena();
        });
    }

    update() {
        this.player.update();
        this.npc.update();

        // Animação de flutuação do botão de interação acima do NPC
        this.tempoAnimacaoBotao += this.game.loop.delta / 1000;
        const deslocamento = Math.sin(this.tempoAnimacaoBotao * 3) * 8;

        const temMaquininha = Maquininhas.qntMaquininhas > 0;
        this.botaoInteracao.setVisible(!this.npc.vendeu && temMaquininha);

        this.botaoInteracao.x = this.npc.x;
        this.botaoInteracao.y = this.npc.y - 120 + deslocamento;

        const distancia = Phaser.Math.Distance.Between(
            this.player.x, this.player.y,
            this.npc.x, this.npc.y
        );

        const perto = distancia < 300;

        // Abre o quiz ao pressionar E perto do NPC
        const quizJaConquistado = this.quiz._npcJaConquistado && this.quiz._npcJaConquistado(this.npc.idNpc);
        if (perto && Phaser.Input.Keyboard.JustDown(this.teclaE) && !this.npc.vendeu && !quizJaConquistado && temMaquininha) {
            this.quiz.iniciar(this.npc);
        }

        if (this.portaEntrada) {
            this.portaEntrada.update();
        }

        // Regula o brilho da porta: some ao se aproximar, brilha ao se afastar
        if (this.portaGlow) {
            const distancia = Phaser.Math.Distance.Between(
                this.player.x, this.player.y,
                this.portaGlow.x, this.portaGlow.y
            );

            const raioMax = 400;
            const raioMin = 390;

            if (distancia < raioMax) {
                // Alpha cai de 0.25 para 0 conforme o jogador se aproxima da porta
                const alpha = Phaser.Math.Clamp(
                    (distancia - raioMin) / (raioMax - raioMin) * 0.25,
                    0, 0.25
                );
                this.portaGlow.setAlpha(alpha);
            }
        }
    }

    /**
     * Instancia os móveis da loja com base na configuração declarada em `ObjetosInterior`.
     *
     * Cada entrada em `ObjetosInterior[nomeLoja]` pode definir:
     *   - x, y, imagem, escala — posicionamento e visual do móvel
     *   - hitWidth, hitHeight, offsetX, offsetY — hitbox personalizado (opcional)
     *
     * Quando hitWidth/hitHeight são fornecidos, o hitbox é posicionado manualmente em vez
     * de usar o tamanho padrão da imagem. O offset permite alinhar o colisor à parte
     * visualmente sólida do sprite (ex: ignorar o espaço transparente acima de uma mesa).
     */
    _criarMobiliario() {
        const lista = ObjetosInterior[this.nomeLoja];
        if (!lista) return;

        lista.forEach(config => {
            let movel = this.objetosFisicos.create(config.x, config.y, config.imagem);
            movel.setDepth(100);

            if (config.escala) {
                movel.setScale(config.escala);
            }

            // Recalcula o body após alterar escala (necessário para staticGroup)
            movel.refreshBody();

            // Hitbox personalizado: substitui o tamanho automático da imagem
            if (config.hitWidth && config.hitHeight) {
                movel.body.setSize(config.hitWidth, config.hitHeight);

                let offX = config.offsetX ?? 0;
                let offY = config.offsetY ?? 0;

                // Posiciona o body manualmente a partir do centro do sprite + offset
                movel.body.x = (movel.x - config.hitWidth / 2) + offX;
                movel.body.y = (movel.y - config.hitHeight / 2) + offY;
            }
        });
    }
}

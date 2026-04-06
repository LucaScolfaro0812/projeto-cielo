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
    perguntasNpcRua,
    perguntasPelucia,
    perguntasPet,
    perguntasCafe,
    perguntasAutoescola,
    perguntasChocolate,
    perguntasLanchonete
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

        // Diálogos exibidos letra a letra ao entrar em cada loja
        this.dialogosPorLoja = {
            Autoescola: 'Olá, pode entrar, eu sou a responsável pela autoescola, e fico feliz em te receber. Como trabalho com pacotes de maior valor, preciso de boas opções de parcelamento, taxas equilibradas e soluções como links de pagamento para facilitar o dia a dia dos alunos. Você teria um tempinho para me explicar melhor como suas soluções podem me ajudar?',
            Pelucia:    'Oi! Seja bem-vindo ao Mundo das Pelúcias, fico feliz em te receber. Aqui preciso de um atendimento rápido no pagamento e boas opções de parcelamento para facilitar as compras. Você teria um tempinho para entrar e me explicar algumas coisas?',
            Chocolate:  'Oi, seja bem-vindo à ChocoMania! Sou o dono daqui e fico feliz em te receber. Como tenho picos de movimento, preciso de uma solução de pagamento rápida, que aceite diferentes formas e ofereça antecipação. Você pode me explicar melhor como suas soluções funcionam?',
            Pet:        'Oi! Seja bem-vindo ao Lar dos Amiguinhos. Aqui tenho bastante movimento, com vendas de produtos e serviços, então preciso de um sistema rápido, organizado e que separe bem cada tipo de operação, além de ajudar na fidelização dos clientes. Você teria um tempinho para me explicar melhor como suas soluções podem me ajudar?',
            Roupas:     'Oi! Seja bem-vindo à Camila Concept Store, eu sou a Camila e fico feliz em te receber. Como vendo muito online, preciso de soluções de pagamento seguras, com envio fácil de links e bom controle das vendas. Você teria um tempinho para me explicar melhor como isso pode funcionar?',
            Beleza:     'Olá, seja bem-vindo a Barbearia! Aqui preciso de soluções de pagamento práticas e modernas, com aproximação, bom parcelamento e taxas bem configuradas para garantir um atendimento ágil e eficiente. Você pode entrar um instante para me mostrar como suas soluções funcionam?',
            Cafe:       'Seja bem-vindo ao Café da Mariana! Fico muito feliz em te receber. Aqui me preocupo com cada detalhe do negócio, então busco soluções de pagamento que sejam eficientes, tenham boas taxas, aceitem vouchers e também combinem com a estética do café. Agora que você já chegou, gostaria de entrar para conversarmos mais?',
            Frutaria:   'Oi! Pode entrar, seja bem-vindo ao meu Pomar! Muito prazer. Aqui preciso de soluções simples e rápidas para o caixa, que funcionem bem mesmo com a loja cheia e aceitem vale alimentação, já que muitos clientes pedem essa opção. Você teria um tempinho para me explicar melhor como isso pode funcionar?',
            Movel:      'Olá, seja bem-vindo! Trabalho com vendas de maior valor, então preciso de taxas claras, boas opções de parcelamento e um bom controle financeiro para garantir que tudo funcione bem no dia a dia. Você teria um tempinho para entrar e me explicar algumas coisas?',
            Games:      'E aí, seja bem-vindo à Estação de Jogos! Eu sou o dono daqui, e é um prazer te receber. Aqui preciso de soluções de pagamento rápidas e modernas, tanto no físico quanto no online, com opções como Pix e bom parcelamento para vendas de maior valor. Você teria um tempinho para entrar e me explicar melhor como isso pode funcionar aqui?',
            Joalheria:  'Olá, seja bem-vindo! Eu sou o joalheiro e responsável pelo atelier, é um prazer te receber. Trabalho com peças exclusivas e transações de alto valor, então preciso de soluções seguras, com bom parcelamento, recebimento ágil e que estejam alinhadas com a estética do espaço. Você teria um tempinho para entrar e me explicar melhor como suas soluções funcionam?',
            Lanchonete: 'Seja bem-vindo à Lanchonete do Carlos! Aqui busco oferecer um atendimento rápido, prático e acessível, então preciso de soluções que me permitam atender com agilidade, inclusive direto nas mesas. Você teria um tempinho para entrar e conversarmos mais?'
};

    }

    preload() {
        // Carrega o fundo do interior da loja
        this.load.image(this.fundoImage, `assets/imagens/lojas/interior/${this.fundoImage}.png`);

        Jogador.preload(this);
        Npc.preload(this);

        // Mapeia cada loja ao arquivo de imagem exibido ao entrar
        const entradaPorLoja = {
            Cafe: 'EntradaCafeteria1',
            Games: 'EntradaLojaGames1',
            Beleza: 'EntradaBeleza1',
            Roupas: 'EntradaLojaRoupas1',
            Pet: 'EntradaPetShop1',
            Movel: 'EntradaLojaMoveis1',
            Frutaria: 'EntradaFrutaria1',
            Lanchonete: 'EntradaLanchonete1',
            Chocolate: 'EntradaLojaChocolate1',
            Pelucia: 'EntradaLojaBrinquedos1',
            Autoescola: 'EntradaAutoescola1',
            Joalheria: 'EntradaJoalheria1'
        };

        const nomeArquivo = entradaPorLoja[this.nomeLoja];
        const chave = 'entradaLoja' + this.nomeLoja;

        if (nomeArquivo) {
            this.load.image(chave, `assets/imagens/lojas/ao-abrir/${nomeArquivo}.png`);
        }

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

    if (this.cache.audio.exists('portaAbrindo')) {
        this.sound.play('portaAbrindo');
    }

    const chaveSomAmbiente = this.somAmbientePorLoja[this.nomeLoja];
    if (chaveSomAmbiente && this.cache.audio.exists(chaveSomAmbiente)) {
        this.somAmbiente = this.sound.add(chaveSomAmbiente, { loop: true, volume: 0.3 });
        this.somAmbiente.play();
    }

    const chave = 'entradaLoja' + this.nomeLoja;

    // Overlay escuro de fundo
    const overlay = this.add.graphics();
    overlay.fillStyle(0x000000, 0.6);
    overlay.fillRect(
        this.cameras.main.scrollX,
        this.cameras.main.scrollY,
        this.cameras.main.width * 3 / this.cameras.main.zoom,
        this.cameras.main.height * 3 / this.cameras.main.zoom
    );
    overlay.setDepth(999);

    this.exteriorImage = this.add.image(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        chave
    ).setDepth(1000).setScrollFactor(0);

    this.physics.pause();

    this.exteriorImage.setDisplaySize(
        this.cameras.main.width,
        this.cameras.main.height
    );

    //texto digitado letra por letra sobre o pop-up
    const textoCompleto = this.dialogosPorLoja?.[this.nomeLoja] ?? '';

    const textoChat = this.add.text(
        this.cameras.main.centerX -170,
        this.cameras.main.centerY + 60,  // ajuste Y conforme sua imagem
        '',
        {
            fontSize: '35px',
            fontFamily: 'Arial, sans-serif',
            color : '#000000',
            wordWrap: { width: this.cameras.main.width * 0.55 },
            align: 'left',
            lineSpacing: 3
        }
    )
    .setDepth(1002)
    .setScrollFactor(0)
    .setOrigin(0.5);

    let charIndex = 0;

  
const somEscrita = this.sound.add('somEscrita', { loop: true, volume: 1 });
somEscrita.play();

const eventoDigitacao = this.time.addEvent({
    delay: 15,
    repeat: textoCompleto.length - 1,
    callback: () => {
        charIndex++;
        textoChat.setText(textoCompleto.substring(0, charIndex));

        if (charIndex >= textoCompleto.length) {
            somEscrita.stop();
        }
    }
});

    // Botão X para fechar
    const btnX = this.exteriorImage.x + (this.cameras.main.width / 2) - 240;
    const btnY = this.exteriorImage.y - (this.cameras.main.height / 2) + 180;

    const fundoBotao = this.add.graphics();
    fundoBotao.fillStyle(0xff0000, 1);
    fundoBotao.fillRect(btnX - 10, btnY - 5, 45, 52);
    fundoBotao.setDepth(1001).setScrollFactor(0);

    const botaoFechar = this.add.text(
        btnX,
        btnY,
        'X',
        { fontSize: '48px', fill: '#FFF' }
    ).setDepth(1002).setInteractive().setScrollFactor(0);

    botaoFechar.on('pointerdown', () => {
        eventoDigitacao.remove();
        somEscrita.stop();
        this.physics.resume();
        this.exteriorImage.destroy();
        botaoFechar.destroy();
        fundoBotao.destroy(); 
        textoChat.destroy();
        overlay.destroy();
    });
    

        this._configurarPlayerNpcQuiz();
        this._criarPortas();

        // Ajusta o zoom da câmera para cobrir toda a tela sem barras pretas
        const zoomX = this.cameras.main.width / this.fundo.displayWidth;
        const zoomY = this.cameras.main.height / this.fundo.displayHeight;
        this.cameras.main.setZoom(Math.max(zoomX, zoomY));
        this.cameras.main.centerOn(this.fundo.displayWidth / 2, this.fundo.displayHeight / 2);

        //this.hudMaquininhas = new HudMaquininhas(this);

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

    _criarParedesInternas() {
        this.paredesInternas?.forEach((parede) => parede.destroy());
        this.paredesInternas = [];

        const largura = this.fundo.displayWidth;
        const altura = this.fundo.displayHeight;
        const alturaParedeTopo = Math.max(170, altura * 0.24);
        const larguraQuina = Math.max(70, largura * 0.05);
        const alturaQuina = Math.max(120, altura * 0.20);

        const paredes = [
            { x: largura / 2, y: alturaParedeTopo / 2, w: largura, h: alturaParedeTopo },
            { x: larguraQuina / 2, y: alturaParedeTopo + alturaQuina / 2, w: larguraQuina, h: alturaQuina },
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
        // Lojas sem banco próprio usam as perguntas genéricas de NPC de rua.
        const perguntasPorLoja = {
            Movel: perguntasMovel,
            Cafe: perguntasCafe,
            Pet: perguntasPet,
            Lanchonete: perguntasLanchonete,
            Autoescola: perguntasAutoescola,
            Pelucia: perguntasPelucia,
            Chocolate: perguntasChocolate
        };

        // Lojas sem perguntas próprias usam perguntasNpcRua como fallback
        let perguntasOriginais = perguntasPorLoja[this.nomeLoja];
        let usandoFallbackNpcRua = false;
        if (!perguntasOriginais) {
            perguntasOriginais = perguntasNpcRua;
            usandoFallbackNpcRua = true;
        }
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

        // Abre o quiz ao pressionar E perto do NPC, se tiver maquininha, o NPC não tiver vendido e não foi conquistado
        const quizJaConquistado = this.quiz._npcJaConquistado && this.quiz._npcJaConquistado(this.npc.idNpc);
        if (perto && Phaser.Input.Keyboard.JustDown(this.teclaE) && !this.npc.vendeu && !quizJaConquistado && temMaquininha) {
            this.quiz.iniciar(this.npc);
        }

        if (this.portaEntrada) {
            this.portaEntrada.update();
        }
    }

    // Instancia os móveis da loja com base na configuração de ObjetosInterior
    _criarMobiliario() {
        const lista = ObjetosInterior[this.nomeLoja];
        if (!lista) return;

        lista.forEach(config => {
            let movel = this.objetosFisicos.create(config.x, config.y, config.imagem);
            movel.setDepth(100);

            if (config.escala) {
                movel.setScale(config.escala);
            }

            movel.refreshBody();

            // Ajusta o hitbox do móvel se a config definir tamanho e offset manualmente
            if (config.hitWidth && config.hitHeight) {
                movel.body.setSize(config.hitWidth, config.hitHeight);

                let offX = config.offsetX ?? 0;
                let offY = config.offsetY ?? 0;

                movel.body.x = (movel.x - config.hitWidth / 2) + offX;
                movel.body.y = (movel.y - config.hitHeight / 2) + offY;
            }
        });
    }
}

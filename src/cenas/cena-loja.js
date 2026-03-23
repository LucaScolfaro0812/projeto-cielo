import Player from '../entidades/jogador.js';
import { definirProximoSpawnCidade } from "../utilitarios/estado-jogo.js";
import Quiz from '../sistemas/quiz.js';
import Npc from '../entidades/npc.js';
import Entrada from '../entidades/loja-entrar.js';
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

export default class LojaScene extends Phaser.Scene {

    constructor(configs) {
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

        this.somAmbientePorLoja = {
            Autoescola: 'ambienteAutoEscola',
            Pelucia: 'ambienteBrinquedo',
            Chocolate: 'ambienteChocolateria',
            Pet: 'ambientePetShop',
            Roupas: 'ambienteRoupas',
            Beleza: 'ambienteSalaoDeBeleza',
        };
    }

    preload() {
        this.load.image(this.fundoImage, `assets/imagens/lojas/interior/${this.fundoImage}.png`);

        Player.preload(this);
        Npc.preload(this);

        const entradaPorLoja = {
            Cafe: 'EntradaCafeteria',
            Games: 'EntradaLojaGames',
            Beleza: 'EntradaBeleza',
            Roupas: 'EntradaLojaRoupas',
            Pet: 'EntradaPetShop',
            Movel: 'EntradaLojaMoveis',
            Frutaria: 'EntradaFrutaria',
            Lanchonete: 'EntradaLanchonete',
            Chocolate: 'EntradaLojaChocolate',
            Pelucia: 'EntradaLojaBrinquedos',
            Autoescola: 'EntradaAutoescola',
            Joalheria: 'EntradaJoalheria'
        };

        const nomeArquivo = entradaPorLoja[this.nomeLoja];
        const chave = 'entradaLoja' + this.nomeLoja;

        if (nomeArquivo) {
            this.load.image(chave, `assets/imagens/lojas/ao-abrir/${nomeArquivo}.png`);
        }

        this.load.image('botaoInteracao', 'assets/imagens/botao.interacao.png');

        // Carrega som ambiente da loja (se houver)
        const chaveSomAmbiente = this.somAmbientePorLoja[this.nomeLoja];
        if (chaveSomAmbiente) {
            if (!this.cache.audio.exists(chaveSomAmbiente)) {
                this.load.audio(chaveSomAmbiente, `assets/sons/${chaveSomAmbiente}.mp3`);
            }
        }

        // Carrega som da porta
        if (!this.cache.audio.exists('portaAbrindoFechando')) {
            this.load.audio('portaAbrindoFechando', 'assets/sons/portaAbrindoFechando.mp3');
        }
    }

    create() {
        this._criarCenario();

        // Som da porta ao entrar
        if (this.cache.audio.exists('portaAbrindoFechando')) {
            this.sound.play('portaAbrindoFechando');
        }

        // Inicia áudio ambiente em loop com volume reduzido
        const chaveSomAmbiente = this.somAmbientePorLoja[this.nomeLoja];
        if (chaveSomAmbiente && this.cache.audio.exists(chaveSomAmbiente)) {
            this.somAmbiente = this.sound.add(chaveSomAmbiente, { loop: true, volume: 0.3 });
            this.somAmbiente.play();
        }

        const chave = 'entradaLoja' + this.nomeLoja;

        this.exteriorImage = this.add.image(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 450,
            chave
        ).setDepth(1000);

        this.exteriorImage.setDisplaySize(
            this.cameras.main.width,
            this.cameras.main.height
        );

        const botaoFechar = this.add.text(
            this.exteriorImage.x + (this.cameras.main.width / 2) - 350,
            this.exteriorImage.y - (this.cameras.main.height / 2) + 100,
            'X',
            { fontSize: '48px', fill: '#FFF' }
        ).setDepth(1001).setInteractive();

        botaoFechar.on('pointerdown', () => {
            this.exteriorImage.destroy();
            botaoFechar.destroy();
        });

        this._configurarPlayerNpcQuiz();
        this._criarPortas();

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(0.60);

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('pauseScene', { cenaAnterior: this.sys.settings.key });
        });

        this.objetosFisicos = this.physics.add.staticGroup();
        this._criarMobiliario();

        this.physics.add.collider(this.player, this.objetosFisicos);

        this.events.on('shutdown', () => this._pararAudio());
        this.events.on('destroy', () => this._pararAudio());
    }

    _pararAudio() {
        if (this.somAmbiente && this.somAmbiente.isPlaying) {
            this.somAmbiente.stop();
        }
    }

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

    _configurarPlayerNpcQuiz() {
        this.quiz = new Quiz(this);

        this.player = new Player(this, this.playerX, this.playerY);
        this.player.setCollideWorldBounds(true);

        const perguntasPorLoja = {
            Movel: perguntasMovel,
            Cafe: perguntasCafe,
            Pet: perguntasPet,
            Lanchonete: perguntasLanchonete,
            Autoescola: perguntasAutoescola,
            Pelucia: perguntasPelucia,
            Chocolate: perguntasChocolate
        };

        const perguntas = perguntasPorLoja[this.nomeLoja] ?? perguntasNpcRua;

        this.npc = new Npc(
            this,
            this.npcX,
            this.npcY,
            perguntas,
            "npc-vermelho",
            `npc_${this.sceneLoja}`
        );

        if (['Cafe','Chocolate','Autoescola','Lanchonete','Joalheria','Frutaria'].includes(this.nomeLoja)) {
            this.npc.setDepth(101);
        }

        this.quiz.aplicarVisualConquistado(this.npc);

        // Diminui volume ao abrir quiz, restaura ao fechar
        this.quiz.events?.on('quiz-aberto', () => {
            if (this.somAmbiente) this.somAmbiente.setVolume(0.1);
        });
        this.quiz.events?.on('quiz-fechado', () => {
            if (this.somAmbiente) this.somAmbiente.setVolume(0.3);
        });

        this.botaoInteracao = this.add.image(this.npcX, this.npcY - 120, 'botaoInteracao')
            .setScale(0.4)
            .setVisible(!this.npc.vendeu)
            .setDepth(300);

        this.tempoAnimacaoBotao = 0;

        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }

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
            if (this.cache.audio.exists('portaAbrindoFechando')) {
                this.sound.play('portaAbrindoFechando');
            }
            this._pararAudio();

            definirProximoSpawnCidade(this.nomeLoja);
            this.portaEntrada.trocarDeCena();
        });
    }

    update() {
        this.player.update();
        this.npc.update();

        this.tempoAnimacaoBotao += this.game.loop.delta / 1000;
        const deslocamento = Math.sin(this.tempoAnimacaoBotao * 3) * 8;

        this.botaoInteracao.setVisible(!this.npc.vendeu);

        this.botaoInteracao.x = this.npc.x;
        this.botaoInteracao.y = this.npc.y - 120 + deslocamento;

        const distancia = Phaser.Math.Distance.Between(
            this.player.x, this.player.y,
            this.npc.x, this.npc.y
        );

        const perto = distancia < 300;

        if (perto && Phaser.Input.Keyboard.JustDown(this.teclaE) && !this.npc.vendeu) {
            this.quiz.iniciar(this.npc);
        }

        if (this.portaEntrada) {
            this.portaEntrada.update();
        }
    }

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
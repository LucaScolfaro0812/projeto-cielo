import Jogador from '../entidades/jogador.js';
import Entrada from '../entidades/loja-entrar.js';
import { definirProximoSpawnCidade, consumirTutorialInicial } from "../utilitarios/estado-jogo.js";
import { Maquininhas } from '../sistemas/maquininhas.js';
import HudMaquininhas from '../sistemas/hud-maquininhas.js';

export class CenaCentral extends Phaser.Scene {
    constructor(){
        super({key: 'centralScene'});
        this.fundoImage = "cieloVazia";
        this.dialogoIntroducaoExibido = false;
        this.dialogoAberto = false;
        this.aguardandoDialogoAposTutorial = false;
        this.falasIntroducao = [
            'Seja bem-vindo As aventuras de Marcielo. Eu sou Thiago e vou te acompanhar nesse começo.',
            'Você será representado pelo Marcielo, um gerente de negócios da Cielo, nessa jornada.',
            'Seu desafio é visitar as lojas da cidade, conversar com os comerciantes e entender o que cada negócio precisa para vender melhor.',
            'Preste atenção nas conversas e nas perguntas, porque é assim que você descobre qual solução faz mais sentido para cada cliente.',
            'A Central da Cielo é o seu ponto de apoio, e as maquininhas são parte essencial da sua missão.',
            'É sempre importante andar com a maquininha para garantir a instalação imediata e a ativação do cliente',
            'Então aproveite a jornada, explore a cidade e, sempre que precisar, volte para a Central para recarregar suas maquininhas e seguir em frente.'
        ];
        this.estadoDialogo = null;
    }
    
    preload() {
        this.load.image(this.fundoImage, `assets/imagens/central-cielo/${this.fundoImage}.png`);
        
        Jogador.preload(this);
        Entrada.preload(this);

        this.load.image('botaoInteracao', 'assets/imagens/botao.interacao.png');

        this.load.image('cieloBalcão', 'assets/imagens/central-cielo/cieloBalcao.png');
        this.load.image('cieloComputador', 'assets/imagens/central-cielo/cieloComputador.png');
        this.load.image('cieloFiltro', 'assets/imagens/central-cielo/cieloFiltro.png');
        this.load.image('cieloPlanta', 'assets/imagens/central-cielo/cieloPlanta.png');
        this.load.image('cieloPlaca', 'assets/imagens/central-cielo/cieloPlaca.png');
        this.load.image('cieloNPC', 'assets/imagens/central-cielo/cieloNPC.png');
        this.load.image('marcieloDialogo', 'assets/ui/marcielo-dialogo.png');

        this.load.image('maquininhaCielo', 'assets/imagens/maquininha-cielo.png');

        // Carrega som da porta
        if (!this.cache.audio.exists('portaAbrindo')) {
            this.load.audio('portaAbrindo', 'assets/sons/portaAbrindo.mp3');
        }

        // Carrega música ambiente da Central Cielo
        if (!this.cache.audio.exists('ambienteCielo')) {
            this.load.audio('ambienteCielo', 'assets/sons/ambienteCielo.mp3');
        }

        if (!this.cache.audio.exists('somEscrita')) {
            this.load.audio('somEscrita', 'assets/sons/somEscrita.mp3');
        }
    }

    init(data = {}) {
        this.dialogoIntroducaoExibido = false;
        this.dialogoAberto = false;
        this.estadoDialogo = null;
        this.mostrarTutorial = consumirTutorialInicial();
        this.mostrarDialogoInicial = Boolean(data.mostrarDialogoInicial);
        this.aguardandoDialogoAposTutorial = this.mostrarTutorial && this.mostrarDialogoInicial;
    }

    create() {
        this._criarCenario();

        if (this.cache.audio.exists('portaAbrindo')) {
            this.sound.play('portaAbrindo');
        }

        // Inicia música ambiente em loop
        if (this.cache.audio.exists('ambienteCielo')) {
            this.somAmbiente = this.sound.add('ambienteCielo', { loop: true, volume: 0.3 });
            this.somAmbiente.play();
        }

        // Para o som ao sair ou destruir a cena
        this.events.on('shutdown', () => this._pararAudio());
        this.events.on('destroy', () => this._pararAudio());

        if (this.mostrarTutorial) {
            this.scene.pause();
            this.scene.launch('tutorialScene', { cenaOrigem: this.scene.key, modoOverlay: true });
            this.scene.bringToTop('tutorialScene');
        }

        this.balcao = this.physics.add.staticImage(1150, 470, 'cieloBalcão');
        this.filtro = this.physics.add.staticImage(2000, 400, 'cieloFiltro');
        this.planta = this.physics.add.staticImage(100, 450, 'cieloPlanta');
        this.computador = this.physics.add.staticImage(2130, 750, 'cieloComputador');
        this.placa = this.physics.add.staticImage(1140, 120, 'cieloPlaca');
        this.npc = this.physics.add.staticImage(1160, 380, 'cieloNPC');
        this.npc.setScale(0.3);

        const playerX = 1150;
        const playerY = 800;
        const portaX = 400;
        const portaY = 415;

        // Cria o Jogador
        this.player = new Jogador(this, playerX, playerY);
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(150);
        this.player.setScale(0.8);
        this.player.velocidade = 650;

        // Conecta o jogador com cada um dos móveis estáticos para que ele colida com eles
        this.physics.add.collider(this.player, this.balcao);
        this.physics.add.collider(this.player, this.filtro);
        this.physics.add.collider(this.player, this.planta);
        this.physics.add.collider(this.player, this.computador);

        // Paredes invisíveis que delimitam as bordas internas da Central da Cielo.
        // Cada entrada é [x1, y1, x2, y2] representando dois pontos opostos do retângulo.
        // O código converte para centro (cx, cy) e dimensões (w, h) que o Phaser exige.
        const paredesData = [
            [9, 387, 311, 7],
            [339, 241, 459, 7],
            [462, 394, 2297, 2],
            [329, 270, 460, 4]
        ];
        this.paredes = paredesData.map(([x1, y1, x2, y2]) => {
            // Converte os dois pontos para centro + dimensões (formato do Phaser)
            const cx = (x1 + x2) / 2;
            const cy = (y1 + y2) / 2;
            const w = Math.abs(x2 - x1);
            const h = Math.abs(y2 - y1);
            const parede = this.add.rectangle(cx, cy, w, h);
            // true = corpo estático (não se move, mas bloqueia colisões)
            this.physics.add.existing(parede, true);
            this.physics.add.collider(this.player, parede);
            return parede;
        });

        // Cria a Porta de Saída para a Cidade
        this._criarPortaSaida(portaX, portaY);

        this.botaoRecarga = this.add.image(this.npc.x, this.npc.y - 120, 'botaoInteracao')
            .setScale(0.4)
            .setDepth(300);
        this.tempoAnimacaoBotao = 0;
        this.botaoRecarga.setVisible(false);

        // Tecla E para recarregar
        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.teclaEspaco = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('pauseScene', { cenaAnterior: this.sys.settings.key });
        });

        this.input.keyboard.on('keydown-T', () => {
            this._abrirTutorial();
        });

        const zoomX = this.cameras.main.width / this.fundo.displayWidth;
        const zoomY = this.cameras.main.height / this.fundo.displayHeight;
        this.cameras.main.setZoom(Math.max(zoomX, zoomY));
        this.cameras.main.centerOn(this.fundo.displayWidth / 2, this.fundo.displayHeight / 2);

        this.hudMaquininhas = new HudMaquininhas(this);

        if (this.mostrarDialogoInicial && !this.mostrarTutorial) {
            this.time.delayedCall(120, () => {
                if (!this.dialogoIntroducaoExibido && !this.dialogoAberto) {
                    this._abrirDialogoIntroducao();
                }
            });
        }
    }

    _pararAudio() {
        if (this.somAmbiente && this.somAmbiente.isPlaying) {
            this.somAmbiente.stop();
        }
    }

    _abrirTutorial() {
        if (this.scene.isActive('tutorialScene')) {
            return;
        }

        this.scene.pause();
        this.scene.launch('tutorialScene', {
            cenaOrigem: this.scene.key,
            modoOverlay: true
        });
        this.scene.bringToTop('tutorialScene');
    }

    aoFecharTutorialOverlay() {
        if (!this.aguardandoDialogoAposTutorial || this.dialogoIntroducaoExibido || this.dialogoAberto) {
            return;
        }

        this.aguardandoDialogoAposTutorial = false;
        this.time.delayedCall(120, () => {
            if (!this.scene.isActive() || this.dialogoIntroducaoExibido || this.dialogoAberto) {
                return;
            }

            this._abrirDialogoIntroducao();
        });
    }

    _criarCenario() {
        this.fundo = this.add.image(0, 0, this.fundoImage).setOrigin(0.5);
        this.fundo.setScale(1.5);
        this.fundo.x = this.fundo.displayWidth / 2;
        this.fundo.y = this.fundo.displayHeight / 2;

        const larguraMundo = this.fundo.displayWidth;
        const alturaMundo = this.fundo.displayHeight;

        this.physics.world.setBounds(0, 0, larguraMundo, alturaMundo);
    }

    _criarPortaSaida(x, y) {
        this.portaEntrada = new Entrada(this, x, y, this, 'gameScene', this.player);
        this.portaEntrada.setScale(2.8);
        this.portaEntrada.setDepth(140);

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
        x + glowOffsetX,
        y + glowOffsetY,
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

            if (!this.portaEntrada.podeUsar) return;
            if (this.portaEntrada.trocaDeCenaEmAndamento) return;
            this.portaEntrada.trocaDeCenaEmAndamento = true;

            definirProximoSpawnCidade('Central');

            // Para a música ambiente antes de sair
            this._pararAudio();

            if (this.cache.audio.exists('portaAbrindo')) {
                this.sound.play('portaAbrindo');
            }
            
            this.time.delayedCall(500, () => {
                this.portaEntrada.trocarDeCena();
            });
        });
    }

    _abrirDialogoIntroducao() {
        if (this.dialogoAberto) {
            return;
        }

        this.dialogoAberto = true;
        this.physics.pause();

        const { width, height, centerX, centerY } = this.cameras.main;

        const overlay = this.add.rectangle(centerX, centerY, width, height, 0x022b45, 0.82)
            .setScrollFactor(0)
            .setDepth(1000);

        const painel = this.add.rectangle(centerX, centerY, width * 0.84, height * 0.68, 0x005b96, 0.97)
            .setScrollFactor(0)
            .setDepth(1001)
            .setStrokeStyle(5, 0x7fd6ff, 1);

        const titulo = this.add.text(centerX, centerY - height * 0.25, 'Central da Cielo', {
            fontSize: '36px',
            fontFamily: 'Verdana, Arial, sans-serif',
            color: '#ffffff',
            fontStyle: 'bold'
        })
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(1002);

        const molduraRetrato = this.add.rectangle(centerX - width * 0.27, centerY + height * 0.02, 180, 180, 0x08395b, 1)
            .setScrollFactor(0)
            .setDepth(1002)
            .setStrokeStyle(4, 0xb8ecff, 1);

        const retrato = this.add.image(molduraRetrato.x, molduraRetrato.y, 'marcieloDialogo')
            .setScrollFactor(0)
            .setDepth(1003)
            .setDisplaySize(156, 156);

        const texto = this.add.text(centerX - width * 0.14, molduraRetrato.y - 90, '', {
            fontSize: '31px',
            fontFamily: 'Verdana, Arial, sans-serif',
            color: '#f0f7ff',
            wordWrap: { width: width * 0.48 },
            lineSpacing: 14
        })
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setDepth(1002);

        const dica = this.add.text(centerX, centerY + height * 0.24, 'Pressione ESPACO para continuar.', {
            fontSize: '22px',
            fontFamily: 'Verdana, Arial, sans-serif',
            color: '#d6f2ff'
        })
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(1002);

        let indiceChar = 0;
        let indiceFala = 0;
        let somEscrita = null;

        if (this.cache.audio.exists('somEscrita')) {
            somEscrita = this.sound.add('somEscrita', { loop: true, volume: 0.8 });
        }

        const iniciarDigitacao = () => {
            const falaAtual = this.falasIntroducao[indiceFala];
            indiceChar = 0;
            texto.setText('');

            this.estadoDialogo?.eventoDigitacao?.remove();

            if (somEscrita && !somEscrita.isPlaying) {
                somEscrita.play();
            }

            const eventoDigitacao = this.time.addEvent({
                delay: 18,
                repeat: falaAtual.length - 1,
                callback: () => {
                    indiceChar += 1;
                    texto.setText(falaAtual.substring(0, indiceChar));

                    if (indiceChar >= falaAtual.length && somEscrita?.isPlaying) {
                        somEscrita.stop();
                    }
                }
            });

            this.estadoDialogo = {
                overlay,
                painel,
                titulo,
                molduraRetrato,
                retrato,
                texto,
                dica,
                eventoDigitacao,
                somEscrita,
                indiceFala,
                digitando: true
            };
        };

        const fecharDialogo = () => {
            this.estadoDialogo?.eventoDigitacao?.remove();
            somEscrita?.stop();

            overlay.destroy();
            painel.destroy();
            titulo.destroy();
            molduraRetrato.destroy();
            retrato.destroy();
            texto.destroy();
            dica.destroy();

            this.dialogoAberto = false;
            this.dialogoIntroducaoExibido = true;
            this.estadoDialogo = null;
            this.physics.resume();
        };

        const fecharHandler = () => {
            this.input.keyboard.off('keydown-SPACE', avancarDialogo);
            fecharDialogo();
        };

        const avancarDialogo = () => {
            const falaAtual = this.falasIntroducao[indiceFala];
            const terminouDigitacao = indiceChar >= falaAtual.length;

            if (!terminouDigitacao) {
                this.estadoDialogo?.eventoDigitacao?.remove();
                texto.setText(falaAtual);
                indiceChar = falaAtual.length;
                somEscrita?.stop();
                if (this.estadoDialogo) {
                    this.estadoDialogo.digitando = false;
                }
                return;
            }

            indiceFala += 1;

            if (indiceFala >= this.falasIntroducao.length) {
                fecharHandler();
                return;
            }

            iniciarDigitacao();
        };

        this.input.keyboard.on('keydown-SPACE', avancarDialogo);
        this.events.once('shutdown', () => {
            this.input.keyboard.off('keydown-SPACE', avancarDialogo);
        });
        this.events.once('destroy', () => {
            this.input.keyboard.off('keydown-SPACE', avancarDialogo);
        });

        this.estadoDialogo = { overlay, painel, titulo, molduraRetrato, retrato, texto, dica, somEscrita, indiceFala, digitando: true, eventoDigitacao: null };
        iniciarDigitacao();
    }

    update() {
        if (this.dialogoAberto) {
            return;
        }

        this.player.update();
        if (this.portaEntrada) {
            this.portaEntrada.update();
        }

        if (this.portaEntrada) {
    this.portaEntrada.update();

    if (this.portaGlow) {
        const distancia = Phaser.Math.Distance.Between(
            this.player.x, this.player.y,
            this.portaGlow.x, this.portaGlow.y
        );

        const raioMax = 400;
        const raioMin = 390;

        if (distancia < raioMax) {
            const alpha = Phaser.Math.Clamp(
                (distancia - raioMin) / (raioMax - raioMin) * 0.25,
                0, 0.25
            );
            this.portaGlow.setAlpha(alpha);
        }
    }
}

        this.tempoAnimacaoBotao += this.game.loop.delta / 1000;
        const deslocamento = Math.sin(this.tempoAnimacaoBotao * 3) * 8;

        const podeRecarregar = Maquininhas.qntMaquininhas < Maquininhas.maximoMaquininhas;
        this.botaoRecarga.y = this.npc.y - 120 + deslocamento;

        const distancia = Phaser.Math.Distance.Between(
            this.player.x, this.player.y,
            this.npc.x, this.npc.y
        );

        const pertoDoNpc = distancia < 300;
        this.botaoRecarga.setVisible(pertoDoNpc && this.dialogoIntroducaoExibido && podeRecarregar);

        if (pertoDoNpc && Phaser.Input.Keyboard.JustDown(this.teclaE) && podeRecarregar) {
            Maquininhas.definirMaquininhas(3);
            this.hudMaquininhas.atualizar();
        }
    }
}

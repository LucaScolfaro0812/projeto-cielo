import Jogador from '../entidades/jogador.js';
import Entrada from '../entidades/loja-entrar.js';
import { definirProximoSpawnCidade } from "../utilitarios/estado-jogo.js";
import { Maquininhas } from '../sistemas/maquininhas.js';
import HudMaquininhas from '../sistemas/hud-maquininhas.js';

export class CenaCentral extends Phaser.Scene {
    constructor(){
        super({key: 'centralScene'});
        this.fundoImage = "cieloVazia";
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

        this.load.image('maquininhaCielo', 'assets/imagens/maquininha-cielo.png');

        // Carrega som da porta
        if (!this.cache.audio.exists('portaAbrindo')) {
            this.load.audio('portaAbrindo', 'assets/sons/portaAbrindo.mp3');
        }

        // Carrega música ambiente da Central Cielo
        if (!this.cache.audio.exists('ambienteCielo')) {
            this.load.audio('ambienteCielo', 'assets/sons/ambienteCielo.mp3');
        }
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

        this.balcao = this.physics.add.staticImage(1150, 470, 'cieloBalcão');
        this.filtro = this.physics.add.staticImage(2000, 400, 'cieloFiltro');
        this.planta = this.physics.add.staticImage(100, 450, 'cieloPlanta');
        this.computador = this.physics.add.staticImage(2130, 750, 'cieloComputador');
        this.placa = this.physics.add.staticImage(1140, 120, 'cieloPlaca');
        this.npc = this.physics.add.staticImage(1160, 380, 'cieloNPC');
        this.npc.setScale(0.3);

        const playerX = 400;
        const playerY = 500;
        const portaX = 400;
        const portaY = 415;

        // Cria o Jogador
        this.player = new Jogador(this, playerX, playerY);
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(150);

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
            [329, 270, 4]
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

        // Tecla E para recarregar
        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('pauseScene', { cenaAnterior: this.sys.settings.key });
        });

        const zoomX = this.cameras.main.width / this.fundo.displayWidth;
        const zoomY = this.cameras.main.height / this.fundo.displayHeight;
        this.cameras.main.setZoom(Math.max(zoomX, zoomY));
        this.cameras.main.centerOn(this.fundo.displayWidth / 2, this.fundo.displayHeight / 2);

        this.hudMaquininhas = new HudMaquininhas(this);

        // DEBUG: clique para logar coordenadas no console
        this.input.on('pointerdown', (pointer) => {
            const worldX = Math.round(pointer.worldX);
            const worldY = Math.round(pointer.worldY);
            console.log(`x: ${worldX}, y: ${worldY}`);
        });
    }

    _pararAudio() {
        if (this.somAmbiente && this.somAmbiente.isPlaying) {
            this.somAmbiente.stop();
        }
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

    update() {
        this.player.update();
        if (this.portaEntrada) {
            this.portaEntrada.update();
        }

        this.tempoAnimacaoBotao += this.game.loop.delta / 1000;
        const deslocamento = Math.sin(this.tempoAnimacaoBotao * 3) * 8;

        const podeRecarregar = Maquininhas.qntMaquininhas < Maquininhas.maximoMaquininhas;
        this.botaoRecarga.setVisible(podeRecarregar);
        this.botaoRecarga.y = this.npc.y - 120 + deslocamento;

        const distancia = Phaser.Math.Distance.Between(
            this.player.x, this.player.y,
            this.npc.x, this.npc.y
        );

        if (distancia < 300 && Phaser.Input.Keyboard.JustDown(this.teclaE) && podeRecarregar) {
            Maquininhas.definirMaquininhas(Maquininhas.maximoMaquininhas);
            this.hudMaquininhas.atualizar();
        }
    }
}
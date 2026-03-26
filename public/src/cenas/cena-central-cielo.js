import Jogador from '../entidades/jogador.js';
import Entrada from '../entidades/loja-entrar.js';
import { definirProximoSpawnCidade, consumirSpawnCidade } from "../utilitarios/estado-jogo.js";

export class CenaCentral extends Phaser.Scene {
    constructor(){
        super({key: 'centralScene'});
        this.fundoImage = "cieloVazia";
    }
    
    preload() {
        this.load.image(this.fundoImage, `assets/imagens/central-cielo/${this.fundoImage}.png`);
        
        Jogador.preload(this);

        this.load.image('botaoInteracao', 'assets/imagens/botao.interacao.png');

        this.load.image('cieloBalcão', 'assets/imagens/central-cielo/cieloBalcao.png');
        this.load.image('cieloComputador', 'assets/imagens/central-cielo/cieloComputador.png');
        this.load.image('cieloFiltro', 'assets/imagens/central-cielo/cieloFiltro.png');
        this.load.image('cieloPlanta', 'assets/imagens/central-cielo/cieloPlanta.png');

        // Carrega som da porta
        if (!this.cache.audio.exists('portaAbrindo')) {
            this.load.audio('portaAbrindo', 'assets/sons/portaAbrindo.mp3');
        }
    }

    create() {
        // Fade de entrada partindo do azul Cielo — completa a transição vinda da cidade
        revelarCena(this);

        this._criarCenario();

        if (this.cache.audio.exists('portaAbrindo')) {
            this.sound.play('portaAbrindo');
            }

        this.balcao = this.physics.add.staticImage(400, 300, 'cieloBalcão');
        this.filtro = this.physics.add.staticImage(200, 250, 'cieloFiltro');
        this.planta = this.physics.add.staticImage(600, 250, 'cieloPlanta');
        this.computador = this.physics.add.staticImage(500, 400, 'cieloComputador');

    

        const playerX = this.fundo.displayWidth / 2;
        const playerY = this.fundo.displayHeight - 150;
        const portaX = this.fundo.displayWidth / 5;
        const portaY = this.fundo.displayHeight - 950;

        // Cria o Jogador
        this.player = new Jogador(this, playerX, playerY);
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(150);

        // Cria a Porta de Saída para a Cidade
        this._criarPortaSaida(portaX, portaY);


        // Configura Câmera e Pause
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(0.60);

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('pauseScene', { cenaAnterior: this.sys.settings.key });
        });

         const zoomX = this.cameras.main.width / this.fundo.displayWidth;
        const zoomY = this.cameras.main.height / this.fundo.displayHeight;
        this.cameras.main.setZoom(Math.max(zoomX, zoomY));
        this.cameras.main.centerOn(this.fundo.displayWidth / 2, this.fundo.displayHeight / 2);

    }

    _criarCenario() {
        this.fundo = this.add.image(0, 0, this.fundoImage).setOrigin(0.5);
        this.fundo.setScale(1.5);
        this.fundo.x = this.fundo.displayWidth / 2;
        this.fundo.y = this.fundo.displayHeight / 2;

        this.physics.world.setBounds(0, 0, this.fundo.displayWidth, this.fundo.displayHeight);
    }

    _criarPortaSaida(x, y) {
        // Usa a mesma lógica de Entrada, mas para voltar para a gameScene.
        // O this.player foi adicionado no final para a porta não dar erro!
        this.portaEntrada = new Entrada(this, x, y, this, 'gameScene', this.player);
        this.portaEntrada.setScale(2.8);
        
        // Garante que a porta fique desenhada atrás do Marcielo (150), mas na frente do fundo
        this.portaEntrada.setDepth(140); 

        this.portaEntrada.setTexture('entrada_animada', 0);
        this.portaEntrada.anims.stop();

        this.portaEntrada.podeUsar = false;this.time.delayedCall(1000, () => {
            this.portaEntrada.podeUsar = true;
            });



       this.physics.add.overlap(this.portaEntrada, this.player, () => {
            console.log("Passo 1: Bateu na porta!");

            if (!this.portaEntrada.podeUsar) {
                console.log("Passo 2: Ainda não deu 1 segundo. Ignorando...");
                return;
            }

            if (this.portaEntrada.trocaDeCenaEmAndamento) return;
            this.portaEntrada.trocaDeCenaEmAndamento = true;

            definirProximoSpawnCidade('Central');

            console.log("Passo 3: Passou pelas travas! Vai preparar pra sair.");

            if (this.cache.audio.exists('portaAbrindo')) {
                this.sound.play('portaAbrindo');
            }
            
            // 👇 SUSPEITO NÚMERO 1: Vamos comentar (desligar) a animação para testar!
            // this.portaEntrada.play('abrir_porta_roll');
            
            this.time.delayedCall(500, () => {
                console.log("Passo 4: Chamando a função de trocar de cena!");
                this.portaEntrada.trocarDeCena();
            });
        });
    }

    update() {
        this.player.update();
        if (this.portaEntrada) {
            this.portaEntrada.update();
        }
    }
}
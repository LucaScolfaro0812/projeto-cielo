import Jogador from '../entidades/jogador.js';
import Entrada from '../entidades/loja-entrar.js';
import { revelarCena } from '../utilitarios/transicao-cena.js';

export class CenaCentral extends Phaser.Scene {
    constructor(){
        super({key: 'centralScene'});
        this.fundoImage = "cieloVazia";
    }
    
    preload() {
        this.load.image(this.fundoImage, `assets/imagens/central-cielo/${this.fundoImage}.png`);
        
        Jogador.preload(this);

        this.load.image('botaoInteracao', 'assets/imagens/botao.interacao.png');

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

        // COORDENADAS FIXAS DA CENTRAL (Ajuste os números conforme o tamanho do seu cenário)
        const playerX = this.fundo.displayWidth / 2;
        const playerY = this.fundo.displayHeight - 150;
        const portaX = this.fundo.displayWidth / 2;
        const portaY = this.fundo.displayHeight - 50;

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
    }

    _criarCenario() {
        this.fundo = this.add.image(0, 0, this.fundoImage).setOrigin(0.5);
        this.fundo.x = this.fundo.displayWidth / 2;
        this.fundo.y = this.fundo.displayHeight / 2;

        this.physics.world.setBounds(0, 0, this.fundo.displayWidth, this.fundo.displayHeight);
    }

    _criarPortaSaida(x, y) {
        // Usa a mesma lógica de Entrada, mas para voltar para a gameScene
        this.portaEntrada = new Entrada(this, x, y, this, 'gameScene');
        this.portaEntrada.setScale(2.8);

        this.physics.add.overlap(this.portaEntrada, this.player, () => {
            if (this.portaEntrada.trocaDeCenaEmAndamento) return;

            if (this.cache.audio.exists('portaAbrindo')) {
                this.sound.play('portaAbrindo');
            }
            // Define que o Marcielo deve aparecer na porta da Central quando voltar pra rua
            // (Você vai precisar criar esse spawn 'Central' na sua gameScene depois)
            // definirProximoSpawnCidade('Central');

            this.portaEntrada.trocarDeCena();
        });
    }

    update() {
        this.player.update();
        if (this.portaEntrada) {
            this.portaEntrada.update();
        }
    }
}
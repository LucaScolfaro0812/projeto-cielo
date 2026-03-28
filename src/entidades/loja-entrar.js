import { carregarDados } from "../utilitarios/armazenamento.js";
import { transicionarPara } from "../utilitarios/transicao-cena.js";
// Classe responsável por representar uma porta/entrada
// que permite a transição entre cenas
export default class Entrada extends Phaser.Physics.Arcade.Sprite {

    /**
     * @param {Phaser.Scene} cena - Cena onde o objeto será criado
     * @param {number} x - Posição horizontal da entrada
     * @param {number} y - Posição vertical da entrada
     * @param {Phaser.Scene} cenaAtual - Referência da cena atual
     * @param {string} proximaCenaNome - Nome da cena para onde será feita a transição
     * @param {Phaser.Physics.Arcade.Sprite} player - Referência do jogador (Marcielo)
     */
    constructor(cena, x, y, cenaAtual, proximaCenaNome, player) { 

        // Chama o construtor da classe Sprite com física Arcade
        super(cena, x, y, 'entrada_animada', 0);

        // Armazena referências
        this.cenaAtual = cenaAtual;
        this.proximaCenaNome = proximaCenaNome;
        this.player = player; 

        // Inicializa um estado interno da porta
        this.trocaDeCenaEmAndamento = false;

        // Adiciona o sprite na cena e ativa a física
        cena.add.existing(this);
        cena.physics.add.existing(this);
        this.body.setImmovable(true);

        // Ajusta escala e pivot
        this.setScale(2.8);
        this.setOrigin(0.5, 1);

        // Cria a animação se ela ainda não existir
        if (!cena.anims.exists('abrir_porta_roll')) {
            cena.anims.create({
                key: 'abrir_porta_roll',
                // Gera os frames 0, 1, 2 da imagem 'entrada_animada'
                frames: cena.anims.generateFrameNumbers('entrada_animada', { start: 0, end: 2 }),
                frameRate: 12, // Velocidade da animação (ajuste se achar muito rápido/lento)
                repeat: 0 // Toca apenas uma vez
            });
        }
    }

    // Atualizamos o preload para carregar como spritesheet
    static preload(scene) {
        // !!! SUBSTITUA 100 E 150 PELOS TAMANHOS REAIS DO SEU QUADRO !!!
        scene.load.spritesheet('entrada_animada', 'assets/imagens/entrada.animada.png', {
            frameWidth: 49, // Largura de UM quadro (MUDE AQUI)
            frameHeight: 70 // Altura do quadro (MUDE AQUI)
        });
    }

    /**
     * Atualiza o estado da animação da porta a cada frame.
     * Máquina de dois estados: aberta (animação tocando) e fechada (frame 0).
     * A trava `portaAberta` evita chamar `play` repetidamente a cada frame enquanto
     * o jogador permanece na área de ativação.
     */
    update() {
        const jogador = this.scene.player;

        if (!jogador || this.trocaDeCenaEmAndamento) return;

        const distanciaParaAtivar = 300;
        const dist = Phaser.Math.Distance.Between(jogador.x, jogador.y, this.x, this.y);

        if (dist < distanciaParaAtivar) {
            // Jogador dentro da área: abre a porta (só dispara a animação uma vez)
            if (!this.portaAberta) {
                this.play('abrir_porta_roll');
                this.portaAberta = true;
            }
        } else {
            // Jogador saiu da área: fecha a porta e reseta para o próximo uso
            if (this.portaAberta) {
                this.stop();
                this.setFrame(0);
                this.portaAberta = false;
            }
        }
        if (this.portaCentral) {
            this.portaCentral.update();
        }
    }

    /**
     * Realiza a troca de cena utilizando o Scene Manager do Phaser.
     * Para a cena da cidade (gameScene), passa o parâmetro `mostrarTutorial: false`
     * para não reexibir o tutorial quando o jogador retorna de uma loja.
     */
    trocarDeCena() {
        if (this.proximaCenaNome === 'gameScene') {
            this.scene.scene.start(this.proximaCenaNome, { mostrarTutorial: false });
            return;
        }

        this.scene.scene.start(this.proximaCenaNome);
    }}

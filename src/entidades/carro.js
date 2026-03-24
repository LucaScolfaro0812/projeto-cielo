/**
 * Classe Carro — representa um carro que se move horizontalmente pela cidade.
 * O carro percorre a tela da esquerda para a direita (ou direita para esquerda)
 * em loop contínuo, reiniciando do lado oposto quando sai da tela.
 * Se o jogador colidir com o carro, ele morre.
 *
 * Animação: spritesheet com 8 frames (64x64 px cada), organizados em grade 3x3
 * (última célula vazia). Os frames simulam o movimento das rodas do carro.
 */
export default class Carro extends Phaser.Physics.Arcade.Sprite {

    /**
     * Cria o carro na cena.
     * @param {Phaser.Scene} cena - a cena onde o carro será adicionado
     * @param {number} x - posição X inicial
     * @param {number} y - posição Y inicial
     * @param {boolean} esquerdaDireita - true = move para a direita, false = move para a esquerda
     */
    constructor(cena, x, y, esquerdaDireita){
        // Inicia com o frame 0 do spritesheet
        super(cena, x, y, "carro", 0);

        // Adiciona o carro à cena visualmente e ao sistema de física
        cena.add.existing(this);
        cena.physics.add.existing(this);

        // Escala o sprite para ~256px — visível no mapa sem ocupar espaço excessivo
        this.setScale(4);

        // Define a profundidade de renderização — o carro aparece acima do mapa
        this.setDepth(10);

        // Hitbox menor que o frame para ignorar as áreas transparentes ao redor do carro
        this.setSize(56, 28);

        // Sincroniza o corpo físico com a posição e escala atual do sprite
        this.body.updateFromGameObject();

        // Guarda a direção de movimento para usar no método mover()
        this.esquerdaDireita = esquerdaDireita;

        // Espelha horizontalmente quando o carro vai para a esquerda
        if (!esquerdaDireita) {
            this.setFlipX(true);
        }

        // Velocidade de deslocamento em pixels por segundo
        this.velocidade = 750;

        // Cria a animação uma única vez (evita recriar a cada instância)
        if (!cena.anims.exists('carro-andando')) {
            cena.anims.create({
                key: 'carro-andando',
                frames: cena.anims.generateFrameNumbers('carro', { start: 0, end: 7 }),
                frameRate: 12,  // 12 frames por segundo — rodas giram suavemente
                repeat: -1      // loop infinito
            });
        }

        // Inicia a animação de rodas girando
        this.play('carro-andando');
    }

    /**
     * Carrega o spritesheet do carro antes da cena iniciar.
     * O spritesheet contém 8 frames de 64x64 px em grade 3x3 (1 célula vazia).
     * @param {Phaser.Scene} scene - a cena que está fazendo o preload
     */
    static preload(scene){
        scene.load.spritesheet('carro', 'assets/sprites/spritesheet/Carro.png', {
            frameWidth: 64,
            frameHeight: 64
        });
    }

    /**
     * Executado a cada frame pelo Phaser.
     * Chama o método de movimentação para manter o carro em movimento contínuo.
     */
    update(){
        this.mover();
    }

    /**
     * Move o carro horizontalmente com velocidade constante.
     * Quando o carro sai completamente pelo lado direito da tela,
     * ele é reposicionado do lado esquerdo para criar o efeito de loop.
     */
    mover(){
        // Define a velocidade horizontal — positivo = direita, negativo = esquerda
        this.setVelocity((this.esquerdaDireita ? 1 : -1) * this.velocidade, 0);

        // Verifica se o carro saiu completamente pela borda direita do mundo
        if (this.x > this.scene.physics.world.bounds.width + (this.width/2)) {
            // Reposiciona o carro no lado esquerdo, fora da tela, para recomeçar o loop
            this.x = 0 - (this.width/2);
        }
    }
}

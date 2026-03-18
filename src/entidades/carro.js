/**
 * Classe Carro — representa um carro que se move horizontalmente pela cidade.
 * O carro percorre a tela da esquerda para a direita (ou direita para esquerda)
 * em loop contínuo, reiniciando do lado oposto quando sai da tela.
 * Se o jogador colidir com o carro, ele morre.
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
        super(cena, x, y, "carro", esquerdaDireita);

        // Adiciona o carro à cena visualmente e ao sistema de física
        cena.add.existing(this);
        cena.physics.add.existing(this);

        // Reduz o tamanho visual do carro para 50% do original
        this.setScale(0.5);

        // Define a profundidade de renderização — o carro aparece acima do mapa
        this.setDepth(10);

        // Define o tamanho do hitbox de colisão (largura x altura em pixels)
        this.setSize(650, 300);

        // Sincroniza o corpo físico com a posição e escala atual do sprite
        this.body.updateFromGameObject();

        // Guarda a direção de movimento para usar no método mover()
        this.esquerdaDireita = esquerdaDireita;

        // Velocidade de deslocamento em pixels por segundo
        this.velocidade = 750;
    }

    /**
     * Carrega a imagem do carro antes da cena iniciar.
     * @param {Phaser.Scene} scene - a cena que está fazendo o preload
     */
    static preload(scene){
        scene.load.image('carro', "assets/imagens/ambiente/carro.png");
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

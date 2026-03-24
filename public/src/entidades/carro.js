/**
 * Classe Carro — representa um carro que se move horizontalmente pela cidade.
 * O carro percorre a tela da esquerda para a direita em loop contínuo.
 * Cada carro sorteia uma das 3 variantes de cor ao ser criado e mantém
 * essa cor fixa, ciclando os 8 frames manualmente para garantir independência
 * entre instâncias.
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
        // Sorteia a variante de cor antes de criar o sprite (1 = original, 2 = cor 1, 3 = cor 2)
        const variante = Phaser.Math.Between(1, 3);

        super(cena, x, y, `carro${variante}_frame_1`);

        // Adiciona o carro à cena visualmente e ao sistema de física
        cena.add.existing(this);
        cena.physics.add.existing(this);

        // Escala o sprite para o tamanho visível no mapa
        this.setScale(9);

        // Define a profundidade de renderização — o carro aparece acima do mapa
        this.setDepth(10);

        // Define o hitbox proporcional ao frame 64x64 — o carro ocupa ~56x26px dentro do frame
        this.setSize(56, 26);

        // Sincroniza o corpo físico com a posição e escala atual do sprite
        this.body.updateFromGameObject();

        // Guarda a direção de movimento para usar no método mover()
        this.esquerdaDireita = esquerdaDireita;

        // Velocidade de deslocamento em pixels por segundo
        this.velocidade = 750;

        // Controle manual de animação — garante que cada carro cicla seus frames de forma independente
        this._variante    = variante; // qual conjunto de frames usar (fixo para esta instância)
        this._frameAtual  = 1;        // frame exibido no momento (1 a 8)
        this._tempoFrame  = 0;        // acumulador de tempo em ms
        this._msPorFrame  = 125;      // 8fps → 1000ms / 8 = 125ms por frame
    }

    /**
     * Carrega os 8 frames das 3 variantes de cor antes da cena iniciar.
     * @param {Phaser.Scene} scene - a cena que está fazendo o preload
     */
    static preload(scene){
        // Carrega os 8 frames das 3 variantes de cor (branco, amarelo e azul)
        for (let i = 1; i <= 8; i++) {
            scene.load.image(`carro1_frame_${i}`, `assets/sprites/animacoes/Carro/carro-branco-${i}.png`);
            scene.load.image(`carro2_frame_${i}`, `assets/sprites/animacoes/Carro/carro-amarelo-${i}.png`);
            scene.load.image(`carro3_frame_${i}`, `assets/sprites/animacoes/Carro/carro-azul-${i}.png`);
        }
    }

    /**
     * Executado a cada frame pelo Phaser.
     * Avança o frame da animação manualmente e move o carro.
     */
    update(){
        this._animarFrame();
        this.mover();
    }

    /**
     * Cicla os frames da variante de cor deste carro de forma independente.
     * Usa o delta do game loop para manter 8fps independente do framerate da tela.
     */
    _animarFrame(){
        this._tempoFrame += this.scene.game.loop.delta;

        if (this._tempoFrame >= this._msPorFrame) {
            this._tempoFrame = 0;
            this._frameAtual = (this._frameAtual % 8) + 1; // cicla de 1 a 8
            this.setTexture(`carro${this._variante}_frame_${this._frameAtual}`);
        }
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
        if (this.x > this.scene.physics.world.bounds.width + (this.width / 2)) {
            // Reposiciona o carro no lado esquerdo, fora da tela, para recomeçar o loop
            this.x = 0 - (this.width / 2);
        }
    }
}

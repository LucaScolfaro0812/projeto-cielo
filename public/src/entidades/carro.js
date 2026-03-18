export default class Carro extends Phaser.Physics.Arcade.Sprite {
    constructor(cena, x, y, esquerdaDireita){
        super(cena, x, y, "carro", esquerdaDireita);

        cena.add.existing(this);
        cena.physics.add.existing(this);

        this.setScale(0.5);
        this.setDepth(10);

        this.setSize(650, 300);
        this.body.updateFromGameObject();

        this.esquerdaDireita = esquerdaDireita;

        this.velocidade = 750;
    }

    static preload(scene){
        scene.load.image('carro', "assets/imagens/ambiente/carro.png");
    }

    // Atualiza o carro a cada frame
    update(){
        this.mover();
    }

    // Move o carro horizontalmente em loop, reiniciando do outro lado quando sai da tela
    mover(){
        this.setVelocity((this.esquerdaDireita ? 1 : -1) * this.velocidade, 0);
        if (this.x > this.scene.physics.world.bounds.width + (this.width/2)) {
            this.x = 0 - (this.width/2);
        }
    }
}
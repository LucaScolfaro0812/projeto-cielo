export default class Carro extends Phaser.Physics.Arcade.Sprite {
    constructor(cena, x, y, esquerdaDireita){
        super(cena, x, y, "carro", esquerdaDireita);

        cena.add.existing(this);
        cena.physics.add.existing(this);

        this.setScale(0.5);
        this.setDepth(10);

        this.esquerdaDireita = esquerdaDireita;

        this.velocidade = 120;
    }

    static preload(scene){
        scene.load.image('carro', "assets/imagens/ambiente/carro.png");
    }

    ///////////////mover para cena cidade
    overlap(){
        /*this.physics.add.overlap(this.carro, this.player, () => {
            // reiniciar
        });*/
    }
    
    update(){
        this.mover();
    }

    mover(){
        this.setVelocity((this.esquerdaDireita ? 1 : -1) * this.velocidade, 0);
    }
}
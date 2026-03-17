export default class Carro extends Phaser.Physics.Arcade.Sprite {
    constructor(cena, x, y){
        super(cena, x, y, "carro.png", esquerdaDireita);

        cena.add.existing(this);
        cena.physics.add.existing(this);

        this.esquerdaDireita = esquerdaDireita;

        this.velocidade = 20;
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
        this.setVelocity((this.esquerdaDireita ? 1 : -1) * velocidade, 0);
    }
}
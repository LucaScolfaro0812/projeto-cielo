/**
 * Entrada - Sprite de porta de entrada. Troca de cena ao overlap com player.
 */

export default class Entrada extends Phaser.Physics.Arcade.Sprite {

    constructor(cena, x, y, cenaAtual, proximaCenaNome) {
        super(cena, x, y, 'entrada');

        this.cenaAtual = cenaAtual;
        this.proximaCenaNome = proximaCenaNome;

        cena.add.existing(this);
        cena.physics.add.existing(this);
        this.body.setImmovable(true);

        this.setScale(0.8);
    }

    trocarDeCena() {
        this.scene.scene.start(this.proximaCenaNome);
    }
}

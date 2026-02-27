/**
 * Npc - Sprite de NPC que guarda perguntas e inicia o quiz ao overlap.
 */

export default class Npc extends Phaser.Physics.Arcade.Sprite {

    constructor(cena, x, y, perguntas, chaveImagemQuiz = "npc") {
        super(cena, x, y, "npc");

        cena.add.existing(this);
        cena.physics.add.existing(this);
        this.body.setImmovable(true);

        this.setCollideWorldBounds(true);
        this.setScale(0.4);

        this.perguntas = perguntas;
        this.vendeu = false;
        this.chaveImagemNpc = chaveImagemQuiz;
    }

    update() {}
}

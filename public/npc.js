export default class Npc extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, perguntas) {
        super(scene, x, y, 'npc');

        // Adiciona à cena
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setImmovable(true);

        // Configurações
        this.setCollideWorldBounds(true);
        this.setScale(0.4);

        this.perguntas = perguntas;
        this.vendeu = false;
    }

    update() {

    }
}
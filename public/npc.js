export default class Npc extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'npc');

        // Adiciona à cena
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Configurações
        this.setCollideWorldBounds(true);
        this.setBounce(0.2);
    }
}
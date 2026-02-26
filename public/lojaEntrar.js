export default class Entrada extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, currentScene, nextScene) {
        super(scene, x, y, 'entrada');

        this.currentScene = currentScene;
        this.nextSceneName = nextScene;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setImmovable(true);

        this.setScale(0.8);
    }

    trocarDeCena() {
        this.scene.scene.start(this.nextSceneName);
    }
}
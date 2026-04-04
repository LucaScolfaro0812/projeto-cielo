

export default class Seta extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 100, 100, 'seta');

        scene.add.existing(this);

        // fixa na HUD (não se move com a câmera)
        this.setScrollFactor(0);

        this.alvo = null;
    }

    definirAlvo(alvo) {
        if (alvo && typeof alvo.x === 'number' && typeof alvo.y === 'number') {
            this.alvo = { x: alvo.x, y: alvo.y };
        }
    }

    update(jogador) {
        if (!this.alvo || !jogador) return;

        const cam = this.scene.cameras.main;

        // converte posição do jogador para coordenadas da tela (HUD)
        const screenX = jogador.x - cam.scrollX;
        const screenY = jogador.y - cam.scrollY;

        // posiciona a seta acima do jogador na tela
        this.setPosition(screenX, screenY - 40);

        // calcula ângulo até o alvo (em coordenadas de mundo)
        const angulo = Phaser.Math.Angle.Between(
            jogador.x,
            jogador.y,
            this.alvo.x,
            this.alvo.y
        );

        this.setRotation(angulo);
    }
}

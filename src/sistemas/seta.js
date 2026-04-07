export default class Seta extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 100, 100, 'seta');

        scene.add.existing(this);

        this.setScrollFactor(0); // HUD fixa
        this.alvo = null;

        this.margem = 20; // distância da borda da tela
        this.cena = scene;

        this.alerta = scene.add.sprite(0, 0, 'alerta');
        this.alerta.setScrollFactor(1); // fica no mundo
        this.alerta.setVisible(false);
        this.alerta.setScale(0.15);
    }

    definirAlvo(alvo) {
        if (alvo && typeof alvo.x === 'number' && typeof alvo.y === 'number') {
            this.alvo = { x: alvo.x, y: alvo.y };
        }
    }

    update(jogador, angleOffset = 0) {
        if (!this.alvo || !jogador) return;

        const cam = this.cena.cameras.main;

        const largura = cam.width;
        const altura = cam.height;

        // posição do alvo na tela
        const alvoScreenX = this.alvo.x - cam.scrollX;
        const alvoScreenY = this.alvo.y - cam.scrollY;

        // verifica se está dentro da tela
        const dentroTela =
            alvoScreenX >= 0 &&
            alvoScreenX <= largura &&
            alvoScreenY >= 0 &&
            alvoScreenY <= altura;

        // ângulo do jogador até o alvo (mundo)
        const angulo = Phaser.Math.Angle.Between(
            jogador.x,
            jogador.y,
            this.alvo.x,
            this.alvo.y
        ) + angleOffset;

        this.setRotation(angulo);
        this.setScale(0.3);

        if (dentroTela) {
            this.setVisible(false);
            this.alerta.setVisible(true);

            // posiciona acima do alvo (no mundo)
            this.alerta.setPosition(this.alvo.x, this.alvo.y - 200);
        } else {
            this.setVisible(true);
            this.alerta.setVisible(false);

            const margem = this.margem;

            // clamp direto nas bordas
            const posX = Phaser.Math.Clamp(alvoScreenX, margem, largura - margem);
            const posY = Phaser.Math.Clamp(alvoScreenY, margem, altura - margem);

            this.setPosition(posX, posY);
        }
    }
}
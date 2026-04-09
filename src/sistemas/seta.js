/**
 * Seta — indicador direcional de HUD que guia o jogador até o próximo objetivo.
 *
 * Comportamento por estado do alvo:
 *   - Alvo fora da tela: exibe a seta rotacionada na borda da câmera apontando para o alvo.
 *   - Alvo visível na tela: oculta a seta e exibe o sprite de "alerta" acima do alvo no mundo.
 *   - Sem alvo: ambos ficam invisíveis.
 */
export default class Seta extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 100, 100, 'seta');

        scene.add.existing(this);

        this.setScrollFactor(0); // Fixa na HUD — não se move com a câmera
        this.alvo = null;

        this.margem = 20; // Distância mínima da borda da tela em pixels
        this.cena = scene;

        // Sprite de alerta posicionado no mundo acima do alvo quando ele está visível
        this.alerta = scene.add.sprite(0, 0, 'alerta');
        this.alerta.setScrollFactor(1); // Acompanha o mundo (não é HUD)
        this.alerta.setVisible(false);
        this.alerta.setScale(0.15);
    }

    definirAlvo(alvo) {
        if (alvo && typeof alvo.x === 'number' && typeof alvo.y === 'number') {
            this.alvo = { x: alvo.x, y: alvo.y };
            return;
        }

        // Limpa o alvo quando não houver objetivo válido (ex.: todas as lojas concluídas).
        this.alvo = null;
        this.setVisible(false);
        this.alerta.setVisible(false);
    }

    /**
     * Mostra ou oculta a seta de HUD. O alerta de mundo é sempre ocultado aqui —
     * ele só aparece dentro do `update()` quando o alvo está na tela.
     */
    setHudVisible(visivel) {
        this.setVisible(visivel);
        this.alerta.setVisible(false);
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
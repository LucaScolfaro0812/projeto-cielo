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

    /**
     * Define o alvo para onde a seta deve apontar.
     * Aceita qualquer objeto com propriedades x e y numéricas (loja, NPC, ponto fixo).
     * Passar null ou um objeto inválido limpa o alvo e esconde a seta.
     * @param {{ x: number, y: number }|null} alvo - Objeto com posição do alvo no mundo
     */
    definirAlvo(alvo) {
        if (alvo && typeof alvo.x === 'number' && typeof alvo.y === 'number') {
            this.alvo = { x: alvo.x, y: alvo.y };
            return;
        }

        // Limpa o alvo quando não houver objetivo válido (ex.: todas as lojas concluídas)
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

    /**
     * Atualiza a posição e visibilidade da seta a cada frame.
     *
     * Lógica de dois modos:
     *   - Alvo FORA da tela: exibe a seta rotacionada na borda da câmera apontando para o alvo.
     *   - Alvo DENTRO da tela: esconde a seta e exibe o sprite de alerta flutuando acima do alvo no mundo.
     *
     * A conversão de coordenadas de mundo para tela é feita subtraindo o scroll da câmera.
     * O clamp nas bordas garante que a seta nunca saia da área visível.
     *
     * @param {{ x: number, y: number }} jogador    - Posição atual do jogador no mundo
     * @param {number} angleOffset                  - Rotação adicional em radianos (padrão: 0)
     */
    update(jogador, angleOffset = 0) {
        if (!this.alvo || !jogador) return;

        const cam = this.cena.cameras.main;
        const largura = cam.width;
        const altura = cam.height;

        // Converte a posição do alvo (mundo) para coordenadas de tela
        const alvoScreenX = this.alvo.x - cam.scrollX;
        const alvoScreenY = this.alvo.y - cam.scrollY;

        // Verifica se o alvo está dentro dos limites visíveis da câmera
        const dentroTela =
            alvoScreenX >= 0 &&
            alvoScreenX <= largura &&
            alvoScreenY >= 0 &&
            alvoScreenY <= altura;

        // Calcula o ângulo de rotação da seta: do jogador até o alvo no espaço do mundo
        const angulo = Phaser.Math.Angle.Between(
            jogador.x, jogador.y,
            this.alvo.x, this.alvo.y
        ) + angleOffset;

        this.setRotation(angulo);
        this.setScale(0.3);

        if (dentroTela) {
            // Alvo visível: esconde a seta de HUD e exibe o alerta flutuando acima do alvo
            this.setVisible(false);
            this.alerta.setVisible(true);
            this.alerta.setPosition(this.alvo.x, this.alvo.y - 200);
        } else {
            // Alvo fora da tela: exibe a seta travada na borda mais próxima
            this.setVisible(true);
            this.alerta.setVisible(false);

            // Clamp mantém a seta dentro da margem de segurança das bordas
            const posX = Phaser.Math.Clamp(alvoScreenX, this.margem, largura - this.margem);
            const posY = Phaser.Math.Clamp(alvoScreenY, this.margem, altura - this.margem);
            this.setPosition(posX, posY);
        }
    }
}
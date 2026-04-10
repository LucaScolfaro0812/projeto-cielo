/**
 * Utilitário de tutorial — funções para abrir a tela de controles como overlay.
 *
 * O tutorial é lançado por cima da cena atual (sem parar o jogo definitivamente),
 * usando scene.launch() para rodar as duas cenas em paralelo.
 */

/**
 * Abre a tela de tutorial (tutorialScene) por cima da cena atual como overlay.
 * Se o tutorial já estiver ativo, não faz nada (evita abrir duas vezes).
 *
 * Fluxo:
 *   1. Pausa a cena atual para congelar o jogo enquanto o tutorial está visível.
 *   2. Lança tutorialScene em paralelo com modoOverlay: true, para que ao fechar
 *      ela retome a cena de origem em vez de trocar completamente.
 *   3. Traz tutorialScene para o topo da pilha de renderização.
 *
 * @param {Phaser.Scene} scene       - Cena que está abrindo o tutorial
 * @param {string} cenaOrigem        - Chave da cena a retomar ao fechar (padrão: a própria cena)
 */
export function abrirTutorialComoOverlay(scene, cenaOrigem = scene.scene.key) {
    if (scene.scene.isActive('tutorialScene')) {
        return; // Previne abrir o tutorial duas vezes ao mesmo tempo
    }

    scene.scene.pause();
    scene.scene.launch('tutorialScene', {
        cenaOrigem,
        modoOverlay: true
    });
    scene.scene.bringToTop('tutorialScene');
}

/**
 * Registra o atalho de teclado T para abrir o tutorial como overlay.
 * Deve ser chamado no create() da cena que deseja suportar esse atalho.
 *
 * @param {Phaser.Scene} scene    - Cena onde o atalho será registrado
 * @param {string} cenaOrigem     - Cena a retomar ao fechar o tutorial
 */
export function registrarAtalhoTutorial(scene, cenaOrigem = scene.scene.key) {
    scene.input.keyboard.on('keydown-T', () => {
        abrirTutorialComoOverlay(scene, cenaOrigem);
    });
}

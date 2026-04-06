export function abrirTutorialComoOverlay(scene, cenaOrigem = scene.scene.key) {
    if (scene.scene.isActive('tutorialScene')) {
        return;
    }

    scene.scene.pause();
    scene.scene.launch('tutorialScene', {
        cenaOrigem,
        modoOverlay: true
    });
    scene.scene.bringToTop('tutorialScene');
}

export function registrarAtalhoTutorial(scene, cenaOrigem = scene.scene.key) {
    scene.input.keyboard.on('keydown-T', () => {
        abrirTutorialComoOverlay(scene, cenaOrigem);
    });
}

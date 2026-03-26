// RGB do azul Cielo (#009FDA)
const R = 0, G = 159, B = 218;

/**
 * Fade da cena atual para azul Cielo, exibe um texto centralizado e inicia a cena de destino.
 *
 * Fluxo:
 *   1. Para todos os sons e faz fadeOut para azul Cielo (400ms)
 *   2. Exibe o texto sobre a tela azul via câmera de UI (a câmera de UI ignora todos os
 *      objetos da cena, mostrando apenas fundo azul + texto — sem conflito de zoom)
 *   3. Aguarda 350ms e inicia a cena de destino
 *
 * @param {Phaser.Scene} cena
 * @param {string} nomeCena - chave da cena de destino
 * @param {object} dados    - dados repassados para a cena de destino
 * @param {string} texto    - texto exibido durante a transição
 */
export function transicionarPara(cena, nomeCena, dados = {}, texto = 'Carregando...') {
    if (cena._transicionando) return;
    cena._transicionando = true;

    cena.sound.stopAll();
    cena.cameras.main.fadeOut(400, R, G, B);

    cena.cameras.main.once('camerafadeoutcomplete', () => {
        const { width, height } = cena.scale;

        // Câmera de UI com fundo azul sólido — renderiza apenas o texto, sem a cena por baixo
        const camUI = cena.cameras.add(0, 0, width, height);
        camUI.setBackgroundColor(0x009FDA);

        const label = cena.add.text(width / 2, height / 2, texto, {
            fontSize: '26px',
            color: '#ffffff',
            fontFamily: 'Arial',
            fontStyle: 'bold',
            stroke: '#004f7a',
            strokeThickness: 4,
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1).setAlpha(0);

        // Faz a camUI ignorar todos os objetos da cena exceto o label
        cena.children.list.forEach(obj => {
            if (obj !== label) camUI.ignore(obj);
        });

        // Texto aparece suavemente, depois inicia a cena de destino
        cena.tweens.add({
            targets: label,
            alpha: 1,
            duration: 180,
            onComplete: () => cena.time.delayedCall(350, () => cena.scene.start(nomeCena, dados))
        });
    });
}

/**
 * Revela a cena com fade partindo do azul Cielo para transparente (400ms).
 * Reseta o flag _transicionando para que futuras transições funcionem.
 * Deve ser chamado no create() de cada cena de destino.
 *
 * @param {Phaser.Scene} cena
 */
export function revelarCena(cena) {
    cena._transicionando = false;
    cena.cameras.main.fadeIn(400, R, G, B);
}

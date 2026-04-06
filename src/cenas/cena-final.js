export default class CenaFinal extends Phaser.Scene {
    constructor() {
        super({ key: 'cenaFinal' });
    }

    create() {
        const w = this.scale.width;
        const h = this.scale.height;

        // Fundo escuro
        this.add.rectangle(w / 2, h / 2, w, h, 0x0a0a2e);

        // Texto final
        this.add.text(w / 2, h / 2 - 60,
            'Parabéns!\nVocê concluiu seu treinamento!\nAgora chegou a hora de por em prática\ntudo que aprendeu.\nBoa sorte!!',
            {
                fontSize: '32px',
                fill: '#ffffff',
                align: 'center',
                wordWrap: { width: w * 0.8 }
            }
        ).setOrigin(0.5);
    }
}
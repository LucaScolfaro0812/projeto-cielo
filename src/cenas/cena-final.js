import { carregarDados } from '../utilitarios/armazenamento.js';
import { chavesArmazenamento } from '../utilitarios/estado-jogo.js';

export default class CenaFinal extends Phaser.Scene {
    constructor() {
        super({ key: 'cenaFinal' });
    }

    create() {
        const w = this.scale.width;
        const h = this.scale.height;

        const progresso = carregarDados(chavesArmazenamento.npcsConquistadosQuantidade, { npcsConquistadosQuantidade: 0 });
        const quantidade = Number(progresso.npcsConquistadosQuantidade) || 0;
        const venceu = quantidade > 6;

        // Fundo escuro
        this.add.rectangle(w / 2, h / 2, w, h, 0x0a0a2e);

        if (venceu) {
            this.add.text(w / 2, h / 2 - 60,
                'Parabéns!\nVocê concluiu seu treinamento!\nAgora chegou a hora de por em prática\ntudo que aprendeu.\nBoa sorte!!',
                { fontSize: '32px', fill: '#ffffff', align: 'center', wordWrap: { width: w * 0.8 } }
            ).setOrigin(0.5);
        } else {
            this.add.text(w / 2, h / 2 - 100,
                'Infelizmente você não conquistou\no número suficiente de vendedores.\nTente novamente, você consegue!',
                { fontSize: '32px', fill: '#ffffff', align: 'center', wordWrap: { width: w * 0.8 } }
            ).setOrigin(0.5);

            const botao = this.add.text(w / 2, h / 2 + 80, 'JOGAR NOVAMENTE', {
                fontSize: '28px',
                fill: '#ffffff',
                backgroundColor: '#001caa',
                padding: { x: 20, y: 10 }
            }).setOrigin(0.5).setInteractive({ useHandCursor: true });

            botao.on('pointerover', () => botao.setStyle({ backgroundColor: '#6FB7FF', fill: '#1B2A4A' }));
            botao.on('pointerout', () => botao.setStyle({ backgroundColor: '#001caa', fill: '#ffffff' }));
            botao.on('pointerdown', () => {
                this.scene.start('cenaFinal');  
            });
        }
    }
}
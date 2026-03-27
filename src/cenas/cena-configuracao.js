export class CenaConfiguracao extends Phaser.Scene {

    constructor() {
        super({ key: 'configScene' });
    }

    preload() {
        if (!this.cache.audio.exists('somClicando')) {
            this.load.audio('somClicando', 'assets/sons/somClicando.mp3');
        }
    }

    create() {

        const w = this.scale.width;
        const h = this.scale.height;

        // ===============================
        // FUNDO ESCURO
        // ===============================
        const fundo = this.add.graphics();
        fundo.fillStyle(0x000000, 0.85);
        fundo.fillRect(0, 0, w, h);
        fundo.setDepth(100);

        // ===============================
        // TÍTULO
        // ===============================
        this.add.text(w/2, h/2 - 180, 'CONFIGURAÇÕES', {
            fontFamily: 'Poppins',
            fontSize: '42px',
            color: '#ffffff'
        })
        .setOrigin(0.5)
        .setDepth(101);

        // ===============================
        // VOLUME
        // ===============================
        this.add.text(w/2, h/2 - 80, 'Volume', {
            fontFamily: 'Poppins',
            fontSize: '28px',
            color: '#ffffff'
        })
        .setOrigin(0.5)
        .setDepth(101);

        let volume = parseFloat(localStorage.getItem('volume')) || 1;
        this.sound.setVolume(volume);

        const largura = 300;
        const minX = w/2 - largura/2;
        const maxX = w/2 + largura/2;

        this.add.rectangle(w/2, h/2 - 30, largura, 8, 0xffffff).setDepth(101);

        const controle = this.add.circle(
            Phaser.Math.Linear(minX, maxX, volume),
            h/2 - 30,
            10,
            0x6FB7FF
        )
        .setInteractive({ draggable: true })
        .setDepth(102);

        this.input.setDraggable(controle);

        controle.on('drag', (pointer, dragX) => {
            controle.x = Phaser.Math.Clamp(dragX, minX, maxX);
            volume = (controle.x - minX) / largura;
            this.sound.setVolume(volume);
            localStorage.setItem('volume', volume);
        });

        // ===============================
        // SOM (TOGGLE)
        // ===============================
        let somLigado = localStorage.getItem('som') !== 'false';
        this.sound.mute = !somLigado;

        this.add.text(w/2 - 80, h/2 + 40, 'Som', {
            fontFamily: 'Poppins',
            fontSize: '28px',
            color: '#ffffff'
        })
        .setOrigin(1, 0.5)
        .setDepth(101);

        const toggleBg = this.add.rectangle(w/2 + 40, h/2 + 40, 70, 30, 0x555555)
            .setOrigin(0.5)
            .setDepth(101)
            .setInteractive({ useHandCursor: true });

        const toggleCircle = this.add.circle(
            somLigado ? w/2 + 60 : w/2 + 20,
            h/2 + 40,
            10,
            0xffffff
        ).setDepth(102);

        const atualizarToggle = () => {
            toggleBg.setFillStyle(somLigado ? 0x4CAF50 : 0x555555);
            this.tweens.add({
                targets: toggleCircle,
                x: somLigado ? w/2 + 60 : w/2 + 20,
                duration: 150
            });
        };

        atualizarToggle();

        toggleBg.on('pointerdown', () => {
            if (this.cache.audio.exists('somClicando')) this.sound.play('somClicando', { volume: 0.5 });
            somLigado = !somLigado;
            this.sound.mute = !somLigado;
            localStorage.setItem('som', somLigado);
            atualizarToggle();
        });

        // ===============================
        // BOTÃO VOLTAR
        // ===============================
        const botaoVoltar = this.add.text(w/2, h/2 + 150, 'VOLTAR', {
            fontFamily: 'Poppins',
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#001caa',
            padding: { x: 30, y: 12 }
        })
        .setOrigin(0.5)
        .setDepth(101)
        .setInteractive({ useHandCursor: true });

        botaoVoltar.on('pointerover', () => {
            botaoVoltar.setStyle({ backgroundColor: '#6FB7FF', color: '#1B2A4A' });
            botaoVoltar.setScale(1.05);
        });

        botaoVoltar.on('pointerout', () => {
            botaoVoltar.setStyle({ backgroundColor: '#001caa', color: '#ffffff' });
            botaoVoltar.setScale(1);
        });

        botaoVoltar.on('pointerdown', () => {
            if (this.cache.audio.exists('somClicando')) this.sound.play('somClicando', { volume: 0.5 });
            this.scene.stop('configScene');
            this.scene.resume('menuScene');
        });
    }
}
export class CenaConfiguracoes extends Phaser.Scene {

    constructor() {
        super({ key: 'configScene', transparent: true });
    }

    init(data = {}) {
        this.cenaOrigem = data.cenaOrigem ?? 'menuScene';
    }

    create() {
        this.scene.bringToTop();

        const largura = this.scale.width;
        const altura = this.scale.height;

        this.volumeAtual = this._obterVolumeSalvo();
        this.somAtivo = this._obterSomAtivoSalvo();
        this._aplicarConfiguracoesAudio();

        this.add.rectangle(largura / 2, altura / 2, largura, altura, 0x000000, 0.55);

        const painel = this.add.rectangle(largura / 2, altura / 2, 620, 560, 0xe8eefc, 1);
        painel.setStrokeStyle(4, 0x001caa, 1);

        this.add.text(largura / 2, altura / 2 - 205, 'CONFIGURACOES', {
            fontFamily: 'Poppins',
            fontSize: '36px',
            color: '#001caa',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(largura / 2, altura / 2 - 115, 'VOLUME', {
            fontFamily: 'Poppins',
            fontSize: '28px',
            color: '#1B2A4A',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.valorVolume = this.add.text(largura / 2, altura / 2 - 55, '', {
            fontFamily: 'Poppins',
            fontSize: '30px',
            color: '#001caa',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this._criarBotao(largura / 2 - 120, altura / 2 - 55, '-', () => {
            this.volumeAtual = Math.max(0, Math.round((this.volumeAtual - 0.1) * 10) / 10);
            this._salvarConfiguracoesAudio();
            this._atualizarTextos();
        }, 72);

        this._criarBotao(largura / 2 + 120, altura / 2 - 55, '+', () => {
            this.volumeAtual = Math.min(1, Math.round((this.volumeAtual + 0.1) * 10) / 10);
            this._salvarConfiguracoesAudio();
            this._atualizarTextos();
        }, 72);

        this.add.text(largura / 2, altura / 2 + 45, 'SOM', {
            fontFamily: 'Poppins',
            fontSize: '28px',
            color: '#1B2A4A',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.valorSom = this.add.text(largura / 2, altura / 2 + 100, '', {
            fontFamily: 'Poppins',
            fontSize: '30px',
            color: '#001caa',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.botaoAlternar = this._criarBotao(largura / 2, altura / 2 + 165, '', () => {
            this.somAtivo = !this.somAtivo;
            this._salvarConfiguracoesAudio();
            this._atualizarTextos();
        }, 260, {
            backgroundColor: '#138a36',
            color: '#ffffff'
        });

        this._criarBotao(largura / 2, altura / 2 + 245, 'VOLTAR', () => {
            this.scene.resume(this.cenaOrigem);
            this.scene.stop();
        }, 220);

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.resume(this.cenaOrigem);
            this.scene.stop();
        });

        this._atualizarTextos();
    }

    _criarBotao(x, y, texto, onClick, largura = 180, estiloExtra = {}) {
        const botao = this.add.text(x, y, texto, {
            fontFamily: 'Poppins',
            fontSize: '26px',
            color: '#ffffff',
            backgroundColor: '#001caa',
            padding: { x: 16, y: 8 },
            align: 'center',
            ...estiloExtra
        })
            .setOrigin(0.5)
            .setFixedSize(largura, 54)
            .setAlign('center')
            .setInteractive({ useHandCursor: true });

        botao.on('pointerover', () => {
            botao.setScale(1.05);
        });

        botao.on('pointerout', () => {
            botao.setScale(1);
            this._atualizarTextos();
        });

        botao.on('pointerdown', onClick);

        return botao;
    }

    _atualizarTextos() {
        this.valorVolume.setText(`${Math.round(this.volumeAtual * 100)}%`);
        this.valorSom.setText(this.somAtivo ? 'LIGADO' : 'DESLIGADO');

        if (this.botaoAlternar) {
            this.botaoAlternar.setText('ALTERAR');
            this.botaoAlternar.setStyle({
                backgroundColor: this.somAtivo ? '#138a36' : '#c0392b',
                color: '#ffffff'
            });
        }

        this._aplicarConfiguracoesAudio();
    }

    _obterVolumeSalvo() {
        const valorSalvo = Number(localStorage.getItem('volumeJogo'));
        if (Number.isNaN(valorSalvo)) {
            return 1;
        }

        return Phaser.Math.Clamp(valorSalvo, 0, 1);
    }

    _obterSomAtivoSalvo() {
        const valorSalvo = localStorage.getItem('somJogoAtivo');
        if (valorSalvo === null) {
            return true;
        }

        return valorSalvo === 'true';
    }

    _salvarConfiguracoesAudio() {
        localStorage.setItem('volumeJogo', String(this.volumeAtual));
        localStorage.setItem('somJogoAtivo', String(this.somAtivo));
        this._aplicarConfiguracoesAudio();
    }

    _aplicarConfiguracoesAudio() {
        this.sound.volume = this.volumeAtual;
        this.sound.mute = !this.somAtivo;
    }
}

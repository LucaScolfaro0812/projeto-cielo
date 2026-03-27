import { obterPontos, ouvirAtualizacaoPontuacao } from '../utilitarios/pontos.js';

export default class InterfacePontuacao {
    constructor(cena) {
        this.cena = cena;
        this.pontos = obterPontos();
        this._criarHud();
        this._registrarEventos();
    }

    _criarHud() {
        const largura = 210;
        const altura = 54;
        const { x, y } = this._obterPosicaoHud(largura);

        this.container = this.cena.add.container(x, y).setScrollFactor(0).setDepth(9998);

        this.fundoSombra = this.cena.add.rectangle(-4, 5, largura, altura, 0x00111f, 0.2)
            .setOrigin(1, 0);

        this.fundo = this.cena.add.rectangle(0, 0, largura, altura, 0x0b5cab, 0.92)
            .setOrigin(1, 0);
        this.fundo.setStrokeStyle(2, 0xd8f1ff, 0.9);

        this.rotulo = this.cena.add.text(-largura + 16, 15, 'Pontos', {
            fontFamily: 'Arial Black, Arial, sans-serif',
            fontSize: '16px',
            color: '#dff6ff'
        }).setOrigin(0, 0.5);

        this.valor = this.cena.add.text(-16, altura / 2, this._formatarPontuacao(this.pontos), {
            fontFamily: 'Arial Black, Arial, sans-serif',
            fontSize: '24px',
            color: '#ffffff',
            stroke: '#08325d',
            strokeThickness: 4
        }).setOrigin(1, 0.5);

        this.container.add([
            this.fundoSombra,
            this.fundo,
            this.rotulo,
            this.valor
        ]);
    }

    _obterPosicaoHud(largura) {
        const margem = 0;
        const camera = this.cena.cameras.main;

        if (this.cena.scene?.key === 'gameScene') {
            return {
                x: camera.width - margem,
                y: 118
            };
        }

        return {
            x: camera.width - margem,
            y: 90
        };
    }

    _registrarEventos() {
        this.removerListenerPontuacao = ouvirAtualizacaoPontuacao((pontos) => {
            this.atualizar(pontos);
        });

        this.removerListenerStorage = () => {};
        if (typeof window !== 'undefined') {
            this._aoMudarStorage = (event) => {
                if (event.key === 'pontuacaoJogador') {
                    this.atualizar(obterPontos());
                }
            };
            window.addEventListener('storage', this._aoMudarStorage);
            this.removerListenerStorage = () => window.removeEventListener('storage', this._aoMudarStorage);
        }
    }

    _formatarPontuacao(valor) {
        return String(Math.max(0, Number(valor) || 0)).padStart(3, '0');
    }

    atualizar(pontos = obterPontos()) {
        const pontosNormalizados = Math.max(0, Number(pontos) || 0);
        this.pontos = pontosNormalizados;
        this.valor.setText(this._formatarPontuacao(pontosNormalizados));

        this.cena.tweens.killTweensOf(this.container);
        this.cena.tweens.killTweensOf(this.valor);
        this.container.setScale(1);
        this.valor.setScale(1);
        this.cena.tweens.add({
            targets: this.container,
            scaleX: 1.04,
            scaleY: 1.04,
            duration: 120,
            yoyo: true,
            ease: 'Quad.Out'
        });
        this.cena.tweens.add({
            targets: this.valor,
            scaleX: 1.08,
            scaleY: 1.08,
            duration: 140,
            yoyo: true,
            ease: 'Sine.Out'
        });
    }

    setVisible(visible) {
        this.container.setVisible(visible);
    }

    destroy() {
        if (this.removerListenerPontuacao) {
            this.removerListenerPontuacao();
        }

        if (this.removerListenerStorage) {
            this.removerListenerStorage();
        }

        if (this.container) {
            this.container.destroy(true);
        }
    }
}

import { obterPontos, ouvirAtualizacaoPontuacao } from '../utilitarios/pontos.js';

/**
 * InterfacePontuacao - HUD que exibe a pontuação atual do jogador na tela.
 * Fica fixo no canto superior direito e anima levemente ao receber atualizações.
 */
export default class InterfacePontuacao {

    /**
     * @param {Phaser.Scene} cena - Cena onde o HUD será criado
     */
    constructor(cena) {
        this.cena = cena;
        this.pontos = obterPontos();
        this._criarHud();
        this._registrarEventos();
    }

    /**
     * Cria os elementos visuais do HUD: fundo, rótulo "Pontos" e valor numérico.
     * O container usa scrollFactor 0 para ficar fixo na tela independente da câmera.
     */
    _criarHud() {
        const largura = 210;
        const altura = 54;
        const { x, y } = this._obterPosicaoHud(largura);

        // Container fixo na tela com depth alto para ficar acima de outros elementos
        this.container = this.cena.add.container(x, y).setScrollFactor(0).setDepth(9998);

        // Sombra sutil atrás do fundo para dar profundidade
        this.fundoSombra = this.cena.add.rectangle(-4, 5, largura, altura, 0x00111f, 0.2)
            .setOrigin(1, 0);

        // Fundo azul com borda clara
        this.fundo = this.cena.add.rectangle(0, 0, largura, altura, 0x0b5cab, 0.92)
            .setOrigin(1, 0);
        this.fundo.setStrokeStyle(2, 0xd8f1ff, 0.9);

        // Rótulo estático "Pontos" à esquerda do HUD
        this.rotulo = this.cena.add.text(-largura + 16, 15, 'Pontos', {
            fontFamily: 'Arial Black, Arial, sans-serif',
            fontSize: '16px',
            color: '#dff6ff'
        }).setOrigin(0, 0.5);

        // Valor numérico com zero-padding (ex: "042") à direita do HUD
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

    /**
     * Retorna a posição (x, y) do HUD baseada na cena atual.
     * Na cidade (gameScene) o HUD fica um pouco mais baixo para não sobrepor o minimapa.
     * @param {number} largura - Largura do HUD (usada para alinhar ao canto direito)
     * @returns {{ x: number, y: number }}
     */
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

    /**
     * Registra os listeners de atualização de pontuação.
     * Usa dois mecanismos em paralelo:
     * 1. Evento interno do jogo (ouvirAtualizacaoPontuacao) — para atualizações na mesma aba
     * 2. Evento `storage` do browser — para sincronizar entre abas (caso necessário)
     * Guarda as funções de remoção para limpeza correta no destroy().
     */
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

    /**
     * Formata um número de pontos com zero-padding para sempre exibir 3 dígitos.
     * Garante que valores negativos ou inválidos sejam tratados como 0.
     * Exemplo: 42 → "042", -5 → "000"
     * @param {number} valor
     * @returns {string}
     */
    _formatarPontuacao(valor) {
        return String(Math.max(0, Number(valor) || 0)).padStart(3, '0');
    }

    /**
     * Atualiza o valor exibido e dispara uma animação de pulso no container e no texto.
     * Os dois tweens são independentes para que o container e o número pulsem em ritmos ligeiramente diferentes,
     * criando um efeito visual mais dinâmico.
     * @param {number} pontos - Novo valor de pontos (padrão: lê direto do localStorage)
     */
    atualizar(pontos = obterPontos()) {
        const pontosNormalizados = Math.max(0, Number(pontos) || 0);
        this.pontos = pontosNormalizados;
        this.valor.setText(this._formatarPontuacao(pontosNormalizados));

        // Cancela animações anteriores para evitar sobreposição de tweens
        this.cena.tweens.killTweensOf(this.container);
        this.cena.tweens.killTweensOf(this.valor);
        this.container.setScale(1);
        this.valor.setScale(1);

        // Pulso do container (leve expansão e retração)
        this.cena.tweens.add({
            targets: this.container,
            scaleX: 1.04,
            scaleY: 1.04,
            duration: 120,
            yoyo: true,
            ease: 'Quad.Out'
        });

        // Pulso do número (um pouco maior e mais lento que o container)
        this.cena.tweens.add({
            targets: this.valor,
            scaleX: 1.08,
            scaleY: 1.08,
            duration: 140,
            yoyo: true,
            ease: 'Sine.Out'
        });
    }

    /**
     * Mostra ou oculta o HUD de pontuação.
     * @param {boolean} visible
     */
    setVisible(visible) {
        this.container.setVisible(visible);
    }

    /**
     * Remove todos os listeners e destrói o container com seus filhos.
     * Deve ser chamado ao encerrar a cena para evitar vazamento de memória.
     */
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

/**
 * CenaTutorial — Overlay de controles do jogo.
 *
 * Pode ser exibido de duas formas:
 *   - Como cena independente: ao iniciar o jogo pela primeira vez.
 *   - Como overlay: sobreposto a uma cena ativa (ex: CenaCentral), sem pausar a lógica.
 *     Nesse modo, ao fechar, retoma a cena de origem e chama `aoFecharTutorialOverlay()`
 *     nela (se existir) para continuar o fluxo de diálogo.
 *
 * A flag `usarTutorialRealista` controla qual layout é renderizado:
 *   - true  → teclas em estilo de interface de jogo (3D), uma por linha com descrição
 *   - false → layout anterior, mais simples (tabela texto/tecla)
 */
export class CenaTutorial extends Phaser.Scene {

    constructor() {
        super({ key: 'tutorialScene', transparent: true });

        // Quando true, usa o tutorial reformulado. Troque para false para voltar ao layout anterior.
        this.usarTutorialRealista = true;
    }

    init(data = {}) {
        this.cenaOrigem = data.cenaOrigem ?? 'gameScene';
        this.modoOverlay = Boolean(data.modoOverlay);
        this.usarTutorialRealista = data.usarTutorialRealista ?? this.usarTutorialRealista;
    }

    preload() {
        if (!this.cache.audio.exists('somClicando')) {
            this.load.audio('somClicando', 'assets/sons/somClicando.mp3');
        }
    }

    create() {
        const w = this.scale.width;
        const h = this.scale.height;
        const larguraCard = Math.min(w * 0.82, 760);
        const alturaCard = Math.min(h * 0.8, 560);
        const topoCard = (h - alturaCard) / 2;
        const esquerdaCard = (w - larguraCard) / 2;

        this.scene.bringToTop();
        this.cameras.main.setBackgroundColor('rgba(0,0,0,0)');

        this.add.rectangle(w / 2, h / 2, w, h, 0x03111f, 0.7).setDepth(1);

        this.add.rectangle(w / 2, h / 2, larguraCard, alturaCard, 0x071a2d, 0.95)
            .setStrokeStyle(3, 0x6fd1ff, 0.6)
            .setDepth(2);

        if (this.usarTutorialRealista) {
            this._renderizarTutorialRealista(w, h, larguraCard, alturaCard, topoCard, esquerdaCard);
        } else {
            this._renderizarTutorialAtual(w, h, larguraCard, alturaCard, topoCard, esquerdaCard);
        }

        const estiloBotao = {
            fontFamily: 'Arial Black',
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#0b63ce',
            padding: { x: 22, y: 10 },
            align: 'center'
        };

        const yBotaoSair = topoCard + alturaCard - 28;

        const botaoSair = this.add.text(w / 2, yBotaoSair, 'FECHAR', estiloBotao)
            .setOrigin(0.5, 0)
            .setFixedSize(200, 48)
            .setAlign('center')
            .setDepth(10);

        botaoSair.setInteractive({ useHandCursor: true });

        botaoSair.on('pointerover', () => {
            botaoSair.setStyle({ backgroundColor: '#6fd1ff', color: '#07304f' });
            botaoSair.setScale(1.05);
        });

        botaoSair.on('pointerout', () => {
            botaoSair.setStyle({ backgroundColor: '#0b63ce', color: '#ffffff' });
            botaoSair.setScale(1);
        });

        botaoSair.on('pointerdown', () => {
            if (this.cache.audio.exists('somClicando')) this.sound.play('somClicando', { volume: 0.5 });

            if (this.modoOverlay) {
                const cenaOrigem = this.scene.get(this.cenaOrigem);
                this.scene.resume(this.cenaOrigem);
                this.scene.stop();
                cenaOrigem?.aoFecharTutorialOverlay?.();
                return;
            }

            this.scene.start(this.cenaOrigem === 'centralScene' ? 'centralScene' : 'gameScene', { mostrarTutorial: false });
        });
    }

    /**
     * Renderiza o tutorial no layout moderno: cada controle em uma linha com
     * tecla(s) estilizadas em 3D à esquerda e descrição à direita.
     * A primeira linha (movimento) usa altura maior para acomodar duas fileiras de teclas.
     */
    _renderizarTutorialRealista(w, h, larguraCard, alturaCard, topoCard, esquerdaCard) {
        const controles = [
            {
                titulo: 'Movimento',
                descricao: 'Ande com W A S D ou com as setas direcionais.',
                teclas: ['W', 'A', 'S', 'D'],
                teclasSecundarias: ['↑', '←', '↓', '→']
            },
            {
                titulo: 'Interação',
                descricao: 'Fale com NPCs e recarregue ações com E.',
                teclas: ['E']
            },
            {
                titulo: 'Mapa',
                descricao: 'Abra e feche o mapa da cidade com M.',
                teclas: ['M']
            },
            {
                titulo: 'Tutorial',
                descricao: 'Revise os controles a qualquer momento com T.',
                teclas: ['T']
            },
            {
                titulo: 'Pausa',
                descricao: 'Pause a partida e volte do minimapa com ESC.',
                teclas: ['ESC']
            }
        ];

        this.add.rectangle(w / 2, topoCard + 58, larguraCard - 42, 82, 0x0d2e4f, 0.95)
            .setDepth(3);

        this.add.text(w / 2, topoCard + 40, 'CONTROLES', {
            fontFamily: 'Arial Black',
            fontSize: `${Math.max(28, Math.round(larguraCard * 0.056))}px`,
            color: '#f4fbff',
            align: 'center'
        })
            .setOrigin(0.5, 0.5)
            .setDepth(4);

        this.add.text(w / 2, topoCard + 85, 'Teclas em estilo de interface de jogo', {
            fontFamily: 'Arial',
            fontSize: `${Math.max(13, Math.round(larguraCard * 0.019))}px`,
            color: '#b7d9ef',
            align: 'center'
        })
            .setOrigin(0.5, 0.5)
            .setDepth(4);

        const inicioListaY = topoCard + 150;
        const alturaLinhaPadrao = Math.min(74, Math.max(62, alturaCard * 0.11));
        const alturaLinhaMovimento = Math.min(104, Math.max(88, alturaCard * 0.16));
        const espacamentoLinhas = 8;
        const larguraLinha = larguraCard - 64;
        const larguraEtiqueta = Math.min(256, larguraCard * 0.34);
        const larguraDescricao = larguraCard - larguraEtiqueta - 168;

        let cursorY = inicioListaY;

        controles.forEach((controle, index) => {
            const alturaLinha = index === 0 ? alturaLinhaMovimento : alturaLinhaPadrao;
            const y = cursorY + (alturaLinha / 2);
            const corLinha = index % 2 === 0 ? 0x0a2239 : 0x0c2944;

            this.add.rectangle(w / 2, y + 3, larguraLinha, alturaLinha - 10, 0x041424, 0.85)
                .setDepth(2);

            this.add.rectangle(w / 2, y, larguraLinha, alturaLinha - 10, corLinha, 0.98)
                .setDepth(3);

            const xEtiqueta = esquerdaCard + 44 + (larguraEtiqueta / 2);
            if (controle.teclas.length > 1) {
                this._desenharGrupoTeclas(xEtiqueta, index === 0 ? y + 12 : y + 2, controle.teclas, controle.teclasSecundarias);
            } else {
                this._desenharTeclaUnica(xEtiqueta, y + 2, controle.teclas[0]);
            }

            this.add.text(esquerdaCard + 44 + larguraEtiqueta + 24, y, controle.descricao, {
                fontFamily: 'Arial',
                fontSize: `${Math.max(15, Math.round(larguraCard * 0.022))}px`,
                color: '#d7ecf8',
                wordWrap: { width: larguraDescricao, useAdvancedWrap: true },
                align: 'left'
            })
                .setOrigin(0, 0.5)
                .setDepth(5);

            cursorY += alturaLinha + espacamentoLinhas;
        });
    }

    /**
     * Renderiza o tutorial no layout simples: tabela com coluna de tecla e coluna de descrição.
     * Mantido como fallback caso `usarTutorialRealista` seja false.
     */
    _renderizarTutorialAtual(w, h, larguraCard, alturaCard, topoCard, esquerdaCard) {
        const controles = [
            ['W A S D\n/ SETAS', 'Mover personagem'],
            ['E', 'Interagir com NPC'],
            ['M', 'Abrir minimapa'],
            ['T', 'Abrir tutorial'],
            ['ESC', 'Abrir pausa e sair do minimapa']
        ];

        this.add.rectangle(w / 2, topoCard + 58, larguraCard - 42, 82, 0x0d2e4f, 0.95)
            .setDepth(3);

        this.add.text(w / 2, topoCard + 44, 'CONTROLES', {
            fontFamily: 'Arial Black',
            fontSize: `${Math.max(30, Math.round(larguraCard * 0.06))}px`,
            color: '#f4fbff',
            align: 'center'
        })
            .setOrigin(0.5, 0.5)
            .setDepth(4);

        this.add.text(w / 2, topoCard + 84, 'Use estes comandos durante a partida', {
            fontFamily: 'Arial',
            fontSize: `${Math.max(15, Math.round(larguraCard * 0.024))}px`,
            color: '#b7d9ef',
            align: 'center'
        })
            .setOrigin(0.5, 0.5)
            .setDepth(4);

        const inicioListaY = topoCard + 160;
        const alturaLinha = Math.min(68, Math.max(54, alturaCard * 0.12));
        const larguraEtiqueta = Math.min(180, larguraCard * 0.28);

        controles.forEach(([tecla, descricao], index) => {
            const y = inicioListaY + (index * alturaLinha);
            const corLinha = index % 2 === 0 ? 0x0a2239 : 0x0c2944;

            this.add.rectangle(w / 2, y, larguraCard - 64, alturaLinha - 10, corLinha, 0.98)
                .setDepth(3);

            this.add.rectangle(esquerdaCard + 44 + (larguraEtiqueta / 2), y, larguraEtiqueta, alturaLinha - 18, 0x6fd1ff, 0.18)
                .setStrokeStyle(2, 0x6fd1ff, 0.5)
                .setDepth(4);

            this.add.text(esquerdaCard + 44 + (larguraEtiqueta / 2), y, tecla, {
                fontFamily: 'Arial Black',
                fontSize: index === 0 ? `${Math.max(16, Math.round(larguraCard * 0.025))}px` : `${Math.max(18, Math.round(larguraCard * 0.03))}px`,
                lineSpacing: index === 0 ? -4 : 0,
                wordWrap: index === 0 ? { width: larguraEtiqueta - 16 } : undefined,
                color: '#f4fbff',
                align: 'center'
            })
                .setOrigin(0.5)
                .setDepth(5);

            this.add.text(esquerdaCard + 44 + larguraEtiqueta + 26, y, descricao, {
                fontFamily: 'Arial',
                fontSize: `${Math.max(18, Math.round(larguraCard * 0.028))}px`,
                color: '#d7ecf8',
                wordWrap: { width: larguraCard - larguraEtiqueta - 130 },
                align: 'left'
            })
                .setOrigin(0, 0.5)
                .setDepth(5);
        });
    }

    /**
     * Desenha uma única tecla estilizada em 3D (ex: "E", "M", "ESC").
     * Composta por três camadas: sombra (fundo deslocado), superfície principal e reflexo no topo.
     *
     * @param {number} x - centro horizontal da tecla
     * @param {number} y - centro vertical da tecla
     * @param {string} texto - rótulo exibido na tecla
     */
    _desenharTeclaUnica(x, y, texto) {
        const largura = texto.length > 3 ? 116 : 88;
        const altura = 46;

        this.add.rectangle(x + 3, y + 4, largura, altura, 0x02111f, 0.75)
            .setDepth(3);

        this.add.rectangle(x, y, largura, altura, 0x214c73, 0.96)
            .setStrokeStyle(2, 0x79d8ff, 0.6)
            .setDepth(4);

        this.add.rectangle(x, y - 12, largura - 8, 10, 0xffffff, 0.12)
            .setDepth(5);

        this.add.text(x, y - 1, texto, {
            fontFamily: 'Arial Black',
            fontSize: texto.length > 3 ? '21px' : '24px',
            color: '#ffffff',
            align: 'center',
            stroke: '#0b2b46',
            strokeThickness: 4
        })
            .setOrigin(0.5)
            .setDepth(6);
    }

    /**
     * Desenha um grupo de teclas lado a lado (ex: W A S D).
     * Quando `teclasSecundarias` é fornecido, cada tecla principal ganha uma tecla secundária
     * logo abaixo (ex: setas direcionais sob WASD), formando duas fileiras alinhadas.
     *
     * @param {number} x - centro horizontal do grupo inteiro
     * @param {number} y - centro vertical de referência
     * @param {string[]} teclas - rótulos das teclas principais
     * @param {string[]} teclasSecundarias - rótulos das teclas secundárias (opcional)
     */
    _desenharGrupoTeclas(x, y, teclas, teclasSecundarias = []) {
        const larguraTecla = 48;
        const alturaTecla = 34;
        const espacamento = 8;
        const distanciaEntreLinhas = 6;
        const total = (teclas.length * larguraTecla) + ((teclas.length - 1) * espacamento);
        const inicioX = x - (total / 2);

        teclas.forEach((tecla, index) => {
            const posX = inicioX + (index * (larguraTecla + espacamento));
            const textoSecundario = teclasSecundarias[index];
            const mostrarDuasLinhas = Boolean(textoSecundario);

            if (mostrarDuasLinhas) {
                const ySuperior = y - alturaTecla - (distanciaEntreLinhas / 2);
                const yInferior = y + (distanciaEntreLinhas / 2);

                this.add.rectangle(posX + 3, ySuperior + 4, larguraTecla, alturaTecla, 0x02111f, 0.75)
                    .setDepth(3);

                this.add.rectangle(posX, ySuperior, larguraTecla, alturaTecla, 0x214c73, 0.96)
                    .setStrokeStyle(2, 0x79d8ff, 0.6)
                    .setDepth(4);

                this.add.rectangle(posX, ySuperior - 8, larguraTecla - 8, 8, 0xffffff, 0.12)
                    .setDepth(5);

                this.add.text(posX, ySuperior + 1, tecla, {
                    fontFamily: 'Arial Black',
                    fontSize: '20px',
                    color: '#ffffff',
                    align: 'center',
                    stroke: '#0b2b46',
                    strokeThickness: 4
                })
                    .setOrigin(0.5)
                    .setDepth(6);

                this.add.rectangle(posX + 3, yInferior + 4, larguraTecla, alturaTecla, 0x02111f, 0.75)
                    .setDepth(3);

                this.add.rectangle(posX, yInferior, larguraTecla, alturaTecla, 0x214c73, 0.96)
                    .setStrokeStyle(2, 0x79d8ff, 0.6)
                    .setDepth(4);

                this.add.rectangle(posX, yInferior - 8, larguraTecla - 8, 8, 0xffffff, 0.12)
                    .setDepth(5);

                this.add.text(posX, yInferior + 1, textoSecundario, {
                    fontFamily: 'Arial Black',
                    fontSize: '18px',
                    color: '#ffffff',
                    align: 'center',
                    stroke: '#0b2b46',
                    strokeThickness: 4
                })
                    .setOrigin(0.5)
                    .setDepth(6);
                return;
            }

            this.add.rectangle(posX + 3, y + 4, larguraTecla, alturaTecla, 0x02111f, 0.75)
                .setDepth(3);

            this.add.rectangle(posX, y, larguraTecla, alturaTecla, 0x214c73, 0.96)
                .setStrokeStyle(2, 0x79d8ff, 0.6)
                .setDepth(4);

            this.add.rectangle(posX, y - 12, larguraTecla - 8, 10, 0xffffff, 0.12)
                .setDepth(5);

            this.add.text(posX, y + 1, tecla, {
                fontFamily: 'Arial Black',
                fontSize: '24px',
                color: '#ffffff',
                align: 'center',
                stroke: '#0b2b46',
                strokeThickness: 4
            })
                .setOrigin(0.5)
                .setDepth(6);
        });
    }
}

/**
 * CenaMapa — Overlay de mapa completo da cidade.
 *
 * Exibe uma imagem estática do mapa com legenda já desenhada e sobrepõe
 * a cabeça do Marcielo na posição atual do jogador, convertida de coordenadas
 * do mundo para coordenadas de tela.
 *
 * Abertura: tecla M na CenaCidade.
 * Fechamento: tecla M ou ESC.
 */
export class CenaMapa extends Phaser.Scene {
    constructor() {
        super({ key: 'mapaScene', transparent: true });
    }

    /**
     * Recebe dados da cena de origem para posicionar o marcador corretamente.
     *
     * @param {object} data
     * @param {string} data.cenaOrigem - Chave da cena que abriu o mapa (para retomar ao fechar)
     * @param {number} data.playerX   - Posição X do jogador no mundo
     * @param {number} data.playerY   - Posição Y do jogador no mundo
     * @param {number} data.worldW    - Largura total do mundo em pixels
     * @param {number} data.worldH    - Altura total do mundo em pixels
     */
    init(data = {}) {
        this.cenaOrigem = data.cenaOrigem ?? 'gameScene';
        this.playerX   = data.playerX  ?? 0;
        this.playerY   = data.playerY  ?? 0;
        this.worldW    = data.worldW   ?? 12000;
        this.worldH    = data.worldH   ?? 8000;
    }

    /**
     * Carrega a imagem do mapa e a cabeça do Marcielo, caso ainda não estejam
     * no cache de texturas (evita recarregamento desnecessário).
     */
    preload() {
        if (!this.textures.exists('mapaLegenda')) {
            this.load.image('mapaLegenda', 'assets/imagens/mapa/mapa-cidade_2.png');
        }
        if (!this.textures.exists('marcielocabeca')) {
            this.load.image('marcielocabeca', 'assets/imagens/marcielocabeca.png');
        }
    }

    /**
     * Constrói o overlay do mapa:
     *   1. Fundo escuro semitransparente sobre a cena pausada.
     *   2. Imagem do mapa (2340×1170 px) redimensionada para caber na tela com margens.
     *   3. Marcador animado (anel pulsante + cabeça do Marcielo) na posição do jogador.
     *   4. Texto de instrução de fechamento.
     *   5. Listeners de teclado para fechar (M ou ESC).
     *
     * Conversão de coordenadas do marcador:
     *   - A imagem tem 2340 px de largura total, dos quais os primeiros 1950 px
     *     correspondem ao mapa de jogo e os 390 px restantes à legenda lateral.
     *   - Divide a posição do mundo pela dimensão do mundo para obter a fração (0–1),
     *     multiplica pela largura do mapa na imagem e aplica a escala de exibição.
     */
    create() {
        const W = this.scale.width;
        const H = this.scale.height;

        this.scene.bringToTop();
        this.cameras.main.setBackgroundColor('rgba(0,0,0,0)');

        // Fundo escuro semitransparente por cima da cena pausada
        this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.75).setDepth(0);

        // ── Imagem do mapa com legenda ──────────────────────────────────────
        // Dimensões reais da imagem fonte
        const imgW = 2340;
        const imgH = 1170;
        const margem = 20;

        // Escala uniforme que faz a imagem caber na tela sem distorção
        const escalaFit = Math.min((W - margem * 2) / imgW, (H - margem * 2) / imgH);
        const displayW = imgW * escalaFit;
        const displayH = imgH * escalaFit;

        // Posição superior-esquerda da imagem centralizada na tela
        const imgX = (W - displayW) / 2;
        const imgY = (H - displayH) / 2;

        this.add.image(imgX, imgY, 'mapaLegenda')
            .setOrigin(0, 0)
            .setDisplaySize(displayW, displayH)
            .setDepth(1);

        // ── Marcador do jogador ─────────────────────────────────────────────
        // Os primeiros 1950 px da imagem correspondem à área do mapa de jogo;
        // os 390 px restantes são a legenda lateral (não fazem parte do mundo).
        const mapaImagemW = 1950;
        const mapaImagemH = imgH;

        // Passo 1: posição do jogador no mundo → fração → posição na imagem (px)
        const pinoImgX = (this.playerX / this.worldW) * mapaImagemW;
        const pinoImgY = (this.playerY / this.worldH) * mapaImagemH;

        // Passo 2: posição na imagem → posição na tela aplicando escala e offset
        const pinoX = imgX + pinoImgX * escalaFit;
        const pinoY = imgY + pinoImgY * escalaFit;

        // Anel pulsante: parte de 28 px e expande até 2.5× enquanto some (efeito ping)
        const anel = this.add.circle(pinoX, pinoY, 28, 0xffffff, 0.35).setDepth(3);
        this.add.image(pinoX, pinoY, 'marcielocabeca').setDisplaySize(50, 50).setDepth(4);

        this.tweens.add({
            targets: anel,
            scaleX: 2.5,
            scaleY: 2.5,
            alpha: 0,
            duration: 900,
            repeat: -1,
            ease: 'Sine.easeOut',
        });

        // ── Instrução de fechamento ─────────────────────────────────────────
        this.add.text(W / 2, H - 6, 'Pressione M ou ESC para fechar', {
            fontFamily: 'Arial',
            fontSize: '12px',
            color: '#6fd1ff',
        }).setOrigin(0.5, 1).setAlpha(0.65).setDepth(3);

        // ── Fechar — retoma a cena de origem e encerra este overlay ─────────
        const fechar = () => {
            this.scene.resume(this.cenaOrigem);
            this.scene.stop();
        };
        this.input.keyboard.on('keydown-M',   fechar);
        this.input.keyboard.on('keydown-ESC', fechar);
    }
}

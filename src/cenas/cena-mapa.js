export class CenaMapa extends Phaser.Scene {
    constructor() {
        super({ key: 'mapaScene', transparent: true });
    }

    init(data = {}) {
        this.cenaOrigem = data.cenaOrigem ?? 'gameScene';
        this.playerX   = data.playerX  ?? 0;
        this.playerY   = data.playerY  ?? 0;
        this.worldW    = data.worldW   ?? 12000;
        this.worldH    = data.worldH   ?? 8000;
    }

    preload() {
        if (!this.textures.exists('mapaLegenda')) {
            this.load.image('mapaLegenda', 'assets/imagens/mapa/mapa-cidade_2.png');
        }
        if (!this.textures.exists('marcielocabeca')) {
            this.load.image('marcielocabeca', 'assets/imagens/marcielocabeca.png');
        }
    }

    create() {
        const W = this.scale.width;
        const H = this.scale.height;

        this.scene.bringToTop();
        this.cameras.main.setBackgroundColor('rgba(0,0,0,0)');

        // Overlay escuro
        this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.75).setDepth(0);

        // ── Imagem do mapa com legenda ──────────────────────────────────────
        // Ajusta para caber na tela mantendo proporção
        const imgW = 2340;
        const imgH = 1170;
        const margem = 20;
        const escalaFit = Math.min((W - margem * 2) / imgW, (H - margem * 2) / imgH);
        const displayW = imgW * escalaFit;
        const displayH = imgH * escalaFit;
        const imgX = (W - displayW) / 2;
        const imgY = (H - displayH) / 2;

        this.add.image(imgX, imgY, 'mapaLegenda')
            .setOrigin(0, 0)
            .setDisplaySize(displayW, displayH)
            .setDepth(1);

        // ── Marcador do jogador ─────────────────────────────────────────────
        // A legenda ocupa os últimos ~390px da imagem (de 1950 a 2340).
        // O mapa de jogo ocupa os primeiros 1950px horizontais da imagem.
        const mapaImagemW = 1950; // largura da área do mapa dentro da imagem
        const mapaImagemH = imgH; // altura total

        // Converte posição do mundo para posição na imagem
        const pinoImgX = (this.playerX / this.worldW) * mapaImagemW;
        const pinoImgY = (this.playerY / this.worldH) * mapaImagemH;

        // Converte posição na imagem para posição na tela
        const pinoX = imgX + pinoImgX * escalaFit;
        const pinoY = imgY + pinoImgY * escalaFit;

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

        // ── Fechar ──────────────────────────────────────────────────────────
        const fechar = () => {
            this.scene.resume(this.cenaOrigem);
            this.scene.stop();
        };
        this.input.keyboard.on('keydown-M',   fechar);
        this.input.keyboard.on('keydown-ESC', fechar);
    }
}

// Cena inicial do jogo: exibe o menu com fundo animado,
// imagem de título, loja decorativa e botões de navegação

export class CenaMenu extends Phaser.Scene {

    constructor() {
        super({ key: 'menuScene' });
    }

    preload() {
        this.load.image('nuvens', 'assets/imagens/ambiente/cloud-bg.png');
        this.load.image('ceu', 'assets/imagens/ambiente/sky-bg.png');
        this.load.image('titulo', 'assets/ui/titulo-jogo.webp');
        this.load.image('loja', 'assets/imagens/lojas/interior/store-bg.webp');
    }

    create() {

        const w = this.scale.width;
        const h = this.scale.height;

        // Fundo céu
        this.add.tileSprite(0, 0, w, h, "ceu")
            .setOrigin(0, 0)
            .setScrollFactor(0);

        // Nuvens
        this.spriteNuvens = this.add.tileSprite(0, 0, w, 250, 'nuvens')
            .setOrigin(0, 0)
            .setAlpha(0.8)
            .setScale(1.8);

        // Título
        const imagemTitulo = this.add.image(w / 2, h * 0.25, 'titulo')
            .setOrigin(0.5);

        imagemTitulo.setScale(w / imagemTitulo.width * 0.75);

        // Loja
        const imagemLoja = this.add.image(w / 2, h, 'loja')
            .setOrigin(0.5, 1);

        const escalaX = w / imagemLoja.width;
        imagemLoja.setScale(escalaX, escalaX);

        // ===============================
        // ESTILO PADRÃO DOS BOTÕES
        // ===============================

        const estiloBotao = {
            fontFamily: 'Poppins',
            fontSize: '34px',
            color: '#ffffff',
            backgroundColor: '#001caa',
            padding: { x: 20, y: 8 },
            align: 'center'
        };

        // ===============================
        // BOTÃO JOGAR
        // ===============================

        const botaoJogar = this.add.text(w/2, h/2, 'JOGAR', estiloBotao)
        .setOrigin(0.5)
        .setFixedSize(260,60)
        .setAlign('center');

        botaoJogar.setInteractive({ useHandCursor: true });

        // Muda a cor do botão ao passar o mouse por cima (efeito hover)
        botaoJogar.on('pointerover', () => {
            botaoJogar.setStyle({
                backgroundColor: '#6FB7FF',
                color: '#1B2A4A'
            });
            botaoJogar.setScale(1.05); // leve aumento de tamanho ao hover
        });

        // Restaura a cor original ao tirar o mouse
        botaoJogar.on('pointerout', () => {
            botaoJogar.setStyle({
                backgroundColor: '#001caa',
                color: '#ffffff'
            });
            botaoJogar.setScale(1);
        });

        // Inicia o jogo ao clicar e pede para abrir o tutorial sobre o mapa
        botaoJogar.on('pointerdown', () => {
            this.scene.start('gameScene', { mostrarTutorial: true });
        });

        // Animação de flutuação suave do botão (sobe e desce em loop)
        this.tweens.add({
            targets: botaoJogar,
            y: botaoJogar.y - 6,  // desloca 6px para cima
            duration: 900,         // tempo de ida em ms
            yoyo: true,            // volta automaticamente à posição original
            repeat: -1,            // repete infinitamente
            ease: 'Sine.easeInOut' // suaviza o movimento
        });

        // ===============================
        // BOTÃO TUTORIAL
        // ===============================

        const botaoConfiguracoes = this.add.text(w/2, h/2 + 80, 'CONFIGURAÇÕES', estiloBotao)
        .setOrigin(0.5)
        .setFixedSize(260,60)
        .setAlign('center');

        botaoConfiguracoes.setInteractive({ useHandCursor: true });
        botaoConfiguracoes.setFontSize('24px');
        botaoConfiguracoes.setPadding(0, 8, 0, 8);

        // Muda a cor do botão ao passar o mouse por cima (efeito hover)
        botaoConfiguracoes.on('pointerover', () => {
            botaoConfiguracoes.setStyle({
                backgroundColor: '#6FB7FF',
                color: '#1B2A4A'
            });
            botaoConfiguracoes.setScale(1.05);
        });

        // Restaura a cor original ao tirar o mouse
        botaoConfiguracoes.on('pointerout', () => {
            botaoConfiguracoes.setStyle({
                backgroundColor: '#001caa',
                color: '#ffffff'
            });
            botaoConfiguracoes.setScale(1);
        });

        // Abre a cena de configurações por cima do menu
        botaoConfiguracoes.on('pointerdown', () => {
            this.scene.pause();
            this.scene.launch('configScene', { cenaOrigem: this.scene.key });
        });

        // Animação de flutuação suave do botão (sobe e desce em loop)
        this.tweens.add({
            targets: botaoConfiguracoes,
            y: botaoConfiguracoes.y - 6,
            duration: 900,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        

    }

    update() {
        this.spriteNuvens.tilePositionX += 0.5;
    }
}

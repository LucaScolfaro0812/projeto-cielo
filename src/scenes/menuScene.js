// Cena inicial do jogo: exibe o menu com fundo animado,
// imagem de título, loja decorativa e botão para iniciar o jogo
export class menuScene extends Phaser.Scene {

    constructor() {
        // Registra a cena com a chave 'menuScene' no Scene Manager
        super({ key: 'menuScene' });
    }

    // Carrega os assets visuais necessários para o menu
    preload() {
        this.load.image('nuvens', 'assets/cloud-bg.png');   // textura das nuvens animadas
        this.load.image('ceu', 'assets/sky-bg.png');         // fundo de céu estático
        this.load.image('titulo', 'assets/titulo-jogo.webp'); // imagem do título do jogo
        this.load.image('loja', 'assets/lojas/store-bg.webp');  // imagem decorativa da loja
    }

    // Cria todos os elementos visuais e interativos do menu
    create() {

        // Obtém largura e altura da tela para posicionamento responsivo
        const w = this.scale.width;
        const h = this.scale.height;

        // Adiciona o fundo de céu cobrindo toda a tela (fixo, sem scroll)
        this.add.tileSprite(0, 0, w, h, "ceu").setOrigin(0, 0).setScrollFactor(0);

        // Adiciona as nuvens como TileSprite para permitir animação por deslocamento de textura
        this.spriteNuvens = this.add.tileSprite(0, 0, w, 250, 'nuvens').setOrigin(0, 0).setAlpha(0.8).setScale(1.8);

        // Adiciona a imagem do título centralizada horizontalmente no topo
        const imagemTitulo = this.add.image(w / 2, h * 0.25, 'titulo').setOrigin(0.5);
        // Escala o título proporcionalmente à largura da tela (80% da largura)
        imagemTitulo.setScale(w / imagemTitulo.width * 0.8);

        // Adiciona a imagem da loja na base da tela (alinhada pela borda inferior)
        const imagemLoja = this.add.image(w / 2, h, 'loja').setOrigin(0.5, 1);
        // Escala a loja para cobrir toda a largura da tela
        const escalaX = w / imagemLoja.width;
        imagemLoja.setScale(escalaX, escalaX);

        // Cria o botão de texto "JOGAR" centralizado na tela
        const botaoJogar = this.add.text(w / 2, h / 2, 'JOGAR', {
            fontFamily: 'Poppins',
            fontSize: '48px',
            color: '#ffffff',
            backgroundColor: '#001caa',
            padding: { x: 10, y: 5 },
            align: 'center'
        }).setOrigin(0.5);

        // Ativa interatividade do botão (cursor de mão ao passar o mouse)
        botaoJogar.setInteractive({ useHandCursor: true });

        // Muda estilo ao passar o mouse por cima (hover)
        botaoJogar.on('pointerover', () => {
            botaoJogar.setStyle({ backgroundColor: '#6FB7FF', color: '#1B2A4A' });
            botaoJogar.setScale(1.1); // leve aumento de escala
        });

        // Restaura estilo ao retirar o mouse (hover out)
        botaoJogar.on('pointerout', () => {
            botaoJogar.setStyle({ backgroundColor: '#1C6ED5', color: '#ffffff' });
            botaoJogar.setScale(1);
        });

        // Ao clicar, inicia a cena principal do jogo
        botaoJogar.on('pointerdown', () => this.scene.start('gameScene'));

        // Animação de "pulsação" (sobe e desce) no botão continuamente
        this.tweens.add({
            targets: botaoJogar,
            y: botaoJogar.y - 10,  // desloca 10px para cima
            duration: 800,          // duração de cada ciclo em ms
            yoyo: true,             // volta à posição original automaticamente
            repeat: -1,             // repete infinitamente
            ease: 'Sine.easeInOut' // curva suave de aceleração
        });
    }

    // Executado a cada frame: anima as nuvens deslocando a textura horizontalmente
    update() {
        this.spriteNuvens.tilePositionX += 0.5; // velocidade do movimento das nuvens
    }
}

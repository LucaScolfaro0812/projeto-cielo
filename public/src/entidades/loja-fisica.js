// Importa a classe de porta/entrada para transição de cena
import Entrada from './loja-entrar.js';

// Classe que representa uma loja no mapa do jogo.
// Herda de Phaser.Physics.Arcade.Sprite para ter corpo físico e colisão.
// Cada loja cria automaticamente uma porta (Entrada) para trocar de cena.
export default class LojaFisica extends Phaser.Physics.Arcade.Sprite {

    // Cria a loja na posição (x, y) da cena informada
    // cenaDaLoja: nome da cena que será iniciada ao entrar na loja
    constructor(cena, x, y, spriteLoja, cenaDaLoja, nomeDaLoja) {

        // Chama o construtor do Sprite usando a textura 'lojaCupCake'
        super(cena, x, y, spriteLoja);

        // Adiciona o sprite visualmente na cena
        cena.add.existing(this);

        // Ativa o corpo físico do sprite no sistema Arcade
        cena.physics.add.existing(this);

        // Armazena referência da cena para uso interno
        this.cena = cena;

        // Guarda a key da cena de destino ao entrar na loja
        this.cenaDaLoja = cenaDaLoja;

        // Guarda o nome da cena de destino ao entrar na loja
        this.nomeDaLoja = nomeDaLoja;

        // Impede que a loja seja empurrada por colisões físicas
        this.body.setImmovable(true);

        this.body.setSize(500, 250);

        // Define o ponto de origem do sprite na base central (para alinhar ao chão)
        this.setOrigin(0.5, 1);

        const ajusteX = -5;   // Ex: 10 para direita, -10 para esquerda
        const ajusteY = -95;  // Ex: 40 para baixo, -40 para cima

        const portaTexture = cena.textures.get('entrada_animada');
        const portaWidth = portaTexture.getSourceImage().width;
        const portaHeight = portaTexture.getSourceImage().height;

        this.portaGlow = cena.add.rectangle(
        x + ajusteX, 
        y + ajusteY, 
        portaWidth + -103, // 20 pixels mais largo
        portaHeight + 35, // 20 pixels mais alto
        0xffffff // Cor branca pura
        );

        this.portaGlow.setDepth(130); 
    
        // Mesma escala da porta para alinhar
        this.portaGlow.setScale(1.5); 
        
        this.portaGlow.setBlendMode(Phaser.BlendModes.ADD);
        this.portaGlow.setAlpha(0.25);

        // Faz o brilho pulsar
        cena.tweens.add({
            targets: this.portaGlow,
            alpha: 0.01,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Cria a porta de entrada posicionada no mesmo local da loja
        this.porta = new Entrada(
            cena,          // cena onde a porta será criada
            x,             // posição X da porta (mesma da loja)
            y,             // posição Y da porta (mesma da loja)
            cena,          // contexto da cena para o Scene Manager
            cenaDaLoja     // nome da cena de destino ao colidir
        );

        this.porta.brilho = this.portaGlow;
    }

    static preload(scene){
        //scene.load.image('loja' + lojaSprite, `assets/loja${lojaSprite}.png`);
        Entrada.preload(scene);
    }

    // Retorna a porta criada por esta loja
    // Usado pela cena para configurar a colisão com o jogador
    getPorta() {
        return this.porta;
    }
}

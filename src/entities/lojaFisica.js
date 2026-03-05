// Importa a classe de porta/entrada para transição de cena
import Entrada from './lojaEntrar.js';

// Classe que representa uma loja no mapa do jogo.
// Herda de Phaser.Physics.Arcade.Sprite para ter corpo físico e colisão.
// Cada loja cria automaticamente uma porta (Entrada) para trocar de cena.
export default class LojaFisica extends Phaser.Physics.Arcade.Sprite {

    // Cria a loja na posição (x, y) da cena informada
    // cenaDaLoja: nome da cena que será iniciada ao entrar na loja
    constructor(cena, x, y, spriteLoja, cenaDaLoja, nomeDaLoja) {

        // Chama o construtor do Sprite usando a textura 'lojaCupCake'
        super(cena, x, y, spriteLoja);

        // Armazena referência da cena para uso interno
        this.cena = cena;

        // Adiciona o sprite visualmente na cena
        cena.add.existing(this);

        // Ativa o corpo físico do sprite no sistema Arcade
        cena.physics.add.existing(this);

        // Guarda a key da cena de destino ao entrar na loja
        this.cenaDaLoja = cenaDaLoja;

        // Guarda o nome da cena de destino ao entrar na loja
        this.nomeDaLoja = nomeDaLoja;

        // Impede que a loja seja empurrada por colisões físicas
        this.body.setImmovable(true);

        // Define o ponto de origem do sprite na base central (para alinhar ao chão)
        this.setOrigin(0.5, 1);

        // Cria a porta de entrada posicionada no mesmo local da loja
        this.porta = new Entrada(
            cena,          // cena onde a porta será criada
            x,             // posição X da porta (mesma da loja)
            y,             // posição Y da porta (mesma da loja)
            cena,          // contexto da cena para o Scene Manager
            cenaDaLoja     // nome da cena de destino ao colidir
        );
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

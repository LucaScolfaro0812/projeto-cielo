// Classe responsável por representar uma porta/entrada
// que permite a transição entre cenas
export default class Entrada extends Phaser.Physics.Arcade.Sprite {

    /**
     * @param {Phaser.Scene} cena - Cena onde o objeto será criado
     * @param {number} x - Posição horizontal da entrada
     * @param {number} y - Posição vertical da entrada
     * @param {Phaser.Scene} cenaAtual - Referência da cena atual
     * @param {string} proximaCenaNome - Nome da cena para onde será feita a transição
     */
    constructor(cena, x, y, cenaAtual, proximaCenaNome) {

        // Chama o construtor da classe Sprite com física Arcade
        // Define a textura como 'entrada'
        super(cena, x, y, 'entrada');

        // Armazena referência da cena atual (caso seja necessário controle futuro)
        this.cenaAtual = cenaAtual;

        // Guarda o nome da próxima cena para transição
        this.proximaCenaNome = proximaCenaNome;

        // Adiciona o sprite na cena
        cena.add.existing(this);

        // Ativa o corpo físico do objeto
        cena.physics.add.existing(this);

        // Define o corpo como imóvel (não reage a forças ou colisões físicas)
        this.body.setImmovable(true);

        // Ajusta a escala da imagem
        this.setScale(0.8);
    }

    /**
     * Realiza a troca de cena utilizando o Scene Manager do Phaser
     */
    trocarDeCena() {

        // Inicia a próxima cena registrada
        this.scene.scene.start(this.proximaCenaNome);
    }
}
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

        // Inicializa um estado interno da porta dizendo que ainda não houve transição.
        this.trocaDeCenaEmAndamento = false;

        // Adiciona o sprite na cena
        cena.add.existing(this);

        // Ativa o corpo físico do objeto
        cena.physics.add.existing(this);

        // Define o corpo como imóvel (não reage a forças ou colisões físicas)
        this.body.setImmovable(true);

        // Ajusta a escala da imagem
        this.setScale(0.7);

        // Define a posição do pivot
        this.setOrigin(0.5, 1);
    }

    static preload(scene) {
        scene.load.image('entrada', 'assets/entrada.png');
    }

    /**
     * Realiza a troca de cena utilizando o Scene Manager do Phaser
     */
    trocarDeCena() {

        // Se a troca já começou, ignora novas chamadas.
        if (this.trocaDeCenaEmAndamento) {
            return;
        }

        // Marca que a troca está em andamento antes de chamar o start.
        this.trocaDeCenaEmAndamento = true;

        // Executa a troca de cena normalmente.
        this.scene.scene.start(this.proximaCenaNome);
    }
}
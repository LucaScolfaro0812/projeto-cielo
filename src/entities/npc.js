// Classe responsável por representar um NPC interativo no jogo.
// O NPC pode estar associado a um conjunto de perguntas (quiz)
// e possui controle de estado (ex: se já vendeu ou não).
export default class Npc extends Phaser.Physics.Arcade.Sprite {

    /**
     * @param {Phaser.Scene} cena - Cena onde o NPC será criado
     * @param {number} x - Posição horizontal inicial
     * @param {number} y - Posição vertical inicial
     * @param {Array} perguntas - Lista de perguntas associadas ao NPC
     * @param {string} chaveImagemQuiz - Chave da imagem usada no quiz (opcional)
     */
    constructor(cena, x, y, perguntas, chaveImagemQuiz = "npc") {

        // Chama o construtor da classe Sprite com física Arcade
        // Define a textura padrão como "npc"
        super(cena, x, y, "npc");

        // Adiciona o NPC à cena
        cena.add.existing(this);

        // Ativa o sistema de física para o NPC
        cena.physics.add.existing(this);

        // Impede que o NPC seja movido por colisões físicas
        this.body.setImmovable(true);

        // Impede que o NPC saia dos limites do mundo
        this.setCollideWorldBounds(true);

        // Ajusta a escala visual do NPC
        this.setScale(0.4);

        // Armazena as perguntas associadas a este NPC
        this.perguntas = perguntas;

        // Controla se o NPC já realizou sua ação principal (ex: venda)
        this.vendeu = false;

        // Guarda a chave da imagem usada na interface do quiz
        this.chaveImagemNpc = chaveImagemQuiz;
    }

    /**
     * Método chamado a cada frame pela cena (caso seja utilizado).
     * Atualmente vazio, mas pode ser expandido para:
     * - Animações
     * - Movimento automático
     * - Lógica de comportamento
     */
    update(){
        // Lógica futura do NPC pode ser implementada aqui
    }
}
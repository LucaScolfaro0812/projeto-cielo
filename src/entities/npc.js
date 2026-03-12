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
    * @param {string|null} idNpc - Identificador persistente do NPC para regras de negócio
     */
    constructor(cena, x, y, perguntas, chaveImagemQuiz = "npc-vermelho", idNpc = null, nomeLoja = "") {

        // Chama o construtor da classe Sprite com física Arcade
        // Define a textura padrão como "npc-vermelho"
        super(cena, x, y, "npc-vermelho");

        // Adiciona o NPC à cena
        cena.add.existing(this);

        // Ativa o sistema de física para o NPC
        cena.physics.add.existing(this);

        this.cena = cena;
        
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

        // Identificador único do NPC para persistência de progresso.
        this.idNpc = idNpc;
    }

    // método estático para carregar as imagens do npc
    static preload(scene, nomeLoja) {
        console.log("Carregando imagens do NPC para a cena: " + scene.nomeLoja);
        // Mantem a chave antiga por compatibilidade e cria uma chave explicita para o visual azul.
        scene.load.image('npc', 'assets/npc.png');
        scene.load.image('npc-azul', 'assets/Personagens/npc' + 'Azul' + scene.nomeLoja + '.png');
        scene.load.image("npc-vermelho", "assets/Personagens/npc-vermelho" + "Vermelho" + scene.nomeLoja + '.png');
    }

    /**
     * Método chamado a cada frame pela cena (caso seja utilizado).
     * Atualmente vazio, mas pode ser expandido para:
     * - Animações
     * - Movimento automático
     * - Lógica de comportamento
     */
    update() {
        // Lógica futura do NPC pode ser implementada aqui
    }
}
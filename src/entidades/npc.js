// Classe responsavel por representar um NPC interativo no jogo.
// O NPC pode estar associado a um conjunto de perguntas (quiz)
// e possui controle de estado (ex: se ja vendeu ou nao).
export default class Npc extends Phaser.Physics.Arcade.Sprite {

    /**
     * @param {Phaser.Scene} cena - Cena onde o NPC sera criado
     * @param {number} x - Posicao horizontal inicial
     * @param {number} y - Posicao vertical inicial
     * @param {Array} perguntas - Lista de perguntas associadas ao NPC
     * @param {string} chaveImagemQuiz - Chave da imagem usada no quiz (opcional)
     * @param {string|null} idNpc - Identificador persistente do NPC para regras de negocio
     */
    constructor(cena, x, y, perguntas, chaveImagemQuiz = "npc-vermelho", idNpc = null, nomeLoja = "") {

        // Chama o construtor da classe Sprite com fisica Arcade
        // Define a textura padrao como "npc-vermelho"
        super(cena, x, y, "npc-vermelho");

        // Adiciona o NPC a cena
        cena.add.existing(this);

        // Ativa o sistema de fisica para o NPC
        cena.physics.add.existing(this);

        this.cena = cena;

        // Ajusta a escala visual do NPC
        this.setScale(0.3);
        this.setOrigin(0.5, 0.5);

        // Impede que o NPC seja movido por colisoes fisicas
        this.body.setImmovable(true);

        this.body.setSize(800, 1200);

        // Armazena as perguntas associadas a este NPC
        this.perguntas = perguntas;

        // Controla se o NPC ja realizou sua acao principal (ex: venda)
        this.vendeu = false;

        // Guarda a chave da imagem usada na interface do quiz
        this.chaveImagemNpc = chaveImagemQuiz;

        // Identificador unico do NPC para persistencia de progresso.
        this.idNpc = idNpc;
    }

    setVisualConquista(estado) {
        const sufixoLoja = this.cena.nomeLoja === undefined ? "" : this.cena.nomeLoja;
        const texturaPadrao = "npc" + sufixoLoja;
        const texturaConquistado = "npc-azul" + sufixoLoja;
        const texturaNaoConquistado = "npc-vermelho" + sufixoLoja;

        if (estado === "conquistado") {
            this.setTexture(texturaConquistado);
        } else if (estado === "nao-conquistado") {
            this.setTexture(texturaNaoConquistado);
        } else {
            this.setTexture(texturaPadrao);
        }

        this.chaveImagemNpc = this.texture.key;
    }

    // Metodo estatico para carregar as imagens do npc
    static preload(scene) {
        if (scene.nomeLoja === undefined) {
            scene.load.image("npc", "assets/sprites/personagens/npc.png");
            scene.load.image("npc-azul", "assets/sprites/personagens/npc.png");
            scene.load.image("npc-vermelho", "assets/sprites/personagens/npc.png");
            return;
        }

        // Mantem a chave antiga por compatibilidade e cria uma chave explicita para o visual azul.
        scene.load.image("npc" + scene.nomeLoja, "assets/sprites/personagens/npc.png");
        scene.load.image("npc-azul" + scene.nomeLoja, "assets/sprites/personagens/npcAzul" + scene.nomeLoja + ".png");
        scene.load.image("npc-vermelho" + scene.nomeLoja, "assets/sprites/personagens/npcVermelho" + scene.nomeLoja + ".png");
    }

    visualConquistado() {
        const nomeTextura = "npc-azul" + (this.cena.nomeLoja === undefined ? "" : this.cena.nomeLoja);
        if (this.scene.textures.exists(nomeTextura)) {
            this.setTexture(nomeTextura);
        }

        // Animacao de confetes
        this.lancarConfetes();
    }

    lancarConfetes() {
        const cores = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0xffa500];
        const totalConfetes = 80;

        for (let i = 0; i < totalConfetes; i++) {
            const cor = cores[Phaser.Math.Between(0, cores.length - 1)];

            // Cria um retangulo colorido como confete
            const confete = this.scene.add.rectangle(
                this.x,
                this.y,
                Phaser.Math.Between(6, 12),
                Phaser.Math.Between(6, 12),
                cor
            );

            // Animacao de cada confete
            this.scene.tweens.add({
                targets: confete,
                x: this.x + Phaser.Math.Between(-150, 150),
                y: this.y + Phaser.Math.Between(-200, 50),
                alpha: { from: 1, to: 0 },
                angle: Phaser.Math.Between(-360, 360),
                duration: Phaser.Math.Between(800, 1500),
                ease: "Power2",
                onComplete: () => {
                    confete.destroy();
                }
            });
        }
    }

    visualNaoConquistado() {
        this.setTexture("npc-vermelho" + (this.cena.nomeLoja === undefined ? "" : this.cena.nomeLoja));
    }

    /**
     * Metodo chamado a cada frame pela cena (caso seja utilizado).
     * Atualmente vazio, mas pode ser expandido para:
     * - Animacoes
     * - Movimento automatico
     * - Logica de comportamento
     */
    update() {
        // Logica futura do NPC pode ser implementada aqui
    }
}

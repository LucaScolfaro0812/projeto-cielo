export default class CenaFinal extends Phaser.Scene {
    constructor() {
        super({ key: 'cenaFinal' });
    }

    preload() {
        this.load.image('cieloVazia', 'assets/imagens/central-cielo/cieloVazia.png');
        this.load.image('cieloBalcao', 'assets/imagens/central-cielo/cieloBalcao.png');
        this.load.image('cieloComputador', 'assets/imagens/central-cielo/cieloComputador.png');
        this.load.image('cieloFiltro', 'assets/imagens/central-cielo/cieloFiltro.png');
        this.load.image('cieloPlaca', 'assets/imagens/central-cielo/cieloPlaca.png');
        this.load.image('cieloNPC', 'assets/imagens/central-cielo/cieloNPC.png');
        this.load.image('NPCAzulAutoescola', 'assets/sprites/personagens/npcAzulAutoEscola.png');
        this.load.image('NPCAzulCafe', 'assets/sprites/personagens/npcAzulCafe.png');
        this.load.image('NPCAzulGames', 'assets/sprites/personagens/npcAzulGames.png');
        this.load.image('NPCAzulBeleza', 'assets/sprites/personagens/npcAzulBeleza.png');
        this.load.image('NPCAzulRoupas', 'assets/sprites/personagens/npcAzulRoupas.png');
        this.load.image('NPCAzulPet', 'assets/sprites/personagens/npcAzulPet.png');
        this.load.image('NPCAzulMovel', 'assets/sprites/personagens/npcAzulMovel.png');
        this.load.image('NPCAzulFrutaria', 'assets/sprites/personagens/npcAzulFrutaria.png');
        this.load.image('NPCAzulLanchonete', 'assets/sprites/personagens/npcAzulLanchonete.png');
        this.load.image('NPCAzulChocolate', 'assets/sprites/personagens/npcAzulChocolate.png');
        this.load.image('NPCAzulPelucia', 'assets/sprites/personagens/npcAzulPelucia.png');
        this.load.image('NPCAzulJoalheria', 'assets/sprites/personagens/npcAzulJoalheria.png');
    }

    create() {
    const w = this.scale.width;
    const h = this.scale.height;

    // Fundo ocupando a tela inteira
    this.add.image(0, 0, 'cieloVazia')
        .setOrigin(0, 0)
        .setDisplaySize(w, h);

    // Elementos da cena
    this.filtro     = this.physics.add.staticImage(2000, 400, 'cieloFiltro').setScale(0.4);
    this.computador = this.physics.add.staticImage(2130, 750, 'cieloComputador').setScale(0.4);
    this.placa      = this.physics.add.staticImage(w * 0.5, 120, 'cieloPlaca').setScale(0.5);
    this.balcao     = this.physics.add.staticImage(w * 0.5, 380, 'cieloBalcao').setScale(0.5);
    this.npc        = this.physics.add.staticImage(w * 0.5, 290, 'cieloNPC').setScale(0.35); // menor, proporcional ao balcão

    // NPCs alinhados na base da tela — maiores, levemente cortados embaixo
    const npcY = h * 0.9; // um pouco abaixo da tela para cortar as pernas
    const npcScale = 0.5;

    this.physics.add.staticImage(w * 0.03, npcY, 'NPCAzulAutoescola').setScale(npcScale);
    this.physics.add.staticImage(w * 0.10, npcY, 'NPCAzulCafe').setScale(npcScale);
    this.physics.add.staticImage(w * 0.17, npcY, 'NPCAzulGames').setScale(npcScale);
    this.physics.add.staticImage(w * 0.24, npcY, 'NPCAzulBeleza').setScale(npcScale);
    this.physics.add.staticImage(w * 0.31, npcY, 'NPCAzulRoupas').setScale(npcScale);
    this.physics.add.staticImage(w * 0.38, npcY, 'NPCAzulPet').setScale(npcScale);
    this.physics.add.staticImage(w * 0.45, npcY, 'NPCAzulMovel').setScale(npcScale);
    this.physics.add.staticImage(w * 0.52, npcY, 'NPCAzulFrutaria').setScale(npcScale);
    this.physics.add.staticImage(w * 0.58, npcY, 'NPCAzulLanchonete').setScale(npcScale);
    this.physics.add.staticImage(w * 0.65, npcY, 'NPCAzulChocolate').setScale(npcScale);
    this.physics.add.staticImage(w * 0.72, npcY, 'NPCAzulPelucia').setScale(npcScale);
    this.physics.add.staticImage(w * 0.79, npcY, 'NPCAzulJoalheria').setScale(npcScale);
}
}
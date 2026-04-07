export default class CenaFinal extends Phaser.Scene {
    constructor() {
        super({ key: 'cenaFinal' });
    }

    preload() {
        this.load.image('cieloVazia', 'assets/imagens/central-cielo/cieloVazia.png');
        this.load.image('cieloBalcao', 'assets/imagens/central-cielo/cieloBalcao.png');
        this.load.image('cieloComputador', 'assets/imagens/central-cielo/cieloComputador.png');
        this.load.image('cieloFiltro', 'assets/imagens/central-cielo/cieloFiltro.png');
        this.load.image('cieloPlanta', 'assets/imagens/central-cielo/cieloPlanta.png');
        this.load.image('cieloPlaca', 'assets/imagens/central-cielo/cieloPlaca.png');
        this.load.image('cieloNPC', 'assets/imagens/central-cielo/cieloNPC.png');
        this.load.image('NPCAzulAutoescola', 'assets/spites/personagens/npcAzulAutoEscola.png');
        this.load.image('NPCAzulCafe', 'assets/spites/personagens/npcAzulCafe.png');
        this.load.image('NPCAzulGames', 'assets/spites/personagens/npcAzulGames.png');
        this.load.image('NPCAzulBeleza', 'assets/spites/personagens/npcAzulBeleza.png');
        this.load.image('NPCAzulRoupas', 'assets/spites/personagens/npcAzulRoupas.png');
        this.load.image('NPCAzulPet', 'assets/spites/personagens/npcAzulPet.png');
        this.load.image('NPCAzulMovel', 'assets/spites/personagens/npcAzulMovel.png');
        this.load.image('NPCAzulFrutaria', 'assets/spites/personagens/npcAzulFrutaria.png');
        this.load.image('NPCAzulLanchonete', 'assets/spites/personagens/npcAzulLanchonete.png');
    }

    create() {
    const w = this.scale.width;
    const h = this.scale.height;

    // Fundo ocupando a tela inteira
    this.add.image(0, 0, 'cieloVazia')
        .setOrigin(0, 0)
        .setDisplaySize(w, h);

    // Elementos da cena
    this.filtro = this.physics.add.staticImage(2000, 400, 'cieloFiltro').setScale(0.4);
    this.planta = this.physics.add.staticImage(100, 450, 'cieloPlanta').setScale(0.4);
    this.computador = this.physics.add.staticImage(2130, 750, 'cieloComputador').setScale(0.4);
    this.placa = this.physics.add.staticImage(w * 0.5, 120, 'cieloPlaca').setScale(0.5);
    this.balcao = this.physics.add.staticImage(w * 0.5, 470, 'cieloBalcao').setScale(0.5);
    this.npc = this.physics.add.staticImage(w * 0.5, 380, 'cieloNPC').setScale(0.5);

    // NPCs espalhados pela tela
    this.physics.add.staticImage(w * 0.1,  h * 0.5, 'NPCAzulAutoescola').setScale(0.4);
    this.physics.add.staticImage(w * 0.2,  h * 0.6, 'NPCAzulCafe').setScale(0.4);
    this.physics.add.staticImage(w * 0.3,  h * 0.5, 'NPCAzulGames').setScale(0.4);
    this.physics.add.staticImage(w * 0.4,  h * 0.6, 'NPCAzulBeleza').setScale(0.4);
    this.physics.add.staticImage(w * 0.5,  h * 0.7, 'NPCAzulRoupa').setScale(0.4);
    this.physics.add.staticImage(w * 0.6,  h * 0.5, 'NPCAzulPet').setScale(0.4);
    this.physics.add.staticImage(w * 0.7,  h * 0.6, 'NPCAzulMovel').setScale(0.4);
    this.physics.add.staticImage(w * 0.8,  h * 0.5, 'NPCAzulFrutaria').setScale(0.4);
    this.physics.add.staticImage(w * 0.9,  h * 0.6, 'NPCAzulLanchonete').setScale(0.4);
}
}
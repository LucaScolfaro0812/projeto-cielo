export default class CenaFinal extends Phaser.Scene {
    constructor() {
        super({ key: 'cenaFinal' });
    }

    preload() {
        this.load.image('cieloVazia',        'assets/imagens/central-cielo/cieloVazia.png');
        this.load.image('cieloBalcao',       'assets/imagens/central-cielo/cieloBalcao.png');
        this.load.image('cieloComputador',   'assets/imagens/central-cielo/cieloComputador.png');
        this.load.image('cieloFiltro',       'assets/imagens/central-cielo/cieloFiltro.png');
        this.load.image('cieloPlaca',        'assets/imagens/central-cielo/cieloPlaca.png');
        this.load.image('cieloNPC',          'assets/imagens/central-cielo/cieloNPC.png');
        this.load.image('trofeu',            'assets/ui/trofeuCenaFinal.png');
        this.load.image('NPCAzulAutoescola', 'assets/sprites/personagens/npcAzulAutoEscola.png');
        this.load.image('NPCAzulCafe',       'assets/sprites/personagens/npcAzulCafe.png');
        this.load.image('NPCAzulGames',      'assets/sprites/personagens/npcAzulGames.png');
        this.load.image('NPCAzulBeleza',     'assets/sprites/personagens/npcAzulBeleza.png');
        this.load.image('NPCAzulRoupas',     'assets/sprites/personagens/npcAzulRoupas.png');
        this.load.image('NPCAzulPet',        'assets/sprites/personagens/npcAzulPet.png');
        this.load.image('NPCAzulMovel',      'assets/sprites/personagens/npcAzulMovel.png');
        this.load.image('NPCAzulFrutaria',   'assets/sprites/personagens/npcAzulFrutaria.png');
        this.load.image('NPCAzulLanchonete', 'assets/sprites/personagens/npcAzulLanchonete.png');
        this.load.image('NPCAzulChocolate',  'assets/sprites/personagens/npcAzulChocolate.png');
        this.load.image('NPCAzulPelucia',    'assets/sprites/personagens/npcAzulPelucia.png');
        this.load.image('NPCAzulJoalheria',  'assets/sprites/personagens/npcAzulJoalheria.png');
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
        this.npc        = this.physics.add.staticImage(w * 0.5, 290, 'cieloNPC').setScale(0.35);

        // 1 - Troféu em cima do balcão
        this.trofeu = this.physics.add.staticImage(w * 0.40, 340, 'trofeu').setScale(0.2);
        
        // 2 - NPCs alinhados na base, levemente cortados, mais espaçados
        const npcY     = h * 0.9;
        const npcScale = 0.6;
        const npcs = [
            'NPCAzulAutoescola',
            'NPCAzulCafe',
            'NPCAzulGames',
            'NPCAzulBeleza',
            'NPCAzulRoupas',
            'NPCAzulPet',
            'NPCAzulMovel',
            'NPCAzulFrutaria',
            'NPCAzulLanchonete',
            'NPCAzulChocolate',
            'NPCAzulPelucia',
            'NPCAzulJoalheria',
        ];
        // Distribui os 12 NPCs igualmente pela largura da tela
        npcs.forEach((key, i) => {
            const x = w * (0.04 + i * (0.92 / (npcs.length - 1)));
            this.physics.add.staticImage(x, npcY, key).setScale(npcScale);
        });
    }
}
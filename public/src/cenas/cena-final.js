export default class CenaFinal extends Phaser.Scene {
    constructor() {
        super({ key: 'cenaFinal' });
    }

    preload() {
        const w = this.scale.width;
        const h = this.scale.height;

        // Fundo da Cielo Vazia
        this.add.image( 'cieloVazia','assets/imagens/central-cielo/cieloVazia.png').setOrigin(0).setDisplaySize(w, h);
         this.load.image('cieloBalcão', 'assets/imagens/central-cielo/cieloBalcao.png');
        this.load.image('cieloComputador', 'assets/imagens/central-cielo/cieloComputador.png');
        this.load.image('cieloFiltro', 'assets/imagens/central-cielo/cieloFiltro.png');
        this.load.image('cieloPlanta', 'assets/imagens/central-cielo/cieloPlanta.png');
        this.load.image('cieloPlaca', 'assets/imagens/central-cielo/cieloPlaca.png');
        this.load.image('cieloNPC', 'assets/imagens/central-cielo/cieloNPC.png');    
    }

    create() {
        this.balcao = this.physics.add.staticImage(1150, 470, 'cieloBalcão');
        this.filtro = this.physics.add.staticImage(2000, 400, 'cieloFiltro');
        this.planta = this.physics.add.staticImage(100, 450, 'cieloPlanta');
        this.computador = this.physics.add.staticImage(2130, 750, 'cieloComputador');
        this.placa = this.physics.add.staticImage(1140, 120, 'cieloPlaca');
        this.npc = this.physics.add.staticImage(1160, 380, 'cieloNPC');

    }
}

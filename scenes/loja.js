import Entrada from './lojaEntrar.js';

export default class Loja extends Phaser.Physics.Arcade.Sprite{
    constructor(cena, x, y, cenaDaLoja){
        super(cena, x, y, 'lojaCupCake');

        // Armazena referência da cena atual (caso seja necessário controle futuro)
        this.cena = cena;

        // Adiciona o sprite na cena
        cena.add.existing(this);

        // Ativa o corpo físico do objeto
        cena.physics.add.existing(this);

        // Guarda o nome da próxima cena para transição
        this.cenaDaLoja = cenaDaLoja;

        // Define o corpo como imóvel (não reage a forças ou colisões físicas)
        this.body.setImmovable(true);

        // Define a posição do pivot
        this.setOrigin(0.5, 1);

        // Porta da loja
        this.porta = new Entrada(
            cena,          // referência da cena atual
            x,           // posição X
            y,          // posição Y
            cena,          // contexto da cena
            'padariaScene' // nome da cena de destino
        );      
    }

    getPorta(){
        return this.porta;
    }
}
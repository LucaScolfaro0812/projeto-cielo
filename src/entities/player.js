// Classe responsável por representar o jogador controlável.
// Herda de Phaser.Physics.Arcade.Sprite para utilizar física Arcade.
export default class Player extends Phaser.Physics.Arcade.Sprite {

    /**
     * @param {Phaser.Scene} cena - Cena onde o jogador será criado
     * @param {number} x - Posição horizontal inicial
     * @param {number} y - Posição vertical inicial
     */
    constructor(cena, x, y) {

        // Chama o construtor da classe base informando a textura 'player'
        super(cena, x, y, 'player');

        // Adiciona o sprite à cena
        cena.add.existing(this);

        // Habilita o corpo físico do jogador
        cena.physics.add.existing(this);

        // Ajusta escala visual
        this.setScale(0.8);

        // Define se o jogador colide com os limites do mundo
        this.setCollideWorldBounds(false);

        // Velocidade base de movimentação
        this.velocidade = 350;

        // Mapeamento das teclas WASD para movimentação
        this.teclas = this.scene.input.keyboard.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Cria animações associadas ao jogador
        this._criarAnimacoes(cena);
    }

    static preload(scene) {
        scene.load.spritesheet('player', 'assets/marcielo.png', {
            frameWidth: 128,
            frameHeight: 128
        });
    
        // animação lateral
        scene.load.image("f1","assets/animations/player/marcielo.f1.png");
        scene.load.image("f2","assets/animations/player/marcielo.f2.png");
        scene.load.image("f3","assets/animations/player/marcielo.f3.png");
        scene.load.image("f4","assets/animations/player/marcielo.f4.png");
        scene.load.image("f5","assets/animations/player/marcielo.f5.png");
        scene.load.image("f6","assets/animations/player/marcielo.f6.png");
        scene.load.image("f7","assets/animations/player/marcielo.f7.png");
        scene.load.image("f8","assets/animations/player/marcielo.f8.png");

        // animação para baixo
        scene.load.image("s1","assets/animations/player/marcielo.s1.png");
        scene.load.image("s2","assets/animations/player/marcielo.s2.png");
        scene.load.image("s3","assets/animations/player/marcielo.s3.png");
        scene.load.image("s4","assets/animations/player/marcielo.s4.png");
        scene.load.image("s5","assets/animations/player/marcielo.s5.png");
        scene.load.image("s6","assets/animations/player/marcielo.s6.png");

        // parado
        scene.load.image("idle","assets/animations/player/marcielo.parado.png");

        // animação para cima
        scene.load.image("c1","assets/animations/player/marcielo.c1.png");
        scene.load.image("c2","assets/animations/player/marcielo.c2.png");
        scene.load.image("c3","assets/animations/player/marcielo.c3.png");
        scene.load.image("c4","assets/animations/player/marcielo.c4.png");
        scene.load.image("c5","assets/animations/player/marcielo.c5.png");
        scene.load.image("c6","assets/animations/player/marcielo.c6.png");
    }

    /**
     * Método chamado a cada frame pela cena
     */
    update() {
        this._movimentar();
    }

    /**
     * Controla a movimentação do jogador com normalização de vetor,
     * evitando que o movimento diagonal seja mais rápido.
     */
    _movimentar() {

        // Reseta velocidade a cada frame
        this.setVelocity(0);

        let movendo = false;

        // Vetor de direção [x, y]
        let forca = [0, 0];

        // Movimentação horizontal
        if (this.teclas.A.isDown) {
            forca[0] = -1;
            this.anims.play("andar-esquerda", true);
            movendo = true;
        }

        if (this.teclas.D.isDown) {
            forca[0] = 1;
            this.anims.play("andar-direita", true);
            movendo = true;
        }

        // Movimentação vertical
        if (this.teclas.W.isDown) {
            forca[1] = -1;
            this.anims.play("andar-cima", true);
            movendo = true;
        }

        if (this.teclas.S.isDown) {
            forca[1] = 1;
            this.anims.play("andar-baixo", true);
            movendo = true;
        }

        // Calcula o módulo do vetor para normalizar
        const modulo = Math.sqrt(forca[0] * forca[0] + forca[1] * forca[1]);

        // Normalização do vetor (evita velocidade maior na diagonal)
        if (modulo > 0) {
            forca[0] /= modulo;
            forca[1] /= modulo;
        }

        // Aplica velocidade ao vetor normalizado
        forca[0] *= this.velocidade;
        forca[1] *= this.velocidade;

        // Define velocidade final no corpo físico
        this.setVelocity(forca[0], forca[1]);

        // Se não estiver se movendo, para a animação
        if (!movendo) {
            this.anims.stop();
        }
    }

    /**
     * Cria animações do jogador associadas às direções.
     * As animações são registradas no Animation Manager da cena.
     */
    _criarAnimacoes(cena) {

        cena.anims.create({
            key: "andar-direita",
            frames: [
            {key:"f1"},
            {key:"f2"},
            {key:"f3"},
            {key:"f4"},
            {key:"f5"},
            {key:"f6"},
            {key:"f7"},
            {key:"f8"}
        ],
        frameRate: 6,
        repeat: -1
        });

        cena.anims.create({
            key: "andar-esquerda",
            frames: [
            {key:"f1"},
            {key:"f2"},
            {key:"f3"},
            {key:"f4"},
            {key:"f5"},
            {key:"f6"},
            {key:"f7"},
            {key:"f8"}
        ],
        frameRate: 6,
        repeat: -1
        });
    

        cena.anims.create({
            key: "andar-cima",
            frames: [
        { key: "c1" },
        { key: "c2" },
        { key: "c3" },
        { key: "c4" },
        { key: "c5" },
        { key: "c6" }
    ],
    frameRate: 5,
    repeat: -1
        });

        cena.anims.create({
            key: "andar-baixo",
            frames: [
            {key:"s1"},
            {key:"s2"},
            {key:"s3"},
            {key:"s4"},
            {key:"s5"},
            {key:"s6"}
        ],
        frameRate: 5,
        repeat: -1
        });
    }
}
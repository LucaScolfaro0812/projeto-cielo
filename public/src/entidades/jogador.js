// Classe responsável por representar o jogador controlável.
// Herda de Phaser.Physics.Arcade.Sprite para utilizar física Arcade.
export default class Player extends Phaser.Physics.Arcade.Sprite {

    /**
     * @param {Phaser.Scene} cena - Cena onde o jogador será criado
     * @param {number} x - Posição horizontal inicial
     * @param {number} y - Posição vertical inicial
     */
    constructor(cena, x, y) {

        // Agora o jogador já nasce com a imagem nova
        super(cena, x, y, 'marcielo.parado.png');

        cena.add.existing(this);
        cena.physics.add.existing(this);

        this.setScale(0.5);
        this.setCollideWorldBounds(false);

        this.body.setSize(120, 150);
        this.body.setOffset(25, 150);
        this.body.updateFromGameObject();

        this.velocidade = 320;
        this.ultimaDirecao = "baixo";

        this.teclas = this.scene.input.keyboard.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D
        });

        this._criarAnimacoes(cena);

        this.setDepth(10);
    }

    static preload(scene) {
        // Se você não usa mais a spritesheet antiga, pode remover isso:
        // scene.load.spritesheet('player', 'assets/marcielo.png', {
        //     frameWidth: 128,
        //     frameHeight: 128
        // });

        // animação lateral
        scene.load.image("f1", "assets/sprites/animacoes/jogador/marcielo.f1.png");
        scene.load.image("f2", "assets/sprites/animacoes/jogador/marcielo.f2.png");
        scene.load.image("f3", "assets/sprites/animacoes/jogador/marcielo.f3.png");
        scene.load.image("f4", "assets/sprites/animacoes/jogador/marcielo.f4.png");
        scene.load.image("f5", "assets/sprites/animacoes/jogador/marcielo.f5.png");
        scene.load.image("f6", "assets/sprites/animacoes/jogador/marcielo.f6.png");
        scene.load.image("f7", "assets/sprites/animacoes/jogador/marcielo.f7.png");
        scene.load.image("f8", "assets/sprites/animacoes/jogador/marcielo.f8.png");

        // animação para baixo
        scene.load.image("s1", "assets/sprites/animacoes/jogador/marcielo.s1.png");
        scene.load.image("s2", "assets/sprites/animacoes/jogador/marcielo.s2.png");
        scene.load.image("s3", "assets/sprites/animacoes/jogador/marcielo.s3.png");
        scene.load.image("s4", "assets/sprites/animacoes/jogador/marcielo.s4.png");
        scene.load.image("s5", "assets/sprites/animacoes/jogador/marcielo.s5.png");
        scene.load.image("s6", "assets/sprites/animacoes/jogador/marcielo.s6.png");

        // parado
        scene.load.image("idle", "assets/sprites/animacoes/jogador/marcielo.parado.png");

        // animação para cima
        scene.load.image("c1", "assets/sprites/animacoes/jogador/marcielo.c1.png");
        scene.load.image("c2", "assets/sprites/animacoes/jogador/marcielo.c2.png");
        scene.load.image("c3", "assets/sprites/animacoes/jogador/marcielo.c3.png");
        scene.load.image("c4", "assets/sprites/animacoes/jogador/marcielo.c4.png");
        scene.load.image("c5", "assets/sprites/animacoes/jogador/marcielo.c5.png");
        scene.load.image("c6", "assets/sprites/animacoes/jogador/marcielo.c6.png");
    }

    update() {
        this._movimentar();
    }

    _movimentar() {
        this.setVelocity(0);

        let movendo = false;
        let forca = [0, 0];

        const esquerda = this.teclas.A.isDown;
        const direita = this.teclas.D.isDown;
        const cima = this.teclas.W.isDown;
        const baixo = this.teclas.S.isDown;


        // eixo horizontal
        if (esquerda) {
            forca[0] = -1;
            movendo = true;
        } else if (direita) {
            forca[0] = 1;
            movendo = true;
        }

        // eixo vertical
        if (cima) {
            forca[1] = -1;
            movendo = true;
        } else if (baixo) {
            forca[1] = 1;
            movendo = true;
        }

        const modulo = Math.sqrt(forca[0] * forca[0] + forca[1] * forca[1]);

        if (modulo > 0) {
            forca[0] /= modulo;
            forca[1] /= modulo;
        }

        forca[0] *= this.velocidade;
        forca[1] *= this.velocidade;

        this.setVelocity(forca[0], forca[1]);

        // escolha da animação
        if (movendo) {
            // prioridade para animação horizontal quando estiver na diagonal
            if (esquerda) {
                this.setFlipX(true);
                this.anims.play("andar-direita", true);
                this.ultimaDirecao = "esquerda";
            }
            else if (direita) {
                this.setFlipX(false);
                this.anims.play("andar-direita", true);
                this.ultimaDirecao = "direita";
            }
            else if (cima) {
                this.setFlipX(false);
                this.anims.play("andar-cima", true);
                this.ultimaDirecao = "cima";
            }
            else if (baixo) {
                this.setFlipX(false);
                this.anims.play("andar-baixo", true);
                this.ultimaDirecao = "baixo";
            }
        } else {
            this.anims.stop();

            if (this.ultimaDirecao === "esquerda") {
                this.setTexture("idle");
                this.setFlipX(true);
            } else {
                this.setTexture("idle");
                this.setFlipX(false);
            }
        }
    }

    _criarAnimacoes(cena) {
        if (!cena.anims.exists("andar-direita")) {
            cena.anims.create({
                key: "andar-direita",
                frames: [
                    { key: "f1" },
                    { key: "f2" },
                    { key: "f3" },
                    { key: "f4" },
                    { key: "f5" },
                    { key: "f6" },
                    { key: "f7" },
                    { key: "f8" }
                ],
                frameRate: 6,
                repeat: -1
            });
        }

        if (!cena.anims.exists("andar-cima")) {
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
        }

        if (!cena.anims.exists("andar-baixo")) {
            cena.anims.create({
                key: "andar-baixo",
                frames: [
                    { key: "s1" },
                    { key: "s2" },
                    { key: "s3" },
                    { key: "s4" },
                    { key: "s5" },
                    { key: "s6" }
                ],
                frameRate: 5,
                repeat: -1
            });
        }

    }
}

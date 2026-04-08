// Classe responsável por representar o jogador controlável.

import { Maquininhas } from "../sistemas/maquininhas.js";

// Herda de Phaser.Physics.Arcade.Sprite para utilizar física Arcade.
export default class Jogador extends Phaser.Physics.Arcade.Sprite {

    /**
     * @param {Phaser.Scene} cena - Cena onde o jogador será criado
     * @param {number} x - Posição horizontal inicial
     * @param {number} y - Posição vertical inicial
     */
    constructor(cena, x, y) {

        super(cena, x, y, "idle1");

        cena.add.existing(this);
        cena.physics.add.existing(this);

        this.cena = cena;

        this.setScale(0.6);
        this.setCollideWorldBounds(false);

        this.body.setSize(78, 100);
        this.body.setOffset(46, 198);
        this.body.updateFromGameObject();

        this.velocidade = 1000;
        this.ultimaDirecao = "baixo";

        this.teclas = this.scene.input.keyboard.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D
        });

        this._criarAnimacoes(cena);

        this.setDepth(10);

        // Som de passos
        this.somPassos = null;
        this.cena.sound.stopByKey('andandoRua');
        this._somPassosCriado = false;
    }

    static preload(scene) {
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
        scene.load.image("idle1", "assets/sprites/animacoes/jogador/marcielo.parado.png");
        scene.load.image("idle2", "assets/sprites/animacoes/jogador/marcielo.respiracao.1.png");
        scene.load.image("idle3", "assets/sprites/animacoes/jogador/marcielo.respiracao.2.png");
        scene.load.image("idle4", "assets/sprites/animacoes/jogador/marcielo.respiracao.3.png");

        // animação para cima
        scene.load.image("c1", "assets/sprites/animacoes/jogador/marcielo.c1.png");
        scene.load.image("c2", "assets/sprites/animacoes/jogador/marcielo.c2.png");
        scene.load.image("c3", "assets/sprites/animacoes/jogador/marcielo.c3.png");
        scene.load.image("c4", "assets/sprites/animacoes/jogador/marcielo.c4.png");
        scene.load.image("c5", "assets/sprites/animacoes/jogador/marcielo.c5.png");
        scene.load.image("c6", "assets/sprites/animacoes/jogador/marcielo.c6.png");

        // som de passos
        if (!scene.cache.audio.exists('andandoRua')) {
            scene.load.audio('andandoRua', 'assets/sons/andandoRua.mp3');
        }
    }

    update() {
        this._movimentar();
    }

    /**
     * Lê as teclas pressionadas, calcula a direção de movimento e aplica ao corpo físico.
     *
     * Para evitar que o jogador ande mais rápido na diagonal (problema clássico de movimento 8 direções),
     * o vetor de força é normalizado antes de multiplicar pela velocidade:
     * se forca = [-1, -1] (diagonal), o módulo seria √2 ≈ 1.41, mas após dividir pelo módulo
     * o vetor vira [-0.707, -0.707], mantendo o comprimento total igual a 1.
     */
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

        // Normalização: calcula o comprimento do vetor e divide cada componente por ele,
        // garantindo velocidade constante em qualquer direção (inclusive diagonais)
        const deslizamento = this._ajustarDeslizamentoEmQuinas(forca[0], forca[1]);
        forca[0] = deslizamento.x;
        forca[1] = deslizamento.y;

        const modulo = Math.sqrt(forca[0] * forca[0] + forca[1] * forca[1]);

        if (modulo > 0) {
            forca[0] /= modulo;
            forca[1] /= modulo;
        }

        // Aplica a velocidade configurada ao vetor já normalizado
        forca[0] *= this.velocidade;
        forca[1] *= this.velocidade;

        this.setVelocity(forca[0], forca[1]);

        if (movendo) {
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

            // Toca o som de passos se ainda não estiver tocando
           if (!this.somPassos) {
                if (this.cena.cache.audio.exists('andandoRua')) {
                 this.somPassos = this.cena.sound.add('andandoRua', { loop: true, volume: 0.4 });
             }
                    }
                        if (this.somPassos && !this.somPassos.isPlaying) {
                     this.somPassos.play();
                    }

        } else {

            // Para o som ao parar de mover
            if (this.somPassos && this.somPassos.isPlaying) {
                this.somPassos.stop();
            }

            if (this.ultimaDirecao === "esquerda") {
                this.setFlipX(true);
                this.anims.play("idle-respirando", true);
            } else {
                this.setFlipX(false);
                this.anims.play("idle-respirando", true);
            }
        }
    }

    /**
     * Cria as animações do jogador a partir dos frames de imagem carregados no preload.
     * Verifica se a animação já existe antes de criar para evitar erros ao reiniciar a cena.
     * @param {Phaser.Scene} cena - cena onde as animações serão registradas
     */
    _ajustarDeslizamentoEmQuinas(eixoX, eixoY) {
        if (!this.body || eixoX === 0 || eixoY === 0) {
            return { x: eixoX, y: eixoY };
        }

        const bloqueadoHorizontal =
            (eixoX < 0 && this.body.blocked.left) ||
            (eixoX > 0 && this.body.blocked.right);

        const bloqueadoVertical =
            (eixoY < 0 && this.body.blocked.up) ||
            (eixoY > 0 && this.body.blocked.down);

        if (bloqueadoHorizontal && !bloqueadoVertical) {
            return { x: 0, y: eixoY };
        }

        if (bloqueadoVertical && !bloqueadoHorizontal) {
            return { x: eixoX, y: 0 };
        }

        return { x: eixoX, y: eixoY };
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

        if (!cena.anims.exists("idle-respirando")) {
            cena.anims.create({
                key: "idle-respirando",
                frames: [
                    { key: "idle1" },
                    { key: "idle2" },
                    { key: "idle3" },
                    { key: "idle4" }
                ],
                frameRate: 3,
                repeat: -1
            });
        }
    }

    /**
     * Chamado quando o jogador colide com um carro.
     * Para o som de passos, reinicia a cena cidade e zera as maquininhas
     * (o jogador precisa recarregar na Central ao voltar).
     */
    morreu() {
        if (this.somPassos && this.somPassos.isPlaying) {
            this.somPassos.stop();
        }
        this.cena.scene.start('gameScene', { mostrarTutorial: false });
        Maquininhas.definirMaquininhas(0);
    }
}

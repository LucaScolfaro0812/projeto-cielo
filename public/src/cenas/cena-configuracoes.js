export class CenaConfiguracoes extends Phaser.Scene {

    constructor() {
        super({ key: "configScene", transparent: true });
    }

    init(data = {}) {
        this.cenaOrigem = data.cenaOrigem ?? "menuScene";
    }

    create() {
        this.scene.bringToTop();

        const largura = this.scale.width;
        const altura = this.scale.height;

        this.volumeAtual = this._obterVolumeSalvo();
        this.somAtivo = this._obterSomAtivoSalvo();
        this.contrasteAtual = this._obterContrasteSalvo();
        this.velocidadeMarcielo = this._obterVelocidadeSalva();

        this.add.rectangle(largura / 2, altura / 2, largura, altura, 0x000000, 0.55);

        const painel = this.add.rectangle(largura / 2, altura / 2, 640, 700, 0xe8eefc, 1);
        painel.setStrokeStyle(4, 0x001caa, 1);

        this.add.text(largura / 2, altura / 2 - 285, "CONFIGURACOES", {
            fontFamily: "Poppins",
            fontSize: "36px",
            color: "#001caa",
            fontStyle: "bold"
        }).setOrigin(0.5);

        this._criarTituloSecao(largura / 2, altura / 2 - 210, "VOLUME");
        this.valorVolume = this._criarValor(largura / 2, altura / 2 - 150);
        this._criarBotao(largura / 2 - 120, altura / 2 - 150, "-", () => {
            this.volumeAtual = Math.max(0, Math.round((this.volumeAtual - 0.1) * 10) / 10);
            this._salvarConfiguracoes();
            this._atualizarTextos();
        }, 72);
        this._criarBotao(largura / 2 + 120, altura / 2 - 150, "+", () => {
            this.volumeAtual = Math.min(1, Math.round((this.volumeAtual + 0.1) * 10) / 10);
            this._salvarConfiguracoes();
            this._atualizarTextos();
        }, 72);

        this._criarTituloSecao(largura / 2, altura / 2 - 40, "SOM");
        this.valorSom = this._criarValor(largura / 2, altura / 2 + 15);
        this.botaoSom = this._criarBotao(largura / 2, altura / 2 + 75, "ALTERAR", () => {
            this.somAtivo = !this.somAtivo;
            this._salvarConfiguracoes();
            this._atualizarTextos();
        }, 220);

        this._criarTituloSecao(largura / 2, altura / 2 + 100, "CONTRASTE");
        this.valorContraste = this._criarValor(largura / 2, altura / 2 + 155);
        this.botaoContraste = this._criarBotao(largura / 2, altura / 2 + 215, "ALTERAR", () => {
            this.contrasteAtual = this.contrasteAtual === "alto" ? "normal" : "alto";
            this._salvarConfiguracoes();
            this._atualizarTextos();
        }, 220);

        this._criarTituloSecao(largura / 2, altura / 2 + 235, "VELOCIDADE DO MARCIELO");
        this.valorVelocidade = this._criarValor(largura / 2, altura / 2 + 290);
        this._criarBotao(largura / 2 - 120, altura / 2 + 290, "-", () => {
            this.velocidadeMarcielo = Math.max(0.6, Math.round((this.velocidadeMarcielo - 0.1) * 10) / 10);
            this._salvarConfiguracoes();
            this._atualizarTextos();
        }, 72);
        this._criarBotao(largura / 2 + 120, altura / 2 + 290, "+", () => {
            this.velocidadeMarcielo = Math.min(1.4, Math.round((this.velocidadeMarcielo + 0.1) * 10) / 10);
            this._salvarConfiguracoes();
            this._atualizarTextos();
        }, 72);

        this._criarBotao(largura / 2, altura / 2 + 335, "VOLTAR", () => {
            this.scene.resume(this.cenaOrigem);
            this.scene.stop();
        }, 220);

        this.input.keyboard.on("keydown-ESC", () => {
            this.scene.resume(this.cenaOrigem);
            this.scene.stop();
        });

        this._atualizarTextos();
    }

    _criarTituloSecao(x, y, texto) {
        return this.add.text(x, y, texto, {
            fontFamily: "Poppins",
            fontSize: "28px",
            color: "#1B2A4A",
            fontStyle: "bold"
        }).setOrigin(0.5);
    }

    _criarValor(x, y) {
        return this.add.text(x, y, "", {
            fontFamily: "Poppins",
            fontSize: "30px",
            color: "#001caa",
            fontStyle: "bold"
        }).setOrigin(0.5);
    }

    _criarBotao(x, y, texto, onClick, largura = 180, estiloExtra = {}) {
        const botao = this.add.text(x, y, texto, {
            fontFamily: "Poppins",
            fontSize: "26px",
            color: "#ffffff",
            backgroundColor: "#001caa",
            padding: { x: 16, y: 8 },
            align: "center",
            ...estiloExtra
        })
            .setOrigin(0.5)
            .setFixedSize(largura, 54)
            .setAlign("center")
            .setInteractive({ useHandCursor: true });

        botao.on("pointerover", () => {
            botao.setScale(1.05);
        });

        botao.on("pointerout", () => {
            botao.setScale(1);
            this._atualizarTextos();
        });

        botao.on("pointerdown", onClick);

        return botao;
    }

    _atualizarTextos() {
        this.valorVolume.setText(`${Math.round(this.volumeAtual * 100)}%`);
        this.valorSom.setText(this.somAtivo ? "LIGADO" : "DESLIGADO");
        this.valorContraste.setText(this.contrasteAtual === "alto" ? "ALTO" : "NORMAL");
        this.valorVelocidade.setText(`${Math.round(this.velocidadeMarcielo * 100)}%`);

        if (this.botaoSom) {
            this.botaoSom.setStyle({
                backgroundColor: this.somAtivo ? "#138a36" : "#c0392b",
                color: "#ffffff"
            });
        }

        if (this.botaoContraste) {
            this.botaoContraste.setStyle({
                backgroundColor: this.contrasteAtual === "alto" ? "#7c3aed" : "#001caa",
                color: "#ffffff"
            });
        }

        this._aplicarConfiguracoes();
    }

    _obterVolumeSalvo() {
        const valorSalvo = Number(localStorage.getItem("volumeJogo"));
        if (Number.isNaN(valorSalvo)) {
            return 1;
        }

        return Phaser.Math.Clamp(valorSalvo, 0, 1);
    }

    _obterSomAtivoSalvo() {
        const valorSalvo = localStorage.getItem("somJogoAtivo");
        if (valorSalvo === null) {
            return true;
        }

        return valorSalvo === "true";
    }

    _obterContrasteSalvo() {
        const valorSalvo = localStorage.getItem("contrasteJogo");
        return valorSalvo === "alto" ? "alto" : "normal";
    }

    _obterVelocidadeSalva() {
        const valorSalvo = Number(localStorage.getItem("velocidadeMarcielo"));
        if (Number.isNaN(valorSalvo)) {
            return 1;
        }

        return Phaser.Math.Clamp(valorSalvo, 0.6, 1.4);
    }

    _salvarConfiguracoes() {
        localStorage.setItem("volumeJogo", String(this.volumeAtual));
        localStorage.setItem("somJogoAtivo", String(this.somAtivo));
        localStorage.setItem("contrasteJogo", this.contrasteAtual);
        localStorage.setItem("velocidadeMarcielo", String(this.velocidadeMarcielo));
        this._aplicarConfiguracoes();
    }

    _aplicarConfiguracoes() {
        this.sound.volume = this.volumeAtual;
        this.sound.mute = !this.somAtivo;

        if (this.game?.canvas) {
            this.game.canvas.style.filter = this.contrasteAtual === "alto"
                ? "contrast(1.35) saturate(1.15)"
                : "contrast(1)";
        }

        const cenaOrigem = this.scene.manager.getScene(this.cenaOrigem);
        if (cenaOrigem?.player) {
            cenaOrigem.player.velocidade = 1000 * this.velocidadeMarcielo;
        }
    }
}

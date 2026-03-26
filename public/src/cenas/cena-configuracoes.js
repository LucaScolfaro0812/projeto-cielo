import {
    aplicarConfiguracoesJogo,
    carregarConfiguracoesJogo,
    salvarConfiguracoesJogo
} from "../utilitarios/configuracoes-jogo.js";

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

        const configuracoes = carregarConfiguracoesJogo();
        this.volumeAtual = configuracoes.volume;
        this.somAtivo = configuracoes.somAtivo;
        this.contrasteAtual = configuracoes.contraste;
        this.velocidadeMarcielo = configuracoes.velocidadeMarcielo;

        this.add.rectangle(largura / 2, altura / 2, largura, altura, 0x04101c, 0.72);

        const painelX = largura / 2;
        const painelY = altura / 2;
        const painelLargura = 860;
        const painelAltura = 560;

        const painel = this.add.rectangle(painelX, painelY, painelLargura, painelAltura, 0xf7f2e7, 1);
        painel.setStrokeStyle(4, 0x0f3b63, 1);

        const cabecalho = this.add.rectangle(painelX, painelY - 220, painelLargura, 100, 0xbfd7ea, 1);
        cabecalho.setStrokeStyle(0, 0x000000, 0);

        this.add.text(painelX, painelY - 238, "CONFIGURAÇÕES", {
            fontFamily: "Poppins",
            fontSize: "38px",
            color: "#0f3b63",
            fontStyle: "bold"
        }).setOrigin(0.5);

        this.add.text(painelX, painelY - 198, "Personalize som, visual e movimento do jogo", {
            fontFamily: "Poppins",
            fontSize: "18px",
            color: "#355070"
        }).setOrigin(0.5);

        this.linhas = {
            volume: this._criarLinhaOpcao(painelX, painelY - 105, "VOLUME", "Ajusta o volume geral do jogo."),
            som: this._criarLinhaOpcao(painelX, painelY - 10, "SOM", "Liga ou desliga os efeitos sonoros."),
            contraste: this._criarLinhaOpcao(painelX, painelY + 85, "CONTRASTE", "Melhora a visibilidade do jogo."),
            velocidade: this._criarLinhaOpcao(painelX, painelY + 180, "VELOCIDADE", "Define a velocidade do Marcielo.")
        };

        this.valorVolume = this._criarValorLinha(this.linhas.volume);
        this.barraVolume = this._criarBarraLinha(this.linhas.volume);
        this._criarBotaoPequeno(this.linhas.volume.x + 250, this.linhas.volume.y, "-", () => {
            this.volumeAtual = Math.max(0, Math.round((this.volumeAtual - 0.1) * 10) / 10);
            this._persistirEAplicar();
        });
        this._criarBotaoPequeno(this.linhas.volume.x + 330, this.linhas.volume.y, "+", () => {
            this.volumeAtual = Math.min(1, Math.round((this.volumeAtual + 0.1) * 10) / 10);
            this._persistirEAplicar();
        });

        this.valorSom = this._criarValorLinha(this.linhas.som);
        this.botaoSom = this._criarBotaoAcao(this.linhas.som.x + 290, this.linhas.som.y, "ALTERAR", () => {
            this.somAtivo = !this.somAtivo;
            this._persistirEAplicar();
        }, 170);

        this.valorContraste = this._criarValorLinha(this.linhas.contraste);
        this.botaoContraste = this._criarBotaoAcao(this.linhas.contraste.x + 290, this.linhas.contraste.y, "ALTERAR", () => {
            this.contrasteAtual = this.contrasteAtual === "alto" ? "normal" : "alto";
            this._persistirEAplicar();
        }, 170);

        this.valorVelocidade = this._criarValorLinha(this.linhas.velocidade);
        this.barraVelocidade = this._criarBarraLinha(this.linhas.velocidade);
        this._criarBotaoPequeno(this.linhas.velocidade.x + 250, this.linhas.velocidade.y, "-", () => {
            this.velocidadeMarcielo = Math.max(0.6, Math.round((this.velocidadeMarcielo - 0.1) * 10) / 10);
            this._persistirEAplicar();
        });
        this._criarBotaoPequeno(this.linhas.velocidade.x + 330, this.linhas.velocidade.y, "+", () => {
            this.velocidadeMarcielo = Math.min(1.4, Math.round((this.velocidadeMarcielo + 0.1) * 10) / 10);
            this._persistirEAplicar();
        });

        this._criarBotaoAcao(painelX, painelY + 245, "VOLTAR", () => {
            this.scene.resume(this.cenaOrigem);
            this.scene.stop();
        }, 220, "#0f3b63");

        this.input.keyboard.on("keydown-ESC", () => {
            this.scene.resume(this.cenaOrigem);
            this.scene.stop();
        });

        this._persistirEAplicar();
    }

    _criarLinhaOpcao(x, y, titulo, descricao) {
        const largura = 760;
        const altura = 74;

        const fundo = this.add.rectangle(x, y, largura, altura, 0xffffff, 0.98);
        fundo.setStrokeStyle(2, 0xd3dce6, 1);

        this.add.text(x - 350, y - 12, titulo, {
            fontFamily: "Poppins",
            fontSize: "24px",
            color: "#0f3b63",
            fontStyle: "bold"
        }).setOrigin(0, 0.5);

        this.add.text(x - 350, y + 14, descricao, {
            fontFamily: "Poppins",
            fontSize: "14px",
            color: "#52667a"
        }).setOrigin(0, 0.5);

        return { x, y, largura, altura };
    }

    _criarValorLinha(linha) {
        return this.add.text(linha.x + 120, linha.y, "", {
            fontFamily: "Poppins",
            fontSize: "24px",
            color: "#0f3b63",
            fontStyle: "bold"
        }).setOrigin(0.5);
    }

    _criarBarraLinha(linha) {
        const trilha = this.add.rectangle(linha.x + 120, linha.y + 24, 120, 10, 0xd6dee8, 1).setOrigin(0.5);
        const preenchimento = this.add.rectangle(linha.x + 60, linha.y + 24, 120, 10, 0x2a9d8f, 1).setOrigin(0, 0.5);
        return { trilha, preenchimento, largura: 120 };
    }

    _criarBotaoPequeno(x, y, texto, onClick) {
        return this._criarBotaoAcao(x, y, texto, onClick, 56, "#1d4ed8", "28px");
    }

    _criarBotaoAcao(x, y, texto, onClick, largura = 180, cor = "#1d4ed8", fonte = "22px") {
        const botao = this.add.text(x, y, texto, {
            fontFamily: "Poppins",
            fontSize: fonte,
            color: "#ffffff",
            backgroundColor: cor,
            padding: { x: 14, y: 8 },
            align: "center"
        })
            .setOrigin(0.5)
            .setFixedSize(largura, 48)
            .setAlign("center")
            .setInteractive({ useHandCursor: true });

        botao.corBase = cor;

        botao.on("pointerover", () => {
            botao.setStyle({
                backgroundColor: "#6FB7FF",
                color: "#1B2A4A"
            });
            botao.setScale(1.03);
        });

        botao.on("pointerout", () => {
            botao.setStyle({
                backgroundColor: botao.corBase,
                color: "#ffffff"
            });
            botao.setScale(1);
        });

        botao.on("pointerdown", onClick);

        return botao;
    }

    _persistirEAplicar() {
        salvarConfiguracoesJogo({
            volume: this.volumeAtual,
            somAtivo: this.somAtivo,
            contraste: this.contrasteAtual,
            velocidadeMarcielo: this.velocidadeMarcielo
        });

        this._atualizarUI();
        aplicarConfiguracoesJogo({
            game: this.game,
            sound: this.sound,
            player: this.scene.manager.getScene(this.cenaOrigem)?.player ?? null
        });
    }

    _atualizarUI() {
        this.valorVolume.setText(`${Math.round(this.volumeAtual * 100)}%`);
        this.valorSom.setText(this.somAtivo ? "LIGADO" : "DESLIGADO");
        this.valorContraste.setText(this.contrasteAtual === "alto" ? "ALTO" : "NORMAL");
        this.valorVelocidade.setText(`${Math.round(this.velocidadeMarcielo * 100)}%`);

        this.barraVolume.preenchimento.width = this.barraVolume.largura * this.volumeAtual;
        this.barraVelocidade.preenchimento.width =
            this.barraVelocidade.largura * ((this.velocidadeMarcielo - 0.6) / 0.8);

        this.botaoSom.corBase = this.somAtivo ? "#2a9d8f" : "#d64545";
        this.botaoSom.setStyle({
            backgroundColor: this.botaoSom.corBase,
            color: "#ffffff"
        });

        this.botaoContraste.corBase = this.contrasteAtual === "alto" ? "#7c3aed" : "#355070";
        this.botaoContraste.setStyle({
            backgroundColor: this.botaoContraste.corBase,
            color: "#ffffff"
        });
    }
}

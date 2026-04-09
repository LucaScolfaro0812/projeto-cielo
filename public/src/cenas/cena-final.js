import { transicionarPara } from '../utilitarios/transicao-cena.js';

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
        this.load.image('trofeu', 'assets/ui/trofeuCenaFinal.png');
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
        this.load.image('marcielo', 'assets/sprites/animacoes/jogador/marcielo.parado.png');
    }

    create() {
        const w = this.scale.width;
        const h = this.scale.height;

        // Guarda todos os objetos da cena para sumirem com os confetes
        this.objetosCena = [];

        const fundo = this.add.image(0, 0, 'cieloVazia')
            .setOrigin(0, 0)
            .setDisplaySize(w, h);
        this.objetosCena.push(fundo);

        const adicionar = (x, y, key, scale) => {
            const obj = this.physics.add.staticImage(x, y, key).setScale(scale);
            this.objetosCena.push(obj);
            return obj;
        };

        adicionar(2000, 400, 'cieloFiltro', 0.4);
        adicionar(2130, 750, 'cieloComputador', 0.4);
        adicionar(w * 0.5, 120, 'cieloPlaca', 0.5);
        adicionar(w * 0.5, 380, 'cieloBalcao', 0.5);
        adicionar(w * 0.5, 290, 'cieloNPC', 0.35);
        adicionar(w * 0.40, 340, 'trofeu', 0.2);
        adicionar(w * 0.27, 370, 'marcielo', 0.7);


        const npcY = h * 0.9;
        const npcScale = 0.5;
        const npcs = [
            'NPCAzulAutoescola', 'NPCAzulCafe', 'NPCAzulGames',
            'NPCAzulBeleza', 'NPCAzulRoupas', 'NPCAzulPet',
            'NPCAzulMovel', 'NPCAzulFrutaria', 'NPCAzulLanchonete',
            'NPCAzulChocolate', 'NPCAzulPelucia', 'NPCAzulJoalheria',
        ];
        npcs.forEach((key, i) => {
            const x = w * (0.04 + i * (0.92 / (npcs.length - 1)));
            adicionar(x, npcY, key, npcScale);
        });

        this.criarBalaoFala(w, h);
    }

    criarBalaoFala(w, h) {
        const npcX = w * 0.5;
        const bx = npcX + 310;
        const by = 190;
        const bw = 600;
        const bh = 230;

        const balao = this.add.graphics();
        balao.fillStyle(0xffffff, 1);
        balao.lineStyle(2, 0x333333, 1);
        balao.fillRoundedRect(bx - bw / 2, by - bh / 2, bw, bh, 16);
        balao.strokeRoundedRect(bx - bw / 2, by - bh / 2, bw, bh, 16);

        // Rabinho para a esquerda
        balao.fillTriangle(
    bx - bw / 2 + 60, by + bh / 2,
    bx - bw / 2 + 80, by + bh / 2,
    bx - bw / 2 + 40, by + bh / 2 + 25
    );

    balao.strokeTriangle(
    bx - bw / 2 + 60, by + bh / 2,
    bx - bw / 2 + 80, by + bh / 2,
    bx - bw / 2 + 40, by + bh / 2 + 25
    );

        const frase = 'Parabéns, você concluiu sua missão\ne conquistou a quantidade de clientes\nnecessárias para garantir a sua RVM!!';

        this.textoBalao = this.add.text(bx, by - 65,'', {
            fontSize: '26px',
            color: '#000000',
            align: 'center',
            wordWrap: { width: bw - 40 }
        }).setOrigin(0.5, 0);

        this.textoEspaco = this.add.text(bx, by + bh / 2 - 22, 'Pressione ESPAÇO para fechar', {
            fontSize: '17px',
            color: '#555555',
            align: 'center',
            fontStyle: 'italic'
        }).setOrigin(0.5, 0.5).setAlpha(0);

        this.balaoContainer = [balao, this.textoBalao, this.textoEspaco];
        this.balaoAberto = true;

        let index = 0;
        this.timerDigitacao = this.time.addEvent({
            delay: 35,
            repeat: frase.length - 1,
            callback: () => {
                index++;
                this.textoBalao.setText(frase.substring(0, index));
                if (index === frase.length) {
                    this.tweens.add({
                        targets: this.textoEspaco,
                        alpha: 1,
                        duration: 400,
                    });
                }
            }
        });

        this.input.keyboard.once('keydown-SPACE', () => {
            this.fecharBalao();
        });
    }

    fecharBalao() {
        if (!this.balaoAberto) return;
        this.balaoAberto = false;
        if (this.timerDigitacao) this.timerDigitacao.remove();
        this.balaoContainer.forEach(obj => obj.destroy());
        this.soltarConfetes();
    }

    soltarConfetes() {
        const w = this.scale.width;
        const h = this.scale.height;
        const cores = [0xff0000, 0x00ccff, 0xffff00, 0xff69b4, 0x00ff99, 0xff8800, 0xaa00ff];

        // Faixa de confetes descendo; quando cobrir a tela, os objetos da cena desaparecem.
        let maiorDuracao = 0;

        for (let i = 0; i < 150; i++) {
            const x = Phaser.Math.Between(0, w);
            const cor = cores[Phaser.Math.Between(0, cores.length - 1)];
            const largura = Phaser.Math.Between(6, 12);
            const altura = Phaser.Math.Between(10, 18);
            const duracao = Phaser.Math.Between(1500, 3000);
            const delay = Phaser.Math.Between(0, 800);

            if (duracao + delay > maiorDuracao) maiorDuracao = duracao + delay;

            const confete = this.add.graphics();
            confete.fillStyle(cor, 1);
            confete.fillRect(-largura / 2, -altura / 2, largura, altura);
            confete.x = x;
            confete.y = -20;
            confete.rotation = Phaser.Math.FloatBetween(0, Math.PI * 2);

            this.tweens.add({
                targets: confete,
                y: h + 20,
                x: x + Phaser.Math.Between(-80, 80),
                rotation: confete.rotation + Phaser.Math.FloatBetween(-4, 4),
                duration: duracao,
                delay: delay,
                ease: 'Linear',
                onComplete: () => confete.destroy()
            });
        }

        // Quando os confetes cobrirem a tela (~metade da animação), some com os objetos da cena
        this.time.delayedCall(maiorDuracao * 0.45, () => {
            this.objetosCena.forEach(obj => {
                this.tweens.add({
                    targets: obj,
                    alpha: 0,
                    duration: 800,
                    ease: 'Linear'
                });
            });
        });

        // Depois que tudo sumiu, mostra botão de voltar ao menu
        this.time.delayedCall(maiorDuracao * 0.45 + 1000, () => {
            this.mostrarBotaoMenu(w, h);
        });
    }

    mostrarBotaoMenu(w, h) {
        const bx = w * 0.5;
        const by = h * 0.5;
        const bw = 320;
        const bh = 70;

        // Fundo azul
        const botaoFundo = this.add.graphics();
        botaoFundo.fillStyle(0x0055cc, 1);
        botaoFundo.fillRoundedRect(bx - bw / 2, by - bh / 2, bw, bh, 14);
        botaoFundo.setAlpha(0);

        const botaoTexto = this.add.text(bx, by, 'Voltar ao Menu Inicial', {
            fontSize: '22px',
            color: '#ffffff',
            fontStyle: 'bold',
            align: 'center',
        }).setOrigin(0.5, 0.5).setAlpha(0);

        // Fade in do botão
        this.tweens.add({
            targets: [botaoFundo, botaoTexto],
            alpha: 1,
            duration: 600,
            ease: 'Linear'
        });

        // Área clicável
        const zona = this.add.zone(bx, by, bw, bh).setInteractive({ useHandCursor: true });

        zona.on('pointerover', () => {
            botaoFundo.clear();
            botaoFundo.fillStyle(0x0033aa, 1);
            botaoFundo.fillRoundedRect(bx - bw / 2, by - bh / 2, bw, bh, 14);
        });

        zona.on('pointerout', () => {
            botaoFundo.clear();
            botaoFundo.fillStyle(0x0055cc, 1);
            botaoFundo.fillRoundedRect(bx - bw / 2, by - bh / 2, bw, bh, 14);
        });

        zona.on('pointerdown', () => {
            // Retorna ao menu pelo fluxo padrao de transicao do projeto.
            transicionarPara(this, 'menuScene', {}, 'Voltando ao menu...');
        });
    }
}
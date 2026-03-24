import Jogador from '../entidades/jogador.js';
import { definirProximoSpawnCidade, consumirSpawnCidade } from "../utilitarios/estado-jogo.js";
import { obterSpawnCidadePorLoja } from "../utilitarios/spawn-cidade.js";
import Npc from '../entidades/npc.js';
import Carro from '../entidades/carro.js';
import Quiz from '../sistemas/quiz.js';
import LojaFisica from '../entidades/loja-fisica.js';
import CenaLoja from '../cenas/cena-loja.js';
import { lojaFoiConquistada } from '../utilitarios/progresso-lojas.js';
import { VariantesBaloes, obterDecoracaoBaloesDaLoja } from '../utilitarios/configuracao-baloes.js';
import InterfaceProgressoNpc from '../sistemas/progressoNpc-ui.js';
import { obterListaNpcs, obterCaminhoImagemNpc } from "../utilitarios/progresoNPCs.js";

export class CenaCidade extends Phaser.Scene {

    constructor() {
        super({ key: 'gameScene' });

        this.lojas = [];
        this.decoracoesBaloes = [];
        this.portasPorNomeLoja = {};
        this.nomeLojaRetornoBloqueada = null;

        this.lojasConfigs = [];
    }

    preload() {
        this.load.image('circulo-npc', 'assets/sprites/npcs/circulo-npc.png');
        this.load.image('rua', 'assets/imagens/ambiente/mapa.png');

        Object.values(VariantesBaloes).forEach((item) => {
            if (!this.textures.exists(item.chave)) {
                this.load.image(item.chave, item.caminho);
            }
        });

        const lista = obterListaNpcs();

        if (lista.length > 0) {
            const npc = lista[0];
            this.load.image("npcPortraitHud", obterCaminhoImagemNpc(npc.id, npc.estado));
        }

        lista.forEach(npc => {
            this.load.image(
                obterCaminhoImagemNpc(npc.id, npc.estado),
                obterCaminhoImagemNpc(npc.id, npc.estado)
            );
        });

        Jogador.preload(this);
        Npc.preload(this);
        LojaFisica.preload(this);
        Carro.preload(this);
    }

    create() {

        // ===============================
        // FUNDO
        // ===============================
        this.fundo = this.add.image(0, 0, 'rua')
            .setOrigin(0.5)
            .setScale(3);

        this.fundo.x = this.fundo.displayWidth / 2;
        this.fundo.y = this.fundo.displayHeight / 2;

        this.physics.world.setBounds(
            0, 0,
            this.fundo.displayWidth,
            this.fundo.displayHeight
        );

        // ===============================
        // PLAYER + SISTEMAS
        // ===============================
        this._configurarPlayerNpcQuiz();

        this.posicaoSpawnCidadeX = this.player.x;
        this.posicaoSpawnCidadeY = this.player.y;
        this.tempoMinimoLiberarEntradaLojas = this.time.now + 900;

        this.entradaLojasLiberada = false;

        // ===============================
        // CAMERA
        // ===============================
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(0.60);

        // ===============================
        // HUD
        // ===============================
        const npcs = obterListaNpcs();
        const total = npcs.length;
        const conquistados = npcs.filter(n => n.estado === "conquistado").length;

        this.hudNpcUI = new InterfaceProgressoNpc(
            this,
            conquistados,
            total,
            () => {
                if (this.painelNpcs) {
                    this.painelNpcs.setVisible(!this.painelNpcs.visible);
                }
            }
        );

        // ===============================
        // 🚀 TUTORIAL (CORRIGIDO)
        // ===============================
        this.scene.launch('tutorialScene');
        this.scene.pause();
        this.scene.bringToTop('tutorialScene');
    }

    _configurarPlayerNpcQuiz() {

        this.quiz = new Quiz(this);

        const spawn = consumirSpawnCidade();
        const coord = obterSpawnCidadePorLoja(spawn) || { x: 200, y: 200 };

        this.player = new Jogador(this, coord.x, coord.y);
        this.player.setScale(0.8);
        this.player.setCollideWorldBounds(true);

        this.carrinho = [];

        for (let i = 0; i < 3; i++) {
            const carro = new Carro(this, i * 400, 500, true);
            this.carrinho.push(carro);

            this.physics.add.overlap(carro, this.player, () => {
                this.player.morreu();
            });
        }
    }

    update() {

        if (this.player) this.player.update();

        if (this.carrinho && this.carrinho.length) {
            this.carrinho.forEach(c => c.update());
        }

        const dt = this.game.loop.delta / 1000;

        for (let balao of this.decoracoesBaloes) {
            if (!balao._anim) continue;

            const a = balao._anim;
            a.t = Math.min(a.t + dt, a.duracao);

            balao.x = a.xInicial + a.vx * a.t;
            balao.y = a.yInicial + 0.5 * a.ay * a.t * a.t;

            if (a.t >= a.duracao) {
                balao._anim = null;
            }
        }
    }
}
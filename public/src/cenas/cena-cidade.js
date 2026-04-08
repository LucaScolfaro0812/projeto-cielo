// importa as outras classes que contém objetos e dados do jogo
import Jogador from '../entidades/jogador.js';
import { definirProximoSpawnCidade, consumirSpawnCidade } from "../utilitarios/estado-jogo.js";
import { obterSpawnCidadePorLoja } from "../utilitarios/spawn-cidade.js";
import Npc from '../entidades/npc.js';
import Carro from '../entidades/carro.js';
import Quiz from '../sistemas/quiz.js';
import LojaFisica from '../entidades/loja-fisica.js';
import CenaLoja from '../cenas/cena-loja.js';
import { lojaFoiConquistada, obterListasLojasPorConquista } from '../utilitarios/progresso-lojas.js';
import { VariantesBaloes, obterDecoracaoBaloesDaLoja } from '../utilitarios/configuracao-baloes.js';
import InterfaceProgressoNpc from '../sistemas/progressoNpc-ui.js';
import { obterListaNpcs, obterCaminhoImagemNpc } from "../utilitarios/progresoNPCs.js";
import { colisoresAmbiente } from '../utilitarios/configuracao-colisores-ambiente.js';
import { atualizarEstadoNpc } from "../utilitarios/progresoNPCs.js";
import { carregarDados } from "../utilitarios/armazenamento.js";
import { chavesArmazenamento } from "../utilitarios/estado-jogo.js";
import Entrada from '../entidades/loja-entrar.js';
import { revelarCena } from '../utilitarios/transicao-cena.js';
import HudMaquininhas from '../sistemas/hud-maquininhas.js';
import Seta from '../sistemas/seta.js'
import { Maquininhas } from '../sistemas/maquininhas.js';

// Definição da cena principal do jogo
export class CenaCidade extends Phaser.Scene {

    constructor() {
        // Define a chave única da cena dentro do Phaser
        super({ key: 'gameScene' });

        // lista de todas as lojas fisicas do jogo
        this.lojas = [];
        this.decoracoesBaloes = [];
        this.portasPorNomeLoja = {};
        this.nomeLojaRetornoBloqueada = null;
        // Listas derivadas em tempo real a partir dos NPCs conquistados salvos.
        // Evita duplicar regra de negócio e mantém consistência com o localStorage.
        this.lojasConquistadas = [];
        this.lojasNaoConquistadas = [];
        // lista de configurações de cada loja
        this.lojasConfigs = [
            {
                nomeLoja: 'Cafe',
                cena: 'cafeScene',
                bgScale: 1.3,

                lojaFisicaOriginX: 0.7,
                lojaFisicaOriginY: 0.62,
                offsetFisicaX: 0,
                offsetFisicaY: 0,

                npcX: 840,
                npcY: 342,

                portaX: 240,
                portaY: 340,

                playerX: 190,
                playerY: 380,
            },
            {
                nomeLoja: 'Games',
                cena: 'gamesScene',
                bgScale: 1,

                lojaFisicaOriginX: 0.55,
                lojaFisicaOriginY: 0.62,
                offsetFisicaX: 0,
                offsetFisicaY: 0,

                npcX: 730,
                npcY: 330,

                portaX: 200,
                portaY: 280,

                playerX: 190,
                playerY: 300
            },
            {
                nomeLoja: 'Beleza',
                cena: 'belezaScene',
                bgScale: 2.2,

                lojaFisicaOriginX: 0.64,
                lojaFisicaOriginY: 0.6,
                offsetFisicaX: 0,
                offsetFisicaY: 0,

                npcX: 800,
                npcY: 310,

                portaX: 250,
                portaY: 370,

                playerX: 190,
                playerY: 400,
            },
            {
                nomeLoja: 'Roupas',
                cena: 'roupasScene',
                bgScale: 2.5,

                lojaFisicaOriginX: 0.63,
                lojaFisicaOriginY: 0.61,
                offsetFisicaX: 60,
                offsetFisicaY: -30,

                npcX: 770,
                npcY: 245,

                portaX: 205,
                portaY: 300,

                playerX: 190,
                playerY: 350
            },
            {
                nomeLoja: 'Pet',
                cena: 'petScene',
                bgScale: 3.3,

                lojaFisicaOriginX: 0.62,
                lojaFisicaOriginY: 0.61,
                offsetFisicaX: 0,
                offsetFisicaY: 0,

                npcX: 840,
                npcY: 300,

                portaX: 180,
                portaY: 270,

                playerX: 200,
                playerY: 310,
            },
            {
                nomeLoja: 'Movel',
                cena: 'movelScene',
                bgScale: 2.25,

                lojaFisicaOriginX: 0.62,
                lojaFisicaOriginY: 0.6,
                offsetFisicaX: -300,
                offsetFisicaY: 0,

                npcX: 820,
                npcY: 350,

                portaX: 240,
                portaY: 360,

                playerX: 190,
                playerY: 390
            },
            {
                nomeLoja: 'Frutaria',
                cena: 'frutariaScene',
                bgScale: 2,

                lojaFisicaOriginX: 0.64,
                lojaFisicaOriginY: 0.60,
                offsetFisicaX: -50,
                offsetFisicaY: -100,

                npcX: 754,
                npcY: 288,

                portaX: 240,
                portaY: 270,

                playerX: 190,
                playerY: 300
            },
            {
                nomeLoja: 'Lanchonete',
                cena: 'lanchoneteScene',
                bgScale: 1,

                lojaFisicaOriginX: 0.57,
                lojaFisicaOriginY: 0.66,
                offsetFisicaX: 100,
                offsetFisicaY: -80,

                npcX: 730,
                npcY: 248,

                portaX: 233,
                portaY: 240,

                playerX: 190,
                playerY: 300
            },
            {
                nomeLoja: 'Chocolate',
                cena: 'chocolateScene',
                bgScale: 2.25,

                lojaFisicaOriginX: 0.62,
                lojaFisicaOriginY: 0.63,
                offsetFisicaX: 30,
                offsetFisicaY: -80,

                npcX: 750,
                npcY: 423,

                portaX: 233,
                portaY: 380,

                playerX: 190,
                playerY: 400
            },
            {
                nomeLoja: 'Pelucia',
                cena: 'peluciaScene',
                bgScale: 1.10,

                lojaFisicaOriginX: 0.625,
                lojaFisicaOriginY: 0.6,
                offsetFisicaX: 75,
                offsetFisicaY: -80,

                npcX: 750,
                npcY: 285,

                portaX: 257,
                portaY: 264,

                playerX: 190,
                playerY: 300
            },
            {
                nomeLoja: 'Autoescola',
                cena: 'autoEscolaScene',
                bgScale: 2.15,

                lojaFisicaOriginX: 0.69,
                lojaFisicaOriginY: 0.61,
                offsetFisicaX: 0,
                offsetFisicaY: -50,

                npcX: 800,
                npcY: 320,

                portaX: 260,
                portaY: 310,

                playerX: 190,
                playerY: 350,
            },
            {
                nomeLoja: 'Joalheria',
                cena: 'joalheriaScene',
                bgScale: 2.1,

                lojaFisicaOriginX: 0.69,
                lojaFisicaOriginY: 0.62,
                offsetFisicaX: -225,
                offsetFisicaY: -50,

                npcX: 710,
                npcY: 325,

                portaX: 223,
                portaY: 300,

                playerX: 230,
                playerY: 340
            }
        ];
    }

    init(data = {}) {
        this.mostrarTutorialAoEntrar = Boolean(data.mostrarTutorial);
    }

    // Método responsável por carregar todos os assets antes da cena iniciar
    preload() {
        this.load.image('seta', 'assets/imagens/seta.png');
        this.load.image('alerta', 'assets/imagens/alerta.png');


        // Preload do fundo visual dos NPCs no popup
        this.load.image('circulo-npc', 'assets/sprites/npcs/circulo-npc.png');
        // Imagens estáticas
        this.load.image('rua', 'assets/imagens/ambiente/mapa.png');
        this.load.image('marcielocabeca', 'assets/imagens/marcielocabeca.png');
        this.load.image('maquininhaCielo', 'assets/imagens/maquininha-cielo.png');

        // Carrega todas as imagens de lojas
        for (let i = 0; i < this.lojasConfigs.length; i++) {
            let lojaKey = 'loja' + this.lojasConfigs[i].nomeLoja + 'Fisica';
            this.load.image(lojaKey, `assets/imagens/lojas/exterior/${lojaKey}.png`);
        }

        this.load.image('predioCentral', 'assets/imagens/central-cielo/central-cielo.png');

        // Preload das variacoes de baloes usadas como decoracao externa.
        Object.values(VariantesBaloes).forEach((item) => {
            if (!this.textures.exists(item.chave)) {
                this.load.image(item.chave, item.caminho);
            }
        });

        // Preload de todas as imagens de portrait dos NPCs para todos os estados possíveis
        const npcs = obterListaNpcs();
        const estados = ['conquistado', 'interagido', 'nao-interagido'];
        npcs.forEach(npc => {
            estados.forEach(estado => {
                const key = `${npc.id}-${estado}`;
                const path = `assets/sprites/npcs/${key}.png`;
                if (!this.textures.exists(key)) {
                    this.load.image(key, path);
                }
            });
        });

        if (!this.cache.audio.exists('somCidade')) {
            this.load.audio('somCidade', 'assets/sons/somCidade.mp3');
        }
        // Pré carrega os objetos com uma função estática
        Jogador.preload(this);
        Npc.preload(this);
        LojaFisica.preload(this);
        Carro.preload(this);


    }

    // Método executado quando a cena é criada
    create() {

        this.events.on('shutdown', () => {
            if (this.somCidade && this.somCidade.isPlaying) this.somCidade.stop();
        });
        // Revela a cena com fade azul Cielo
        revelarCena(this);

        this.somCidade = this.sound.add('somCidade', { loop: true, volume: 0.3 });
        this.somCidade.play();
        // Adiciona o background da rua na posição (0,0)
        // setOrigin(0) posiciona a imagem pelo canto superior esquerdo
        // setScale(6) amplia a imagem
        this.fundo =
            this.add.image(0, 0, 'rua')
                .setOrigin(0.5, 0.5)
                .setScale(7.5);

        this.fundo.x = this.fundo.displayWidth / 2;
        this.fundo.y = this.fundo.displayHeight / 2;
        this.physics.world.setBounds(
            0,
            0,
            this.fundo.displayWidth,
            this.fundo.displayHeight
        )

        // Configura player, npc e sistema de quiz
        this._configurarPlayerNpcQuiz();
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(100);

        this.posicaoSpawnCidadeX = this.player.x;
        this.posicaoSpawnCidadeY = this.player.y;
        this.tempoMinimoLiberarEntradaLojas = this.time.now + 900;

        // Cria portas e define troca de cena
        this._criarLojasEPortas();

        // Cria colisores invisíveis sobre árvores e casas do mapa
        this._criarColisoresAmbiente();

        // Só libera entrada em loja depois que o jogador sair da área de qualquer porta.
        this.entradaLojasLiberada = false;

        // Faz a câmera seguir o jogador
        this.cameras.main.startFollow(this.player);

        // Limita a câmera às bordas do mapa
        this.cameras.main.setBounds(0, 0, this.fundo.displayWidth, this.fundo.displayHeight);

        // Define nível de zoom da câmera
        this.cameras.main.setZoom(0.60);

        // Cria o minimap no canto superior direito
        this._criarMinimap();

        // Abre o menu de pause ao pressionar ESC, passando a chave desta cena
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('pauseScene', { cenaAnterior: this.scene.key });
        });

        this.input.keyboard.on('keydown-T', () => {
            this._abrirTutorial();
        });

        this.input.keyboard.on('keydown-M', () => {
            this._abrirMapa();
        });


        // HUD de progresso dos NPCs - design moderno e acessível
        // Remove qualquer HUD antigo antes de criar o novo
        if (this.hudNpcUI) {
            this.hudNpcUI.destroy();
        }

        // Dados de progresso
        const npcs = obterListaNpcs();

        // --- Restaura o estado salvo dos NPCs ao carregar a cena ---
        const npcsConquistados = carregarDados(chavesArmazenamento.npcsConquistadosIds, []);
        const npcsInteragidos = carregarDados(chavesArmazenamento.npcsInteragidosIds, []);
        npcs.forEach(npc => {
            if (npcsConquistados.includes(npc.id)) {
                atualizarEstadoNpc(npc.id, 'conquistado');
            } else if (npcsInteragidos.includes(npc.id)) {
                atualizarEstadoNpc(npc.id, 'interagido');
            } else {
                atualizarEstadoNpc(npc.id, 'nao-interagido');
            }
        });
        if (this.atualizarPainelNpcs) {
            this.atualizarPainelNpcs();
        }
        // Sincroniza as listas de lojas com o progresso atual restaurado dos NPCs.
        this.atualizarListasLojas();
        // --- Fim da restauração de estado ---

        const totalNpcs = npcs.length;
        const conquistados = npcs.filter(npc => npc.estado === "conquistado").length;

        // Importa o novo componente visual
        // (import já está no topo do arquivo)

        this.hudNpcUI = new InterfaceProgressoNpc(
            this,
            conquistados,
            totalNpcs,
            () => {
                // Botão só abre — marca flag para ignorar o pointerdown deste mesmo clique
                if (this.painelNpcs && !this.painelNpcs.visible) {
                    this._painelAbertoNesteClique = true;
                    this._setHudCidadeVisivel(false);
                    this.painelNpcs.setDepth(10000);
                    this.children.bringToTop(this.painelNpcs);
                    this.painelNpcs.setVisible(true);
                }
            }
        );

        this.criarPainelNpcs();

        this.hudMaquininhas = new HudMaquininhas(this);

        // Fecha o painel ao clicar em qualquer lugar — ignora o clique que o abriu
        this.input.on('pointerdown', () => {
            if (this._painelAbertoNesteClique) {
                this._painelAbertoNesteClique = false;
                return;
            }
            if (this.painelNpcs && this.painelNpcs.visible) {
                this.painelNpcs.setVisible(false);
                this._setHudCidadeVisivel(true);
            }
        });

        if (this.mostrarTutorialAoEntrar) {
            this._abrirTutorial();
        }

        this.seta = new Seta(this);
        this.seta.definirAlvo(this.lojas[0]);

        this.maquininha = new Maquininhas(this);
    }

    /**
     * Pausa a cena e abre o overlay do mapa completo (`mapaScene`),
     * passando a posição atual do jogador e as dimensões do mundo para
     * que o marcador seja posicionado corretamente sobre a imagem.
     */
    _abrirMapa() {
        if (this.scene.isActive('mapaScene')) return;
        this.scene.pause();
        this.scene.launch('mapaScene', {
            cenaOrigem: this.scene.key,
            playerX: this.player.x,
            playerY: this.player.y,
            worldW: this.fundo.displayWidth,
            worldH: this.fundo.displayHeight,
        });
        this.scene.bringToTop('mapaScene');
    }

    _abrirTutorial() {
        if (this.scene.isActive('tutorialScene')) {
            return;
        }

        this.scene.pause();
        this.scene.launch('tutorialScene', {
            cenaOrigem: this.scene.key,
            modoOverlay: true
        });
        this.scene.bringToTop('tutorialScene');

    }

    _setHudCidadeVisivel(visivel) {
        // Esconde/mostra o HUD de progresso de NPCs
        if (this.hudNpcUI?.setVisible) {
            this.hudNpcUI.setVisible(visivel);
        }

        // Esconde/mostra o container do HUD de maquininhas
        if (this.hudMaquininhas?.container) {
            this.hudMaquininhas.container.setVisible(visivel);
        }

        // Esconde/mostra a seta e seu alerta
        if (this.seta?.setHudVisible) {
            this.seta.setHudVisible(visivel);
        }

        // Esconde/mostra o minimap (câmera de conteúdo + câmera de borda)
        if (this.minimapCam) this.minimapCam.visible = visivel;
        if (this.minimapBorda) this.minimapBorda.visible = visivel;
    }

    /**
     * Cria e configura:
     * - Jogador
     * - NPC
     * - Sistema de Quiz
     * - Colisão entre Jogador e NPC
     */
    _criarColisoresAmbiente() {
        this.colisoresAmbiente = this.physics.add.staticGroup();

        for (const c of colisoresAmbiente) {
            const partes = this._obterPartesColisorAmbiente(c);
            partes.forEach((colisor) => {
                const rect = this.add.rectangle(colisor.x, colisor.y, colisor.w, colisor.h);
                rect.setVisible(false);
                this.physics.add.existing(rect, true);
                this.colisoresAmbiente.add(rect);
            });
        }

        this.physics.add.collider(this.player, this.colisoresAmbiente);
    }

    _obterPartesColisorAmbiente(colisor) {
        const base = this._ajustarColisorAmbiente(colisor);
        const nome = typeof colisor.nome === 'string' ? colisor.nome : '';
        const ehBorda = nome.startsWith('borda') || nome.startsWith('area-');

        if (ehBorda) {
            return [base];
        }

        const pareceVegetacao =
            colisor.w <= 900 &&
            colisor.h <= 950 &&
            (colisor.w <= 350 || colisor.h <= 450);

        if (pareceVegetacao) {
            return [base];
        }

        const chanfro = Math.min(
            60,
            Math.floor(base.w * 0.26),
            Math.floor(base.h * 0.26)
        );

        if (chanfro < 12) {
            return [base];
        }

        return [
            {
                x: base.x,
                y: base.y,
                w: base.w,
                h: Math.max(12, base.h - (chanfro * 2))
            },
            {
                x: base.x,
                y: base.y - ((base.h - chanfro) / 2),
                w: Math.max(12, base.w - (chanfro * 2)),
                h: chanfro
            },
            {
                x: base.x,
                y: base.y + ((base.h - chanfro) / 2),
                w: Math.max(12, base.w - (chanfro * 2)),
                h: chanfro
            }
        ];
    }

    _ajustarColisorAmbiente(colisor) {
        const nome = typeof colisor.nome === 'string' ? colisor.nome : '';
        const ehBorda = nome.startsWith('borda') || nome.startsWith('area-');

        if (ehBorda) {
            return { x: colisor.x, y: colisor.y, w: colisor.w, h: colisor.h };
        }

        if (nome.startsWith('petshop-arbusto')) {
            const largura = Math.max(12, Math.round(colisor.w * 0.46));
            const altura = Math.max(12, Math.round(colisor.h * 0.22));
            const deslocamentoY = Math.round((colisor.h - altura) * 0.14);

            return {
                x: colisor.x,
                y: colisor.y + deslocamentoY,
                w: largura,
                h: altura
            };
        }

        const pareceVegetacao =
            colisor.w <= 900 &&
            colisor.h <= 950 &&
            (colisor.w <= 350 || colisor.h <= 450);

        if (pareceVegetacao) {
            const largura = Math.max(12, Math.round(colisor.w * 0.84));
            const altura = Math.max(12, Math.round(colisor.h * 0.52));
            const deslocamentoY = Math.round((colisor.h - altura) * 0.04);

            return {
                x: colisor.x,
                y: colisor.y + deslocamentoY,
                w: largura,
                h: altura
            };
        }

        return {
            x: colisor.x,
            y: colisor.y,
            w: Math.max(12, colisor.w - 68),
            h: Math.max(12, colisor.h - 68)
        };
    }

    _configurarPlayerNpcQuiz() {

        // Instancia o sistema de perguntas
        this.quiz = new Quiz(this);

        // Cria o jogador em uma posição específica do mapa
        const idSpawnCidade = consumirSpawnCidade(); // Lê qual foi o último spawn salvo para a cidade e já limpa esse estado para não reutilizar indevidamente.
        this.nomeLojaRetornoBloqueada = idSpawnCidade;

        // Converte o nome da loja em coordenadas reais x e y.
        const coordenadasSpawnCidade = obterSpawnCidadePorLoja(idSpawnCidade);

        // Cria o Marcielo na posição correta em frente da loja de retorno.
        this.player = new Jogador(
            this,
            coordenadasSpawnCidade.x,
            coordenadasSpawnCidade.y
        );

        if (idSpawnCidade === 'Central') {
            this.player.x = 5800;
            this.player.y = 1350;
        }

        this.player.setScale(0.8);

        this.carrinho = [];

        const ruas = [
            { y: 2123, direcao: true, quantidade: 4, velocidade: 650, espacamento: 3000 },
            { y: 4065, direcao: false, quantidade: 6, velocidade: 1000, espacamento: 2000 },
            { y: 6359, direcao: true, quantidade: 3, velocidade: 450, espacamento: 4000 },
        ];
        ruas.forEach(({ y, direcao, quantidade, velocidade, espacamento }) => {
            for (let i = 0; i < quantidade; i++) {
                const carro = new Carro(this, i * espacamento, y, direcao, velocidade);
                this.carrinho.push(carro);
            }
        });

        for (let i = 0; i < this.carrinho.length; i++) {
            this.physics.add.overlap(this.carrinho[i], this.player, () => {
                this.player.morreu();
            });
        }
        // Conecta collider com o player
        if (this.corpoColisaoBancada) {
            this.physics.add.collider(this.player, this.corpoColisaoBancada);
        }
    }

    /**
     * Instancia todas as lojas físicas, o prédio da Central e suas respectivas portas.
     *
     * Posicionamento das lojas:
     *   - As 12 lojas são distribuídas em 2 fileiras de 6, com espaçamento fixo.
     *   - Fórmula X: 1500 + (índice_na_fileira × 1675) + (par_de_lojas × 500)
     *   - Fórmula Y: 3500 + (fileira × 2250)
     *   - Cada loja pode ter offsets individuais (`offsetFisicaX`, `offsetFisicaY`)
     *     definidos em `lojasConfigs` para ajuste fino de posição.
     *
     * Para cada loja, cria também:
     *   - Overlap com o jogador para disparar a troca de cena.
     *   - Bloqueio de reentrada imediata (`nomeLojaRetornoBloqueada`).
     *   - Decoração de balões animados se a loja já foi conquistada.
     *
     * A Central da Cielo é criada em posição fixa (5800, 1020) com paredes
     * invisíveis laterais e um efeito de brilho pulsante na porta.
     */
    _criarLojasEPortas() {
        // Cria todas as lojas da lista de lojas
        for (let i = 0; i < this.lojasConfigs.length; i++) {
            let posX = 1500 + ((i % 6) * 1675) + (Math.floor(i % 6 / 2) * 500);
            let posY = 3500 + (Math.floor(i / 6) * 2250);

            this.lojas[i] = this._criarLoja(
                posX,
                posY,
                'loja' + this.lojasConfigs[i].nomeLoja + 'Fisica',
                this.lojasConfigs[i]
            );
        }

        const centralX = 5800;
        const centralY = 1020;
        // 2. Desenha o prédio na tela usando a imagem que carregamos no preload
        this.predioCentral = this.add.image(centralX, centralY, 'predioCentral');
        this.predioCentral.setDepth(1); // Garante que fique na frente do chão
        this.predioCentral.setScale(1.5);
        // Cria um grupo físico estático para guardar nossas paredes invisíveis
        this.paredesCentral = this.physics.add.staticGroup();

        // Ajuda nos cálculos das coordenadas (Dimensões scaled da imagem)
        const totalW = this.predioCentral.displayWidth;
        const totalH = this.predioCentral.displayHeight;

        // 3 retângulos invisíveis (Top, Left, Right) delimitam o prédio da Central,
        // deixando o centro-baixo livre para o jogador entrar pela porta.
        const espessuraParede = 30;

        // 1. Parede Superior (Teto): Cobre toda a largura em cima
        const topRect = this.add.rectangle(centralX, (centralY - totalH / 1.5) + espessuraParede / 2, totalW, espessuraParede);
        this.paredesCentral.add(topRect);

        // 2. Parede Esquerda (Canto Esquerdo): Cobre 80% da altura lateral, deixando 20% livre embaixo para a porta
        const lateralH = totalH * 0.8;
        const lateralW = totalW * 0.4;

        const leftRect = this.add.rectangle((centralX - totalW / 2) + lateralW / 2, (centralY - totalH / 1.5) + lateralH / 2, lateralW, lateralH);
        this.paredesCentral.add(leftRect);

        // 3. Parede Direita (Canto Direito)
        const rightRect = this.add.rectangle((centralX + totalW / 2) - lateralW / 2, (centralY - totalH / 1.5) + lateralH / 2, lateralW, lateralH);
        this.paredesCentral.add(rightRect);

        // Oculta os retângulos para não aparecerem no jogo (A física continua ativa)
        topRect.setVisible(false);
        leftRect.setVisible(false);
        rightRect.setVisible(false);

        // Liga a colisão real entre o Marcielo e as "PAREDES" (Não a imagem do prédio)
        this.physics.add.collider(this.player, this.paredesCentral);
        // 3. Cria a porta invisível bem na base do prédio
        // Se a porta ficar muito no alto, aumente esse valor (ex: +200, +250)
        const portaY = centralY + 180;
        const portaX = centralX;

        const brilhoOffsetX = -5; // Valores positivos movem para direita, negativos para esquerda
        const brilhoOffsetY = -95; // Valores positivos movem para baixo, negativos para cima
        // Adicionamos o offset na posição X e Y do sprite
        this.portaCentralGlow = this.add.sprite(
            portaX + brilhoOffsetX,
            portaY + brilhoOffsetY,
            'entrada_animada',
            0
        );

        // Aquele tom de luz marrom/quente
        this.portaCentralGlow.setTintFill(0xCD853F);
        this.portaCentralGlow.setScale(2.8);

        // Tem que ser menor que a profundidade da porta (você colocou a porta no 13, 
        // então o brilho fica no 12 para ficar atrás dela)
        this.portaCentralGlow.setDepth(150);

        this.portaCentralGlow.setBlendMode(Phaser.BlendModes.ADD);
        this.portaCentralGlow.setAlpha(0.8);

        this.portaCentralTween = this.tweens.add({
            targets: this.portaCentralGlow,
            alpha: 0.2,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.portaCentral = new Entrada(
            this,
            portaX,
            portaY,
            this,
            'centralScene',
            this.player
        );

        this.portaCentral.setDepth(13);
        this.portaCentral.brilho = this.portaCentralGlow;

        this.physics.add.overlap(this.portaCentral, this.player, () => {
            if (this.time.now < this.tempoMinimoLiberarEntradaLojas) return;

            if (this.cache.audio.exists('portaAbrindo')) {
                this.sound.play('portaAbrindo');
            }

            this.portaCentral.trocarDeCena();

            if (this.somCidade && this.somCidade.isPlaying) {
                this.somCidade.stop();
            }
        });
    }

    _criarLoja(posX, posY, sprite, config) {
        // cria nova cena apenas se ela não existir
        if (!this.scene.manager.getScene(config.cena)) {
            let cena = new CenaLoja({
                nomeDaLoja: config.nomeLoja,
                nomeDaCena: config.cena,
                bgScale: config.bgScale,

                npcX: config.npcX,
                npcY: config.npcY,

                portaX: config.portaX,
                portaY: config.portaY,

                playerX: config.playerX,
                playerY: config.playerY
            });
            this.scene.add(config.cena, cena);
        }

        // cria o objeto da loja
        let l = new LojaFisica(
            this,
            posX + config.offsetFisicaX,
            posY + config.offsetFisicaY,
            sprite,
            config.cena,
            config.nomeLoja
        ).setOrigin(config.lojaFisicaOriginX, config.lojaFisicaOriginY);

        this._criarDecoracaoBaloesDaLoja(l, config.nomeLoja);

        // salva a porta da loja
        let portaEntrada = l.getPorta();
        this.portasPorNomeLoja[config.nomeLoja] = portaEntrada;

        this.physics.add.collider(this.player, l);

        // Detecta sobreposição entre porta e jogador
        this.physics.add.overlap(portaEntrada, this.player, () => {
            if (!this.entradaLojasLiberada) {
                return;
            }

            // Evita reentrada imediata na mesma loja de onde o jogador acabou de sair.
            if (config.nomeLoja === this.nomeLojaRetornoBloqueada) {
                return;
            }

            // Salva o nome da loja atual, por exemplo Cafe, Pet, Joalheria.
            definirProximoSpawnCidade(config.nomeLoja);

            // Só depois de salvar o contexto, troca para a cena interna da loja.
            portaEntrada.trocarDeCena();

            if (this.somCidade && this.somCidade.isPlaying) {
                this.somCidade.stop();
            }
        });

        // retornando a loja criada
        return l;
    }

    _criarDecoracaoBaloesDaLoja(loja, nomeLoja) {
        if (!lojaFoiConquistada(nomeLoja)) {
            return;
        }

        const decoracao = obterDecoracaoBaloesDaLoja(nomeLoja);
        if (!decoracao) {
            return;
        }

        const variante = VariantesBaloes[decoracao.variante];
        if (!variante) {
            return;
        }

        const quantidadeBaloes = Math.max(1, decoracao.quantidade ?? 3);
        const espacamentoEntreBaloes = decoracao.espacamentoX ?? 60;
        const escalaBaloes = decoracao.escala ?? 0.45;
        const deslocamentoInicialX = -((quantidadeBaloes - 1) * espacamentoEntreBaloes) / 2;

        for (let i = 0; i < quantidadeBaloes; i++) {
            const spriteBaloes = this.add.image(
                loja.x + decoracao.offsetX + deslocamentoInicialX + (i * espacamentoEntreBaloes),
                loja.y + decoracao.offsetY,
                variante.chave
            );

            spriteBaloes.setScale(escalaBaloes);
            spriteBaloes.setDepth((loja.depth ?? 0) + 1);

            // posição final do balão (onde ele deve chegar)
            const xFinal = spriteBaloes.x;
            const yFinal = spriteBaloes.y;

            // duração da animação: cada balão demora um pouco mais que o anterior para não subirem sincronizados
            const duracao = 2 + i * 0.3;

            // chama animarElemento:
            // xInicial = 150px à esquerda da posição final (MU bem visível no eixo X)
            // yInicial = 300px abaixo da posição final (MUV visível no eixo Y)
            this.animarElemento(xFinal - 150, yFinal + 300, xFinal, yFinal, duracao, spriteBaloes);

            this.decoracoesBaloes.push(spriteBaloes);
        }
    }

    /**
     * Anima um elemento gráfico do ponto A ao ponto B usando cinemática bidimensional.
     * Eixo X: Movimento Uniforme (MU) — velocidade constante
     * Eixo Y: Movimento Uniformemente Variado (MUV) — parte do repouso e acelera
     *
     * @param {number} xInicial - posição X inicial do elemento
     * @param {number} yInicial - posição Y inicial do elemento
     * @param {number} xFinal   - posição X final do elemento
     * @param {number} yFinal   - posição Y final do elemento
     * @param {number} duracao  - duração total da animação em segundos
     * @param {object} elemento - sprite ou imagem do Phaser a ser animado
     */
    animarElemento(xInicial, yInicial, xFinal, yFinal, duracao, elemento) {

        // MU no eixo X: velocidade constante para percorrer (xFinal - xInicial) em T segundos
        // fórmula: vx = (xf - xi) / T
        const vx = (xFinal - xInicial) / duracao;

        // MUV no eixo Y: aceleração necessária para partir do repouso e chegar a yFinal em T segundos
        // fórmula: ay = 2 * (yf - yi) / T²
        const ay = 2 * (yFinal - yInicial) / (duracao * duracao);

        // Posiciona o elemento no ponto inicial antes da animação começar
        elemento.x = xInicial;
        elemento.y = yInicial;

        // Guarda todos os dados da animação no próprio elemento.
        // O método update() vai ler esses dados a cada frame para calcular a nova posição.
        // t começa em 0 e avança até duracao.
        elemento._anim = {
            xInicial, // posição X de partida
            yInicial, // posição Y de partida
            vx,       // velocidade constante no eixo X (MU)
            ay,       // aceleração no eixo Y (MUV)
            duracao,  // tempo total da animação em segundos
            t: 0      // tempo acumulado desde o início da animação
        };
    }

    /**
     * Cria o minimapa no canto superior esquerdo da tela.
     *
     * O minimapa usa duas câmeras secundárias do Phaser sobrepostas:
     *   1. Câmera de borda — levemente maior, exibe apenas uma cor sólida como moldura.
     *      É apontada para fora do mapa para não mostrar nenhum conteúdo do mundo.
     *   2. Câmera do minimap — mostra o mapa inteiro em tamanho reduzido, centralizado.
     *
     * O zoom é calculado com Math.max para garantir que o mapa preencha o espaço
     * sem bordas pretas, mesmo que as proporções não sejam iguais.
     *
     * O marcador é uma imagem da cabeça do Marcielo posicionada no mundo no local
     * exato do jogador. Seu tamanho é calculado como 32 / zoom para sempre aparecer
     * com 32 pixels de tamanho na tela do minimap, independente do tamanho do mapa.
     * A câmera principal e a de borda ignoram o marcador — só o minimap o exibe.
     */
    _criarMinimap() {
        const mapW = this.fundo.displayWidth;
        const mapH = this.fundo.displayHeight;

        // Posição e tamanho do minimap na tela (em pixels)
        const x = 16, y = 16, w = 220, h = 130;

        // Zoom que faz o mapa inteiro caber no minimap sem bordas pretas
        const zoom = Math.max(w / mapW, h / mapH);

        // Câmera de borda: 3px maior em cada lado, cor azul sólida.
        // scrollX/scrollY apontam para fora do mapa — só aparece a cor de fundo.
        this.minimapBorda = this.cameras.add(x - 3, y - 3, w + 6, h + 6);
        const borda = this.minimapBorda;
        borda.setBackgroundColor(0x88bbff);
        borda.scrollX = mapW + 10000;
        borda.scrollY = mapH + 10000;

        // Câmera do minimap: renderiza em cima da borda, centralizada no mapa
        this.minimapCam = this.cameras.add(x, y, w, h);
        this.minimapCam.setZoom(zoom);
        this.minimapCam.centerOn(mapW / 2, mapH / 2);

        // Marcador: cabeça do Marcielo no mundo, tamanho = 32px / zoom para ser fixo na tela
        const tamanho = 32 / zoom;
        this.minimapMarcador = this.add.image(this.player.x, this.player.y, 'marcielocabeca')
            .setDisplaySize(tamanho, tamanho)
            .setDepth(9999);

        // Oculta o marcador da câmera principal e da borda — só o minimap o vê
        this.cameras.main.ignore(this.minimapMarcador);
        borda.ignore(this.minimapMarcador);

    }

    pegarLojaMaisProxima(objeto) {
        if (!this.lojas || this.lojas.length === 0) return null; // No stores available

        let lojaMaisProxima = this.lojas[0];
        let menorDistancia = this.distanciaEntreObjetos(objeto, this.lojas[0]);

        for (let i = 1; i < this.lojas.length; i++) {
            const distancia = this.distanciaEntreObjetos(objeto, this.lojas[i]);
            if (distancia < menorDistancia) {
                lojaMaisProxima = this.lojas[i];
                menorDistancia = distancia;
            }
        }

        return lojaMaisProxima;
    }

    distanciaEntreObjetos(obj1, obj2) {
        const dx = obj2.x - obj1.x;
        const dy = obj2.y - obj1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Loop principal da cena — executado a cada frame.
     *
     * Responsabilidades:
     *   - Atualiza o jogador, a seta de indicação e os carros.
     *   - Controla o brilho das portas das lojas e da Central com base na distância do jogador.
     *   - Atualiza o marcador de posição no minimapa.
     *   - Gerencia a flag `entradaLojasLiberada` para evitar reentrada imediata ao retornar de uma loja.
     *   - Chama `_atualizarBloqueioLojaRetorno()` para liberar a porta da loja de onde o jogador saiu.
     *   - Processa a animação cinemática dos balões decorativos (MU no X, MUV no Y).
     */
    update() {
        const painelNpcsAberto = Boolean(this.painelNpcs?.visible);

        this.seta.definirAlvo(this.pegarLojaMaisProxima(this.player));

        this.player.update();
        if (!painelNpcsAberto) {
            this.seta.update(this.player, Math.PI);
        }

        // --- 1. LÓGICA DAS PORTAS DAS LOJAS ---
        this.lojas.forEach(loja => {
            const porta = loja.getPorta();
            if (!porta?.brilho) return;

            const distanciaLoja = Phaser.Math.Distance.Between(
                this.player.x, this.player.y,
                porta.brilho.x, porta.brilho.y
            );

            const raioMaxLoja = 400;
            const raioMinLoja = 390;

            if (distanciaLoja >= raioMaxLoja) {
                // Longe: não toca no alpha, o tween pulsa livremente
                return;
            }

            // Perto ou na zona de transição: sobrescreve o alpha do tween
            const alpha = Phaser.Math.Clamp(
                (distanciaLoja - raioMinLoja) / (raioMaxLoja - raioMinLoja) * 0.25,
                0, 0.25
            );
            porta.brilho.setAlpha(alpha);
        });


        // --- 2. LÓGICA DA PORTA DA CENTRAL CIELO ---
        if (this.portaCentralGlow) {
            const distanciaCentral = Phaser.Math.Distance.Between(
                this.player.x, this.player.y,
                this.portaCentralGlow.x, this.portaCentralGlow.y
            );

            const raioMaxCentral = 400;
            const raioMinCentral = 390;

            if (distanciaCentral < raioMaxCentral) {

                if (this.portaCentralTween && this.portaCentralTween.isPlaying()) {
                    this.portaCentralTween.pause();
                }

                // E faz o fade out suave baseado na distância
                const alphaCentral = Phaser.Math.Clamp(
                    (distanciaCentral - raioMinCentral) / (raioMaxCentral - raioMinCentral) * 0.8,
                    0, 0.8
                );
                this.portaCentralGlow.setAlpha(alphaCentral);

            } else {
                // Se está longe, SOLTA a animação para ele voltar a piscar
                if (this.portaCentralTween && this.portaCentralTween.isPaused()) {
                    this.portaCentralTween.resume();
                }
            }
        }

        if (this.portaCentral) {
            this.portaCentral.update();
        }

        if (this.portasPorNomeLoja) {
            Object.values(this.portasPorNomeLoja).forEach(porta => {
                if (porta) {
                    porta.update();
                }
            });
        }

        for (let i = 0; i < this.carrinho.length; i++) {
            this.carrinho[i].update();
        }

        // Atualiza posição do marcador no minimap
        if (!painelNpcsAberto && this.minimapMarcador) {
            this.minimapMarcador.x = this.player.x;
            this.minimapMarcador.y = this.player.y;
        }

        // Evita reentrada automática: só libera entrada após sair do contato com portas.
        if (!this.entradaLojasLiberada) {
            const passouTempoMinimo = this.time.now >= this.tempoMinimoLiberarEntradaLojas;
            const distanciaDoSpawnCidade = Phaser.Math.Distance.Between(
                this.player.x,
                this.player.y,
                this.posicaoSpawnCidadeX,
                this.posicaoSpawnCidadeY
            );
            const afastouDoSpawnCidade = distanciaDoSpawnCidade > 120;

            if (passouTempoMinimo && (afastouDoSpawnCidade || !this._jogadorSobrepoeAlgumaPorta())) {
                this.entradaLojasLiberada = true;
            }
        }

        this._atualizarBloqueioLojaRetorno();

        // animação dos balões (MU no X e MUV no Y): atualiza a posição de cada balão que ainda está em animação
        // converte o tempo do frame de milissegundos para segundos
        const dt = this.game.loop.delta / 1000;

        for (let balao of this.decoracoesBaloes) {
            // pula balões que já terminaram a animação (_anim é null após o fim)
            if (!balao._anim) continue;

            const a = balao._anim;

            // avança o tempo, limitando ao máximo para não ultrapassar a duração
            a.t = Math.min(a.t + dt, a.duracao);

            // MU no eixo X: x(t) = xi + vx * t  (velocidade constante)
            balao.x = a.xInicial + a.vx * a.t;

            // Posição Y pelo MUV: y(t) = yi + ½ * ay * t²
            balao.y = a.yInicial + 0.5 * a.ay * a.t * a.t;

            // Velocidade instantânea no eixo Y: vy(t) = ay * t
            const vy = a.ay * a.t;

            // Log cinemático: imprime t, posição e velocidades a cada 0,5s aproximadamente
            if (Math.abs(a.t % 0.5) < dt) {
                console.log(
                    `[balão] t=${a.t.toFixed(2)}s | ` +
                    `x=${balao.x.toFixed(1)}px | y=${balao.y.toFixed(1)}px | ` +
                    `vx=${a.vx.toFixed(2)}px/s | vy=${vy.toFixed(2)}px/s | ` +
                    `ay=${a.ay.toFixed(2)}px/s²`
                );
            }

            if (a.t >= a.duracao) {
                balao._anim = null;
            }
        }
    }

    _atualizarBloqueioLojaRetorno() {
        if (!this.nomeLojaRetornoBloqueada) {
            return;
        }

        const portaRetorno = this.portasPorNomeLoja[this.nomeLojaRetornoBloqueada];

        if (!portaRetorno) {
            this.nomeLojaRetornoBloqueada = null;
            return;
        }

        const distanciaAtePorta = Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            portaRetorno.x,
            portaRetorno.y
        );

        // Libera a loja de retorno quando o jogador se afasta da porta.
        if (distanciaAtePorta > 260) {
            this.nomeLojaRetornoBloqueada = null;
        }
    }

    _jogadorSobrepoeAlgumaPorta() {
        for (let i = 0; i < this.lojas.length; i++) {
            const loja = this.lojas[i];

            if (!loja) {
                continue;
            }

            const porta = loja.getPorta();

            if (porta && this.physics.overlap(this.player, porta)) {
                return true;
            }
        }

        return false;
    }

    criarPainelNpcs() {
        // Centralizar painel na tela (vertical e horizontal)
        const larguraTela = this.cameras.main.width;
        const alturaTela = this.cameras.main.height;
        const profundidadePainelNpcs = 10000;
        this.painelNpcs = this.add.container(larguraTela / 2, alturaTela / 2).setScrollFactor(0).setDepth(profundidadePainelNpcs);

        // Fundo escuro semitransparente (menor para garantir visibilidade)
        const larguraPainel = 1600;
        const alturaPainel = 1200;
        const fundo = this.add.rectangle(0, 0, larguraPainel, alturaPainel, 0x000820, 0.92)
            .setStrokeStyle(6, 0xffffff, 0.7)
            .setOrigin(0.5)
            .setScrollFactor(0);
        this.painelNpcs.add(fundo);


        // Grid de NPCs com visual aprimorado
        const npcs = obterListaNpcs();
        const colunas = 4;
        const linhas = 3;
        const espacamentoX = 440;
        const espacamentoY = 440;
        const offsetX = -((colunas - 1) * espacamentoX) / 2;
        const offsetY = -((linhas - 1) * espacamentoY) / 2;

        npcs.forEach((npc, i) => {
            const linha = Math.floor(i / colunas);
            const coluna = i % colunas;
            const x = offsetX + coluna * espacamentoX;
            const y = offsetY + linha * espacamentoY;

            // Fundo visual: sprite "circulo-npc.png"
            const fundo = this.add.image(x, y, 'circulo-npc')
                .setDisplaySize(600, 600)
                .setScrollFactor(0);

            // Tint por estado
            if (npc.estado === 'interagido') fundo.setTint(0xff3333);
            else if (npc.estado === 'conquistado') fundo.setTint(0x3388ff);
            else fundo.setTint(0xffffff);

            this.painelNpcs.add(fundo);

            // Portrait do NPC centralizado
            const portraitKey = `${npc.id}-${npc.estado}`;
            const portrait = this.add.image(x, y, portraitKey)
                .setDisplaySize(600, 600)
                .setScrollFactor(0);
            this.painelNpcs.add(portrait);
        });

        this.painelNpcs.setVisible(false);
    }

    // Recalcula as listas de lojas conquistadas e não conquistadas com base
    // no estado persistido dos NPCs (fonte de verdade do progresso).
    atualizarListasLojas() {
        const { lojasConquistadas, lojasNaoConquistadas } = obterListasLojasPorConquista();
        this.lojasConquistadas = lojasConquistadas;
        this.lojasNaoConquistadas = lojasNaoConquistadas;
    }

    // Método para percorre todos os portraits do painel e atualiza a textura de cada um conforme o estado atual do NPC. Assim, qualquer mudança de progresso é refletida visualmente imediatamente.
    atualizarPainelNpcs() {
        if (!this.painelNpcs) return;
        const npcs = obterListaNpcs();
        this.painelNpcs.iterate((portrait, i) => {
            const npc = npcs[i];
            if (npc) {
                portrait.setTexture(obterCaminhoImagemNpc(npc.id, npc.estado));
            }
        });
    }
}

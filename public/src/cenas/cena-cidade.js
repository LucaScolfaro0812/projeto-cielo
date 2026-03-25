
// importa as outras classes que contém objetos e dados do jogo
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
import { colisoresAmbiente } from '../utilitarios/configuracao-colisores-ambiente.js';

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
            // Preload do fundo visual dos NPCs no popup
            this.load.image('circulo-npc', 'assets/sprites/npcs/circulo-npc.png');
        // Imagens estáticas
        this.load.image('rua', 'assets/imagens/ambiente/mapa.png');

        // Carrega todas as imagens de lojas
        for (let i = 0; i < this.lojasConfigs.length; i++) {
            let lojaKey = 'loja' + this.lojasConfigs[i].nomeLoja + 'Fisica';
            this.load.image(lojaKey, `assets/imagens/lojas/exterior/${lojaKey}.png`);
        }

        // Preload das variacoes de baloes usadas como decoracao externa.
        Object.values(VariantesBaloes).forEach((item) => {
            if (!this.textures.exists(item.chave)) {
                this.load.image(item.chave, item.caminho);
            }
        });

        // Preload da imagem de portrait do NPC para a HUD, usando o primeiro NPC da lista como referência.
        const npc = obterListaNpcs()[0];
        this.load.image("npcPortraitHud", obterCaminhoImagemNpc(npc.id, npc.estado));

        const npcs = obterListaNpcs();
        npcs.forEach(npc => {
            this.load.image(
                obterCaminhoImagemNpc(npc.id, npc.estado),
                obterCaminhoImagemNpc(npc.id, npc.estado)
            );
        });

        // Pré carrega os objetos com uma função estática
        Jogador.preload(this);
        Npc.preload(this);
        LojaFisica.preload(this);
        Carro.preload(this);
    }

    // Método executado quando a cena é criada
    create() {
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

        // Abre o menu de pause ao pressionar ESC, passando a chave desta cena
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('pauseScene', { cenaAnterior: this.scene.key });
        });

        this.input.keyboard.on('keydown-T', () => {
            this._abrirTutorial();
        });


        // HUD de progresso dos NPCs - design moderno e acessível
        // Remove qualquer HUD antigo antes de criar o novo
        if (this.hudNpcUI) {
            this.hudNpcUI.destroy();
        }

        // Dados de progresso
        const npcs = obterListaNpcs();
        const totalNpcs = npcs.length;
        const conquistados = npcs.filter(npc => npc.estado === "conquistado").length;

        // Importa o novo componente visual
        // (import já está no topo do arquivo)

        this.hudNpcUI = new InterfaceProgressoNpc(
            this,
            conquistados,
            totalNpcs,
            () => {
                if (this.painelNpcs) {
                    this.painelNpcs.setVisible(!this.painelNpcs.visible);
                }
            }
        );

        this.criarPainelNpcs();

        if (this.mostrarTutorialAoEntrar) {
            this._abrirTutorial();
        }
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
            const rect = this.add.rectangle(c.x, c.y, c.w, c.h);
            this.physics.add.existing(rect, true);
            this.colisoresAmbiente.add(rect);
        }

        this.physics.add.collider(this.player, this.colisoresAmbiente);
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
        this.player.setScale(0.8);

        this.carrinho = [];

        const ruas = [2123, 4065, 6359];
        ruas.forEach((y) => {
            for (let i = 0; i < 5; i++) {
                const carro = new Carro(this, i * 2500, y, true);
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
     * Cria portas de entrada para outras cenas
     * Cria lojas para entrar
     * e configura a troca de cena ao colidir com o player
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

    // Método executado a cada frame do jogo
    update() {

        // Atualiza lógica de movimentação e estado do jogador
        this.player.update();

        if (this.porta) {
            this.porta.update();
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
        this.painelNpcs = this.add.container(larguraTela / 2, alturaTela / 2).setScrollFactor(0).setDepth(9999);

        // Fundo escuro semitransparente (menor para garantir visibilidade)
        const larguraPainel = 1200;
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
        const espacamentoX = 400;
        const espacamentoY = 400;
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
            const caminhoImagem = obterCaminhoImagemNpc(npc.id, npc.estado);
            const portrait = this.add.image(x, y, caminhoImagem)
                .setDisplaySize(600, 600)
                .setScrollFactor(0);
            this.painelNpcs.add(portrait);
        });

        this.painelNpcs.setVisible(false);
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

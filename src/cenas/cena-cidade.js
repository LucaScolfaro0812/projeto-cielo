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
            // Garante que o overlay de morte seja removido ao sair da cena
            this._removerDeathDiv();
        });
        // Revela a cena com fade azul Cielo
        revelarCena(this);

        this.somCidade = this.sound.add('somCidade', { loop: true, volume: 0.3 });
        this.somCidade.play();

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

        this._iniciarParticulasAmbiente();

        // Oculta partículas de folhas do minimap
        if (this.minimapCam && this.minimapBorda) {
            this.particulasAmbiente.forEach(e => {
                this.minimapCam.ignore(e);
                this.minimapBorda.ignore(e);
            });
        }

        // Referência ao div de morte (criado apenas quando o jogador morre)
        this._deathDiv = null;
    }

    /**
     * Cria partículas ambientes (folhas) espalhadas pelo mapa da cidade.
     */
    _iniciarParticulasAmbiente() {
        this.particulasAmbiente = [];

        if (!this.textures.exists('folha-particula')) {
            const g = this.make.graphics({ x: 0, y: 0, add: false });
            g.fillStyle(0x5a9e44, 1);
            g.fillEllipse(4, 7, 8, 14);
            g.generateTexture('folha-particula', 8, 14);
            g.destroy();
        }

        this._eventoVento = this.time.addEvent({
            delay: 210,
            loop: true,
            callback: () => {
                const cam = this.cameras.main;
                const vh = cam.worldView.height;

                const x = cam.worldView.x - 20;
                const y = cam.worldView.y + Phaser.Math.Between(0, vh);

                const folha = this.add.image(x, y, 'folha-particula');
                folha.setScale(Phaser.Math.FloatBetween(0.8, 1.4));
                folha.setAlpha(0.9);
                folha.setDepth(200);

                const distancia = Phaser.Math.Between(1200, 2500);
                const duracao = Phaser.Math.Between(6000, 10000);

                this.tweens.add({
                    targets: folha,
                    x: x + distancia,
                    y: y + Phaser.Math.Between(-40, 40),
                    angle: Phaser.Math.Between(-270, 270),
                    alpha: 0,
                    duration: duracao,
                    ease: 'Linear',
                    onComplete: () => folha.destroy()
                });

                this.particulasAmbiente.push(folha);
            }
        });
    }

    /**
     * Chamado quando o jogador morre.
     * Cria um div HTML por cima do canvas com blur + escurecimento,
     * exibe os textos de morte e reinicia a cena após 4s.
     */
    onPlayerDeath(tinhaMaquininhas = false) {
        if (this._deathDiv) return;

        const canvas = this.game.canvas;
        const pai = canvas.parentElement;

        if (pai.style.position === '' || pai.style.position === 'static') {
            pai.style.position = 'relative';
        }

        const div = document.createElement('div');
        div.style.cssText = `
            position: absolute;
            top: ${canvas.offsetTop}px;
            left: ${canvas.offsetLeft}px;
            width: ${canvas.offsetWidth}px;
            height: ${canvas.offsetHeight}px;
            background: rgba(0, 0, 0, 0);
            backdrop-filter: blur(0px);
            pointer-events: none;
            z-index: 999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: background 0.8s ease, backdrop-filter 0.8s ease;
        `;

        // Só cria os textos se o jogador tinha maquininhas ao morrer
        if (tinhaMaquininhas) {
            const texto = document.createElement('div');
            texto.innerText = 'Você foi atropelado, tome mais cuidado!';
            texto.style.cssText = `
                color: #ffffff;
                font-size: 28px;
                font-family: Arial Black, Arial, sans-serif;
                font-weight: 900;
                text-align: center;
                text-shadow: 0 2px 16px rgba(0,0,0,0.9), 0 0px 4px rgba(0,0,0,1);
                opacity: 0;
                transition: opacity 0.5s ease 0.4s;
                padding: 0 32px;
            `;

            const subtexto = document.createElement('div');
            subtexto.innerText = 'Recupere suas maquininhas na Central Cielo';
            subtexto.style.cssText = `
                color: #a8d8ff;
                font-size: 18px;
                font-family: Arial, sans-serif;
                font-weight: 400;
                text-align: center;
                text-shadow: 0 2px 8px rgba(0,0,0,0.9);
                opacity: 0;
                transition: opacity 0.5s ease 0.7s;
                padding: 8px 32px 0;
            `;

            div.appendChild(texto);
            div.appendChild(subtexto);
        }

        pai.appendChild(div);
        this._deathDiv = div;

        requestAnimationFrame(() => {
            div.style.background = 'rgba(0, 0, 0, 0.55)';
            div.style.backdropFilter = 'blur(6px)';
            const textos = div.querySelectorAll('div');
            textos.forEach(t => t.style.opacity = '1');
        });

        this.time.delayedCall(4000, () => {
            this.onPlayerRespawn();
        });
    }

    /**
     * Reverte o efeito de morte com fade out e reinicia a cena.
     */
    onPlayerRespawn() {
        if (!this._deathDiv) return;

        const div = this._deathDiv;
        const textos = div.querySelectorAll('div');

        // Fade out de todos os textos
        textos.forEach(t => {
            t.style.transition = 'opacity 0.4s ease';
            t.style.opacity = '0';
        });

        // Fade out do blur e escurecimento
        div.style.transition = 'background 0.6s ease, backdrop-filter 0.6s ease';
        div.style.background = 'rgba(0, 0, 0, 0)';
        div.style.backdropFilter = 'blur(0px)';

        // Remove o div e reinicia a cena após a transição terminar
        setTimeout(() => {
            this._removerDeathDiv();
            if (this.somCidade && this.somCidade.isPlaying) {
                this.somCidade.stop();
            }
            this.scene.start('gameScene', { mostrarTutorial: false });
        }, 650);
    }

    /**
     * Remove o div de overlay de morte do DOM com segurança.
     */
    _removerDeathDiv() {
        if (this._deathDiv) {
            this._deathDiv.remove();
            this._deathDiv = null;
        }
    }

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
        const idSpawnCidade = consumirSpawnCidade();
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

        if (this.corpoColisaoBancada) {
            this.physics.add.collider(this.player, this.corpoColisaoBancada);
        }
    }

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

        this.predioCentral = this.add.image(centralX, centralY, 'predioCentral');
        this.predioCentral.setDepth(1);
        this.predioCentral.setScale(1.5);

        this.paredesCentral = this.physics.add.staticGroup();

        const totalW = this.predioCentral.displayWidth;
        const totalH = this.predioCentral.displayHeight;

        const espessuraParede = 30;

        const topRect = this.add.rectangle(centralX, (centralY - totalH / 1.5) + espessuraParede / 2, totalW, espessuraParede);
        this.paredesCentral.add(topRect);

        const lateralH = totalH * 0.8;
        const lateralW = totalW * 0.4;

        const leftRect = this.add.rectangle((centralX - totalW / 2) + lateralW / 2, (centralY - totalH / 1.5) + lateralH / 2, lateralW, lateralH);
        this.paredesCentral.add(leftRect);

        const rightRect = this.add.rectangle((centralX + totalW / 2) - lateralW / 2, (centralY - totalH / 1.5) + lateralH / 2, lateralW, lateralH);
        this.paredesCentral.add(rightRect);

        topRect.setVisible(false);
        leftRect.setVisible(false);
        rightRect.setVisible(false);

        this.physics.add.collider(this.player, this.paredesCentral);

        const portaY = centralY + 180;
        const portaX = centralX;

        const brilhoOffsetX = -5;
        const brilhoOffsetY = -95;

        this.portaCentralGlow = this.add.sprite(
            portaX + brilhoOffsetX,
            portaY + brilhoOffsetY,
            'entrada_animada',
            0
        );

        this.portaCentralGlow.setTintFill(0xCD853F);
        this.portaCentralGlow.setScale(2.8);
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

            this.registry.set('spawnCentral', 'porta');

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

            if (config.nomeLoja === this.nomeLojaRetornoBloqueada) {
                return;
            }

            definirProximoSpawnCidade(config.nomeLoja);

            portaEntrada.trocarDeCena();

            if (this.somCidade && this.somCidade.isPlaying) {
                this.somCidade.stop();
            }
        });

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

            const xFinal = spriteBaloes.x;
            const yFinal = spriteBaloes.y;

            const duracao = 2 + i * 0.3;

            this.animarElemento(xFinal - 150, yFinal + 300, xFinal, yFinal, duracao, spriteBaloes);

            this.decoracoesBaloes.push(spriteBaloes);
        }
    }

    animarElemento(xInicial, yInicial, xFinal, yFinal, duracao, elemento) {
        const vx = (xFinal - xInicial) / duracao;
        const ay = 2 * (yFinal - yInicial) / (duracao * duracao);

        elemento.x = xInicial;
        elemento.y = yInicial;

        elemento._anim = {
            xInicial,
            yInicial,
            vx,
            ay,
            duracao,
            t: 0
        };
    }

    _criarMinimap() {
        const mapW = this.fundo.displayWidth;
        const mapH = this.fundo.displayHeight;

        const x = 16, y = 16, w = 220, h = 130;

        const zoom = Math.max(w / mapW, h / mapH);

        this.minimapBorda = this.cameras.add(x - 3, y - 3, w + 6, h + 6);
        const borda = this.minimapBorda;
        borda.setBackgroundColor(0x88bbff);
        borda.scrollX = mapW + 10000;
        borda.scrollY = mapH + 10000;

        this.minimapCam = this.cameras.add(x, y, w, h);
        this.minimapCam.setZoom(zoom);
        this.minimapCam.centerOn(mapW / 2, mapH / 2);

        const tamanho = 32 / zoom;
        this.minimapMarcador = this.add.image(this.player.x, this.player.y, 'marcielocabeca')
            .setDisplaySize(tamanho, tamanho)
            .setDepth(9999);

        this.cameras.main.ignore(this.minimapMarcador);
        borda.ignore(this.minimapMarcador);
    }

    pegarLojaMaisProxima(objeto) {
        if (!this.lojas || this.lojas.length === 0) return null;

        let lojaMaisProxima = null;
        let menorDistancia = Number.POSITIVE_INFINITY;

        for (let i = 0; i < this.lojas.length; i++) {
            if (this.lojasConquistadas.includes(this.lojasConfigs[i].nomeLoja)) {
                continue;
            }

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
     * Define o alvo da seta com prioridade de recarga:
     * - Sem maquininhas: seta aponta exclusivamente para a Central da Cielo.
     * - Com maquininhas: seta volta a guiar para a loja mais próxima.
     */
    _pegarAlvoPrioritarioSeta() {
        if (Maquininhas.qntMaquininhas === 0) {
            return this.portaCentral || this.portaCentralGlow || this.predioCentral || null;
        }

        return this.pegarLojaMaisProxima(this.player);
    }

    update() {
        console.log(this.lojasConquistadas + '\n' + this.lojasNaoConquistadas);

        const painelNpcsAberto = Boolean(this.painelNpcs?.visible);

        this.seta.definirAlvo(this._pegarAlvoPrioritarioSeta());

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
                return;
            }

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

                const alphaCentral = Phaser.Math.Clamp(
                    (distanciaCentral - raioMinCentral) / (raioMaxCentral - raioMinCentral) * 0.8,
                    0, 0.8
                );
                this.portaCentralGlow.setAlpha(alphaCentral);

            } else {
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

        // animação dos balões (MU no X e MUV no Y)
        const dt = this.game.loop.delta / 1000;

        for (let balao of this.decoracoesBaloes) {
            if (!balao._anim) continue;

            const a = balao._anim;

            a.t = Math.min(a.t + dt, a.duracao);

            balao.x = a.xInicial + a.vx * a.t;
            balao.y = a.yInicial + 0.5 * a.ay * a.t * a.t;

            const vy = a.ay * a.t;

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
        const larguraTela = this.cameras.main.width;
        const alturaTela = this.cameras.main.height;
        const profundidadePainelNpcs = 10000;
        this.painelNpcs = this.add.container(larguraTela / 2, alturaTela / 2).setScrollFactor(0).setDepth(profundidadePainelNpcs);

        const larguraPainel = 1600;
        const alturaPainel = 1200;
        const fundo = this.add.rectangle(0, 0, larguraPainel, alturaPainel, 0x000820, 0.92)
            .setStrokeStyle(6, 0xffffff, 0.7)
            .setOrigin(0.5)
            .setScrollFactor(0);
        this.painelNpcs.add(fundo);

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

            const fundo = this.add.image(x, y, 'circulo-npc')
                .setDisplaySize(600, 600)
                .setScrollFactor(0);

            if (npc.estado === 'interagido') fundo.setTint(0xff3333);
            else if (npc.estado === 'conquistado') fundo.setTint(0x3388ff);
            else fundo.setTint(0xffffff);

            this.painelNpcs.add(fundo);

            const portraitKey = `${npc.id}-${npc.estado}`;
            const portrait = this.add.image(x, y, portraitKey)
                .setDisplaySize(600, 600)
                .setScrollFactor(0);
            this.painelNpcs.add(portrait);

            const badgeR = 38;
            const badgeX = x + 110;
            const badgeY = y + 110;
            const corBadge = [
                0x22aa55, 0x9944cc, 0xff6633, 0xcc2222,
                0x22aaaa, 0xcc9922, 0x44aa22, 0xff4422,
                0x3344cc, 0xcc3388, 0x8844aa, 0x228899,
            ][i] ?? 0x555555;

            const badgeCirculo = this.add.circle(badgeX, badgeY, badgeR, corBadge).setScrollFactor(0);
            const badgeBorda = this.add.circle(badgeX, badgeY, badgeR).setStrokeStyle(4, 0xffffff, 1).setScrollFactor(0);
            const badgeTexto = this.add.text(badgeX, badgeY, String(i + 1), {
                fontFamily: 'Arial Black', fontSize: '42px', color: '#ffffff'
            }).setOrigin(0.5, 0.5).setScrollFactor(0);
            this.painelNpcs.add([badgeCirculo, badgeBorda, badgeTexto]);
        });

        const CORES_LEG = [
            0x22aa55, 0x9944cc, 0xff6633, 0xcc2222,
            0x22aaaa, 0xcc9922, 0x44aa22, 0xff4422,
            0x3344cc, 0xcc3388, 0x8844aa, 0x228899,
        ];
        const NOMES_LEG = [
            'Cafe', 'Games', 'Beleza', 'Roupas', 'Pet', 'Movel',
            'Frutaria', 'Lanchonete', 'Chocolate', 'Pelucia', 'Autoescola', 'Joalheria'
        ];

        const legW = 280;
        const legItemH = alturaPainel / (NOMES_LEG.length + 1);
        const raioLeg = 18;
        const legX = larguraPainel / 2 + 20;
        const legTopY = -alturaPainel / 2;

        const legFundo = this.add.rectangle(legX + legW / 2, 0, legW, alturaPainel, 0x071a2d, 0.95)
            .setOrigin(0.5, 0.5).setScrollFactor(0).setStrokeStyle(4, 0x6fd1ff, 0.5);
        this.painelNpcs.add(legFundo);

        const legTitulo = this.add.text(legX + legW / 2, legTopY + 24, 'LEGENDA', {
            fontFamily: 'Arial Black', fontSize: '22px', color: '#6fd1ff'
        }).setOrigin(0.5, 0).setScrollFactor(0);
        this.painelNpcs.add(legTitulo);

        NOMES_LEG.forEach((nome, i) => {
            const conquistada = npcs[i]?.estado === 'conquistado';
            const cor = conquistada ? CORES_LEG[i] : 0x555555;
            const ix = legX + 16;
            const iy = legTopY + 60 + i * legItemH + legItemH / 2;

            const circ = this.add.circle(ix + raioLeg, iy, raioLeg, cor).setScrollFactor(0);
            const borda = this.add.circle(ix + raioLeg, iy, raioLeg).setStrokeStyle(3, 0xffffff, 0.7).setScrollFactor(0);
            const num = this.add.text(ix + raioLeg, iy, String(i + 1), {
                fontFamily: 'Arial Black', fontSize: '18px', color: '#ffffff'
            }).setOrigin(0.5, 0.5).setScrollFactor(0);
            const label = this.add.text(ix + raioLeg * 2 + 8, iy, nome, {
                fontFamily: 'Arial', fontSize: '18px',
                color: conquistada ? '#e8f4ff' : '#888888'
            }).setOrigin(0, 0.5).setScrollFactor(0);

            this.painelNpcs.add([circ, borda, num, label]);
        });

        this.painelNpcs.setVisible(false);
    }

    atualizarListasLojas() {
        const { lojasConquistadas, lojasNaoConquistadas } = obterListasLojasPorConquista();
        this.lojasConquistadas = lojasConquistadas;
        this.lojasNaoConquistadas = lojasNaoConquistadas;
    }

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
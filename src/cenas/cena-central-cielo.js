import Jogador from '../entidades/jogador.js';
import Entrada from '../entidades/loja-entrar.js';
import { definirProximoSpawnCidade, consumirTutorialInicial, consumirDialogoInicialCentral, consumirDialogoPosRecargaCentral } from "../utilitarios/estado-jogo.js";
import { Maquininhas } from '../sistemas/maquininhas.js';
import HudMaquininhas from '../sistemas/hud-maquininhas.js';

/**
 * CenaCentral — Interior da Central da Cielo.
 *
 * É o ponto de apoio do jogador durante a partida. Permite recarregar
 * maquininhas ao se aproximar do NPC e pressionar E (só aparece o botão
 * quando o estoque está abaixo do máximo).
 *
 * Na primeira visita (quando `data.mostrarDialogoInicial` é true), exibe
 * um diálogo de introdução com 7 falas do personagem Thiago, digitadas
 * letra a letra. O jogador avança com ESPAÇO.
 *
 * Fluxo de abertura do diálogo:
 *   - Se o tutorial também for exibido, o diálogo aguarda o tutorial fechar
 *     (`aguardandoDialogoAposTutorial`). A cena `CenaMenu` chama
 *     `aoFecharTutorialOverlay()` quando o tutorial encerra.
 *   - Sem tutorial, o diálogo abre com um delay de 120 ms após o `create()`.
 */
export class CenaCentral extends Phaser.Scene {
    constructor(){
        super({key: 'centralScene'});
        this.fundoImage = "cieloVazia";
        // Evita reabrir o diálogo se a cena for reiniciada sem novo jogo
        this.dialogoIntroducaoExibido = false;
        // Bloqueia a movimentação e a recarga enquanto o diálogo está aberto
        this.dialogoAberto = false;
        // True quando tutorial e diálogo devem aparecer juntos: diálogo aguarda o tutorial fechar
        this.aguardandoDialogoAposTutorial = false;
        this.falasIntroducao = [
            'Seja bem-vindo As aventuras de Marcielo. Eu sou Thiago e vou te acompanhar nesse começo.',
            'Você será representado pelo Marcielo, um Gerente de Negócios da Cielo, nessa jornada.',
            'Seu desafio é visitar as lojas da cidade, conversar com os comerciantes e entender o que cada negócio precisa para atender melhor.',
            'Preste atenção nas conversas e nas perguntas, porque é assim que você descobre qual solução faz mais sentido para cada cliente.',
            'A Central da Cielo é o seu ponto de apoio, e as maquininhas são parte essencial da sua missão.',
            'É sempre importante andar com a maquininha para garantir a instalação imediata e a ativação do cliente',
            'Então aproveite a jornada, explore a cidade e, sempre que precisar, volte para a Central para recarregar suas maquininhas e seguir em frente.'
        ];
        this.falasPosRecarga = [
            'Sempre importante você andar com máquinas para garantir o instala direto. E garantir a ativação do cliente, pode sair pela porta. Bom atendimento.'
        ];
        this.estadoDialogo = null;
    }
    
    preload() {
        this.load.image(this.fundoImage, `assets/imagens/central-cielo/${this.fundoImage}.png`);
        
        Jogador.preload(this);
        Entrada.preload(this);

        this.load.image('cieloBalcão', 'assets/imagens/central-cielo/cieloBalcao.png');
        this.load.image('cieloComputador', 'assets/imagens/central-cielo/cieloComputador.png');
        this.load.image('cieloFiltro', 'assets/imagens/central-cielo/cieloFiltro.png');
        this.load.image('cieloPlanta', 'assets/imagens/central-cielo/cieloPlanta.png');
        this.load.image('cieloPlaca', 'assets/imagens/central-cielo/cieloPlaca.png');
        this.load.image('cieloNPC', 'assets/imagens/central-cielo/cieloNPC.png');

        this.load.image('maquininhaCielo', 'assets/imagens/maquininha-cielo.png');

        // Carrega som da porta
        if (!this.cache.audio.exists('portaAbrindo')) {
            this.load.audio('portaAbrindo', 'assets/sons/portaAbrindo.mp3');
        }

        // Carrega música ambiente da Central Cielo
        if (!this.cache.audio.exists('ambienteCielo')) {
            this.load.audio('ambienteCielo', 'assets/sons/ambienteCielo.mp3');
        }

        if (!this.cache.audio.exists('somEscrita')) {
            this.load.audio('somEscrita', 'assets/sons/somEscrita.mp3');
        }
    }

    init(data = {}) {
        this.mostrarTutorial = consumirTutorialInicial();
        this.mostrarDialogoInicial = consumirDialogoInicialCentral() || Boolean(data.mostrarDialogoInicial);

        if (this.mostrarDialogoInicial) {
            this.dialogoIntroducaoExibido = false;
            this.dialogoAberto = false;
            this.estadoDialogo = null;
        }

        this.aguardandoDialogoAposTutorial = this.mostrarTutorial && this.mostrarDialogoInicial;
    }

    create() {
        this._criarCenario();

        if (this.cache.audio.exists('portaAbrindo')) {
             this.sound.stopByKey('portaAbrindo');
            this.sound.play('portaAbrindo');
}

        // Inicia música ambiente em loop
       if (this.cache.audio.exists('ambienteCielo')) {
            this.sound.stopByKey('ambienteCielo');
            this.somAmbiente = this.sound.add('ambienteCielo', { loop: true, volume: 0.3 });
            this.somAmbiente.play();
            }   

        // Para o som ao sair ou destruir a cena
        this.events.on('shutdown', () => this._pararAudio());
        this.events.on('destroy', () => this._pararAudio());
        this.events.on('shutdown', () => {
            if (this._coletarMaquininhasHandler) {
                this.input.keyboard.off('keydown-E', this._coletarMaquininhasHandler);
            }
        });
        this.events.on('destroy', () => {
            if (this._coletarMaquininhasHandler) {
                this.input.keyboard.off('keydown-E', this._coletarMaquininhasHandler);
            }
        });

        if (this.mostrarTutorial) {
            this.scene.pause();
            this.scene.launch('tutorialScene', { cenaOrigem: this.scene.key, modoOverlay: true });
            this.scene.bringToTop('tutorialScene');
        }

        this.balcao = this.physics.add.staticImage(1150, 470, 'cieloBalcão');
        this.filtro = this.physics.add.staticImage(2000, 400, 'cieloFiltro');
        this.planta = this.physics.add.staticImage(100, 450, 'cieloPlanta');
        this.computador = this.physics.add.staticImage(2130, 750, 'cieloComputador');
        this.placa = this.physics.add.staticImage(1140, 120, 'cieloPlaca');
        this.npc = this.physics.add.staticImage(1160, 380, 'cieloNPC');
        this.npc.setScale(0.3);

        const portaX = 400;
        const portaY = 415;

        let playerX = 1150; // Coordenada X padrão (Centro/Balcão)
        let playerY = 800;  // Coordenada Y padrão (Centro/Balcão)

        const localSpawn = this.registry.get('spawnCentral');

        if (localSpawn === 'porta') {
            // Se veio da rua, nasce na frente da porta
            playerX = portaX;
            playerY = portaY + 80; // Adicionei +80 no Y para ele nascer um pouco abaixo da porta e não colidir na hora
            
            // Limpa o aviso para que num "Novo Jogo" ele volte a nascer no centro
            this.registry.set('spawnCentral', 'centro'); 
        }

        // Cria o Jogador
        this.player = new Jogador(this, playerX, playerY);
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(150);
        this.player.setScale(0.8);
        this.player.velocidade = 650;

        // Conecta o jogador com cada um dos móveis estáticos para que ele colida com eles
        this.physics.add.collider(this.player, this.balcao);
        this.physics.add.collider(this.player, this.filtro);
        this.physics.add.collider(this.player, this.planta);
        this.physics.add.collider(this.player, this.computador);

        // Paredes invisíveis que delimitam as bordas internas da Central da Cielo.
        // Cada entrada é [x1, y1, x2, y2] representando dois pontos opostos do retângulo.
        // O código converte para centro (cx, cy) e dimensões (w, h) que o Phaser exige.
        const paredesData = [
            [9, 387, 311, 7],
            [339, 241, 459, 7],
            [462, 394, 2297, 2],
            [329, 270, 460, 4]
        ];
        this.paredes = paredesData.map(([x1, y1, x2, y2]) => {
            // Converte os dois pontos para centro + dimensões (formato do Phaser)
            const cx = (x1 + x2) / 2;
            const cy = (y1 + y2) / 2;
            const w = Math.abs(x2 - x1);
            const h = Math.abs(y2 - y1);
            const parede = this.add.rectangle(cx, cy, w, h);
            // true = corpo estático (não se move, mas bloqueia colisões)
            this.physics.add.existing(parede, true);
            this.physics.add.collider(this.player, parede);
            return parede;
        });

        // Cria a Porta de Saída para a Cidade
        this._criarPortaSaida(portaX, portaY);

        this.balaoRecarga = this.add.container(this.npc.x, this.npc.y - 92)
            .setDepth(300);
        const fundoBalaoRecarga = this.add.graphics();
        fundoBalaoRecarga.fillStyle(0x0a4f86, 0.98);
        fundoBalaoRecarga.lineStyle(3, 0xd9f4ff, 1);
        fundoBalaoRecarga.fillRoundedRect(-122, -34, 244, 76, 22);
        fundoBalaoRecarga.strokeRoundedRect(-122, -34, 244, 76, 22);

        const textoAperte = this.add.text(-62, -18, 'Aperte', {
            fontSize: '22px',
            fontFamily: 'Verdana, Arial, sans-serif',
            color: '#fff7a8',
            fontStyle: 'bold',
            stroke: '#063554',
            strokeThickness: 4
        }).setOrigin(0.5);

        const textoTecla = this.add.text(30, -19, 'E', {
            fontSize: '32px',
            fontFamily: 'Verdana, Arial, sans-serif',
            color: '#ffffff',
            fontStyle: 'bold',
            stroke: '#063554',
            strokeThickness: 5
        }).setOrigin(0.5);

        const textoColeta = this.add.text(0, 12, 'para coletar máquinas', {
            fontSize: '18px',
            fontFamily: 'Verdana, Arial, sans-serif',
            color: '#ffffff',
            fontStyle: 'bold',
            stroke: '#063554',
            strokeThickness: 3,
            align: 'center'
        }).setOrigin(0.5);

        this.balaoRecarga.add([fundoBalaoRecarga, textoAperte, textoTecla, textoColeta]);
        this.tempoAnimacaoBotao = 0;
        this.balaoRecarga.setVisible(true);

        // Teclas de interação
        this.input.keyboard.enabled = true;
        this.input.keyboard.manager.enabled = true;
        this.input.keyboard.removeCapture(Phaser.Input.Keyboard.KeyCodes.E);
        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.teclaEspaco = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this._coletarMaquininhasHandler = () => this._coletarMaquininhas();
        this.input.keyboard.on('keydown-E', this._coletarMaquininhasHandler);

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('pauseScene', { cenaAnterior: this.sys.settings.key });
        });

        this.input.keyboard.on('keydown-T', () => {
            this._abrirTutorial();
        });

        const zoomX = this.cameras.main.width / this.fundo.displayWidth;
        const zoomY = this.cameras.main.height / this.fundo.displayHeight;
        this.cameras.main.setZoom(Math.max(zoomX, zoomY));
        this.cameras.main.centerOn(this.fundo.displayWidth / 2, this.fundo.displayHeight / 2);

        this.hudMaquininhas = new HudMaquininhas(this);

        if (this.mostrarDialogoInicial && !this.mostrarTutorial) {
            this.time.delayedCall(120, () => {
                if (!this.dialogoIntroducaoExibido && !this.dialogoAberto) {
                    this._abrirDialogoIntroducao();
                }
            });
        }
    }

    _pararAudio() {
        if (this.somAmbiente && this.somAmbiente.isPlaying) {
            this.somAmbiente.stop();
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
     * Chamado pela CenaMenu quando o tutorial overlay é fechado.
     * Se o diálogo de introdução estava aguardando o fim do tutorial,
     * abre-o com um pequeno delay para a cena se estabilizar.
     */
    aoFecharTutorialOverlay() {
        if (!this.aguardandoDialogoAposTutorial || this.dialogoIntroducaoExibido || this.dialogoAberto) {
            return;
        }

        this.aguardandoDialogoAposTutorial = false;
        this.time.delayedCall(120, () => {
            if (!this.scene.isActive() || this.dialogoIntroducaoExibido || this.dialogoAberto) {
                return;
            }

            this._abrirDialogoIntroducao();
        });
    }

    _criarCenario() {
        this.fundo = this.add.image(0, 0, this.fundoImage).setOrigin(0.5);
        this.fundo.setScale(1.5);
        this.fundo.x = this.fundo.displayWidth / 2;
        this.fundo.y = this.fundo.displayHeight / 2;

        const larguraMundo = this.fundo.displayWidth;
        const alturaMundo = this.fundo.displayHeight;

        this.physics.world.setBounds(0, 0, larguraMundo, alturaMundo);
    }

    _criarPortaSaida(x, y) {
        this.portaEntrada = new Entrada(this, x, y, this, 'gameScene', this.player);
        this.portaEntrada.setScale(2.8);
        this.portaEntrada.setDepth(140);

        this.portaEntrada.setTexture('entrada_animada', 0);
        this.portaEntrada.anims.stop();

        this.portaEntrada.podeUsar = false;
        this.time.delayedCall(1000, () => {
            this.portaEntrada.podeUsar = true;
        });

        const glowOffsetX = -5;  // positivo = direita, negativo = esquerda
        const glowOffsetY = -95;  // positivo = baixo, negativo = cima

        const portaTexture = this.textures.get('entrada_animada');
        const portaWidth = portaTexture.getSourceImage().width;
        const portaHeight = portaTexture.getSourceImage().height;

     this.portaGlow = this.add.rectangle(
        x + glowOffsetX,
        y + glowOffsetY,
        portaWidth - 103,
        portaHeight + 35,
        0xffffff
    );
    this.portaGlow.setDepth(141);
    this.portaGlow.setScale(1.5);
    this.portaGlow.setBlendMode(Phaser.BlendModes.ADD);
    this.portaGlow.setAlpha(0.25);

    this.tweens.add({
        targets: this.portaGlow,
        alpha: 0.01,
        duration: 1500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
    });

        this.physics.add.overlap(this.portaEntrada, this.player, () => {

            if (!this.portaEntrada.podeUsar) return;
            if (this.portaEntrada.trocaDeCenaEmAndamento) return;
            this.portaEntrada.trocaDeCenaEmAndamento = true;

            definirProximoSpawnCidade('Central');

            // Para a música ambiente antes de sair
            this._pararAudio();

            if (this.cache.audio.exists('portaAbrindo')) {
                this.sound.play('portaAbrindo');
            }
            
            this.time.delayedCall(500, () => {
                this.portaEntrada.trocarDeCena();
            });
        });
    }

    /**
     * Exibe o diálogo de introdução com as 7 falas do Thiago.
     *
     * Funcionamento interno:
     *   - Pausa a física para impedir movimentação durante a conversa.
     *   - Cada fala é digitada letra a letra a cada 18 ms com som de escrita em loop.
     *   - ESPAÇO: se ainda digitando, completa a fala imediatamente;
     *             se já completo, avança para a próxima fala ou fecha ao fim da última.
     *   - `estadoDialogo` armazena referências a todos os objetos visuais e ao evento
     *     de digitação para permitir limpeza segura em qualquer ponto.
     *   - Ao fechar, retoma a física e marca `dialogoIntroducaoExibido = true`
     *     para não reabrir na mesma sessão.
     */
    _abrirDialogoIntroducao() {
        if (this.dialogoAberto) {
            return;
        }

        this.dialogoAberto = true;
        this.physics.pause();

        const { width, height, centerX, centerY } = this.cameras.main;

        const overlay = this.add.rectangle(centerX, centerY, width, height, 0x022b45, 0.82)
            .setScrollFactor(0)
            .setDepth(1000);

        const painel = this.add.rectangle(centerX, centerY, width * 0.84, height * 0.68, 0x005b96, 0.97)
            .setScrollFactor(0)
            .setDepth(1001)
            .setStrokeStyle(5, 0x7fd6ff, 1);

        const titulo = this.add.text(centerX, centerY - height * 0.25, 'Central da Cielo', {
            fontSize: '36px',
            fontFamily: 'Verdana, Arial, sans-serif',
            color: '#ffffff',
            fontStyle: 'bold'
        })
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(1002);

        const molduraRetrato = this.add.rectangle(centerX - width * 0.27, centerY + height * 0.02, 180, 180, 0x08395b, 1)
            .setScrollFactor(0)
            .setDepth(1002)
            .setStrokeStyle(4, 0xb8ecff, 1);

        const retrato = this.add.image(molduraRetrato.x + 4, molduraRetrato.y + 2, 'cieloNPC')
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(1003)
            .setDisplaySize(198, 198);

        const texto = this.add.text(centerX - width * 0.14, molduraRetrato.y - 90, '', {
            fontSize: '31px',
            fontFamily: 'Verdana, Arial, sans-serif',
            color: '#f0f7ff',
            wordWrap: { width: width * 0.48 },
            lineSpacing: 14
        })
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setDepth(1002);

        const dica = this.add.text(centerX, centerY + height * 0.24, 'Pressione ESPAÇO para continuar.', {
            fontSize: '22px',
            fontFamily: 'Verdana, Arial, sans-serif',
            color: '#d6f2ff'
        })
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(1002);

        let indiceChar = 0;
        let indiceFala = 0;
        let somEscrita = null;

        if (this.cache.audio.exists('somEscrita')) {
            somEscrita = this.sound.add('somEscrita', { loop: true, volume: 0.8 });
        }

        const iniciarDigitacao = () => {
            const falaAtual = this.falasIntroducao[indiceFala];
            indiceChar = 0;
            texto.setText('');

            this.estadoDialogo?.eventoDigitacao?.remove();

            if (somEscrita && !somEscrita.isPlaying) {
                somEscrita.play();
            }

            const eventoDigitacao = this.time.addEvent({
                delay: 18,
                repeat: falaAtual.length - 1,
                callback: () => {
                    indiceChar += 1;
                    texto.setText(falaAtual.substring(0, indiceChar));

                    if (indiceChar >= falaAtual.length && somEscrita?.isPlaying) {
                        somEscrita.stop();
                    }
                }
            });

            this.estadoDialogo = {
                overlay,
                painel,
                titulo,
                molduraRetrato,
                retrato,
                texto,
                dica,
                eventoDigitacao,
                somEscrita,
                indiceFala,
                digitando: true
            };
        };

        const fecharDialogo = () => {
            this.estadoDialogo?.eventoDigitacao?.remove();
            somEscrita?.stop();

            overlay.destroy();
            painel.destroy();
            titulo.destroy();
            molduraRetrato.destroy();
            retrato.destroy();
            texto.destroy();
            dica.destroy();

            this.dialogoAberto = false;
            this.dialogoIntroducaoExibido = true;
            this.estadoDialogo = null;
            this.physics.resume();
        };

        const fecharHandler = () => {
            this.input.keyboard.off('keydown-SPACE', avancarDialogo);
            fecharDialogo();
        };

        const avancarDialogo = () => {
            const falaAtual = this.falasIntroducao[indiceFala];
            const terminouDigitacao = indiceChar >= falaAtual.length;

            if (!terminouDigitacao) {
                this.estadoDialogo?.eventoDigitacao?.remove();
                texto.setText(falaAtual);
                indiceChar = falaAtual.length;
                somEscrita?.stop();
                if (this.estadoDialogo) {
                    this.estadoDialogo.digitando = false;
                }
                return;
            }

            indiceFala += 1;

            if (indiceFala >= this.falasIntroducao.length) {
                fecharHandler();
                return;
            }

            iniciarDigitacao();
        };

        this.input.keyboard.on('keydown-SPACE', avancarDialogo);
        this.events.once('shutdown', () => {
            this.input.keyboard.off('keydown-SPACE', avancarDialogo);
        });
        this.events.once('destroy', () => {
            this.input.keyboard.off('keydown-SPACE', avancarDialogo);
        });

        this.estadoDialogo = { overlay, painel, titulo, molduraRetrato, retrato, texto, dica, somEscrita, indiceFala, digitando: true, eventoDigitacao: null };
        iniciarDigitacao();
    }

    update() {
        // Trava todo o update enquanto um diálogo estiver aberto
        if (this.dialogoAberto) {
            return;
        }

        this.player.update();

        // Atualiza a porta de saída e regula o brilho conforme a proximidade do jogador
        if (this.portaEntrada) {
            this.portaEntrada.update();
            if (this.portaGlow) {
                const distancia = Phaser.Math.Distance.Between(
                    this.player.x, this.player.y,
                    this.portaGlow.x, this.portaGlow.y
                );

                const raioMax = 400;
                const raioMin = 390;

                if (distancia < raioMax) {
                    // Alpha proporcional à proximidade: quase 0 quando longe, 0.25 quando bem perto
                    const alpha = Phaser.Math.Clamp(
                        (distancia - raioMin) / (raioMax - raioMin) * 0.25,
                        0, 0.25
                    );
                    this.portaGlow.setAlpha(alpha);
                }
            }
        }

        // Balão de recarga flutua levemente acima do NPC usando seno do tempo acumulado
        this.tempoAnimacaoBotao += this.game.loop.delta / 1000;
        const deslocamento = Math.sin(this.tempoAnimacaoBotao * 3) * 8;

        this.balaoRecarga.x = this.npc.x;
        this.balaoRecarga.y = this.npc.y - 92 + deslocamento;

        // Esconde o balão durante diálogos para não conflitar visualmente
        this.balaoRecarga.setVisible(!this.dialogoAberto);

        // Recarrega maquininhas ao pressionar E
        if (Phaser.Input.Keyboard.JustDown(this.teclaE)) {
            this._coletarMaquininhas();
        }

    }

    /**
     * Reabastece as maquininhas do jogador para o máximo (3) e exibe feedback visual.
     * Não faz nada se um diálogo estiver aberto no momento.
     */
    _coletarMaquininhas() {
        if (this.dialogoAberto) {
            return;
        }

        Maquininhas.definirMaquininhas(3);
        this.hudMaquininhas.atualizar();
        this._mostrarBannerRecarga();
    }

    _mostrarBannerRecarga() {
        const cam = this.cameras.main;
        const cx = cam.centerX;

        const bannerW = 520;
        const bannerH = 90;
        // Posição inicial: colado no topo da tela
        const inicioY = bannerH / 2 + 4;
        // Posição de repouso: um pouco mais abaixo (desliza suavemente para cá)
        const repousoY = inicioY + 14;

        const fundo = this.add.rectangle(cx, inicioY, bannerW, bannerH, 0x0051a5, 1)
            .setScrollFactor(0)
            .setDepth(10000)
            .setStrokeStyle(4, 0xffffff, 1)
            .setAlpha(0);

        const texto = this.add.text(cx, inicioY, '✔  Maquininhas recarregadas!  3x', {
            fontFamily: 'Arial Black, Arial, sans-serif',
            fontSize: '26px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(10001).setAlpha(0);

        // 1. Entrada: sobe levemente e aparece em fade-in
        this.tweens.add({
            targets: [fundo, texto],
            alpha: 1,
            y: repousoY,
            duration: 220,
            ease: 'Back.easeOut',
            onComplete: () => {
                // 2. Flutuação curta para feedback rápido
                this.tweens.add({
                    targets: [fundo, texto],
                    y: repousoY - 8,
                    duration: 240,
                    yoyo: true,
                    repeat: 0,
                    ease: 'Sine.easeInOut',
                    onComplete: () => {
                        // 3. Saída: sobe e some em fade-out
                        this.tweens.add({
                            targets: [fundo, texto],
                            alpha: 0,
                            y: repousoY - 24,
                            duration: 260,
                            ease: 'Sine.easeIn',
                            onComplete: () => {
                                fundo.destroy();
                                texto.destroy();
                                this._mostrarBalaoFalaRecarga();
                            }
                        });
                    }
                });
            }
        });
    }

    _mostrarBalaoFalaRecarga() {
        if (this.dialogoAberto) {
            return;
        }

        // A dica pós-recarga deve aparecer apenas uma vez por partida.
        if (!consumirDialogoPosRecargaCentral()) {
            return;
        }

        this.dialogoAberto = true;
        this.physics.pause();
        this.balaoRecarga?.setVisible(false);

        const larguraBalao = 820;
        const alturaBalao = 236;
        const posicaoX = this.npc.x;
        const posicaoY = this.npc.y - 185;

        const balao = this.add.container(posicaoX, posicaoY)
            .setDepth(10002)
            .setAlpha(0);

        // Cria uma sombra discreta para destacar o balão sobre o cenário.
        const sombra = this.add.graphics();
        sombra.fillStyle(0x001a2c, 0.38);
        sombra.fillRoundedRect(-larguraBalao / 2 + 8, -alturaBalao / 2 + 8, larguraBalao, alturaBalao, 26);

        const fundo = this.add.graphics();
        fundo.fillStyle(0x0a4f86, 0.98);
        fundo.lineStyle(4, 0xd9f4ff, 1);
        fundo.fillRoundedRect(-larguraBalao / 2, -alturaBalao / 2, larguraBalao, alturaBalao, 24);
        fundo.strokeRoundedRect(-larguraBalao / 2, -alturaBalao / 2, larguraBalao, alturaBalao, 24);

        const faixaInterna = this.add.graphics();
        faixaInterna.fillStyle(0x0e5f9f, 0.82);
        faixaInterna.fillRoundedRect(-larguraBalao / 2 + 22, -alturaBalao / 2 + 22, larguraBalao - 44, alturaBalao - 106, 16);

        const ponteiro = this.add.graphics();
        ponteiro.fillStyle(0x0a4f86, 0.98);
        ponteiro.lineStyle(4, 0xd9f4ff, 1);
        ponteiro.beginPath();
        ponteiro.moveTo(-20, alturaBalao / 2 - 4);
        ponteiro.lineTo(0, alturaBalao / 2 + 26);
        ponteiro.lineTo(20, alturaBalao / 2 - 4);
        ponteiro.closePath();
        ponteiro.fillPath();
        ponteiro.strokePath();

        const texto = this.add.text(0, -34, '', {
                fontFamily: 'Verdana, Arial, sans-serif',
                fontSize: '24px',
                color: '#ffffff',
                fontStyle: 'bold',
                align: 'center',
            lineSpacing: 12,
            wordWrap: { width: larguraBalao - 150 }
            })
            .setOrigin(0.5)
            .setStroke('#063554', 5);

        const dica = this.add.text(0, 84, 'Pressione ESPAÇO para continuar.', {
            fontFamily: 'Verdana, Arial, sans-serif',
            fontSize: '28px',
            color: '#dff6ff',
            fontStyle: 'bold'
        })
            .setOrigin(0.5)
            .setStroke('#063554', 3);

        balao.add([sombra, fundo, faixaInterna, ponteiro, texto, dica]);

        let indiceFala = 0;
        const atualizarFala = () => {
            texto.setText(this.falasPosRecarga[indiceFala] ?? '');
        };

        const fecharBalao = () => {
            this.input.keyboard.off('keydown-SPACE', avancarFala);

            this.tweens.add({
                targets: balao,
                alpha: 0,
                y: posicaoY - 24,
                duration: 320,
                ease: 'Sine.easeIn',
                onComplete: () => {
                    balao.destroy();
                    this.dialogoAberto = false;
                    this.physics.resume();
                    this.balaoRecarga?.setVisible(true);
                }
            });
        };

        const avancarFala = () => {
            indiceFala += 1;

            if (indiceFala >= this.falasPosRecarga.length) {
                fecharBalao();
                return;
            }

            atualizarFala();
        };

        this.input.keyboard.on('keydown-SPACE', avancarFala);
        this.events.once('shutdown', () => {
            this.input.keyboard.off('keydown-SPACE', avancarFala);
        });
        this.events.once('destroy', () => {
            this.input.keyboard.off('keydown-SPACE', avancarFala);
        });

        atualizarFala();

        // Entrada suave do balão para dar continuidade ao feedback da recarga.
        this.tweens.add({
            targets: balao,
            alpha: 1,
            y: posicaoY - 12,
            duration: 280,
            ease: 'Back.easeOut'
        });
    }
}

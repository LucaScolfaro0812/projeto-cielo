/**
 * CenaTutorialVideo - Tutorial em vídeo exibido antes do primeiro jogo.
 * Mostra 9 vídeos em sequência com título, texto descritivo e navegação.
 * Ao terminar, segue para a tela de controles (tutorialScene).
 */
export class CenaTutorialVideo extends Phaser.Scene {

    constructor() {
        super({ key: 'tutorialVideoScene' });
    }

    init(data = {}) {
        this.cenaAposVideo = data.cenaApos ?? 'tutorialScene';
        this.dadosCenaApos = data.dadosCenaApos ?? {};
    }

    preload() {
        if (!this.cache.audio.exists('menuSom')) {
            this.load.audio('menuSom', 'assets/sons/menuSom.mp3');
        }
        if (!this.cache.audio.exists('somClicando')) {
            this.load.audio('somClicando', 'assets/sons/somClicando.mp3');
        }
    }

    create() {
        this._som = this.sound.add('menuSom', { loop: true, volume: 0.3 });
        this._som.play();

        this._videos = [
            {
                arquivo: 'assets/videos/iniciando-o-jogo.mp4',
                titulo: 'Iniciando o Jogo',
                descricao: 'Bem-vindo! Você é o Marcielo, representante da Cielo. Seu objetivo é visitar lojas da cidade e conquistar clientes respondendo perguntas sobre soluções de pagamento. Ao iniciar, aproxime-se do atendente para pegar suas maquininhas.'
            },
            {
                arquivo: 'assets/videos/se-orientando.mp4',
                titulo: 'Se Orientando',
                descricao: 'Use W A S D ou as setas direcionais para mover o Marcielo pelo mapa. A seta na tela aponta para a próxima loja que você deve visitar. Pressione M para abrir o mapa da cidade. Pressione ESC para pausar.'
            },
            {
                arquivo: 'assets/videos/hud-npc.mp4',
                titulo: 'HUD de Progresso',
                descricao: 'O HUD no canto da tela mostra quantos clientes você já conquistou. Clique nele para ver o painel completo com todos os NPCs.'
            },
            {
                arquivo: 'assets/videos/como-conquistar.mp4',
                titulo: 'Como Conquistar um Cliente',
                descricao: 'Entre em uma loja, converse com o cliente e responda corretamente as perguntas do quiz. Quanto melhor sua resposta, mais a barra de conversão sobe. Você precisa acertar pelo menos duas perguntas para conquistar o cliente.'
            },
            {
                arquivo: 'assets/videos/nao-conquistando.mp4',
                titulo: 'Não Conquistando',
                descricao: 'Se a barra de conversão estiver baixa ao final do quiz, o cliente não será conquistado. Você pode tentar novamente mais tarde.'
            },
            {
                arquivo: 'assets/videos/apos-conquistar.mp4',
                titulo: 'Após Conquistar',
                descricao: 'Ao conquistar um cliente, ele fica marcado em azul no mapa e uma maquininha é usada. Balões surgem celebrando a conquista e a imagem do cliente no HUD à direita é atualizada. Atenção: clientes já conquistados não podem ser abordados novamente.'
            },
            {
                arquivo: 'assets/videos/recuperando-maquininhas.mp4',
                titulo: 'Recuperando Maquininhas',
                descricao: 'Quando suas maquininhas acabarem, volte à Central Cielo para recarregar o estoque e continuar conquistando clientes.'
            },
            {
                arquivo: 'assets/videos/ao-morrer.mp4',
                titulo: 'Ao Morrer',
                descricao: 'Se você for atingido por um carro, perderá suas maquininhas e será reiniciado. Tome cuidado ao atravessar as ruas!'
            }
        ];

        this._indiceAtual = 0;
        this._criarOverlay();
        this._exibirVideo(0);
    }

    _criarOverlay() {
        const canvas = this.game.canvas;
        const pai = canvas.parentElement;

        if (pai.style.position === '' || pai.style.position === 'static') {
            pai.style.position = 'relative';
        }

        // Container principal
        this._div = document.createElement('div');
        this._div.style.cssText = `
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(2, 10, 20, 0.96);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            font-family: Verdana, Arial, sans-serif;
            box-sizing: border-box;
            padding: 20px;
        `;
        pai.appendChild(this._div);

        // Contador (ex: "3 / 9")
        this._elContador = document.createElement('div');
        this._elContador.style.cssText = `
            color: #7ecfff;
            font-size: 15px;
            margin-bottom: 6px;
            letter-spacing: 2px;
            font-weight: bold;
        `;
        this._div.appendChild(this._elContador);

        // Título
        this._elTitulo = document.createElement('div');
        this._elTitulo.style.cssText = `
            color: #ffffff;
            font-size: 26px;
            font-weight: bold;
            margin-bottom: 12px;
            text-align: center;
            letter-spacing: 1px;
        `;
        this._div.appendChild(this._elTitulo);

        // Container do vídeo com borda
        const videoWrapper = document.createElement('div');
        videoWrapper.style.cssText = `
            border: 3px solid #009fda;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 0 24px rgba(0, 159, 218, 0.4);
            background: #000;
            width: min(820px, 90vw);
        `;
        this._div.appendChild(videoWrapper);

        // Elemento de vídeo
        this._elVideo = document.createElement('video');
        this._elVideo.style.cssText = `
            width: 100%;
            display: block;
            max-height: 45vh;
            object-fit: contain;
            background: #000;
        `;
        this._elVideo.controls = true;
        this._elVideo.autoplay = true;
        this._elVideo.muted = true;
        videoWrapper.appendChild(this._elVideo);

        // Texto descritivo
        this._elDescricao = document.createElement('div');
        this._elDescricao.style.cssText = `
            color: #cce8f7;
            font-size: 15px;
            text-align: center;
            max-width: min(820px, 90vw);
            margin-top: 14px;
            line-height: 1.6;
            min-height: 48px;
        `;
        this._div.appendChild(this._elDescricao);

        // Barra de botões
        const barraBtn = document.createElement('div');
        barraBtn.style.cssText = `
            display: flex;
            gap: 16px;
            margin-top: 18px;
            align-items: center;
        `;
        this._div.appendChild(barraBtn);

        // Botão Anterior
        this._btnAnterior = this._criarBotao('← Anterior', '#1a3a5c', '#7ecfff');
        this._btnAnterior.onclick = () => {
            this._tocarClique();
            this._irPara(this._indiceAtual - 1);
        };
        barraBtn.appendChild(this._btnAnterior);

        // Botão Próximo / Concluir
        this._btnProximo = this._criarBotao('Próximo →', '#009fda', '#ffffff');
        this._btnProximo.onclick = () => {
            this._tocarClique();
            if (this._indiceAtual < this._videos.length - 1) {
                this._irPara(this._indiceAtual + 1);
            } else {
                this._encerrar();
            }
        };
        barraBtn.appendChild(this._btnProximo);

        // Botão Pular tudo
        const btnPular = this._criarBotao('Pular tudo', 'transparent', '#7ecfff');
        btnPular.style.border = '1px solid #7ecfff';
        btnPular.style.fontSize = '13px';
        btnPular.onclick = () => {
            this._tocarClique();
            this._encerrar();
        };
        barraBtn.appendChild(btnPular);
    }

    _criarBotao(texto, bg, cor) {
        const btn = document.createElement('button');
        btn.textContent = texto;
        btn.style.cssText = `
            background: ${bg};
            color: ${cor};
            border: none;
            border-radius: 6px;
            padding: 10px 28px;
            font-size: 15px;
            font-weight: bold;
            cursor: pointer;
            font-family: Verdana, Arial, sans-serif;
            transition: opacity 0.15s;
        `;
        btn.onmouseenter = () => btn.style.opacity = '0.8';
        btn.onmouseleave = () => btn.style.opacity = '1';
        return btn;
    }

    _exibirVideo(indice) {
        this._indiceAtual = indice;
        const v = this._videos[indice];

        this._elContador.textContent = `${indice + 1} / ${this._videos.length}`;
        this._elTitulo.textContent = v.titulo;
        this._elDescricao.textContent = v.descricao;
        this._elVideo.src = v.arquivo;
        this._elVideo.load();
        this._elVideo.play().catch(() => {});

        // Atualiza botões
        this._btnAnterior.style.opacity = indice === 0 ? '0.3' : '1';
        this._btnAnterior.style.pointerEvents = indice === 0 ? 'none' : 'auto';
        this._btnProximo.textContent = indice === this._videos.length - 1 ? 'Concluir ✓' : 'Próximo →';
        this._btnProximo.style.background = indice === this._videos.length - 1 ? '#10b981' : '#009fda';
    }

    _tocarClique() {
        if (this.cache.audio.exists('somClicando')) {
            this.sound.play('somClicando', { volume: 0.5 });
        }
    }

    _irPara(indice) {
        if (indice < 0 || indice >= this._videos.length) return;
        this._elVideo.pause();
        this._exibirVideo(indice);
    }

    _encerrar() {
        this._elVideo.pause();
        this._elVideo.src = '';
        if (this._div && this._div.parentElement) {
            this._div.parentElement.removeChild(this._div);
        }
        if (this._som && this._som.isPlaying) this._som.stop();
        this.scene.start(this.cenaAposVideo, this.dadosCenaApos);
    }
}

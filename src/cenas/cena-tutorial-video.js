/**
 * CenaTutorialVideo — Tutorial em vídeo exibido antes do primeiro jogo.
 *
 * Cria um overlay HTML por cima do canvas do Phaser (mesma técnica da tela de morte)
 * e exibe até 9 vídeos em sequência, cada um com título e texto explicativo.
 * Ao concluir ou pular, destrói o overlay e transiciona para a cena configurada.
 *
 * Por que HTML e não Phaser nativo?
 * O elemento <video> do browser é muito mais simples de usar para vídeos MP4 do que
 * qualquer solução dentro do Phaser, que não tem suporte embutido a vídeo com controles.
 */
export class CenaTutorialVideo extends Phaser.Scene {

    constructor() {
        super({ key: 'tutorialVideoScene' });
    }

    /**
     * Recebe parâmetros opcionais via scene.start()/scene.launch():
     * - cenaApos: chave da cena a iniciar quando o tutorial terminar (padrão: tutorialScene)
     * - dadosCenaApos: dados a passar para essa cena
     */
    init(data = {}) {
        this.cenaAposVideo = data.cenaApos ?? 'tutorialScene';
        this.dadosCenaApos = data.dadosCenaApos ?? {};
    }

    /**
     * Pré-carrega os áudios de menu e clique, caso ainda não estejam no cache.
     * O "se já está no cache" evita erro de re-load quando a cena é visitada novamente.
     */
    preload() {
        if (!this.cache.audio.exists('menuSom')) {
            this.load.audio('menuSom', 'assets/sons/menuSom.mp3');
        }
        if (!this.cache.audio.exists('somClicando')) {
            this.load.audio('somClicando', 'assets/sons/somClicando.mp3');
        }
    }

    /**
     * Inicializa o som de fundo, define a lista de vídeos e monta o overlay HTML.
     */
    create() {
        // Toca a música de menu em loop baixinho durante o tutorial
        this._som = this.sound.add('menuSom', { loop: true, volume: 0.3 });
        this._som.play();

        /**
         * Lista de vídeos do tutorial, em ordem de exibição.
         * Cada entrada tem:
         *  - arquivo: caminho do .mp4 relativo à pasta public/
         *  - titulo: exibido em destaque acima do vídeo
         *  - descricao: texto explicativo abaixo do vídeo
         */
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

        // Começa no primeiro vídeo
        this._indiceAtual = 0;

        // Monta toda a estrutura HTML do overlay e salva referências aos elementos
        this._criarOverlay();

        // Exibe o primeiro vídeo com suas informações
        this._exibirVideo(0);
    }

    /**
     * Constrói o overlay HTML completo: fundo escuro, contador, título,
     * elemento <video>, descrição e barra de botões de navegação.
     *
     * O overlay é inserido como filho do elemento pai do canvas do Phaser,
     * com position: absolute e z-index alto para ficar por cima do jogo.
     */
    _criarOverlay() {
        const canvas = this.game.canvas;
        const pai = canvas.parentElement;

        // O pai precisa ter position não-static para que o overlay absolute funcione
        if (pai.style.position === '' || pai.style.position === 'static') {
            pai.style.position = 'relative';
        }

        // Container principal — cobre 100% da área do jogo
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

        // Contador de progresso (ex: "3 / 8") — em azul claro
        this._elContador = document.createElement('div');
        this._elContador.style.cssText = `
            color: #7ecfff;
            font-size: 15px;
            margin-bottom: 6px;
            letter-spacing: 2px;
            font-weight: bold;
        `;
        this._div.appendChild(this._elContador);

        // Título do vídeo atual — em branco, destaque visual
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

        // Wrapper do vídeo: borda azul Cielo + sombra para dar destaque
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

        // Elemento <video> nativo do browser — muted para autoplay funcionar sem interação
        this._elVideo = document.createElement('video');
        this._elVideo.style.cssText = `
            width: 100%;
            display: block;
            max-height: 45vh;
            object-fit: contain;
            background: #000;
        `;
        this._elVideo.controls = true;   // Mostra barra de controle nativa do browser
        this._elVideo.autoplay = true;   // Começa a tocar automaticamente
        this._elVideo.muted = true;      // Necessário para autoplay funcionar sem gesto do usuário
        videoWrapper.appendChild(this._elVideo);

        // Texto descritivo da mecânica mostrada no vídeo
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

        // Barra de botões de navegação (Anterior | Próximo | Pular tudo)
        const barraBtn = document.createElement('div');
        barraBtn.style.cssText = `
            display: flex;
            gap: 16px;
            margin-top: 18px;
            align-items: center;
        `;
        this._div.appendChild(barraBtn);

        // Botão Anterior — navega para o vídeo anterior (desabilitado no primeiro)
        this._btnAnterior = this._criarBotao('← Anterior', '#1a3a5c', '#7ecfff');
        this._btnAnterior.onclick = () => {
            this._tocarClique();
            this._irPara(this._indiceAtual - 1);
        };
        barraBtn.appendChild(this._btnAnterior);

        // Botão Próximo/Concluir — avança ou finaliza o tutorial no último vídeo
        this._btnProximo = this._criarBotao('Próximo →', '#009fda', '#ffffff');
        this._btnProximo.onclick = () => {
            this._tocarClique();
            if (this._indiceAtual < this._videos.length - 1) {
                this._irPara(this._indiceAtual + 1);
            } else {
                this._encerrar(); // Último vídeo: finaliza e vai para a próxima cena
            }
        };
        barraBtn.appendChild(this._btnProximo);

        // Botão "Pular tudo" — encerra imediatamente sem assistir os demais vídeos
        const btnPular = this._criarBotao('Pular tudo', 'transparent', '#7ecfff');
        btnPular.style.border = '1px solid #7ecfff';
        btnPular.style.fontSize = '13px';
        btnPular.onclick = () => {
            this._tocarClique();
            this._encerrar();
        };
        barraBtn.appendChild(btnPular);
    }

    /**
     * Cria e retorna um elemento <button> estilizado com as cores informadas.
     * @param {string} texto - texto exibido no botão
     * @param {string} bg    - cor de fundo (CSS)
     * @param {string} cor   - cor do texto (CSS)
     */
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
        // Efeito de hover: reduz levemente a opacidade ao passar o mouse
        btn.onmouseenter = () => btn.style.opacity = '0.8';
        btn.onmouseleave = () => btn.style.opacity = '1';
        return btn;
    }

    /**
     * Exibe o vídeo de determinado índice, atualizando todos os elementos da UI:
     * contador, título, src do vídeo e descrição.
     * Também ajusta o estado visual dos botões (desabilita "Anterior" no primeiro,
     * muda o texto e cor do "Próximo" no último).
     * @param {number} indice - posição na lista this._videos
     */
    _exibirVideo(indice) {
        this._indiceAtual = indice;
        const v = this._videos[indice];

        // Atualiza textos informativos
        this._elContador.textContent = `${indice + 1} / ${this._videos.length}`;
        this._elTitulo.textContent = v.titulo;
        this._elDescricao.textContent = v.descricao;

        // Troca o src e força o reload para o novo arquivo começar do zero
        this._elVideo.src = v.arquivo;
        this._elVideo.load();
        this._elVideo.play().catch(() => {}); // catch evita erro no console se autoplay for bloqueado

        // Botão Anterior: aparece esmaecido e não clicável no primeiro vídeo
        this._btnAnterior.style.opacity = indice === 0 ? '0.3' : '1';
        this._btnAnterior.style.pointerEvents = indice === 0 ? 'none' : 'auto';

        // No último vídeo: muda para "Concluir ✓" com cor verde
        this._btnProximo.textContent = indice === this._videos.length - 1 ? 'Concluir ✓' : 'Próximo →';
        this._btnProximo.style.background = indice === this._videos.length - 1 ? '#10b981' : '#009fda';
    }

    /**
     * Toca o som de clique, se disponível no cache.
     * Chamado em todos os botões de navegação.
     */
    _tocarClique() {
        if (this.cache.audio.exists('somClicando')) {
            this.sound.play('somClicando', { volume: 0.5 });
        }
    }

    /**
     * Navega para um vídeo pelo índice, pausando o atual antes de trocar.
     * Não faz nada se o índice estiver fora dos limites.
     * @param {number} indice - índice de destino
     */
    _irPara(indice) {
        if (indice < 0 || indice >= this._videos.length) return;
        this._elVideo.pause();
        this._exibirVideo(indice);
    }

    /**
     * Finaliza o tutorial:
     * - Para e limpa o vídeo para liberar memória
     * - Remove o overlay HTML do DOM
     * - Para a música de fundo
     * - Inicia a próxima cena do jogo (definida em init())
     */
    _encerrar() {
        this._elVideo.pause();
        this._elVideo.src = ''; // Libera o recurso de vídeo na memória do browser

        // Remove o overlay da página
        if (this._div && this._div.parentElement) {
            this._div.parentElement.removeChild(this._div);
        }

        // Para a música de menu antes de sair
        if (this._som && this._som.isPlaying) this._som.stop();

        // Transiciona para a cena configurada (centralScene para novos jogadores)
        this.scene.start(this.cenaAposVideo, this.dadosCenaApos);
    }
}

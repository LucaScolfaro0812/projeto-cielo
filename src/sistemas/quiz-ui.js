/**
 * InterfaceQuiz - Interface visual do quiz (Phaser). Core do jogo - design impecável.
 */

// Bloco 1: dimensões dos elementos visuais
const NUMERO_OPCOES = 4;          // quantidade de alternativas por pergunta
const ALTURA_BOTAO = 84;          // altura de cada botão de resposta
const ESPACO_BOTOES = 16;          // espaço entre os botões
const LARGURA_PORTRAIT_NPC = 160;  // largura da foto do NPC no cabeçalho
const ALTURA_CABECALHO = 160;     // altura da área do cabeçalho
const LARGURA_BARRA = 40;         // largura da barra de conversão
const ALTURA_BARRA = 200;         // altura máxima da barra de conversão
const LARGURA_COLUNA_BARRA = 86;  // largura da coluna onde fica a barra
const LARGURA_BADGE = 62;         // largura do badge com a letra da alternativa (A, B, C, D)

// Bloco 2: cores (identidade Cielo - paleta acessível e legível)
const COR_OVERLAY = 0x0f172a;         // fundo escurecido atrás do modal (azul bem escuro)
const OPAC_OVERLAY = 0.65;            // transparência do fundo escurecido

const COR_FUNDO_MODAL = 0xF4F6F8;     // fundo neutro do modal (cinza claro suave)
const COR_SOMBRA = 0x1e293b;          // sombra mais neutra e suave
const COR_BORDA_MODAL = 0x1D4ED8;     // azul principal (acessível e forte)

const COR_FUNDO_CABECALHO = 0xf0f9ff; // azul muito claro para separar o header
const COR_PORTRAIT_NPC = 0xe0f2fe;    // fundo do retrato do NPC (azul claro suave)

const COR_BADGE = 0x1D4ED8;           // badge das alternativas (azul forte para destaque)

const COR_TEXTO = "#020617";          // texto principal bem escuro para leitura nítida
const COR_TEXTO_SECUNDARIO = "#0f172a"; // texto secundário escuro para manter contraste

const COR_BOTAO_FUNDO = 0xFFFFFF;     // fundo dos botões (branco para destacar opções)
const COR_BOTAO_HOVER = 0xE0F2FE;     // hover suave azul claro
const COR_BOTAO_BORDA = 0xD1D5DB;     // borda neutra leve (melhora separação)
const COR_BOTAO_BORDA_HOVER = 0x2563EB; // borda azul no hover para reforçar interatividade

const COR_BARRA_FUNDO = 0xE5E7EB;     // fundo neutro da barra de conversão

const COR_BARRA_BAIXA = 0xEF4444;     // vermelho (desempenho baixo)
const COR_BARRA_MEDIA = 0xF59E0B;     // amarelo/laranja (desempenho médio)
const COR_BARRA_ALTA = 0x10B981;      // verde (desempenho alto) // verde: conversão alta (> 70)

// Bloco 3: fontes e estilo
const ESCALA_NPC = 0.32;              // escala da imagem do NPC no portrait
const PROFUNDIDADE_UI = 1000;         // profundidade de renderização (garante que o quiz fique na frente)
const TAM_FONTE_PERGUNTA = "32px";    // tamanho do texto da pergunta
const TAM_FONTE_OPCAO = "24px";       // tamanho do texto das alternativas
const TAM_FONTE_BADGE = "22px";       // tamanho da letra dentro do badge (A, B, C, D)
const TAM_FONTE_TIMER = "22px";       // tamanho do contador de tempo
const TAM_FONTE_FEEDBACK = "22px";    // tamanho do feedback após resposta
const TAM_FONTE_CONVERSAO = "20px";   // tamanho do label "Conversão"
const TAM_FONTE_VALOR_CONVERSAO = "24px"; // tamanho do valor numérico da conversão
const TAM_FONTE_PERGUNTA_MIN = 20;     // limite inferior para manter a pergunta legível
const TAM_FONTE_OPCAO_MIN = 18;        // limite inferior para manter as opções legíveis
const TAM_FONTE_RESULTADO = "26px";   // tamanho base do texto da tela de resultado
const TAM_FONTE_RESULTADO_MIN = 18;    // tamanho mínimo para resultado continuar legível

export default class InterfaceQuiz {

    constructor(cena, opcoes = {}) {
        this.cena = cena;

        // Tamanho do modal principal
        this.larguraModal = opcoes.larguraModal ?? 660;
        this.alturaModal = opcoes.alturaModal ?? 420;

        // Espaçamento interno do modal
        this.padding = opcoes.padding ?? 18;

        // Largura da coluna da barra de conversão
        this.larguraColunaBarra = opcoes.larguraColunaBarra ?? LARGURA_COLUNA_BARRA;

        // Altura máxima da barra de conversão
        this.alturaMaxBarra = opcoes.alturaMaxBarraConversao ?? ALTURA_BARRA;

        // Tempo em segundos que o feedback fica visível
        this.duracaoFeedback = opcoes.duracaoFeedback ?? 1.5;

        // Chave da imagem do NPC carregada no Phaser
        this.chaveImagemNpc = opcoes.chaveImagemNpc ?? "npc";

        // Função chamada quando o jogador clica em uma alternativa
        this.aoSelecionarResposta = null;

        // Monta toda a interface
        this._criarInterface();
    }

    // Chama cada método responsável por criar uma parte da interface
    _criarInterface() {
        this._criarContainerRaiz();
        this._criarOverlay();
        this._criarModal();
        this._criarBarraConversao();
        this._criarConteudo();
    }

    // Container principal que agrupa todos os elementos do quiz
    _criarContainerRaiz() {
        this.containerPrincipal = this.cena.add.container(0, 0).setDepth(PROFUNDIDADE_UI);
    }

    // Cria um retângulo semitransparente sobre toda a cena para impedir que o jogador
    // interaja com elementos do mapa (NPCs, portas, carros) enquanto o quiz está aberto.
    // Sem esse overlay, cliques nas alternativas poderiam atravessar a UI e acionar objetos atrás dela.
    _criarOverlay() {
        const cam = this.cena.cameras.main;

        const w = cam.displayWidth;
        const h = cam.displayHeight;

        // Posiciona o overlay no canto superior esquerdo da câmera
        const cx = cam.worldView.centerX - (w / 2);
        const cy = cam.worldView.centerY - (h / 2);

        this.fundoOverlayRectangle = this.cena.add.rectangle(cx, cy, w, h, COR_OVERLAY, OPAC_OVERLAY).setOrigin(0);

        // Bloqueia cliques que passariam pelo overlay para o jogo
        this.fundoOverlayRectangle.setInteractive({ useHandCursor: false });
        this.fundoOverlayRectangle.on("pointerdown", () => { });
        this.containerPrincipal.add(this.fundoOverlayRectangle);
    }

    // Cria o modal (janela branca centralizada) com sombra e borda
    _criarModal() {
        const cam = this.cena.cameras.main;

        // Centraliza o modal na tela
        const cx = cam.worldView.centerX;
        const cy = cam.worldView.centerY;

        this.containerModal = this.cena.add.container(cx, cy);

        // Sombra levemente deslocada atrás do modal
        this.retanguloSombra = this.cena.add.rectangle(5, 5, this.larguraModal + 10, this.alturaModal + 10, COR_SOMBRA, 0.15).setOrigin(0.5);

        // Fundo branco do modal com borda azul
        this.retanguloFundoModal = this.cena.add.rectangle(0, 0, this.larguraModal, this.alturaModal, COR_FUNDO_MODAL).setOrigin(0.5);
        this.retanguloFundoModal.setStrokeStyle(2, COR_BORDA_MODAL);

        this.containerPrincipal.add(this.containerModal);
    }

    // Cria a barra vertical de conversão no lado esquerdo do modal
    _criarBarraConversao() {
        const metadeLargura = this.larguraModal / 2;

        // Posição X da barra: dentro da coluna reservada à esquerda
        const posXBarra = -metadeLargura + this.padding + this.larguraColunaBarra / 2;
        this.containerBarra = this.cena.add.container(posXBarra, 90);

        // Label "Conversão" acima da barra
        this.textoLabelConversao = this.cena.add.text(0, -this.alturaMaxBarra / 2 - 22, "Conversão", {
            fontSize: TAM_FONTE_CONVERSAO, color: COR_TEXTO_SECUNDARIO, fontStyle: "bold"
        }).setOrigin(0.5);

        // Fundo cinza claro da barra (parte vazia)
        this.retanguloBarraFundo = this.cena.add.rectangle(0, 0, LARGURA_BARRA, this.alturaMaxBarra, COR_BARRA_FUNDO).setOrigin(0.5);
        this.retanguloBarraFundo.setStrokeStyle(1, 0x93c5fd);

        // Parte colorida da barra que cresce de baixo para cima conforme a conversão sobe
        const yBase = this.alturaMaxBarra / 2;
        this.retanguloBarraPreenchimento = this.cena.add.rectangle(0, yBase, LARGURA_BARRA - 4, 0, COR_BARRA_MEDIA).setOrigin(0.5, 1);

        // Número que mostra o valor atual da conversão (0 a 100)
        this.textoValorConversao = this.cena.add.text(0, yBase + 18, "50", {
            fontSize: TAM_FONTE_VALOR_CONVERSAO, color: COR_TEXTO, fontStyle: "bold"
        }).setOrigin(0.5);

        // Agrupa todos os elementos da barra
        this.containerBarra.add([
            this.textoLabelConversao,
            this.retanguloBarraFundo,
            this.retanguloBarraPreenchimento,
            this.textoValorConversao
        ]);

        // Adiciona sombra, fundo do modal e barra ao container do modal
        this.containerModal.add(this.retanguloSombra);
        this.containerModal.add(this.retanguloFundoModal);
        this.containerModal.add(this.containerBarra);
    }

    // NPC em portrait isolado à esquerda; pergunta à direita, sem sobreposição
    _criarConteudo() {
        const metadeLargura = this.larguraModal / 2;
        const metadeAltura = this.alturaModal / 2;

        // Posição X do conteúdo: começa após a coluna da barra
        const posXConteudo = -metadeLargura + this.larguraColunaBarra + this.padding;
        const posYConteudo = -metadeAltura + this.padding;

        // Largura disponível para o conteúdo (pergunta + botões)
        const larguraConteudo = this.larguraModal - this.larguraColunaBarra - this.padding * 2;

        this.containerConteudo = this.cena.add.container(posXConteudo, posYConteudo);

        // Cria cada seção do conteúdo
        this._criarCabecalho(larguraConteudo);
        this._criarPergunta();
        this._criarBotoes(larguraConteudo);
        this._criarAreaFeedback(larguraConteudo);

        this.containerConteudo.add([
            this.containerCabecalho,
            this.containerPergunta,
            this.containerBotoes,
            this.textoFeedback
        ]);
        this.containerModal.add(this.containerConteudo);
    }

    // Reduz a fonte gradualmente ate o texto caber dentro da caixa definida.
    _ajustarTextoAoEspaco(texto, larguraMaxima, alturaMaxima, fonteMaximaPx, fonteMinimaPx) {
        const tamanhoMaximo = parseInt(fonteMaximaPx, 10);
        const margemHorizontalSegura = 16;
        const margemVerticalSegura = 12;
        const larguraUtil = Math.max(0, larguraMaxima - margemHorizontalSegura);
        const alturaUtil = Math.max(0, alturaMaxima - margemVerticalSegura);

        for (let tamanhoAtual = tamanhoMaximo; tamanhoAtual >= fonteMinimaPx; tamanhoAtual--) {
            texto.setFontSize(`${tamanhoAtual}px`);

            // Mantem um espacamento proporcional para preservar legibilidade em multiplas linhas.
            const espacamentoEntreLinhas = Math.max(1, Math.round(tamanhoAtual * 0.08));
            texto.setLineSpacing(espacamentoEntreLinhas);

            if (texto.width <= larguraUtil && texto.height <= alturaUtil) {
                return;
            }
        }
    }

    // Cabeçalho com a foto do NPC à esquerda e o timer à direita
    _criarCabecalho(larguraConteudo) {
        this.containerCabecalho = this.cena.add.container(0, 0);

        // Portrait do NPC: caixa fixa à esquerda, jogador dentro (não invade a pergunta)
        const posXPortrait = 0;
        const posYPortrait = 0;
        this.retanguloPortraitNpc = this.cena.add.rectangle(
            posXPortrait, posYPortrait,
            LARGURA_PORTRAIT_NPC, ALTURA_CABECALHO,
            COR_PORTRAIT_NPC
        ).setOrigin(0, 0);
        this.retanguloPortraitNpc.setStrokeStyle(1, 0x7dd3fc);

        // Imagem do NPC centralizada dentro do portrait
        this.imagemNpc = this.cena.add.image(
            posXPortrait + LARGURA_PORTRAIT_NPC / 2,
            posYPortrait + ALTURA_CABECALHO / 2,
            this.chaveImagemNpc
        ).setOrigin(0.5).setScale(ESCALA_NPC);

        // Caixa da pergunta: à direita do portrait, com margem
        const margemEntrePortraitEPergunta = 12;
        const margemEntrePerguntaETimer = 16;
        const posXCaixa = LARGURA_PORTRAIT_NPC + margemEntrePortraitEPergunta;
        const larguraTimer = 72;
        const alturaTimer = 40;
        const larguraCaixa = larguraConteudo
            - LARGURA_PORTRAIT_NPC
            - margemEntrePortraitEPergunta
            - margemEntrePerguntaETimer
            - larguraTimer
            - 8;

        // Guarda a geometria real da area de texto para a pergunta respeitar exatamente essa caixa.
        this.posXCaixaPergunta = posXCaixa;
        this.larguraCaixaPergunta = larguraCaixa;
        this.posYCaixaPergunta = 0;

        this.retanguloCabecalho = this.cena.add.rectangle(
            posXCaixa, 0, larguraCaixa, ALTURA_CABECALHO, COR_FUNDO_CABECALHO
        ).setOrigin(0, 0);
        this.retanguloCabecalho.setStrokeStyle(1, 0xbae6fd);

        // Timer em badge (pill) no canto superior direito do cabeçalho
        const posXTimer = posXCaixa + larguraCaixa + margemEntrePerguntaETimer;
        const posYTimer = 12;
        this.retanguloTimer = this.cena.add.rectangle(posXTimer, posYTimer, larguraTimer, alturaTimer, COR_BADGE).setOrigin(0, 0);
        this.textoTimer = this.cena.add.text(posXTimer + larguraTimer / 2, posYTimer + alturaTimer / 2, "15s", {
            fontSize: TAM_FONTE_TIMER, color: "#ffffff", fontStyle: "bold"
        }).setOrigin(0.5);

        this.containerCabecalho.add([
            this.retanguloPortraitNpc,
            this.imagemNpc,
            this.retanguloCabecalho,
            this.retanguloTimer,
            this.textoTimer
        ]);
    }

    // Pergunta inicia após o portrait, com margem para não ser coberta
    _criarPergunta() {
        const paddingHorizontalPergunta = 12;
        const paddingVerticalPergunta = 16;
        const posX = this.posXCaixaPergunta + paddingHorizontalPergunta;
        const posY = this.posYCaixaPergunta + paddingVerticalPergunta;
        const larguraTexto = this.larguraCaixaPergunta - (paddingHorizontalPergunta * 2);

        this.larguraMaximaPergunta = larguraTexto;
        this.alturaMaximaPergunta = ALTURA_CABECALHO - (paddingVerticalPergunta * 2);

        this.containerPergunta = this.cena.add.container(0, 0);

        // Texto da pergunta com quebra de linha automática
        this.textoPergunta = this.cena.add.text(posX, posY, "", {
            fontSize: TAM_FONTE_PERGUNTA,
            color: COR_TEXTO,
            fontStyle: "bold",
            wordWrap: { width: larguraTexto }
        });
        this.containerPergunta.add(this.textoPergunta);
    }

    // Cria os 4 botões de alternativas (A, B, C, D)
    _criarBotoes(larguraConteudo) {
        const posYInicio = ALTURA_CABECALHO + 36;
        this.containerBotoes = this.cena.add.container(0, posYInicio);
        this.listaTextoBotoes = [];
        this.larguraMaximaOpcao = larguraConteudo - LARGURA_PORTRAIT_NPC - LARGURA_BADGE - 70;
        this.alturaMaximaOpcao = ALTURA_BOTAO - 28;

        const letras = ["A", "B", "C", "D"];
        for (let i = 0; i < NUMERO_OPCOES; i++) {
            const posY = i * (ALTURA_BOTAO + ESPACO_BOTOES);

            // Fundo clicável do botão
            const retanguloFundoBotao = this.cena.add.rectangle(
                LARGURA_PORTRAIT_NPC, posY,
                larguraConteudo - LARGURA_PORTRAIT_NPC, ALTURA_BOTAO,
                COR_BOTAO_FUNDO
            ).setOrigin(0, 0).setInteractive({ useHandCursor: true });
            retanguloFundoBotao.setStrokeStyle(1, COR_BOTAO_BORDA);

            // Badge azul com a letra da alternativa
            const retanguloBadge = this.cena.add.rectangle(
                LARGURA_PORTRAIT_NPC, posY, LARGURA_BADGE, ALTURA_BOTAO, COR_BADGE
            ).setOrigin(0, 0);

            // Letra dentro do badge (A, B, C ou D)
            const textoBadgeLetra = this.cena.add.text(
                LARGURA_PORTRAIT_NPC + LARGURA_BADGE / 2, posY + ALTURA_BOTAO / 2,
                letras[i],
                { fontSize: TAM_FONTE_BADGE, color: "#ffffff", fontStyle: "bold" }
            ).setOrigin(0.5);

            // Texto da alternativa ao lado do badge
            const textoOpcaoBotao = this.cena.add.text(
                LARGURA_PORTRAIT_NPC + LARGURA_BADGE + 10, posY + ALTURA_BOTAO / 2 - 4,
                "",
                {
                    fontSize: TAM_FONTE_OPCAO,
                    color: COR_TEXTO,
                    fontStyle: "bold",
                    stroke: "#f8fafc",
                    strokeThickness: 1
                }
            ).setOrigin(0, 0.5);
            textoOpcaoBotao.setWordWrapWidth(this.larguraMaximaOpcao);

            // Efeito hover: muda cor ao passar o mouse
            retanguloFundoBotao.on("pointerover", () => {
                retanguloFundoBotao.setFillStyle(COR_BOTAO_HOVER);
                retanguloFundoBotao.setStrokeStyle(2, COR_BOTAO_BORDA_HOVER);
            });
            retanguloFundoBotao.on("pointerout", () => {
                retanguloFundoBotao.setFillStyle(COR_BOTAO_FUNDO);
                retanguloFundoBotao.setStrokeStyle(1, COR_BOTAO_BORDA);
            });

            // Ao clicar, chama a função de resposta com o índice da alternativa
            const idx = i;
            retanguloFundoBotao.on("pointerdown", () => {
                if (this.aoSelecionarResposta && idx >= 0 && idx < NUMERO_OPCOES) {
                    this.aoSelecionarResposta(idx);
                }
            });

            this.containerBotoes.add([retanguloFundoBotao, retanguloBadge, textoBadgeLetra, textoOpcaoBotao]);
            this.listaTextoBotoes.push(textoOpcaoBotao);
        }
    }

    // Área de texto que exibe o feedback após cada resposta (ex: "Excelente!")
    _criarAreaFeedback(larguraConteudo) {
        const posY = ALTURA_CABECALHO + 36 + NUMERO_OPCOES * (ALTURA_BOTAO + ESPACO_BOTOES) + 12;
        this.textoFeedback = this.cena.add.text(larguraConteudo / 2, posY, "", {
            fontSize: TAM_FONTE_FEEDBACK, color: COR_TEXTO, fontStyle: "bold"
        }).setOrigin(0.5).setVisible(false);
    }

    // Atualiza o texto da pergunta e as alternativas nos botões
    definirPergunta(pergunta) {
        if (!pergunta) return;

        this.textoPergunta.setText(pergunta.pergunta ?? "");
        this.textoPergunta.setWordWrapWidth(this.larguraMaximaPergunta);
        this._ajustarTextoAoEspaco(
            this.textoPergunta,
            this.larguraMaximaPergunta,
            this.alturaMaximaPergunta,
            TAM_FONTE_PERGUNTA,
            TAM_FONTE_PERGUNTA_MIN
        );

        const opcoes = pergunta.opcoes ?? [];
        for (let i = 0; i < NUMERO_OPCOES; i++) {
            if (this.listaTextoBotoes[i]) {
                this.listaTextoBotoes[i].setText(opcoes[i] ?? "");
                this.listaTextoBotoes[i].setWordWrapWidth(this.larguraMaximaOpcao);
                this._ajustarTextoAoEspaco(
                    this.listaTextoBotoes[i],
                    this.larguraMaximaOpcao,
                    this.alturaMaximaOpcao,
                    TAM_FONTE_OPCAO,
                    TAM_FONTE_OPCAO_MIN
                );
            }
        }

        this.pergunta = pergunta;
    }

    // Atualiza o texto do timer com o tempo restante em segundos
    definirTimer(segundos) {
        this.textoTimer.setText(`${segundos}s`);
    }

    // Atualiza a barra de conversão com o novo valor (0 a 100)
    definirConversao(valor) {
        const v = Phaser.Math.Clamp(valor, 0, 100);

        // Calcula a altura proporcional da barra
        const alturaPreenchimento = v <= 0 ? 0 : (v / 100) * (this.alturaMaxBarra - 4);
        const alturaFinal = Math.max(0, Math.min(alturaPreenchimento, this.alturaMaxBarra - 4));

        // Define a cor conforme o nível de conversão
        let cor = COR_BARRA_BAIXA;
        if (v > 70) cor = COR_BARRA_ALTA;
        else if (v > 40) cor = COR_BARRA_MEDIA;

        this.retanguloBarraPreenchimento.setFillStyle(cor);
        this.retanguloBarraPreenchimento.setSize(LARGURA_BARRA - 4, Math.max(1, alturaFinal));

        // Mostra o valor numérico abaixo da barra
        this.textoValorConversao.setText(String(Math.round(v)));
    }

    // Exibe uma mensagem de feedback após o jogador responder
    exibirFeedback(pontos) {
        let msg = "Resposta fraca.";
        if (pontos === 3) msg = "Excelente!";
        else if (pontos === 2) msg = "Boa resposta!";
        this.textoFeedback.setText(msg);
        this.textoFeedback.setVisible(true);

        // Esconde o feedback após o tempo definido
        this.cena.time.delayedCall(this.duracaoFeedback * 1000, () => this.textoFeedback.setVisible(false));
    }

    // Exibe a tela de resultado ao fim do quiz: verde se conquistou, vermelho se não
    exibirResultado(conquistou, callback) {
        const cam = this.cena.cameras.main;
        const cx = cam.worldView.centerX;
        const cy = cam.worldView.centerY;

        const largura = 800;
        const altura = 200;

        // Fundo verde (conquistou) ou vermelho (não conquistou)
        const fundo = this.cena.add.rectangle(cx, cy, largura, altura, conquistou ? 0x10b981 : 0xef4444)
            .setOrigin(0.5)
            .setDepth(PROFUNDIDADE_UI + 1);

        // Mensagem centralizada
        const msg = conquistou ? this.pergunta.feedbackAcerto + '\n+15 pontos' : this.pergunta.feedbackErro+ '\n-15 pontos';
        const texto = this.cena.add.text(cx, cy, msg, {
            fontSize: TAM_FONTE_RESULTADO,
            color: "#ffffff",
            fontStyle: "bold",
            align: "center",
            wordWrap: { width: largura - 80 }
        }).setOrigin(0.5).setDepth(PROFUNDIDADE_UI + 2);

        this._ajustarTextoAoEspaco(
            texto,
            largura - 80,
            altura - 50,
            TAM_FONTE_RESULTADO,
            TAM_FONTE_RESULTADO_MIN
        );

        // Após 2,5 segundos, remove a tela e retorna ao jogo
        this.cena.time.delayedCall(2500, () => {
            fundo.destroy();
            texto.destroy();
            if (callback) callback();
        });
    }

    // Torna o quiz visível na tela
    mostrar() {
        this.containerPrincipal.setVisible(true);
    }

    // Esconde o quiz da tela
    esconder() {
        this.containerPrincipal.setVisible(false);
    }
}

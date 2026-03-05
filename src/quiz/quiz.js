/**
 * Quiz - Lógica central do sistema de perguntas.
 * Responsável por:
 * - Controlar fluxo das perguntas
 * - Gerenciar tempo
 * - Calcular pontuação
 * - Controlar nível de conversão
 * - Comunicar-se com a camada de UI (QuizUI)
 */

import QuizUI from "./quizUI.js";

// Utilitários de persistência (localStorage com JSON e proteção de erro).
import { salvarDados, carregarDados } from "../utils/storage.js";

// Estado/chaves centralizados para progresso do jogo.
import { chavesArmazenamento, criarEstadoProgressoInicial } from "../utils/estadoJogo.js";

// =====================
// Constantes do sistema
// =====================

// Tempo padrão (em segundos) por pergunta
const TEMPO_PADRAO_POR_PERGUNTA = 15;

// Intervalo de atualização do timer (1 segundo)
const INTERVALO_TIMER_MS = 1000;

// Pontuação de impacto na barra de conversão
const PONTOS_CONVERSAO_EXCELENTE = 30;
const PONTOS_CONVERSAO_BOA = 10;
const PONTOS_CONVERSAO_RUIM = -50;

// Valor inicial da barra de conversão
const NIVEL_CONVERSAO_INICIAL = 50;

// Pontuação mínima para conquistar o NPC
const PONTOS_PARA_CONQUISTA = 6;

export default class Quiz {

    /**
     * @param {Phaser.Scene} cena - Cena onde o quiz será executado
     */
    constructor(cena) {
        this.cena = cena;

        // Permite customização futura do tempo por pergunta
        this.tempoPorPergunta = TEMPO_PADRAO_POR_PERGUNTA;
    }

    /**
     * Inicia o quiz associado a um NPC
     * @param {Npc} npc - NPC que contém as perguntas
     */
    iniciar(npc) {

        // Salvaguarda: impede iniciar quiz inválido
        if (!npc || !npc.perguntas || npc.perguntas.length === 0) {
            console.warn("Quiz: NPC sem perguntas válidas.");
            return;
        }

        // Pausa física do jogo durante o quiz
        this.cena.physics.pause();

        // Marca NPC como já atendido
        npc.vendeu = true;

        // Inicialização do estado interno do quiz
        this.perguntas = npc.perguntas;
        this.indicePerguntaAtual = 0;
        this.pontuacaoTotal = 0;
        this.nivelConversao = NIVEL_CONVERSAO_INICIAL;
        this.tempoRestante = this.tempoPorPergunta;
        this.timerEvento = null;

        // Define imagem do NPC na interface (fallback para "npc")
        const chaveImagemNpc = npc.chaveImagemNpc ?? "npc";

        // Cria instância da interface visual do quiz
        this.ui = new QuizUI(this.cena, {
            larguraModal: 660,
            alturaModal: 420,
            padding: 18,
            larguraColunaBarra: 48,
            alturaMaxBarraConversao: 150,
            duracaoFeedback: 1.5,
            chaveImagemNpc: chaveImagemNpc
        });

        // Define callback ao selecionar resposta
        this.ui.aoSelecionarResposta = (indiceEscolhido) =>
            this.responder(indiceEscolhido);

        // Exibe interface
        this.ui.mostrar();

        // Inicializa barra de conversão
        this.ui.definirConversao(this.nivelConversao);

        // Exibe primeira pergunta e inicia timer
        this.exibirPerguntaAtual();
        this.iniciarTimer();
    }

    /**
     * Finaliza o quiz e retorna ao jogo
     */
    finalizar() {
        if (this.ui) this.ui.esconder();

        // Retoma física da cena
        this.cena.physics.resume();
    }

    /**
     * Exibe a pergunta correspondente ao índice atual
     */
    exibirPerguntaAtual() {
        const perguntaAtual = this.perguntas[this.indicePerguntaAtual];

        if (!perguntaAtual) {
            console.warn("Quiz: Pergunta não encontrada.");
            return;
        }

        this.ui.definirPergunta(perguntaAtual);
        this.ui.definirTimer(this.tempoRestante);
    }

    /**
     * Inicia contagem regressiva da pergunta atual
     */
    iniciarTimer() {

        // Reinicia tempo restante
        this.tempoRestante = this.tempoPorPergunta;
        this.ui.definirTimer(this.tempoRestante);

        // Remove timer anterior, se existir
        if (this.timerEvento) this.timerEvento.remove(false);

        // Cria evento repetitivo a cada segundo
        this.timerEvento = this.cena.time.addEvent({
            delay: INTERVALO_TIMER_MS,
            callback: () => {
                this.tempoRestante--;
                this.ui.definirTimer(this.tempoRestante);

                if (this.tempoRestante <= 0) {
                    this.tempoEsgotado();
                }
            },
            loop: true
        });
    }

    /**
     * Executado quando o tempo da pergunta chega a zero
     */
    tempoEsgotado() {

        if (this.timerEvento) this.timerEvento.remove(false);

        // Exibe feedback como erro (0 pontos)
        this.ui.exibirFeedback(0);

        // Atualiza visual da conversão
        this.ui.definirConversao(this.nivelConversao);

        this.proximaPergunta();
    }

    /**
     * Processa resposta escolhida pelo jogador
     * @param {number} indiceEscolhido - Índice da alternativa selecionada
     */
    responder(indiceEscolhido) {

        // Salvaguarda: índice fora do intervalo esperado
        if (indiceEscolhido < 0 || indiceEscolhido >= 4) {
            console.warn("Quiz: Índice inválido.");
            return;
        }

        const perguntaAtual = this.perguntas[this.indicePerguntaAtual];
        if (!perguntaAtual) return;

        if (!perguntaAtual.pontos ||
            perguntaAtual.pontos[indiceEscolhido] === undefined) return;

        // Interrompe timer
        if (this.timerEvento) this.timerEvento.remove(false);

        const pontos = perguntaAtual.pontos[indiceEscolhido];

        // Atualiza pontuação total
        this.pontuacaoTotal += pontos;

        // Ajusta nível de conversão conforme desempenho
        if (pontos === 3)
            this.nivelConversao += PONTOS_CONVERSAO_EXCELENTE;
        else if (pontos === 2)
            this.nivelConversao += PONTOS_CONVERSAO_BOA;
        else if (pontos === 1)
            this.nivelConversao += 0;
        else
            this.nivelConversao += PONTOS_CONVERSAO_RUIM;

        // Garante que conversão fique entre 0 e 100
        this.nivelConversao = Phaser.Math.Clamp(
            this.nivelConversao,
            0,
            100
        );

        // Atualiza interface
        this.ui.exibirFeedback(pontos);
        this.ui.definirConversao(this.nivelConversao);

        this.proximaPergunta();
    }

    _salvarProgressoNpcConquistado() {
        // 1) Cria base segura de progresso caso não exista nada salvo.
        const progressoInicial = criarEstadoProgressoInicial();

        // 2) Lê progresso atual no localStorage.
        // Se não houver chave (ou estiver inválida), usa o estado inicial.
        const progressoSalvo = carregarDados(
            chavesArmazenamento.npcsConquistadosQuantidade,
            progressoInicial
        );

        // 3) Mescla fallback + salvo para garantir estrutura consistente.
        const progressoAtual = Object.assign({}, progressoInicial, progressoSalvo);

        // 4) Normaliza para número e incrementa em 1 a quantidade conquistada.
        const quantidadeAtual = Number(progressoAtual.npcsConquistadosQuantidade) || 0;
        progressoAtual.npcsConquistadosQuantidade = quantidadeAtual + 1;

        // 5) Persiste o novo valor no localStorage.
        salvarDados(
            chavesArmazenamento.npcsConquistadosQuantidade,
            progressoAtual
        );
    }
    /**
     * Avança para a próxima pergunta ou finaliza o quiz
     */
    proximaPergunta() {

        this.indicePerguntaAtual++;

        if (this.indicePerguntaAtual < this.perguntas.length) {

            this.exibirPerguntaAtual();
            this.iniciarTimer();

        } else {

            this._encerrarQuiz();
        }
    }

    /**
     * Verifica conquista e exibe resultado antes de fechar
     */
    _encerrarQuiz() {
        // Regra de conquista: pontuação mínima para considerar NPC conquistado.
        const conquistou = this.pontuacaoTotal >= PONTOS_PARA_CONQUISTA;

        // Salva progresso apenas em evento importante (quando conquista).
        if (conquistou) {
            this._salvarProgressoNpcConquistado();
        }

        // Exibe resultado visual e depois retorna ao jogo.
        this.ui.exibirResultado(conquistou, () => this.finalizar());
    }
}
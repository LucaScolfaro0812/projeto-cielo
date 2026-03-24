/**
 * Quiz - Lógica central do sistema de perguntas.
 * Responsável por:
 * - Controlar fluxo das perguntas
 * - Gerenciar tempo
 * - Calcular pontuação
 * - Controlar nível de conversão
 * - Comunicar-se com a camada de UI (InterfaceQuiz)
 */

import InterfaceQuiz from "./quiz-ui.js";

// Utilitários de persistência (localStorage com JSON e proteção de erro).
import { salvarDados, carregarDados } from "../utilitarios/armazenamento.js";

import { perguntasNpc } from "../sistemas/quiz-perguntas.js";

// Estado/chaves centralizados para progresso do jogo.
import { chavesArmazenamento, criarEstadoProgressoInicial } from "../utilitarios/estado-jogo.js";

// =====================
// Constantes do sistema
// =====================

// Tempo padrão (em segundos) por pergunta
const TEMPO_PADRAO_POR_PERGUNTA = 60;

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

        // Guarda o zoom da camera antes de abrir o quiz para restaurar ao finalizar.
        this.zoomOriginalCamera = null;

        // Permite customização futura do tempo por pergunta
        this.tempoPorPergunta = TEMPO_PADRAO_POR_PERGUNTA;
    }
    // Carrega do localStorage a lista de NPCs que já abriram o quiz anteriormente
    _carregarNpcsQuizAbertos() {
        const lista = carregarDados(chavesArmazenamento.npcsQuizAbertos, []);
        return Array.isArray(lista) ? lista : [];
    }

    // Verifica se um NPC específico já abriu o quiz (pelo seu ID)
    _npcJaAbriuQuiz(idNpc) {
        if (!idNpc) return false;
        return this._carregarNpcsQuizAbertos().includes(idNpc);
    }

    // Registra no localStorage que um NPC abriu o quiz, evitando duplicatas
    _marcarNpcQuizComoAberto(idNpc) {
        if (!idNpc) return;
        const lista = this._carregarNpcsQuizAbertos();
        if (!lista.includes(idNpc)) {
            lista.push(idNpc);
            salvarDados(chavesArmazenamento.npcsQuizAbertos, lista);
        }
    }

    //  busca no localStorage a lista de perguntas já feitas, garantindo que sempre retorna um array.
    _carregarPerguntasJaFeitas() {
        const lista = carregarDados(chavesArmazenamento.perguntasJaFeitas, []);
        return Array.isArray(lista) ? lista : [];
    }

    // adiciona o id de uma pergunta ao array salvo, evitando duplicatas, e salva de volta no localStorage.
    _salvarPerguntaFeita(perguntaId) {
        if (!perguntaId) return;
        const lista = this._carregarPerguntasJaFeitas();
        if (!lista.includes(perguntaId)) {
            lista.push(perguntaId);
            salvarDados(chavesArmazenamento.perguntasJaFeitas, lista);
        }
    }

    // Carrega do localStorage a lista de IDs de NPCs já conquistados pelo jogador
    _carregarNpcsConquistadosIds() {
        const lista = carregarDados(chavesArmazenamento.npcsConquistadosIds, []);
        return Array.isArray(lista) ? lista : [];
    }

    // Verifica se um NPC já foi conquistado pelo jogador (pelo seu ID)
    _npcJaConquistado(idNpc) {
        if (!idNpc) return false;
        return this._carregarNpcsConquistadosIds().includes(idNpc);
    }

    // Registra no localStorage que um NPC foi conquistado, evitando duplicatas
    _marcarNpcComoConquistado(idNpc) {
        if (!idNpc) return;
        const lista = this._carregarNpcsConquistadosIds();
        if (!lista.includes(idNpc)) {
            lista.push(idNpc);
            salvarDados(chavesArmazenamento.npcsConquistadosIds, lista);
        }
    }

    /**
     * Inicia o quiz associado a um NPC
     * @param {Npc} npc - NPC que contém as perguntas
     */
    iniciar(npc) {
        this.npcAtual = npc;

        // 1) Bloqueia reabertura se esse NPC ja abriu quiz antes.
        if (npc?.idNpc && this._npcJaAbriuQuiz(npc.idNpc)) {
            npc.vendeu = true;
            return;
        }

        // 2) Valida NPC/perguntas.
        if (!npc || !npc.perguntas || npc.perguntas.length === 0) {
            console.warn("Quiz: NPC sem perguntas validas.");
            return;
        }

        // Salva e normaliza o zoom para melhorar a legibilidade da UI do quiz.
        this.zoomOriginalCamera = this.cena.cameras.main.zoom;
        this.cena.cameras.main.setZoom(1);

        // 4) Fluxo normal do quiz.
        this.cena.physics.pause();
        npc.vendeu = true;

        this.perguntas = [this.pegarPerguntas(), this.pegarPerguntas(), this.pegarPerguntas()];
        this.indicePerguntaAtual = 0;
        this.pontuacaoTotal = 0;
        this.nivelConversao = NIVEL_CONVERSAO_INICIAL;
        this.tempoRestante = this.tempoPorPergunta;
        this.timerEvento = null;

        const sufixoLojaNpc = npc?.cena?.nomeLoja ?? this.cena?.nomeLoja ?? "";
        const chaveImagemNpcVermelhoPorLoja = `npc-vermelho${sufixoLojaNpc}`;

        // O retrato do quiz deve sempre usar o NPC vermelho correspondente.
        // Mantem fallback para evitar erro se a textura especifica nao existir.
        const chaveImagemNpc = this.cena.textures.exists(chaveImagemNpcVermelhoPorLoja)
            ? chaveImagemNpcVermelhoPorLoja
            : (this.cena.textures.exists("npc-vermelho") ? "npc-vermelho" : "npc");

        this.ui = new InterfaceQuiz(this.cena, {
            larguraModal: 1100,
            alturaModal: 660,
            padding: 40,
            larguraColunaBarra: 90,
            alturaMaxBarraConversao: 200,
            duracaoFeedback: 1.5,
            chaveImagemNpc
        });

        this.ui.aoSelecionarResposta = (indiceEscolhido) =>
            this.responder(indiceEscolhido);

        // 3) Marca como aberto no primeiro contato (regra de negocio).
        if (npc?.idNpc) {
            this._marcarNpcQuizComoAberto(npc.idNpc);
        }

        this.ui.mostrar();
        this.ui.definirConversao(this.nivelConversao);
        this.exibirPerguntaAtual();
        this.iniciarTimer();
    }

    pegarPerguntas() {
        const perguntasJaFeitas = this._carregarPerguntasJaFeitas();

        // Filtra as perguntas que ainda não foram feitas
        const perguntasDisponiveis = perguntasNpc.filter(p => !perguntasJaFeitas.includes(p.id));

        let p;

        // recebe perguntas novas até esgotar o banco de perguntas.
        if (perguntasDisponiveis.length > 0) {
            p = perguntasDisponiveis[Phaser.Math.Between(0, perguntasDisponiveis.length - 1)];
        } else {
            // Quando todas já foram feitas, o sistema volta a sortear normalmente, evitando travar o quiz.
            p = perguntasNpc[Phaser.Math.Between(0, perguntasNpc.length - 1)];
        }
        return p;
    }

    aplicarVisualConquistado(npc) {
        if (!npc?.idNpc) return;
        if (this._npcJaConquistado(npc.idNpc)) {
            // Regra atual: NPC conquistado fica azul.
            npc.visualConquistado();
            return;
        }

        // Regra atual: NPC nao conquistado fica vermelho.
        npc.visualNaoConquistado();
    }

    /**
     * Finaliza o quiz e retorna ao jogo
     */
    finalizar() {
        if (this.ui) this.ui.esconder();

        // Restaura o zoom original da cena para manter a navegacao no mapa como antes.
        if (this.zoomOriginalCamera !== null) {
            this.cena.cameras.main.setZoom(this.zoomOriginalCamera);
            this.zoomOriginalCamera = null;
        }

        // Retoma física da cena
        this.cena.physics.resume();

        // Garante atualização visual do NPC após retomar a física
        if (this.npcAtual && this._npcJaConquistado(this.npcAtual.idNpc)) {
            this.npcAtual.visualConquistado();
        }
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

        //Salva a pergunta como feita
        this._salvarPerguntaFeita(perguntaAtual.id);

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
        const conquistou = this.pontuacaoTotal >= PONTOS_PARA_CONQUISTA;

        if (conquistou) {
            console.log("VENCEU O QUIZ! Limpando a lista de lojas bloqueadas.");
            salvarDados('lojaBloqueada', null);

            this._salvarProgressoNpcConquistado();

            if (this.npcAtual) {
                this.npcAtual.visualConquistado();
                this._marcarNpcComoConquistado(this.npcAtual.idNpc);

                if (this.cena.atualizarPainelNpcs) {
                    this.cena.atualizarPainelNpcs();
                }
            }
        } else {
            // Pega o nome da cena atual do quiz
            const nomeDestaLoja = this.cena.scene.key;
            
        
            salvarDados('lojaBloqueada', nomeDestaLoja);
        }

        this.ui.exibirResultado(conquistou, () => this.finalizar());
    }
}

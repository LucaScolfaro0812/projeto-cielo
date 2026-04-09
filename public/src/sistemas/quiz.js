/**
 * Quiz - Lógica central do sistema de perguntas.
 * Responsável por:
 * - Controlar fluxo das perguntas
 * - Gerenciar tempo
 * - Controlar nível de conversão
 * - Comunicar-se com a camada de UI (InterfaceQuiz)
 */

import InterfaceQuiz from "./quiz-ui.js";

// Utilitários de persistência (localStorage com JSON e proteção de erro).
import { salvarDados, carregarDados } from "../utilitarios/armazenamento.js";

import { getPerguntasPorLoja, selecionarTresAleatorias } from "../sistemas/quiz-perguntas.js";

// Estado/chaves centralizados para progresso do jogo.
import { chavesArmazenamento, criarEstadoProgressoInicial } from "../utilitarios/estado-jogo.js";

import { atualizarEstadoNpc } from "../utilitarios/progresoNPCs.js";
import { Maquininhas } from "./maquininhas.js";

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
    /**
     * Carrega do localStorage a lista de IDs de NPCs que já abriram o quiz anteriormente.
     * Retorna array vazio se não houver dados ou se o dado salvo não for um array.
     * @returns {string[]}
     */
    _carregarNpcsQuizAbertos() {
        const lista = carregarDados(chavesArmazenamento.npcsQuizAbertos, []);
        return Array.isArray(lista) ? lista : [];
    }

    /**
     * Verifica se um NPC específico já iniciou o quiz pelo menos uma vez.
     * @param {string} idNpc - ID do NPC a verificar
     * @returns {boolean}
     */
    _npcJaAbriuQuiz(idNpc) {
        if (!idNpc) return false;
        return this._carregarNpcsQuizAbertos().includes(idNpc);
    }

    /**
     * Registra no localStorage que um NPC abriu o quiz, evitando duplicatas.
     * @param {string} idNpc - ID do NPC a marcar
     */
    _marcarNpcQuizComoAberto(idNpc) {
        if (!idNpc) return;
        const lista = this._carregarNpcsQuizAbertos();
        if (!lista.includes(idNpc)) {
            lista.push(idNpc);
            salvarDados(chavesArmazenamento.npcsQuizAbertos, lista);
        }
    }

    /**
     * Busca no localStorage a lista de IDs de perguntas já respondidas pelo jogador.
     * Garante que sempre retorna um array, mesmo se o dado salvo estiver corrompido.
     * @returns {string[]}
     */
    _carregarPerguntasJaFeitas() {
        const lista = carregarDados(chavesArmazenamento.perguntasJaFeitas, []);
        return Array.isArray(lista) ? lista : [];
    }

    /**
     * Registra o ID de uma pergunta como já respondida, evitando repetição no mesmo ciclo.
     * @param {string} perguntaId - ID da pergunta a marcar
     */
    _salvarPerguntaFeita(perguntaId) {
        if (!perguntaId) return;
        const lista = this._carregarPerguntasJaFeitas();
        if (!lista.includes(perguntaId)) {
            lista.push(perguntaId);
            salvarDados(chavesArmazenamento.perguntasJaFeitas, lista);
        }
    }

    /**
     * Carrega do localStorage a lista de IDs de NPCs já conquistados pelo jogador.
     * @returns {string[]}
     */
    _carregarNpcsConquistadosIds() {
        const lista = carregarDados(chavesArmazenamento.npcsConquistadosIds, []);
        return Array.isArray(lista) ? lista : [];
    }

    /**
     * Verifica se um NPC já foi conquistado pelo jogador.
     * @param {string} idNpc - ID do NPC a verificar
     * @returns {boolean}
     */
    _npcJaConquistado(idNpc) {
        if (!idNpc) return false;
        return this._carregarNpcsConquistadosIds().includes(idNpc);
    }

    /**
     * Registra no localStorage que um NPC foi conquistado, evitando duplicatas.
     * @param {string} idNpc - ID do NPC a marcar como conquistado
     */
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

        // Sempre busca as perguntas corretas para a loja/NPC
        this.perguntas = this.pegarPerguntasParaLoja();

        // Se não houver perguntas disponíveis, mostra mensagem e encerra
        if (!this.perguntas || this.perguntas.length === 0) {
            if (this.cena && this.cena.add && typeof this.cena.add.text === 'function') {
                const msg = this.cena.add.text(
                    this.cena.cameras.main.centerX,
                    this.cena.cameras.main.centerY - 100,
                    'Não há perguntas disponíveis para este NPC.',
                    { fontSize: '32px', fill: '#ff0000', backgroundColor: '#fff', padding: { x: 20, y: 10 } }
                ).setOrigin(0.5).setDepth(2000);
                this.cena.time.delayedCall(1500, () => msg.destroy());
            }
            return;
        }

        // Salva e normaliza o zoom para melhorar a legibilidade da UI do quiz.
        this.zoomOriginalCamera = this.cena.cameras.main.zoom;
        this.cena.cameras.main.setZoom(1);

        // 4) Fluxo normal do quiz.
        this.cena.physics.pause();
        npc.vendeu = true;

        // Seleciona até 3 perguntas da loja, sem repetição
        this.perguntas = this.pegarPerguntasParaLoja();

        // Se não houver perguntas disponíveis, mostra mensagem e encerra
        if (!this.perguntas || this.perguntas.length === 0) {
            if (this.ui && typeof this.ui.definirPergunta === 'function') {
                this.ui.definirPergunta({ pergunta: "Não há mais perguntas disponíveis para esta loja.", opcoes: ["", "", "", ""] });
            }
            setTimeout(() => this.finalizar(), 2000);
            return;
        }
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
            if (!this.cena.cache.audio.exists('clienteGanho')) {
             this.cena.load.audio('clienteGanho', 'assets/sons/clienteGanho.mp3');
            }
        if (!this.cena.cache.audio.exists('clientePerdido')) {
        this.cena.load.audio('clientePerdido', 'assets/sons/clientePerdido.mp3');
            }
        this.cena.load.start();

        this.ui.aoSelecionarResposta = (indiceEscolhido) =>
            this.responder(indiceEscolhido);

        // 3) Marca como aberto no primeiro contato (regra de negocio).
        if (npc?.idNpc) {
            this._marcarNpcQuizComoAberto(npc.idNpc);
        }

        this.cena.hudMaquininhas?.container.setVisible(false);
        this.ui.mostrar();
        this.ui.definirConversao(this.nivelConversao);
        this.exibirPerguntaAtual();
        this.iniciarTimer();

        if (!this.cena.cache.audio.exists('somClicando')) {
          this.cena.load.audio('somClicando', 'assets/sons/somClicando.mp3');
            }
            this.cena.load.start();
    }

    
    /**
     * Seleciona até 3 perguntas aleatórias, não repetidas, da loja do NPC atual
     */
    pegarPerguntasParaLoja() {
        // Determina o ID da loja (deve ser definido no NPC ou na cena)
        let lojaId = this.npcAtual?.lojaId || this.cena?.nomeLoja;
        if (typeof lojaId === 'string') lojaId = lojaId.toLowerCase();
        let todas = lojaId ? getPerguntasPorLoja(lojaId) : [];
        // Não usa mais fallback para perguntasNpcRua
        if (!todas || todas.length === 0) {
            // Retorna array vazio, o quiz mostrará mensagem de erro
            return [];
        }
        const perguntasJaFeitas = this._carregarPerguntasJaFeitas();
        let disponiveis = todas.filter(q => !perguntasJaFeitas.includes(q.id));
        if (disponiveis.length === 0 && todas.length > 0) {
            disponiveis = [...todas];
        }
        return selecionarTresAleatorias(disponiveis);
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
        this.cena.hudMaquininhas?.container.setVisible(true);

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

        // Exibe feedback de tempo esgotado; avança apenas após o jogador clicar em "Continuar"
        const perguntaAtual = this.perguntas[this.indicePerguntaAtual];
        const feedbackTexto = perguntaAtual?.feedbackErro ?? undefined;
        this.ui.definirConversao(this.nivelConversao);
        this.ui.exibirFeedback(0, feedbackTexto, () => this.proximaPergunta());
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

        // Ajusta nível de conversão conforme a qualidade da resposta:
        // 3 pts (excelente) → +30 | 2 pts (boa) → +10 | 1 pt (neutra) → sem mudança | 0 pts (incorreta) → -50
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

        // Usa feedback específico da opção escolhida; avança apenas após o jogador clicar em "Continuar"
        const feedbackTexto = perguntaAtual.feedbackOpcoes?.[indiceEscolhido]
            ?? (pontos >= 2 ? perguntaAtual.feedbackAcerto : perguntaAtual.feedbackErro);
        this.ui.definirConversao(this.nivelConversao);
        this.ui.exibirFeedback(pontos, feedbackTexto, () => this.proximaPergunta());
    }

    /**
     * Incrementa o contador total de NPCs conquistados no localStorage.
     * Usa merge com estado inicial para garantir estrutura consistente mesmo
     * se o dado salvo estiver incompleto ou ausente.
     */
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
          if (this.cena.cache.audio.exists('clienteGanho')) {
        this.cena.sound.play('clienteGanho', { volume: 0.6 });
         }
            // ... resto do código já existente
        }   else {
            if (this.cena.cache.audio.exists('clientePerdido')) {
        this.cena.sound.play('clientePerdido', { volume: 3 });
        }
        // ... resto do código já existente
            }

        if (conquistou) {
            // Jogador conquistou o NPC
            atualizarEstadoNpc(this.npcAtual.idNpc, 'conquistado');
            // Atualiza localStorage: remove de interagidos e adiciona em conquistados
            let conquistados = carregarDados(chavesArmazenamento.npcsConquistadosIds, []);
            let interagidos = carregarDados(chavesArmazenamento.npcsInteragidosIds, []);
            if (!conquistados.includes(this.npcAtual.idNpc)) conquistados.push(this.npcAtual.idNpc);
            interagidos = interagidos.filter(id => id !== this.npcAtual.idNpc);
            salvarDados(chavesArmazenamento.npcsConquistadosIds, conquistados);
            salvarDados(chavesArmazenamento.npcsInteragidosIds, interagidos);

            const totalLojas = this.cena.lojasConfigs ? this.cena.lojasConfigs.length : 12;
            const totalConquistados = conquistados.length;

            if (totalConquistados >= 12 ) {
                this.cena.time.delayedCall(1500, () => {
                this.cena.scene.start('cenaFinal'); 
                });
            }

            if (this.npcAtual) {
                this.npcAtual.setVisualConquista('conquistado');
                this._marcarNpcComoConquistado(this.npcAtual.idNpc);
                if (this.cena.atualizarPainelNpcs) {
                    this.cena.atualizarPainelNpcs();
                }
            }
        } else {
            // Jogador não conquistou o NPC
            atualizarEstadoNpc(this.npcAtual.idNpc, 'interagido');
            // Atualiza localStorage: adiciona em interagidos se não estiver
            let interagidos = carregarDados(chavesArmazenamento.npcsInteragidosIds, []);
            if (!interagidos.includes(this.npcAtual.idNpc)) interagidos.push(this.npcAtual.idNpc);
            salvarDados(chavesArmazenamento.npcsInteragidosIds, interagidos);
            if (this.npcAtual) {
                this.npcAtual.setVisualConquista('nao-conquistado');
                if (this.cena.atualizarPainelNpcs) {
                    this.cena.atualizarPainelNpcs();
                }
            }
        }

        // Mantém as listas de lojas da CenaCidade sincronizadas em tempo real
        // com o estado persistido dos NPCs após finalizar este quiz.
        if (this.cena.atualizarListasLojas) {
            this.cena.atualizarListasLojas();
        }

        // Consome 1 maquininha apenas se o jogador conquistou o NPC
        if (conquistou) {
            Maquininhas.removerMaquininhas(1);
            if (this.cena.atualizarHudMaquininhas) {
                this.cena.atualizarHudMaquininhas();
            }
        }

        // Exibe o resultado final do quiz e chama finalizar ao fechar
        this.ui.exibirResultado(conquistou, () => this.finalizar());
    }
}

/**
 * Quiz - Lógica do quiz. Controla perguntas, timer, pontuação e satisfação.
 * Conecta-se ao QuizUI para exibir a interface.
 */

import QuizUI from "./quizUI.js";

// Constantes do quiz
const TEMPO_PADRAO_POR_PERGUNTA = 15;
const INTERVALO_TIMER_MS = 1000;
const PONTOS_SATISFACAO_EXCELENTE = 30;
const PONTOS_SATISFACAO_BOA = 10;
const PONTOS_SATISFACAO_RUIM = -50;
const NIVEL_SATISFACAO_INICIAL = 50;

export default class Quiz {

    constructor(cena) {
        this.cena = cena;
        this.tempoPorPergunta = TEMPO_PADRAO_POR_PERGUNTA;
    }

    iniciar(npc) {
        // Salvaguarda: não inicia se NPC inválido ou sem perguntas
        if (!npc || !npc.perguntas || npc.perguntas.length === 0) {
            console.warn("Quiz: NPC sem perguntas válidas.");
            return;
        }

        this.cena.physics.pause();
        npc.vendeu = true;

        this.perguntas = npc.perguntas;
        this.indicePerguntaAtual = 0;
        this.pontuacaoTotal = 0;
        this.nivelSatisfacao = NIVEL_SATISFACAO_INICIAL;
        this.tempoRestante = this.tempoPorPergunta;
        this.timerEvento = null;

        const chaveImagemNpc = npc.chaveImagemNpc ?? "npc";

        this.ui = new QuizUI(this.cena, {
            larguraModal: 660,
            alturaModal: 420,
            padding: 18,
            larguraColunaBarra: 48,
            alturaMaxBarraSatisfacao: 150,
            duracaoFeedback: 1.5,
            chaveImagemNpc: chaveImagemNpc
        });

        this.ui.aoSelecionarResposta = (indiceEscolhido) => this.responder(indiceEscolhido);
        this.ui.mostrar();
        this.ui.definirSatisfacao(this.nivelSatisfacao);

        this.exibirPerguntaAtual();
        this.iniciarTimer();
    }

    finalizar() {
        if (this.ui) this.ui.esconder();
        this.cena.physics.resume();
    }

    exibirPerguntaAtual() {
        const perguntaAtual = this.perguntas[this.indicePerguntaAtual];
        if (!perguntaAtual) {
            console.warn("Quiz: Pergunta não encontrada.");
            return;
        }
        this.ui.definirPergunta(perguntaAtual);
        this.ui.definirTimer(this.tempoRestante);
    }

    iniciarTimer() {
        this.tempoRestante = this.tempoPorPergunta;
        this.ui.definirTimer(this.tempoRestante);

        if (this.timerEvento) this.timerEvento.remove(false);

        this.timerEvento = this.cena.time.addEvent({
            delay: INTERVALO_TIMER_MS,
            callback: () => {
                this.tempoRestante--;
                this.ui.definirTimer(this.tempoRestante);
                if (this.tempoRestante <= 0) this.tempoEsgotado();
            },
            loop: true
        });
    }

    tempoEsgotado() {
        if (this.timerEvento) this.timerEvento.remove(false);
        this.ui.exibirFeedback(0);
        this.ui.definirSatisfacao(this.nivelSatisfacao);
        this.proximaPergunta();
    }

    responder(indiceEscolhido) {
        // Salvaguarda: índice fora do intervalo [0, 3]
        if (indiceEscolhido < 0 || indiceEscolhido >= 4) {
            console.warn("Quiz: Índice inválido.");
            return;
        }

        const perguntaAtual = this.perguntas[this.indicePerguntaAtual];
        if (!perguntaAtual) return;
        if (!perguntaAtual.pontos || perguntaAtual.pontos[indiceEscolhido] === undefined) return;

        if (this.timerEvento) this.timerEvento.remove(false);

        const pontos = perguntaAtual.pontos[indiceEscolhido];
        this.pontuacaoTotal += pontos;

        if (pontos === 3) this.nivelSatisfacao += PONTOS_SATISFACAO_EXCELENTE;
        else if (pontos === 2) this.nivelSatisfacao += PONTOS_SATISFACAO_BOA;
        else if (pontos === 1) this.nivelSatisfacao += 0;
        else this.nivelSatisfacao += PONTOS_SATISFACAO_RUIM;

        this.nivelSatisfacao = Phaser.Math.Clamp(this.nivelSatisfacao, 0, 100);

        this.ui.exibirFeedback(pontos);
        this.ui.definirSatisfacao(this.nivelSatisfacao);
        this.proximaPergunta();
    }

    proximaPergunta() {
        this.indicePerguntaAtual++;
        if (this.indicePerguntaAtual < this.perguntas.length) {
            this.exibirPerguntaAtual();
            this.iniciarTimer();
        } else {
            this.finalizar();
        }
    }
}

import QuizUI from "./quizUI.js";

const TEMPO_PADRAO_POR_PERGUNTA = 15;
const INTERVALO_TIMER_MS = 1000;

const PONTOS_SATISFACAO_EXCELENTE = 30;
const PONTOS_SATISFACAO_BOA = 10;
const PONTOS_SATISFACAO_RUIM = -50;
const NIVEL_SATISFACAO_INICIAL = 50;

export default class Quiz{
    constructor(scene){
        this.tempoPorPergunta = TEMPO_PADRAO_POR_PERGUNTA;
        this.scene = scene;
    }

    iniciar(npc){
        console.log("iniciando");

        this.scene.physics.pause();

        npc.vendeu = true;
        this.perguntas = npc.perguntas;

        this.indiceAtual = 0;
        this.pontuacao = 0;
        this.nivelSatisfacao = NIVEL_SATISFACAO_INICIAL;

        this.tempoRestante = this.tempoPorPergunta;
        this.timerEvento = null;

        // callbacks (definidos pela cena)
        this.quandoPerguntaMudar = null;
        this.quandoTempoMudar = null;
        this.quandoResponder = null;
        this.quandoFinalizar = null;

        this.ui = new QuizUI(this.scene, {
            modalWidth:800, 
            modalHeight:600, 
            padding: 15, 
            colunaBarraLargura: 20, 
            temperaturaMaxAltura: 50, 
            feedbackDuration: 1.5
        });

        this.emitirPerguntaAtual();
        this.iniciarTimer();
    }

    finalizar()
    

    emitirPerguntaAtual() {

        const perguntaAtual = this.perguntas[this.indiceAtual];

        if (!perguntaAtual) {
            console.warn("Pergunta não encontrada no índice:", this.indiceAtual);
            return;
        }

        if (this.quandoPerguntaMudar) {
            this.quandoPerguntaMudar(perguntaAtual);
        }
    }

    iniciarTimer() {

        this.tempoRestante = this.tempoPorPergunta;

        if (this.quandoTempoMudar) {
            this.quandoTempoMudar(this.tempoRestante);
        }

        if (this.timerEvento) {
            this.timerEvento.remove(false);
        }

        this.timerEvento = this.scene.time.addEvent({
            delay: INTERVALO_TIMER_MS,
            callback: () => {

                this.tempoRestante--;

                if (this.quandoTempoMudar) {
                    this.quandoTempoMudar(this.tempoRestante);
                }

                if (this.tempoRestante <= 0) {
                    this.tempoEsgotado();
                }

            },
            loop: true
        });
    }

    tempoEsgotado() {

        if (this.timerEvento) {
            this.timerEvento.remove(false);
        }

        if (this.quandoResponder) {
            this.quandoResponder(0, this.nivelSatisfacao);
        }

        this.proximaPergunta();
    }

    responder(indiceEscolhido) {

        const perguntaAtual = this.perguntas[this.indiceAtual];

        if (!perguntaAtual) {
            console.warn("Tentativa de responder sem pergunta válida");
            return;
        }

        if (!perguntaAtual.pontos || perguntaAtual.pontos[indiceEscolhido] === undefined) {
            console.warn("Pontos não encontrados para a resposta");
            return;
        }

        if (this.timerEvento) {
            this.timerEvento.remove(false);
        }

        const pontos = perguntaAtual.pontos[indiceEscolhido];

        this.pontuacao += pontos;

        // lógica de satisfação
        if (pontos === 3) this.nivelSatisfacao += PONTOS_SATISFACAO_EXCELENTE;
        else if (pontos === 2) this.nivelSatisfacao += PONTOS_SATISFACAO_BOA;
        else if (pontos === 1) this.nivelSatisfacao += 0;
        else this.nivelSatisfacao += PONTOS_SATISFACAO_RUIM;

        this.nivelSatisfacao = Phaser.Math.Clamp(this.nivelSatisfacao, 0, 100);

        if (this.quandoResponder) {
            this.quandoResponder(pontos, this.nivelSatisfacao);
        }

        this.proximaPergunta();
    }

    proximaPergunta() {

        this.indiceAtual++;

        if (this.indiceAtual < this.perguntas.length) {

            this.emitirPerguntaAtual();
            this.iniciarTimer();

        } else {

            if (this.quandoFinalizar) {
                this.quandoFinalizar(this.pontuacao);
            }

        }
    }
}
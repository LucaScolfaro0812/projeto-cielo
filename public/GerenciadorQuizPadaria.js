export class GerenciadorQuizPadaria {

    constructor(listaPerguntas) {
        this.listaPerguntas = listaPerguntas;
        this.reiniciar();
    }

    reiniciar() {
        this.indicePerguntaAtual = 0;
        this.pontosTotais = 0;
        this.nivelSatisfacao = 50;
        this.tempoRestante = 15;
        this.eventoTimer = null;
    }

    iniciar(cena) {
        this.cena = cena;
        this.reiniciar();
        this.emitirPerguntaAtual();
        this.iniciarTimer();
    }

    get perguntaAtual() {
        return this.listaPerguntas[this.indicePerguntaAtual];
    }

    responder(indiceResposta) {
        const pergunta = this.perguntaAtual;
        const pontosResposta = pergunta.pontos[indiceResposta];

        this.pontosTotais += pontosResposta;

        if (pontosResposta === 3) this.nivelSatisfacao += 30;
        else if (pontosResposta === 2) this.nivelSatisfacao += 10;
        else if (pontosResposta === 0) this.nivelSatisfacao -= 50;

        this.nivelSatisfacao = Phaser.Math.Clamp(this.nivelSatisfacao, 0, 100);

        this.quandoResponder?.(pontosResposta, this.nivelSatisfacao);

        this.cena.time.delayedCall(2000, () => this.proximaPergunta());
    }

    proximaPergunta() {
        this.indicePerguntaAtual++;

        if (this.indicePerguntaAtual >= this.listaPerguntas.length) {
            this.finalizarQuiz();
            return;
        }

        this.emitirPerguntaAtual();
        this.iniciarTimer();
    }

    emitirPerguntaAtual() {
        this.quandoPerguntaMudar?.(this.perguntaAtual);
    }

    iniciarTimer() {
        this.tempoRestante = 15;
        this.quandoTempoMudar?.(this.tempoRestante);

        if (this.eventoTimer) this.eventoTimer.remove();

        this.eventoTimer = this.cena.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                this.tempoRestante--;
                this.quandoTempoMudar?.(this.tempoRestante);

                if (this.tempoRestante <= 0) {
                    this.eventoTimer.remove();
                    this.quandoTempoEsgotado?.();
                    this.cena.time.delayedCall(2000, () => this.proximaPergunta());
                }
            }
        });
    }

    finalizarQuiz() {
        this.quandoFinalizar?.(this.pontosTotais);
    }
}
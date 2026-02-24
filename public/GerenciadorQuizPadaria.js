export class GerenciadorQuizPadaria {

    constructor(perguntas) {

        this.perguntas = perguntas;

        this.indiceAtual = 0;
        this.pontuacao = 0;
        this.nivelSatisfacao = 50;

        this.tempoRestante = 15;
        this.timerEvento = null;
        this.scene = null;

        // callbacks (definidos pela cena)
        this.quandoPerguntaMudar = null;
        this.quandoTempoMudar = null;
        this.quandoResponder = null;
        this.quandoFinalizar = null;
    }

    iniciar(scene) {

        this.scene = scene;
        this.indiceAtual = 0;
        this.pontuacao = 0;
        this.nivelSatisfacao = 50;

        this.emitirPerguntaAtual();
        this.iniciarTimer();
    }

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

        this.tempoRestante = 15;

        if (this.quandoTempoMudar) {
            this.quandoTempoMudar(this.tempoRestante);
        }

        if (this.timerEvento) {
            this.timerEvento.remove(false);
        }

        this.timerEvento = this.scene.time.addEvent({
            delay: 1000,
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

        // lógica de satisfação (mesma do seu sistema original)
        if (pontos === 3) this.nivelSatisfacao += 30;
        else if (pontos === 2) this.nivelSatisfacao += 10;
        else if (pontos === 1) this.nivelSatisfacao += 0;
        else this.nivelSatisfacao -= 50;

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
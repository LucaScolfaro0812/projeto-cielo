class padariaScene extends Phaser.Scene {

    constructor() {
        super({ key: 'padariaScene' });
    }

    preload() {
        this.load.image('padaria', 'assets/padaria-bg-2.png');
        this.load.image('npc-padeiro', 'assets/npc.png');
        this.load.image('player', 'assets/marcielo.png');
    }

    create() {
        this.add.image(480, 200, 'padaria').setScale(2.1);
        this.npcPadeiro = this.add.image(550, 180, 'npc-padeiro').setScale(0.4);
        this.player = this.add.image(100, 100, 'player').setScale(0.5);

        this.teclaW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.teclaA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.teclaS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.teclaD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        this.quizPadariaAberto = false;
        this.perguntaAtualIndex = 0;
        this.pontosPadaria = 0;
        this.timerInterval = null;
        this.tempoRestante = 15;
        this.satisfacao = 0;


        this.configurarBotoesQuiz();

        // Valor inicial da satisfação (0 a 100)
        this.nivelSatisfacao = 50;

        esconder();
        atualizar(this.nivelSatisfacao);
    }

    update() {

        if (this.quizPadariaAberto) return;

        let velocidade = 2.5;

        // Movimentação horizontal
        if (this.teclaA.isDown) {
            this.player.x -= velocidade;
        } else if (this.teclaD.isDown) {
            this.player.x += velocidade;
        }

        // Movimentação vertical
        if (this.teclaW.isDown) {
            this.player.y -= velocidade;
        } else if (this.teclaS.isDown) {
            this.player.y += velocidade;
        }

        // Verifica proximidade com NPC
        let distancia = Phaser.Math.Distance.Between(
            this.player.x, this.player.y,
            this.npcPadeiro.x, this.npcPadeiro.y
        );

        if (distancia < 100 && Phaser.Input.Keyboard.JustDown(this.teclaE)) {
            this.abrirQuizPadaria();
        }
    }

    configurarBotoesQuiz() {
        const botoes = document.querySelectorAll('.quiz-btn');

        botoes.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                if (this.quizPadariaAberto) {
                    this.verificarResposta(index);
                }
            });
        });
    }

    abrirQuizPadaria() {
        if (this.quizPadariaAberto) return;

        this.quizPadariaAberto = true;
        this.perguntaAtualIndex = 0;
        this.pontosPadaria = 0;

        document.getElementById('quiz-padaria').classList.remove('hidden');
        this.mostrarPergunta();

        mostrar();
    }

    mostrarPergunta() {
        const pergunta = perguntasPadaria[this.perguntaAtualIndex];

        document.getElementById('quiz-pergunta').textContent = pergunta.pergunta;

        const botoes = document.querySelectorAll('.quiz-btn');
        botoes.forEach((btn, index) => {
            btn.textContent = pergunta.opcoes[index];
            btn.classList.remove('correta', 'errada', 'selecionada');
            btn.disabled = false;
        });

        document.getElementById('quiz-feedback').classList.add('hidden');

        this.iniciarTimer();
    }

    iniciarTimer() {
        this.tempoRestante = 15;

        const timerElement = document.getElementById('quiz-timer');
        timerElement.textContent = this.tempoRestante + 's';
        timerElement.classList.remove('alerta');

        if (this.timerInterval) clearInterval(this.timerInterval);

        this.timerInterval = setInterval(() => {
            this.tempoRestante--;
            timerElement.textContent = this.tempoRestante + 's';

            if (this.tempoRestante <= 5) {
                timerElement.classList.add('alerta');
            }

            if (this.tempoRestante <= 0) {
                clearInterval(this.timerInterval);
                this.tempoEsgotado();
            }

        }, 1000);
    }

    tempoEsgotado() {
        const botoes = document.querySelectorAll('.quiz-btn');

        botoes.forEach(btn => btn.disabled = true);

        this.mostrarFeedback(false, "Você perdeu tempo com o cliente.");

        setTimeout(() => this.proximaPergunta(), 2000);
    }

    verificarResposta(indiceEscolhido) {
        clearInterval(this.timerInterval);

        const pergunta = perguntasPadaria[this.perguntaAtualIndex];
        const botoes = document.querySelectorAll('.quiz-btn');

        const pontosDaResposta = pergunta.pontos[indiceEscolhido];
        this.pontosPadaria += pontosDaResposta;

        botoes.forEach(btn => btn.disabled = true);

        // Marca visualmente a escolha
        botoes[indiceEscolhido].classList.add('selecionada');

        // Decide feedback baseado na pontuação
        if (pontosDaResposta === 3) {
            this.mostrarFeedback(true, "Excelente abordagem! 👏");
            this.satisfacao += 30;
        }
        else if (pontosDaResposta === 2) {
            this.mostrarFeedback(true, "Boa resposta! Pode melhorar um pouco.");
            this.satisfacao += 10;
        }
        else if (pontosDaResposta === 1) {
            this.mostrarFeedback(false, "Resposta fraca. Pense mais no cliente.");
            this.satisfacao += 0;
        }
        else {
            this.mostrarFeedback(false, "Essa abordagem pode prejudicar a venda.");
            this.satisfacao -= 50;
        }
        this.nivelSatisfacao = this.nivelSatisfacao + this.satisfacao;
        if (this.nivelSatisfacao < 0) this.nivelSatisfacao = 0;
        if (this.nivelSatisfacao > 100) this.nivelSatisfacao = 100;
        atualizar(this.nivelSatisfacao);
        setTimeout(() => this.proximaPergunta(), 2500);
    }

    mostrarFeedback(sucesso, mensagem) {
        const feedback = document.getElementById("quiz-feedback");
        const texto = document.getElementById("quiz-feedback-texto");

        feedback.classList.remove('hidden', 'sucesso', 'erro');
        feedback.classList.add(sucesso ? 'sucesso' : 'erro');
        texto.textContent = mensagem;
    }

    proximaPergunta() {
        this.perguntaAtualIndex++;

        if (this.perguntaAtualIndex < perguntasPadaria.length) {
            this.mostrarPergunta();
        } else {
            this.finalizarQuiz();
        }
    }

    finalizarQuiz() {
        const feedback = document.getElementById("quiz-feedback");
        const texto = document.getElementById("quiz-feedback-texto");

        feedback.classList.remove('hidden', 'erro');
        feedback.classList.add('sucesso');
        texto.textContent = `Quiz finalizado!! Você fez ${this.pontosPadaria} pontos!!`;

        setTimeout(() => {
            document.getElementById('quiz-padaria').classList.add('hidden');
            this.quizPadariaAberto = false;
        }, 3000);
        esconder();
    }
}
import { perguntasPadaria } from './quizPadaria.js';
import { GerenciadorQuizPadaria } from './GerenciadorQuizPadaria.js';

export class padariaScene extends Phaser.Scene {

    constructor() {
        super({ key: 'padariaScene' });
    }

    preload() {
        this.load.image('padaria', 'public/assets/padaria-bg-2.png');
        this.load.image('npc-padeiro', 'public/assets/npc.png');
        this.load.image('player', 'public/assets/marcielo.png');
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

        this.gerenciadorQuiz = new GerenciadorQuizPadaria(perguntasPadaria);

        this.gerenciadorQuiz.quandoPerguntaMudar = (pergunta) => {
            this.renderizarPerguntaDOM(pergunta);
        };

        this.gerenciadorQuiz.quandoTempoMudar = (tempo) => {
            document.getElementById('quiz-timer').textContent = tempo + 's';
        };

        this.gerenciadorQuiz.quandoResponder = (pontos, nivel) => {
            atualizar(nivel);
        };

        this.gerenciadorQuiz.quandoFinalizar = () => {
            this.finalizarQuiz();
        };

        esconder();
        atualizar(50);
    }

    update() {
        if (this.quizPadariaAberto) return;

        let velocidade = 2.5;

        if (this.teclaA.isDown) this.player.x -= velocidade;
        else if (this.teclaD.isDown) this.player.x += velocidade;

        if (this.teclaW.isDown) this.player.y -= velocidade;
        else if (this.teclaS.isDown) this.player.y += velocidade;

        let distancia = Phaser.Math.Distance.Between(
            this.player.x, this.player.y,
            this.npcPadeiro.x, this.npcPadeiro.y
        );

        if (distancia < 100 && Phaser.Input.Keyboard.JustDown(this.teclaE)) {
            this.abrirQuizPadaria();
        }
    }

    abrirQuizPadaria() {
        if (this.quizPadariaAberto) return;

        this.quizPadariaAberto = true;

        document.getElementById('quiz-padaria').classList.remove('hidden');
        mostrar();

        this.gerenciadorQuiz.iniciar(this);
    }

    renderizarPerguntaDOM(pergunta) {
        document.getElementById('quiz-pergunta').textContent = pergunta.pergunta;

        const botoes = document.querySelectorAll('.quiz-btn');

        botoes.forEach((btn, indice) => {
            btn.textContent = pergunta.opcoes[indice];
            btn.onclick = () => this.gerenciadorQuiz.responder(indice);
        });

        document.getElementById('quiz-feedback').classList.add('hidden');
    }

    finalizarQuiz() {
        const feedback = document.getElementById("quiz-feedback");
        const texto = document.getElementById("quiz-feedback-texto");

        feedback.classList.remove('hidden', 'erro');
        feedback.classList.add('sucesso');
        texto.textContent = `Quiz finalizado!!`;

        setTimeout(() => {
            document.getElementById('quiz-padaria').classList.add('hidden');
            this.quizPadariaAberto = false;
        }, 3000);

        esconder();
    }
}
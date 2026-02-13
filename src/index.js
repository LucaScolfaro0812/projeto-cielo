// Configuração principal do jogo Phaser
var config = {
    type: Phaser.AUTO,
    // Define se o Phaser usará WebGL ou Canvas automaticamente

    width: 960,
    // Largura da tela do jogo

    height: 540,
    // Altura da tela do jogo

    scene: [
        MenuScene,
        // Primeira cena: menu inicial

        {
            key: "GameScene",
            // Nome da cena principal do jogo

            preload: preload,
            // Função responsável por carregar imagens e recursos

            create: create,
            // Função executada quando a cena começa

            update: update
            // Função que roda continuamente (loop do jogo)
        }
    ]
}

// Cria o jogo usando as configurações acima
var game = new Phaser.Game(config);

// Configurações do player


let player;
// Variável que representará o jogador

let velocidade = 2.5;
// Velocidade de movimentação do jogador


// Configurações do jogo


// Perguntas fáceis
const perguntasFacil = [
  {
    pergunta: "O que a Cielo oferece principalmente aos lojistas?",
    // Texto da pergunta

    opcoes: [
      "Serviço de internet",
      "Maquininhas de pagamento",
      "Software de edição de vídeo",
      "Planos de celular"
    ],
    // Lista de alternativas

    correta: 1
    // Índice da alternativa correta (começa em 0)
  },
  {
    pergunta: "Qual tipo de pagamento pode ser feito com a maquininha Cielo?",
    opcoes: [
      "Apenas dinheiro",
      "Cartão e pagamento digital",
      "Somente cheque",
      "Apenas PIX agendado"
    ],
    correta: 1
  }
];

// Perguntas médias
const perguntasMedio = [
  {
    pergunta: "Qual é uma vantagem de usar a Cielo para o lojista?",
    opcoes: [
      "Aumentar filas",
      "Reduzir vendas",
      "Facilitar recebimentos",
      "Bloquear cartões"
    ],
    correta: 2
  },
  {
    pergunta: "O que significa antecipação de recebíveis?",
    opcoes: [
      "Receber o pagamento antes do prazo",
      "Cancelar uma venda",
      "Cobrar duas vezes o cliente",
      "Aumentar juros automaticamente"
    ],
    correta: 0
  }
];

// Perguntas difíceis
const perguntasDificil = [
  {
    pergunta: "Por que oferecer múltiplas formas de pagamento aumenta as vendas?",
    opcoes: [
      "Limita os clientes",
      "Dificulta a compra",
      "Dá mais opções ao cliente",
      "Aumenta taxas"
    ],
    correta: 2
  },
  {
    pergunta: "Qual recurso ajuda o lojista a acompanhar vendas na Cielo?",
    opcoes: [
      "Relatórios de vendas",
      "Bloqueio de cartão",
      "Modo avião",
      "Limite de Wi-Fi"
    ],
    correta: 0
  }
];

// Variáveis de controle do quiz

let i = 0;
// Controla qual pergunta está sendo exibida

let j = 0;
// (Não está sendo usada no código atual)

let pontos = 0;
// Guarda a pontuação do jogador

let perguntas;
// Armazenará todas as perguntas juntas

let perguntasCorrentes = [];
// Guarda apenas as perguntas sorteadas para o quiz atual

let quizAberto = false;
// Controla se o quiz está aberto ou não

// Teclas de controle

let teclaW;
let teclaA;
let teclaS;
let teclaD;
let teclaE;

// =====================
// Função preload
// =====================

function preload(){
    // Carrega a imagem do cenário
    this.load.image('rua', '../assets/rua.png');

    // Carrega a imagem do NPC
    this.load.image('npc', '../assets/Npc.png');

    // Carrega a imagem do jogador
    this.load.image('player', '../assets/Marcielo.png');
}

// =====================
// Função create
// =====================

function create(){
    // Adiciona o cenário no centro da tela
    this.add.image(config.width, config.height, 'rua')
        .setPosition(config.width/2, config.height/2)
        .setScale(4);

    // Adiciona o NPC
    this.add.image(50, 50, 'npc')
        .setPosition(config.width/2, config.height/2)
        .setScale(0.1);

    // Adiciona o jogador
    this.player = this.add.image(50, 50, 'player')
        .setScale(0.1);

    // Configura a câmera para seguir o jogador
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(0.75);

    // Junta todas as perguntas em um único array
    perguntas = [
        ...perguntasFacil,
        ...perguntasMedio,
        ...perguntasDificil
    ];

    // Configura as teclas do teclado
    this.teclaW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.teclaA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.teclaS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.teclaD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
}

// =====================
// Função update (loop do jogo)
// =====================

function update(){

  // Movimentação horizontal
  if(this.teclaA.isDown){
    this.player.x -= velocidade;
  }
  else if(this.teclaD.isDown){
    this.player.x += velocidade;
  }

  // Movimentação vertical
  if(this.teclaW.isDown){
    this.player.y -= velocidade;
  }
  else if(this.teclaS.isDown){
    this.player.y += velocidade;
  }

  // Interação com o quiz
  if(this.teclaE.isDown){
    abrirQuiz();
  }
}

// =====================
// Funções do quiz
// =====================

function abrirQuiz() {
    // Impede abrir o quiz mais de uma vez
    if (quizAberto) return;

    quizAberto = true;

    // Pausa a cena do jogo
    game.scene.pause("GameScene");

    perguntasCorrentes = [];

    // Sorteia 2 perguntas diferentes
    for (let i = 0; i < 2; i++) {
        const p = perguntas[Phaser.Math.Between(0, perguntas.length - 1)];

        if (!perguntasCorrentes.includes(p)) {
            perguntasCorrentes.push(p);
        } else {
            i--; // Repete se a pergunta for repetida
        }
    }

    // Mostra a interface do quiz
    document.getElementById("ui").classList.remove("hidden");
    mostrarPergunta();
}

function fecharQuiz() {
  quizAberto = false;

  // Esconde a interface do quiz
  document.getElementById("ui").classList.add("hidden");

  // Retoma o jogo
  game.scene.resume("GameScene");
}

function mostrarPergunta() {
  const p = perguntasCorrentes[i];

  // Mostra o texto da pergunta
  document.getElementById("question").textContent = p.pergunta;

  const answers = document.getElementById("answers");
  answers.innerHTML = "";

  // Cria botões para cada alternativa
  p.opcoes.forEach((op, idx) => {
    const btn = document.createElement("button");
    btn.textContent = op;
    btn.onclick = () => responder(idx);
    answers.appendChild(btn);
  });

  // Atualiza a pontuação
  document.getElementById("score").textContent = "Pontos: " + pontos;
}

function responder(escolha) {
  // Verifica se a resposta está correta
  if (escolha === perguntasCorrentes[i].correta) pontos++;

  i++;

  // Vai para a próxima pergunta
  if (i < perguntasCorrentes.length) {
    mostrarPergunta();
  } 
  else {
    // Final do quiz
    document.getElementById("question").textContent = "Fim do quiz!";
    document.getElementById("answers").innerHTML = "";
    document.getElementById("score").textContent = "Pontos: " + pontos;

    // Fecha o quiz após 1,5 segundos
    setTimeout(() => {
      i = 0;
      pontos = 0;
      fecharQuiz();
    }, 1500);
  }
}


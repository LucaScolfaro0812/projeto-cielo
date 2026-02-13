var config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,

    scene: [
        MenuScene, 
        {
            key: "GameScene",
            preload: preload,
            create: create,
            update: update
        }
    ]
}

var game = new Phaser.Game(config);

// configurações do player
let player;
let velocidade = 2.5;


// configurações do jogo

// perguntas
const perguntasFacil = [
  {
    pergunta: "O que a Cielo oferece principalmente aos lojistas?",
    opcoes: [
      "Serviço de internet",
      "Maquininhas de pagamento",
      "Software de edição de vídeo",
      "Planos de celular"
    ],
    correta: 1
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

let i = 0;
let j = 0;
let pontos = 0;
let perguntas;
let perguntasCorrentes = [];
let quizAberto = false;

// Teclas
let teclaW;
let teclaA;
let teclaS;
let teclaD;
let teclaE;

function preload(){
    this.load.image('rua', '../assets/rua.png');
    this.load.image('npc', '../assets/Npc.png');
    this.load.image('player', '../assets/Marcielo.png');
}

function create(){
    this.add.image(config.width, config.height, 'rua').setPosition(config.width/2, config.height/2).setScale(4);
    this.add.image(50, 50, 'npc').setPosition(config.width/2, config.height/2).setScale(0.1);
    this.player = this.add.image(50, 50, 'player').setScale(0.1);
    
    // Configurando a Camera
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(0.75);

    // Definindo todas as perguntas em uma variável só
    perguntas = [
    ...perguntasFacil,
    ...perguntasMedio,
    ...perguntasDificil
    ];

    // Atribuir as teclas a variáveis para poder ler
    this.teclaW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.teclaA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.teclaS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.teclaD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
}

function update(){

  // Movimentação do Player
  if(this.teclaA.isDown){
    this.player.x -= velocidade;
  }
  else if(this.teclaD.isDown){
    this.player.x += velocidade;
  }
  if(this.teclaW.isDown){
    this.player.y -= velocidade;
  }
  else if(this.teclaS.isDown){
    this.player.y += velocidade;
  }

  // Interagir
  if(this.teclaE.isDown){
    abrirQuiz();
  }
}

function abrirQuiz() {
    if (quizAberto) return; // impede abrir 2x

    quizAberto = true;
    game.scene.pause("GameScene");

    perguntasCorrentes = [];

    for (let i = 0; i < 2; i++) {
    const p = perguntas[Phaser.Math.Between(0, perguntas.length - 1)];

    if (!perguntasCorrentes.includes(p)) {
        perguntasCorrentes.push(p);
    } else {
        i--; // tenta de novo se repetiu
    }
    }

    document.getElementById("ui").classList.remove("hidden");
    mostrarPergunta();

}

function fecharQuiz() {
  quizAberto = false;

  document.getElementById("ui").classList.add("hidden");
  game.scene.resume("GameScene");
}

function mostrarPergunta() {
  console.log("mostrando");
  const p = perguntasCorrentes[i];
  document.getElementById("question").textContent = p.pergunta;

  const answers = document.getElementById("answers");
  answers.innerHTML = "";

  p.opcoes.forEach((op, idx) => {
    const btn = document.createElement("button");
    btn.textContent = op;
    btn.onclick = () => responder(idx);
    answers.appendChild(btn);
  });

  document.getElementById("score").textContent = "Pontos: " + pontos;
}

function responder(escolha) {
  if (escolha === perguntasCorrentes[i].correta) pontos++;

  i++;

  if (i < perguntasCorrentes.length) {
    mostrarPergunta();
  } 
  else {
    document.getElementById("question").textContent = "Fim do quiz!";
    document.getElementById("answers").innerHTML = "";
    document.getElementById("score").textContent = "Pontos: " + pontos;

    setTimeout(() => {
      i = 0;
      pontos = 0;
      fecharQuiz();
    }, 1500);
  }
}

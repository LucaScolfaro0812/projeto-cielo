// quizPerguntas.js - Banco de perguntas do quiz.
//
// Estrutura de cada pergunta:
//   pergunta: string com o enunciado exibido na tela
//   opcoes:   array com 4 alternativas (A, B, C, D)
//   pontos:   array com a pontuação de cada alternativa (índice corresponde à opção)
//             0 = resposta errada | 3 = resposta correta

// ============================================================
// Perguntas usadas no quiz da cena da padaria (padariaScene)
// ============================================================
export const perguntasPadaria = [
    {
        // Pergunta sobre qual produto oferecer a um cliente sem antecipação
        pergunta: "Case 1: 'Visitando a loja de moveis voce identificou que o proprietário não trabalha com antecipação. Qual melhor produto para oferecer a ele?'",
        opcoes: [
            "a) ARV",
            "b) Vendeu ta na conta",
            "c) Pix",
            "d) Crediário"       // resposta correta
        ],
        pontos: [0, 0, 0, 3],    // apenas "d" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        // Pergunta sobre prazo de recebimento das vendas
        pergunta: "João pergunta: 'Quanto tempo demora para o dinheiro cair na conta?'",
        opcoes: [
            "a) demora 30 dias",
            "b) depende",
            "c) em poucos dias",
            "d) com a Cielo pode cair em 1 dia útil"  // resposta correta
        ],
        pontos: [0, 0, 0, 3],    // apenas "d" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        // Pergunta sobre clientes que vão embora por falta de cartão
        pergunta: "João reclama: 'Muitos clientes vão embora porque só aceito dinheiro'. Como você responde?",
        opcoes: [
            "a) É melhor assim, dinheiro é mais seguro",
            "b) Aceitar cartão pode aumentar suas vendas em até 30%",  // resposta correta
            "c) Talvez alguns clientes voltem outro dia",
            "d) Você pode pedir para eles irem ao caixa eletrônico"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        // Pergunta sobre experiência negativa anterior com maquininha
        pergunta: "João diz: 'Já tentei maquininha antes e deu problema'. O que você faz?",
        opcoes: [
            "a) Que pena, problemas acontecem",
            "b) Falar mal da concorrência",
            "c) Perguntar o que aconteceu e explicar o suporte 24h da Cielo",  // resposta correta
            "d) Desistir e ir embora"
        ],
        pontos: [0, 0, 3, 0],    // apenas "c" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    }
];

// ============================================================
// Perguntas usadas no quiz do NPC na rua (gameScene)
// ============================================================
export const perguntasNpcRua = [
    {
        // Pergunta sobre objeção de taxas da maquininha
        pergunta: "João comenta: 'Tenho receio das taxas da maquininha...' Como você conduz a conversa?",
        opcoes: [
            "a) Concordar que as taxas são complicadas e encerrar o assunto",
            "b) Explicar que existem planos da Cielo pensados para pequenos negócios, com taxas competitivas",  // resposta correta
            "c) Sugerir que ele continue vendendo só em dinheiro",
            "d) Dizer que taxa é igual em todas"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        // Pergunta sobre prazo de recebimento no cartão
        pergunta: "João pergunta: 'Em quanto tempo recebo pelas vendas no cartão?'",
        opcoes: [
            "a) Dizer que normalmente demora bastante",
            "b) Informar que depende da operadora e não explicar mais nada",
            "c) Explicar as opções de recebimento e antecipação disponíveis",
            "d) Informar que com a Cielo ele pode receber em até 1 dia útil"  // resposta correta
        ],
        pontos: [0, 0, 0, 3],    // apenas "d" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        // Pergunta sobre perda de vendas por aceitar só dinheiro
        pergunta: "João diz: 'Perco vendas porque só aceito dinheiro'. Como você responde?",
        opcoes: [
            "a) Dizer que isso é normal no comércio",
            "b) Explicar que aceitar cartão pode aumentar as vendas e atrair mais clientes",  // resposta correta
            "c) Sugerir que ele peça PIX apenas",
            "d) Recomendar manter como está"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        // Pergunta sobre problema anterior com maquininha
        pergunta: "João fala: 'Já tive problema com maquininha antes'. O que você faz?",
        opcoes: [
            "a) Ignorar a preocupação e mudar de assunto",
            "b) Falar mal da outra empresa",
            "c) Perguntar o que aconteceu e apresentar o suporte e garantia da Cielo",  // resposta correta
            "d) Dizer que tecnologia sempre dá problema"
        ],
        pontos: [0, 0, 3, 0],    // apenas "c" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    }
];

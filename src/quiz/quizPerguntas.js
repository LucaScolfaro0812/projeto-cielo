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
export const perguntasMovel = [
    {
        // Pergunta sobre qual produto oferecer a um cliente sem antecipação
        pergunta: "Sabendo que a loja de móveis tem um faturamento médio de 200k a 300k mensal e oportunidade de melhorar o faturamento, porém, não trabalham com antecipação de vendas. Qual seria o melhor produto Cielo para ofertar para este cliente?",
        opcoes: [
            "a) ARV",
            "b) Vendeu ta na conta",  // resposta correta
            "c) Pix",
            "d) Crediário"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        // Pergunta sobre argumentações de vendas
        pergunta: " Cite duas argumentações de vendas para fomentar o produto Vendeu tá na Conta para esse cliente: ",
        opcoes: [
            "a) Giro de caixa, oportunidade de investimento", // resposta correta
            "b) Dinheiro caindo de hora em hora, aumentar sua poupança",
            "c) Dinheiro parado na conta, oportunidade de investimento",
            "d) Aumentar o estoque, guardar dinheiro em poupança "
        ],
        pontos: [3, 0, 0, 0],    // apenas "a" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        // Pergunta técnica de venda sobre funil de vendas
        pergunta: " Qual etapa do Funil de Vendas garante a melhor técnica para entender a necessidade do proprietário do estabelecimento?",
        opcoes: [
            "a) Abordagem",
            "b) Demonstração",
            "c) Sondagem", // resposta correta
            "d) Aquecimento de Leads"
        ],
        pontos: [0, 0, 3, 0],    // apenas "c" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
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
];

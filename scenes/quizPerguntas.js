/**
 * quizPerguntas.js - Banco de perguntas do quiz.
 * Cada pergunta tem: pergunta, opcoes (A,B,C,D), pontos por alternativa.
 */

// Perguntas da cena da padaria
export const perguntasPadaria = [
    {
        pergunta: "Case 1: 'Visitando a loja de moveis voce identificou que o proprietário não trabalha com antecipação. Qual melhor produto para oferecer a ele?'",
        opcoes: [
            "a) ARV",
            "b) Vendeu ta na conta",
            "c) Pix",
            "d) Crediário"
        ],
        pontos: [0, 0, 0, 3]
    },
    {
        pergunta: "João pergunta: 'Quanto tempo demora para o dinheiro cair na conta?'",
        opcoes: [
            "a) demora 30 dias",
            "b) depende",
            "c) em poucos dias",
            "d) com a Cielo pode cair em 1 dia útil"
        ],
        pontos: [0, 0, 0, 3]
    },
    {
        pergunta: "João reclama: 'Muitos clientes vão embora porque só aceito dinheiro'. Como você responde?",
        opcoes: [
            "a) É melhor assim, dinheiro é mais seguro",
            "b) Aceitar cartão pode aumentar suas vendas em até 30%",
            "c) Talvez alguns clientes voltem outro dia",
            "d) Você pode pedir para eles irem ao caixa eletrônico"
        ],
        pontos: [0, 3, 0, 0]
    },
    {
        pergunta: "João diz: 'Já tentei maquininha antes e deu problema'. O que você faz?",
        opcoes: [
            "a) Que pena, problemas acontecem",
            "b) Falar mal da concorrência",
            "c) Perguntar o que aconteceu e explicar o suporte 24h da Cielo",
            "d) Desistir e ir embora"
        ],
        pontos: [0, 0, 3, 0]
    }
];

// Perguntas da cena da rua (NPC na rua)
export const perguntasNpcRua = [
    {
        pergunta: "João comenta: 'Tenho receio das taxas da maquininha...' Como você conduz a conversa?",
        opcoes: [
            "a) Concordar que as taxas são complicadas e encerrar o assunto",
            "b) Explicar que existem planos da Cielo pensados para pequenos negócios, com taxas competitivas",
            "c) Sugerir que ele continue vendendo só em dinheiro",
            "d) Dizer que taxa é igual em todas"
        ],
        pontos: [0, 3, 0, 0]
    },
    {
        pergunta: "João pergunta: 'Em quanto tempo recebo pelas vendas no cartão?'",
        opcoes: [
            "a) Dizer que normalmente demora bastante",
            "b) Informar que depende da operadora e não explicar mais nada",
            "c) Explicar as opções de recebimento e antecipação disponíveis",
            "d) Informar que com a Cielo ele pode receber em até 1 dia útil"
        ],
        pontos: [0, 0, 0, 3]
    },
    {
        pergunta: "João diz: 'Perco vendas porque só aceito dinheiro'. Como você responde?",
        opcoes: [
            "a) Dizer que isso é normal no comércio",
            "b) Explicar que aceitar cartão pode aumentar as vendas e atrair mais clientes",
            "c) Sugerir que ele peça PIX apenas",
            "d) Recomendar manter como está"
        ],
        pontos: [0, 3, 0, 0]
    },
    {
        pergunta: "João fala: 'Já tive problema com maquininha antes'. O que você faz?",
        opcoes: [
            "a) Ignorar a preocupação e mudar de assunto",
            "b) Falar mal da outra empresa",
            "c) Perguntar o que aconteceu e apresentar o suporte e garantia da Cielo",
            "d) Dizer que tecnologia sempre dá problema"
        ],
        pontos: [0, 0, 3, 0]
    }
];

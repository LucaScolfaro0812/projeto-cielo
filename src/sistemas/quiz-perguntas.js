// quizPerguntas.js - Banco de perguntas do quiz.
//
// Estrutura de cada pergunta:
//   pergunta: string com o enunciado exibido na tela
//   opcoes:   array com 4 alternativas (A, B, C, D)
//   pontos:   array com a pontuação de cada alternativa (índice corresponde à opção)
//             0 = resposta errada | 3 = resposta correta

// ============================================================

// Utilitário para obter perguntas por loja
export function getPerguntasPorLoja(lojaId) {
    switch (lojaId) {
        case 'movel': return perguntasMovel;
        case 'cafe': return perguntasCafe;
        case 'pet': return perguntasPet;
        case 'lanchonete': return perguntasLanchonete;
        case 'autoescola': return perguntasAutoescola;
        case 'pelucia': return perguntasPelucia;
        case 'chocolate': return perguntasChocolate;
        default: return [];
    }
}

// Seleciona até 3 perguntas aleatórias, sem repetição
export function selecionarTresAleatorias(array) {
    const copia = [...array];
    const selecionadas = [];
    for (let i = 0; i < 3 && copia.length > 0; i++) {
        const idx = Math.floor(Math.random() * copia.length);
        selecionadas.push(copia.splice(idx, 1)[0]);
    }
    return selecionadas;
}
// Perguntas usadas no quiz da cena da Loja de Movéis (lojaMovel)
// ============================================================
export const perguntasMovel = [
    {
        // Pergunta sobre qual produto oferecer a um cliente sem antecipação
        id: "movel_1",
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
        id: "movel_2",
        pergunta: "Cite duas argumentações de vendas para fomentar o produto Vendeu tá na Conta para esse cliente: ",
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
        id: "movel_3",
        pergunta: "Qual etapa do Funil de Vendas garante a melhor técnica para entender a necessidade do proprietário do estabelecimento?",
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
    {
        id: "movel_4",
        pergunta: "Pensando nos passos da visita planejamento e levantamento fazem parte de qual etapa do funil?",
        opcoes: [
            "a) Abordagem",
            "b) Pré-venda", // resposta correta
            "c) Fechamento",
            "d) Pós-venda"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "movel_5",
        pergunta: "Nós da Cielo temos três formas de inserir clientes no funil de venda. Quais são?",
        opcoes: [
            "a) Lead, PAP e indicação", // resposta correta
            "b) Lead, marketing e vendas",
            "c) Indicação, loja e suporte",
            "d) Marketing, CRM e suporte"
        ],
        pontos: [3, 0, 0, 0],    // apenas "a" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "movel_6",
        pergunta: "Frase de atração (CVBA):",
        opcoes: [
            "a) Quer comprar agora?",
            "b) Receber adiantado ajuda seu negócio?", // resposta correta
            "c) Temos promoção hoje",
            "d) Posso instalar agora?"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
];

// ============================================================
// Perguntas usadas no quiz da cena da Cafeteria (lojaCafe)
// ============================================================
export const perguntasCafe = [
    {
        id: "cafe_1",
        // Pergunta sobre estratégia de atendimento para cliente com objeção de taxas
        pergunta: "Durante uma quarta-feira de onda azul, você entrou em uma cafeteria onde não foi bem recebida. O dono, foi logo dizendo que já havia sido cliente Cielo mas que as taxas sempre mudaram e ele sentia que recebia menos do que deveria. Qual a melhor maneira de conduzir esse atendimento?",
        opcoes: [
            "a) Ganhar a confiança do cliente, explicando a nova fase da Cielo. Se apresentar como o novo GN da Geo, pedir uma oportunidade de demonstrar o seu trabalho", // resposta correta
            "b) Conversar com o cliente sobre taxas e máquinas. Ter um diálogo baseado em negociação mas esquecendo de criar conexão com o cliente",
            "c) Conversar com o cliente de maneira mais agressiva defendendo a Cielo e explicando suas mudanças",
            "d) Todas as alternativas acima estão corretas"
        ],
        pontos: [3, 0, 0, 0],    // apenas "a" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        // Pergunta sobre reprecificação
        id: "cafe_2",
        pergunta: "Quando o cliente cita a reprecificação qual ferramenta a Cielo hoje oferece para resguardar e proteger o cliente?",
        opcoes: [
            "a) Acordo Comercial", // resposta correta
            "b) Proteção de Dados",
            "c) Instala direto e App Cielo",
            "d) Alçada"
        ],
        pontos: [3, 0, 0, 0],    // apenas "a" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        // Pergunta técnica de venda sobre funil de vendas
        id: "cafe_3",
        pergunta: "Qual o melhor argumento para fortalecer o Acordo Comercial (contrato) com o cliente?",
        opcoes: [
            "a) Mudanças de taxas a cada período de tempo (3 meses)",
            "b) Proteção de dados do cliente,se assegurando que não haverá vazamento de dados do cliente",
            "c) Normalização e fidelização de taxas durante um período de tempo (6 a 12 meses) sem reprecificação", // resposta correta
            "d) Evitar a precificação do cliente no mês"
        ],
        pontos: [0, 0, 3, 0],    // apenas "c" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        // Pergunta técnica de venda sobre funil de vendas
        id: "cafe_4",
        pergunta: "Quais são as 5 etapas do funil de vendas?",
        opcoes: [
            "a) Prospecção, visita, venda, entrega e suporte",
            "b) Abordagem, Sondagem, Demonstração, Negociação e Fechamento", // resposta correta
            "c) Planejamento, execução, análise, venda e pós-venda",
            "d) Prospecção, abordagem, venda, entrega e fidelização"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        // Pergunta técnica de venda sobre funil de vendas
        id: "cafe_5",
        pergunta: "O Ritmo te auxilia em quais fatores?",
        opcoes: [
            "a) Tempo e produtividade",
            "b) Volume e Margem", // resposta correta
            "c) Qualidade e atendimento",
            "d) Planejamento e execução"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "cafe_6",
        pergunta: "Relação PERDE X PERDE:",
        opcoes: [
            "a) Cliente não compra e continua limitado", // resposta correta
            "b) Cliente compra e empresa perde",
            "c) Empresa lucra e cliente perde",
            "d) Cliente ganha e empresa perde"
        ],
        pontos: [3, 0, 0, 0],    // apenas "a" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
];
// ============================================================
// Perguntas usadas no quiz da cena da petshop (lojaPet)
// ============================================================
export const perguntasPet = [
    {
        id: "pet_1",
        // Pergunta sobre estratégia de vendas consultivas
        pergunta: "Quais as principais oportunidades que as vendas consultivas proporcionam a Cielo e ao cliente?",
        opcoes: [
            "a) As vendas consultivas é um processo pelo qual todo o vendedor submete os clientes na hora do atendimento, elas não proporcionam curadoria personalizada, novas oportunidades e futuras indicações", // resposta correta
            "b) As vendas consultivas agregam valor aos produtos, gera maior satisfação ao cliente, além de fornecer soluções personalizadas e futuras indicações",
            "c) As vendas consultivas não agregam tantas vendas quanto as vendas por impulso. As vendas por impulso geram mais resultados, porque forçam o cliente a fechar na hora e garante 100% de satisfação",
            "d) Todas as alternativas acima são falsas"
        ],
        pontos: [3, 0, 0, 0],    // apenas "a" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        // Pergunta sobre técnica de vendas
        id: "pet_2",
        pergunta: "Existe uma técnica de venda que visa criar uma narrativa que envolve personagens, problemas, emoções, conflitos e soluções que um vendedor pode apresentar ao cliente como argumento para convencê-lo a acreditar nas palavras do consultor. Essa prática gera mais confiança, engajamento e convencimento para fechar um novo negócio. Qual o nome dessa técnica?",
        opcoes: [
            "a) Gatilhos Mentais",
            "b) Rapport",
            "c) Storytelling", // resposta correta
            "d) Esteja Sempre Fechando (ABC)"
        ],
        pontos: [0, 0, 3, 0],    // apenas "c" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "pet_3",
        // Pergunta técnica de venda
        pergunta: "Qual a técnica de vendas nos impulsiona e nos leva a questionar o que precisamos fazer para levar o cliente à próxima etapa de uma venda. Se estivermos na abordagem, o que precisamos fazer para chegar na soldagem e assim por diante. Sempre empurrando para o mais próximo possível do fechamento.",
        opcoes: [
            "a) Gatilhos Mentais",
            "b) Rapport", // resposta correta
            "c) Funil de Vendas",
            "d) Esteja Sempre Fechando (ABC)"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "pet_4",
        pergunta: "Na Sondagem, qual melhor tipo de pergunta?",
        opcoes: [
            "a) Perguntas fechadas",
            "b) Perguntas diretas",
            "c) Perguntas abertas", // resposta correta
            "d) Perguntas rápidas"
        ],
        pontos: [0, 0, 3, 0],    // apenas "c" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "pet_5",
        pergunta: "O que significa P.R.S?",
        opcoes: [
            "a) Processo, Resultado, Sistema",
            "b) Pergunta, Resposta, Suporte", // resposta correta
            "c) Planejamento, Revisão, Solução",
            "d) Produto, Resultado, Serviço"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "pet_6",
        pergunta: "Cliente mais de 100K ajuda em qual indicador?",
        opcoes: [
            "a) Margem",
            "b) Volume", // resposta correta
            "c) Qualidade",
            "d) Tempo"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
];

// ============================================================
// Perguntas usadas no quiz da cena da Lanchonete (lojaLanchonete)
// ============================================================
export const perguntasLanchonete = [
    {
        id: "lanchonete_1",
        // Pergunta sobre qual PIX
        pergunta: "Sobre o PIX, após a transação do valor na maquininha, quanto tempo leva para o estabelecimento receber o dinheiro?",
        opcoes: [
            "a) Instantaneamente ", // resposta correta
            "b) 1 hora",
            "c) 3 horas",
            "d) 24 horas"
        ],
        pontos: [3, 0, 0, 0],    // apenas "a" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "lanchonete_2",
        // Pergunta sobre produtos da Cielo
        pergunta: "Quais são os produtos de prazo da Cielo?",
        opcoes: [
            "a) ARV (Antecipação Avulsa), RA (Recebimento automático em 1 dia) e Recarga",
            "b) ARV (Antecipação Avulsa), RA (Recebimento automático em 1 dia) e TC (Vendeu, tá na conta D0)", // resposta correta
            "c) RA (Recebimento automático em 1 dia), Farol e Conversor de Moedas",
            "d) ARV (Antecipação Avulsa) e Farol"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "lanchonete_3",
        pergunta: "Sobre o Salesforce, está correto dizer:",
        opcoes: [
            "a) Salesforce é uma ferramenta notícias",
            "b) Salesforce e Expert possuem as mesmas funcionalidades",
            "c) Salesforce extrai relatório analítico",
            "d) Salesforce é uma ferramenta de Execução e Produção" // resposta correta
        ],
        pontos: [0, 0, 0, 3],    // apenas "d" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "lanchonete_4",
        pergunta: "Uma sondagem bem feita garante qual % da venda?",
        opcoes: [
            "a) 50%",
            "b) 80%", // resposta correta
            "c) 100%",
            "d) 60%"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "lanchonete_5",
        pergunta: " Qual melhor técnica de demonstração devemos usar?",
        opcoes: [
            "a) SPIN",
            "b) AIDA",
            "c) C.V.B.A", // resposta correta
            "d) SWOT"
        ],
        pontos: [0, 0, 3, 0],    // apenas "c" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "lanchonete_6",
        pergunta: "A ARV ajuda em qual indicador?",
        opcoes: [
           "a) Volume",
           "b) Tempo",
           "c) Margem", // resposta correta
           "d) Qualidade"
        ],
        pontos: [0, 0, 3, 0],    // apenas "c" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
];

// ============================================================
// Perguntas usadas no quiz da cena da Auto escola (lojaAutoescola)
// ============================================================
export const perguntasAutoescola = [
    {
        id: "autoescola_1",
        // Pergunta sobre diferenças de conceitos
        pergunta: "Qual a diferença de Antecipação Avulsa e o RA?",
        opcoes: [
            "a) Antecipação Avulsa antecipa a agenda de recebimentos futuros e o RA altera o prazo de liquidação das vendas para D1", // resposta correta
            "b) Antecipação Avulsa antecipa a agenda futura disponível e o RA antecipa as vendas no crédito à vista",
            "c) Antecipação Avulsa altera o prazo de recebimentos e o RA antecipa a agenda de recebimentos",
            "d) Antecipação Avulsa antecipa as vendas no crédito à vista e RA antecipa a agenda futura disponível"
        ],
        pontos: [3, 0, 0, 0],    // apenas "a" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "autoescola_2",
        // Pergunta sobre matemática de vendas
        pergunta: "Um estabelecimento realizou uma venda no Crédito à Vista, no valor de R$200,00. O MDR para vendas à vista é de 3% e o preço do RA à vista cadastrado é de 2%. Qual o valor total descontado desta venda?",
        opcoes: [
            "a) R$5,00",
            "b) R$7,50", // resposta correta
            "c) R$10,00",
            "d) R$12,50"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "autoescola_3",
        // Pergunta sobre acesso ao site e app da Cielo
        pergunta: "Com acesso no Site e no APP, o cliente pode contratar serviços e produtos da Cielo, inclusive realizar antecipações",
        opcoes: [
            "a) Não, pois antecipações não podem ser feitas online",
            "b) Não, pois o cliente não tem acesso ao APP",
            "c) Sim, porém ainda necessita acesso do vendedor",
            "d) Sim" // resposta correta
        ],
        pontos: [0, 0, 0, 3],    // apenas "d" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "autoescola_4",
        pergunta: "O que significa C.V.B.A?",
        opcoes: [
            " a) Controle, Venda, Base, Ação",
            " b) Cliente, Valor, Benefício, Acordo",
            " c) Característica, Vantagem, Benefício, Atração", // resposta correta"
            " d) Controle, Vantagem, Benefício, Ação ",
        ],
        pontos: [0, 0, 3, 0], // apenas "c" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "autoescola_5",
        pergunta: "VExemplo de Benefício para R.A:",
        opcoes: [
            "a) Antecipação do dinheiro",
            "b) Dinheiro à vista para negociar", // resposta correta
            "c) Taxa reduzida",
            "d) Recebimento parcelado",
        ],
        pontos: [0, 3, 0, 0], // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "autoescola_6",
        pergunta: "Exemplo de fechamento alternativo:",
        opcoes: [
            "a) Quer comprar?",
            "b) Vamos fechar com fidelidade ou sem?",
            "c) Volto depois",
            "d) Pense e me avise"
        ],
        pontos: [0, 3, 0, 0], // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
];

// ============================================================
// Perguntas usadas no quiz da cena da loja de Pelúcia (lojaPelucia)
// ============================================================
export const perguntasPelucia = [
    {
        id: "pelucia_1",
        // Pergunta sobre o que você deve fazer para manter o cliente ativo depois que ele entra
        pergunta: "Assim que o cliente é credenciado ou reativado, sabemos que essa conquista contará nos seus pilares da RVM durante os próximos meses, desta forma, o que você GN deve fazer para que esse cliente não se transforme em um Churn?",
        opcoes: [
            "a) Deixar o cliente sem acesso aos canais digitais (Site e App Cielo Gestão), afinal ele não me pediu para ter acesso",
            "b) Acompanhar a instalação da máquina, certificar que o cliente está conseguindo acessar o site/app Cielo Gestão, se colocar à disposição, não realizar a entrega da meta acordada, realizar Repique Constante (Pós-Vendas)",
            "c) Acompanhar a instalação da máquina, certificar que o cliente está conseguindo acessar o site/app Cielo Gestão, se colocar à disposição, assegurar que o cliente entregue a meta acordada, realizar Repique Constante (Pós-Vendas)", // resposta correta
            "d) Visitar o cliente após 30 dias da negociação efetivada"
        ],
        pontos: [0, 0, 3, 0],    // apenas "c" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "pelucia_2",

        // Pergunta sobre o canal exclusivo de suporte ao estabelecimento
        pergunta: "Qual o canal de atendimento exclusivo para os estabelecimentos?",
        opcoes: [
            "a) Central de Resolução",
            "b) Central de Bate-Papo",
            "c) Central de Ajuda",
            "d) Central de Relacionamento" // resposta correta
        ],
        pontos: [0, 0, 0, 3],    // apenas "d" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "pelucia_3",
        // Pergunta sobre o percentual máximo de remuneração variável
        pergunta: " Qual o percentual máximo da RVM (Remuneração Variável Mensal) que o GN pode atingir?",
        opcoes: [
            "a) 80%",
            "b) 100%",
            "c) 120%",
            "d) 200%" // resposta correta
        ],
        pontos: [0, 0, 0, 3],    // apenas "d" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "pelucia_4",
        pergunta: "Exemplo de Vantagem para R.A:",
        opcoes: [
            "a) Fluxo de caixa, não precisar esperar", // resposta correta
            "b) Recebimento automático",
            "c) Aplicativo integrado",
            "d) Taxa menor"
        ],
        pontos: [3, 0, 0, 0],    // apenas "a" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "pelucia_5",
        pergunta: "Exemplo de Característica para R.A:",
        opcoes: [
            "a) Mais lucro",
            "b) Antecipação do dinheiro", // resposta correta
            "c) Melhor negociação",
            "d) Aumento de clientes"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "pelucia_6",
        pergunta: "Dicas de abordagem de sucesso:",
        opcoes: [
           "a) Falar rápido e direto",
           "b) Afiado, entusiasmo, especialista", // resposta correta
           "c) Ser informal e improvisar",
           "d) Falar pouco e sair rápido"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
];

// ============================================================
// Perguntas usadas no quiz da cena da Loja de Chocolate (lojaChocolate)
// ============================================================
export const perguntasChocolate = [
    {
        id: "chocolate_1",
        // Pergunta sobre ferramentas para analisar desempenho do cliente
        pergunta: "Se tratando de um cliente de conquista, sabemos que o não atingimento do volume negociado impacta diretamente nos pilares da RVM. Para identificar e trabalhar estes pilares, qual das ferramentas abaixo conseguimos acompanhar o realizado e extrair um relatório analítico?",
        opcoes: [
            "a) Cielo +",
            "b) SAP concur",
            "c) Arpa", // resposta correta
            "d) Expert"
        ],
        pontos: [0, 0, 3, 0],    // apenas "c" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "chocolate_2",

        // Pergunta sobre frequência e benefícios do plano de rota
        pergunta: "Com qual frequência o GN deve realizar o Plano de Rota e quais os ganhos?",
        opcoes: [
            "a) Mensalmente, pois é trabalhoso e não beneficia o dinamismo da rotina comercial",
            "b) Bimestralmente, pois o planejamento otimiza gestão de tempo em campo e prioriza as melhores oportunidades com foco na RVM",
            "c) Quinzenalmente, quando necessário para garantir a aderência nos relatórios gerenciais",
            "d) Diariamente, pois o planejamento otimiza gestão de tempo em campo e prioriza as melhores oportunidades com foco na RVM" // resposta correta
        ],
        pontos: [0, 0, 0, 3],    // apenas "d" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "chocolate_3",
        // Pergunta sobre quem contatar para troca da máquina
        pergunta: "Quando um estabelecimento aciona o GN para solicitar a troca da máquina, ele deve entrar em contato com a:",
        opcoes: [
            "a) Central de Comunicação",
            "b) Central Unificada",
            "c) Central de Apoio",
            "d) Central de Ajuda" // resposta correta
        ],
        pontos: [0, 0, 0, 3],    // apenas "d" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "chocolate_4",
        pergunta: "Relação GANHA X GANHA:",
        opcoes: [
            "a) Cliente não compra e empresa perde",
            "b) Cliente compra sem vantagem",
            "c) Cliente melhora gestão e empresa fideliza", // resposta correta
            "d) Empresa lucra e cliente perde"
        ],
        pontos: [0, 0, 3, 0],    // apenas "c" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "chocolate_5",
        pergunta: "Palavras mágicas na demonstração:",
        opcoes: [
            "a) Rápido, barato, simples",
            "b) Exclusivo, inovador, vantagem", // resposta correta
            "c) Fácil, comum, básico",
            "d) Simples, comum, rápido"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "chocolate_6",
        pergunta: "O que é cliente congelado?",
        opcoes: [
             "a) Cliente indeciso",
             "b) Cliente fora do funil ou indisponível", // resposta correta
             "c) Cliente novo",
             "d) Cliente fiel"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
];

// ============================================================
// Perguntas usadas no quiz do NPC na rua (gameScene)
// ============================================================
export const perguntasNpcRua = [
    {
        id: "npcRua_1",
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
        id: "npcRua_2",
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
        id: "movel_24",
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

export const perguntasNpc = [
    {
        id: "movel_25",
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
        id: "movel_26",
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
        id: "movel_27",
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
        id: "movel_28",
        // Pergunta sobre ferramentas para analisar desempenho do cliente
        pergunta: "Se tratando de um cliente de conquista, sabemos que o não atingimento do volume negociado impacta diretamente nos pilares da RVM. Para identificar e trabalhar estes pilares, qual das ferramentas abaixo conseguimos acompanhar o realizado e extrair um relatório analítico?",
        opcoes: [
            "a) Cielo +",
            "b) SAP concur",
            "c) Arpa", // resposta correta
            "d) Expert"
        ],
        pontos: [0, 0, 3, 0],    // apenas "c" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "movel_29",
        // Pergunta sobre frequência e benefícios do plano de rota
        pergunta: "Com qual frequência o GN deve realizar o Plano de Rota e quais os ganhos?",
        opcoes: [
            "a) Mensalmente, pois é trabalhoso e não beneficia o dinamismo da rotina comercial",
            "b) Bimestralmente, pois o planejamento otimiza gestão de tempo em campo e prioriza as melhores oportunidades com foco na RVM",
            "c) Quinzenalmente, quando necessário para garantir a aderência nos relatórios gerenciais",
            "d) Diariamente, pois o planejamento otimiza gestão de tempo em campo e prioriza as melhores oportunidades com foco na RVM" // resposta correta
        ],
        pontos: [0, 0, 0, 3],    // apenas "d" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "movel_30",
        // Pergunta sobre quem contatar para troca da máquina
        pergunta: "Quando um estabelecimento aciona o GN para solicitar a troca da máquina, ele deve entrar em contato com a:",
        opcoes: [
            "a) Central de Comunicação",
            "b) Central Unificada",
            "c) Central de Apoio",
            "d) Central de Ajuda" // resposta correta
        ],
        pontos: [0, 0, 0, 3],    // apenas "d" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
];

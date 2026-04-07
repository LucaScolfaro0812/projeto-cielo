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
    if (!lojaId) return [];
    const id = lojaId.toLowerCase();
    switch (id) {
        case 'movel': return perguntasMovel;
        case 'cafe': return perguntasCafe;
        case 'pet': return perguntasPet;
        case 'lanchonete': return perguntasLanchonete;
        case 'autoescola': return perguntasAutoescola;
        case 'pelucia': return perguntasPelucia;
        case 'chocolate': return perguntasChocolate;
        case 'games': return perguntasGames;
        case 'beleza': return perguntasBeleza;
        case 'roupas': return perguntasRoupas;
        case 'frutaria': return perguntasFrutaria;
        case 'joalheria': return perguntasJoalheria;
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
            "ARV",
            "Vendeu ta na conta",  // resposta correta
            "Pix",
            "Crediário"
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
            "Giro de caixa, oportunidade de investimento", // resposta correta
            "Dinheiro caindo de hora em hora, aumentar sua poupança",
            "Dinheiro parado na conta, oportunidade de investimento",
            "Aumentar o estoque, guardar dinheiro em poupança "
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
            "Abordagem",
            "Demonstração",
            "Sondagem", // resposta correta
            "Aquecimento de Leads"
        ],
        pontos: [0, 0, 3, 0],    // apenas "c" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "movel_4",
        pergunta: "Pensando nos passos da visita planejamento e levantamento fazem parte de qual etapa do funil?",
        opcoes: [
            "Abordagem",
            "Pré-venda", // resposta correta
            "Fechamento",
            "Pós-venda"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "movel_5",
        pergunta: "Nós da Cielo temos três formas de inserir clientes no funil de venda. Quais são?",
        opcoes: [
            "Lead, PAP e indicação", // resposta correta
            "Lead, marketing e vendas",
            "Indicação, loja e suporte",
            "Marketing, CRM e suporte"
        ],
        pontos: [3, 0, 0, 0],    // apenas "a" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "movel_6",
        pergunta: "Frase de atração (CVBA):",
        opcoes: [
            "Quer comprar agora?",
            "Receber adiantado ajuda seu negócio?", // resposta correta
            "Temos promoção hoje",
            "Posso instalar agora?"
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
            "Ganhar a confiança do cliente, explicando a nova fase da Cielo. Se apresentar como o novo GN da Geo, pedir uma oportunidade de demonstrar o seu trabalho", // resposta correta
            "Conversar com o cliente sobre taxas e máquinas. Ter um diálogo baseado em negociação mas esquecendo de criar conexão com o cliente",
            "Conversar com o cliente de maneira mais agressiva defendendo a Cielo e explicando suas mudanças",
            "Todas as alternativas acima estão corretas"
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
            "Acordo Comercial", // resposta correta
            "Proteção de Dados",
            "Instala direto e App Cielo",
            "Alçada"
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
            "Mudanças de taxas a cada período de tempo (3 meses)",
            "Proteção de dados do cliente,se assegurando que não haverá vazamento de dados do cliente",
            "Normalização e fidelização de taxas durante um período de tempo (6 a 12 meses) sem reprecificação", // resposta correta
            "Evitar a precificação do cliente no mês"
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
            "Prospecção, visita, venda, entrega e suporte",
            "Abordagem, Sondagem, Demonstração, Negociação e Fechamento", // resposta correta
            "Planejamento, execução, análise, venda e pós-venda",
            "Prospecção, abordagem, venda, entrega e fidelização"
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
            "Tempo e produtividade",
            "Volume e Margem", // resposta correta
            "Qualidade e atendimento",
            "Planejamento e execução"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "cafe_6",
        pergunta: "Relação PERDE X PERDE:",
        opcoes: [
            "Cliente não compra e continua limitado", // resposta correta
            "Cliente compra e empresa perde",
            "Empresa lucra e cliente perde",
            "Cliente ganha e empresa perde"
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
            "As vendas consultivas é um processo pelo qual todo o vendedor submete os clientes na hora do atendimento, elas não proporcionam curadoria personalizada, novas oportunidades e futuras indicações", // resposta correta
            "As vendas consultivas agregam valor aos produtos, gera maior satisfação ao cliente, além de fornecer soluções personalizadas e futuras indicações",
            "As vendas consultivas não agregam tantas vendas quanto as vendas por impulso. As vendas por impulso geram mais resultados, porque forçam o cliente a fechar na hora e garante 100% de satisfação",
            "Todas as alternativas acima são falsas"
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
            "Gatilhos Mentais",
            "Rapport",
            "Storytelling", // resposta correta
            "Esteja Sempre Fechando (ABC)"
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
            "Gatilhos Mentais",
            "Rapport", // resposta correta
            "Funil de Vendas",
            "Esteja Sempre Fechando (ABC)"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "pet_4",
        pergunta: "Na Sondagem, qual melhor tipo de pergunta?",
        opcoes: [
            "Perguntas fechadas",
            "Perguntas diretas",
            "Perguntas abertas", // resposta correta
            "Perguntas rápidas"
        ],
        pontos: [0, 0, 3, 0],    // apenas "c" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "pet_5",
        pergunta: "O que significa P.R.S?",
        opcoes: [
            "Processo, Resultado, Sistema",
            "Pergunta, Resposta, Suporte", // resposta correta
            "Planejamento, Revisão, Solução",
            "Produto, Resultado, Serviço"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "pet_6",
        pergunta: "Cliente mais de 100K ajuda em qual indicador?",
        opcoes: [
            "Margem",
            "Volume", // resposta correta
            "Qualidade",
            "Tempo"
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
            "Instantaneamente ", // resposta correta
            "1 hora",
            "3 horas",
            "24 horas"
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
            "ARV (Antecipação Avulsa), RA (Recebimento automático em 1 dia) e Recarga",
            "ARV (Antecipação Avulsa), RA (Recebimento automático em 1 dia) e TC (Vendeu, tá na conta D0)", // resposta correta
            "RA (Recebimento automático em 1 dia), Farol e Conversor de Moedas",
            "ARV (Antecipação Avulsa) e Farol"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "lanchonete_3",
        pergunta: "Sobre o Salesforce, está correto dizer:",
        opcoes: [
            "Salesforce é uma ferramenta notícias",
            "Salesforce e Expert possuem as mesmas funcionalidades",
            "Salesforce extrai relatório analítico",
            "Salesforce é uma ferramenta de Execução e Produção" // resposta correta
        ],
        pontos: [0, 0, 0, 3],    // apenas "d" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "lanchonete_4",
        pergunta: "Uma sondagem bem feita garante qual % da venda?",
        opcoes: [
            "50%",
            "80%", // resposta correta
            "100%",
            "60%"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "lanchonete_5",
        pergunta: " Qual melhor técnica de demonstração devemos usar?",
        opcoes: [
            "SPIN",
            "AIDA",
            "C.V.B.A", // resposta correta
            "SWOT"
        ],
        pontos: [0, 0, 3, 0],    // apenas "c" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "lanchonete_6",
        pergunta: "A ARV ajuda em qual indicador?",
        opcoes: [
           "Volume",
           "Tempo",
           "Margem", // resposta correta
           "Qualidade"
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
            "Antecipação Avulsa antecipa a agenda de recebimentos futuros e o RA altera o prazo de liquidação das vendas para D1", // resposta correta
            "Antecipação Avulsa antecipa a agenda futura disponível e o RA antecipa as vendas no crédito à vista",
            "Antecipação Avulsa altera o prazo de recebimentos e o RA antecipa a agenda de recebimentos",
            "Antecipação Avulsa antecipa as vendas no crédito à vista e RA antecipa a agenda futura disponível"
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
            "R$5,00",
            "R$7,50", // resposta correta
            "R$10,00",
            "R$12,50"
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
            "Não, pois antecipações não podem ser feitas online",
            "Não, pois o cliente não tem acesso ao APP",
            "Sim, porém ainda necessita acesso do vendedor",
            "Sim" // resposta correta
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
        pergunta: "Exemplo de Benefício para R.A:",
        opcoes: [
            "Antecipação do dinheiro",
            "Dinheiro à vista para negociar", // resposta correta
            "Taxa reduzida",
            "Recebimento parcelado",
        ],
        pontos: [0, 3, 0, 0], // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "autoescola_6",
        pergunta: "Exemplo de fechamento alternativo:",
        opcoes: [
            "Quer comprar?",
            "Vamos fechar com fidelidade ou sem?",
            "Volto depois",
            "Pense e me avise"
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
            "Deixar o cliente sem acesso aos canais digitais (Site e App Cielo Gestão), afinal ele não me pediu para ter acesso",
            "Acompanhar a instalação da máquina, certificar que o cliente está conseguindo acessar o site/app Cielo Gestão, se colocar à disposição, não realizar a entrega da meta acordada, realizar Repique Constante (Pós-Vendas)",
            "Acompanhar a instalação da máquina, certificar que o cliente está conseguindo acessar o site/app Cielo Gestão, se colocar à disposição, assegurar que o cliente entregue a meta acordada, realizar Repique Constante (Pós-Vendas)", // resposta correta
            "Visitar o cliente após 30 dias da negociação efetivada"
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
            "Central de Resolução",
            "Central de Bate-Papo",
            "Central de Ajuda",
            "Central de Relacionamento" // resposta correta
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
            "80%",
            "100%",
            "120%",
            "200%" // resposta correta
        ],
        pontos: [0, 0, 0, 3],    // apenas "d" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "pelucia_4",
        pergunta: "Exemplo de Vantagem para R.A:",
        opcoes: [
            "Fluxo de caixa, não precisar esperar", // resposta correta
            "Recebimento automático",
            "Aplicativo integrado",
            "Taxa menor"
        ],
        pontos: [3, 0, 0, 0],    // apenas "a" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "pelucia_5",
        pergunta: "Exemplo de Característica para R.A:",
        opcoes: [
            "Mais lucro",
            "Antecipação do dinheiro", // resposta correta
            "Melhor negociação",
            "Aumento de clientes"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "pelucia_6",
        pergunta: "Dicas de abordagem de sucesso:",
        opcoes: [
           "Falar rápido e direto",
           "Afiado, entusiasmo, especialista", // resposta correta
           "Ser informal e improvisar",
           "Falar pouco e sair rápido"
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
            "Cielo +",
            "SAP concur",
            "Arpa", // resposta correta
            "Expert"
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
            "Mensalmente, pois é trabalhoso e não beneficia o dinamismo da rotina comercial",
            "Bimestralmente, pois o planejamento otimiza gestão de tempo em campo e prioriza as melhores oportunidades com foco na RVM",
            "Quinzenalmente, quando necessário para garantir a aderência nos relatórios gerenciais",
            "Diariamente, pois o planejamento otimiza gestão de tempo em campo e prioriza as melhores oportunidades com foco na RVM" // resposta correta
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
            "Central de Comunicação",
            "Central Unificada",
            "Central de Apoio",
            "Central de Ajuda" // resposta correta
        ],
        pontos: [0, 0, 0, 3],    // apenas "d" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "chocolate_4",
        pergunta: "Relação GANHA X GANHA:",
        opcoes: [
            "Cliente não compra e empresa perde",
            "Cliente compra sem vantagem",
            "Cliente melhora gestão e empresa fideliza", // resposta correta
            "Empresa lucra e cliente perde"
        ],
        pontos: [0, 0, 3, 0],    // apenas "c" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "chocolate_5",
        pergunta: "Palavras mágicas na demonstração:",
        opcoes: [
            "Rápido, barato, simples",
            "Exclusivo, inovador, vantagem", // resposta correta
            "Fácil, comum, básico",
            "Simples, comum, rápido"
        ],
        pontos: [0, 3, 0, 0],    // apenas "b" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "chocolate_6",
        pergunta: "O que é cliente congelado?",
        opcoes: [
             "Cliente indeciso",
             "Cliente fora do funil ou indisponível", // resposta correta
             "Cliente novo",
             "Cliente fiel"
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
            "Concordar que as taxas são complicadas e encerrar o assunto",
            "Explicar que existem planos da Cielo pensados para pequenos negócios, com taxas competitivas",  // resposta correta
            "Sugerir que ele continue vendendo só em dinheiro",
            "Dizer que taxa é igual em todas"
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
            "Dizer que normalmente demora bastante",
            "Informar que depende da operadora e não explicar mais nada",
            "Explicar as opções de recebimento e antecipação disponíveis",
            "Informar que com a Cielo ele pode receber em até 1 dia útil"  // resposta correta
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
            "Dizer que isso é normal no comércio",
            "Explicar que aceitar cartão pode aumentar as vendas e atrair mais clientes",  // resposta correta
            "Sugerir que ele peça PIX apenas",
            "Recomendar manter como está"
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
            "Concordar que as taxas são complicadas e encerrar o assunto",
            "Explicar que existem planos da Cielo pensados para pequenos negócios, com taxas competitivas",  // resposta correta
            "Sugerir que ele continue vendendo só em dinheiro",
            "Dizer que taxa é igual em todas"
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
            "Dizer que normalmente demora bastante",
            "Informar que depende da operadora e não explicar mais nada",
            "Explicar as opções de recebimento e antecipação disponíveis",
            "Informar que com a Cielo ele pode receber em até 1 dia útil"  // resposta correta
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
            "Dizer que isso é normal no comércio",
            "Explicar que aceitar cartão pode aumentar as vendas e atrair mais clientes",  // resposta correta
            "Sugerir que ele peça PIX apenas",
            "Recomendar manter como está"
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
            "Cielo +",
            "SAP concur",
            "Arpa", // resposta correta
            "Expert"
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
            "Mensalmente, pois é trabalhoso e não beneficia o dinamismo da rotina comercial",
            "Bimestralmente, pois o planejamento otimiza gestão de tempo em campo e prioriza as melhores oportunidades com foco na RVM",
            "Quinzenalmente, quando necessário para garantir a aderência nos relatórios gerenciais",
            "Diariamente, pois o planejamento otimiza gestão de tempo em campo e prioriza as melhores oportunidades com foco na RVM" // resposta correta
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
            "Central de Comunicação",
            "Central Unificada",
            "Central de Apoio",
            "Central de Ajuda" // resposta correta
        ],
        pontos: [0, 0, 0, 3],    // apenas "d" vale pontos

        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
];

// ============================================================
// GAMES
// ============================================================
export const perguntasGames = [
    {
        id: "games_1",
        pergunta: "Uma loja de games tem alto volume de vendas no crédito parcelado e o dono quer receber o dinheiro mais rápido. Qual produto Cielo é o mais indicado?",
        opcoes: [
            "PIX",
            "ARV",
            "Link de Pagamento",
            "Cielo +"
        ],
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "games_2",
        pergunta: "O dono de uma loja de games afirma que a maioria dos clientes paga no débito e dinheiro. Qual é a melhor abordagem antes de propor novos produtos Cielo?",
        opcoes: [
            "Oferecer imediatamente todas as soluções disponíveis",
            "Fazer sondagem para entender o perfil de pagamento dos clientes",
            "Falar das taxas antes de qualquer outra coisa",
            "Encerrar a visita se o cliente já tiver maquininha"
        ],
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "games_3",
        pergunta: "Um cliente da loja de games quer vender jogos online e precisa receber de clientes em todo o Brasil sem maquininha física. Qual solução Cielo atende essa necessidade?",
        opcoes: [
            "Maquininha física",
            "Cielo +",
            "Link de Pagamento",
            "Crediário Cielo"
        ],
        pontos: [0, 0, 3, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "games_4",
        pergunta: "Qual etapa do funil de vendas consiste em entender a necessidade do cliente antes de apresentar qualquer produto?",
        opcoes: [
            "Fechamento",
            "Pós-venda",
            "Demonstração",
            "Sondagem"
        ],
        pontos: [0, 0, 0, 3],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "games_5",
        pergunta: "A sigla CVBA representa quais etapas da argumentação de vendas?",
        opcoes: [
            "Cliente, Valor, Benefício, Ação",
            "Custo, Volume, Base, Atendimento",
            "Característica, Vantagem, Benefício, Ação",
            "Conversão, Venda, Bloqueio, Atração"
        ],
        pontos: [0, 0, 3, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "games_6",
        pergunta: "Durante uma visita à loja de games, o cliente apresenta objeção dizendo que as taxas da Cielo são altas. Qual é a melhor resposta?",
        opcoes: [
            "Concordar e reduzir imediatamente as taxas",
            "Ignorar a objeção e continuar apresentando produtos",
            "Contornar a objeção mostrando o valor agregado dos produtos e serviços Cielo",
            "Encerrar a conversa e retornar outro dia"
        ],
        pontos: [0, 0, 3, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
];

// ============================================================
// BELEZA
// ============================================================
export const perguntasBeleza = [
    {
        id: "beleza_1",
        pergunta: "Uma proprietária de salão de beleza relata que recebe muitos pagamentos no crédito, mas sente que o dinheiro demora muito para cair na conta. Qual produto Cielo resolve esse problema?",
        opcoes: [
            "PIX",
            "ARV",
            "Cielo +",
            "Link de Pagamento"
        ],
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "beleza_2",
        pergunta: "O salão de beleza quer facilitar o pagamento antecipado de agendamentos sem precisar de maquininha. Qual produto Cielo indicar?",
        opcoes: [
            "Maquininha com crédito parcelado",
            "Link de Pagamento",
            "Cielo LIO",
            "ARV"
        ],
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "beleza_3",
        pergunta: "Na visita ao salão de beleza, a proprietária menciona que o negócio tem pico de faturamento nos finais de semana. Qual etapa do funil garante que você identifique essa informação?",
        opcoes: [
            "Pré-venda",
            "Abordagem",
            "Sondagem",
            "Fechamento"
        ],
        pontos: [0, 0, 3, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "beleza_4",
        pergunta: "O Vendeu Tá na Conta é mais indicado para salões de beleza porque:",
        opcoes: [
            "Permite parcelar compras de insumos com fornecedores",
            "Garante que o valor das vendas caia na conta de hora em hora, melhorando o fluxo de caixa",
            "Reduz as taxas de débito para zero",
            "Bloqueia chargebacks automaticamente"
        ],
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "beleza_5",
        pergunta: "Durante uma visita de pós-venda ao salão, você percebe que a proprietária não está usando o PIX Cielo que você vendeu. A melhor atitude é:",
        opcoes: [
            "Ignorar, pois o produto já foi vendido",
            "Ligar para o suporte técnico imediatamente",
            "Entender o motivo da não utilização e apoiar na adoção do produto",
            "Propor a troca por outro produto imediatamente"
        ],
        pontos: [0, 0, 3, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "beleza_6",
        pergunta: "Frase de atração (CVBA) para oferecer o PIX Cielo a um salão de beleza:",
        opcoes: [
            "Quer comprar agora?",
            "Nossa taxa é a mais barata do mercado",
            "Posso instalar a maquininha hoje mesmo?",
            "O PIX cai na hora, sem taxa para receber, seu caixa melhora imediatamente. Quer ativar agora?"
        ],
        pontos: [0, 0, 0, 3],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
];

// ============================================================
// ROUPAS
// ============================================================
export const perguntasRoupas = [
    {
        id: "roupas_1",
        pergunta: "Uma loja de roupas tem faturamento alto nas viradas de estação e quer antecipar os recebíveis de crédito parcelado. Qual produto Cielo indicar?",
        opcoes: [
            "Cielo +",
            "PIX",
            "Link de Pagamento",
            "ARV"
        ],
        pontos: [0, 0, 0, 3],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "roupas_2",
        pergunta: "O proprietário de uma loja de roupas diz que seus clientes preferem pagar parcelado no crédito. Qual argumento fortalece a venda da maquininha Cielo?",
        opcoes: [
            "A Cielo oferece parcelamento em até 18x, permitindo vender peças de maior valor com prestações acessíveis ao cliente",
            "O PIX substitui o crédito parcelado",
            "O débito é sempre mais vantajoso que o crédito",
            "A Cielo não cobra taxa no crédito parcelado"
        ],
        pontos: [3, 0, 0, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "roupas_3",
        pergunta: "Qual etapa do funil de vendas é responsável pelo planejamento e levantamento antes da visita ao cliente?",
        opcoes: [
            "Fechamento",
            "Pré-venda",
            "Sondagem",
            "Pós-venda"
        ],
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "roupas_4",
        pergunta: "O proprietário da loja de roupas pergunta por que usar o PIX Cielo em vez de transferência bancária comum. A melhor resposta é:",
        opcoes: [
            "O PIX Cielo tem taxa para receber, mas oferece vantagens exclusivas",
            "A transferência bancária é sempre melhor que o PIX",
            "O PIX Cielo é idêntico a qualquer outro PIX",
            "O PIX Cielo integra os recebimentos diretamente no painel Cielo, facilitando a gestão do caixa"
        ],
        pontos: [0, 0, 0, 3],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "roupas_5",
        pergunta: "A frase 'Receber mais rápido ajuda a repor o estoque antes do próximo final de semana' é um exemplo de qual componente do CVBA?",
        opcoes: [
            "Característica",
            "Vantagem",
            "Benefício",
            "Ação"
        ],
        pontos: [0, 0, 3, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "roupas_6",
        pergunta: "Nós da Cielo temos três formas de inserir clientes no funil de venda. Quais são?",
        opcoes: [
            "Lead, PAP e indicação",
            "Lead, marketing e vendas",
            "Indicação, loja e suporte",
            "Marketing, CRM e suporte"
        ],
        pontos: [3, 0, 0, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
];

// ============================================================
// FRUTARIA
// ============================================================
export const perguntasFrutaria = [
    {
        id: "frutaria_1",
        pergunta: "O dono de uma frutaria relata que 90% dos pagamentos são em dinheiro e gostaria de aumentar suas vendas. Qual produto Cielo é o mais indicado para iniciar a migração para meios digitais?",
        opcoes: [
            "ARV",
            "Link de Pagamento",
            "Maquininha com PIX e débito",
            "Cielo LIO"
        ],
        pontos: [0, 0, 3, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "frutaria_2",
        pergunta: "A frutaria tem ticket médio baixo e alto volume de clientes. Qual argumento é mais eficaz para convencer o dono a aceitar cartão?",
        opcoes: [
            "Aceitar cartão aumenta o ticket médio e atrai clientes que não carregam dinheiro",
            "O cartão substitui completamente o dinheiro no caixa",
            "A taxa do débito é zero na Cielo",
            "O cartão só serve para clientes de alto valor"
        ],
        pontos: [3, 0, 0, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "frutaria_3",
        pergunta: "O proprietário da frutaria diz que já tentou aceitar cartão antes mas a maquininha era difícil de usar. Como contornar essa objeção?",
        opcoes: [
            "Concordar e não insistir na venda",
            "Demonstrar pessoalmente o uso da maquininha Cielo, mostrando sua facilidade e o suporte disponível",
            "Falar mal da concorrência para justificar a diferença",
            "Oferecer desconto imediato nas taxas sem consultar o gestor"
        ],
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "frutaria_4",
        pergunta: "Pensando nos passos da visita, planejamento e levantamento fazem parte de qual etapa do funil?",
        opcoes: [
            "Abordagem",
            "Pré-venda",
            "Fechamento",
            "Pós-venda"
        ],
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "frutaria_5",
        pergunta: "Qual produto Cielo permite ao dono da frutaria acompanhar o volume de vendas e os recebimentos pelo celular?",
        opcoes: [
            "ARV",
            "Link de Pagamento",
            "Cielo +",
            "Crediário Cielo"
        ],
        pontos: [0, 0, 3, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "frutaria_6",
        pergunta: "Frase de atração (CVBA) para o dono da frutaria:",
        opcoes: [
            "Quer comprar nossa maquininha hoje?",
            "Aceitar cartão e PIX faz seu caixa crescer. Posso ativar agora?",
            "Temos promoção somente essa semana",
            "Você não precisa de maquininha se aceita dinheiro"
        ],
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
];

// ============================================================
// JOALHERIA
// ============================================================
export const perguntasJoalheria = [
    {
        id: "joalheria_1",
        pergunta: "Uma joalheria tem faturamento elevado no crédito parcelado e o proprietário reclama que o dinheiro demora muito para cair. Qual produto Cielo resolve isso?",
        opcoes: [
            "PIX",
            "Cielo +",
            "ARV",
            "Link de Pagamento"
        ],
        pontos: [0, 0, 3, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "joalheria_2",
        pergunta: "O dono de uma joalheria quer oferecer parcelamento em mais vezes para aumentar o ticket médio. Qual argumento reforça a venda da maquininha Cielo?",
        opcoes: [
            "A Cielo oferece parcelamento de até 18x, permitindo vender peças de maior valor com prestações acessíveis ao cliente",
            "O PIX substitui o crédito parcelado para compras de alto valor",
            "Parcelar em mais vezes reduz o faturamento da loja",
            "A Cielo não oferece parcelamento acima de 6x"
        ],
        pontos: [3, 0, 0, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "joalheria_3",
        pergunta: "Durante a sondagem em uma joalheria, você descobre que 70% do faturamento é no crédito parcelado. Qual produto complementar ao ARV você poderia oferecer?",
        opcoes: [
            "Somente a maquininha básica",
            "Vendeu Tá na Conta",
            "Apenas o PIX",
            "Nenhum produto adicional é necessário"
        ],
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "joalheria_4",
        pergunta: "Qual etapa do funil de vendas é responsável por apresentar formalmente a solução ao cliente após identificar sua necessidade?",
        opcoes: [
            "Sondagem",
            "Pré-venda",
            "Demonstração",
            "Pós-venda"
        ],
        pontos: [0, 0, 3, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "joalheria_5",
        pergunta: "O proprietário da joalheria questiona a segurança das transações na maquininha Cielo. A melhor resposta é:",
        opcoes: [
            "Confirmar que há riscos, mas são mínimos",
            "Explicar que a Cielo possui tecnologia de criptografia e segurança antifraude certificada",
            "Mudar de assunto para evitar constrangimento",
            "Dizer que todos os meios de pagamento têm o mesmo nível de segurança"
        ],
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
    {
        id: "joalheria_6",
        pergunta: "Cite duas argumentações de vendas para fomentar o ARV a um cliente de joalheria com alto volume de crédito parcelado:",
        opcoes: [
            "Redução de impostos e isenção de taxas",
            "Aumento de estoque e expansão da loja",
            "Giro de caixa e oportunidade de reinvestimento imediato",
            "Fidelização de clientes e redução de chargebacks"
        ],
        pontos: [0, 0, 3, 0],
        feedbackAcerto: "Párabens! você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
    },
];

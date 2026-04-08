// quizPerguntas.js - Banco de perguntas do quiz.
//
// Estrutura de cada pergunta:
//   pergunta:       string com o enunciado exibido na tela
//   opcoes:         array com 4 alternativas (A, B, C, D)
//   pontos:         array com a pontuação de cada alternativa (índice corresponde à opção)
//                   0 = resposta errada | 3 = resposta correta
//   feedbackOpcoes: array com feedback personalizado para cada alternativa (índice = opção escolhida)
//                   exibido imediatamente após o jogador responder, explicando por que a opção
//                   está certa ou errada para reforçar o aprendizado.

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

// ============================================================
// Perguntas usadas no quiz da cena da Loja de Movéis (lojaMovel)
// ============================================================
export const perguntasMovel = [
    {
        id: "movel_1",
        pergunta: "Sabendo que a loja de móveis tem um faturamento médio de 200k a 300k mensal e oportunidade de melhorar o faturamento, porém, não trabalham com antecipação de vendas. Qual seria o melhor produto Cielo para ofertar para este cliente?",
        opcoes: [
            "ARV",
            "Vendeu ta na conta",  // resposta correta
            "Pix",
            "Crediário"
        ],
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "O ARV antecipa a agenda de recebíveis futuros já negociados. Como este cliente não trabalha com antecipação, ele não teria agenda disponível — o ARV não é o produto certo para este perfil.",
            "Correto! O 'Vendeu, Tá na Conta' é ideal aqui: o valor das vendas cai na conta de hora em hora, sem precisar de antecipação de agenda. Perfeito para um negócio com alto faturamento que quer liquidez imediata.",
            "O PIX é um meio de pagamento instantâneo, não um produto de prazo de recebimento. Ele não resolve a necessidade de receber mais rápido as vendas já realizadas em crédito e débito.",
            "O Crediário é uma forma de parcelamento para o consumidor final da loja. Não é um produto de prazo de recebimento para o estabelecimento."
        ],
    },
    {
        id: "movel_2",
        pergunta: "Cite duas argumentações de vendas para fomentar o produto Vendeu tá na Conta para esse cliente: ",
        opcoes: [
            "Giro de caixa, oportunidade de investimento", // resposta correta
            "Dinheiro caindo de hora em hora, aumentar sua poupança",
            "Dinheiro parado na conta, oportunidade de investimento",
            "Aumentar o estoque, guardar dinheiro em poupança "
        ],
        pontos: [3, 0, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Correto! Giro de caixa e oportunidade de investimento são os argumentos certos: com o dinheiro na mão mais rápido, o lojista pode pagar fornecedores à vista (com desconto) e reinvestir no negócio no mesmo dia.",
            "Cuidado: 'aumentar a poupança' não é argumento comercial para um empresário. O foco deve ser no giro do negócio. 'Dinheiro caindo de hora em hora' descreve o produto, mas o argumento precisa conectar ao benefício empresarial concreto.",
            "'Dinheiro parado na conta' contradiz o benefício do produto — o TC resolve exatamente isso. O argumento correto mostra o que o cliente FAZ com o dinheiro rápido: giro de caixa e oportunidade de reinvestimento.",
            "Aumentar estoque é parcialmente válido, mas 'guardar em poupança' não é objetivo de um produto de prazo empresarial. O argumento certo foca em giro de caixa e oportunidade de investimento no próprio negócio."
        ],
    },
    {
        id: "movel_3",
        pergunta: "Qual etapa do Funil de Vendas garante a melhor técnica para entender a necessidade do proprietário do estabelecimento?",
        opcoes: [
            "Abordagem",
            "Demonstração",
            "Sondagem", // resposta correta
            "Aquecimento de Leads"
        ],
        pontos: [0, 0, 3, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Na Abordagem você se apresenta e cria conexão inicial. É uma etapa importante, mas ainda não é o momento de investigar necessidades em profundidade — isso vem na Sondagem.",
            "A Demonstração só deve acontecer depois que você entendeu a necessidade do cliente. Apresentar o produto antes de sondar é um erro grave: você pode mostrar a solução errada.",
            "Correto! A Sondagem é a etapa de perguntas abertas para entender a realidade do negócio. Aqui você descobre o que o cliente realmente precisa antes de propor qualquer solução.",
            "O Aquecimento de Leads acontece antes do contato direto, na fase de pré-venda. A identificação da necessidade do cliente ocorre durante a visita, na etapa de Sondagem."
        ],
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
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "A Abordagem é o momento de criar conexão durante a visita. O planejamento e levantamento acontecem antes, para você chegar à visita já preparado com informações do estabelecimento.",
            "Correto! A Pré-venda inclui planejamento da rota e levantamento de dados sobre o cliente antes da visita. Chegar preparado — sabendo o faturamento estimado e o histórico com a Cielo — aumenta muito as chances de conversão.",
            "O Fechamento é a última etapa do funil, onde o negócio é formalizado. Planejar na etapa de fechamento seria tarde demais.",
            "O Pós-venda acontece após a venda concluída, com foco em fidelização. Planejamento e levantamento são etapas de preparação anteriores à visita."
        ],
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
        pontos: [3, 0, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Correto! As três formas de inserir clientes no funil da Cielo são Lead (oportunidade gerada por campanhas), PAP — Porta a Porta (visita ativa em campo) e Indicação (referência de um cliente satisfeito).",
            "Marketing e vendas são áreas da empresa, não formas de inserção no funil. A entrada no funil acontece via Lead, PAP ou Indicação — três canais de prospecção ativa.",
            "Loja e suporte são canais de atendimento, não formas de prospectar. A inserção correta no funil é via Lead, PAP e Indicação.",
            "Marketing, CRM e suporte são ferramentas e áreas de apoio à venda. As três formas de inserir clientes no funil são Lead, PAP e Indicação."
        ],
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
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "'Quer comprar agora?' é uma pergunta de fechamento direto, não de atração. No CVBA, a Atração deve despertar o interesse mostrando um benefício antes de qualquer proposta de compra.",
            "Correto! Essa frase usa o benefício como gancho de atração — conecta o produto diretamente ao que importa ao lojista (receber mais rápido) e abre espaço para a conversa sem pressão de venda.",
            "Falar de promoção sem contexto não conecta com a necessidade do cliente. A Atração no CVBA deve mostrar um benefício real para o negócio, não um apelo genérico de preço.",
            "'Posso instalar agora?' é pergunta de fechamento alternativo — você ainda não apresentou o valor do produto. Usado cedo demais, pode gerar resistência e encerrar a conversa antes de criar interesse."
        ],
    },
];

// ============================================================
// Perguntas usadas no quiz da cena da Cafeteria (lojaCafe)
// ============================================================
export const perguntasCafe = [
    {
        id: "cafe_1",
        pergunta: "Durante uma quarta-feira de onda azul, você entrou em uma cafeteria onde não foi bem recebida. O dono, foi logo dizendo que já havia sido cliente Cielo mas que as taxas sempre mudaram e ele sentia que recebia menos do que deveria. Qual a melhor maneira de conduzir esse atendimento?",
        opcoes: [
            "Ganhar a confiança do cliente, explicando a nova fase da Cielo. Se apresentar como o novo GN da Geo, pedir uma oportunidade de demonstrar o seu trabalho", // resposta correta
            "Conversar com o cliente sobre taxas e máquinas. Ter um diálogo baseado em negociação mas esquecendo de criar conexão com o cliente",
            "Conversar com o cliente de maneira mais agressiva defendendo a Cielo e explicando suas mudanças",
            "Todas as alternativas acima estão corretas"
        ],
        pontos: [3, 0, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Correto! Com um ex-cliente insatisfeito, reconstruir a confiança é o primeiro passo. Apresentar-se como o novo GN responsável pela área cria uma oportunidade de recomeço — sem isso, qualquer argumento comercial soa como 'mais do mesmo'.",
            "Ir direto ao produto com um cliente desconfiado acelera a rejeição. Sem criar conexão e credibilidade primeiro, qualquer argumento de taxa soa como discurso de vendedor, não de consultor.",
            "Postura agressiva ou defensiva com um cliente que teve experiência negativa confirma a imagem ruim da marca. Empatia, escuta e posicionamento como parceiro são o caminho.",
            "As alternativas B e C representam abordagens que comprometem a venda. Com ex-clientes insatisfeitos, o único caminho é reconstruir a confiança antes de qualquer conversa sobre produtos."
        ],
    },
    {
        id: "cafe_2",
        pergunta: "Quando o cliente cita a reprecificação qual ferramenta a Cielo hoje oferece para resguardar e proteger o cliente?",
        opcoes: [
            "Acordo Comercial", // resposta correta
            "Proteção de Dados",
            "Instala direto e App Cielo",
            "Alçada"
        ],
        pontos: [3, 0, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Correto! O Acordo Comercial é a ferramenta certa: ele protege o cliente de reprecificações por 6 a 12 meses, garantindo previsibilidade nas taxas — resposta direta ao medo de mudanças.",
            "Proteção de Dados refere-se à segurança das informações pessoais e transacionais. Não está relacionada a taxas ou reprecificação.",
            "Instala Direto e App Cielo Gestão são canais de autoatendimento. Não são ferramentas de proteção contratual contra reprecificação.",
            "A Alçada é a autorização do gestor para negociar condições especiais pontualmente. Diferente do Acordo Comercial, ela não oferece proteção formal e duradoura contra reprecificação."
        ],
    },
    {
        id: "cafe_3",
        pergunta: "Qual o melhor argumento para fortalecer o Acordo Comercial (contrato) com o cliente?",
        opcoes: [
            "Mudanças de taxas a cada período de tempo (3 meses)",
            "Proteção de dados do cliente,se assegurando que não haverá vazamento de dados do cliente",
            "Normalização e fidelização de taxas durante um período de tempo (6 a 12 meses) sem reprecificação", // resposta correta
            "Evitar a precificação do cliente no mês"
        ],
        pontos: [0, 0, 3, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Dizer que 'as taxas mudam a cada 3 meses' descreve o problema, não a solução. Usar esse argumento sem apresentar o Acordo Comercial pode aumentar a insegurança do cliente.",
            "Proteção de dados é um benefício de segurança relevante, mas não é o argumento central do Acordo Comercial — que trata especificamente de estabilidade e previsibilidade das taxas comerciais.",
            "Correto! O diferencial do Acordo Comercial é garantir que as taxas não serão alteradas por 6 a 12 meses. Isso dá previsibilidade financeira ao cliente e responde diretamente ao medo de reprecificação.",
            "'Evitar a precificação no mês' é um benefício de curtíssimo prazo. O argumento correto destaca o período de 6 a 12 meses de proteção — esse é o diferencial competitivo que deve ser comunicado."
        ],
    },
    {
        id: "cafe_4",
        pergunta: "Quais são as 5 etapas do funil de vendas?",
        opcoes: [
            "Prospecção, visita, venda, entrega e suporte",
            "Abordagem, Sondagem, Demonstração, Negociação e Fechamento", // resposta correta
            "Planejamento, execução, análise, venda e pós-venda",
            "Prospecção, abordagem, venda, entrega e fidelização"
        ],
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Prospecção, visita, entrega e suporte descrevem o ciclo operacional de uma empresa, não as etapas do funil de vendas consultivo.",
            "Correto! Abordagem (criar conexão), Sondagem (entender necessidade), Demonstração (apresentar solução), Negociação (tratar objeções) e Fechamento (formalizar) são as 5 etapas do funil consultivo da Cielo.",
            "Planejamento, execução e análise são etapas de gestão de projetos, não as etapas do funil de vendas consultivo com o cliente.",
            "Prospecção e fidelização são etapas externas ao funil consultivo. As 5 etapas internas são: Abordagem, Sondagem, Demonstração, Negociação e Fechamento."
        ],
    },
    {
        id: "cafe_5",
        pergunta: "O Ritmo te auxilia em quais fatores?",
        opcoes: [
            "Tempo e produtividade",
            "Volume e Margem", // resposta correta
            "Qualidade e atendimento",
            "Planejamento e execução"
        ],
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Tempo e produtividade são consequências positivas de um bom ritmo, mas não são os dois indicadores que o modelo de vendas da Cielo mede através do Ritmo.",
            "Correto! O Ritmo é monitorado por Volume (quantidade de clientes ativos e transações) e Margem (qualidade e rentabilidade das vendas). Equilibrar os dois é fundamental para maximizar a RVM.",
            "Qualidade é um componente da Margem, e atendimento é comportamental. O Ritmo foca nos indicadores mensuráveis de resultado: Volume e Margem.",
            "Planejamento e execução são etapas do processo de trabalho. O Ritmo mede os resultados entregues: Volume de negócios e Margem gerada."
        ],
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
        pontos: [3, 0, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Correto! Na relação Perde × Perde, o cliente não compra e continua limitado no negócio, e a Cielo perde a venda. Ambos saem em desvantagem — por isso mostrar valor é essencial para transformar em Ganha × Ganha.",
            "Se o cliente compra e a empresa perde, é uma relação Ganha × Perde, favorável ao cliente. Em Perde × Perde, nenhuma das partes sai em vantagem.",
            "Se a empresa lucra e o cliente perde, é uma relação Perde × Ganha, favorável à Cielo. Perde × Perde significa que nenhum dos dois obteve o que precisava.",
            "Se o cliente ganha e a empresa perde, é Ganha × Perde (favorável ao cliente). Perde × Perde ocorre quando NENHUM dos dois se beneficia da situação."
        ],
    },
];

// ============================================================
// Perguntas usadas no quiz da cena da petshop (lojaPet)
// ============================================================
export const perguntasPet = [
    {
        id: "pet_1",
        pergunta: "Quais as principais oportunidades que as vendas consultivas proporcionam a Cielo e ao cliente?",
        opcoes: [
            "As vendas consultivas é um processo pelo qual todo o vendedor submete os clientes na hora do atendimento, elas não proporcionam curadoria personalizada, novas oportunidades e futuras indicações",
            "As vendas consultivas agregam valor aos produtos, gera maior satisfação ao cliente, além de fornecer soluções personalizadas e futuras indicações", // resposta correta
            "As vendas consultivas não agregam tantas vendas quanto as vendas por impulso. As vendas por impulso geram mais resultados, porque forçam o cliente a fechar na hora e garante 100% de satisfação",
            "Todas as alternativas acima são falsas"
        ],
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Incorreto. As vendas consultivas SIM proporcionam curadoria personalizada, novas oportunidades e indicações. Essa opção descreve uma visão equivocada do processo consultivo.",
            "Correto! As vendas consultivas agregam valor real ao cliente: soluções personalizadas para o seu negócio, maior satisfação e a geração natural de indicações. É o modelo de venda que constrói relacionamentos duradouros.",
            "Incorreto. As vendas por impulso podem gerar picos pontuais, mas não constroem relacionamento nem fidelização. A venda consultiva gera mais resultado sustentável ao longo do tempo.",
            "Incorreto. A alternativa B descreve corretamente as oportunidades que as vendas consultivas proporcionam. As demais alternativas contêm afirmações equivocadas."
        ],
    },
    {
        id: "pet_2",
        pergunta: "Existe uma técnica de venda que visa criar uma narrativa que envolve personagens, problemas, emoções, conflitos e soluções que um vendedor pode apresentar ao cliente como argumento para convencê-lo a acreditar nas palavras do consultor. Essa prática gera mais confiança, engajamento e convencimento para fechar um novo negócio. Qual o nome dessa técnica?",
        opcoes: [
            "Gatilhos Mentais",
            "Rapport",
            "Storytelling", // resposta correta
            "Esteja Sempre Fechando (ABC)"
        ],
        pontos: [0, 0, 3, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Gatilhos Mentais são elementos que influenciam decisões emocionalmente (urgência, escassez, prova social). São poderosos na negociação, mas não descrevem a técnica de criar narrativas com personagens e conflitos.",
            "Rapport é a técnica de criar conexão e empatia com o cliente — essencial na Abordagem. Não descreve a criação de histórias com conflitos e resoluções para convencer.",
            "Correto! O Storytelling é exatamente isso: criar uma narrativa com personagens, problemas e soluções reais que geram identificação no cliente. Quando o GN conta um caso de sucesso de outro lojista similar, está usando Storytelling.",
            "Esteja Sempre Fechando (ABC) é a mentalidade de sempre avançar para a próxima etapa do funil. Não envolve a criação de narrativas — é sobre progressão constante na conversa de vendas."
        ],
    },
    {
        id: "pet_3",
        pergunta: "Qual a técnica de vendas nos impulsiona e nos leva a questionar o que precisamos fazer para levar o cliente à próxima etapa de uma venda. Se estivermos na abordagem, o que precisamos fazer para chegar na sondagem e assim por diante. Sempre empurrando para o mais próximo possível do fechamento.",
        opcoes: [
            "Gatilhos Mentais",
            "Rapport",
            "Funil de Vendas",
            "Esteja Sempre Fechando (ABC)" // resposta correta
        ],
        pontos: [0, 0, 0, 3],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Gatilhos Mentais são estímulos psicológicos que influenciam decisões (urgência, exclusividade). Não descrevem a mentalidade de sempre avançar para a próxima etapa do funil.",
            "Rapport é sobre criar conexão e empatia com o cliente — não sobre 'sempre empurrar para o fechamento'. São técnicas diferentes com momentos diferentes no funil.",
            "O Funil de Vendas é a estrutura do processo (as etapas). Já o ABC é a mentalidade aplicada dentro dessa estrutura: questionar constantemente como avançar ao próximo passo.",
            "Correto! ABC — Esteja Sempre Fechando — é exatamente essa mentalidade: em cada etapa, o GN se pergunta 'o que preciso fazer para avançar?' e age com propósito de chegar ao fechamento."
        ],
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
        pontos: [0, 0, 3, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Perguntas fechadas (sim/não) limitam a conversa e impedem o cliente de revelar sua situação real. Na Sondagem, você precisa de informação detalhada — perguntas fechadas travam o diagnóstico.",
            "Perguntas diretas podem parecer um interrogatório e deixar o cliente na defensiva. Perguntas abertas criam um ambiente de conversa onde ele se sente confortável para compartilhar.",
            "Correto! Perguntas abertas (que começam com 'Como', 'O que', 'Quanto', 'Por que') incentivam o cliente a falar livremente. Quanto mais ele fala, mais você entende a necessidade real e pode personalizar sua proposta.",
            "'Perguntas rápidas' não é uma técnica formal de vendas. Na Sondagem, a profundidade é mais importante do que a velocidade — uma boa pergunta aberta pode revelar a necessidade que fecha a venda."
        ],
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
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Processo, Resultado e Sistema são termos de gestão. No contexto de vendas da Cielo, o P.R.S. refere-se à sequência de interação direta com o cliente durante a sondagem.",
            "Correto! P.R.S. = Pergunta (você faz uma pergunta aberta), Resposta (o cliente responde, revelando sua necessidade) e Suporte (você oferece a solução adequada com base na resposta). É uma técnica estruturada de sondagem.",
            "Planejamento, Revisão e Solução descrevem um ciclo de gestão, não a técnica P.R.S. de interação direta com o cliente durante a visita.",
            "Produto, Resultado e Serviço são elementos do portfólio comercial, não as etapas da técnica P.R.S. de sondagem consultiva."
        ],
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
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "A Margem está relacionada à rentabilidade das vendas. Clientes com alto faturamento (acima de 100K) impactam principalmente o Volume — pelo peso que representam no TPV total da carteira.",
            "Correto! Clientes com faturamento acima de 100K contribuem diretamente para o indicador de Volume, aumentando significativamente o TPV da sua carteira. Volume alto é essencial para atingir as metas de RVM.",
            "Qualidade refere-se ao comportamento e satisfação do cliente. Clientes grandes impactam Volume pelo peso financeiro que representam no total da carteira.",
            "Tempo não é um indicador de desempenho na RVM da Cielo. Os pilares são Volume, Margem e qualidade da carteira."
        ],
    },
];

// ============================================================
// Perguntas usadas no quiz da cena da Lanchonete (lojaLanchonete)
// ============================================================
export const perguntasLanchonete = [
    {
        id: "lanchonete_1",
        pergunta: "Sobre o PIX, após a transação do valor na maquininha, quanto tempo leva para o estabelecimento receber o dinheiro?",
        opcoes: [
            "Instantaneamente ", // resposta correta
            "1 hora",
            "3 horas",
            "24 horas"
        ],
        pontos: [3, 0, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Correto! O PIX cai na conta do estabelecimento instantaneamente, 24 horas por dia, 7 dias por semana — inclusive em finais de semana e feriados. É uma das principais vantagens para negócios com alto volume diário.",
            "O PIX não leva 1 hora. Ele foi criado para ser instantâneo — o lojista recebe em segundos após a confirmação da transação.",
            "3 horas era o prazo do TED bancário tradicional. O PIX foi criado justamente para superar essa limitação, sendo instantâneo.",
            "24 horas era o prazo do DOC (extinto) ou de transferências tradicionais. O PIX eliminou essa espera — o recebimento é imediato."
        ],
    },
    {
        id: "lanchonete_2",
        pergunta: "Quais são os produtos de prazo da Cielo?",
        opcoes: [
            "ARV (Antecipação Avulsa), RA (Recebimento automático em 1 dia) e Recarga",
            "ARV (Antecipação Avulsa), RA (Recebimento automático em 1 dia) e TC (Vendeu, tá na conta D0)", // resposta correta
            "RA (Recebimento automático em 1 dia), Farol e Conversor de Moedas",
            "ARV (Antecipação Avulsa) e Farol"
        ],
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "A Recarga não é um produto de prazo de recebimento. ARV e RA estão corretos, mas o terceiro produto de prazo é o TC (Vendeu, Tá na Conta D0), não Recarga.",
            "Correto! Os três produtos de prazo da Cielo são: ARV (antecipa a agenda de recebíveis futuros), RA (altera o prazo de liquidação das vendas para D1) e TC — Vendeu, Tá na Conta (recebimento D0, de hora em hora).",
            "Farol e Conversor de Moedas são produtos e funcionalidades diferentes. Os três produtos de prazo são ARV, RA e TC.",
            "ARV sozinho é apenas um dos três produtos de prazo. Os outros dois são RA (D1) e TC — Vendeu, Tá na Conta (D0)."
        ],
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
        pontos: [0, 0, 0, 3],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "O Salesforce não é uma ferramenta de notícias. É um CRM com foco em execução comercial — gestão de visitas, oportunidades e relacionamento com clientes.",
            "Salesforce e Expert têm funções diferentes: o Expert é analítico (relatórios, dados históricos), enquanto o Salesforce é operacional (execução, registro de atividades do GN).",
            "O Salesforce não extrai relatórios analíticos detalhados — essa é a função do Expert e do ARPA. O Salesforce foca no registro e execução das atividades comerciais.",
            "Correto! O Salesforce é a ferramenta de Execução e Produção da Cielo: você registra visitas, cria oportunidades, agenda follow-ups e acompanha o funil em tempo real. É o CRM do GN no dia a dia."
        ],
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
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "50% subestima o impacto da sondagem. Quando você entende a necessidade real do cliente, a demonstração e o fechamento fluem naturalmente — o impacto é muito maior.",
            "Correto! Uma sondagem bem feita garante 80% da venda: ao entender a necessidade real, você apresenta a solução exata que o cliente precisa — eliminando objeções antes mesmo de surgirem.",
            "100% seria se a venda dependesse apenas de técnica. Ainda há etapas de demonstração, negociação e fechamento com outras variáveis. A sondagem potencializa, não garante automaticamente.",
            "60% é um número genérico. O treinamento da Cielo estabelece 80% como o impacto de uma sondagem bem conduzida no resultado da venda."
        ],
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
        pontos: [0, 0, 3, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "SPIN (Situação, Problema, Implicação, Necessidade) é uma metodologia de perguntas para sondagem. Na demonstração, a técnica indicada é o CVBA — que apresenta a solução de forma estruturada.",
            "AIDA (Atenção, Interesse, Desejo, Ação) é uma estrutura de marketing e comunicação. Na demonstração de vendas consultivas, o CVBA é a técnica mais indicada.",
            "Correto! CVBA (Característica → Vantagem → Benefício → Atração) é a técnica ideal: você apresenta o que é o produto, o que o diferencia, o que o cliente ganha e termina com uma frase que convida ao próximo passo.",
            "SWOT é uma análise estratégica de pontos fortes, fracos, oportunidades e ameaças — usada em planejamento empresarial, não em técnicas de demonstração de vendas."
        ],
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
        pontos: [0, 0, 3, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Volume está relacionado à quantidade de transações e ao faturamento bruto da carteira. O ARV gera receita adicional pela taxa de antecipação cobrada — isso impacta a Margem, não o Volume.",
            "Tempo não é um indicador da RVM da Cielo. O ARV afeta diretamente a Margem, pois a taxa cobrada pela antecipação gera receita incremental.",
            "Correto! O ARV contribui para a Margem: cada antecipação gera receita com base na taxa cobrada ao cliente. Quanto mais clientes usando ARV, maior a margem gerada na sua carteira.",
            "Qualidade refere-se ao comportamento e satisfação do cliente. O ARV impacta a Margem — pela receita gerada com as taxas de antecipação cobradas."
        ],
    },
];

// ============================================================
// Perguntas usadas no quiz da cena da Auto escola (lojaAutoescola)
// ============================================================
export const perguntasAutoescola = [
    {
        id: "autoescola_1",
        pergunta: "Qual a diferença de Antecipação Avulsa e o RA?",
        opcoes: [
            "Antecipação Avulsa antecipa a agenda de recebimentos futuros e o RA altera o prazo de liquidação das vendas para D1", // resposta correta
            "Antecipação Avulsa antecipa a agenda futura disponível e o RA antecipa as vendas no crédito à vista",
            "Antecipação Avulsa altera o prazo de recebimentos e o RA antecipa a agenda de recebimentos",
            "Antecipação Avulsa antecipa as vendas no crédito à vista e RA antecipa a agenda futura disponível"
        ],
        pontos: [3, 0, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Correto! ARV antecipa a agenda de recebimentos futuros (valores já vendidos mas ainda não liquidados). O RA altera o prazo de liquidação das novas vendas para D1. São produtos diferentes com fins complementares.",
            "Nesta opção os conceitos estão parcialmente trocados. O ARV antecipa agenda existente; o RA não antecipa crédito à vista — ele muda o prazo de recebimento das vendas para D1.",
            "Nesta opção os papéis estão invertidos. O ARV não altera prazo de recebimento — ele antecipa valores futuros. O RA não antecipa agenda — ele altera o prazo de liquidação para D1.",
            "Os conceitos estão completamente trocados. ARV antecipa a agenda futura disponível; RA altera o prazo de liquidação das vendas para D1."
        ],
    },
    {
        id: "autoescola_2",
        pergunta: "Um estabelecimento realizou uma venda no Crédito à Vista, no valor de R$200,00. O MDR para vendas à vista é de 3% e o preço do RA à vista cadastrado é de 2%. Qual o valor total descontado desta venda?",
        opcoes: [
            "R$5,00",
            "R$7,50",
            "R$10,00", // resposta correta
            "R$12,50"
        ],
        pontos: [0, 0, 3, 0],    // apenas "c" vale pontos — MDR 3% + RA 2% = 5% × R$200 = R$10
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "R$5,00 corresponderia a apenas 2,5% sobre R$200. O desconto total soma MDR (3%) + RA (2%) = 5%, e 5% de R$200 = R$10,00.",
            "R$7,50 corresponderia a 3,75% sobre R$200. A conta correta soma as duas taxas: MDR 3% + RA 2% = 5% × R$200 = R$10,00.",
            "Correto! MDR de 3% sobre R$200 = R$6,00. RA de 2% sobre R$200 = R$4,00. Total descontado: R$6,00 + R$4,00 = R$10,00. O lojista recebe R$190,00.",
            "R$12,50 corresponderia a 6,25% sobre R$200. O total correto é MDR 3% + RA 2% = 5% × R$200 = R$10,00."
        ],
    },
    {
        id: "autoescola_3",
        pergunta: "Com acesso no Site e no APP, o cliente pode contratar serviços e produtos da Cielo, inclusive realizar antecipações",
        opcoes: [
            "Não, pois antecipações não podem ser feitas online",
            "Não, pois o cliente não tem acesso ao APP",
            "Sim, porém ainda necessita acesso do vendedor",
            "Sim" // resposta correta
        ],
        pontos: [0, 0, 0, 3],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Antecipações podem sim ser realizadas online, tanto pelo site quanto pelo app Cielo Gestão. O cliente tem total autonomia para contratar serviços sem precisar do GN.",
            "O cliente tem acesso ao app Cielo Gestão para acompanhar vendas, contratar produtos e fazer antecipações de forma autônoma.",
            "O cliente tem plena autonomia digital — não precisa do vendedor para contratar pelo site ou app. Isso inclusive é um diferencial competitivo da Cielo a ser comunicado.",
            "Correto! Pelo site e pelo app Cielo Gestão, o cliente pode contratar serviços, acompanhar vendas e realizar antecipações com total autonomia. Comunicar isso ao cliente reforça o valor da plataforma."
        ],
    },
    {
        id: "autoescola_4",
        pergunta: "O que significa C.V.B.A?",
        opcoes: [
            " a) Controle, Venda, Base, Ação",
            " b) Cliente, Valor, Benefício, Acordo",
            " c) Característica, Vantagem, Benefício, Atração", // resposta correta
            " d) Controle, Vantagem, Benefício, Ação ",
        ],
        pontos: [0, 0, 3, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Controle, Venda, Base e Ação não correspondem à sigla CVBA. Os termos corretos focam nos componentes de uma argumentação de vendas estruturada.",
            "Cliente, Valor e Acordo ficam próximos semanticamente, mas não são os termos corretos. 'Característica' e 'Vantagem' são os componentes precisos para C e V.",
            "Correto! CVBA = Característica (o que é o produto), Vantagem (o que o diferencia), Benefício (o que o cliente ganha) e Atração (frase que convida ao próximo passo). É a base da demonstração consultiva.",
            "Controle e Ação ficam próximos, mas o C de CVBA é Característica e o A final é Atração — não Ação. A Atração é o convite ao próximo passo, não uma instrução de ação genérica."
        ],
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
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "'Antecipação do dinheiro' descreve o que o RA faz (Característica), não o impacto para o negócio (Benefício). O Benefício vai além e mostra o que o cliente conquista com isso.",
            "Correto! 'Dinheiro à vista para negociar' é o Benefício: com o RA o lojista recebe em D1 e pode usar esse capital para negociar desconto com fornecedor, comprar estoque ou cobrir despesas imediatas.",
            "Taxa reduzida seria uma Vantagem comparativa, não o Benefício principal do RA. O Benefício mostra o impacto concreto no dia a dia do negócio do cliente.",
            "Recebimento parcelado descreve como o consumidor final paga, não o benefício do RA para o lojista. O RA trata do prazo em que o LOJISTA recebe as vendas."
        ],
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
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "'Quer comprar?' é um fechamento direto que oferece apenas sim ou não. No fechamento alternativo, você oferece duas opções de 'sim', eliminando o 'não' da equação.",
            "Correto! 'Vamos fechar com fidelidade ou sem?' é um exemplo clássico de fechamento alternativo: ambas as opções levam ao fechamento. O cliente escolhe entre as condições, não entre comprar ou não comprar.",
            "'Volto depois' é uma objeção do cliente, não uma técnica de fechamento do GN. O GN deve tratar essa objeção, não usá-la como estratégia.",
            "'Pense e me avise' transfere a iniciativa para o cliente e aumenta o risco de perder a venda. O fechamento alternativo mantém o controle nas mãos do consultor."
        ],
    },
];

// ============================================================
// Perguntas usadas no quiz da cena da loja de Pelúcia (lojaPelucia)
// ============================================================
export const perguntasPelucia = [
    {
        id: "pelucia_1",
        pergunta: "Assim que o cliente é credenciado ou reativado, sabemos que essa conquista contará nos seus pilares da RVM durante os próximos meses, desta forma, o que você GN deve fazer para que esse cliente não se transforme em um Churn?",
        opcoes: [
            "Deixar o cliente sem acesso aos canais digitais (Site e App Cielo Gestão), afinal ele não me pediu para ter acesso",
            "Acompanhar a instalação da máquina, certificar que o cliente está conseguindo acessar o site/app Cielo Gestão, se colocar à disposição, não realizar a entrega da meta acordada, realizar Repique Constante (Pós-Vendas)",
            "Acompanhar a instalação da máquina, certificar que o cliente está conseguindo acessar o site/app Cielo Gestão, se colocar à disposição, assegurar que o cliente entregue a meta acordada, realizar Repique Constante (Pós-Vendas)", // resposta correta
            "Visitar o cliente após 30 dias da negociação efetivada"
        ],
        pontos: [0, 0, 3, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Negar acesso aos canais digitais ao cliente reduz engajamento e aumenta o risco de churn. Um cliente que não usa o produto não percebe valor e cancela.",
            "Esta opção contém um erro crítico: 'não realizar a entrega da meta acordada'. Sem TPV cumprido, o cliente não contribui para a RVM e o relacionamento se fragiliza.",
            "Correto! O conjunto completo é: acompanhar a instalação, garantir acesso ao app/site, se colocar à disposição, assegurar que o cliente cumpra a meta de TPV acordada e fazer Repique (pós-venda ativo). Isso mantém o cliente ativo e reduz o churn.",
            "Visitar após 30 dias pode ser tarde demais. O acompanhamento deve começar na instalação e incluir contato frequente nos primeiros dias — é quando o cliente mais precisa de suporte."
        ],
    },
    {
        id: "pelucia_2",
        pergunta: "Qual o canal de atendimento exclusivo para os estabelecimentos?",
        opcoes: [
            "Central de Resolução",
            "Central de Bate-Papo",
            "Central de Ajuda",
            "Central de Relacionamento" // resposta correta
        ],
        pontos: [0, 0, 0, 3],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Central de Resolução não é o nome do canal oficial da Cielo para estabelecimentos. Conhecer o canal correto é essencial para orientar bem o cliente.",
            "Central de Bate-Papo não é o nome correto do canal de atendimento aos estabelecimentos Cielo.",
            "Central de Ajuda é um recurso de autoatendimento online (FAQ, tutoriais). O canal de atendimento direto para estabelecimentos com demandas operacionais é diferente.",
            "Correto! A Central de Relacionamento é o canal exclusivo para estabelecimentos Cielo — é lá que o EC deve entrar em contato para suporte, dúvidas sobre produtos, problemas com a maquininha ou qualquer necessidade operacional."
        ],
    },
    {
        id: "pelucia_3",
        pergunta: " Qual o percentual máximo da RVM (Remuneração Variável Mensal) que o GN pode atingir?",
        opcoes: [
            "80%",
            "100%",
            "120%",
            "200%" // resposta correta
        ],
        pontos: [0, 0, 0, 3],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "80% seria um resultado abaixo da meta. A estrutura da Cielo permite e incentiva que o GN supere 100% — o percentual máximo é muito maior.",
            "100% é a meta padrão, não o teto máximo. O modelo de remuneração variável da Cielo permite ultrapassar a meta quando o GN supera os pilares consistentemente.",
            "120% é um resultado acima da meta, mas ainda não é o percentual máximo que a RVM pode atingir na Cielo.",
            "Correto! O GN pode atingir até 200% da RVM ao superar consistentemente os pilares de Volume, Margem e qualidade da carteira. Esse desempenho de superachiever é o objetivo máximo."
        ],
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
        pontos: [3, 0, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Correto! A Vantagem no CVBA responde 'o que diferencia este produto'. Para o RA: fluxo de caixa melhorado e não precisar esperar o prazo padrão de recebimento — esses são os diferenciais competitivos concretos.",
            "'Recebimento automático' descreve o que o RA faz (Característica), não o que o diferencia (Vantagem). A Vantagem mostra o ganho comparativo que o cliente obtém.",
            "'Aplicativo integrado' é uma funcionalidade adicional, não a Vantagem central do RA.",
            "'Taxa menor' pode ser uma vantagem pontual de negociação, mas não é a Vantagem principal do RA — que é a melhora no fluxo de caixa e a eliminação da espera pelo recebimento."
        ],
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
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "'Mais lucro' é um Benefício (o impacto para o negócio), não uma Característica. A Característica descreve o QUE É o produto de forma objetiva e técnica.",
            "Correto! 'Antecipação do dinheiro' é a Característica do RA: descreve objetivamente o que o produto faz — antecipar o recebimento das vendas em crédito para D1.",
            "'Melhor negociação' é um Benefício resultante do recebimento antecipado, não a Característica em si.",
            "'Aumento de clientes' é um benefício indireto e distante do produto. A Característica é sempre a descrição técnica direta do que o produto faz."
        ],
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
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Falar rápido e direto pode transmitir ansiedade e comprometer a credibilidade. Uma abordagem de sucesso exige presença, preparo e controle do ritmo da conversa.",
            "Correto! Uma abordagem de sucesso combina: estar Afiado (bem preparado sobre o cliente e o produto), ter Entusiasmo (energia positiva que transmite confiança) e ser Especialista (dominar o produto e o mercado do cliente).",
            "Ser informal e improvisar compromete a credibilidade do GN. Uma abordagem eficaz combina preparo, entusiasmo e expertise — não informalidade sem base.",
            "Falar pouco e sair rápido não gera conexão nem entendimento das necessidades. Uma abordagem de sucesso requer engajamento genuíno com o cliente."
        ],
    },
];

// ============================================================
// Perguntas usadas no quiz da cena da Loja de Chocolate (lojaChocolate)
// ============================================================
export const perguntasChocolate = [
    {
        id: "chocolate_1",
        pergunta: "Se tratando de um cliente de conquista, sabemos que o não atingimento do volume negociado impacta diretamente nos pilares da RVM. Para identificar e trabalhar estes pilares, qual das ferramentas abaixo conseguimos acompanhar o realizado e extrair um relatório analítico?",
        opcoes: [
            "Cielo +",
            "SAP concur",
            "Arpa", // resposta correta
            "Expert"
        ],
        pontos: [0, 0, 3, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "O Cielo + é um aplicativo de gestão financeira para o estabelecimento. Não é uma ferramenta analítica para o GN acompanhar o desempenho da sua carteira.",
            "SAP Concur é uma ferramenta corporativa de gestão de despesas e viagens. Não é utilizada para acompanhar o realizado de clientes do GN na Cielo.",
            "Correto! O ARPA é a ferramenta analítica onde o GN acompanha o realizado de cada cliente, verifica o cumprimento de metas de Volume e Margem e extrai relatórios detalhados para tomar decisões estratégicas.",
            "O Expert é uma ferramenta analítica, mas para acompanhar o realizado e extrair relatório analítico detalhado por cliente com foco na RVM, o ARPA é a ferramenta correta."
        ],
    },
    {
        id: "chocolate_2",
        pergunta: "Com qual frequência o GN deve realizar o Plano de Rota e quais os ganhos?",
        opcoes: [
            "Mensalmente, pois é trabalhoso e não beneficia o dinamismo da rotina comercial",
            "Bimestralmente, pois o planejamento otimiza gestão de tempo em campo e prioriza as melhores oportunidades com foco na RVM",
            "Quinzenalmente, quando necessário para garantir a aderência nos relatórios gerenciais",
            "Diariamente, pois o planejamento otimiza gestão de tempo em campo e prioriza as melhores oportunidades com foco na RVM" // resposta correta
        ],
        pontos: [0, 0, 0, 3],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Fazer o Plano de Rota mensalmente é muito espaçado. O mercado muda diariamente — oportunidades surgem, clientes avançam no funil — e um planejamento mensal não acompanha esse ritmo.",
            "Planejamento bimestral é ainda mais distante da realidade dinâmica do campo. O GN que planeja a cada dois meses perde oportunidades e tem baixa execução.",
            "Quinzenal é melhor que mensal, mas ainda insuficiente para a rotina dinâmica do GN. O Plano de Rota diário garante que cada visita seja planejada com propósito claro.",
            "Correto! O Plano de Rota deve ser feito diariamente: otimiza o tempo em campo, prioriza clientes com maior potencial para a RVM e garante que cada visita tenha um objetivo claro. É a prática do GN de alta performance."
        ],
    },
    {
        id: "chocolate_3",
        pergunta: "Quando um estabelecimento aciona o GN para solicitar a troca da máquina, ele deve entrar em contato com a:",
        opcoes: [
            "Central de Comunicação",
            "Central Unificada",
            "Central de Apoio",
            "Central de Ajuda" // resposta correta
        ],
        pontos: [0, 0, 0, 3],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Central de Comunicação não é o nome do canal de suporte técnico da Cielo para troca de equipamentos.",
            "Central Unificada não é o canal correto. Para solicitações de troca de maquininha, o estabelecimento tem um canal específico de suporte.",
            "Central de Apoio não é o canal correto. Para demandas técnicas como troca de equipamento, o estabelecimento deve acionar a Central de Ajuda.",
            "Correto! A Central de Ajuda é o canal que o estabelecimento deve acionar para solicitações técnicas como troca de maquininha. Orientar o cliente a usar esse canal também reforça seu papel de consultor e parceiro."
        ],
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
        pontos: [0, 0, 3, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Se o cliente não compra e a empresa perde a venda, ambos perderam — isso é Perde × Perde, não Ganha × Ganha.",
            "Se o cliente compra sem vantagem, apenas a empresa ganha — isso é Perde × Ganha (do ponto de vista do cliente). Ganha × Ganha exige que AMBOS saiam beneficiados.",
            "Correto! Ganha × Ganha: o cliente melhora a gestão do negócio com a solução Cielo, e a empresa fideliza um cliente satisfeito. Ambos crescem juntos — essa é a base da venda consultiva.",
            "Se a empresa lucra e o cliente perde, é uma relação Perde × Ganha — desequilibrada e não sustentável. Ganha × Ganha só existe quando há valor real para ambas as partes."
        ],
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
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "'Rápido, barato, simples' são adjetivos genéricos que qualquer empresa usa. Palavras mágicas devem criar percepção de valor e diferenciação, não de comodidade básica.",
            "Correto! 'Exclusivo, inovador, vantagem' são palavras que despertam interesse e criam percepção de valor diferenciado. Usadas na demonstração, estimulam o cliente a querer saber mais antes de qualquer decisão.",
            "'Fácil, comum, básico' são neutros ou negativos em uma apresentação de vendas. 'Comum' e 'básico' transmitem a ideia oposta ao que você quer causar.",
            "'Simples, comum, rápido' são palavras funcionais mas sem apelo emocional ou de diferenciação. Na demonstração, o GN precisa de palavras que criem desejo e percepção de exclusividade."
        ],
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
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Cliente indeciso está no funil, apenas em uma etapa de objeção ou negociação. Cliente congelado saiu completamente do processo — está indisponível para o momento.",
            "Correto! Cliente congelado é aquele que saiu do funil: fechou a loja, mudou de ramo, está em processo judicial ou não quer ser abordado. Não é o momento de insistir — registre e revisite no futuro.",
            "Cliente novo ainda não entrou no funil de vendas. Cliente congelado é aquele que JÁ esteve no funil e foi removido por estar temporária ou permanentemente indisponível.",
            "Cliente fiel é ativo e satisfeito. Cliente congelado é o oposto: está fora do funil por indisponibilidade — é necessário aguardar o momento certo para reabordá-lo."
        ],
    },
];

// ============================================================
// Perguntas usadas no quiz do NPC na rua (gameScene)
// ============================================================
export const perguntasNpcRua = [
    {
        id: "npcRua_1",
        pergunta: "João comenta: 'Tenho receio das taxas da maquininha...' Como você conduz a conversa?",
        opcoes: [
            "Concordar que as taxas são complicadas e encerrar o assunto",
            "Explicar que existem planos da Cielo pensados para pequenos negócios, com taxas competitivas",  // resposta correta
            "Sugerir que ele continue vendendo só em dinheiro",
            "Dizer que taxa é igual em todas"
        ],
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Concordar e encerrar o assunto não ajuda o cliente e desperdiça a oportunidade. Toda objeção é um pedido de mais informação — use isso a seu favor.",
            "Correto! Existem planos da Cielo pensados para diferentes perfis de negócio, com taxas competitivas. Explicar isso mostra que você conhece o produto e se preocupa com a realidade financeira do cliente.",
            "Sugerir que continue só com dinheiro é o oposto de uma venda consultiva. O GN deve mostrar o valor de aceitar mais meios de pagamento, não validar a limitação.",
            "Dizer que a taxa é igual em todas as empresas é incorreto e pode ser facilmente verificado pelo cliente. Argumentos imprecisos destroem a credibilidade na hora."
        ],
    },
    {
        id: "npcRua_2",
        pergunta: "João pergunta: 'Em quanto tempo recebo pelas vendas no cartão?'",
        opcoes: [
            "Dizer que normalmente demora bastante",
            "Informar que depende da operadora e não explicar mais nada",
            "Explicar as opções de recebimento e antecipação disponíveis",
            "Informar que com a Cielo ele pode receber em até 1 dia útil"  // resposta correta
        ],
        pontos: [0, 0, 0, 3],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Dizer que 'demora bastante' sem contexto gera desconfiança e não orienta o cliente. O papel do GN é informar com precisão e mostrar as vantagens da Cielo.",
            "Responder que 'depende da operadora' sem completar a explicação parece evasivo. O cliente quer uma resposta concreta — e você tem essa resposta.",
            "Explicar as opções é bom, mas sem mencionar o prazo específico da Cielo, você perde a oportunidade de criar interesse e urgência.",
            "Correto! Com a Cielo, o lojista pode receber em até 1 dia útil com o RA. Essa informação concreta responde diretamente à pergunta e cria valor imediato para o cliente."
        ],
    },
    {
        id: "movel_24",
        pergunta: "João diz: 'Perco vendas porque só aceito dinheiro'. Como você responde?",
        opcoes: [
            "Dizer que isso é normal no comércio",
            "Explicar que aceitar cartão pode aumentar as vendas e atrair mais clientes",  // resposta correta
            "Sugerir que ele peça PIX apenas",
            "Recomendar manter como está"
        ],
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Dizer que perder vendas 'é normal no comércio' valida a limitação sem oferecer solução. O GN consultivo apresenta caminhos para superar obstáculos.",
            "Correto! Aceitar cartão amplia o público: clientes que não carregam dinheiro podem comprar, o ticket médio aumenta e o negócio cresce. É um argumento direto e baseado em realidade.",
            "PIX é ótimo, mas não substitui todos os meios de pagamento. Limitar a sugestão ao PIX ignora o crédito parcelado, que pode ser decisivo para compras de valor mais alto.",
            "Recomendar manter como está é o oposto de uma venda consultiva. O GN que não agrega valor não tem motivo para fazer a visita."
        ],
    },
];

export const perguntasNpc = [
    {
        id: "movel_25",
        pergunta: "João comenta: 'Tenho receio das taxas da maquininha...' Como você conduz a conversa?",
        opcoes: [
            "Concordar que as taxas são complicadas e encerrar o assunto",
            "Explicar que existem planos da Cielo pensados para pequenos negócios, com taxas competitivas",  // resposta correta
            "Sugerir que ele continue vendendo só em dinheiro",
            "Dizer que taxa é igual em todas"
        ],
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Concordar e encerrar o assunto não ajuda o cliente e desperdiça a oportunidade. Toda objeção é um pedido de mais informação — use isso a seu favor.",
            "Correto! Existem planos da Cielo pensados para diferentes perfis de negócio, com taxas competitivas. Explicar isso mostra que você conhece o produto e se preocupa com a realidade financeira do cliente.",
            "Sugerir que continue só com dinheiro é o oposto de uma venda consultiva. O GN deve mostrar o valor de aceitar mais meios de pagamento, não validar a limitação.",
            "Dizer que a taxa é igual em todas as empresas é incorreto e pode ser facilmente verificado pelo cliente. Argumentos imprecisos destroem a credibilidade na hora."
        ],
    },
    {
        id: "movel_26",
        pergunta: "João pergunta: 'Em quanto tempo recebo pelas vendas no cartão?'",
        opcoes: [
            "Dizer que normalmente demora bastante",
            "Informar que depende da operadora e não explicar mais nada",
            "Explicar as opções de recebimento e antecipação disponíveis",
            "Informar que com a Cielo ele pode receber em até 1 dia útil"  // resposta correta
        ],
        pontos: [0, 0, 0, 3],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Dizer que 'demora bastante' sem contexto gera desconfiança e não orienta o cliente. O papel do GN é informar com precisão e mostrar as vantagens da Cielo.",
            "Responder que 'depende da operadora' sem completar a explicação parece evasivo. O cliente quer uma resposta concreta — e você tem essa resposta.",
            "Explicar as opções é bom, mas sem mencionar o prazo específico da Cielo, você perde a oportunidade de criar interesse e urgência.",
            "Correto! Com a Cielo, o lojista pode receber em até 1 dia útil com o RA. Essa informação concreta responde diretamente à pergunta e cria valor imediato para o cliente."
        ],
    },
    {
        id: "movel_27",
        pergunta: "João diz: 'Perco vendas porque só aceito dinheiro'. Como você responde?",
        opcoes: [
            "Dizer que isso é normal no comércio",
            "Explicar que aceitar cartão pode aumentar as vendas e atrair mais clientes",  // resposta correta
            "Sugerir que ele peça PIX apenas",
            "Recomendar manter como está"
        ],
        pontos: [0, 3, 0, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Dizer que perder vendas 'é normal no comércio' valida a limitação sem oferecer solução. O GN consultivo apresenta caminhos para superar obstáculos.",
            "Correto! Aceitar cartão amplia o público: clientes que não carregam dinheiro podem comprar, o ticket médio aumenta e o negócio cresce. É um argumento direto e baseado em realidade.",
            "PIX é ótimo, mas não substitui todos os meios de pagamento. Limitar a sugestão ao PIX ignora o crédito parcelado, que pode ser decisivo para compras de valor mais alto.",
            "Recomendar manter como está é o oposto de uma venda consultiva. O GN que não agrega valor não tem motivo para fazer a visita."
        ],
    },
    {
        id: "movel_28",
        pergunta: "Se tratando de um cliente de conquista, sabemos que o não atingimento do volume negociado impacta diretamente nos pilares da RVM. Para identificar e trabalhar estes pilares, qual das ferramentas abaixo conseguimos acompanhar o realizado e extrair um relatório analítico?",
        opcoes: [
            "Cielo +",
            "SAP concur",
            "Arpa", // resposta correta
            "Expert"
        ],
        pontos: [0, 0, 3, 0],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "O Cielo + é um aplicativo de gestão financeira para o estabelecimento. Não é uma ferramenta analítica para o GN acompanhar o desempenho da sua carteira.",
            "SAP Concur é uma ferramenta corporativa de gestão de despesas e viagens. Não é utilizada para acompanhar o realizado de clientes do GN na Cielo.",
            "Correto! O ARPA é a ferramenta analítica onde o GN acompanha o realizado de cada cliente, verifica metas de Volume e Margem e extrai relatórios detalhados para decisões estratégicas.",
            "O Expert é uma ferramenta analítica, mas para acompanhar o realizado e extrair relatório analítico detalhado por cliente com foco na RVM, o ARPA é a ferramenta correta."
        ],
    },
    {
        id: "movel_29",
        pergunta: "Com qual frequência o GN deve realizar o Plano de Rota e quais os ganhos?",
        opcoes: [
            "Mensalmente, pois é trabalhoso e não beneficia o dinamismo da rotina comercial",
            "Bimestralmente, pois o planejamento otimiza gestão de tempo em campo e prioriza as melhores oportunidades com foco na RVM",
            "Quinzenalmente, quando necessário para garantir a aderência nos relatórios gerenciais",
            "Diariamente, pois o planejamento otimiza gestão de tempo em campo e prioriza as melhores oportunidades com foco na RVM" // resposta correta
        ],
        pontos: [0, 0, 0, 3],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Fazer o Plano de Rota mensalmente é muito espaçado. O mercado muda diariamente e um planejamento mensal não acompanha o ritmo das oportunidades em campo.",
            "Planejamento bimestral é ainda mais distante da realidade dinâmica. O GN que planeja a cada dois meses perde oportunidades e tem baixa execução.",
            "Quinzenal é melhor que mensal, mas ainda insuficiente para a rotina do GN. O Plano de Rota diário garante que cada visita tenha um objetivo claro.",
            "Correto! O Plano de Rota deve ser feito diariamente: otimiza o tempo em campo, prioriza clientes com maior potencial para a RVM e garante que cada visita tenha propósito definido."
        ],
    },
    {
        id: "movel_30",
        pergunta: "Quando um estabelecimento aciona o GN para solicitar a troca da máquina, ele deve entrar em contato com a:",
        opcoes: [
            "Central de Comunicação",
            "Central Unificada",
            "Central de Apoio",
            "Central de Ajuda" // resposta correta
        ],
        pontos: [0, 0, 0, 3],
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Central de Comunicação não é o nome do canal de suporte técnico da Cielo para troca de equipamentos.",
            "Central Unificada não é o canal correto. Para solicitações de troca de maquininha, o estabelecimento tem um canal específico.",
            "Central de Apoio não é o canal correto. Para demandas técnicas como troca de equipamento, o estabelecimento deve acionar a Central de Ajuda.",
            "Correto! A Central de Ajuda é o canal correto para solicitações técnicas como troca de maquininha. Orientar o cliente a usar esse canal também reforça seu papel de consultor."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "O PIX é instantâneo para quem recebe por PIX, mas não resolve o problema de crédito parcelado — vendas parceladas têm prazo padrão de recebimento. Para antecipar parcelas futuras, é preciso o ARV.",
            "Correto! O ARV antecipa os recebíveis futuros de crédito parcelado: o lojista acessa os valores das parcelas antes do prazo normal, colocando o dinheiro em conta imediatamente.",
            "O Link de Pagamento é um canal para receber à distância. Não resolve o problema de prazo de recebimento de vendas já realizadas no crédito parcelado.",
            "O Cielo + é um aplicativo de gestão e serviços financeiros, não um produto de antecipação de recebíveis."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Oferecer todas as soluções sem entender o perfil é um erro clássico. Você pode apresentar produtos irrelevantes para o negócio e perder a credibilidade de consultor.",
            "Correto! Com vendas majoritariamente em débito e dinheiro, você precisa entender o perfil antes de propor. Sondagem antes de demonstração — essa é a sequência correta do funil consultivo.",
            "Falar de taxas antes de criar conexão e entender a necessidade quase sempre gera objeção imediata. Taxa é assunto de negociação, não de abertura de visita.",
            "Encerrar a visita só porque o cliente tem maquininha desperdiça oportunidade. Você pode oferecer ARV, RA, TC ou Link de Pagamento — há sempre oportunidade para agregar valor."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "A maquininha física exige que o comprador esteja presencialmente. Para vendas online em todo o Brasil, ela não atende a necessidade.",
            "O Cielo + é um aplicativo de gestão financeira, não uma solução de cobrança para vendas online à distância.",
            "Correto! O Link de Pagamento permite cobrar clientes em qualquer lugar: o lojista gera um link, o comprador paga pelo celular ou computador, e o dinheiro entra na conta. Ideal para e-commerce e vendas online.",
            "O Crediário Cielo é uma modalidade de parcelamento para o cliente final da loja presencial, não uma solução de pagamento online."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "O Fechamento é a última etapa do funil. Antes de fechar, é necessário entender a necessidade, demonstrar a solução e negociar — não é onde você descobre o que o cliente precisa.",
            "O Pós-venda acontece após a venda ser concluída. A identificação da necessidade acontece durante a visita, bem antes do fechamento.",
            "A Demonstração apresenta a solução ao cliente. Mas para demonstrar o produto certo, você precisa antes entender a necessidade — que é o papel da Sondagem.",
            "Correto! A Sondagem é a etapa de perguntas abertas para entender a realidade do cliente antes de apresentar qualquer produto. Sondar bem garante que você demonstre a solução certa para a necessidade real."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Cliente, Valor e Ação ficam próximos semanticamente, mas não são os termos corretos. CVBA tem componentes bem definidos para estruturar a argumentação do produto.",
            "Custo, Volume, Base e Atendimento são termos de gestão financeira e operacional, não os componentes do CVBA.",
            "Correto! CVBA: Característica (o que é o produto), Vantagem (o que o diferencia), Benefício (o que o cliente ganha) e Atração (frase que convida ao próximo passo). É a espinha dorsal da demonstração consultiva.",
            "Conversão, Venda, Bloqueio e Atração não correspondem à sigla. O A de CVBA é Atração — a frase final que convida o cliente a avançar."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Reduzir as taxas imediatamente sem consultar o gestor viola a política comercial e pode comprometer a margem. Nunca conceda desconto sem autorização.",
            "Ignorar a objeção é o pior caminho: ela volta mais forte no fechamento e destrói a credibilidade. Objeção é sinal de interesse — deve ser tratada, não ignorada.",
            "Correto! Contornar a objeção significa acolhê-la, entender o que está por trás dela e apresentar os benefícios e diferenciais que justificam o investimento. Objeção de taxa é oportunidade para demonstrar valor.",
            "Encerrar a conversa diante de uma objeção significa desistir da venda. Um GN consultivo trata objeções como parte natural do processo — é na negociação que você ganha a confiança do cliente."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "O PIX é instantâneo para recebimentos via PIX, mas não resolve o prazo das vendas no crédito. Para antecipar recebíveis de crédito, o produto correto é o ARV.",
            "Correto! O ARV antecipa os recebíveis futuros de crédito: se a proprietária recebe muito em crédito, o ARV permite acessar esses valores antes do prazo normal, melhorando o fluxo de caixa.",
            "O Cielo + é um aplicativo de gestão financeira, não um produto de antecipação de recebíveis.",
            "O Link de Pagamento é para cobranças à distância. Não resolve o problema de prazo de recebimento das vendas já realizadas no crédito."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "A maquininha exige presença física do cliente. Para receber sinal ou pagamento antecipado de agendamento remotamente, não é a solução adequada.",
            "Correto! O Link de Pagamento permite enviar uma cobrança pelo WhatsApp ou e-mail para o cliente confirmar o agendamento com pagamento antecipado — tudo sem precisar de maquininha física.",
            "A Cielo LIO é uma maquininha com sistema integrado. Para cobranças remotas de agendamentos, o Link de Pagamento é o produto mais adequado.",
            "O ARV antecipa recebíveis já gerados. Para cobrar agendamentos futuros remotamente, o Link de Pagamento é o produto certo."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "A Pré-venda é o planejamento antes da visita. O pico de faturamento nos finais de semana é uma informação que você coleta durante a visita, na Sondagem.",
            "A Abordagem é o primeiro contato, onde você cria conexão. O levantamento detalhado sobre o negócio acontece na etapa seguinte: a Sondagem.",
            "Correto! A Sondagem é a etapa de perguntas abertas. 'Qual é o dia de maior movimento?' é uma pergunta de sondagem — revela padrões do negócio que permitem recomendar o produto mais adequado.",
            "O Fechamento ocorre após entender a necessidade e demonstrar a solução. O pico de faturamento é descoberto na Sondagem, muito antes do fechamento."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "O Vendeu, Tá na Conta não é para parcelar compras — ele é um produto de prazo de recebimento das vendas do lojista.",
            "Correto! O TC garante que o valor das vendas cai na conta de hora em hora. Para um salão com alta rotatividade, isso melhora o fluxo de caixa e permite pagar fornecedores e despesas no mesmo dia.",
            "O TC não mexe nas taxas de débito — ele é um produto de prazo de recebimento. O foco é na velocidade de liquidação, não na taxa.",
            "O TC não protege contra chargebacks — essa é uma função de segurança transacional diferente. O TC foca exclusivamente na velocidade de recebimento."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Ignorar a não utilização compromete o TPV da carteira e coloca o cliente em risco de churn. Produto não usado = cliente que não percebe valor = cancelamento.",
            "Ligar para o suporte sem antes entender o motivo pode ser desnecessário. Pode ser dificuldade simples de resolver com uma orientação rápida sua.",
            "Correto! Entender por que o produto não está sendo usado é o primeiro passo. Pode ser dificuldade técnica, desconhecimento ou resistência cultural — cada situação tem uma abordagem. O GN que apoia na adoção fideliza o cliente.",
            "Trocar de produto sem entender o problema real pode repetir o mesmo ciclo com outro produto. O pós-venda eficaz resolve primeiro, propõe depois."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "'Quer comprar agora?' é fechamento direto, não Atração. A frase de Atração no CVBA deve mostrar o benefício antes de qualquer proposta.",
            "'Nossa taxa é a mais barata' é argumento de preço genérico e facilmente contestado. A Atração deve conectar o produto à necessidade específica do cliente.",
            "'Posso instalar hoje mesmo?' é fechamento alternativo — você ainda não criou interesse. Usar fechamento antes da Atração gera resistência.",
            "Correto! Essa frase usa todos os componentes de atração: conecta o benefício (cai na hora, sem taxa de recebimento) à necessidade (caixa melhor) e termina com convite à ação. É uma frase de Atração completa e eficaz."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "O Cielo + é um aplicativo de gestão financeira, não um produto de antecipação de recebíveis de crédito parcelado.",
            "O PIX é instantâneo para recebimentos via PIX, mas não antecipa parcelas de vendas no crédito. Para antecipar agenda de crédito parcelado, é preciso o ARV.",
            "O Link de Pagamento é para cobranças à distância. Não é um produto de antecipação de recebíveis de crédito parcelado.",
            "Correto! O ARV antecipa a agenda de recebíveis futuros. Em épocas de alto volume no crédito parcelado, como viradas de estação, ele permite acessar esses valores antes do prazo e reinvestir no próximo estoque."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Correto! Parcelamento em até 18x permite ao cliente comprar uma peça de maior valor com prestações acessíveis. Isso aumenta o ticket médio, amplia o público e é o argumento mais direto para justificar a maquininha Cielo.",
            "O PIX não tem parcelamento — é pagamento integral e instantâneo. Para clientes que preferem parcelar, o crédito é a modalidade indispensável.",
            "O débito não tem parcelamento, portanto não é 'sempre mais vantajoso' para uma loja onde os clientes querem parcelar compras de maior valor.",
            "A Cielo cobra taxa no crédito parcelado como qualquer adquirente. Usar informações incorretas sobre o produto compromete a credibilidade do GN na hora da venda."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "O Fechamento é a etapa final do funil, onde você formaliza o negócio. Planejar e levantar informações nessa etapa seria tarde demais.",
            "Correto! A Pré-venda é a etapa anterior à visita: você planeja a rota, levanta dados do cliente (faturamento, histórico, perfil) e define o objetivo da visita. Chegar preparado é a diferença entre uma visita produtiva e uma visita perdida.",
            "A Sondagem acontece durante a visita, quando você faz perguntas ao cliente. Planejamento e levantamento são feitos antes — na Pré-venda.",
            "O Pós-venda acontece depois da venda concluída. Planejamento e levantamento são etapas anteriores à visita, parte da Pré-venda."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "O PIX Cielo não cobra taxa para receber. Começar com 'tem taxa' cria uma objeção desnecessária e é uma informação incorreta.",
            "A transferência bancária tradicional é mais trabalhosa de conciliar e não tem integração com sistemas de gestão. O PIX Cielo oferece vantagens adicionais de visibilidade financeira.",
            "O PIX Cielo não é idêntico a qualquer outro PIX — ele integra os recebimentos no painel Cielo, junto com as vendas em cartão. Essa diferenciação é exatamente o argumento correto.",
            "Correto! O diferencial é a integração: todos os recebimentos via PIX aparecem no painel Cielo Gestão junto com as demais vendas — facilitando a conciliação, o controle de caixa e a visibilidade financeira do negócio."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Característica descreve o QUE É o produto de forma técnica (ex: 'recebe em D1'). A frase apresentada fala do impacto concreto para o negócio — isso é Benefício.",
            "Vantagem responde 'o que diferencia este produto em relação a outros'. A frase vai além: mostra o impacto concreto para o negócio do cliente — isso é Benefício.",
            "Correto! O Benefício no CVBA é o impacto real para o negócio. 'Receber mais rápido ajuda a repor o estoque antes do próximo final de semana' conecta diretamente o produto à necessidade do cliente — é o coração da argumentação.",
            "A Atração é a frase final que convida ao próximo passo ('Quer ativar agora?'). A frase apresentada mostra o benefício — o que o cliente ganha — não um convite à ação."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Correto! As três formas de inserir clientes no funil são Lead (oportunidade de campanha), PAP — Porta a Porta (visita ativa) e Indicação (referência de cliente satisfeito). Conhecer essas entradas é essencial para o GN planejar sua prospecção.",
            "Marketing e vendas são áreas organizacionais, não formas de inserção no funil de prospecção do GN. As entradas são Lead, PAP e Indicação.",
            "Loja e suporte são canais de atendimento reativo. A prospecção ativa do GN usa Lead, PAP e Indicação.",
            "Marketing, CRM e suporte são ferramentas e áreas de apoio. As três formas de inserir clientes no funil são Lead, PAP e Indicação."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "O ARV antecipa recebíveis de crédito parcelado. Para uma frutaria onde 90% das vendas são em dinheiro, não há volume de crédito suficiente para justificar o ARV como primeiro produto.",
            "O Link de Pagamento é para cobranças à distância. Para uma frutaria presencial querendo aceitar meios digitais, não é o produto mais adequado para começar.",
            "Correto! A maquininha com PIX e débito é o ponto de entrada ideal: o PIX é gratuito para receber, o débito captura clientes que não carregam dinheiro, e ambos são fáceis de usar. É a forma mais natural de iniciar a migração para pagamentos digitais.",
            "A Cielo LIO é uma maquininha com sistema integrado mais completo. Para uma frutaria iniciando a migração para meios digitais, uma maquininha básica com PIX e débito é o ponto de partida mais adequado."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Correto! Aceitar cartão aumenta o ticket médio (o cliente compra mais quando não está limitado pelo dinheiro em mãos) e atrai clientes que não carregam dinheiro — dois argumentos diretos e concretos para um negócio de alto volume.",
            "O cartão não substitui completamente o dinheiro — os dois coexistem. O argumento certo foca na ADIÇÃO de clientes e receita, não na substituição de um meio pelo outro.",
            "A taxa do débito não é zero na Cielo — há um MDR. Usar argumentos incorretos destrói a credibilidade quando o cliente descobre a informação real.",
            "O cartão serve para clientes de todos os perfis, especialmente em negócios de alto volume como frutaria. Limitar ao 'cliente de alto valor' perde o ponto central: atrair mais clientes e aumentar o ticket médio."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Concordar e não insistir significa desistir da venda diante da objeção. Objeção é sinal de interesse — o cliente está engajado o suficiente para dar uma razão, não para sair sem falar nada.",
            "Correto! A demonstração presencial é o antídoto para a objeção de 'é difícil de usar'. Quando o cliente vê e testa com as próprias mãos, a resistência cai. Apresentar o suporte disponível também reduz o medo de ficar sozinho com um problema.",
            "Falar mal da concorrência é antiético e aumenta a desconfiança. O cliente pensa: 'se ele fala assim dos outros, o que fala de mim quando eu sair daqui?'",
            "Oferecer desconto sem consultar o gestor viola a política comercial. Trate a objeção com demonstração e argumento de valor — não com concessão imediata."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "A Abordagem é o momento de criar conexão durante a visita. O planejamento e levantamento acontecem antes, para o GN chegar preparado ao cliente.",
            "Correto! A Pré-venda inclui planejamento da rota e levantamento de dados sobre o cliente. Para uma frutaria, isso significa pesquisar o perfil do negócio e o histórico com meios de pagamento antes de visitar.",
            "O Fechamento é a etapa final do funil. Planejar nessa etapa seria tarde demais — o planejamento precede a visita.",
            "O Pós-venda acontece após a venda concluída. Planejamento e levantamento são etapas de preparação anteriores à visita."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "O ARV é um produto financeiro de antecipação de recebíveis. Não é um aplicativo de gestão para acompanhar vendas e recebimentos pelo celular.",
            "O Link de Pagamento é para cobranças à distância. Não é uma ferramenta de gestão e acompanhamento de vendas.",
            "Correto! O Cielo + é o aplicativo de gestão financeira: permite ao lojista acompanhar as vendas, os recebimentos e o fluxo de caixa pelo celular, de qualquer lugar e a qualquer hora.",
            "O Crediário Cielo é uma modalidade de parcelamento para o cliente final. Não é uma ferramenta de gestão de vendas para o lojista."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "'Quer comprar nossa maquininha hoje?' é fechamento direto, sem criar interesse primeiro. A Atração deve despertar o interesse antes de qualquer proposta.",
            "Correto! Essa frase conecta o benefício ('caixa cresce') à ação ('posso ativar agora?'). É uma frase de Atração completa: mostra o que o cliente ganha e convida ao próximo passo de forma natural.",
            "'Temos promoção somente essa semana' usa urgência artificial sem apresentar o benefício real. Isso pode soar como pressão de venda e gerar desconfiança.",
            "Dizer que o cliente 'não precisa' da solução vai no sentido oposto da venda. A Atração deve mostrar valor, não desqualificar a proposta."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "O PIX é instantâneo para recebimentos via PIX, mas não resolve o problema das vendas no crédito parcelado. Parcelas têm prazo padrão de liquidação — para antecipar esses valores, é preciso o ARV.",
            "O Cielo + é um aplicativo de gestão financeira. Não é um produto de antecipação de recebíveis.",
            "Correto! O ARV antecipa a agenda de recebíveis futuros de crédito parcelado. Para uma joalheria com alto volume no crédito parcelado, o ARV é a solução exata: o lojista acessa os valores que receberia no futuro, agora.",
            "O Link de Pagamento é para cobranças à distância. Não resolve o problema de prazo dos recebíveis de crédito já gerados."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Correto! Parcelamento em até 18x permite ao cliente da joalheria comprar uma joia de alto valor com parcelas acessíveis. Isso aumenta o ticket médio, amplia o público e é o argumento mais direto para justificar a maquininha Cielo.",
            "O PIX não permite parcelamento — é pagamento integral e instantâneo. Para compras de alto valor em joalheria, o crédito parcelado é a modalidade mais relevante.",
            "Parcelar em mais vezes aumenta o faturamento ao tornar produtos de alto valor acessíveis a mais clientes. Essa afirmação está incorreta.",
            "A Cielo oferece parcelamento acima de 6x — até 18x dependendo do plano contratado. Usar informações erradas sobre o produto compromete a credibilidade do GN."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "A maquininha básica é o produto principal, mas a questão pede um produto COMPLEMENTAR ao ARV. Com 70% no crédito parcelado, há oportunidade para mais.",
            "Correto! Com 70% no crédito parcelado, além do ARV (que antecipa a agenda), o Vendeu, Tá na Conta complementa: garante que as vendas à vista e no débito também caiam na conta de hora em hora — maximizando a liquidez.",
            "Apenas o PIX não aproveita o potencial do cliente. Com alto volume de crédito parcelado, o GN deve oferecer produtos que maximizem a liquidez desse recebível.",
            "Sempre há oportunidade de oferecer soluções adicionais — especialmente para um cliente com 70% no crédito parcelado. Identificar e oferecer produtos complementares é parte do trabalho consultivo."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "A Sondagem é onde você identifica a necessidade. A Demonstração vem depois — é quando você apresenta formalmente a solução adequada com base no que descobriu.",
            "A Pré-venda é o planejamento anterior à visita. A apresentação formal da solução acontece durante a visita, na etapa de Demonstração.",
            "Correto! A Demonstração é a etapa em que, após entender a necessidade (Sondagem), você apresenta o produto de forma estruturada usando o CVBA — conectando características, vantagens e benefícios à realidade do cliente.",
            "O Pós-venda acontece depois da venda concluída. A apresentação da solução é feita antes do fechamento, na Demonstração."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Confirmar que 'há riscos' — mesmo que mínimos — gera insegurança. A postura correta é apresentar as salvaguardas reais da Cielo com confiança e dados concretos.",
            "Correto! A Cielo possui certificação PCI DSS (norma internacional de segurança para pagamentos), criptografia nas transações e sistema antifraude robusto. Apresentar essas garantias com confiança responde à objeção e reforça a credibilidade.",
            "Mudar de assunto transmite que você não tem resposta — o cliente interpreta como confirmação da insegurança. Objeções devem ser tratadas com transparência, não evitadas.",
            "Nem todos os meios de pagamento têm o mesmo nível de segurança. Afirmar isso é impreciso e pode ser facilmente contestado pelo cliente."
        ],
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
        feedbackAcerto: "Parabéns! Você respondeu corretamente",
        feedbackErro: "Essa não é a melhor abordagem, isso pode atrapalhar seu processo de venda",
        feedbackOpcoes: [
            "Redução de impostos não é um benefício do ARV — ele não impacta a carga tributária. E isenção de taxas é incorreto: o ARV cobra uma taxa de antecipação sobre o valor antecipado.",
            "Aumento de estoque e expansão são objetivos empresariais que podem resultar do ARV a longo prazo, mas não são os argumentos diretos e imediatos para convencer o cliente.",
            "Correto! Para uma joalheria com alto volume no crédito parcelado, giro de caixa (ter o dinheiro rápido para operar) e oportunidade de reinvestimento imediato (comprar novas joias, pagar fornecedores) são os argumentos mais concretos e convincentes.",
            "Fidelização de clientes e redução de chargebacks são benefícios de outros contextos e produtos. Para o ARV, os argumentos mais persuasivos focam em liquidez: giro de caixa e reinvestimento imediato."
        ],
    },
];

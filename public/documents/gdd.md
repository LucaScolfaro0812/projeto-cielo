<img src="../assets/logointeli.png">

# GDD - Game Design Document - Módulo 1 - Inteli

**_Os trechos em itálico servem apenas como guia para o preenchimento da seção. Por esse motivo, não devem fazer parte da documentação final_**

## Nome dos integrantes Grupo

Gabriel Gomes Pimentel <br>
Tiago Brun de Arruda <br>
Beatriz Sofia Freitas Sena <br>
Fernanda Jawetz Steiner <br>
Vinícius da Silva Alves <br>
Luca do Val Scolfaro <br>
Cassio Reis Costa <br>
Leonardo Galdino Carioca Braz <br>

## Link Do Jogo
https://git.inteli.edu.br/graduacao/2026-1a/t28/g05/pages#overview

## Sumário

[1. Introdução](#c1)

[2. Visão Geral do Jogo](#c2)

[3. Game Design](#c3)

[4. Desenvolvimento do jogo](#c4)

[5. Casos de Teste](#c5)

[6. Conclusões e trabalhos futuros](#c6)

[7. Referências](#c7)

[Anexos](#c8)

<br>

# <a name="c1"></a>1. Introdução (sprints 1 a 4)

## 1.1. Plano Estratégico do Projeto

### 1.1.1. Contexto da indústria (sprint 2)

A Cielo processou aproximadamente 7,9 bilhões de transações em 2023, movimentando cerca de R$ 816 bilhões e atendendo mais de 870 mil estabelecimentos no Brasil, atuando como adquirente tradicional por meio de taxas por transação e terminais POS (Cielo, 2023). No competitivo mercado brasileiro, empresas como Rede, Getnet, Stone e PagSeguro disputam participação, impulsionadas pela digitalização dos pagamentos. Enquanto modelos tradicionais oferecem escala e confiabilidade, fintechs destacam-se por custos reduzidos e serviços digitais voltados a micro e pequenos negócios. A adoção massiva do Pix pressiona margens e exige inovação contínua dos adquirentes (Reuters, 2026; Banco Central do Brasil, 2024).

#### 1.1.1.1. Modelo de 5 Forças de Porter (sprint 2)

##### 1.1.1.1.1 Análise da Ameaça de Novos Entrantes
A Primeira Força de Porter é a ameaça de novos entrantes, onde se avalia quais as dificuldades para uma nova empresa, startup e etc. entrar no mercado, além de avaliar o que a entrada de novos concorrentes poderia acarretar no mercado como um todo

##### 1.1.1.1.1.2 Análise da Ameaça de Produtos ou Serviços Substitutos
A ameaça de produtos ou serviços substitutos no setor financeiro em que a Cielo atua é considerada de intensidade média a alta. Destaca-se a atuação de bancos digitais, que oferecem contas PJ e soluções de pagamento integradas em uma única plataforma, reduzindo a necessidade de adquirentes tradicionais. Além disso, marketplaces com sistemas de pagamento embutidos e carteiras digitais com ecossistemas próprios ampliam as alternativas disponíveis aos lojistas. Ademais, fintechs de pagamento disponibilizam soluções mais simples e modelos de atendimento diferenciados, intensificando a pressão competitiva sobre empresas consolidadas do setor.

##### 1.1.1.1.2 Identificação e análise dos principais obstáculos para novos entrantes.
<p>Uma das principais dificuldades para novas empresas no ramo é a questão do capital, considerando que para explorar o mercado é necessário o alto investimento em tecnologia, como servidores, segurança e sistemas antifraude. Além disso temos também tem a questão regulatória, ja que empresas desse tipo precisam de aprovação do Banco Central, sendo assim necessário a aprovação e cumprimento com diversos regulamentos. Contudo, uma das maiores dificuldades é entrar em um mercado consolidado, já que ja existem gigantes nesse ramo, como a própria Cielo, então entrar no mercado neste momento pode ser um grande desafio para se estabelecer, ganhar uma boa reputação e conquistar a confiança de clientes e instituições financeiras. Por fim, temos a questão da escala, quanto menos clientes maior são os custos iniciais, pois não há o mesmo capital de giro das gigantes do mercado e muito menos sua eficiência</p>


##### 1.1.1.1.2.1 Avaliação do impacto potencial dos novos entrantes na indústria.

<p>Com a entrada de concorrentes as grandes empresas do ramo de pagamento com maquininha podem perder dominância no mercado. Com isso empresas como a Cielo podem se sentir pressionadas para diminuir suas taxas e adaptar-se a novas tecnologias e inovações, causando maior variedade e disputa por market share.</p>

##### 1.1.1.1.1.3 Análise do Poder de Barganha dos Fornecedores 
A Cielo depende de quatro grupos principais de fornecedores. As bandeiras de cartões, como Visa, Mastercard, Elo e American Express, possuem alto poder de barganha, pois controlam padrões de segurança, regras operacionais e tarifas, sendo indispensáveis para o funcionamento da adquirente.
Os bancos emissores, como Bradesco e Banco do Brasil, têm poder moderado, já que participam da liquidação das transações e influenciam prazos de repasse e custos financeiros.
Os fornecedores de tecnologia também apresentam poder moderado a alto, pois oferecem sistemas essenciais, como gateways de pagamento, antifraude e integração bancária, cuja substituição é complexa e custosa.
Já os fornecedores de hardware e telecomunicações possuem poder moderado, devido à existência de alternativas no mercado, embora ainda haja dependência por questões de compatibilidade tecnológica e segurança.
O poder desses fornecedores impacta diretamente os custos operacionais, as margens de lucro e a capacidade de inovação da empresa. Além disso, a alta especialização tecnológica e os padrões exigidos criam barreiras à entrada para novos concorrentes.
Conclui-se que o poder de barganha dos fornecedores da Cielo varia entre alto e moderado, sendo essencial uma gestão estratégica de parcerias e negociações para reduzir riscos e manter a competitividade no setor.

##### 1.1.1.1.4  Identificação dos principais tipos de clientes da indústria

<p>A Cielo atende diferentes perfis de clientes no setor de meios de pagamento. Entre eles estão os pequenos e médios varejistas, que buscam soluções práticas e de baixo custo para transações diárias, como maquininhas e pagamentos digitais. Grandes varejistas e redes demandam serviços mais robustos, com alta capacidade de processamento e integração com sistemas de gestão. O comércio eletrônico também representa um segmento relevante, pois depende de gateways seguros para viabilizar pagamentos online. Além disso, prestadores de serviços e profissionais autônomos utilizam ferramentas móveis que oferecem maior flexibilidade no recebimento de valores. Por fim, setores específicos, como bares e restaurantes, necessitam de soluções integradas que atendam às particularidades de suas operações.


##### 1.1.1.1.4.1 Avaliação do poder de barganha dos clientes e seu impacto na indústria 

<p>O poder de barganha dos clientes na indústria de adquirência é considerado elevado devido ao aumento da concorrência e à maior oferta de soluções de pagamento. A facilidade de troca entre provedores permite que os clientes negociem taxas mais baixas e melhores condições contratuais. Além disso, a popularização do Pix reduziu a dependência dos cartões, intensificando a pressão sobre empresas tradicionais do setor. Como consequência, organizações como a Cielo enfrentam maior competição e perda relativa de participação de mercado, sendo levadas a investir em tecnologia, inovação e serviços de maior valor agregado para atrair e reter clientes.


##### 1.1.1.1.5 Análise da Rivalidade entre os Concorrentes Existentes
##### - Identificação dos principais concorrentes na indústria.
##### - Análise do nível de rivalidade e como ela afeta a competitividade na indústria.

<p>A rivalidade entre concorrentes existentes no setor de adquirência no Brasil, onde atua a Cielo, é elevada e estruturalmente intensa. Após o fim do modelo de exclusividade entre bandeiras e adquirentes, o mercado passou de um cenário concentrado para um ambiente altamente competitivo, com entrada de fintechs e novos modelos digitais. Segundo o Banco Central do Brasil (2023), o segmento de credenciamento tornou-se mais pulverizado ao longo da última década, com redução de participação das incumbentes e aumento da competição em preço, tecnologia e serviços agregados.</p>
<p>Os principais concorrentes da Cielo incluem Rede, Getnet, Stone, PagBank e Mercado Pago. Essas empresas competem não apenas na oferta de maquininhas (POS), mas também em antecipação de recebíveis, crédito para lojistas, contas digitais e integração com Pix e e-commerce. De acordo com relatórios públicos da própria Cielo (2023) e do Banco Central do Brasil (2023), Stone e PagBank ampliaram participação relevante no volume transacionado nos últimos anos, pressionando margens do setor.</p>

### 1.1.2. Análise SWOT (sprint 2)

A Análise SWOT é uma metodologia estratégica adotada por empresas de diversos setores para diagnosticar o cenário em que estão inseridas. Ela serve para mapear e organizar as forças, fraquezas, oportunidades e ameaças de um negócio, permitindo que a organização tenha um controle muito mais claro sobre seus próprios recursos e processos. Além de olhar para dentro, essa ferramenta ajuda a empresa a entender de forma realista sua posição no mercado e na economia, especialmente quando comparada ao desempenho de seus concorrentes.

| FORÇAS (STRENGTHS) | FRAQUEZAS (WEAKNESSES) |
| :--- | :--- |
| **Escala e Capilaridade:** Presença em 99% dos municípios brasileiros e sólida infraestrutura de processamento. | **Dependência Bancária:** Estrutura de governança dividida entre BB e Bradesco, o que pode tornar a decisão estratégica lenta. |
| **Apoio de Acionistas:** Suporte financeiro e de distribuição através das redes de agências do Banco do Brasil e Bradesco. | **Margens sob Pressão:** Redução do lucro líquido recorrente devido à necessidade de baixar taxas para manter clientes. |
| **Inovação em Produtos:** Investimentos crescentes em tecnologia (IA, pagamentos via celular/TAP e biometria). | **Perda de Market Share:** Dificuldade em reter fatia de mercado frente a competidores nativos digitais mais ágeis. |
| **Ecossistema Completo:** Oferta de serviços além da captura, como gestão de dados e antecipação de recebíveis. | **Estrutura de Custos:** Custos fixos elevados herdados do modelo tradicional de aluguel de máquinas físicas. |

<br>

| OPORTUNIDADES (OPPORTUNITIES) | AMEAÇAS (THREATS) |
| :--- | :--- |
| **Monetização de Dados:** Uso de inteligência de dados (ICVA) para oferecer consultoria e produtos personalizados. | **Consolidação do Pix:** O avanço do Pix reduz a receita vinda de taxas de cartões de débito tradicionais. |
| **Expansão em PMEs:** Foco no crescimento do volume de transações em Pequenas e Médias Empresas. | **Guerra das Maquininhas:** Competição agressiva de taxas com empresas como Stone, PagBank e Getnet. |
| **Digitalização do Varejo:** Crescimento contínuo do e-commerce e soluções de pagamento invisível. | **Regulação e Cibersegurança:** Aumento nos custos com segurança digital e novas normas rígidas do Banco Central. |


---
### Análise SWOT


#### **1. Forças (Strengths)**
A Cielo S.A. fundamenta sua liderança de mercado em uma escala operacional massiva, atingindo 99% dos municípios brasileiros. Esta robustez é amplificada pela aliança estratégica com seus controladores, o Banco do Brasil e o Bradesco, que proporcionam um canal de distribuição capilar e reduzem drasticamente o custo de aquisição de clientes. Além disso, a companhia detém uma infraestrutura tecnológica resiliente, capaz de processar bilhões de transações com alta segurança e baixa latência.

#### **2. Fraquezas (Weaknesses)**
Apesar de sua solidez, a complexidade da estrutura de governança dividida entre dois grandes bancos tradicionais é uma fraqueza que pode comprometer a agilidade estratégica. Em um mercado dinâmico, essa lentidão burocrática dificulta a resposta a inovações disruptivas quando comparada a rivais ágeis e nativos digitais como Stone e PagBank. Outro ponto crítico é a manutenção de uma estrutura de custos fixos elevada, focada em terminais físicos (POS), enquanto o setor migra progressivamente para soluções de software.

#### **3. Oportunidades (Opportunities)**
A vasta base de dados transacionais acumulada pela Cielo oferece uma oportunidade única de monetização através da inteligência de negócios. Por meio do ICVA (Índice Cielo do Varejo), a empresa pode converter informações em consultoria estratégica para lojistas e indústrias, criando novas linhas de receita. Há também um campo fértil para a expansão de serviços financeiros integrados, como a oferta de crédito personalizado e a antecipação de recebíveis.

#### **4. Ameaças (Threats)**
A principal ameaça ao modelo de negócio tradicional é a consolidação do Pix, que reduz a dependência dos cartões de débito e impacta diretamente as receitas provenientes de taxas de intercâmbio. Paralelamente, a intensa "guerra das maquininhas" promove uma competição predatória de taxas, forçando a compressão das margens líquidas. O cenário é agravado pela entrada de Big Techs no fluxo de pagamentos e pelas constantes atualizações regulatórias do Banco Central.

---

Com base nos dados levantados nesta sprint, fica claro que a Cielo possui uma infraestrutura massiva e um apoio bancário sólido, mas enfrenta o desafio de converter esse tamanho em agilidade. As informações retiradas mostram que, embora a empresa domine a capilaridade no Brasil, ela sofre com a pressão nas margens de lucro e a concorrência agressiva de modelos digitais mais leves. Em conclusão, o sucesso da Cielo dependerá de sua capacidade de transformar sua vasta base de dados em novos produtos de inteligência, compensando a queda nas taxas tradicionais e se adaptando à nova realidade de pagamentos instantâneos, como o Pix.

---

### 1.1.3. Missão / Visão / Valores (sprint 2)

Missão: Criar um jogo digital que simule situações reais de vendas, promovendo aprendizado prático e acessível para os Gerentes de Negócios da Cielo.

Visão: Desenvolver uma solução digital prática e eficaz, que contribua para reduzir as barreiras geográficas nos treinamentos da Cielo.

Valores: Aprendizado contínuo, inovação responsável, colaboração em equipe e compromisso com impacto educacional.


### 1.1.4. Proposta de Valor (sprint 4)

_Posicione aqui o canvas de proposta de valor. Descreva os aspectos essenciais para a criação de valor da ideia do produto com o objetivo de ajudar a entender melhor a realidade do cliente e entregar uma solução que está alinhado com o que ele espera._

### 1.1.5. Descrição da Solução Desenvolvida (sprint 4)

_Descreva brevemente a solução desenvolvida para o parceiro de negócios. Descreva os aspectos essenciais para a criação de valor da ideia do produto com o objetivo de ajudar a entender melhor a realidade do cliente e entregar uma solução que está alinhado com o que ele espera. Observe a seção 2 e verifique que ali é possível trazer mais detalhes, portanto seja objetivo aqui. Atualize esta descrição até a entrega final, conforme desenvolvimento._

### 1.1.6. Matriz de Riscos (sprint 4)

_Registre na matriz os riscos identificados no projeto, visando avaliar situações que possam representar ameaças e oportunidades, bem como os impactos relevantes sobre o projeto. Apresente os riscos, ressaltando, para cada um, impactos e probabilidades com plano de ação e respostas._

### 1.1.7. Objetivos, Metas e Indicadores (sprint 4)

_Definição de metas SMART (específicas, mensuráveis, alcançáveis, relevantes e temporais) para seu projeto, com indicadores claros para mensuração_

## 1.2. Requisitos do Projeto (sprints 1 e 2)

| #        | Requisito Funcionais                           | Descrição                                                                                                                                                                                                                  |
| -------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RF01** | Menu inicial e identificação do jogador | O sistema deve apresentar um menu inicial permitindo que o jogador informe seu nome antes do início da partida. O progresso será mantido apenas durante a sessão ativa, sem persistência após o encerramento da aplicação. |
| **RF02** | Tutorial inicial                        | O sistema deve apresentar um tutorial interativo explicando movimentação, interação com NPCs, funcionamento dos quizzes e sistema de pontuação antes da primeira partida.                                                  |
| **RF03** | Sistema de quizzes de negociação        | O sistema deve disponibilizar quizzes interativos que simulem situações de vendas e negociação de produtos da Cielo, com múltiplas opções de resposta baseadas no diálogo com o cliente (NPC).                             |
| **RF04** | Sistema de variáveis do cliente         | O sistema deve controlar variáveis dinâmicas de tempo de atendimento e humor do cliente, influenciando o resultado das interações e o desempenho do jogador.                                                               |
| **RF05** | Sistema de pontuação                    | O sistema deve calcular automaticamente a pontuação considerando: escolhas do quiz e estado de humor do cliente ao final da interação.                                                                  |
| **RF06** | Painel de desempenho em tempo real      | O sistema deve exibir painel visual com indicadores da partida atual, incluindo pontuação, status do cliente e progresso do jogador, sendo reiniciado ao final da sessão.                                                  |
| **RF07** | Interação com NPCs                      | O sistema deve permitir interação com NPCs distribuídos no mapa para iniciar negociações e acessar quizzes.                                                                                                                |
| **RF08** | Navegação em mundo aberto               | O sistema deve permitir movimentação livre do jogador em ambiente 2D top-down, possibilitando exploração e seleção de clientes.                                                                                            |


| #         | Requisito  Não Funcionais                          | Descrição                                                                                                                                                                  |
| --------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RNF01** | Ambiente gráfico                      | O jogo deve ser desenvolvido em ambiente 2D com perspectiva top-down, priorizando navegação simples, leitura visual clara e baixa complexidade operacional.                |
| **RNF02** | Plataforma de execução                | O jogo deve ser executável diretamente em navegadores web modernos, sem necessidade de instalação ou configuração adicional.                                               |
| **RNF03** | Usabilidade e linguagem               | O jogo deve utilizar linguagem clara, objetiva e adequada ao contexto comercial e educacional da Cielo.                                                                    |
| **RNF04** | Interface e identidade visual (UI/UX) | O sistema deve apresentar identidade visual consistente, com padronização de cores, tipografia e elementos gráficos, priorizando acessibilidade e facilidade de navegação. |
| **RNF05** | Desempenho                            | O jogo deve manter execução fluida em navegadores corporativos padrão, evitando quedas perceptíveis de desempenho.                                                         |
| **RNF06** | Acessibilidade operacional            | As mecânicas devem exigir baixo nível de habilidade gamer, permitindo uso por usuários sem experiência prévia com jogos digitais.                                          |
                                                                                             


## 1.3. Público-alvo do Projeto (sprint 2)

O jogo é direcionado aos colaboradores da equipe comercial da Cielo, com faixa etária média aproximada de 44 anos. Trata-se de um público adulto, inserido em ambiente corporativo, com experiência prévia em vendas, negociação e relacionamento com clientes.

Perfil Demográfico

 - Profissionais da área de vendas e relacionamento comercial
 - Faixa etária média: 40–50 anos
 - Usuários com familiaridade funcional com tecnologia digital
 - Predominantemente non-gamers ou jogadores ocasionais
 - Tempo limitado para treinamento devido à rotina profissional

Considerando essas características, o jogo foi desenvolvido em formato 2D mundo aberto (top down), priorizando acessibilidade, navegação simples e rápida assimilação das mecânicas, reduzindo a necessidade de habilidades típicas de jogadores experientes.

Perfil Psicográfico e Preferências

O público demonstra maior engajamento com experiências que:
 - Possuam aplicação prática direta no trabalho;
 - Simulem situações reais do cotidiano profissional;
 - Ofereçam aprendizado ativo em vez de treinamento passivo;
 - Apresentem feedback claro de desempenho e evolução;
 - Estimulem reconhecimento por progresso e melhoria contínua.

Necessidades de Aprendizagem

 - O jogo busca desenvolver competências-chave da área comercial, incluindo:
Persuasão e argumentação de vendas;
 - Tomada de decisão sob pressão;
 - Interpretação de perfis de clientes;
 - Estratégias de marketing e negociação;
 - Comunicação assertiva.

Essas habilidades são trabalhadas por meio de interações com NPCs que representam clientes em cenários simulados. O jogador participa de negociações estruturadas em formato de quiz contextual, selecionando respostas e argumentos estratégicos conforme a situação apresentada.

Justificativa de Design

A escolha do formato de jogo aberto 2D com interações baseadas em decisão foi definida para:
 - Facilitar o aprendizado experiencial;
 - Promover retenção de conhecimento através da prática;
 - Reduzir resistência a treinamentos corporativos tradicionais;
 - Integrar gamificação ao processo de qualificação profissional.

O jogo se posiciona, portanto, como uma ferramenta de gamificação corporativa, voltada ao desenvolvimento contínuo da equipe comercial por meio de simulação interativa e aprendizagem baseada em decisões.
# <a name="c2"></a>2. Visão Geral do Jogo (sprint 2)

## 2.1. Objetivos do Jogo (sprint 2)

Para avançar no jogo, o jogador deve participar de simulações de negociação estruturadas, nas quais a progressão está diretamente relacionada ao seu desempenho em quizzes inseridos em contextos realistas de vendas. Em cada fase, é necessário atingir a pontuação mínima definida, resultante do número de respostas corretas e da adequação das decisões tomadas ao longo da interação com o cliente.
Durante as simulações, espera-se que o jogador demonstre compreensão do perfil e das necessidades apresentadas, aplique corretamente conhecimentos sobre produtos e soluções e responda de maneira adequada às objeções propostas pelo sistema. O avanço ocorre à medida que o jogador obtém êxito nas negociações simuladas; ao fechar negócios com sucesso, ele progride de nível e passa a interagir com clientes mais exigentes e cenários progressivamente mais complexos.
O jogo é concluído quando todas as fases são finalizadas com sucesso, indicando que o jogador conseguiu manter um bom desempenho e evoluir ao longo dos diferentes cenários de negociação.

## 2.2. Características do Jogo (sprint 2)

O jogo é uma simulação interativa de negociação focada no desenvolvimento de habilidades comerciais em um ambiente virtual. Ele é organizado em fases progressivas, nas quais o jogador interage com diferentes perfis de clientes por meio de quizzes que representam situações comuns do processo de vendas. Ao longo da experiência, são utilizados elementos de gamificação, como pontuação, níveis e aumento gradual da dificuldade, permitindo que o jogador experimente estratégias, tome decisões e perceba os resultados de suas escolhas. Dessa forma, o jogo combina engajamento com aprendizagem prática, oferecendo um espaço seguro para treinar comunicação, argumentação e tomada de decisão.

### 2.2.1. Gênero do Jogo (sprint 2)

O jogo pode ser classificado como um serious game de simulação com quizzes.

### 2.2.2. Plataforma do Jogo (sprint 2)

Atualmente o jogo está sendo feito apenas para desktop e compatível com o navegador Google Chrome.


### 2.2.3. Número de jogadores (sprint 2)

Apenas 1 jogador.

### 2.2.4. Títulos semelhantes e inspirações (sprint 2)

Os jogos Pokémon Fire Red, Pokémon Leaf Green e Pokémon Emerald além de serem semelhantes, foram usados como inspiração para o nosso jogo.

### 2.2.5. Tempo estimado de jogo (sprint 5)

Aproximadamente 15 minutos.

# <a name="c3"></a>3. Game Design (sprints 2 e 3)

## 3.1. Enredo do Jogo (sprints 2 e 3)

<p>O jogo se passa em uma grande rua comercial, com diversas lojas nas laterais, representando diferentes perfis de clientes e realidades do mercado brasileiro. Esse ambiente simboliza o dia a dia dos lojistas, com dúvidas, pressões e necessidade de tomar decisões rápidas. O cenário é simples de propósito, para que o foco do jogador esteja nas interações e na qualidade da venda. O personagem principal é um gerente da Cielo, representado por um mascote, que já atua na empresa, mas precisa evoluir suas habilidades de argumentação, conhecimento de produto e capacidade de lidar com objeções. Sua jornada dentro do jogo representa o desenvolvimento profissional esperado de qualquer gerente.</p>
<p>A história começa a partir de um desafio real enfrentado pela Cielo: a dificuldade de treinar gerentes espalhados por todos os cantos do Brasil. Os treinamentos presenciais e aulas tradicionais não conseguem alcançar todos com a mesma consistência e frequência, principalmente considerando as diferentes regiões e contextos comerciais do país. Surge então a necessidade de uma solução acessível, prática e escalável. O jogo é criado como uma ferramenta estratégica de aprendizagem, permitindo que qualquer gerente, independentemente de onde esteja, possa aprender e treinar a venda dos produtos Cielo de forma interativa e dinâmica.</p>
<p>Ao percorrer a rua, o mascote entra nas lojas e inicia contato com os clientes, que começam vestindo camiseta vermelha, indicando que ainda não foram convencidos ou não possuem relação com a Cielo. Cada interação possui tempo limitado para resposta, simulando a pressão do mundo real, onde o lojista busca objetividade e clareza. Durante o atendimento, o jogador precisa responder perguntas sobre produtos, lidar com dúvidas e superar objeções. Além disso, há um indicador de satisfação do cliente, que mostra se a condução da venda está sendo positiva ou não. Não basta apenas fechar a venda; é necessário gerar confiança e segurança.</p>
<p>Conforme o jogador avança, os clientes se tornam mais exigentes e as perguntas mais complexas, aumentando o nível de desafio. Quando a venda é bem conduzida e o cliente se sente seguro, a camiseta muda de vermelho para azul, representando que ele se tornou cliente Cielo. Essa transformação visual simboliza não apenas a conversão, mas também o impacto da boa argumentação e do conhecimento aplicado corretamente. À medida que mais clientes se tornam azuis, a rua passa a representar crescimento, consolidação e fortalecimento da presença da Cielo naquele ambiente.</p>



## 3.2. Personagens (sprints 2 e 3)

### 3.2.1. Controláveis

<p>O nome do personagem principal é Marcielo. Trata-se de um mascote cuja função é atuar como facilitador da experiência do jogador, tendo como objetivo vender produtos da Cielo aos clientes dentro do ambiente do jogo. Para isso, ele se locomove pelo mapa e entra nas lojas a fim de interagir com os consumidores, simulando de maneira lúdica situações de venda e atendimento.</p>
<p>Sua presença contribui para tornar a dinâmica menos séria e mais envolvente, graças ao seu design amigável e expressivo. Marcielo transmite simpatia e carisma, sendo visualmente cativante e facilmente associado a uma figura confiável e acessível. Ele é representado sorrindo, com a mão levantada em um gesto cordial e piscando um dos olhos, elementos que reforçam sua personalidade acolhedora e descontraída. Dessa forma, o personagem não apenas cumpre uma função narrativa e interativa, como também torna a experiência do jogo mais leve, divertida e agradável para o público.</p>

<img src="public/assets/marcielo.png"> 

### 3.2.2. Non-Playable Characters (NPC)

<p>No jogo, haverá personagens coadjuvantes que representarão os clientes. Esses clientes estarão posicionados dentro das lojas e interagirão com o personagem principal nos momentos de negociação e venda dos produtos da Cielo.</p>
<p>Haverá dois tipos de clientes: os que utilizam camiseta vermelha e os que utilizam camiseta azul. A camiseta vermelha indica que o cliente ainda não foi convencido ou que ainda não teve contato com o vendedor. Após uma venda bem-sucedida, o cliente passará a utilizar camiseta azul, representando que se tornou um cliente Cielo.</p>
<P>Além disso, esses personagens também funcionam como um recurso para demonstrar diversidade no jogo. Por esse motivo, foram criados diferentes perfis de clientes para cada loja, com variações de aparência e características, de modo que o ambiente se torne mais representativo, dinâmico e diversificado ao longo da experiência do jogador.</p>

<img src="public/assets/Coadjuvantes.png" width= 250> 

### 3.2.3. Diversidade e Representatividade dos Personagens

<p>O elenco de personagens do jogo foi concebido de forma a refletir a pluralidade da sociedade brasileira e a realidade dos clientes que os Gerentes de Negócios da Cielo encontram no cotidiano profissional.</p>

<p><strong>Alinhamento com o público-alvo:</strong> O público-alvo do jogo (seção 1.3) são profissionais da equipe comercial da Cielo, com faixa etária entre 40 e 50 anos, inseridos em ambiente corporativo e com experiência em vendas. Os NPCs — clientes que habitam as lojas — foram criados com perfis variados de idade, gênero e aparência justamente para espelhar a diversidade de estabelecimentos e proprietários que um vendedor encontra em campo: desde uma doceira jovem em uma cupcakeria até o dono de uma padaria de bairro de meia-idade. Esse realismo nos perfis dos clientes torna o treinamento mais imersivo e transferível para situações reais de trabalho.</p>

<p><strong>Representatividade dentro da sociedade brasileira:</strong> O Brasil é um país marcado por intensa diversidade étnica, geracional e de gênero. De acordo com o Censo 2022 do IBGE, mais da metade da população se autodeclara preta ou parda, e o empreendedorismo de micro e pequenos negócios é amplamente distribuído entre diferentes perfis sociodemográficos. Para refletir essa realidade, os personagens coadjuvantes foram desenhados com variações de tom de pele, gênero, faixa etária e características físicas distintas, evitando a homogeneização do público consumidor que o vendedor deverá atender.</p>

<p><strong>Impacto esperado:</strong> A diversidade intencional nos personagens produz dois efeitos principais. Primeiro, amplia a identificação do jogador com o universo do jogo: vendedores de diferentes origens reconhecem nos clientes representações próximas à realidade que vivenciam. Segundo, reforça de forma implícita o valor da inclusão no relacionamento comercial, comunicando que os produtos da Cielo são relevantes para todos os perfis de estabelecimento, independentemente de quem seja o proprietário. Ao normalizar essa diversidade dentro da mecânica de treinamento, o jogo contribui para desenvolver uma postura comercial mais empática e culturalmente sensível nos colaboradores da Cielo.</p>
## 3.3. Mundo do jogo (sprints 2 e 3)

### 3.3.1. Locações Principais e/ou Mapas (sprints 2 e 3)

<p>O ambiente do jogo será estruturado de forma simples e objetiva, a fim de garantir que o jogador compreenda com clareza para onde deve se dirigir, evitando a perda de tempo ao se deslocar pelo mapa sem propósito. O cenário será composto por uma grande rua, com diversas lojas distribuídas nas laterais, que funcionarão como os principais ambientes do jogo. No interior desses estabelecimentos ocorrerão as negociações e as vendas dos produtos da Cielo.</p>

Segue abaixo o mapa: 

<img src="public/assets/MapaJogoCielo.png" width= 300>



### 3.3.2. Navegação pelo mundo (sprints 2 e 3)

<p>O personagem terá acesso a todas as lojas do mapa, podendo se locomover entre elas livremente. Ao chegar a uma loja, entrará no ambiente interno, onde realizará a negociação e a venda do produto ao cliente. Após a conclusão da venda, o personagem sairá da loja correspondente e seguirá para a próxima, dando continuidade ao processo e buscando novos clientes ao longo do mapa.</p>


### 3.3.3. Condições climáticas e temporais (sprints 2 e 3)

Não se aplica 

### 3.3.4. Concept Art (sprint 2)

_Inclua imagens de Concept Art do jogo que ainda não foram demonstradas em outras seções deste documento. Para cada imagem, coloque legendas, como no exemplo abaixo._

<img src="../assets/concept1.jpg">

Figura 1: detalhe da cena da partida do herói para a missão, usando sua nave

### 3.3.5. Trilha sonora (sprint 4)

_Descreva a trilha sonora do jogo, indicando quais músicas serão utilizadas no mundo e nas fases. Utilize listas ou tabelas para organizar esta seção. Caso utilize material de terceiros em licença Creative Commons, não deixe de citar os autores/fontes._

_Exemplo de tabela_
\# | titulo | ocorrência | autoria
--- | --- | --- | ---
1 | tema de abertura | tela de início | própria
2 | tema de combate | cena de combate com inimigos comuns | Hans Zimmer
3 | ...

## 3.4. Inventário e Bestiário (sprint 3)

### 3.4.1. Inventário

_\<opcional\> Caso seu jogo utilize itens ou poderes para os personagens obterem, descreva-os aqui, indicando títulos, imagens, meios de obtenção e funções no jogo. Utilize listas ou tabelas para organizar esta seção. Caso utilize material de terceiros em licença Creative Commons, não deixe de citar os autores/fontes._

_Exemplo de tabela_
\# | item | | como obter | função | efeito sonoro
--- | --- | --- | --- | --- | ---
1 | moeda | <img src="../assets/coin.png"> | há muitas espalhadas em todas as fases | acumula dinheiro para comprar outros itens | som de moeda
2 | madeira | <img src="../assets/wood.png"> | há muitas espalhadas em todas as fases | acumula madeira para construir casas | som de madeiras
3 | ...

### 3.4.2. Bestiário

_\<opcional\> Caso seu jogo tenha inimigos, descreva-os aqui, indicando nomes, imagens, momentos de aparição, funções e impactos no jogo. Utilize listas ou tabelas para organizar esta seção. Caso utilize material de terceiros em licença Creative Commons, não deixe de citar os autores/fontes._

_Exemplo de tabela_
\# | inimigo | | ocorrências | função | impacto | efeito sonoro
--- | --- | --- | --- | --- | --- | ---
1 | robô terrestre | <img src="../assets/inimigo2.PNG"> | a partir da fase 1 | ataca o personagem vindo pelo chão em sua direção, com velocidade constante, atirando parafusos | se encostar no inimigo ou no parafuso arremessado, o personagem perde 1 ponto de vida | sons de tiros e engrenagens girando
2 | robô voador | <img src="../assets/inimigo1.PNG"> | a partir da fase 2 | ataca o personagem vindo pelo ar, fazendo movimento em 'V' quando se aproxima | se encostar, o personagem perde 3 pontos de vida | som de hélice
3 | ...

## 3.5. Gameflow (Diagrama de cenas) (sprint 2)

_Posicione aqui seu "storyboard de programação" - o diagrama de cenas do jogo. Indique, por exemplo, como o jogo começa, quais opções o jogador tem, como ele avança nas fases, quais as condições de 'game over', como o jogo reinicia. Seu diagrama deve representar as classes, atributos e métodos usados no jogo._

## 3.6. Regras do jogo (sprint 3)

_Descreva aqui as regras do seu jogo: objetivos/desafios, meios para se conseguir alcançar_

_Ex. O jogador deve pilotar o carro e conseguir terminar a corrida dentro de um minuto sem bater em nenhum obstáculo._

_Ex. O jogador deve concluir a fase dentro do tempo, para obter uma estrela. Se além disso ele coletar todas as moedas, ganha mais uma estrela. E se além disso ele coletar os três medalhões espalhados, ganha mais uma estrela, totalizando três. Ao final do jogo, obtendo três estrelas em todas as fases, desbloqueia o mundo secreto._

## 3.7. Mecânicas do jogo (sprint 3)

_Descreva aqui as formas de controle e interação que o jogador tem sobre o jogo: quais os comandos disponíveis, quais combinações de comandos, e quais as ações consequentes desses comandos. Utilize listas ou tabelas para organizar esta seção._

_Ex. Em um jogo de plataforma 2D para desktop, o jogador pode usar as teclas WASD para mecânicas de andar, mirar para cima, agachar, e as teclas JKL para atacar, correr, arremesar etc._

_Ex. Em um jogo de puzzle para celular, o jogador pode tocar e arrastar sobre uma peça para movê-la sobre o tabuleiro, ou fazer um toque simples para rotacioná-la_

## 3.8. Implementação Matemática de Animação/Movimento (sprint 4)

_Descreva aqui a função que implementa a movimentação/animação de personagens ou elementos gráficos no seu jogo. Sua função deve se basear em alguma formulação matemática (e.g. fórmula de aceleração). A explicação do funcionamento desta função deve conter notação matemática formal de fórmulas/equações. Se necessário, crie subseções para sua descrição._

# <a name="c4"></a>4. Desenvolvimento do Jogo

## 4.1. Desenvolvimento preliminar do jogo (sprint 1)

Primeira Versão do Jogo (MVP)
1. Visão Geral
Esta é a primeira versão do jogo, desenvolvida como um protótipo inicial.
Ela não representa o produto final, mas sim uma base estrutural que permite visualizar como o jogo funcionará futuramente.
O objetivo desta versão é construir o ambiente inicial e preparar a estrutura para a implementação das mecânicas principais.
2. Ambiente do Jogo
Ao iniciar o jogo, o jogador visualiza:
Um cenário urbano em estilo pixel art
Rua com faixa de pedestre
Prédios comerciais
Estabelecimentos que representam possíveis empresas ou clientes
Um personagem controlável
Esse ambiente representa a cidade onde, no futuro, ocorrerão as negociações comerciais.
3. Funcionalidades Atuais
Na versão atual, o jogador pode:
Controlar o personagem
Movimentar-se pelo mapa
Explorar o cenário
Neste momento, o jogo funciona como um espaço explorável.
Ainda não existem interações comerciais ativas.

4. Funcionalidades Planejadas (Ainda Não Implementadas)
A proposta completa do jogo é ser um simulador de negociação comercial.
Os seguintes elementos fazem parte do conceito original, mas ainda não estão presentes no protótipo:
4.1 Sistema de Cards
Durante uma negociação, o jogador escolheria respostas em formato de cards.
Cada card representaria um argumento estratégico diferente.
Esse sistema ainda não foi implementado.

4.2 Tempo de Resposta
O jogador teria tempo limitado para responder às falas do cliente (exemplo: 15 segundos), simulando pressão real de negociação.
Essa funcionalidade ainda não está disponível.

4.3 Indicador de Satisfação
O cliente teria uma barra visual indicando seu nível de satisfação.
Essa barra aumentaria ou diminuiria conforme as decisões do jogador.
Esse sistema ainda não existe na versão atual.

4.4 Fechamento de Negócios
O objetivo de cada interação futura será fechar um negócio com sucesso.
Atualmente, não há sistema de negociação ativa nem fechamento de contratos.

4.5 Sistema de Pontuação
O conceito prevê:
Pontos acumulados a cada negociação bem-sucedida
Recompensa por decisões estratégicas corretas
Esse sistema ainda não está implementado.

4.6 Sistema de Níveis
O jogador deverá:
Subir de nível conforme acumula pontos
Enfrentar clientes mais exigentes em níveis mais altos
Experimentar aumento progressivo de dificuldade
A progressão de níveis ainda não está presente.

4.7 Nível Máximo (Certificação)
O objetivo final do jogo completo é alcançar o nível máximo.
Esse nível representará que o usuário está devidamente qualificado para exercer sua função dentro da empresa.
Essa certificação gamificada ainda não foi implementada.

5. Objetivo do MVP
Esta primeira versão foi criada para:
Construir a base visual do projeto
Testar a movimentação do personagem
Estruturar o ambiente onde ocorrerão as futuras negociações
Criar a fundação técnica para o desenvolvimento completo
O foco desta versão é estrutural, não funcional.



## 4.2. Desenvolvimento básico do jogo (sprint 2)

_Descreva e ilustre aqui o desenvolvimento da versão básica do jogo, explicando brevemente o que foi entregue em termos de código e jogo. Utilize prints de tela para ilustrar. Indique as eventuais dificuldades e próximos passos._

## 4.3. Desenvolvimento intermediário do jogo (sprint 3)

_Descreva e ilustre aqui o desenvolvimento da versão intermediária do jogo, explicando brevemente o que foi entregue em termos de código e jogo. Utilize prints de tela para ilustrar. Indique as eventuais dificuldades e próximos passos._

## 4.4. Desenvolvimento final do MVP (sprint 4)

_Descreva e ilustre aqui o desenvolvimento da versão final do jogo, explicando brevemente o que foi entregue em termos de MVP. Utilize prints de tela para ilustrar. Indique as eventuais dificuldades e planos futuros._

## 4.5. Revisão do MVP (sprint 5)

_Descreva e ilustre aqui o desenvolvimento dos refinamentos e revisões da versão final do jogo, explicando brevemente o que foi entregue em termos de MVP. Utilize prints de tela para ilustrar._

# <a name="c5"></a>5. Testes

## 5.1. Casos de Teste (sprints 2 a 4)


| # | pré-condição | descrição do teste | pós-condição |
| :--- | :--- | :--- | :--- |
| 1 | Jogo aberto na tela inicial | Clicar no botão "Jogar" | O jogo deve iniciar |
| 2 | Jogo na tela inicial | Clicar no botão "Configurações" | A tela de configurações deve abrir |
| 3 | Jogo na tela inicial | Clicar no botão "Como jogar" | Abre uma interface das teclas que o jogador utiliza e o objetivo |
| 4 | Jogo com personagem parado | Pressionar D | Personagem deve se mover para a direita |
| 5 | Jogo com personagem parado | Pressionar A | Personagem deve se mover para a esquerda |
| 6 | Jogo com personagem parado | Pressionar W | Personagem deve se mover para cima |
| 7 | Jogo com personagem parado | Pressionar S | Personagem deve se mover para baixo |
| 8 | Personagem próximo de uma loja | Pressionar E | Personagem entra no estabelecimento |
| 9 | Personagem perto de um vendedor | Pressionar E | Interface de conversa aparece |
| 10 | Tela de 4 respostas para o cliente | Clicar com botão esquerdo na melhor resposta | O nível de satisfação aumenta muito |
| 11 | Tela de 4 respostas para o cliente | Clicar com botão esquerdo em uma resposta boa | O nível de satisfação aumenta |
| 12 | Tela de 4 respostas para o cliente | Clicar com botão esquerdo em uma resposta ruim | O nível de satisfação diminui |
| 13 | Tela de 4 respostas para o cliente | Clicar com botão esquerdo em resposta horrível | O nível de satisfação diminui muito |
| 14 | Nível de satisfação acima do mínimo (última dúvida) | Clicar em resposta que mantenha/aumente satisfação | Vendedor compra os serviços e ganha o cliente |
| 15 | Nível de satisfação acima do mínimo (última dúvida) | Clicar em resposta que diminua, mas acima do mínimo | Vendedor compra os serviços e ganha o cliente |
| 16 | Nível de satisfação acima do mínimo (última dúvida) | Clicar em resposta que diminua para abaixo do mínimo | Vendedor não compra e o jogador perde o cliente |
| 17 | Nível de satisfação abaixo do mínimo (última dúvida) | Clicar em resposta que mantenha ou diminua o nível | Vendedor não compra e o jogador perde o cliente |
| 18 | Nível de satisfação abaixo do mínimo (última dúvida) | Clicar em resposta que aumente, mas abaixo mantém do mínimo | Vendedor não compra e o jogador perde o cliente |
| 19 | Nível de satisfação abaixo do mínimo (última dúvida) | Clicar em resposta que aumente para acima do mínimo | Vendedor compra os serviços e ganha o cliente |
| 20 | Tempo limite da interação acabando | Tempo limite termina | Usuário perde o cliente e volta para o mapa |
| 21 | Interface de conversa acaba | Pontos são calculados | Os pontos são somados ao saldo do usuário |
| 22 | Perto de um cliente já interagido | Apertar a tecla "E" | Nada acontece |
| 23 | Tempo limite do jogo acabando | O tempo acaba | A gameplay se encerra |

## 5.2. Testes de jogabilidade (playtests) (sprint 5)

### 5.2.1 Registros de testes

_Descreva nesta seção as sessões de teste/entrevista com diferentes jogadores. Registre cada teste conforme o template a seguir._

| Nome                                     | João Jonas (use nomes fictícios)                                                                                                         |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Já possuía experiência prévia com games? | sim, é um jogador casual                                                                                                                 |
| Conseguiu iniciar o jogo?                | sim                                                                                                                                      |
| Entendeu as regras e mecânicas do jogo?  | entendeu as regras, mas sobre as mecânicas, apenas as essenciais, não explorou os comandos complexos                                     |
| Conseguiu progredir no jogo?             | sim, sem dificuldades                                                                                                                    |
| Apresentou dificuldades?                 | Não, conseguiu jogar com facilidade e afirmou ser fácil                                                                                  |
| Que nota deu ao jogo?                    | 9.0                                                                                                                                      |
| O que gostou no jogo?                    | Gostou de como o jogo vai ficando mais difícil ao longo do tempo sem deixar de ser divertido                                             |
| O que poderia melhorar no jogo?          | A responsividade do personagem aos controles, disse que havia um pouco de atraso desde o momento do comando até a resposta do personagem |

### 5.2.2 Melhorias

_Descreva nesta seção um plano de melhorias sobre o jogo, com base nos resultados dos testes de jogabilidade_

# <a name="c6"></a>6. Conclusões e trabalhos futuros (sprint 5)

_Escreva de que formas a solução do jogo atingiu os objetivos descritos na seção 1 deste documento. Indique pontos fortes e pontos a melhorar de maneira geral._

_Relacione os pontos de melhorias evidenciados nos testes com plano de ações para serem implementadas no jogo. O grupo não precisa implementá-las, pode deixar registrado aqui o plano para futuros desenvolvimentos._

_Relacione também quaisquer ideias que o grupo tenha para melhorias futuras_

# <a name="c7"></a>7. Referências

Banco Central do Brasil. (2023). *Relatório de economia bancária 2023*. https://www.bcb.gov.br/publicacoes/relatorioeconomiabancaria

Banco Central do Brasil. (2024). *Relatório de vigilância do sistema de pagamentos brasileiro*. https://www.bcb.gov.br

Banco Central do Brasil. (2025). *Relatórios de estabilidade e vigilância do SPB*. https://www.bcb.gov.br/publicacoes

Cielo S.A. (2023). *Relatório anual e demonstrações financeiras 2023*. https://ri.cielo.com.br

Cielo S.A. (2024). *Informações institucionais e dados operacionais*. https://www.cielo.com.br

Cielo S.A. (2025). *Portal de relações com investidores*. https://ri.cielo.com.br/

ClickPetróleo e Gás. (2025). *Cielo loses historic lead in the ‘card machine war’ after competitors advance, new Central Bank rules, and the rise of Pix*. https://en.clickpetroleoegas.com.br/Cielo-loses-historic-leadership-in-the-war-of-payment-machines-after-the-advance-of-competitors--new-rules-from-the-central-bank-and-the-rise-of-Pix-btl96/

CNN Brasil. (2025). *A guerra das maquininhas e a disputa no mercado de adquirentes*. https://www.cnnbrasil.com.br

IBGE. (2022). *Censo demográfico 2022: Primeiros resultados*. https://www.ibge.gov.br/censo2022

Moraes, R. A., & Silva, J. P. (2021). A guerra das maquininhas: Competição e inovação no setor de adquirência brasileiro. *Revista Brasileira de Gestão e Negócios*. https://doi.org/10.7819/rbgn.v23i2.4104

PagBank. (2024). *Relatório institucional e atuação no mercado de pagamentos*. https://www.pagbank.com.br

PagSeguro Digital Ltd. (2023). *Form 20-F: Annual report 2023*. https://investors.pagseguro.com

PortersFiveForce.com. (2025). *What are the Porter’s five forces of Cielo?* https://portersfiveforce.com/products/cielo-five-forces-analysis

Reuters. (2026, 10 de fevereiro). *Instant payment system Pix poised to capture half of Brazil’s e-commerce market by 2028*. https://www.reuters.com/world/americas/instant-payment-system-pix-poised-capture-half-brazils-e-commerce-market-by-2028-2026-02-10/

Stone Co. (2024). *Formulário de referência e modelo de negócios*. https://investors.stone.co

StoneCo Ltd. (2023). *Form 20-F: Annual report 2023*. https://investors.stone.com

SwotTemplate.com. (2025). *Cielo SWOT analysis*. https://swottemplate.com/products/cielo-five-forces-analysis

Valor Econômico. (2025). *Resultados financeiros da Cielo*. https://s3.glbimg.com

Vieira, S. (2025). *Mercado de adquirência: Um gigante em disputa na era do Pix* [Publicação no LinkedIn]. https://pt.linkedin.com/posts/sandra-vieira-servicos-financeiros_pagamentos-adquir%C3%AAncia-pix-activity-7350464091540336643-WWyA

Wikipedia. (2024). *Cielo*. https://pt.wikipedia.org

# <a name="c8"></a>Anexos

_Inclua aqui quaisquer complementos para seu projeto, como diagramas, imagens, tabelas etc. Organize em sub-tópicos utilizando headings menores (use ## ou ### para isso)_

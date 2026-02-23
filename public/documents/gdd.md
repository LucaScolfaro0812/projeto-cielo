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

_Posicione aqui o texto que explica o contexto da indústria/mercado do qual o parceiro de projeto faz parte. Contextualize o segmento de atuação do parceiro (pode ser indústria, comércio ou serviço). Caracterize as atividades executadas pelo negócio do parceiro e a abrangência de suas atividades (âmbito internacional, nacional ou regional)._

#### 1.1.1.1. Modelo de 5 Forças de Porter (sprint 2)

_Posicione aqui o modelo de 5 Forças de Porter para sustentar o contexto da indústria._

##### 1.1.1.1.1 Análise da Ameaça de Novos Entrantes
A Primeira Força de Porter é a ameaça de novos entrantes, onde se avalia quais as dificuldades para uma nova empresa, startup e etc. entrar no mercado, além de avaliar o que a entrada de novos concorrentes poderia acarretar no mercado como um todo

##### 1.1.1.1.1.1 Identificação e análise dos principais obstáculos para novos entrantes.
<p>Uma das principais dificuldades para novas empresas no ramo é a questão do capital, considerando que para explorar o mercado é necessário o alto investimento em tecnologia, como servidores, segurança e sistemas antifraude. Além disso temos também tem a questão regulatória, ja que empresas desse tipo precisam de aprovação do Banco Central, sendo assim necessário a aprovação e cumprimento com diversos regulamentos. Contudo, uma das maiores dificuldades é entrar em um mercado consolidado, já que ja existem gigantes nesse ramo, como a própria Cielo, então entrar no mercado neste momento pode ser um grande desafio para se estabelecer, ganhar uma boa reputação e conquistar a confiança de clientes e instituições financeiras. Por fim, temos a questão da escala, quanto menos clientes maior são os custos iniciais, pois não há o mesmo capital de giro das gigantes do mercado e muito menos sua eficiência</p>


##### 1.1.1.1.1.2 Avaliação do impacto potencial dos novos entrantes na indústria.

<p>Com a entrada de concorrentes as grandes empresas do ramo de pagamento com maquininha podem perder dominância no mercado. Com isso empresas como a Cielo podem se sentir pressionadas para diminuir suas taxas e adaptar-se a novas tecnologias e inovações, causando maior variedade e disputa por market share.</p>

### 1.1.2. Análise SWOT (sprint 2)

_Posicione aqui a análise SWOT relacionada ao parceiro de projeto. Utilize a análise SWOT para fazer uma análise ambiental do parceiro no âmbito estratégico. Leve em consideração o contexto da indústria, concorrência e as características do ambiente interno (forças e fraquezas) e externo (oportunidades e ameaças) do parceiro._

### 1.1.3. Missão / Visão / Valores (sprint 2)

_Posicione aqui a Missão, Visão e Valores do seu projeto._

### 1.1.4. Proposta de Valor (sprint 4)

_Posicione aqui o canvas de proposta de valor. Descreva os aspectos essenciais para a criação de valor da ideia do produto com o objetivo de ajudar a entender melhor a realidade do cliente e entregar uma solução que está alinhado com o que ele espera._

### 1.1.5. Descrição da Solução Desenvolvida (sprint 4)

_Descreva brevemente a solução desenvolvida para o parceiro de negócios. Descreva os aspectos essenciais para a criação de valor da ideia do produto com o objetivo de ajudar a entender melhor a realidade do cliente e entregar uma solução que está alinhado com o que ele espera. Observe a seção 2 e verifique que ali é possível trazer mais detalhes, portanto seja objetivo aqui. Atualize esta descrição até a entrega final, conforme desenvolvimento._

### 1.1.6. Matriz de Riscos (sprint 4)

_Registre na matriz os riscos identificados no projeto, visando avaliar situações que possam representar ameaças e oportunidades, bem como os impactos relevantes sobre o projeto. Apresente os riscos, ressaltando, para cada um, impactos e probabilidades com plano de ação e respostas._

### 1.1.7. Objetivos, Metas e Indicadores (sprint 4)

_Definição de metas SMART (específicas, mensuráveis, alcançáveis, relevantes e temporais) para seu projeto, com indicadores claros para mensuração_

## 1.2. Requisitos do Projeto (sprints 1 e 2)

\# | Requisitos Funcionais
| **RF01** | **Menu inicial e identificação do jogador** — O sistema deve apresentar um menu inicial permitindo que o jogador informe seu nome antes do início da partida. O sistema deverá manter o progresso apenas durante a sessão ativa do jogo, sem persistência de dados após o encerramento da aplicação. |
| **RF02** | **Tutorial inicial** — O sistema deve apresentar um tutorial interativo explicando movimentação, interação com NPCs, funcionamento dos quizzes e sistema de pontuação antes do início da primeira partida.                                                                                           
| **RF03** | **Sistema de quizzes de negociação** — O sistema deve disponibilizar quizzes interativos que simulem situações de vendas e negociação de produtos da Cielo, apresentando múltiplas opções de resposta baseadas no diálogo com o cliente (NPC).                                                       
| **RF04** | **Sistema de variáveis do cliente (tempo e humor)** — O sistema deve controlar variáveis dinâmicas de tempo de atendimento e humor do cliente, influenciando o resultado das interações e o desempenho do jogador durante a negociação.                                                              
| **RF05** | **Sistema de pontuação** — O sistema deve calcular automaticamente a pontuação do jogador considerando: (a) escolhas realizadas no quiz, (b) tempo de resposta e (c) estado de humor do cliente ao final da interação.                                                                               
| **RF06** | **Painel de desempenho em tempo real** — O sistema deve exibir um painel visual com indicadores de desempenho da partida atual, incluindo pontuação, status do cliente e progresso do jogador. As informações deverão ser reiniciadas ao encerrar a sessão.                                          |
| **RF07** | **Interação com NPCs** — O sistema deve permitir que o jogador interaja com NPCs distribuídos no mapa para iniciar negociações e acessar os quizzes.                                                                                                 |
| **RF08** | **Navegação em mundo aberto** — O sistema deve permitir a movimentação livre do jogador em ambiente 2D top-down, possibilitando exploração e seleção de clientes a serem atendidos.  

\# | Requisitos Não Funcionais
| **RNF01** | **Ambiente gráfico** — O jogo deve ser desenvolvido em ambiente 2D com perspectiva top-down, priorizando navegação simples, leitura visual clara e baixo nível de complexidade operacional.                                                                                              
| **RNF02** | **Plataforma de execução** — O jogo deve ser executável diretamente em navegadores web modernos, sem necessidade de instalação local ou configuração adicional pelo usuário.                                                                                                  
| **RNF03** | **Usabilidade e linguagem** — O jogo deve utilizar linguagem clara, objetiva e adequada ao contexto comercial e educacional da Cielo, garantindo fácil compreensão das interações e instruções.                                                                                               
| **RNF04** | **Interface e identidade visual (UI/UX)** — O sistema deve apresentar identidade visual consistente, com padronização de cores, tipografia, personagens e elementos gráficos alinhados ao contexto corporativo e educacional. A interface deve priorizar acessibilidade, organização visual e facilidade de navegação. 
| **RNF05** | **Desempenho** — O jogo deve manter execução fluida em navegadores padrão corporativos, evitando quedas perceptíveis de desempenho durante movimentação e interações.                                                                                               
| **RNF06** | **Acessibilidade operacional** — As mecânicas do jogo devem exigir baixo nível de habilidade gamer, permitindo utilização por usuários sem experiência prévia com jogos digitais.                                                                                                 


## 1.3. Público-alvo do Projeto (sprint 2)

O jogo é direcionado aos colaboradores da equipe comercial da Cielo, com faixa etária média aproximada de 44 anos. Trata-se de um público adulto, inserido em ambiente corporativo, com experiência prévia em vendas, negociação e relacionamento com clientes.

Perfil Demográfico

. Profissionais da área de vendas e relacionamento comercial
. Faixa etária média: 40–50 anos
. Usuários com familiaridade funcional com tecnologia digital
. Predominantemente non-gamers ou jogadores ocasionais
. Tempo limitado para treinamento devido à rotina profissional

Considerando essas características, o jogo foi desenvolvido em formato 2D mundo aberto (top down), priorizando acessibilidade, navegação simples e rápida assimilação das mecânicas, reduzindo a necessidade de habilidades típicas de jogadores experientes.

Perfil Psicográfico e Preferências

O público demonstra maior engajamento com experiências que:
. Possuam aplicação prática direta no trabalho;
. Simulem situações reais do cotidiano profissional;
. Ofereçam aprendizado ativo em vez de treinamento passivo;
. Apresentem feedback claro de desempenho e evolução;
. Estimulem reconhecimento por progresso e melhoria contínua.

Necessidades de Aprendizagem

. O jogo busca desenvolver competências-chave da área comercial, incluindo:
Persuasão e argumentação de vendas;
. Tomada de decisão sob pressão;
. Interpretação de perfis de clientes;
. Estratégias de marketing e negociação;
. Comunicação assertiva.

Essas habilidades são trabalhadas por meio de interações com NPCs que representam clientes em cenários simulados. O jogador participa de negociações estruturadas em formato de quiz contextual, selecionando respostas e argumentos estratégicos conforme a situação apresentada.

Justificativa de Design

A escolha do formato de jogo aberto 2D com interações baseadas em decisão foi definida para:
. Facilitar o aprendizado experiencial;
. Promover retenção de conhecimento através da prática;
. Reduzir resistência a treinamentos corporativos tradicionais;
. Integrar gamificação ao processo de qualificação profissional.

O jogo se posiciona, portanto, como uma ferramenta de gamificação corporativa, voltada ao desenvolvimento contínuo da equipe comercial por meio de simulação interativa e aprendizagem baseada em decisões.
# <a name="c2"></a>2. Visão Geral do Jogo (sprint 2)

## 2.1. Objetivos do Jogo (sprint 2)

_Descreva o que o jogador deve cumprir para avançar ou concluir o jogo_

## 2.2. Características do Jogo (sprint 2)

### 2.2.1. Gênero do Jogo (sprint 2)

_simulação, RPG, corrida, estratégia, esportes, ação, aventura etc._

### 2.2.2. Plataforma do Jogo (sprint 2)

_quanto ao dispositivo: desktop, smartphones, tablets, TV etc._

_quanto ao sistema: navegadores compatíveis_

### 2.2.3. Número de jogadores (sprint 2)

_1 jogador, 2 jogadores versus, 2 jogadores cooperação, multiplayer etc._

### 2.2.4. Títulos semelhantes e inspirações (sprint 2)

_Liste e descreva títulos semelhantes e jogos que inspiram e são usados como referência do projeto_

### 2.2.5. Tempo estimado de jogo (sprint 5)

_Ex. O jogo pode ser concluído em 3 horas passando por todas as fases._

_Ex. cada partida dura até 15 minutos_

# <a name="c3"></a>3. Game Design (sprints 2 e 3)

## 3.1. Enredo do Jogo (sprints 2 e 3)

_Descreva o enredo/história do jogo, criando contexto para os personagens (seção 3.2) e o mundo do jogo (seção 3.3). Uma boa história costuma ter um arco narrativo de contexto, conflito e resolução. Utilize etapas sequenciais para descrever esta história._

_Caso seu jogo não possua enredo/história (ex. jogo Tetris), mencione os motivos de não existir e como o jogador pode se contextualizar com o ambiente do jogo._

## 3.2. Personagens (sprints 2 e 3)

### 3.2.1. Controláveis

<p>O nome do personagem principal é Marcielo. Trata-se de um mascote cuja função é atuar como facilitador da experiência do jogador, tendo como objetivo vender produtos da Cielo aos clientes dentro do ambiente do jogo. Para isso, ele se locomove pelo mapa e entra nas lojas a fim de interagir com os consumidores, simulando de maneira lúdica situações de venda e atendimento.</p>
<p>Sua presença contribui para tornar a dinâmica menos séria e mais envolvente, graças ao seu design amigável e expressivo. Marcielo transmite simpatia e carisma, sendo visualmente cativante e facilmente associado a uma figura confiável e acessível. Ele é representado sorrindo, com a mão levantada em um gesto cordial e piscando um dos olhos, elementos que reforçam sua personalidade acolhedora e descontraída. Dessa forma, o personagem não apenas cumpre uma função narrativa e interativa, como também torna a experiência do jogo mais leve, divertida e agradável para o público.</p>

<img src="public/assets/marcielo.png"> 

### 3.2.2. Non-Playable Characters (NPC)

<p>No jogo, haverá personagens coadjuvantes que representarão os clientes. Esses clientes estarão dentro das lojas e interagirão com o personagem principal nos momentos de negociação e venda dos produtos da Cielo.</p>
<p>Haverá dois tipos de clientes: os que utilizam camiseta vermelha e os que utilizam camiseta azul. A camiseta vermelha indica que o cliente ainda não foi convencido ou não teve contato com o vendedor. Após uma venda bem-sucedida, o cliente passará a usar camiseta azul, representando que se tornou um cliente Cielo.</p>

<img src="public/assets/Coadjuvantes.png"> 

### 3.2.3. Diversidade e Representatividade dos Personagens

_Considerando as personagens do game, analise se estas estão alinhadas ao público-alvo do jogo (seção 1.3), e compare-as dentro da realidade da sociedade brasileira. Por fim, discorra sobre qual é o impacto esperado da escolha dessas personagens._

## 3.3. Mundo do jogo (sprints 2 e 3)

### 3.3.1. Locações Principais e/ou Mapas (sprints 2 e 3)

<p>O ambiente do jogo será estruturado de forma simples e objetiva, a fim de garantir que o jogador compreenda com clareza para onde deve se dirigir, evitando a perda de tempo ao se deslocar pelo mapa sem propósito. O cenário será composto por uma grande rua, com diversas lojas distribuídas nas laterais, que funcionarão como os principais ambientes do jogo. No interior desses estabelecimentos ocorrerão as negociações e as vendas dos produtos da Cielo.</p>

Segue abaixo o mapa: 

<img src="public/assets/MapaJogoCielo.png" width= 300>



### 3.3.2. Navegação pelo mundo (sprints 2 e 3)

<p>O personagem terá acesso a todas as lojas do mapa, podendo se locomover entre elas livremente. Ao chegar a uma loja, entrará no ambiente interno, onde realizará a negociação e a venda do produto ao cliente. Após a conclusão da venda, o personagem sairá da loja correspondente e seguirá para a próxima, dando continuidade ao processo e buscando novos clientes ao longo do mapa.</p>


### 3.3.3. Condições climáticas e temporais (sprints 2 e 3)

_\<opcional\> Descreva diferentes condições de clima que podem afetar o mundo e as fases, se aplicável_

_Caso seja relevante, descreva como o tempo passa, se ele é um fator limitante ao jogo (ex. contagem de tempo para terminar uma fase)_

- não tem, o que faz aqui? 

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

_Descreva nesta seção os casos de teste comuns que podem ser executados a qualquer momento para testar o funcionamento e integração das partes do jogo. Utilize tabelas para facilitar a organização._

_Exemplo de tabela_
\# | pré-condição | descrição do teste | pós-condição
--- | --- | --- | ---
1 | posicionar o jogo na tela de abertura | iniciar o jogo desde seu início | o jogo deve iniciar da fase 1
2 | posicionar o personagem em local seguro de inimigos | aguardar o tempo passar até o final da contagem | o personagem deve perder uma vida e reiniciar a fase
3 | ...

#
1
Jogo aberto na tela inicial | Clicar no botão "Jogar" | O jogo deve iniciar
2
Jogo na tela inicial | Clicar no botão "Configurações" | A tela de configurações deve abrir
3
Jogo na tela inicial | Clicar no botão “Como jogar” |Abre uma interface das teclas que o jogador utiliza e qual o objetivo do jogo.
3
Jogo com personagem parado | Pressionar D | Personagem deve se mover para a direita
4
Jogo com personagem parado | Pressionar A | Personagem deve se mover para a esquerda
5
Jogo com personagem parado | Pressionar W | Personagem deve se mover para cima
6
Jogo com personagem parado | Pressionar S |Personagem deve se mover para baixo
7
Personagem próximo de uma loja | Pressionar E | Personagem entra no estabelecimento
8
Personagem perto de um vendedor | Pressionar E | Interface de conversa aparece
9
Tela de 4 respostas para a dúvida do cliente | Clicar com o botão esquerdo na melhor resposta | O nível de satisfação do cliente aumenta muito
10
Tela de 4 respostas para a dúvida do cliente | Clicar com o botão esquerdo em uma resposta boa | O nível de satisfação do cliente aumenta
11
Tela de 4 respostas para a dúvida do cliente | Clicar com o botão esquerdo em uma resposta ruim | O nível de satisfação do cliente diminuí
12
Tela de 4 respostas para a dúvida do cliente | Clicar com o botão esquerdo em uma resposta horrível | O nível de satisfação do cliente diminuí muito
13
Nível de satisfação do cliente está acima do mínimo e ele está em sua última dúvida | Clicar em uma resposta que mantenha ou aumente o nível de satisfação |Vendedor compra os serviços e o jogador consegue mais um cliente
14
Nível de satisfação do cliente está acima do mínimo e ele está em sua última dúvida | Clicar em uma resposta que diminua o nível de satisfação, contudo mantendo acima do mínimo | Vendedor compra os serviços e o jogador consegue mais um cliente
15
Nível de satisfação do cliente está acima do mínimo e ele está em sua última dúvida | Clicar em uma resposta que diminua o nível de satisfação para abaixo do mínimo | Vendedor  não compra os serviços e o jogador perde um cliente
16
Nível de satisfação do cliente está abaixo do mínimo e ele está em sua última dúvida |Clicar em uma resposta que mantenha ou diminua o nível de satisfação | Vendedor não compra os serviços e o jogador perde um cliente
17
Nível de satisfação do cliente está abaixo do mínimo e ele está em sua última dúvida | Clicar em uma resposta que aumente o nível de satisfação, contudo mantendo acima do mínimo | Vendedor  não compra os serviços e o jogador perde um cliente
18
Nível de satisfação do cliente está abaixo do mínimo e ele está em sua última dúvida | Clicar em uma resposta que aumente o nível de satisfação para acima do mínimo | Vendedor compra os serviços e o jogador consegue mais um cliente
19
Tempo limite da interação com o cliente acabando | Tempo limite termina | Usuário perde um cliente e volta para o mapa
20
Interface de conversa com o cliente acaba | Pontos de acordo com as respostas dadas pelo usuário são calculados | Os pontos ganhos são somados aos que o usuário já possuí
21
Perto de um cliente que já interagiu | Apertar a tecla “E” |Nada acontece
22
O tempo limite do jogo está acabando | O tempo acaba | A gameplay se encerra

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

# <a name="c7"></a>7. Referências (sprint 5)

_Incluir as principais referências de seu projeto, para que seu parceiro possa consultar caso ele se interessar em aprofundar. Um exemplo de referência de livro e de site:_<br>

LUCK, Heloisa. Liderança em gestão escolar. 4. ed. Petrópolis: Vozes, 2010. <br>
SOBRENOME, Nome. Título do livro: subtítulo do livro. Edição. Cidade de publicação: Nome da editora, Ano de publicação. <br>

INTELI. Adalove. Disponível em: https://adalove.inteli.edu.br/feed. Acesso em: 1 out. 2023 <br>
SOBRENOME, Nome. Título do site. Disponível em: link do site. Acesso em: Dia Mês Ano

ANALYSIS. Swot. Disponível em: [link do site](https://swottemplate.com/products/cielo-five-forces-analysis). Acesso em: 10 fev. 2026
FIVE, Porters. Título do site. Disponível em: [link do site](https://portersfiveforce.com/products/cielo-five-forces-analysis). Acesso em: 10 fev. 2026

# <a name="c8"></a>Anexos

_Inclua aqui quaisquer complementos para seu projeto, como diagramas, imagens, tabelas etc. Organize em sub-tópicos utilizando headings menores (use ## ou ### para isso)_

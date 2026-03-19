# Inteli - Instituto de Tecnologia e Liderança 

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="public/assets/ui/inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0" width=40% height=40%></a>
</p>

<br>

# As Aventuras de Marcielo

## Os Marcielos — Grupo 5

## 👨‍🎓 Integrantes:
- Gabriel Gomes Pimentel
- Tiago Brun de Arruda
- Beatriz Sofia Freitas Sena
- Fernanda Jawetz Steiner
- Vinícius da Silva Alves
- Luca do Val Scolfaro
- Cassio Reis Costa
- Leonardo Galdino Carioca Braz

## 👩‍🏫 Professores:
### Orientador(a) 
- <a href="https://www.linkedin.com/in/vanunes/">Vanessa Nunes</a>
### Instrutores
- <a href="https://www.linkedin.com/in/victorbarq/">Nome do instrutor 1</a>
- <a href="https://www.linkedin.com/in/victorbarq/">Nome do instrutor 2</a> 
- <a href="https://www.linkedin.com/in/victorbarq/">Nome do instrutor 3</a> 
- <a href="https://www.linkedin.com/in/victorbarq/">Nome do instrutor 4</a>
- <a href="https://www.linkedin.com/in/victorbarq/">Nome do instrutor 5</a> 

## 📜 Descrição

As Aventuras de Marcielo é um jogo educacional desenvolvido em Phaser 3 onde o jogador controla Marcielo, um vendedor da Cielo que percorre um mapa urbano entrando em lojas e interagindo com clientes. O objetivo é convencer os clientes a adotarem produtos Cielo (como maquininhas e serviços financeiros) respondendo corretamente a perguntas sobre vendas e argumentação. O jogo simula situações reais de atendimento de forma lúdica e gamificada, com sistema de quiz, barra de conversão e NPCs específicos para cada loja.

🎮 **Para jogar clique aqui:** [https://graduacao.pages.git.inteli.edu.br/2026-1a/t28/g05](https://graduacao.pages.git.inteli.edu.br/2026-1a/t28/g05)

## 📁 Estrutura de pastas

```
g05/
├── documents/          → documentação do projeto
│   ├── gdd.md          → Game Design Document
│   ├── other/          → documentos complementares
│   └── assets/         → imagens usadas na documentação
├── public/             → código e assets do jogo (servido pelo GitLab Pages)
│   ├── index.html
│   ├── style.css
│   ├── src/
│   │   ├── main.js
│   │   ├── cenas/      → cenas Phaser (menu, cidade, loja, tutorial)
│   │   ├── entidades/  → jogador, NPC, lojas
│   │   ├── sistemas/   → quiz (lógica, UI, perguntas)
│   │   └── utilitarios/→ estado, armazenamento, configurações
│   └── assets/
│       ├── imagens/    → fundos, lojas, itens
│       ├── sprites/    → personagens e animações
│       ├── ui/         → ícones, balões, título
│       └── sons/       → áudios (futuro)
└── README.md
```

## 🔧 Como executar o código

**Pré-requisitos:** apenas um navegador moderno (Chrome, Firefox, Edge).

**Online:** acesse diretamente pelo link acima.

**Localmente:**
```bash
# Clone o repositório
git clone https://git.inteli.edu.br/graduacao/2026-1a/t28/g05.git
cd g05

# Inicie um servidor local dentro da pasta public/
cd public
npx serve .
# ou
python3 -m http.server 8080
```
Depois acesse `http://localhost:8080` no navegador.


## 🗃 Histórico de lançamentos

* 0.5.0 - XX/XX/2026
    * Em desenvolvimento (Sprint 4)
* 0.4.0 - 16/03/2026
    * Refatoração completa da estrutura de pastas seguindo padrão do professor
    * Renomeação de arquivos JS para português
    * Correção de caminhos de imagens no GDD
    * Balões decorativos nas lojas conquistadas
* 0.3.0 - 11/03/2026
    * Novo mapa da cidade implementado
    * Nova sprite animada do jogador (Marcielo)
    * NPCs específicos para cada loja adicionados ao mapa
    * Banco de perguntas expandido para todas as lojas
    * GDD atualizado com seções 3.2, 3.3, 3.4, 3.6 e 3.7
* 0.2.0 - 13/02/2026
    * Menu inicial com design melhorado
    * Publicação no GitLab Pages configurada
    * Ajustes visuais de tamanho e remoção de fundos das imagens
* 0.1.0 - 10/02/2026
    * Estrutura base do jogo criada com Phaser 3
    * Cena de cidade com movimentação do jogador
    * Sistema de quiz básico implementado
    * GDD inicial criado com análise de mercado (Porter, SWOT)

## 📋 Licença/License

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Intelihub/Template_M1">MODELO GIT INTELI</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/Intelihub/Template_M1">Inteli, Gabriel Gomes Pimentel, Tiago Brun de Arruda, Beatriz Sofia Freitas Sena, Fernanda Jawetz Steiner, Vinícius da Silva Alves, Luca do Val Scolfaro, Cassio Reis Costa, Leonardo Galdino Carioca Braz</a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>



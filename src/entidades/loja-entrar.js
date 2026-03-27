import { carregarDados } from "../utilitarios/armazenamento.js";
import { transicionarPara } from "../utilitarios/transicao-cena.js";
// Classe responsável por representar uma porta/entrada
// que permite a transição entre cenas
export default class Entrada extends Phaser.Physics.Arcade.Sprite {

    /**
     * @param {Phaser.Scene} cena - Cena onde o objeto será criado
     * @param {number} x - Posição horizontal da entrada
     * @param {number} y - Posição vertical da entrada
     * @param {Phaser.Scene} cenaAtual - Referência da cena atual
     * @param {string} proximaCenaNome - Nome da cena para onde será feita a transição
     * @param {Phaser.Physics.Arcade.Sprite} player - Referência do jogador (Marcielo)
     */
    constructor(cena, x, y, cenaAtual, proximaCenaNome, player) { 

        // Chama o construtor da classe Sprite com física Arcade
        super(cena, x, y, 'entrada_animada', 0);

        // Armazena referências
        this.cenaAtual = cenaAtual;
        this.proximaCenaNome = proximaCenaNome;
        this.player = player; 

        // Inicializa um estado interno da porta
        this.trocaDeCenaEmAndamento = false;

        // Adiciona o sprite na cena e ativa a física
        cena.add.existing(this);
        cena.physics.add.existing(this);
        this.body.setImmovable(true);

        // Ajusta escala e pivot
        this.setScale(2.8);
        this.setOrigin(0.5, 1);

        // Cria a animação se ela ainda não existir
        if (!cena.anims.exists('abrir_porta_roll')) {
            cena.anims.create({
                key: 'abrir_porta_roll',
                // Gera os frames 0, 1, 2 da imagem 'entrada_animada'
                frames: cena.anims.generateFrameNumbers('entrada_animada', { start: 0, end: 2 }),
                frameRate: 12, // Velocidade da animação (ajuste se achar muito rápido/lento)
                repeat: 0 // Toca apenas uma vez
            });
        }
    }

    // Atualizamos o preload para carregar como spritesheet
    static preload(scene) {
        // !!! SUBSTITUA 100 E 150 PELOS TAMANHOS REAIS DO SEU QUADRO !!!
        scene.load.spritesheet('entrada_animada', 'assets/imagens/entrada.animada.png', {
            frameWidth: 49, // Largura de UM quadro (MUDE AQUI)
            frameHeight: 70 // Altura do quadro (MUDE AQUI)
        });
    }

    /**
     * Função update da própria porta: calcula distância do Marcielo e decide se abre
     */
    update() {
        /// 1. Pega o jogador diretamente da cena principal
        const jogador = this.scene.player;

        if (!jogador || this.trocaDeCenaEmAndamento) return;

        const distanciaParaAtivar = 300;
        const dist = Phaser.Math.Distance.Between(jogador.x, jogador.y, this.x, this.y);

        // 4. Lógica da Animação Corrigida
        if (dist < distanciaParaAtivar) {
            // Só manda abrir se ela ainda não estiver marcada como aberta
            if (!this.portaAberta) {
                this.play('abrir_porta_roll');
                this.portaAberta = true; // Aciona a trava!
            }
        } else {
            // Longe da porta: reseta tudo
            if (this.portaAberta) {
                this.stop();
                this.setFrame(0); // Volta pro frame zero (fechada)
                this.portaAberta = false; // Tira a trava para a próxima vez
            }
        }
        if (this.portaCentral) {
            this.portaCentral.update(); 
        }
    }
    /**
     * Realiza a troca de cena utilizando o Scene Manager do Phaser
     */
   trocarDeCena() {
        // Removido o bloqueio "if (this.trocaDeCenaEmAndamento)" daqui, 
        // porque a gente já travou o overlap lá na Cena Central!

        if (this.trocaDeCenaEmAndamento) {
            return;
        }

        const lojaBloqueada = localStorage.getItem('lojaBloqueada');

        if (lojaBloqueada === this.proximaCenaNome && this.proximaCenaNome !== 'gameScene') {
            
            const jogador = this.scene.player;
            
            if (jogador) {
                // Empurra o Marcielo para trás
                jogador.y += 30; 
                if (jogador.body) {
                    jogador.body.setVelocity(0, 0);
                }

                // CÓDIGO NOVO: Cria um aviso visual na tela!
                // Verifica se já não tem um aviso na tela para não criar vários
                if (!this.avisoNaTela) {
                    this.avisoNaTela = true;

                    // Cria o texto bonitinho flutuando acima da cabeça dele
                    const textoAviso = this.scene.add.text(jogador.x, jogador.y - 60, "Tente converter outra loja primeiro!", {
                        fontSize: '34px',
                        fontFamily: 'Arial',
                        backgroundColor: '#ff0000', // Fundo vermelho
                        color: '#ffffff',           // Letra branca
                        padding: { x: 10, y: 5 },
                        align: 'center'
                    });
                    
                    textoAviso.setOrigin(0.5); // Centraliza o texto
                    textoAviso.setDepth(9999); // Deixa na frente de tudo

                    // Faz o texto sumir sozinho depois de 2 segundos (2000 ms)
                    this.scene.time.delayedCall(3000, () => {
                        textoAviso.destroy();
                        this.avisoNaTela = false; // Libera para mostrar de novo se ele bater na porta
                    });
                }
            }
            
            return; // Interrompe aqui porque a loja tá bloqueada
        }

        // Ao voltar para o mapa principal, não reabre o tutorial automaticamente.
        if (this.proximaCenaNome === 'gameScene') {
            
            if (window.vitoriaRecente) {
            window.vitoriaRecente = false; // Resetamos para a próxima vez
            localStorage.removeItem('lojaBloqueada'); // Garante que está limpo
            this.scene.scene.start(this.proximaCenaNome, { mostrarTutorial: false });
            return;
        }

            const jaTemBloqueio = localStorage.getItem('lojaBloqueada');
            if (!jaTemBloqueio) {
                console.log("Trancando a loja atual:", this.scene.scene.key);
                localStorage.setItem('lojaBloqueada', this.scene.scene.key); 
            } else {
                console.log("Já existe um bloqueio ativo:", jaTemBloqueio, ". Não vou sobrescrever.");
            }
            
            this.scene.scene.start(this.proximaCenaNome, { mostrarTutorial: false });
            return;
        }

        this.scene.scene.start(this.proximaCenaNome);
    }}

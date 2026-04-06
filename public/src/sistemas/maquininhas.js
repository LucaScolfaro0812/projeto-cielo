
// Utilitários de persistência (localStorage com JSON e proteção de erro).
import { salvarDados, carregarDados } from "../utilitarios/armazenamento.js";

/**
 * Maquininhas - Gerencia o estoque de maquininhas do jogador.
 *
 * O jogador precisa de pelo menos 1 maquininha para iniciar uma negociação.
 * Ao conquistar um NPC, 1 maquininha é consumida.
 * O estoque pode ser recarregado até o máximo visitando a Central da Cielo.
 *
 * O valor é persistido no localStorage para sobreviver entre sessões.
 */
export class Maquininhas {

    constructor(){

    }

    // Chave usada para salvar/carregar o valor no localStorage
    static chaveDeValor = 'maquininhas';

    // Quantidade máxima de maquininhas que o jogador pode carregar
    static maximoMaquininhas = 3;

    // Carrega o valor salvo ao inicializar; usa 0 como padrão se não houver valor salvo
    static _qntMaquininhas = carregarDados(this.chaveDeValor, 0);

    /**
     * Retorna a quantidade atual de maquininhas do jogador.
     * @returns {number}
     */
    static get qntMaquininhas() {
        return this._qntMaquininhas;
    }

    /**
     * Define a quantidade de maquininhas, garantindo que fique entre 0 e o máximo.
     * Persiste o novo valor no localStorage automaticamente.
     * @param {number} valor
     */
    static set qntMaquininhas(valor) {
        // Clamp garante que o valor nunca ultrapasse 0 (mínimo) nem maximoMaquininhas (máximo)
        const v = Phaser.Math.Clamp(valor, 0, this.maximoMaquininhas);

        this._qntMaquininhas = v;
        salvarDados(this.chaveDeValor, v);
    }

    /**
     * Adiciona uma quantidade de maquininhas ao estoque atual.
     * @param {number} qnt - Quantidade a adicionar
     */
    static adicionarMaquininhas(qnt) {
        this.qntMaquininhas = this.qntMaquininhas + qnt;
    }

    /**
     * Remove uma quantidade de maquininhas do estoque atual.
     * @param {number} qnt - Quantidade a remover
     */
    static removerMaquininhas(qnt) {
        this.qntMaquininhas = this.qntMaquininhas - qnt;
    }

    /**
     * Define a quantidade de maquininhas para um valor específico.
     * Usado para recarregar na Central da Cielo ou zerar no Novo Jogo.
     * @param {number} qnt - Novo valor absoluto
     */
    static definirMaquininhas(qnt) {
        this.qntMaquininhas = qnt;
    }

    /**
     * Sincroniza o valor em memória com o que está salvo no localStorage.
     * Útil ao iniciar uma cena após uma sessão anterior.
     */
    static recarregar() {
        this._qntMaquininhas = carregarDados(this.chaveDeValor, 0);
    }
}

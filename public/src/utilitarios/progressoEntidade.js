/**
 * Modelos de progresso das entidades do jogo.
 *
 * Define as classes base para rastrear o estado de NPCs e outras entidades
 * ao longo da partida. O estado é mantido em memória e sincronizado com o
 * localStorage via utilitários externos (armazenamento.js).
 *
 * Estados possíveis de uma entidade:
 *   - 'nao-interagido' → jogador ainda não conversou com ela
 *   - 'interagido'     → jogador conversou mas não conquistou
 *   - 'conquistado'    → jogador conquistou com sucesso
 */

/**
 * Representa o progresso de qualquer entidade rastreável do jogo (NPC, loja, etc.).
 * Serve como classe base — use ProgressoNpc para entidades do tipo NPC.
 */
class ProgressoEntidade {

    /**
     * @param {string} id     - Identificador único da entidade (ex: "npc_cafeScene")
     * @param {string} nome   - Nome legível para exibição (ex: "Café")
     * @param {string} estado - Estado inicial (padrão: 'nao-interagido')
     */
    constructor(id, nome, estado = 'nao-interagido') {
        this.id = id;
        this.nome = nome;
        this.estado = estado;
    }

    /**
     * Atualiza o estado da entidade para um novo valor.
     * @param {string} novoEstado - Novo estado ('nao-interagido' | 'interagido' | 'conquistado')
     */
    atualizarEstado(novoEstado) {
        this.estado = novoEstado;
    }

    /**
     * Retorna o estado atual da entidade.
     * @returns {string}
     */
    obterEstado() {
        return this.estado;
    }
}

/**
 * Especialização de ProgressoEntidade para NPCs do jogo.
 * Herda todos os métodos da classe base e pode ser expandida
 * com comportamentos específicos de NPCs no futuro.
 */
class ProgressoNpc extends ProgressoEntidade {

    /**
     * @param {string} id     - Identificador único do NPC (ex: "npc_cafeScene")
     * @param {string} nome   - Nome da loja/NPC (ex: "Café")
     * @param {string} estado - Estado inicial (padrão: 'nao-interagido')
     */
    constructor(id, nome, estado = 'nao-interagido') {
        super(id, nome, estado);
    }

    // Métodos específicos de NPCs podem ser adicionados aqui futuramente
}

export { ProgressoEntidade, ProgressoNpc };

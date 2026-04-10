/**
 * Gerenciador de estado dos NPCs em memória.
 *
 * Mantém uma lista global (em memória) com o estado atual de cada NPC do jogo.
 * Esta lista é a fonte de verdade em tempo de execução — o localStorage é usado
 * para persistência entre sessões, mas quem consulta o estado durante o jogo
 * deve usar as funções deste módulo.
 *
 * Estados possíveis:
 *   - 'nao-interagido' → jogador ainda não abordou o NPC
 *   - 'interagido'     → jogador tentou mas não conquistou
 *   - 'conquistado'    → jogador conquistou com sucesso
 */

import { ProgressoNpc } from "./progressoEntidade.js";

/**
 * Lista global de NPCs do jogo, um por loja.
 * O id deve corresponder ao padrão usado nas texturas: "npc_<nomeLoja>Scene".
 */
const listaNpcs = [
    new ProgressoNpc("npc_cafeScene", "Café"),
    new ProgressoNpc("npc_gamesScene", "Games"),
    new ProgressoNpc("npc_belezaScene", "Beleza"),
    new ProgressoNpc("npc_roupasScene", "Roupas"),
    new ProgressoNpc("npc_petScene", "Pet"),
    new ProgressoNpc("npc_movelScene", "Móvel"),
    new ProgressoNpc("npc_frutariaScene", "Frutaria"),
    new ProgressoNpc("npc_lanchoneteScene", "Lanchonete"),
    new ProgressoNpc("npc_chocolateScene", "Chocolate"),
    new ProgressoNpc("npc_peluciaScene", "Pelúcia"),
    new ProgressoNpc("npc_autoEscolaScene", "Autoescola"),
    new ProgressoNpc("npc_joalheriaScene", "Joalheria"),
];

/**
 * Retorna a lista completa de NPCs com seus estados atuais.
 * Usado pelo HUD de progresso e pelo painel de NPCs para exibir o estado de cada um.
 * @returns {ProgressoNpc[]}
 */
function obterListaNpcs() {
    return listaNpcs;
}

/**
 * Busca um NPC pelo seu identificador único.
 * Retorna null se nenhum NPC for encontrado com o id informado.
 * @param {string} idNpc - Identificador do NPC (ex: "npc_cafeScene")
 * @returns {ProgressoNpc|null}
 */
function buscarNpcPorId(idNpc) {
    return listaNpcs.find(npc => npc.id === idNpc) || null;
}

/**
 * Atualiza o estado de um NPC e verifica se a condição de vitória foi atingida.
 *
 * Efeito colateral importante: se todos os 12 NPCs forem conquistados, esta função
 * acessa `window.game` diretamente para navegar para a cena final ('cenaFinal').
 * Isso é necessário pois esta função pode ser chamada de contextos fora de uma cena
 * Phaser (ex: callback do quiz), sem acesso ao Scene Manager normal.
 *
 * @param {string} idNpc      - Identificador do NPC a atualizar
 * @param {string} novoEstado - Novo estado ('interagido' | 'conquistado' | 'nao-interagido')
 */
function atualizarEstadoNpc(idNpc, novoEstado) {
    const npc = buscarNpcPorId(idNpc);
    if (npc) {
        npc.atualizarEstado(novoEstado);

        const quantidadeConquistados = listaNpcs.filter(npc => npc.estado === "conquistado").length;

        // Condição de vitória: todos os 12 NPCs conquistados → inicia a cena final
        if (quantidadeConquistados >= 12) {
            if (window.game && window.game.scene) {
                const cenaAtual = window.game.scene.getScenes(true)[0];
                cenaAtual.scene.start('cenaFinal');
            }
        }
    }
}

/**
 * Restaura todos os NPCs para o estado inicial ('nao-interagido').
 * Chamado ao iniciar uma nova partida para garantir que o estado em memória
 * está zerado, independentemente do que estava salvo no localStorage.
 */
function resetarEstadosNpcs() {
    listaNpcs.forEach((npc) => npc.atualizarEstado("nao-interagido"));
}

/**
 * Gera o caminho da imagem de portrait de um NPC conforme seu estado atual.
 * O arquivo de imagem deve existir em assets/sprites/npcs/ com o padrão:
 *   "{idNpc}-{estado}.png"  (ex: "npc_cafeScene-conquistado.png")
 *
 * @param {string} idNpc  - Identificador do NPC
 * @param {string} estado - Estado atual do NPC
 * @returns {string} Caminho relativo da imagem
 */
function obterCaminhoImagemNpc(idNpc, estado) {
    return `assets/sprites/npcs/${idNpc}-${estado}.png`;
}

export { obterListaNpcs, buscarNpcPorId, atualizarEstadoNpc, resetarEstadosNpcs, obterCaminhoImagemNpc };

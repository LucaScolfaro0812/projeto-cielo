import { ProgressoNpc } from "./progressoEntidade.js";

// Lista de NPCs do jogo
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

// Função para obter a lista de NPCs
function obterListaNpcs() {
    return listaNpcs;
}

// Função para buscar um NPC pelo id
function buscarNpcPorId(idNpc) {
    return listaNpcs.find(npc => npc.id === idNpc) || null;
}

// Função para atualizar o estado de um NPC
function atualizarEstadoNpc(idNpc, novoEstado) {
    const npc = buscarNpcPorId(idNpc);
    if (npc) {
        npc.atualizarEstado(novoEstado);
        
    // Conta quantos NPCs foram conquistados
    const quantidadeConquistados = listaNpcs.filter(npc => npc.estado === "conquistado").length;

    // Se chegou em 12, vai pra cena final
     if (quantidadeConquistados >= 12) {
        // pega a cena atual e muda
        if (window.game && window.game.scene) {
            const cenaAtual = window.game.scene.getScenes(true)[0];
            cenaAtual.scene.start('cenaFinal');
        }
      }
    }
}

// Restaura todos os NPCs para o estado inicial de uma nova partida.
function resetarEstadosNpcs() {
    listaNpcs.forEach((npc) => npc.atualizarEstado("nao-interagido"));
}

// Função para obter o caminho da imagem do portrait do NPC
function obterCaminhoImagemNpc(idNpc, estado) {
    // Exemplo de retorno: "assets/sprites/npcs/npc_cafeScene-interagido.png"
    return `assets/sprites/npcs/${idNpc}-${estado}.png`;
}

export { obterListaNpcs, buscarNpcPorId, atualizarEstadoNpc, resetarEstadosNpcs, obterCaminhoImagemNpc };
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
    }
}

export { obterListaNpcs, buscarNpcPorId, atualizarEstadoNpc };
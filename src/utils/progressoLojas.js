import { carregarDados } from "./storage.js";
import { chavesArmazenamento } from "./estadoJogo.js";

// Mapeia cada loja para o idNpc salvo no quiz.
// Esses ids precisam bater com o valor usado ao criar o NPC em LojaScene:
// idNpc = `npc_${this.sceneLoja}`
const mapaIdNpcPorLoja = {
    Cafe: "npc_cafeScene",
    Games: "npc_gamesScene",
    Beleza: "npc_belezaScene",
    Roupas: "npc_roupasScene",
    Pet: "npc_petScene",
    Movel: "npc_movelScene",
    Frutaria: "npc_frutariaScene",
    Lanchonete: "npc_lanchoneteScene",
    Chocolate: "npc_chocolateScene",
    Pelucia: "npc_peluciaScene",
    Autoescola: "npc_autoEscolaScene",
    Joalheria: "npc_joalheriaScene"
};

export function obterIdNpcDaLoja(nomeLoja) {
    return mapaIdNpcPorLoja[nomeLoja] ?? null;
}

export function lojaFoiConquistada(nomeLoja) {
    const idNpc = obterIdNpcDaLoja(nomeLoja);
    if (!idNpc) return false;

    const idsConquistados = carregarDados(chavesArmazenamento.npcsConquistadosIds, []);
    if (!Array.isArray(idsConquistados)) return false;

    return idsConquistados.includes(idNpc);
}
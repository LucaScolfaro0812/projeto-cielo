import { carregarDados } from "./armazenamento.js";
import { chavesArmazenamento } from "./estado-jogo.js";

/**
 * Mapeia o nome de cada loja para o ID do NPC correspondente salvo no localStorage.
 * O ID segue o padrão: npc_${nomeDaCena}, que é o mesmo usado ao criar o NPC em LojaScene.
 */
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

/**
 * Retorna o ID do NPC associado a uma loja pelo nome.
 * @param {string} nomeLoja - nome da loja (ex: "Cafe", "Games")
 * @returns {string|null} ID do NPC ou null se a loja não existir no mapa
 */
export function obterIdNpcDaLoja(nomeLoja) {
    return mapaIdNpcPorLoja[nomeLoja] ?? null;
}

/**
 * Verifica se uma loja foi conquistada pelo jogador.
 * Consulta o localStorage para checar se o ID do NPC da loja está na lista de conquistados.
 * @param {string} nomeLoja - nome da loja (ex: "Cafe", "Games")
 * @returns {boolean} true se a loja foi conquistada, false caso contrário
 */
export function lojaFoiConquistada(nomeLoja) {
    // Obtém o ID do NPC da loja — retorna false se a loja não existir no mapa
    const idNpc = obterIdNpcDaLoja(nomeLoja);
    if (!idNpc) return false;

    // Carrega a lista de IDs de NPCs já conquistados do localStorage
    const idsConquistados = carregarDados(chavesArmazenamento.npcsConquistadosIds, []);

    // Garante que o dado carregado é um array antes de verificar
    if (!Array.isArray(idsConquistados)) return false;

    // Verifica se o ID do NPC desta loja está na lista de conquistados
    return idsConquistados.includes(idNpc);
}

/**
 * Retorna as listas de lojas conquistadas e não conquistadas
 * com base no estado salvo dos NPCs.
 * A fonte de verdade continua sendo npcsConquistadosIds.
 * @returns {{ lojasConquistadas: string[], lojasNaoConquistadas: string[] }}
 */
export function obterListasLojasPorConquista() {
    const idsConquistados = carregarDados(chavesArmazenamento.npcsConquistadosIds, []);
    const idsConquistadosSet = new Set(Array.isArray(idsConquistados) ? idsConquistados : []);

    const lojasConquistadas = [];
    const lojasNaoConquistadas = [];

    Object.entries(mapaIdNpcPorLoja).forEach(([nomeLoja, idNpc]) => {
        if (idsConquistadosSet.has(idNpc)) {
            lojasConquistadas.push(nomeLoja);
        } else {
            lojasNaoConquistadas.push(nomeLoja);
        }
    });

    return { lojasConquistadas, lojasNaoConquistadas };
}

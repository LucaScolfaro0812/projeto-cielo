import { chavesArmazenamento, limparEstadoTransicaoCena } from "./estado-jogo.js";
import { resetarEstadosNpcs } from "./progresoNPCs.js";
import { Maquininhas } from "../sistemas/maquininhas.js";

function _obterChavesPersistenciaPartida() {
    return [
        chavesArmazenamento.npcsConquistadosQuantidade,
        chavesArmazenamento.npcsQuizAbertos,
        chavesArmazenamento.npcsConquistadosIds,
        chavesArmazenamento.npcsInteragidosIds,
        chavesArmazenamento.perguntasJaFeitas,
        Maquininhas.chaveDeValor
    ];
}

// Limpa dados persistidos e memória transitória para iniciar uma partida realmente nova.
export function resetarSessaoJogo() {
    _obterChavesPersistenciaPartida().forEach((chave) => {
        localStorage.removeItem(chave);
    });

    resetarEstadosNpcs();
    Maquininhas.definirMaquininhas(0);
    limparEstadoTransicaoCena();
}

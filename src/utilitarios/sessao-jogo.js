import { chavesArmazenamento, limparEstadoTransicaoCena } from "./estado-jogo.js";
import { resetarEstadosNpcs } from "./progresoNPCs.js";
import { Maquininhas } from "../sistemas/maquininhas.js";

const _valoresPadraoPersistenciaPartida = {
    [chavesArmazenamento.npcsConquistadosQuantidade]: 0,
    [chavesArmazenamento.npcsQuizAbertos]: [],
    [chavesArmazenamento.npcsConquistadosIds]: [],
    [chavesArmazenamento.npcsInteragidosIds]: [],
    [chavesArmazenamento.perguntasJaFeitas]: [],
    [Maquininhas.chaveDeValor]: 0
};

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

function _chavePossuiValorSalvoNaoPadrao(chave) {
    const valorSalvo = localStorage.getItem(chave);
    if (valorSalvo === null) return false;

    const valorPadrao = _valoresPadraoPersistenciaPartida[chave];
    if (valorPadrao === undefined) return true;

    return valorSalvo !== JSON.stringify(valorPadrao);
}

// Leitura centralizada para o menu decidir entre continuar partida ou iniciar do zero.
export function existeProgressoPartidaSalvo() {
    return _obterChavesPersistenciaPartida().some(_chavePossuiValorSalvoNaoPadrao);
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

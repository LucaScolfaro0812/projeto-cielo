import { salvarDados, carregarDados } from './armazenamento.js';

// Chave usada para salvar/carregar a pontuação no localStorage
const CHAVE_PONTOS = 'pontuacaoJogador';

// Quantidade de pontos concedida ou removida por resultado de negociação
const PONTOS_CONQUISTA = 15;

/**
 * Retorna a pontuação atual do jogador salva no localStorage.
 * Retorna 0 se ainda não houver valor salvo.
 * @returns {number}
 */
export function obterPontos() {
    return carregarDados(CHAVE_PONTOS, 0);
}

/**
 * Adiciona uma quantidade de pontos à pontuação atual e persiste no localStorage.
 * @param {number} quantidade - Pontos a adicionar
 */
export function adicionarPontos(quantidade) {
    salvarDados(CHAVE_PONTOS, obterPontos() + quantidade);
}

/**
 * Remove uma quantidade de pontos da pontuação atual e persiste no localStorage.
 * @param {number} quantidade - Pontos a remover
 */
export function removerPontos(quantidade) {
    salvarDados(CHAVE_PONTOS, obterPontos() - quantidade);
}

/**
 * Aplica a pontuação de conquista (+15) ao jogador.
 * Chamado quando o jogador vence uma negociação.
 */
export function pontosConquista() {
    adicionarPontos(PONTOS_CONQUISTA);
    console.log(`[PONTOS] +${PONTOS_CONQUISTA} (conquista) → total: ${obterPontos()}`);
}

/**
 * Aplica a penalidade de derrota (-15) ao jogador.
 * Chamado quando o jogador perde uma negociação.
 */
export function pontosDerrota() {
    removerPontos(PONTOS_CONQUISTA);
    console.log(`[PONTOS] -${PONTOS_CONQUISTA} (derrota) → total: ${obterPontos()}`);
}

import { salvarDados, carregarDados } from './armazenamento.js';

const CHAVE_PONTOS = 'pontuacaoJogador';
const PONTOS_CONQUISTA = 15;

export function obterPontos() {
    return carregarDados(CHAVE_PONTOS, 0);
}

export function adicionarPontos(quantidade) {
    salvarDados(CHAVE_PONTOS, obterPontos() + quantidade);
}

export function removerPontos(quantidade) {
    salvarDados(CHAVE_PONTOS, obterPontos() - quantidade);
}

export function pontosConquista() {
    adicionarPontos(PONTOS_CONQUISTA);
    console.log(`[PONTOS] +${PONTOS_CONQUISTA} (conquista) → total: ${obterPontos()}`);
}

export function pontosDerrota() {
    removerPontos(PONTOS_CONQUISTA);
    console.log(`[PONTOS] -${PONTOS_CONQUISTA} (derrota) → total: ${obterPontos()}`);
}
/**
 * Chaves de armazenamento usadas pelo jogo.
 *
 * Como só estamos persistindo progresso de NPC conquistado neste momento,
 * mantemos apenas uma chave específica para esse dado.
 */
export const chavesArmazenamento = {
    npcsConquistadosQuantidade: "npcsConquistadosQuantidade"
};

/**
 * Estado padrão do progresso.
 *
 * Serve como fallback seguro quando não existe dado salvo ainda.
 */
export const estadoPadraoProgresso = {
    npcsConquistadosQuantidade: 0
};

/**
 * Cria um estado inicial novo para progresso.
 *
 * Retornar um novo objeto evita acoplamento acidental com referências
 * compartilhadas em memória.
 */
export function criarEstadoProgressoInicial() {
    return { npcsConquistadosQuantidade: 0 };
}
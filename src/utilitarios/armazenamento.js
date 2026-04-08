/**
 * Utilitários globais de armazenamento.
 *
 * Ideia principal:
 * - Centralizar leitura e escrita no localStorage
 * - Sempre serializar em JSON na escrita
 * - Sempre desserializar em JSON na leitura
 * - Proteger com try/catch para não quebrar o jogo
 */
export function salvarDados(chave, valor) {
    // Bloco de escrita segura:
    // transforma o objeto em texto JSON e salva na chave informada.
    try {
        const valorSerializado = JSON.stringify(valor);

        // Evita sobrescrita desnecessária: só grava quando houve mudança real no conteúdo.
        const valorAtualSerializado = localStorage.getItem(chave);
        if (valorAtualSerializado === valorSerializado) {
            return true;
        }

        // Proteção contra regressão: não apaga progresso existente com valor vazio/padrão acidental.
        const valorEhArrayVazio = Array.isArray(valor) && valor.length === 0;
        const valorEhObjetoVazio =
            typeof valor === "object" &&
            valor !== null &&
            !Array.isArray(valor) &&
            Object.keys(valor).length === 0;

        if (
            valorAtualSerializado !== null &&
            (valor === null || valor === undefined || valorEhArrayVazio || valorEhObjetoVazio)
        ) {
            return false;
        }

        // Escrita centralizada no localStorage para toda a aplicação.
        localStorage.setItem(chave, valorSerializado);
        return true;
    } catch (erro) {
        // Se falhar (quota, valor inválido, ambiente sem storage etc.),
        // registra aviso e devolve false para sinalizar falha.
        console.warn("Storage.salvarDados erro:", erro);
        return false;
    }
}

export function carregarDados(chave, valorPadrao = null) {
    // Bloco de leitura segura:
    // tenta buscar a chave e converter de JSON para objeto JavaScript.
    try {
        const valorBruto = localStorage.getItem(chave);

        // Se a chave não existir, retorna o fallback definido por quem chamou.
        if (valorBruto === null) return valorPadrao;

        // Converte o texto salvo para objeto novamente.
        return JSON.parse(valorBruto);
    } catch (erro) {
        // Se o JSON estiver inválido, evita quebrar o fluxo
        // retornando um valor padrão seguro.
        console.warn("Storage.carregarDados erro:", erro);
        return valorPadrao;
    }
}

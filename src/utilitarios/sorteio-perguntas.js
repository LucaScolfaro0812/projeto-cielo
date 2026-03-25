/**
 * Sorteia N perguntas aleatórias de um array, sem repetições.
 * @param {Array} perguntas - Array de perguntas disponíveis.
 * @param {number} quantidade - Quantidade de perguntas a sortear.
 * @returns {Array} Array com as perguntas sorteadas.
 */
export function sortearPerguntasAleatorias(perguntas, quantidade = 3) {
    if (!Array.isArray(perguntas) || perguntas.length < quantidade) {
        throw new Error('Quantidade de perguntas insuficiente para o sorteio.');
    }
    // Cria uma cópia do array para não modificar o original
    const perguntasCopia = [...perguntas];
    // Embaralha o array usando Fisher-Yates
    for (let i = perguntasCopia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [perguntasCopia[i], perguntasCopia[j]] = [perguntasCopia[j], perguntasCopia[i]];
    }
    // Retorna as N primeiras perguntas embaralhadas
    return perguntasCopia.slice(0, quantidade);
}
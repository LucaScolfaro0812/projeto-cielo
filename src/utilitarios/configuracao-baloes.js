/**
 * Variantes de sprites de balões disponíveis no projeto.
 * Cada variante tem uma chave única (usada no Phaser) e o caminho para o arquivo de imagem.
 */
export const VariantesBaloes = {
    baloes1: {
        chave: "baloes1",
        caminho: "assets/ui/baloes/baloes-1.png"
    },
    baloes2: {
        chave: "baloes2",
        caminho: "assets/ui/baloes/baloes-2.png"
    },
    baloes3: {
        chave: "baloes3",
        caminho: "assets/ui/baloes/baloes-3.png"
    },
    baloes5: {
        chave: "baloes5",
        caminho: "assets/ui/baloes/baloes-5.png"
    }
};

/**
 * Configuração visual dos balões decorativos por loja.
 * Cada entrada define qual variante de balão usar e como posicioná-los
 * em relação à loja no mapa externo.
 *
 * Propriedades:
 * - variante: qual sprite de balão usar (deve existir em VariantesBaloes)
 * - offsetX: deslocamento horizontal em relação ao centro da loja
 * - offsetY: deslocamento vertical em relação ao centro da loja (negativo = acima)
 * - escala: tamanho do sprite (1 = tamanho original)
 * - quantidade: número de balões exibidos acima da loja
 * - espacamentoX: distância horizontal entre cada balão
 */
export const DecoracaoBaloesPorLoja = {
    Cafe:       { variante: "baloes1", offsetX: -90, offsetY: -300, escala: 0.45, quantidade: 3, espacamentoX: 120 },
    Games:      { variante: "baloes2", offsetX: -80, offsetY: -300, escala: 0.45, quantidade: 3, espacamentoX: 120 },
    Beleza:     { variante: "baloes3", offsetX: -85, offsetY: -300, escala: 0.45, quantidade: 3, espacamentoX: 120 },
    Roupas:     { variante: "baloes5", offsetX: -90, offsetY: -300, escala: 0.45, quantidade: 3, espacamentoX: 120 },
    Pet:        { variante: "baloes1", offsetX: -85, offsetY: -300, escala: 0.45, quantidade: 3, espacamentoX: 120 },
    Movel:      { variante: "baloes2", offsetX: -90, offsetY: -300, escala: 0.45, quantidade: 3, espacamentoX: 120 },
    Frutaria:   { variante: "baloes3", offsetX: -85, offsetY: -300, escala: 0.45, quantidade: 3, espacamentoX: 120 },
    Lanchonete: { variante: "baloes5", offsetX: -80, offsetY: -300, escala: 0.45, quantidade: 3, espacamentoX: 120 },
    Chocolate:  { variante: "baloes1", offsetX: -75, offsetY: -300, escala: 0.45, quantidade: 3, espacamentoX: 120 },
    Pelucia:    { variante: "baloes2", offsetX: -90, offsetY: -300, escala: 0.45, quantidade: 3, espacamentoX: 120 },
    Autoescola: { variante: "baloes3", offsetX: -95, offsetY: -300, escala: 0.45, quantidade: 3, espacamentoX: 120 },
    Joalheria:  { variante: "baloes5", offsetX: -95, offsetY: -300, escala: 0.45, quantidade: 3, espacamentoX: 120 }
};

/**
 * Retorna a configuração de balões para uma loja específica.
 * @param {string} nomeLoja - nome da loja (ex: "Cafe", "Pet")
 * @returns {object|null} configuração de balões ou null se a loja não tiver decoração
 */
export function obterDecoracaoBaloesDaLoja(nomeLoja) {
    return DecoracaoBaloesPorLoja[nomeLoja] ?? null;
}

/**
 * Cadastro central dos pontos de spawn da cidade para cada loja.
 * Quando o jogador sai de uma loja, ele reaparece na cidade
 * na posição correspondente à porta daquela loja.
 */
export const MapaSpawnCidade = {

    // Posição padrão de spawn — usada como fallback se a loja não estiver mapeada
    Padrao: { x: 1500, y: 1600 },

    // Mapa de posições de spawn por loja — cada entrada corresponde à porta da loja no mapa
    PorLoja: {
        // Lojas da fileira superior
        Cafe:       { x: 600,  y: 920  },
        Games:      { x: 1150, y: 920  },
        Beleza:     { x: 2200, y: 920  },
        Roupas:     { x: 2750, y: 920  },

        // Lojas da fileira do meio
        Pet:        { x: 600,  y: 2020 },
        Movel:      { x: 1150, y: 2020 },
        Frutaria:   { x: 2200, y: 2020 },
        Lanchonete: { x: 2750, y: 2020 },

        // Lojas da fileira inferior
        Chocolate:  { x: 600,  y: 3120 },
        Pelucia:    { x: 1150, y: 3120 },
        Autoescola: { x: 2200, y: 3320 },
        Joalheria:  { x: 2750, y: 3320 }
    }
};

/**
 * Retorna a posição de spawn na cidade para uma loja específica.
 * Se a loja não existir no mapa, retorna a posição padrão.
 * @param {string} nomeDaLoja - nome da loja (ex: "Cafe", "Pet")
 * @returns {{ x: number, y: number }} coordenadas de spawn
 */
export function obterSpawnCidadePorLoja(nomeDaLoja) {
    return MapaSpawnCidade.PorLoja[nomeDaLoja] ?? MapaSpawnCidade.Padrao;
}

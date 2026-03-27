/**
 * Cadastro central dos pontos de spawn da cidade para cada loja.
 * Quando o jogador sai de uma loja, ele reaparece na cidade
 * na posição correspondente à porta daquela loja.
 */
export const MapaSpawnCidade = {

    // Posição padrão de spawn — usada como fallback se a loja não estiver mapeada
    Padrao: { x: 5800, y: 1350 },

    // Mapa de posições de spawn por loja — cada entrada corresponde à porta da loja no mapa
    PorLoja: {
        // Lojas da fileira 1 (porta em y≈3500, spawn 125px à frente)
        Cafe:       { x: 1500,  y: 3625 },
        Games:      { x: 3175,  y: 3625 },
        Beleza:     { x: 5350,  y: 3625 },
        Roupas:     { x: 7085,  y: 3595 },
        Pet:        { x: 9200,  y: 3625 },
        Movel:      { x: 10575, y: 3625 },

        // Lojas da fileira 2 (porta em y≈5650-5700, spawn 125px à frente)
        Frutaria:   { x: 1450,  y: 5775 },
        Lanchonete: { x: 3275,  y: 5795 },
        Chocolate:  { x: 5380,  y: 5795 },
        Pelucia:    { x: 7100,  y: 5795 },
        Autoescola: { x: 9200,  y: 5825 },
        Joalheria:  { x: 10650, y: 5825 }
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

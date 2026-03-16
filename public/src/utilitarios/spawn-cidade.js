// Criar um cadastro central dos pontos de spawn da cidade para cada loja, em um único lugar.

export const MapaSpawnCidade = {
    // Define o fallback do spawn na cidade caso não exista loja válida.
    Padrao: { x: 1500, y: 1800 },

    // Cria o dicionário de spawns por loja.
    PorLoja: {
        Cafe: { x: 600, y: 920 },
        Games: { x: 1150, y: 920 },
        Beleza: { x: 2200, y: 920 },
        Roupas: { x: 2750, y: 920 },

        Pet: { x: 600, y: 2020 },
        Movel: { x: 1150, y: 2020 },
        Frutaria: { x: 2200, y: 2020 },
        Lanchonete: { x: 2750, y: 2020 },

        Chocolate: { x: 600, y: 3120 },
        Pelucia: { x: 1150, y: 3120 },
        Autoescola: { x: 2200, y: 3320 },
        Joalheria: { x: 2750, y: 3320 }
    }
};

// Cria uma função utilitária para buscar spawn por loja.

// Se a loja existir no mapa, retorna o spawn dela.
// Se não existir, retorna Padrao com operador de fallback.
export function obterSpawnCidadePorLoja(nomeDaLoja) {
    return MapaSpawnCidade.PorLoja[nomeDaLoja] ?? MapaSpawnCidade.Padrao;
}

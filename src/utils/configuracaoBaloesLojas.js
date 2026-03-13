// Variantes de sprites de baloes disponiveis no projeto.
export const VariantesBaloes = {
    baloes1: {
        chave: "baloes1",
        caminho: "assets/baloes-1.png"
    },
    baloes2: {
        chave: "baloes2",
        caminho: "assets/baloes-2.png"
    },
    baloes3: {
        chave: "baloes3",
        caminho: "assets/baloes-3.png"
    },
    baloes5: {
        chave: "baloes5",
        caminho: "assets/baloes-5.png"
    }
};

// Configuracao visual por loja para uso no mapa externo.
export const DecoracaoBaloesPorLoja = {
    Cafe: { variante: "baloes1", offsetX: -90, offsetY: -160, escala: 0.45, quantidade: 3, espacamentoX: 28 },
    Games: { variante: "baloes2", offsetX: -80, offsetY: -170, escala: 0.45, quantidade: 3, espacamentoX: 28 },
    Beleza: { variante: "baloes3", offsetX: -85, offsetY: -165, escala: 0.45, quantidade: 3, espacamentoX: 28 },
    Roupas: { variante: "baloes5", offsetX: -90, offsetY: -165, escala: 0.45, quantidade: 3, espacamentoX: 28 },
    Pet: { variante: "baloes1", offsetX: -85, offsetY: -160, escala: 0.45, quantidade: 3, espacamentoX: 28 },
    Movel: { variante: "baloes2", offsetX: -90, offsetY: -165, escala: 0.45, quantidade: 3, espacamentoX: 28 },
    Frutaria: { variante: "baloes3", offsetX: -85, offsetY: -160, escala: 0.45, quantidade: 3, espacamentoX: 28 },
    Lanchonete: { variante: "baloes5", offsetX: -80, offsetY: -165, escala: 0.45, quantidade: 3, espacamentoX: 28 },
    Chocolate: { variante: "baloes1", offsetX: -75, offsetY: -175, escala: 0.45, quantidade: 3, espacamentoX: 28 },
    Pelucia: { variante: "baloes2", offsetX: -90, offsetY: -165, escala: 0.45, quantidade: 3, espacamentoX: 28 },
    Autoescola: { variante: "baloes3", offsetX: -95, offsetY: -165, escala: 0.45, quantidade: 3, espacamentoX: 28 },
    Joalheria: { variante: "baloes5", offsetX: -95, offsetY: -170, escala: 0.45, quantidade: 3, espacamentoX: 28 }
};

export function obterDecoracaoBaloesDaLoja(nomeLoja) {
    return DecoracaoBaloesPorLoja[nomeLoja] ?? null;
}

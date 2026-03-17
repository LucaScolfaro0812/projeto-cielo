// Variantes de sprites de baloes disponiveis no projeto.
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

// Configuracao visual por loja para uso no mapa externo.
export const DecoracaoBaloesPorLoja = {
    Cafe: { variante: "baloes1", offsetX: -90, offsetY: -300, escala: 0.45, quantidade: 3, espacamentoX: 65 },
    Games: { variante: "baloes2", offsetX: -80, offsetY: -300, escala: 0.45, quantidade: 3, espacamentoX: 65 },
    Beleza: { variante: "baloes3", offsetX: -85, offsetY: -300, escala: 0.45, quantidade: 3, espacamentoX: 65 },
    Roupas: { variante: "baloes5", offsetX: -90, offsetY: -300, escala: 0.45, quantidade: 3, espacamentoX: 65 },
    Pet: { variante: "baloes1", offsetX: -85, offsetY: -300, escala: 0.45, quantidade: 3, espacamentoX: 65 },
    Movel: { variante: "baloes2", offsetX: -90, offsetY: -300, escala: 0.45, quantidade: 3, espacamentoX: 65 },
    Frutaria: { variante: "baloes3", offsetX: -85, offsetY: -300, escala: 0.45, quantidade: 3, espacamentoX: 65 },
    Lanchonete: { variante: "baloes5", offsetX: -80, offsetY: -300, escala: 0.45, quantidade: 3, espacamentoX: 65 },
    Chocolate: { variante: "baloes1", offsetX: -75, offsetY: -300, escala: 0.45, quantidade: 3, espacamentoX: 65 },
    Pelucia: { variante: "baloes2", offsetX: -90, offsetY: -300, escala: 0.45, quantidade: 3, espacamentoX: 65 },
    Autoescola: { variante: "baloes3", offsetX: -95, offsetY: -300, escala: 0.45, quantidade: 3, espacamentoX: 65 },
    Joalheria: { variante: "baloes5", offsetX: -95, offsetY: -300, escala: 0.45, quantidade: 3, espacamentoX: 45 }
};

export function obterDecoracaoBaloesDaLoja(nomeLoja) {
    return DecoracaoBaloesPorLoja[nomeLoja] ?? null;
}

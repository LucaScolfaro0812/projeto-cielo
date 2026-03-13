// Catálogo dos tipos de bancada disponíveis no jogo.
// Aqui fica a definição do sprite e do collider de cada bancada.
export const TiposBancada = {
    BancadaAutoescola: {
        ChaveSprite: 'BancadaAutoescola',
        CaminhoSprite: 'assets/lojas/interior/bancadas/BancadaAutoescola.png',
        LarguraCollider: 0,
        AlturaCollider: 0,
        OffsetColliderX: 0,
        OffsetColliderY: 0
    },
    BancadaChocolate: {
        ChaveSprite: 'BancadaChocolate',
        CaminhoSprite: 'assets/lojas/interior/bancadas/BancadaChocolate.png',
        LarguraCollider: 0,
        AlturaCollider: 0,
        OffsetColliderX: 0,
        OffsetColliderY: 0
    },
    BancadaDocesMomentos: {
        ChaveSprite: 'BancadaDocesMomentos',
        CaminhoSprite: 'assets/lojas/interior/bancadas/BancadaDocesMomentos.png',
        LarguraCollider: 0,
        AlturaCollider: 0,
        OffsetColliderX: 0,
        OffsetColliderY: 0
    },
    BancadaJoalheria: {
        ChaveSprite: 'BancadaJoalheria',
        CaminhoSprite: 'assets/lojas/interior/bancadas/BancadaJoalheria.png',
        LarguraCollider: 0,
        AlturaCollider: 0,
        OffsetColliderX: 0,
        OffsetColliderY: 0
    },
    BancadaLanchonete: {
        ChaveSprite: 'BancadaLanchonete',
        CaminhoSprite: 'assets/lojas/interior/bancadas/BancadaLanchonete.png',
        LarguraCollider: 0,
        AlturaCollider: 0,
        OffsetColliderX: 0,
        OffsetColliderY: 0
    },
    BancadaPet: {
        ChaveSprite: 'BancadaPet',
        CaminhoSprite: 'assets/lojas/interior/bancadas/BancadaPet.png',
        LarguraCollider: 0,
        AlturaCollider: 0,
        OffsetColliderX: 0,
        OffsetColliderY: 0
    }
};

// Mapeamento de quais lojas usam bancada e onde ela aparece dentro da cena.
// Preencha PosicaoX e PosicaoY quando ajustar visualmente cada interior.
export const BancadasPorLoja = {
    Autoescola: {
        TipoBancada: 'BancadaAutoescola',
        PosicaoX: 0,
        PosicaoY: 0
    },
    Chocolate: {
        TipoBancada: 'BancadaChocolate',
        PosicaoX: 0,
        PosicaoY: 0
    },
    Joalheria: {
        TipoBancada: 'BancadaJoalheria',
        PosicaoX: 0,
        PosicaoY: 0
    },
    Lanchonete: {
        TipoBancada: 'BancadaLanchonete',
        PosicaoX: 0,
        PosicaoY: 0
    },
    Pet: {
        TipoBancada: 'BancadaPet',
        PosicaoX: 0,
        PosicaoY: 0
    },
    Cafe: {
        TipoBancada: 'BancadaDocesMomentos',
        PosicaoX: 0,
        PosicaoY: 0
    }
};

export function obterTipoBancada(nomeTipoBancada) {
    return TiposBancada[nomeTipoBancada] ?? null;
}

export function obterBancadaDaLoja(nomeLoja) {
    return BancadasPorLoja[nomeLoja] ?? null;
}
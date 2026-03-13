// Catálogo dos tipos de bancada disponíveis no jogo.
// Aqui fica a definição do sprite e do collider de cada bancada.
export const TiposBancada = {
    BancadaAutoescola: {
        ChaveSprite: 'BancadaAutoescola',
        CaminhoSprite: 'assets/lojas/interior/bancadas/BancadaAutoescola.png',
        LarguraCollider: 440,
        AlturaCollider: 74,
        OffsetColliderX: 0,
        OffsetColliderY: 82
    },
    BancadaChocolate: {
        ChaveSprite: 'BancadaChocolate',
        CaminhoSprite: 'assets/lojas/interior/bancadas/BancadaChocolate.png',
        LarguraCollider: 560,
        AlturaCollider: 78,
        OffsetColliderX: 0,
        OffsetColliderY: 86
    },
    BancadaDocesMomentos: {
        ChaveSprite: 'BancadaDocesMomentos',
        CaminhoSprite: 'assets/lojas/interior/bancadas/BancadaDocesMomentos.png',
        LarguraCollider: 560,
        AlturaCollider: 78,
        OffsetColliderX: 0,
        OffsetColliderY: 86
    },
    BancadaJoalheria: {
        ChaveSprite: 'BancadaJoalheria',
        CaminhoSprite: 'assets/lojas/interior/bancadas/BancadaJoalheria.png',
        LarguraCollider: 430,
        AlturaCollider: 74,
        OffsetColliderX: 0,
        OffsetColliderY: 82
    },
    BancadaLanchonete: {
        ChaveSprite: 'BancadaLanchonete',
        CaminhoSprite: 'assets/lojas/interior/bancadas/BancadaLanchonete.png',
        LarguraCollider: 360,
        AlturaCollider: 70,
        OffsetColliderX: 0,
        OffsetColliderY: 72
    },
    BancadaPet: {
        ChaveSprite: 'BancadaPet',
        CaminhoSprite: 'assets/lojas/interior/bancadas/BancadaPet.png',
        EscalaSpriteX: 2.1,
        EscalaSpriteY: 2.1,
        LarguraCollider: 420,
        AlturaCollider: 72,
        OffsetColliderX: 0,
        OffsetColliderY: 72
    }
};

// Mapeamento de quais lojas usam bancada e onde ela aparece dentro da cena.
// Preencha PosicaoX e PosicaoY quando ajustar visualmente cada interior.
export const BancadasPorLoja = {
    Autoescola: {
        TipoBancada: 'BancadaAutoescola',
        PosicaoX: 545,
        PosicaoY: 320,
        RenderizarSprite: false
    },
    Chocolate: {
        TipoBancada: 'BancadaChocolate',
        PosicaoX: 590,
        PosicaoY: 335,
        RenderizarSprite: false
    },
    Joalheria: {
        TipoBancada: 'BancadaJoalheria',
        PosicaoX: 520,
        PosicaoY: 320,
        RenderizarSprite: false
    },
    Lanchonete: {
        TipoBancada: 'BancadaLanchonete',
        PosicaoX: 450,
        PosicaoY: 320,
        RenderizarSprite: false
    },
    Pet: {
        TipoBancada: 'BancadaPet',
        PosicaoX: 535,
        PosicaoY: 300
    },
    Cafe: {
        TipoBancada: 'BancadaDocesMomentos',
        PosicaoX: 500,
        PosicaoY: 330,
        RenderizarSprite: false
    }
};

export function obterTipoBancada(nomeTipoBancada) {
    return TiposBancada[nomeTipoBancada] ?? null;
}

export function obterBancadaDaLoja(nomeLoja) {
    return BancadasPorLoja[nomeLoja] ?? null;
}
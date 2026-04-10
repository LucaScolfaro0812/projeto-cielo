/**
 * Configuração dos objetos decorativos do interior de cada loja.
 *
 * `ObjetosInterior` é um mapa de nome da loja → lista de objetos a exibir.
 * Cada objeto da lista representa um sprite decorativo posicionado na cena interna.
 *
 * Estrutura de cada objeto:
 *   - imagem    {string}  Chave do asset já carregado no Phaser (via preload)
 *   - x         {number}  Posição horizontal na cena da loja
 *   - y         {number}  Posição vertical na cena da loja
 *   - escala    {number}  Fator de escala do sprite (1.0 = tamanho original)
 *
 * Campos opcionais (usados quando o hitbox do sprite não corresponde à área visual):
 *   - hitWidth  {number}  Largura do corpo físico de colisão (substitui o tamanho do sprite)
 *   - hitHeight {number}  Altura do corpo físico de colisão
 *   - offsetX   {number}  Deslocamento horizontal do corpo físico em relação ao sprite
 *   - offsetY   {number}  Deslocamento vertical do corpo físico em relação ao sprite
 *
 * Exemplo de uso (em cena-loja.js):
 *   const objetos = ObjetosInterior['Cafe'];
 *   objetos.forEach(obj => criarObjetoDecorativos(obj));
 */

export const ObjetosInterior = {

    'Lanchonete': [
        { imagem: 'lanchoneteBancada',     x: 690,  y: 250,  escala: 0.98 },
        { imagem: 'lanchoneteMesa',        x: 250,  y: 750,  escala: 0.45 },
        { imagem: 'lanchonetePosters',     x: 1165, y: 120,  escala: 0.28 },
        { imagem: 'lanchonetePrateleiras', x: 1380, y: 600,  escala: 0.55 }
    ],

    'Frutaria': [
        { imagem: 'frutaPrateleira',        x: 1270, y: 700,  escala: 0.45 },
        { imagem: 'frutaBancada',           x: 750,  y: 320,  escala: 1.1  },
        { imagem: 'frutaMesa',              x: 270,  y: 800,  escala: 0.3  },
        { imagem: 'frutaMelão',             x: 1300, y: 300,  escala: 0.4  },
        { imagem: 'frutaManga',             x: 1400, y: 380,  escala: 0.4  },
        { imagem: 'frutaMaçaLaranja',       x: 550,  y: 500,  escala: 0.3  },
        { imagem: 'frutaFrutaVerde',        x: 1400, y: 300,  escala: 0.4  },
        { imagem: 'frutaFrutasVermelhas',   x: 228,  y: 800,  escala: 0.3  },
        { imagem: 'frutaCestaDeFrutas',     x: 265,  y: 750,  escala: 0.3  },
        { imagem: 'frutaCaixaFrutaVermelha',x: 1300, y: 380,  escala: 0.25 },
        { imagem: 'frutaAbacaxi',           x: 298,  y: 800,  escala: 0.28 }
    ],

    'Pet': [
        { imagem: 'petshopBancada',    x: 800,  y: 350,  escala: 2.5 },
        { imagem: 'petshopAquario',    x: 1600, y: 400,  escala: 0.45 },
        { imagem: 'petshopGaiolas',    x: 1520, y: 780,  escala: 0.5  },
        { imagem: 'petshopMesa',       x: 250,  y: 700,  escala: 0.5  },
        { imagem: 'petshopPrateleiras',x: 840,  y: 840,  escala: 0.5  }
    ],

    'Cafe': [
        { imagem: 'docesMomentosBancada', x: 850,  y: 320,  escala: 0.9  },
        { imagem: 'docesMomentosMesa1',   x: 400,  y: 800,  escala: 0.42 },
        { imagem: 'docesMomentosMesa2',   x: 1250, y: 800,  escala: 0.42 },
    ],

    'Games': [
        { imagem: 'videogameBancada',        x: 740,  y: 330,  escala: 0.6 },
        { imagem: 'videogameEstante',        x: 1330, y: 600,  escala: 0.6 },
        { imagem: 'videogameFliperama1',     x: 1240, y: 252,  escala: 0.5 },
        { imagem: 'videogameFliperama2',     x: 1140, y: 250,  escala: 0.5 },
        { imagem: 'videogameFliperama3',     x: 1040, y: 250,  escala: 0.5 },
        { imagem: 'videogameFliperamaDeLado',x: 60,   y: 700,  escala: 0.5 },
        { imagem: 'videogameMesa',           x: 450,  y: 800,  escala: 0.5 },
        { imagem: 'videogameMesaNerd',       x: 1350, y: 880,  escala: 0.4 }
    ],

    'Beleza': [
        { imagem: 'salaodebelezaBancada',           x: 800,  y: 400,  escala: 0.4  },
        { imagem: 'salaodebelezaMesa',              x: 350,  y: 780,  escala: 0.7  },
        { imagem: 'salaodebelezaCadeira1',          x: 170,  y: 700,  escala: 0.55 },
        { imagem: 'salaodebelezaCadeira2',          x: 190,  y: 880,  escala: 0.55 },
        { imagem: 'salaodebelezaCadeirasCabelo',    x: 1450, y: 420,  escala: 0.5  },
        { imagem: 'salaodebelezaCadeirasCabeloCortar', x: 1450, y: 780, escala: 0.5 },
        { imagem: 'salaodebelezaToalhas',           x: 1220, y: 480,  escala: 0.4  }
    ],

    'Roupas': [
        { imagem: 'modaBancada',   x: 750,  y: 350,  escala: 0.45 },
        { imagem: 'modaMesa',      x: 830,  y: 780,  escala: 0.6  },
        { imagem: 'modaArmarios1', x: 1453, y: 350,  escala: 0.55 },
        { imagem: 'modaArmarios2', x: 1450, y: 685,  escala: 0.55 },
        { imagem: 'modaEspelho',   x: 1150, y: 250,  escala: 0.5  },
        { imagem: 'modaManiquins', x: 200,  y: 780,  escala: 0.5  },
        { imagem: 'modaSapatos',   x: 400,  y: 830,  escala: 0.3  }
    ],

    'Joalheria': [
        { imagem: 'joalheriaBancada', x: 780,  y: 350,  escala: 0.7 },
        { imagem: 'joalheriaMesa',    x: 1350, y: 750,  escala: 0.4 }
    ],

    'Pelucia': [
        { imagem: 'brinquedoBancada',  x: 800,  y: 340,  escala: 2.0  },
        { imagem: 'brinquedoEstante',  x: 1550, y: 650,  escala: 0.5  },
        { imagem: 'brinquedoLetreiro', x: 800,  y: 100,  escala: 0.45 },
        { imagem: 'brinquedoMesa',     x: 350,  y: 750,  escala: 0.35 },
        { imagem: 'brinquedoPosters',  x: 1300, y: 100,  escala: 0.25 }
    ],

    'Chocolate': [
        { imagem: 'chocolateBancada', x: 740,  y: 450,  escala: 1.3 },
        { imagem: 'chocolateMesa',    x: 1350, y: 800,  escala: 1.0 },
        { imagem: 'chocolatePlaca',   x: 780,  y: 150,  escala: 1.0 }
    ],

    'Autoescola': [
        { imagem: 'autoEscolaBancada',  x: 805,  y: 360,  escala: 0.6  },
        { imagem: 'autoEscolaBanquinho',x: 1355, y: 550,  escala: 0.35 },
        { imagem: 'autoEscolaMesa',     x: 1350, y: 700,  escala: 0.4  },
        { imagem: 'autoEscolaPlaca',    x: 795,  y: 67,   escala: 0.5  }
    ],

    'Movel': [
        { imagem: 'moveisBancada',          x: 820,  y: 400,  escala: 0.4 },
        // hitWidth/hitHeight/offsetX/offsetY ajustam o hitbox para cobrir apenas
        // a área visual do sofá, que é menor do que o sprite completo
        { imagem: 'moveisSofas',            x: 200,  y: 700,  escala: 0.6,  hitWidth: 300, hitHeight: 420, offsetX: -40, offsetY: 100 },
        { imagem: 'moveisMesa1',            x: 1400, y: 800,  escala: 0.5 },
        { imagem: 'moveisMesa2',            x: 816,  y: 800,  escala: 0.6 },
        { imagem: 'moveisCadeiras',         x: 820,  y: 800,  escala: 0.3 },
        { imagem: 'moveisPoltrona',         x: 1550, y: 450,  escala: 0.5 },
        { imagem: 'moveisImpressora',       x: 1400, y: 350,  escala: 0.5 },
        { imagem: 'moveisEstanteLuminárias',x: 1175, y: 350,  escala: 0.2 }
    ]
};

/**
 * Configuração dos colisores invisíveis para objetos do ambiente (árvores, arbustos, casas).
 *
 * Cada entrada representa um retângulo de colisão posicionado sobre uma região do mapa.
 *
 * Campos:
 *   nome → identificador para facilitar a leitura
 *   x, y → centro do retângulo no mundo
 *   w, h → largura e altura do colisor
 *
 * DICA: com debug: true no main.js os retângulos ficam visíveis em tempo real.
 * Ajuste x, y, w, h conforme necessário, depois mude debug de volta para false.
 */
export const colisoresAmbiente = [

    { nome: 'borda-topo',    x: 6040,  y: 332,  w: 10391, h: 573  },
    { nome: 'borda-esq',     x: 517,   y: 981,  w: 548,   h: 1529 },
    { nome: 'area-topo-dir', x: 827,   y: 1574, w: 1010,  h: 337  },

    { nome: '', x: 2663,  y: 1547, w: 2092, h: 352  },
    { nome: '', x: 3173,  y: 1240, w: 1072, h: 967  },
    { nome: '', x: 4614,  y: 1661, w: 1776, h: 158  },
    { nome: '', x: 7303,  y: 1652, w: 2654, h: 176  },
    { nome: '', x: 8252,  y: 1178, w: 756,  h: 1125 },
    { nome: '', x: 1538,  y: 914,  w: 1846, h: 668  },
    { nome: '', x: 4052,  y: 1028, w: 263,  h: 404  },
    { nome: '', x: 7479,  y: 1046, w: 264,  h: 404  },
    { nome: '', x: 5748,  y: 686,  w: 3410, h: 141  },
    { nome: '', x: 8850,  y: 1231, w: 264,  h: 949  },
    { nome: '', x: 9386,  y: 1644, w: 528,  h: 123  },
    { nome: '', x: 9334,  y: 1424, w: 211,  h: 211  },
    { nome: '', x: 9826,  y: 1143, w: 563,  h: 421  },
    { nome: '', x: 9342,  y: 545,  w: 826,  h: 738  },
    { nome: '', x: 10432, y: 466,  w: 756,  h: 580  },
    { nome: '', x: 10380, y: 686,  w: 861,  h: 175  },
    { nome: '', x: 10309, y: 1503, w: 474,  h: 440  },
    { nome: '', x: 10687, y: 1116, w: 316,  h: 158  },
    { nome: '', x: 9149,  y: 1108, w: 299,  h: 141  },
    { nome: '', x: 10968, y: 1644, w: 528,  h: 123  },
    { nome: '', x: 10968, y: 932,  w: 528,  h: 1547 },
    { nome: '', x: 651,   y: 3050, w: 105,  h: 1353 },
    { nome: '', x: 2373,  y: 2681, w: 3128, h: 615  },
    { nome: '', x: 3823,  y: 3050, w: 264,  h: 1319 },
    { nome: '', x: 3630,  y: 3656, w: 651,  h: 106  },
    { nome: '', x: 2250,  y: 3665, w: 1547, h: 158  },
    { nome: '', x: 853,   y: 3674, w: 755,  h: 141  },
    { nome: '', x: 2065,  y: 2989, w: 158,  h: 879  },
    { nome: '', x: 2452,  y: 2962, w: 194,  h: 896  },

    { nome: '', x: 4772,  y: 5853, w: 686,  h: 140  },
    { nome: '', x: 6161,  y: 5853, w: 1494, h: 140  },
    { nome: '', x: 5941,  y: 5441, w: 210,  h: 369  },
    { nome: '', x: 6301,  y: 5432, w: 158,  h: 351  },
    { nome: '', x: 6987,  y: 4799, w: 1529, h: 739  },
    { nome: '', x: 7681,  y: 5194, w: 176,  h: 1530 },
    { nome: '', x: 7497,  y: 5853, w: 615,  h: 176  },
    { nome: '', x: 8402,  y: 5177, w: 211,  h: 1529 },
    { nome: '', x: 8595,  y: 5862, w: 632,  h: 123  },
    { nome: '', x: 9782,  y: 5862, w: 1107, h: 158  },
    { nome: '', x: 9799,  y: 5423, w: 334,  h: 369  },
    { nome: '', x: 9694,  y: 4799, w: 2795, h: 739  },
    { nome: '', x: 11056, y: 5194, w: 106,  h: 1530 },
    { nome: '', x: 10880, y: 5880, w: 598,  h: 159  },

    { nome: '', x: 5256, y: 4799, w: 1581, h: 739  },
    { nome: '', x: 4561, y: 5194, w: 158,  h: 1530 },
    { nome: '', x: 3841, y: 5185, w: 193,  h: 1476 },
    { nome: '', x: 3656, y: 5862, w: 632,  h: 158  },
    { nome: '', x: 3111, y: 4799, w: 1512, h: 739  },
    { nome: '', x: 1327, y: 4790, w: 1740, h: 826  },
    { nome: '', x: 2065, y: 5423, w: 158,  h: 369  },
    { nome: '', x: 2452, y: 5405, w: 194,  h: 369  },
    { nome: '', x: 2268, y: 5862, w: 1547, h: 123  },
    { nome: '', x: 800,  y: 5862, w: 721,  h: 158  },
    { nome: '', x: 580,  y: 5168, w: 316,  h: 1477 },

    { nome: '', x: 6126,  y: 2734, w: 3322, h: 615  },
    { nome: '', x: 7681,  y: 3085, w: 176,  h: 1389 },
    { nome: '', x: 7462,  y: 3682, w: 615,  h: 158  },
    { nome: '', x: 6135,  y: 3656, w: 1477, h: 176  },
    { nome: '', x: 4790,  y: 3665, w: 650,  h: 88   },
    { nome: '', x: 4570,  y: 3102, w: 140,  h: 1318 },
    { nome: '', x: 8419,  y: 3076, w: 246,  h: 1371 },
    { nome: '', x: 9659,  y: 2725, w: 2725, h: 597  },
    { nome: '', x: 10951, y: 3094, w: 141,  h: 1335 },
    { nome: '', x: 10783, y: 3674, w: 580,  h: 175  },
    { nome: '', x: 9755,  y: 3656, w: 1090, h: 140  },
    { nome: '', x: 8604,  y: 3683, w: 686,  h: 123  },
    { nome: '', x: 9623,  y: 3252, w: 158,  h: 387  },
    { nome: '', x: 9913,  y: 3252, w: 176,  h: 387  },

];
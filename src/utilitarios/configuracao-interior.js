
export const ObjetosInterior = {
    'Cafe': [
        { imagem: 'lancheoneteBancada', x: 400, y: 300, escala: 0.5 },
        { imagem: 'lancheonteMesa', x: 800, y: 500, escala: 0.5 },
        { imagem: 'lancheonetePosters', x: 1200, y: 300, escala: 0.5 },
        { imagem: 'lancheonetePrateleiras', x: 1600, y: 500, escala: 0.5 }
    ],
    'Games': [
        { imagem: 'fliperama-azul', x: 200, y: 150, escala: 1.2 },
        { imagem: 'fliperama-vermelho', x: 280, y: 150, escala: 1.2 }
    ],
    'Autoescola': [
        // Adicione os objetos da autoescola aqui usando o "clique mágico" para o X e Y
    ],
    
    'Movel': [
        // A bancada de atendimento (geralmente fica perto do NPC)
        { imagem: 'moveisBancada', x: 820, y: 400, escala: 0.4 },
        
        // Um sofá para os clientes aguardarem
        { imagem: 'moveisSofas', x: 200, y: 700, escala: 0.6,  hitWidth: 300, hitHeight: 420, offsetX: -40, offsetY: 100 },
        // Uma mesa de exibição
        { imagem: 'moveisMesa1', x: 1400, y: 800, escala: 0.5 },

        { imagem: 'moveisMesa2', x: 816, y: 800, escala: 0.6 },

        { imagem: 'moveisCadeiras', x: 820, y: 800, escala: 0.3 },

        {imagem: 'moveisPoltrona', x: 1550, y: 450, escala: 0.5 }, 

        {imagem: 'moveisImpressora', x: 1400, y: 350, escala: 0.5 },

        {imagem: 'moveisEstanteLuminárias', x: 1175, y: 350, escala: 0.2 }

    ]
};
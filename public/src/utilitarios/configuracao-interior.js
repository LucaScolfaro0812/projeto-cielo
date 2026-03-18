
export const ObjetosInterior = {
    'Cafe': [
        { 
            imagem: 'mesa-cafe', // Nome da textura carregada no preload
            x: 350, 
            y: 400, 
            escala: 1,
            // (Opcional) Ajuste fino da caixa de colisão para dar efeito 3D
            hitWidth: 60, hitHeight: 30, offsetX: 0, offsetY: 20 
        },
        { imagem: 'planta-vaso', x: 100, y: 150, escala: 0.8 }
    ],
    'Games': [
        { imagem: 'fliperama-azul', x: 200, y: 150, escala: 1.2 },
        { imagem: 'fliperama-vermelho', x: 280, y: 150, escala: 1.2 }
    ],
    'Autoescola': [
        // Adicione os objetos da autoescola aqui usando o "clique mágico" para o X e Y
    ]
    // ... adicione as outras lojas conforme for montando
};
// Importação das cenas que compõem o jogo
import { menuScene } from './scenes/menuScene.js';
import { GameScene } from './scenes/gameScene.js';
import { PadariaScene } from './scenes/padariaScene.js';

// Objeto de configuração principal do jogo
var config = {

    // Define o tipo de renderização (WebGL ou Canvas automaticamente)
    type: Phaser.AUTO,

    // ID do elemento HTML onde o canvas do jogo será inserido
    parent: "game",

    // Configurações de escala e responsividade
    scale: {
        // Ajusta o jogo para caber na tela mantendo proporção
        mode: Phaser.Scale.FIT,

        // Centraliza o jogo horizontal e verticalmente
        autoCenter: Phaser.Scale.CENTER_BOTH,

        // Resolução base do jogo
        width: 1400,
        height: 720
    },

    // Configuração do sistema de física
    physics: {
        default: 'arcade', // Define o motor de física padrão

        arcade: {
            gravity: { y: 0 }, // Sem gravidade (movimento top-down)
            debug: false      // Exibe ou não os corpos físicos (útil para desenvolvimento)
        }
    },

    // Lista de cenas registradas no jogo
    scene: [menuScene, GameScene, PadariaScene]
};

// Criação da instância principal do jogo
var game = new Phaser.Game(config);

// Inicia o jogo carregando a cena de menu primeiro
game.scene.start('menuScene');
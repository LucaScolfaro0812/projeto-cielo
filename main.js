/**
 * main.js - Ponto de entrada do jogo.
 * Configura o Phaser, escala (FIT) e inicia o menu.
 */

import { menuScene } from './scenes/menuScene.js';
import { gameScene } from './scenes/gameScene.js';
import { PadariaScene } from './scenes/padariaScene.js';

var config = {
    type: Phaser.AUTO,
    parent: "game",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1400,
        height: 720
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [menuScene, gameScene, PadariaScene]
};

var game = new Phaser.Game(config);
game.scene.start('menuScene');

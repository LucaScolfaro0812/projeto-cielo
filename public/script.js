import { menuScene } from './menuScene.js';
        import { gameScene } from './gameScene.js';
        import { padariaScene } from './padariaScene.js';

        // Configuração principal do jogo Phaser
        var config = {
            type: Phaser.AUTO,
            width: 1400,
            height: 720,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: true
                }
            },
            scene: [
                menuScene,
                gameScene,
                padariaScene,
            ]
        }

        var game = new Phaser.Game(config);
        game.scene.start('menuScene');
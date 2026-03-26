// Importação das cenas que compõem o jogo
import { CenaMenu } from './cenas/cena-menu.js';
import { CenaCidade } from './cenas/cena-cidade.js';
import { CenaTutorial } from './cenas/cena-tutorial.js';
import { CenaPausa } from './cenas/cena-pause.js';
import { CenaCentral } from './cenas/cena-central-cielo.js';
import { CenaConfiguracoes } from './cenas/cena-configuracoes.js';

// Objeto de configuração principal do jogo
var config = {

    // Define o tipo de renderização (WebGL ou Canvas automaticamente)
    type: Phaser.AUTO,

    // Mantém o visual pixelado (sem borrão) ao ampliar sprites pixel art
    pixelArt: true,

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
        default: 'arcade',

        arcade: {
            gravity: { y: 0 }, // Sem gravidade (movimento top-down)
            debug: false
        }
    },

    // Lista de cenas registradas no jogo
    scene: [CenaMenu, CenaTutorial, CenaCidade, CenaPausa, CenaConfiguracoes, CenaCentral]
};

// Criação da instância principal do jogo
var game = new Phaser.Game(config);

// Inicia o jogo carregando a cena de menu primeiro
game.scene.start('menuScene');

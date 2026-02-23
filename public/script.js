// Configuração principal do jogo Phaser
var config = {
    type: Phaser.AUTO,
    // Define se o Phaser usará WebGL ou Canvas automaticamente

    width: 1400,
    // Largura da tela do jogo

    height: 720,
    // Altura da tela do jogo

    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0},
        debug: true
      }
    },

    scene: [
        menuScene,
        gameScene,
        padariaScene,
    ]
}

// Cria o jogo usando as configurações acima
var game = new Phaser.Game(config);
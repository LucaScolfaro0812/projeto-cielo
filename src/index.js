var config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,

    scene: {
        preload: preload,
        create: create,
        update: update
    }
}


var game = new Phaser.Game(config);
let inp;
let player;
let inputX = 0;
let inputY = 0;
let speed = 2.5;

function moveX(x){
    inputX = x * speed;
}
function moveY(y){
    inputY = y * speed;
}

function preload(){
    this.load.image('rua', '../assets/rua.png');
    this.load.image('npc', '../assets/Npc.png');
    this.load.image('player', '../assets/Marcielo.png');

    this.input.keyboard.on('keydown', 
    function (event) {
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.D) {
            moveX(1);
        }
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.A) {
            moveX(-1);
        }
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.W) {
            moveY(-1);
        }
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.S) {
            moveY(1);
        }

    });
    
    this.input.keyboard.on('keyup', 
    function (event) {
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.D) {
            moveX(0);
        }
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.A) {
            moveX(0);
        }
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.W) {
            moveY(0);
        }
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.S) {
            moveY(0);
        }
    });

}

function create(){
    this.add.image(config.width, config.height, 'rua').setPosition(config.width/2, config.height/2).setScale(4);
    this.add.image(50, 50, 'npc').setPosition(config.width/2, config.height/2).setScale(0.1);
    this.player = this.add.image(50, 50, 'player').setScale(0.1);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(0.75);
}

function update(){
    this.player.x += inputX;
    this.player.y += inputY;
}





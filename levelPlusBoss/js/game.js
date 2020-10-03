var config = {
  type: Phaser.AUTO,
  width: window.innerWidth, //640
  height: window.innerHeight, //360
  physics: { //needed for physics to work in game
    default: 'arcade',
    arcade: {
        gravity: { y: 0 },
        debug: false
      }
  },
  scene: [BossScene]
}

var game = new Phaser.Game(config);

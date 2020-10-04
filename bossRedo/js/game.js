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

var player = {
  speed: 10,
  health: 100,
  isAlive: true,
  healthPercent: 0,
  healthBar: 0,

  check: function()
  {
    console.log("this is the function inside the player");
  },
}

//should also add an enemy object

var game = new Phaser.Game(config);

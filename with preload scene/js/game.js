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
  scene: [PreloadScene,BossScene]
}
var player = {
  speed: 10,
  health: 100,
  isAlive: true,
  healthPercent: 100,
  healthBar: 0,

  check: function()
  {
    console.log("this is the function inside the player");
    console.log(player);
  },
}

var boss = {
  speed: 2,
  health: 100,
  minX: 6630,
  isAlive: true,
  healthPercent: 100,
  healthBar: 0,

  check: function() {
    console.log("this is the function inside the boss");
    console.log(boss);
  }
}
var difficulty = 1;

var game = new Phaser.Game(config);

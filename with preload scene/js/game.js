
var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width: window.innerWidth, //640 1400 window.innerWidth //1360
  height: window.innerHeight, //360 600 window.innerHeight /600
  dom: {
    createContainer: true
  },
  physics: { //needed for physics to work in game
    default: 'arcade',
    arcade: {
        gravity: { y: 0 },
        debug: false
      }
  },

  scene: [PreloadScene, MainMenu, Tutorial, BossScene, CodeScene, InfiniteScene, PauseScene, WinScene, LoseScene, Credits, IMintroScene]
}

var player = {
  speed: 10,
  health: 100,
  isAlive: true,
  healthPercent: 100,
  healthBar: 0,
  shielded: false,
  multishot: false,
  pierce: false,
  trap: false,
  haste: 0,
  canMultishotAgain: false,
  canPierceAgain: false,
  canTrapAgain: false,
  canHealAgain: false,
  canDashAgain: false,
  canHasteAgain: false,
  mCD: 0,
  pCD: 0,
  tCD: 0,
  check: function()
  {
    console.log("this is the function inside the player");
    console.log(player);
  },
}

var tutorialboss = {
  speed: 2,
  health: 100,
  minX: 6700,
  isAlive: true,
  healthPercent: 100,
  healthBar: 0,
    check: function() {
    console.log("this is the function inside the tutorialboss");
    console.log(tutorialboss);
  }
}

var boss = {
  speed: 2,
  health: 100,
  minX: 6700,
  isAlive: true,
  healthPercent: 100,
  healthBar: 0,

  check: function() {
    console.log("this is the function inside the boss");
    console.log(boss);
  }
}

var difficulty = 1;
var infiniteMode = false;
var firstLevel = false;
var tutorialScenePaused = false;
var bossScenePaused = false;
var infiniteScenePaused = false;
var switchScene = false;
var bossNumber = 0;
var theme;
var tutorialtheme;
var currentBackground;

var game = new Phaser.Game(config);

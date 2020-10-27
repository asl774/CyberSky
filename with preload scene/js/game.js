
var config = {
  type: Phaser.AUTO,
  width: window.innerWidth, //640 1400 window.innerWidth
  height: 800, //360 600 window.innerHeight
  physics: { //needed for physics to work in game
    default: 'arcade',
    arcade: {
        gravity: { y: 0 },
        debug: false
      }
  },
  scene: [PreloadScene, MainMenu, Tutorial, BossScene, InfiniteScene, PauseScene, WinScene, LoseScene, Credits]
}
var tutorialplayer = {
  speed: 10,
  health: 100,
  isAlive: true,
  healthPercent: 100,
  healthBar: 0,
  haste: 0,
  sheilded: false,
  multishot: false,
  pierce: false,
  trap: false,
  canMultishotAgain: false,
  canPierceAgain: false,
  canTrapAgain: false,
  //kaboom: false,
  check: function()
  {
    console.log("this is the function inside the tutorialplayer");
    console.log(tutorialplayer);
  },
}

var player = {
  speed: 10,
  health: 100,
  isAlive: true,
  healthPercent: 100,
  healthBar: 0,
  sheilded: false,
  multishot: false,
  pierce: false,
  trap: false,
  haste: 0,
  canMultishotAgain: false,
  canPierceAgain: false,
  canTrapAgain: false,
  canHealAgain: false,
  canDashAgain: false,
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
var gamePaused = false;
var bossNumber = 0;

var game = new Phaser.Game(config);

// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');


// some parameters for our scene
gameScene.init = function() {
  this.playerSpeed = 3;
  this.enemySpeed = 2;
  this.enemyMaxY = 490; //280
  this.enemyMinY = 105;  //80
  this.enemyMaxX = 790; //280
  this.enemyMinX = 10;  //80
  this.bossSpeed = 2;
  this.bossHP = 3;
  this.bossMinX = 1030; //-250 for offscreen leftside
  this.bossAlive = true;
  this.startBoss = false;
  this.numEnemiesLeft = 2;
  this.enemyKilled = false;
}

// load asset files for our game
gameScene.preload = function() {

  // load images
  this.load.image('background', 'assets/background4.png');
  this.load.image('player', 'assets/player.png');
  this.load.image('dragon', 'assets/dragon.png');
  this.load.image('treasure', 'assets/treasure.png');

  this.load.image('ninja', 'assets/blockninja.png');
  this.load.image('enemy', 'assets/blockninja2.png');
  this.load.image('star', 'assets/ninjastar3.png');
  this.load.image('starbig', 'assets/ninjastar.png');  
  this.load.image('boss', 'assets/boss.png');  
};

// executed once, after assets were loaded
gameScene.create = function() {



  // background
  let bg = this.add.sprite(0, 0, 'background');

  // change origin to the top-left of the sprite
  bg.setOrigin(0, 0);

  //let healthBar=this.makeBar(140,100,0x2ecc71);
  //this.setValue(healthBar,100);


  healthBar = this.makeBar(0,0,0xe74c3c);
  this.setValue(healthBar,100);
  healthBar.setVisible(false);
  healthPercent = 100;

  //let magicBar=this.makeBar(140,300,0x2980b9);
  //this.setValue(magicBar,33);

  // player
  this.player = this.add.sprite(20, this.sys.game.config.height / 2, 'ninja');

  // scale down
  this.player.setScale(0.5);

  // goal
  this.treasure = this.add.sprite(this.sys.game.config.width - 20, this.sys.game.config.height / 2, 'treasure');
  this.treasure.setScale(0.6);

  // group of enemies
  /*
  this.enemies = this.add.group({
    key: 'enemy',
    repeat: 7,
    setXY: {
      x: 700,
      y: 120,
      stepX: 0,
      stepY: 50
    }
  });
  */

  this.boss = this.add.sprite(1550, 300, 'boss');
  this.boss.setVisible(false);

  // scale enemies
  //Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);

  // set speeds
  /*
  Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
    enemy.speed = 2;
  }, this);
  */

  // player is alive
  this.isPlayerAlive = true;

  // reset camera
  this.cameras.main.resetFX();

  //create keyboard keys
  cursors = game.input.keyboard.createCursorKeys();


};

gameScene.makeBar = function (x, y,color) {
    //draw the bar
    let bar = this.add.graphics();

    //color the bar
    bar.fillStyle(color, 1);

    //fill the bar with a rectangle
    bar.fillRect(0, 0, 1280, 30);
    
    //position the bar
    bar.x = x;
    bar.y = y;

    //return the bar
    return bar;
}
gameScene.setValue = function (bar,percentage) {
    //scale the bar
    bar.scaleX = percentage/100;
}


// executed on every frame (60 times per second)
gameScene.update = function() {

  // only if the player is alive
  if (!this.isPlayerAlive) {
    return;
  }

  // check for active input
  if (this.input.activePointer.isDown || cursors.right.isDown) {

    // player walks
    this.player.x += this.playerSpeed;
  }

  else if (cursors.left.isDown){
    this.player.x -= this.playerSpeed;
  }

  if (cursors.up.isDown) {
    this.player.y -= this.playerSpeed;
  }

  else if (cursors.down.isDown){
    this.player.y += this.playerSpeed;
  }


  // treasure collision
  if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())) {
    this.gameOver();
  }

  // enemy movement and collision
  //let enemies = this.enemies.getChildren();
  //let numEnemies = enemies.length;

/*
  for (let i = 0; i < numEnemies; i++) {

    // move enemies
    enemies[i].x -= enemies[i].speed;

    // reverse movement if reached the edges
    if (enemies[i].x >= this.enemyMaxX) {
      //enemies[i].speed *= 1.1;
    } else if (enemies[i].x <= this.enemyMinX) {
      enemies[i].x = 800;
    }

    // enemy collision
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemies[i].getBounds())) {
      //this.gameOver();
      enemies[i].setActive(false);
      enemies[i].setVisible(false);
      //break;
    }
  }
*/
  if (this.player.x + 17 > 400) {
    this.startBoss = true;
  }

  if (this.startBoss){
    //this.startBoss = false;
    healthBar.setVisible(true);
    this.boss.setVisible(true);
    this.boss.x -= this.bossSpeed;
  }

  if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.boss.getBounds()) && this.bossAlive) {
    healthPercent -= 33.33;
    this.setValue(healthBar, healthPercent);
    this.cameras.main.shake(400, 0.01); //duration, intensity
    this.bossHP -= 1;
    
    this.boss.x = 1550;
  }

  if (this.bossHP <= 0) {
    this.bossAlive = false;
    this.boss.setActive(false);
    this.boss.setVisible(false);
  }

  if (this.boss.x <= this.bossMinX) {
    this.bossSpeed = 0;
      //this.boss.x = 1550;
    }

};

gameScene.gameOver = function() {

  // flag to set player is dead
  this.isPlayerAlive = false;

  // shake the camera
  this.cameras.main.shake(500);

  // fade camera
  this.time.delayedCall(250, function() {
    this.cameras.main.fade(250);
  }, [], this);

  // restart game
  this.time.delayedCall(500, function() {
    this.scene.restart();
  }, [], this);
};

var healthBar;
var healthPercent = 100;

// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 1280, //640
  height: 600, //360
  scene: gameScene
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);

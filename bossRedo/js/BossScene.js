class BossScene extends Phaser.Scene{
  constructor(){
    super("bossScene");
  }

  init()
  {
    this.playerSpeed = 10;
    this.playerHP;
    this.enemySpeed = 2;
    this.enemyMaxY = 490; //280
    this.enemyMinY = 105;  //80
    this.enemyMaxX = 790; //280
    this.enemyMinX = 10;  //80
    this.bossSpeed = 2;
    this.bossHP = 100;
    this.bossMinX = 1030; //-250 for offscreen leftside
    this.bossAlive = true;
    this.startBoss = false;
    this.numEnemiesLeft = 2;
    this.enemyKilled = false;
    this.text = "";
    this.timer;
    this.ability1;
    this.ability2;
    this.ability3;
    this.playerbullets;
  }

  preload()
  {
    // load images
    this.load.image('background', 'assets/background5.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('dragon', 'assets/dragon.png');
    this.load.image('treasure', 'assets/treasure.png');

    this.load.image('ninja', 'assets/blockninja.png');
    this.load.image('enemy', 'assets/blockninja2.png');
    this.load.image('star', 'assets/ninjastar3.png');
    this.load.image('starbig', 'assets/ninjastar.png');
    this.load.image('boss', 'assets/boss.png');

    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('laser', 'assets/laser.png');

    this.load.setPath('assets');
    this.load.audio('ability1', [ 'fireball1.mp3' ]);
    this.load.audio('ability2', [ 'laser.mp3' ]);
    this.load.audio('ability3', [ 'stomp.mp3' ]);
    this.load.audio('dinogrowl', [ 'dinogrowl.mp3' ]);
    this.load.audio('throwstar', [ 'throwstar.mp3' ]);
    this.load.audio('teleport', [ 'teleport.mp3' ]);
    this.load.audio('throwtriplestar', [ 'throwtriplestar2.mp3' ]);  
    this.load.audio('throwbigstar', [ 'throwbigstar.mp3' ]);
  }

  create()
  {
    //audio
    this.ability1 = this.sound.add('ability1', {volume: 0.5});
    this.ability2 = this.sound.add('ability2', {volume: 0.5});
    this.ability3 = this.sound.add('ability3');
    this.dinogrowl = this.sound.add('dinogrowl');
    this.throwstar = this.sound.add('throwstar');
    this.teleport = this.sound.add('teleport');
    this.throwtriplestar = this.sound.add('throwtriplestar');
    this.throwbigstar = this.sound.add('throwbigstar');
    // background
    this.add.sprite(0, 0, 'background').setOrigin(0,0);
    //boss health bar
    this.bossHealthBar = this.makeBar(0,0,0xe74c3c);
    this.setValue(this.bossHealthBar,100);
    this.bossHealthBar.setVisible(false);
    this.bossHealthPercent = 100;
    // player
    this.player = this.physics.add.sprite(20, this.sys.game.config.height / 2, 'ninja');
    this.player.setScale(0.5);
    this.player.setCollideWorldBounds(true); //can't run off screen
    this.playerHP = 100;
    this.isPlayerAlive = true;
    this.playerHealthBar = this.makeBar(0,this.sys.game.config.height - 30,0x2ecc71);
    this.setValue(this.playerHealthBar,100);
    this.playerHealthBar.setVisible(true);
    this.playerHealthPercent = 100;
    this.playerbullets = this.physics.add.group(); //create stars
    this.playerbigbullets = this.physics.add.group(); //create stars
    // goal / end of level
    this.treasure = this.physics.add.sprite(this.sys.game.config.width - 20, this.sys.game.config.height / 2, 'treasure');
    this.treasure.setScale(0.6);
    //boss
    this.boss = this.physics.add.sprite(1550, 300, 'boss');
    this.boss.setVisible(false);
    this.bullets = this.physics.add.group(); //create attack 1
    this.laser = this.physics.add.group(); // create attack 2
    //colliders / triggers
    this.physics.add.overlap(this.player, this.bullets, this.getHit, null, this); //trigger b/w player & bullets
    this.physics.add.overlap(this.player, this.laser, this.dot, null, this); //trigger b/w player & laser
    this.physics.add.overlap(this.player, this.treasure, this.gameOver, null, this); //trigger b/w player & treasure
    this.physics.add.overlap(this.player, this.boss, this.hitPlayer, null, this); //trigger b/w player & boss
    this.physics.add.overlap(this.boss, this.playerbullets, this.collide, null, this); //trigger b/w playerbullets & boss
    this.physics.add.overlap(this.boss, this.playerbigbullets, this.pierce, null, this); //trigger b/w playerbullets & boss
    //camera
    this.cameras.main.resetFX(); //reset cameras
    //keyboard input
    //create keyboard keys
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.zkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.xkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    this.ckey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    //timer testing
    this.timer = this.time.addEvent({delay : 5000, callback: this.pickAbility, callbackScope: this, loop: true, paused: true });
    this.timer2 = this.time.addEvent({delay : 5000, callback: this.abilityThree, callbackScope: this, loop: true, paused: true });

    //debugging / things to remove later
    this.timerText = this.add.text(400, 100, "got here", { fontSize: '20px', fill: '#FFFFFF', align: "center" });
    this.text = this.add.text(200,200,"");
  }

  update()
  {
    this.timerText.setText("timer progress: " + this.timer.getProgress().toString().substr(0,4));
    //check if player is alive
    if (!this.isPlayerAlive) {
      return;
    }
    // check for active input
    if (this.cursors.right.isDown) {
      // player walks
      this.player.x += this.playerSpeed;
    } else if (this.cursors.left.isDown) {
      this.player.x -= this.playerSpeed;
    }
    if (this.cursors.up.isDown) {
      this.player.y -= this.playerSpeed;
    } else if (this.cursors.down.isDown){
      this.player.y += this.playerSpeed;
    }

    if (this.player.x + 17 > 400) {
      this.startBoss = true;
    }
    if (this.startBoss){
      this.bossHealthBar.setVisible(true);
      this.boss.setVisible(true);
      this.boss.x -= this.bossSpeed;
      this.timer.paused = false;
    }
    if (this.boss.x <= this.bossMinX) {
      this.bossSpeed = 0;
      this.boss.setCollideWorldBounds(true);
    }
    if (this.bossHP <= 0) {
      this.bossAlive = false;
      this.boss.disableBody(true, true);
      this.boss.setActive(false);
      this.boss.setVisible(false);
      this.timer.paused = true;
    }
    //ability three
    if (this.timer.getProgress().toString().substr(0,4) < 0.4){
      if (this.timer2.getProgress().toString().substr(0,4) >= 0.05 && this.timer2.getProgress().toString().substr(0,4) <= 0.25){
        this.physics.moveToObject(this.boss, this.player, 700);
      }
      else if (this.timer2.getProgress().toString().substr(0,4) > 0.25 && this.timer2.getProgress().toString().substr(0,4) <= 0.5){
        this.physics.moveToObject(this.boss, this.treasure, 700);
      }
    }
    //press spacebar to throw star
    if (Phaser.Input.Keyboard.JustDown(this.spacebar))
    {
      this.throwstar.play();
      let playerx = this.player.x;
      let playery = this.player.y;
      let pbullet = this.playerbullets.create(playerx, playery, 'star');
      pbullet.setVelocityX(800);
    }
    //press z key to throw 3 stars
    else if (Phaser.Input.Keyboard.JustDown(this.zkey))
    {
      this.throwtriplestar.play();
      let playerx = this.player.x;
      let playery = this.player.y;
      let pbullet1 = this.playerbullets.create(playerx, playery - 25, 'star');
      let pbullet2 = this.playerbullets.create(playerx, playery, 'star');
      let pbullet3 = this.playerbullets.create(playerx, playery + 25, 'star');
      pbullet1.setVelocityX(800);
      pbullet1.setVelocityY(-100);
      pbullet2.setVelocityX(800);
      pbullet3.setVelocityX(800);
      pbullet3.setVelocityY(100);
    }
    //press x key to throw big piercing star
    else if (Phaser.Input.Keyboard.JustDown(this.xkey))
    {
      this.throwbigstar.play();
      let playerx = this.player.x;
      let playery = this.player.y;
      let pbullet = this.playerbigbullets.create(playerx, playery, 'starbig');
      pbullet.setVelocityX(800);
    }
    //press c key to teleport 100 pixels in direction of arrow key
    else if (Phaser.Input.Keyboard.JustDown(this.ckey))
    {
      this.teleport.play();
      if (this.cursors.right.isDown){
        this.player.x += 100;
      }
      else if (this.cursors.left.isDown){
        this.player.x -= 100;
      }
      else if (this.cursors.up.isDown){
        this.player.y -= 100;
      }
      else if (this.cursors.down.isDown){
        this.player.y += 100;
      }
    }
  }

  makeBar(x, y, color){
    //draw the bar
    let bar = this.add.graphics();
    //color the bar
    bar.fillStyle(color, 1);
    //fill the bar with a rectangle
    bar.fillRect(0, 0, this.sys.game.config.width, 30);
    //position the bar
    bar.x = x;
    bar.y = y;
    //return the bar
    return bar;
  }

  setValue(bar, percentage){
    //scale the bar
    bar.scaleX = percentage/100;
  }

  pickAbility()
  {
    var ability = Math.floor(Math.random() * 3) + 1;
    this.text.setText("Boss is using ability: " + ability);
    this.useAbility(ability);
  }

  useAbility(ability){
    if(ability == 1)
    {
      this.abilityOne();
    } else if (ability == 2)
    {
      this.abilityTwo();
    } else {
      this.abilityThree();
    }
  }

  abilityOne() {
    this.ability1.play();
    console.log("using ability one");
    this.timer2.paused = true;
    this.ability3.setMute(true);
    for(let i = 0; i < 4; i++)
    {
      let x = this.boss.x;
      let y = Phaser.Math.Between(this.boss.y - 200, this.boss.y + 200); //can and should randomize this

      let bullet = this.bullets.create(x, y, 'bullet');
      bullet.setVelocityX(Phaser.Math.Between(-100,-200));
    }
  }

  abilityTwo(){
    this.ability2.play();
    console.log("using ability two");
    this.timer2.paused = true;
    this.ability3.setMute(true);
    let x = Phaser.Math.Between(0, this.boss.x - 20);
    let y = 0;
    let laser = this.laser.create(x, y, 'laser');
    laser.setVelocityY(260);
  }

  abilityThree() {
    this.ability3.play();
    console.log("using ability three");
    this.timer2.paused = false;
    this.ability3.setMute(false);
  }

  getHit(player, bullet)
  {
    bullet.disableBody(true,true);
    this.playerHP -= 20;
    this.playerHealthPercent -= 20;
    this.setValue(this.playerHealthBar, this.playerHealthPercent);
    if(this.playerHP <= 0) //things can happen, be safe and less than 0
    {
      this.gameOver();
    }
    console.log("player health is : " + this.playerHP);
  }

  dot(player, laser) {
    if (this.player.x >= 200){
      this.playerHP -= 30;
      this.playerHealthPercent -= 30;
      this.setValue(this.playerHealthBar, this.playerHealthPercent);
      this.player.x = this.player.x - 150;
      this.player.tint = Math.random() * 0xffffff;
      this.cameras.main.shake(300);
      console.log("player health is : " + this.playerHP);
    }
    else{
      this.playerHP -= 30;
      this.playerHealthPercent -= 30;
      this.setValue(this.playerHealthBar, this.playerHealthPercent);
      this.player.x = this.player.x + 200;
      this.laser.tint = Math.random() * 0xffffff;
      this.cameras.main.shake(300);
      console.log("player health is : " + this.playerHP);
    }
    if (this.playerHP <= 0){
      this.gameOver();
    }
  }

  hitPlayer(player, boss)
  {
    this.playerHealthPercent -= 1;
    this.setValue(this.playerHealthBar, this.playerHealthPercent);
    this.cameras.main.shake(400, 0.01); //duration, intensity
    this.playerHP -= 1;
    if(this.playerHP <= 0) //things can happen, be safe and less than 0
    {
      this.gameOver();
    }
    console.log("player health is : " + this.playerHP);
  }

  hitBoss(player, boss)
  {
    this.bossHealthPercent -= 33.33;
    this.setValue(this.bossHealthBar, this.bossHealthPercent);
    this.cameras.main.shake(400, 0.01); //duration, intensity
    this.bossHP -= 1;
    this.boss.x = 1550;
    this.bossSpeed = 2;
  }

  collide (boss, pbullet)
  {
    pbullet.disableBody(true,true);
    this.bossHealthPercent -= 1;
    this.bossHP -= 1;
    this.setValue(this.bossHealthBar, this.bossHealthPercent);
    //this.cameras.main.shake(400, 0.01); //duration, intensity
  }

  pierce (boss, pbullet)
  {
    this.bossHealthPercent -= 0.1;
    this.bossHP -= 0.1;
    this.setValue(this.bossHealthBar, this.bossHealthPercent);
  }

  gameOver()
  {
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
  }

}

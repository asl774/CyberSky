class BossScene extends Phaser.Scene{
  constructor(){
    super("bossScene");
  }

  init()
  {
    this.playerSpeed = 10;
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
    this.text = "";
    this.timer;
  }

  preload()
  {
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

    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('laser', 'assets/laser.png');
  }

  create()
  {
    // background
    this.add.sprite(0, 0, 'background').setOrigin(0,0);
    //boss health bar
    this.healthBar = this.makeBar(0,0,0xe74c3c);
    this.setValue(this.healthBar,100);
    this.healthBar.setVisible(false);
    this.healthPercent = 100;
    // player
    this.player = this.physics.add.sprite(20, this.sys.game.config.height / 2, 'ninja');
    this.player.setScale(0.5);
    this.player.setCollideWorldBounds(true); //can't run off screen
    this.playerHP = 100;
    this.isPlayerAlive = true;
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
    this.physics.add.overlap(this.player, this.laser, this.getHitLaser, null, this); //trigger b/w player & laser
    this.physics.add.overlap(this.player, this.treasure, this.gameOver, null, this); //trigger b/w player & treasure
    this.physics.add.overlap(this.player, this.boss, this.hitBoss, null, this); //trigger b/w player & boss
    //camera
    this.cameras.main.resetFX(); //reset cameras
    //keyboard input
    //create keyboard keys
    this.cursors = this.input.keyboard.createCursorKeys();
    //timer testing
    this.timer = this.time.addEvent({delay : 5000, callback: this.pickAbility, callbackScope: this, loop: true, paused: true });
    this.timer2 = this.time.addEvent({delay : 2500, callback: this.pickAbility, callbackScope: this, loop: true, paused: true });

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
      this.healthBar.setVisible(true);
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
      this.boss.setActive(false);
      this.boss.setVisible(false);
      this.timer.paused = true;
    }
    //ability three
    if (this.timer2.getProgress().toString().substr(0,4) >= 0.1 && this.timer2.getProgress().toString().substr(0,4) <= 0.4){
      this.physics.moveToObject(this.boss, this.player, 700);
    }
    else if (this.timer2.getProgress().toString().substr(0,4) > 0.4 && this.timer2.getProgress().toString().substr(0,4) <= 1.0){
      this.physics.moveToObject(this.boss, this.treasure, 700);
    }
  }

  makeBar(x, y, color){
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
    console.log("using ability one");
    this.timer2.paused = true;
    for(let i = 0; i < 4; i++)
    {
      let x = this.boss.x;
      let y = Phaser.Math.Between(this.boss.y - 200, this.boss.y + 200); //can and should randomize this

      let bullet = this.bullets.create(x, y, 'bullet');
      bullet.setVelocityX(Phaser.Math.Between(-100,-200));
    }
  }

  abilityTwo(){
    console.log("using ability two");
    this.timer2.paused = true;
    let x = Phaser.Math.Between(0, this.boss.x - 20);
    let y = 0;
    let laser = this.laser.create(x, y, 'laser');
    laser.setVelocityY(260);
  }

  abilityThree() {
    console.log("using ability three");
    this.timer2.paused = false;
  }

  getHit(player, bullet)
  {
    bullet.disableBody(true,true);
    this.playerHP -= 20;
    if(this.playerHP <= 0) //things can happen, be safe and less than 0
    {
      this.gameOver();
    }
    console.log("player health is : " + this.playerHP);
  }

  getHitLaser(player,laser)
  {
    laser.disableBody(true,true);
    this.playerHP -= 50;
    if(this.playerHP <= 0) //things can happen, be safe and less than 0
    {
      this.gameOver();
    }
    console.log("player health is : " + this.playerHP);
  }

  hitBoss(player, boss)
  {
    this.healthPercent -= 33.33;
    this.setValue(this.healthBar, this.healthPercent);
    this.cameras.main.shake(400, 0.01); //duration, intensity
    this.bossHP -= 1;
    this.boss.x = 1550;
    this.bossSpeed = 2;
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

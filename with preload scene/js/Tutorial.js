class Tutorial extends Phaser.Scene{
  constructor(){
    super("tutorial");
  }

  init()
  {
    this.enemiesWave1;
    this.enemiesWave2;
    this.enemiesWave3;
    this.numEnemiesKilled = 0;
    this.enemySpeed = 2;
    this.enemyMaxY = 600; //280 490
    this.enemyMinY = 0;  //80 105
    this.enemyMaxX = 790; //280
    this.enemyMinX = 10;  //80
    this.startBoss = false;
    this.numEnemiesLeft = 2;
    this.enemyKilled = false;
    this.text = "";
    this.timer;
    this.ability1;
    this.ability2;
    this.ability3;
    this.playerbullets;
    this.playersaber;

      player.speed = 10;
      player.health = 100;
      player.isAlive = true;
      player.healthPercent = 100;
      player.healthBar = 0;
      player.sheilded = false;
      player.multishot = false;
      player.pierce = false;
      player.kaboom = false;
      player.saber = false;

    tutorialboss.speed = 2;
    tutorialboss.health = 100;
    tutorialboss.minX = 6700;
    tutorialboss.isAlive = true;
    tutorialboss.healthPercent = 100;
    tutorialboss.healthBar = 0;
  }


  create()
  {
    this.input.once('pointerup', function (event) {
    this.tutorialtheme.stop();
    this.scene.start('bossScene');
    }, this);

    //audio
    this.theme = this.sound.add('theme', {volume: 0.3});
    this.tutorialtheme = this.sound.add('tutorialtheme', {volume: 0.2});
    this.tutorialtheme.setLoop(true);
    this.ability1 = this.sound.add('ability1', {volume: 0.5});
    this.ability2 = this.sound.add('ability2', {volume: 0.5});
    this.ability3 = this.sound.add('ability3');
    this.dinogrowl = this.sound.add('dinogrowl');
    this.throwstar = this.sound.add('throwstar');
    this.teleport = this.sound.add('teleport');
    this.throwtriplestar = this.sound.add('throwtriplestar');
    this.throwbigstar = this.sound.add('throwbigstar');
    this.healthUp = this.sound.add('heal');
    this.shieldUp = this.sound.add('shield');
    this.dinodie = this.sound.add('dinodie');
    this.tutorialtheme.play();
    // background
    this.cameras.main.setBounds(0, 0, 1400 - 40, 560);
    this.physics.world.setBounds(0, 30, 1400 - 40, 560);
    this.add.image(0, 0, 'background1').setOrigin(0);
    this.add.image(5600, 0, 'background2').setOrigin(0);
    //boss health bar
    tutorialboss.healthBar = this.makeBar(5600,0,0xe74c3c);
    this.setValue(tutorialboss.healthBar, 100);
    tutorialboss.healthBar.setVisible(false);
    // player
    player.sprite = this.physics.add.sprite(20, this.sys.game.config.height / 2, 'ninja');
    player.sprite.setScale(0.5);
    player.sprite.setCollideWorldBounds(true); //can't run off screen
    player.healthBar = this.makePlayerBar(0, 50, 0x2ecc71);
    this.setValue(player.healthBar,player.healthPercent);
    player.healthBar.setVisible(true);
    player.healthPercent = 100;
    this.cameras.main.startFollow(player.sprite, true, 0.1, 0.1);
    this.cameras.main.followOffset.set(-500, 0);
    this.playerbullets = this.physics.add.group(); //create stars
    this.playerbigbullets = this.physics.add.group(); //create stars
    this.playersaber = this.physics.add.group(); //create melee
    //enemies
    this.wave1 = this.physics.add.group();
    this.wave2 = this.physics.add.group();
    this.wave3 = this.physics.add.group();
    this.wave4 = this.physics.add.group();
    //powerups
    //this.powerups = this.physics.add.group();
    this.tutorialpowerup1 = this.physics.add.group();
    this.tutorialpowerup2 = this.physics.add.group();
    this.tutorialpowerup3 = this.physics.add.group();
    this.tutorialpowerup4 = this.physics.add.group();
    //barrier
    this.barrier = this.physics.add.sprite(1400, 300, 'barrier');
    this.barrier2 = this.physics.add.sprite(1400 * 2, 300, 'barrier');
    this.barrier3 = this.physics.add.sprite(1400 * 3, 300, 'barrier');
    this.barrier4 = this.physics.add.sprite(1400 * 4, 300, 'barrier');
    this.barrier5 = this.physics.add.sprite(6470, 300, 'barrier');
    // goal / end of level
    this.tutorialtreasure = this.physics.add.sprite(7000 - 70, this.sys.game.config.height / 2, 'treasure');
    this.tutorialtreasure.setScale(0.6);
    //boss
    tutorialboss.sprite = this.physics.add.sprite(7150,300, 'boss');
    tutorialboss.sprite.setVisible(false);
    this.bullets = this.physics.add.group(); //create attack 1
    this.laser = this.physics.add.group(); // create attack 2
    //colliders / triggers
    this.physics.add.overlap(player.sprite, this.bullets, this.getHit, null, this); //trigger b/w player & bullets
    this.physics.add.overlap(player.sprite, this.laser, this.dot, null, this); //trigger b/w player & laser
    this.physics.add.overlap(player.sprite, this.tutorialtreasure, this.moveToGame, null, this); //trigger b/w player & treasure
    this.physics.add.overlap(player.sprite, tutorialboss.sprite, this.hitPlayer, null, this); //trigger b/w player & boss
    //this.physics.add.overlap(player.sprite, this.powerups, this.powerup, null, this); //trigger b/w player & powerup ////////////////////////////////////////////////////
    this.physics.add.overlap(player.sprite, this.tutorialpowerup1, this.powerupOne, null, this);
    this.physics.add.overlap(player.sprite, this.tutorialpowerup2, this.powerupTwo, null, this);
    this.physics.add.overlap(player.sprite, this.tutorialpowerup3, this.powerupThree, null, this);
    this.physics.add.overlap(player.sprite, this.tutorialpowerup4, this.powerupFour, null, this);
    this.physics.add.overlap(tutorialboss.sprite, this.playerbullets, this.collideBoss, null, this); //trigger b/w playerbullets & boss
    this.physics.add.overlap(this.wave1, this.playersaber, this.meleeEnemy, null, this);//melee enemy
    this.physics.add.overlap(this.wave2, this.playersaber, this.meleeEnemy, null, this);
    this.physics.add.overlap(this.wave3, this.playersaber, this.meleeEnemy, null, this);
    this.physics.add.overlap(this.wave4, this.playersaber, this.meleeEnemy, null, this); //melee enemy
    this.physics.add.overlap(tutorialboss.sprite, this.playerbigbullets, this.pierceBoss, null, this); //trigger b/w playerbigbullets & boss
    this.physics.add.overlap(this.wave1, this.playerbullets, this.collideEnemy, null, this); //trigger b/w playerbullets & enemy
    this.physics.add.overlap(this.wave1, this.playerbigbullets, this.pierceEnemy, null, this); //trigger b/w playerbigbullets & enemy
    this.physics.add.overlap(this.wave2, this.playerbullets, this.collideEnemy, null, this); //trigger b/w playerbullets & enemy
    this.physics.add.overlap(this.wave2, this.playerbigbullets, this.pierceEnemy, null, this); //trigger b/w playerbigbullets & enemy
    this.physics.add.overlap(this.wave3, this.playerbullets, this.collideEnemy, null, this); //trigger b/w playerbullets & enemy
    this.physics.add.overlap(this.wave3, this.playerbigbullets, this.pierceEnemy, null, this); //trigger b/w playerbigbullets & enemy
    this.physics.add.overlap(this.wave4, this.playerbullets, this.collideEnemy, null, this); //trigger b/w playerbullets & enemy
    this.physics.add.overlap(this.wave4, this.playerbigbullets, this.pierceEnemy, null, this); //trigger b/w playerbigbullets & enemy
    this.physics.add.overlap(this.barrier, this.playerbullets, this.collide, null, this); //trigger b/w playerbullets & barrier
    this.physics.add.overlap(this.barrier, this.playerbigbullets, this.collide, null, this); //trigger b/w playerbigbullets & barrier
    this.physics.add.overlap(this.barrier2, this.playerbullets, this.collide, null, this); //trigger b/w playerbullets & barrier
    this.physics.add.overlap(this.barrier2, this.playerbigbullets, this.collide, null, this); //trigger b/w playerbigbullets & barrier
    this.physics.add.overlap(this.barrier3, this.playerbullets, this.collide, null, this); //trigger b/w playerbullets & barrier
    this.physics.add.overlap(this.barrier3, this.playerbigbullets, this.collide, null, this); //trigger b/w playerbigbullets & barrier
    this.physics.add.overlap(this.barrier4, this.playerbullets, this.collide, null, this); //trigger b/w playerbullets & barrier
    this.physics.add.overlap(this.barrier4, this.playerbigbullets, this.collide, null, this); //trigger b/w playerbigbullets & barrier
    this.physics.add.overlap(this.barrier5, this.playerbullets, this.collide, null, this); //trigger b/w playerbullets & barrier
    this.physics.add.overlap(this.barrier5, this.playerbigbullets, this.collide, null, this); //trigger b/w playerbigbullets & barrier
    //camera
    this.cameras.main.resetFX(); //reset cameras
    //keyboard input
    //create keyboard keys
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.zkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.xkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    this.ckey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    this.akey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.skey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.dkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.qkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.wkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.ekey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.vkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
    this.bkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    this.kkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    this.lkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    //timer testing
    this.timer = this.time.addEvent({delay : 5000, callback: this.pickAbility, callbackScope: this, loop: true, paused: true });
    this.timer2 = this.time.addEvent({delay : 5000, callback: this.abilityThree, callbackScope: this, loop: true, paused: true });
    this.timer3 = this.time.addEvent({delay : 5000, callback: this.wave1Attack, callbackScope: this, loop: true, paused: false });
    this.timer4 = this.time.addEvent({delay : 5000, callback: this.wave2Attack, callbackScope: this, loop: true, paused: true });
    this.timer5 = this.time.addEvent({delay : 4000, callback: this.wave3Attack, callbackScope: this, loop: true, paused: true });
    this.timer6 = this.time.addEvent({delay : 2500, callback: this.wave4Attack, callbackScope: this, loop: true, paused: true });
    this.timer7 = this.time.addEvent({delay : 3000, callback: this.createWave1, callbackScope: this, loop: true, paused: false });
    this.timer8 = this.time.addEvent({delay : 3000, callback: this.createWave2, callbackScope: this, loop: true, paused: true });
    this.timer9 = this.time.addEvent({delay : 2000, callback: this.createWave3, callbackScope: this, loop: true, paused: true });
    this.timer10 = this.time.addEvent({delay : 1500, callback: this.createWave4, callbackScope: this, loop: true, paused: true });
    this.poweruptimer1 = this.time.addEvent({delay : 5000, callback: this.createPowerup1, callbackScope: this, loop: true, paused: false });
    this.poweruptimer2 = this.time.addEvent({delay : 5000, callback: this.createPowerup2, callbackScope: this, loop: true, paused: true });
    this.poweruptimer3 = this.time.addEvent({delay : 5000, callback: this.createPowerup3, callbackScope: this, loop: true, paused: true });
    this.poweruptimer4 = this.time.addEvent({delay : 5000, callback: this.createPowerup4, callbackScope: this, loop: true, paused: true });
    this.poweruptimer5 = this.time.addEvent({delay : 5000, callback: this.createPowerup5, callbackScope: this, loop: true, paused: true });

    this.stage1Text = this.add.text(10, 30, "(Click to skip tutorial)", { fontSize: '20px', fill: '#00FF00', align: "center" });
    this.stage1Text = this.add.text(10, 50, "Hello and welcome to CyberSky. I will be your instructor.", { fontSize: '20px', fill: '#00FF00', align: "center" });
    this.stage1Text = this.add.text(10, 70, "First, let's take out 50 enemies to work on your aim.", { fontSize: '20px', fill: '#00FF00', align: "center" });
    this.stage1Text = this.add.text(10, 90, "Press spacebar to throw a ninja star, use the arrow keys to move.", { fontSize: '20px', fill: '#00FF00', align: "center" });
    this.stage1Text = this.add.text(10, 110, "Don't worry, enemies won't attack you during this stage.", { fontSize: '20px', fill: '#00FF00', align: "center" });
    
    this.stage2Text = this.add.text(1500, 50, "Next, let's try out some defensive abilities.", { fontSize: '20px', fill: '#00FF00', align: "center" });
    this.stage2Text = this.add.text(1500, 70, "Press the B key to gain a shield which will negate the first attack that would hit you.", { fontSize: '20px', fill: '#00FF00', align: "center" });
    this.stage2Text = this.add.text(1500, 90, "Then, press the V key to recover some health (Note: this won't work if you're at full hp).", { fontSize: '20px', fill: '#00FF00', align: "center" });
    this.stage2Text = this.add.text(1500, 110, "Finally, press the C key and hold an arrow key to teleport a short distance in that direction.", { fontSize: '20px', fill: '#00FF00', align: "center" });
    
    this.stage3Text = this.add.text(2900, 70, "Now, let's learn about powerups.", { fontSize: '20px', fill: '#00FF00', align: "center" });
    this.stage3Text = this.add.text(2900, 90, "Powerups will occasionally fall from the top of the screen.", { fontSize: '20px', fill: '#00FF00', align: "center" });
    this.stage3Text = this.add.text(2900, 110, "Collecting them will grant you extra abilities.", { fontSize: '20px', fill: '#00FF00', align: "center" });
    this.stage3Text = this.add.text(2900, 130, "Try pressing the Z or X key once you have collected a powerup.", { fontSize: '20px', fill: '#00FF00', align: "center" });
    
    this.stage4Text = this.add.text(4300, 50, "Now let's put everything you've learned together.", { fontSize: '20px', fill: '#00FF00', align: "center" });
    this.stage4Text = this.add.text(4300, 70, "Here are some tougher enemies to deal with.", { fontSize: '20px', fill: '#00FF00', align: "center" });
    this.stage4Text = this.add.text(4300, 90, "Remember to occasionally shield yourself, heal yourself, and collect powerups.", { fontSize: '20px', fill: '#00FF00', align: "center" });
    this.stage4Text = this.add.text(4300, 110, "The boss is after this stage!", { fontSize: '20px', fill: '#00FF00', align: "center" });
    
    this.bossHPText = this.add.text(5610, 10, "Boss HP: " + tutorialboss.healthPercent, { fontSize: '20px', fill: '#000000', align: "center" });
    this.bossStageText = this.add.text(5700, 50, "Give it all you've got and take out the big, bad dino!!!", { fontSize: '20px', fill: '#00FF00', align: "center" });
    this.bossStageText = this.add.text(5700, 70, "Touch the treasure chest to start the main game!", { fontSize: '20px', fill: '#00FF00', align: "center" });
  } 

  update()
  {
    this.setHealthBarPosition(player.healthBar, player.sprite.x - 25, player.sprite.y - 40);
    this.bossHPText.setText("Boss HP: " + tutorialboss.healthPercent.toString().substr(0,4));

    if (!player.isAlive) {
      //return;
      this.scene.start("mainMenu");
    }
    // check for active input
    if (this.cursors.right.isDown) {
      // player walks
      player.sprite.x += player.speed;
    } else if (this.cursors.left.isDown) {
      player.sprite.x -= player.speed;
    }
    if (this.cursors.up.isDown) {
      player.sprite.y -= player.speed;
    } else if (this.cursors.down.isDown){
      player.sprite.y += player.speed;
    }
    // locked camera conditions
    // can move to wave 2
    if (this.numEnemiesKilled >= 50 && this.numEnemiesKilled < 100){
      //this.timer3.paused = true;
      this.timer7.paused = true;
      this.poweruptimer1.paused = true;
      this.cameras.main.setBounds(0, 0, 1400 * 2 - 40, 560);
      this.physics.world.setBounds(0, 30, 1400 * 2 - 40, 560);
      //this.barrier.disableBody(true,true);
    }
    // can move to wave 3
    if (this.numEnemiesKilled >= 100 && this.numEnemiesKilled < 150){
      //this.timer4.paused = true;
      this.timer8.paused = true;
      this.poweruptimer2.paused = true;
      this.cameras.main.setBounds(0, 0, 1400 * 3 - 40, 560);
      this.physics.world.setBounds(0, 30, 1400 * 3 - 40, 560);
    }
    // can move to wave 4
    if (this.numEnemiesKilled >= 150 && this.numEnemiesKilled < 200){
      //this.timer5.paused = true;
      this.timer9.paused = true;
      this.poweruptimer3.paused = true;
      this.cameras.main.setBounds(0, 0, 1400 * 4 - 40, 560);
      this.physics.world.setBounds(0, 30, 1400 * 4 - 40, 560);
    }
    // can move to boss
    if (this.numEnemiesKilled >= 200 && this.numEnemiesKilled < 205){
      //this.timer6.paused = true;
      this.timer10.paused = true;
      this.poweruptimer4.paused = true;
      this.cameras.main.setBounds(0, 0, 1400 * 4 + 1000, 560);
      this.physics.world.setBounds(0, 30, 1400 * 4 + 1000, 560);
    }
    // make waves attack only when player crosses line
    if (player.sprite.x >= 1400 && this.numEnemiesKilled < 100){
      this.timer4.paused = false;
      this.timer8.paused = false;
      this.poweruptimer2.paused = false;
    }
    if (player.sprite.x >= 2800 && this.numEnemiesKilled < 150){
      this.timer5.paused = false;
      this.timer9.paused = false;
      this.poweruptimer3.paused = false;
    }
    if (player.sprite.x >= 4200 && this.numEnemiesKilled < 200){
      this.timer6.paused = false;
      this.timer10.paused = false;
      this.poweruptimer4.paused = false;
    }
    if (player.sprite.x >= 5600){
      this.poweruptimer5.paused = false;
    }
    // make enemies respawn at wave start point if they leave camera view
    for (var i = 0; i < this.wave1.getChildren().length; i++) {
      var enemy = this.wave1.getChildren()[i];
      enemy.update();
      if (enemy.x < 0){
        enemy.x = 1400;
      }
      if (enemy.y < this.enemyMinY || enemy.y > this.enemyMaxY){
        enemy.x = 1400;
        enemy.y = Phaser.Math.Between(100, 500);
      }
    }
    for (var i = 0; i < this.wave2.getChildren().length; i++) {
      var enemy = this.wave2.getChildren()[i];
      enemy.update();
      if (enemy.x < 1400){
        enemy.x = 2800;
      }
      if (enemy.y < this.enemyMinY || enemy.y > this.enemyMaxY){
        enemy.x = 2800;
        enemy.y = Phaser.Math.Between(100, 500);
      }
    }
    for (var i = 0; i < this.wave3.getChildren().length; i++) {
      var enemy = this.wave3.getChildren()[i];
      enemy.update();
      if (enemy.x < 2800){
        enemy.x = 4200;
      }
      if (enemy.y < this.enemyMinY || enemy.y > this.enemyMaxY){
        enemy.x = 4200;
        enemy.y = Phaser.Math.Between(100, 500);
      }
    }
    for (var i = 0; i < this.wave4.getChildren().length; i++) {
      var enemy = this.wave4.getChildren()[i];
      enemy.update();
      if (enemy.x < 4200){
        enemy.x = 5600;
      }
      if (enemy.y < this.enemyMinY || enemy.y > this.enemyMaxY){
        enemy.x = 5600;
        enemy.y = Phaser.Math.Between(100, 500);
      }
    }
    // make player stay in boss area
    if (player.sprite.x > 5600){
      this.cameras.main.setBounds(5600, 0, 1300, 560);
      this.physics.world.setBounds(5600, 30, 1350, 560);
    }

    // spawns boss when player crosses threshold
    if (player.sprite.x + 17 > 5700) { //400 //6000
      this.startBoss = true;
      this.cameras.main.setBounds(5600, 0, 1300, 560);
      this.physics.world.setBounds(5600, 30, 1350, 560);
    }
    if (this.startBoss){
      player.healthBar.setVisible(true);
      tutorialboss.healthBar.setVisible(true);
      tutorialboss.sprite.setVisible(true);
      tutorialboss.sprite.x -= tutorialboss.speed;
      this.timer.paused = false;
    }
    if (tutorialboss.sprite.x < 7000 + 150 && tutorialboss.sprite.x > 7000 + 140){ //this.sys.game.config.width
      this.dinogrowl.play();
    }
    if (tutorialboss.sprite.x <= tutorialboss.minX) {
      tutorialboss.speed = 0;
      tutorialboss.sprite.setCollideWorldBounds(true);
      this.barrier5.disableBody(true,true);
    }
    if (tutorialboss.health <= 0) {
      //this.dinodie.play();
      this.ability3.setMute(true);
      tutorialboss.isAlive = false;
      tutorialboss.sprite.disableBody(true, true);
      tutorialboss.sprite.setActive(false);
      tutorialboss.sprite.setVisible(false);
      this.timer.paused = true;
    }
    //ability three
    if (this.timer.getProgress().toString().substr(0,4) < 0.4){
      if (this.timer2.getProgress().toString().substr(0,4) >= 0.05 && this.timer2.getProgress().toString().substr(0,4) <= 0.25){
        this.physics.moveToObject(tutorialboss.sprite, player.sprite, 800);
      }
      else if (this.timer2.getProgress().toString().substr(0,4) > 0.25 && this.timer2.getProgress().toString().substr(0,4) <= 0.5){
        this.physics.moveToObject(tutorialboss.sprite, this.tutorialtreasure, 800);
      }
    }
    //press spacebar to throw star
    if (Phaser.Input.Keyboard.JustDown(this.spacebar))
    {
      this.throwstar.play();
      let playerx = player.sprite.x;
      let playery = player.sprite.y;
      let pbullet = this.playerbullets.create(playerx, playery, 'star');
      pbullet.setVelocityX(800);
    }
    //press z key to throw 3 stars
    else if (Phaser.Input.Keyboard.JustDown(this.zkey) && player.multishot == true)
    {
      this.throwtriplestar.play();
      let playerx = player.sprite.x;
      let playery = player.sprite.y;
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
    else if (Phaser.Input.Keyboard.JustDown(this.xkey) && player.pierce == true)
    {
      this.throwbigstar.play();
      let playerx = player.sprite.x;
      let playery = player.sprite.y;
      let pbullet = this.playerbigbullets.create(playerx, playery, 'starbig');
      pbullet.setVelocityX(800);
    }
    //melee
    else if ((Phaser.Input.Keyboard.JustDown(this.lkey) && player.saber == true))
    {
      let playerx = player.sprite.x;
      let playery = player.sprite.y;
      var randNum = Math.random();
      if (randNum >= 0 && randNum <= 0.25){
        let psword = this.playersaber.create(playerx + 18, playery, 'silversword');
        psword.setVelocityX(0);
      }
      if (randNum > 0.25 && randNum <= 0.45){
        let psword = this.playersaber.create(playerx + 18, playery, 'redsword');
        psword.setVelocityX(0);
      }
      if (randNum > 0.45 && randNum <= 0.65){
        let psword = this.playersaber.create(playerx + 18, playery, 'bluesword');
        psword.setVelocityX(0);
      }
      if (randNum > 0.65 && randNum <= 0.85){
        let psword = this.playersaber.create(playerx + 18, playery, 'greensword');
        psword.setVelocityX(0);
      }
      if (randNum > 0.85 && randNum <= 1.0){
        let psword = this.playersaber.create(playerx + 18, playery, 'silversword');
        psword.setVelocityX(0);
      }
      //let psword = this.playersaber.create(playerx, playery, 'silversword');
        if ((Phaser.Input.Keyboard.JustUp(this.lkey))){
          psword.disableBody(true,true);
        }
      }


    //press c key to teleport 100 pixels in direction of arrow key
    else if (Phaser.Input.Keyboard.JustDown(this.ckey))
    {
      this.teleport.play();
      if (this.cursors.right.isDown){
        player.sprite.x += 100;
      }
      else if (this.cursors.left.isDown){
        player.sprite.x -= 100;
      }
      else if (this.cursors.up.isDown){
        player.sprite.y -= 100;
      }
      else if (this.cursors.down.isDown){
        player.sprite.y += 100;
      }
    }
    //press a to throw extra star1
    else if (Phaser.Input.Keyboard.JustDown(this.akey))
    {
      this.throwstar.play();
      let playerx = player.sprite.x;
      let playery = player.sprite.y;
      let pbullet = this.playerbullets.create(playerx, playery, 'star1');
      pbullet.setVelocityX(200);
    }
    //press s to throw extra star2
    else if (Phaser.Input.Keyboard.JustDown(this.skey))
    {
      this.throwstar.play();
      let playerx = player.sprite.x;
      let playery = player.sprite.y;
      let pbullet = this.playerbullets.create(playerx, playery, 'star2');
      pbullet.setVelocityX(200);
    }
    //press d to throw extra star3
    else if (Phaser.Input.Keyboard.JustDown(this.dkey))
    {
      this.throwstar.play();
      let playerx = player.sprite.x;
      let playery = player.sprite.y;
      let pbullet = this.playerbullets.create(playerx, playery, 'star3');
      pbullet.setVelocityX(200);
    }
    //press q to throw extra star4
    else if (Phaser.Input.Keyboard.JustDown(this.qkey))
    {
      this.throwstar.play();
      let playerx = player.sprite.x;
      let playery = player.sprite.y;
      let pbullet = this.playerbullets.create(playerx, playery, 'star4');
      pbullet.setVelocityX(200);
    }
    //press w to throw extra star5
    else if (Phaser.Input.Keyboard.JustDown(this.wkey))
    {
      this.throwstar.play();
      let playerx = player.sprite.x;
      let playery = player.sprite.y;
      let pbullet = this.playerbullets.create(playerx, playery, 'star5');
      pbullet.setVelocityX(200);
    }
    //press e to throw extra star6
    else if (Phaser.Input.Keyboard.JustDown(this.ekey))
    {
      this.throwstar.play();
      let playerx = player.sprite.x;
      let playery = player.sprite.y;
      let pbullet = this.playerbullets.create(playerx, playery, 'star6');
      pbullet.setVelocityX(200);
    }
    //press v to heal - this should go somewhere else
    else if(Phaser.Input.Keyboard.JustDown(this.vkey) && player.health < 100)
    {
      this.healthUp.play();
      if(player.health > 80)
      {
        player.health = 100;
        player.healthPercent = 100;
      } else {
        player.health += 20;
        player.healthPercent += 20;
      }
      this.setValue(player.healthBar, player.healthPercent);
      console.log("player health is : " + player.health);
    }
    //press b to shield
    else if(Phaser.Input.Keyboard.JustDown(this.bkey) && !player.shielded)
    {
      this.shieldUp.play();
      player.shielded = true;
      console.log("player shield is active");
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

  makePlayerBar(x, y, color){
    //draw the bar
    let bar = this.add.graphics();
    //color the bar
    bar.fillStyle(color, 1);
    //fill the bar with a rectangle
    bar.fillRect(0, 0, 50, 10);
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

  setHealthBarPosition(bar, x, y){
    bar.x = x;
    bar.y = y;
  }

  createPowerup1() {
  }
  createPowerup2() {
    }
  createPowerup3() {
    let x = Phaser.Math.Between(2800 + 50, 4200 - 50);
    let y = -100;
    var randNum = Math.random();
    if (randNum > 0 && randNum <= 0.25)
      this.tutorialpowerup1.create(x, y, 'multishotPU');
      this.tutorialpowerup1.setVelocityY(100);
    if (randNum > 0.25 && randNum <= 0.50)
      this.tutorialpowerup2.create(x, y, 'piercePU');
      this.tutorialpowerup2.setVelocityY(100);
     if (randNum > 0.50 && randNum <= 0.75)
      this.tutorialpowerup3.create(x, y, 'lightswordPU');
      this.tutorialpowerup3.setVelocityY(100);
     if (randNum > 0.75 && randNum <= 1.0)
      this.tutorialpowerup4.create(x, y, 'kaboomPU');
      this.tutorialpowerup4.setVelocityY(100);
  }
  createPowerup4() {
    let x = Phaser.Math.Between(4200 + 50, 5600 - 50);
    let y = -100;
    var randNum = Math.random();
    if (randNum > 0 && randNum <= 0.25)
      this.tutorialpowerup1.create(x, y, 'multishotPU');
      this.tutorialpowerup1.setVelocityY(100);
    if (randNum > 0.25 && randNum <= 0.50)
      this.tutorialpowerup2.create(x, y, 'piercePU');
      this.tutorialpowerup2.setVelocityY(100);
     if (randNum > 0.50 && randNum <= 0.75)
      this.tutorialpowerup3.create(x, y, 'lightswordPU');
      this.tutorialpowerup3.setVelocityY(100);
     if (randNum > 0.75 && randNum <= 1.0)
      this.tutorialpowerup4.create(x, y, 'kaboomPU');
      this.tutorialpowerup4.setVelocityY(100);
  }
  createPowerup5() {
    let x = Phaser.Math.Between(5600 + 50, 6400 - 50);
    let y = -100;
    var randNum = Math.random();
    if (randNum > 0 && randNum <= 0.25)
      this.tutorialpowerup1.create(x, y, 'multishotPU');
      this.tutorialpowerup1.setVelocityY(100);
    if (randNum > 0.25 && randNum <= 0.50)
      this.tutorialpowerup2.create(x, y, 'piercePU');
      this.tutorialpowerup2.setVelocityY(100);
     if (randNum > 0.50 && randNum <= 0.75)
      this.tutorialpowerup3.create(x, y, 'lightswordPU');
      this.tutorialpowerup3.setVelocityY(100);
     if (randNum > 0.75 && randNum <= 1.0)
      this.tutorialpowerup4.create(x, y, 'kaboomPU');
      this.tutorialpowerup4.setVelocityY(100);

  }

  createWave1() {
    for (var j = 100; j < 600; j += 100)
    {
      var randNum = Math.random();
      if (randNum > 0 && randNum <= 0.07)
          this.wave1.create(1400, j, 'enemy1');
      else if (randNum > 0.07 && randNum <= 0.14)
          this.wave1.create(1400, j, 'enemy2');
      else if (randNum > 0.14 && randNum <= 0.21)
          this.wave1.create(1400, j, 'enemy3');
      else if (randNum > 0.21 && randNum <= 0.28)
          this.wave1.create(1400, j, 'enemy4');
      else if (randNum > 0.28 && randNum <= 0.35)
          this.wave1.create(1400, j, 'enemy5');
      else if (randNum > 0.35 && randNum <= 0.42)
          this.wave1.create(1400, j, 'enemy6');
      else if (randNum > 0.42 && randNum <= 0.49)
          this.wave1.create(1400, j, 'enemy7');
      else if (randNum > 0.49 && randNum <= 0.56)
          this.wave1.create(1400, j, 'enemy8');
      else if (randNum > 0.56 && randNum <= 0.63)
          this.wave1.create(1400, j, 'enemy9');
      else if (randNum > 0.63 && randNum <= 0.70)
          this.wave1.create(1400, j, 'enemy10');
      else if (randNum > 0.70 && randNum <= 0.77)
          this.wave1.create(1400, j, 'enemy11');
      else if (randNum > 0.77 && randNum <= 0.84)
          this.wave1.create(1400, j, 'enemy12');
      else if (randNum > 0.84 && randNum <= 0.91)
          this.wave1.create(1400, j, 'enemy13');
      else if (randNum > 0.91 && randNum <= 1.0)
          this.wave1.create(1400, j, 'enemy14');
    }
  }

  createWave2() {
    for (var j = 100; j < 600; j += 100)
    {
      var randNum = Math.random();
      if (randNum > 0 && randNum <= 0.07)
          this.wave2.create(2800, j, 'enemy1');
      else if (randNum > 0.07 && randNum <= 0.14)
          this.wave2.create(2800, j, 'enemy2');
      else if (randNum > 0.14 && randNum <= 0.21)
          this.wave2.create(2800, j, 'enemy3');
      else if (randNum > 0.21 && randNum <= 0.28)
          this.wave2.create(2800, j, 'enemy4');
      else if (randNum > 0.28 && randNum <= 0.35)
          this.wave2.create(2800, j, 'enemy5');
      else if (randNum > 0.35 && randNum <= 0.42)
          this.wave2.create(2800, j, 'enemy6');
      else if (randNum > 0.42 && randNum <= 0.49)
          this.wave2.create(2800, j, 'enemy7');
      else if (randNum > 0.49 && randNum <= 0.56)
          this.wave2.create(2800, j, 'enemy8');
      else if (randNum > 0.56 && randNum <= 0.63)
          this.wave2.create(2800, j, 'enemy9');
      else if (randNum > 0.63 && randNum <= 0.70)
          this.wave2.create(2800, j, 'enemy10');
      else if (randNum > 0.70 && randNum <= 0.77)
          this.wave2.create(2800, j, 'enemy11');
      else if (randNum > 0.77 && randNum <= 0.84)
          this.wave2.create(2800, j, 'enemy12');
      else if (randNum > 0.84 && randNum <= 0.91)
          this.wave2.create(2800, j, 'enemy13');
      else if (randNum > 0.91 && randNum <= 1.0)
          this.wave2.create(2800, j, 'enemy14');
    }
  }

  createWave3() {
    for (var j = 100; j < 600; j += 100)
    {
      var randNum = Math.random();
      if (randNum > 0 && randNum <= 0.07)
          this.wave3.create(4200, j, 'enemy1');
      else if (randNum > 0.07 && randNum <= 0.14)
          this.wave3.create(4200, j, 'enemy2');
      else if (randNum > 0.14 && randNum <= 0.21)
          this.wave3.create(4200, j, 'enemy3');
      else if (randNum > 0.21 && randNum <= 0.28)
          this.wave3.create(4200, j, 'enemy4');
      else if (randNum > 0.28 && randNum <= 0.35)
          this.wave3.create(4200, j, 'enemy5');
      else if (randNum > 0.35 && randNum <= 0.42)
          this.wave3.create(4200, j, 'enemy6');
      else if (randNum > 0.42 && randNum <= 0.49)
          this.wave3.create(4200, j, 'enemy7');
      else if (randNum > 0.49 && randNum <= 0.56)
          this.wave3.create(4200, j, 'enemy8');
      else if (randNum > 0.56 && randNum <= 0.63)
          this.wave3.create(4200, j, 'enemy9');
      else if (randNum > 0.63 && randNum <= 0.70)
          this.wave3.create(4200, j, 'enemy10');
      else if (randNum > 0.70 && randNum <= 0.77)
          this.wave3.create(4200, j, 'enemy11');
      else if (randNum > 0.77 && randNum <= 0.84)
          this.wave3.create(4200, j, 'enemy12');
      else if (randNum > 0.84 && randNum <= 0.91)
          this.wave3.create(4200, j, 'enemy13');
      else if (randNum > 0.91 && randNum <= 1.0)
          this.wave3.create(4200, j, 'enemy14');
    }
  }

  createWave4() {
    for (var j = 100; j < 600; j += 100)
    {
      var randNum = Math.random();
      if (randNum > 0 && randNum <= 0.07)
          this.wave4.create(5600, j, 'enemy1');
      else if (randNum > 0.07 && randNum <= 0.14)
          this.wave4.create(5600, j, 'enemy2');
      else if (randNum > 0.14 && randNum <= 0.21)
          this.wave4.create(5600, j, 'enemy3');
      else if (randNum > 0.21 && randNum <= 0.28)
          this.wave4.create(5600, j, 'enemy4');
      else if (randNum > 0.28 && randNum <= 0.35)
          this.wave4.create(5600, j, 'enemy5');
      else if (randNum > 0.35 && randNum <= 0.42)
          this.wave4.create(5600, j, 'enemy6');
      else if (randNum > 0.42 && randNum <= 0.49)
          this.wave4.create(5600, j, 'enemy7');
      else if (randNum > 0.49 && randNum <= 0.56)
          this.wave4.create(5600, j, 'enemy8');
      else if (randNum > 0.56 && randNum <= 0.63)
          this.wave4.create(5600, j, 'enemy9');
      else if (randNum > 0.63 && randNum <= 0.70)
          this.wave4.create(5600, j, 'enemy10');
      else if (randNum > 0.70 && randNum <= 0.77)
          this.wave4.create(5600, j, 'enemy11');
      else if (randNum > 0.77 && randNum <= 0.84)
          this.wave4.create(5600, j, 'enemy12');
      else if (randNum > 0.84 && randNum <= 0.91)
          this.wave4.create(5600, j, 'enemy13');
      else if (randNum > 0.91 && randNum <= 1.0)
          this.wave4.create(5600, j, 'enemy14');
    }
  }

  wave1Attack()
  {
    for (var i = 0; i < this.wave1.getChildren().length; i++) {
      var enemy = this.wave1.getChildren()[i];
      enemy.update();
      enemy.setVelocityX(Phaser.Math.Between(-50,-250)); //-50, -250
      enemy.setVelocityY(Phaser.Math.Between(-20,20)); //-20, -20
    }
  }

  wave2Attack()
  {
    for (var i = 0; i < this.wave2.getChildren().length; i++) {
      var enemy = this.wave2.getChildren()[i];
      enemy.update();
    
      if (enemy){
        let bullet = this.bullets.create(enemy.x, enemy.y, 'bullet');
        bullet.setVelocityX(Phaser.Math.Between(-100,-200));
      }
    
      enemy.setVelocityX(Phaser.Math.Between(-50,-250)); //-50, -250
      enemy.setVelocityY(Phaser.Math.Between(-20,20)); //-20, -20
    }
  }

  wave3Attack()
  {
    for (var i = 0; i < this.wave3.getChildren().length; i++) {
      var enemy = this.wave3.getChildren()[i];
      enemy.update();
      if (enemy){
        let bullet = this.bullets.create(enemy.x, enemy.y, 'bullet');
        bullet.setVelocityX(Phaser.Math.Between(-200,-300));
      }
      enemy.setVelocityX(Phaser.Math.Between(-50,-250)); //-50, -250
      enemy.setVelocityY(Phaser.Math.Between(-20,20)); //-20, -20
    }
  }

  wave4Attack()
  {
    for (var i = 0; i < this.wave4.getChildren().length; i++) {
      var enemy = this.wave4.getChildren()[i];
      enemy.update();
      if (enemy){
        let bullet = this.bullets.create(enemy.x, enemy.y, 'bullet');
        bullet.setVelocityX(Phaser.Math.Between(-300,-400));
      }
      enemy.setVelocityX(Phaser.Math.Between(-50,-250)); //-50, -250
      enemy.setVelocityY(Phaser.Math.Between(-20,20)); //-20, -20
    }
  }

  pickAbility()
  {
    var ability = Math.random(); //Math.floor(Math.random() * 3) + 1;
    this.useAbility(ability);
  }

  useAbility(ability){
    if(ability >= 0 && ability < 0.5)
    {
      this.abilityOne();
    }
    else if (ability >= 0.5 && ability < 0.75)
    {
      this.abilityTwo();
    }
    else {
      this.abilityThree();
    }
  }

  abilityOne() {
    this.ability1.play();
    console.log("using ability one");
    this.timer2.paused = true;
    this.ability3.setMute(true);
    for(let i = 0; i < 10; i++)
    {
      let x = tutorialboss.sprite.x;
      let y = Phaser.Math.Between(tutorialboss.sprite.y - 300, tutorialboss.sprite.y + 300); //can and should randomize this

      let bullet = this.bullets.create(x, y, 'bullet');
      bullet.setVelocityX(Phaser.Math.Between(-600,-700));
    }
  }

  abilityTwo(){
    this.ability2.play();
    console.log("using ability two");
    this.timer2.paused = true;
    this.ability3.setMute(true);
    let x = Phaser.Math.Between(5600, tutorialboss.sprite.x - 250);
    let y = -200;
    let laser = this.laser.create(x, y, 'laser');
    laser.setVelocityY(250);

  }

  abilityThree() {
    this.ability3.play();
    console.log("using ability three");
    this.timer2.paused = false;
    this.ability3.setMute(false);
  }

  getHit(p, bullet)
  {
    bullet.disableBody(true,true);
    if(player.shielded)
    {
      player.shielded = false;
      console.log("player had a shield");
      return;
    }
    player.health -= 20;
    player.healthPercent -= 20;
    this.setValue(player.healthBar, player.healthPercent);
    if(player.health <= 0) //things can happen, be safe and less than 0
    {
      this.gameOver();
    }
    console.log("player health is : " + player.health);
  }

  dot(p, laser) {
    if(player.shielded)
    {
      player.shielded = false;
      console.log("player had a shield");
      return;
    }
    if (player.sprite.x >= 200){
      player.health -= 30;
      player.healthPercent-= 30;
      this.setValue(player.healthBar, player.healthPercent);
      player.sprite.x = player.sprite.x- 150;
      player.sprite.tint = Math.random() * 0xffffff;
      this.cameras.main.shake(300);
      console.log("player health is : " + player.health);
    }
    else{
      player.health -= 30;
      player.healthPercent -= 30;
      this.setValue(player.healthBar, player.healthPercent);
      player.sprite.x = player.sprite.x + 200;
      this.laser.tint = Math.random() * 0xffffff;
      this.cameras.main.shake(300);
      console.log("player health is : " + player.health);
    }
    if (player.health<= 0){
      this.gameOver();
    }
  }

  powerupOne(p, powerup1){
    powerup1.destroy();
    player.multishot = true;
  }
  powerupTwo(p, powerup2){
    powerup2.destroy();
    player.pierce = true;
  }
  powerupThree(p, powerup3){
    powerup3.destroy();
    player.saber = true;
  }
  powerupFour(p, powerup4){
    powerup4.destroy();
    player.kaboom = true;
  }
  hitPlayer(p, b)
  {
    if(player.shielded)
    {
      player.shielded = false;
      console.log("player had a shield");
      return;
    }
    player.health -= 5;
    player.healthPercent -= 5;
    this.setValue(player.healthBar, player.healthPercent);
    this.cameras.main.shake(400, 0.01); //duration, intensity
    if(player.health <= 0) //things can happen, be safe and less than 0
    {
      this.gameOver();
    }
    console.log("player health is : " + player.health);
  }

  hitBoss(p, b)
  {
    tutorialboss.healthPercent -= 33.33;
    this.setValue(tutorialboss.healthBar, tutorialboss.healthPercent);
    this.cameras.main.shake(400, 0.01); //duration, intensity
    tutorialboss.health -= 1;
    tutorialboss.sprite.x = 7150; //1550
    tutorialboss.speed = 2;
  }

  collide (barrier, pbullet)
  {
    pbullet.disableBody(true,true);
  }

  collide (barrier, bullet)
  {
    bullet.disableBody(true,true);
  }

  collideEnemy (enemy, pbullet)
  {
    pbullet.disableBody(true,true);
    //enemy.disableBody(true, true);
    enemy.destroy();
    this.numEnemiesKilled += 1;
  }
  meleeEnemy (enemy, psword)
  {
    psword.disableBody(true,true);
    enemy.destroy();
    this.numEnemiesKilled += 1;
    player.speed += 0.1;
  }


  pierceEnemy (enemy, pbullet)
  {
    //enemy.disableBody(true, true);
    enemy.destroy();
    this.numEnemiesKilled += 1;
  }

  collideBoss (b, pbullet)
  {
    pbullet.disableBody(true,true);
    tutorialboss.healthPercent -= 1;
    tutorialboss.health -= 1;
    this.setValue(tutorialboss.healthBar, tutorialboss.healthPercent);
    //this.cameras.main.shake(400, 0.01); //duration, intensity
  }

  pierceBoss (b, pbullet)
  {
    tutorialboss.healthPercent -= 0.1;
    tutorialboss.health -= 0.1;
    this.setValue(tutorialboss.healthBar, tutorialboss.healthPercent);
  }

  gameOver()
  {
    this.tutorialtheme.stop();
    this.scene.start('mainMenu');
    //this.theme.stop();
    // flag to set player is dead
    player.isAlive = false;
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

  moveToGame()
  {
    this.tutorialtheme.stop();
    this.scene.start('bossScene');
  }

}

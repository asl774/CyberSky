class BossScene extends Phaser.Scene{
  constructor(){
    super("bossScene");
  }

  init()
  {
    this.enemiesWave1;
    this.enemiesWave2;
    this.enemiesWave3;
    this.numEnemiesCreated = 0;
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
    this.playertrap;

    player.health = 100;
    player.isAlive = true;
    player.healthPercent = 100;
    player.healthBar = 0;

    boss.speed = 2;
    boss.health = 100;
    boss.minX = 6700;
    boss.isAlive = true;
    boss.healthPercent = 100;
    boss.healthBar = 0;

    this.enemyx = 1400;
    this.enemyWave = 1;
    this.worldsX = 0;
    this.stage = 1;
  }


  create()
  {

    var add = this.add;
    var sound = this.sound;
    /*
    this.input.once('pointerup', function (event) {
    this.sound.stopAll();
    this.scene.start('winScene');
    }, this);
    */
    //audio

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
    this.beamsound = this.sound.add('beamsound');
    this.firebreathsound = this.sound.add('firebreathsound');
    this.firebreathsound2 = this.sound.add('firebreathsound2');
    this.batsound = this.sound.add('batsound');
    this.bonesound = this.sound.add('bonesound');
    this.dinodie = this.sound.add('dinodie');
    this.deathSound = this.sound.add('death');
    this.hastesound = this.sound.add('hastesfx');
    this.trapsfx = this.sound.add('trapsfx')


    if (firstLevel) {
        this.resetScene();
    }

    // background
    this.cameras.main.setBounds(0, 0, 1400 - 40, 560);
    this.physics.world.setBounds(0, 30, 1400 - 40, 560);
    var randNum = Math.random();
    if (randNum > 0 && randNum <= 0.25) //0,0.33
    {
      this.add.image(0, 0, 'background12').setOrigin(0);     //background1
      this.add.image(5600, 0, 'background13').setOrigin(0);   //background2
      currentBackground = 'background13';
    }
    else if (randNum > 0.25 && randNum <= 0.5) //0,0.33
    {
      this.add.image(0, 0, 'background14').setOrigin(0);      //background3
      this.add.image(5600, 0, 'background15').setOrigin(0);   //background4
      currentBackground = 'background15';
    }
    else if (randNum > 0.5 && randNum <= 0.75) //0,0.33
    {
      this.add.image(0, 0, 'background16').setOrigin(0);      //background5
      this.add.image(5600, 0, 'background17').setOrigin(0);   //background6
      currentBackground = 'background17';
    }
    else if (randNum > 0.75 && randNum <= 1)
    {
      this.add.image(0, 0, 'background7').setOrigin(0);
      this.add.image(5600, 0, 'background8').setOrigin(0);
      currentBackground = 'background8'; 
    }
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
    this.playertrap = this.physics.add.group(); //create trap
    //enemies
    this.wave1 = this.physics.add.group();
    //powerups
    //this.powerups = this.physics.add.group();
    this.powerup1 = this.physics.add.group();
    this.powerup2 = this.physics.add.group();
    this.powerup3 = this.physics.add.group();
    this.powerup4 = this.physics.add.group();
    // ---- ui for pu-----//
    //this.puui = this.add.image(500, 685, 'PUUI');
    //this.puui2 = this.add.image(1900, 685, 'PUUI');
    //this.puui3 = this.add.image(3400, 685, 'PUUI');
    //this.puui4 = this.add.image(4700, 685, 'PUUI');
    //this.puui5 = this.add.image(6100, 685, 'PUUI');
    this.hud = this.add.image(700, 50, "hud").setAlpha(0.80);
    //this.powerupBar = this.makePowerupBar(350, 0, 0xffffff);
    this.abilityIcon1 = this.add.image(500, 34, "healAbility");
    this.abilityIcon2 = this.add.image(550, 34, "shieldAbility");
    this.abilityIcon3 = this.add.image(600, 34, "dashAbility");
    this.powerupIcon1 = this.add.image(780, 34, "multishotPU"); //480
    this.powerupIcon2 = this.add.image(830, 34, "piercePU");    //530
    this.powerupIcon3 = this.add.image(880, 37, "trapPU");      //580
    this.powerupIcon4 = this.add.image(930, 35, "hastePU");     //630
    this.powerupIcon1.setVisible(player.multishot);
    this.powerupIcon2.setVisible(player.pierce);
    this.powerupIcon3.setVisible(player.trap);
    this.powerupIcon4.setVisible(player.haste > 0);
    //boss health bar
    boss.healthBar = this.makeBar(5850,50,0xe74c3c); //5600
    this.setValue(boss.healthBar, 100);
    boss.healthBar.setVisible(false);
    //barrier
    this.barrier0 = this.physics.add.sprite(0, 300, 'barrier');
    this.barrier = this.physics.add.sprite(1400, 300, 'barrier');
    this.barrier2 = this.physics.add.sprite(1400 * 2, 300, 'barrier');
    this.barrier3 = this.physics.add.sprite(1400 * 3, 300, 'barrier');
    this.barrier4 = this.physics.add.sprite(1400 * 4, 300, 'barrier');
    this.barrier5 = this.physics.add.sprite(6470, 300, 'barrier');
    this.barrier6 = this.physics.add.sprite(6300, 600, 'bottombarrier');
    this.barrier7 = this.physics.add.sprite(6300, 0, 'bottombarrier');
    this.barrier0.setVisible(false);
    this.barrier.setVisible(false);
    this.barrier2.setVisible(false);
    this.barrier3.setVisible(false);
    this.barrier4.setVisible(false);
    this.barrier5.setVisible(false);
    this.barrier6.setVisible(false);
    this.barrier7.setVisible(false);
    // goal / end of level
    this.treasure = this.physics.add.sprite(7000 - 70, this.sys.game.config.height / 2, 'treasure');
    this.treasure.setScale(0.6);
    //boss
    //if (infiniteMode == true){
        //this.theme.play();
        //difficulty = Phaser.Math.Between(1,4);
    //}
    if (difficulty == 1 || difficulty == 5)
        boss.sprite = this.physics.add.sprite(7150,300, 'boss'); //boss
    else if (difficulty == 2)
        boss.sprite = this.physics.add.sprite(7150,300, 'octoboss');
    else if (difficulty == 3)
        boss.sprite = this.physics.add.sprite(7150,300, 'yakuzaboss');
    else if (difficulty == 4)
        boss.sprite = this.physics.add.sprite(7150,300, 'horsemanboss');
    boss.sprite.setVisible(false);
    this.bullets = this.physics.add.group(); //create attack 1
    this.pierceBullets = this.physics.add.group();
    this.laser = this.physics.add.group(); // create attack 2
    //colliders / triggers
    this.physics.add.overlap(player.sprite, this.bullets, this.getHit, null, this); //trigger b/w player & bullets
    this.physics.add.overlap(player.sprite, this.pierceBullets, this.getHitPierce, null, this); //trigger b/w player & bullets
    this.physics.add.overlap(player.sprite, this.laser, this.dot, null, this); //trigger b/w player & laser
    this.physics.add.overlap(player.sprite, this.treasure, this.endLevel, null, this); //trigger b/w player & treasure
    this.physics.add.overlap(player.sprite, boss.sprite, this.hitPlayer, null, this); //trigger b/w player & boss
    //this.physics.add.overlap(player.sprite, this.powerups, this.powerup, null, this); //trigger b/w player & powerup ////////////////////////////////////////////////////
    this.physics.add.overlap(player.sprite, this.powerup1, this.powerupOne, null, this);
    this.physics.add.overlap(player.sprite, this.powerup2, this.powerupTwo, null, this);
    this.physics.add.overlap(player.sprite, this.powerup3, this.powerupThree, null, this);
    this.physics.add.overlap(player.sprite, this.powerup4, this.powerupFour, null, this);
    this.physics.add.overlap(boss.sprite, this.playerbullets, this.collideBoss, null, this); //trigger b/w playerbullets & boss
    this.physics.add.overlap(this.wave1, this.playertrap, this.meleeEnemy, null, this);//melee enemy
    this.physics.add.overlap(boss.sprite, this.playerbigbullets, this.pierceBoss, null, this); //trigger b/w playerbigbullets & boss
    this.physics.add.overlap(this.wave1, this.playerbullets, this.collideEnemy, null, this); //trigger b/w playerbullets & enemy
    this.physics.add.overlap(this.wave1, this.playerbigbullets, this.pierceEnemy, null, this); //trigger b/w playerbigbullets & enemy
    this.physics.add.overlap(this.barrier0, this.bullets, this.collide, null, this); //trigger b/w boss bullets & barrier
    this.physics.add.overlap(this.barrier, this.playerbullets, this.collide, null, this); //trigger b/w playerbullets & barrier
    this.physics.add.overlap(this.barrier, this.playerbigbullets, this.collide, null, this); //trigger b/w playerbigbullets & barrier
    this.physics.add.overlap(this.barrier2, this.playerbullets, this.collide, null, this); //trigger b/w playerbullets & barrier
    this.physics.add.overlap(this.barrier2, this.playerbigbullets, this.collide, null, this); //trigger b/w playerbigbullets & barrier
    this.physics.add.overlap(this.barrier3, this.playerbullets, this.collide, null, this); //trigger b/w playerbullets & barrier
    this.physics.add.overlap(this.barrier3, this.playerbigbullets, this.collide, null, this); //trigger b/w playerbigbullets & barrier
    this.physics.add.overlap(this.barrier4, this.bullets, this.collide, null, this); //trigger b/w boss bullets & barrier
    this.physics.add.overlap(this.barrier4, this.playerbullets, this.collide, null, this); //trigger b/w playerbullets & barrier
    this.physics.add.overlap(this.barrier4, this.playerbigbullets, this.collide, null, this); //trigger b/w playerbigbullets & barrier
    this.physics.add.overlap(this.barrier5, this.playerbullets, this.collide, null, this); //trigger b/w playerbullets & barrier
    this.physics.add.overlap(this.barrier5, this.playerbigbullets, this.collide, null, this); //trigger b/w playerbigbullets & barrier
    this.physics.add.overlap(this.barrier6, this.bullets, this.collide, null, this); //trigger b/w boss bullets & bottombarrier
    this.physics.add.overlap(this.barrier7, this.bullets, this.collide, null, this); //trigger b/w boss bullets & bottombarrier
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
    //this.bkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    this.kkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    this.lkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    this.pkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    //timer testing
    this.timer = this.time.addEvent({delay : 2500, callback: this.pickAbility, callbackScope: this, loop: true, paused: true });
    this.yakuzaTimer = this.time.addEvent({delay : 500, callback: this.pickAbility, callbackScope: this, loop: true, paused: true });
    this.timer2 = this.time.addEvent({delay : 2500, callback: this.abilityThree, callbackScope: this, loop: true, paused: true });
    this.waveAttackTimer = this.time.addEvent({delay : 4000, callback: this.waveAttack, callbackScope: this, loop: true, paused: false }); //2500
    this.waveCreateTimer = this.time.addEvent({delay : 2000, callback: this.createWave, callbackScope: this, loop: true, paused: false }); //1500
    this.poweruptimer1 = this.time.addEvent({delay : 5000, callback: this.createPowerup1, callbackScope: this, loop: true, paused: false });
    this.poweruptimer2 = this.time.addEvent({delay : 5000, callback: this.createPowerup2, callbackScope: this, loop: true, paused: true });
    this.poweruptimer3 = this.time.addEvent({delay : 5000, callback: this.createPowerup3, callbackScope: this, loop: true, paused: true });
    this.poweruptimer4 = this.time.addEvent({delay : 5000, callback: this.createPowerup4, callbackScope: this, loop: true, paused: true });
    this.poweruptimer5 = this.time.addEvent({delay : 5000, callback: this.createPowerup5, callbackScope: this, loop: true, paused: true });
    this.abilityTimer1 = this.time.addEvent({delay : 1350 - player.haste, callback: this.pauseAbilityTimer1, callbackScope: this, loop: true, paused: false });
    this.abilityTimer2 = this.time.addEvent({delay : 3000 - player.haste, callback: this.pauseAbilityTimer2, callbackScope: this, loop: true, paused: false });
    this.abilityTimer3 = this.time.addEvent({delay : 1100 - player.haste, callback: this.pauseAbilityTimer3, callbackScope: this, loop: true, paused: false });
    this.healTimer = this.time.addEvent({delay : 2000 - player.haste, callback: this.pauseHealTimer, callbackScope: this, loop: true, paused: false });
    this.dashTimer = this.time.addEvent({delay : 1000 - player.haste, callback: this.pauseDashTimer, callbackScope: this, loop: true, paused: false });
    //debugging / things to remove later
    //this.timerText = this.add.text(6000, 100, "got here", { fontSize: '20px', fill: '#FFFFFF', align: "center" });
    //this.text = this.add.text(6000,150,"");

    this.levelText = this.add.text(100, 10, "level # and stage: " + difficulty, { fontSize: '20px', fill: '#00FFFF', align: "center" });
    //this.levelText2 = this.add.text(1500, 0, "level # and stage: " + difficulty, { fontSize: '20px', fill: '#FFFFFF', align: "center" });
    //this.levelText3 = this.add.text(2900, 0, "level # and stage: " + difficulty, { fontSize: '20px', fill: '#FFFFFF', align: "center" });
    //this.levelText4 = this.add.text(4300, 0, "level # and stage: " + difficulty, { fontSize: '20px', fill: '#FFFFFF', align: "center" });
    this.numKillsText = this.add.text(100, 25, "# enemies killed: " + this.numEnemiesKilled, { fontSize: '20px', fill: '#00FFFF', align: "center" });
    //this.numKillsText2 = this.add.text(1500, 15, "# enemies killed: " + this.numEnemiesKilled, { fontSize: '20px', fill: '#FFFFFF', align: "center" });
    //this.numKillsText3 = this.add.text(2900, 15, "# enemies killed: " + this.numEnemiesKilled, { fontSize: '20px', fill: '#FFFFFF', align: "center" });
    //this.numKillsText4 = this.add.text(4300, 15, "# enemies killed: " + this.numEnemiesKilled, { fontSize: '20px', fill: '#FFFFFF', align: "center" });
    this.abilityBarText = this.add.text(350, 10, "Abilities: ", { fontSize: '20px', fill: '#00FFFF', align: "center" });
    this.abilityText1 = this.add.text(496, 10, "A", { fontSize: 'bold 12px', fill: '#00FFFF', align: "center" });
    this.abilityText2 = this.add.text(547, 10, "S", { fontSize: 'bold 12px', fill: '#00FFFF', align: "center" });
    this.abilityText3 = this.add.text(598, 10, "D", { fontSize: 'bold 12px', fill: '#00FFFF', align: "center" });
    this.powerupBarText = this.add.text(650, 10, "Powerups: ", { fontSize: '20px', fill: '#00FFFF', align: "center" }); //350
    this.powerupText = this.add.text(778, 10, "Q", { fontSize: 'bold 12px', fill: '#00FFFF', align: "center" });        //478
    this.powerupText2 = this.add.text(829, 10, "W", { fontSize: 'bold 12px', fill: '#00FFFF', align: "center" });       //529
    this.powerupText3 = this.add.text(879, 10, "E", { fontSize: 'bold 12px', fill: '#00FFFF', align: "center" });       //579
    this.powerupText4 = this.add.text(920, 10, "N/A", { fontSize: 'bold 12px', fill: '#00FFFF', align: "center" });     //620
    this.hasteStackText = this.add.text(944, 39, "1", { fontSize: 'bold 11px', fill: '#00FFFF', align: "center" });     //644
    this.powerupText.setVisible(player.multishot);
    this.powerupText2.setVisible(player.pierce);
    this.powerupText3.setVisible(player.trap);
    this.powerupText4.setVisible(player.haste > 0);
    this.hasteStackText.setVisible(player.haste > 0);
    this.bossHPText = this.add.text(100, 50, "Boss HP: " + boss.healthPercent, { fontSize: '20px', fill: '#00FFFF', align: "center" });
    this.bossHPText.setVisible(false);
    /*
    this.timer3Text = this.add.text(100, 100, "wave1 attack: ", { fontSize: '20px', fill: '#FFFFFF', align: "center" });
    this.timer4Text = this.add.text(1500, 100, "wave2 attack: ", { fontSize: '20px', fill: '#FFFFFF', align: "center" });
    this.timer5Text = this.add.text(2900, 100, "wave3 attack: ", { fontSize: '20px', fill: '#FFFFFF', align: "center" });
    this.timer6Text = this.add.text(4300, 100, "wave4 attack: ", { fontSize: '20px', fill: '#FFFFFF', align: "center" });
    this.timer7Text = this.add.text(100, 150, "spawn more enemies: ", { fontSize: '20px', fill: '#FFFFFF', align: "center" });
    this.timer8Text = this.add.text(1500, 150, "spawn more enemies: ", { fontSize: '20px', fill: '#FFFFFF', align: "center" });
    this.timer9Text = this.add.text(2900, 150, "spawn more enemies: ", { fontSize: '20px', fill: '#FFFFFF', align: "center" });
    this.timer10Text = this.add.text(4300, 150, "spawn more enemies: ", { fontSize: '20px', fill: '#FFFFFF', align: "center" });
    this.poweruptimerText1 = this.add.text(100, 250, "next powerup progress: ", { fontSize: '20px', fill: '#FFFFFF', align: "center" });
    this.poweruptimerText2 = this.add.text(1500, 250, "next powerup progress: ", { fontSize: '20px', fill: '#FFFFFF', align: "center" });
    this.poweruptimerText3 = this.add.text(2900, 250, "next powerup progress: ", { fontSize: '20px', fill: '#FFFFFF', align: "center" });
    this.poweruptimerText4 = this.add.text(4300, 250, "next powerup progress: ", { fontSize: '20px', fill: '#FFFFFF', align: "center" });
    this.poweruptimerText5 = this.add.text(5700, 250, "next powerup progress: ", { fontSize: '20px', fill: '#FFFFFF', align: "center" });
    this.enemiesCreatedText1 = this.add.text(100, 300, "enemies created: ", { fontSize: '20px', fill: '#FFFFFF', align: "center" });
    */
  }

  update()
  {
    this.setHealthBarPosition(player.healthBar, player.sprite.x - 25, player.sprite.y - 40);
    this.levelText.setScrollFactor(0,0);
    this.numKillsText.setScrollFactor(0,0);
    this.powerupBarText.setScrollFactor(0,0);
    this.hud.setScrollFactor(0,0);
    this.abilityBarText.setScrollFactor(0,0);
    this.abilityText1.setScrollFactor(0,0);
    this.abilityText2.setScrollFactor(0,0);
    this.abilityText3.setScrollFactor(0,0);
    this.abilityIcon1.setScrollFactor(0,0);
    this.abilityIcon2.setScrollFactor(0,0);
    this.abilityIcon3.setScrollFactor(0,0);
    //this.powerupBar.setScrollFactor(0,0);
    this.powerupIcon1.setScrollFactor(0,0);
    this.powerupIcon2.setScrollFactor(0,0);
    this.powerupIcon3.setScrollFactor(0,0);
    this.powerupIcon4.setScrollFactor(0,0);
    this.powerupText.setScrollFactor(0,0);
    this.powerupText2.setScrollFactor(0,0);
    this.powerupText3.setScrollFactor(0,0);
    this.powerupText4.setScrollFactor(0,0);
    this.hasteStackText.setScrollFactor(0,0);
    this.bossHPText.setScrollFactor(0,0);
    this.levelText.setText("Level: " + difficulty + " Stage: " + this.stage);
    //this.levelText2.setText("Level: " + difficulty + " Stage: " + "2");
    //this.levelText3.setText("Level: " + difficulty + " Stage: " + "3");
    //this.levelText4.setText("Level: " + difficulty + " Stage: " + "4");
    this.numKillsText.setText("Enemies Killed: " + this.numEnemiesKilled);
    this.hasteStackText.setText(Math.ceil(player.haste / 150));
    //this.numKillsText2.setText("Enemies Killed: " + this.numEnemiesKilled);
    //this.numKillsText3.setText("Enemies Killed: " + this.numEnemiesKilled);
    //this.numKillsText4.setText("Enemies Killed: " + this.numEnemiesKilled);
    this.bossHPText.setText("Boss HP: " + Math.ceil(boss.healthPercent));
    /*
    this.timerText.setText("Timer Progress: " + this.timer.getProgress().toString().substr(0,4));
    this.timer3Text.setText("Wave 1 Attack Progress: " + this.waveAttackTimer.getProgress().toString().substr(0,4));
    this.timer4Text.setText("Wave 2 Attack Progress: " + this.waveAttackTimer.getProgress().toString().substr(0,4));
    this.timer5Text.setText("Wave 3 Attack Progress: " + this.waveAttackTimer.getProgress().toString().substr(0,4));
    this.timer6Text.setText("Wave 4 Attack Progress: " + this.waveAttackTimer.getProgress().toString().substr(0,4));
    this.timer7Text.setText("Spawn More Enemies:  " + this.waveCreateTimer.getProgress().toString().substr(0,4));
    this.timer8Text.setText("Spawn More Enemies:  " + this.waveCreateTimer.getProgress().toString().substr(0,4));
    this.timer9Text.setText("Spawn More Enemies:  " + this.waveCreateTimer.getProgress().toString().substr(0,4));
    this.timer10Text.setText("Spawn More Enemies:  " + this.waveCreateTimer.getProgress().toString().substr(0,4));
    this.poweruptimerText1.setText("Next Powerup Progress: " + this.poweruptimer1.getProgress().toString().substr(0,4));
    this.poweruptimerText2.setText("Next Powerup Progress: " + this.poweruptimer2.getProgress().toString().substr(0,4));
    this.poweruptimerText3.setText("Next Powerup Progress: " + this.poweruptimer3.getProgress().toString().substr(0,4));
    this.poweruptimerText4.setText("Next Powerup Progress: " + this.poweruptimer4.getProgress().toString().substr(0,4));
    this.poweruptimerText5.setText("Next Powerup Progress: " + this.poweruptimer5.getProgress().toString().substr(0,4));
    this.enemiesCreatedText1.setText("Enemies Created: " + this.numEnemiesCreated);
    */
    //check if player is alive

    if (!player.isAlive) {
      this.deathSound.play();
      this.sound.stopAll();
      player.speed = 10;
      player.haste = 0;
      this.deathSound.play();
      this.scene.start("loseScene");
    }
    if (player.health < 0)
        player.health = 0;
    if (boss.health < 0)
        boss.health = 0;
    if (player.shielded){
      player.sprite.setTexture('shield');
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
    if (this.numEnemiesCreated >= 10 * difficulty && this.numEnemiesCreated < 20 * difficulty){
      this.waveCreateTimer.paused = true;
    }
    // can move to wave 3
    if (this.numEnemiesCreated >= 20 * difficulty && this.numEnemiesCreated < 30 * difficulty){
      this.waveCreateTimer.paused = true;
    }
    // can move to wave 4
    if (this.numEnemiesCreated >= 30 * difficulty && this.numEnemiesCreated < 40 * difficulty){
      this.waveCreateTimer.paused = true;
    }
    // can move to boss
    if (this.numEnemiesCreated >= 40 * difficulty && this.numEnemiesCreated < 50 * difficulty){
      this.waveCreateTimer.paused = true;
    }
    if (this.numEnemiesKilled >= 0 * difficulty && this.numEnemiesKilled < 10 * difficulty){
      this.poweruptimer1.paused = false;
      this.cameras.main.setBounds(0, 0, 1400 - 40, 560);
      this.physics.world.setBounds(this.worldsX, 30, 1400 - 40, 560);
      this.enemyWave = 1;
    }
    if (this.numEnemiesKilled >= 10 * difficulty && this.numEnemiesKilled < 20 * difficulty){
      this.poweruptimer1.paused = true;
      this.cameras.main.setBounds(0, 0, 1400 * 2 - 40, 560);
      this.physics.world.setBounds(this.worldsX, 30, 1400, 560);
      this.enemyWave = 2;
    }
    // can move to wave 3
    if (this.numEnemiesKilled >= 20 * difficulty && this.numEnemiesKilled < 30 * difficulty){
      this.poweruptimer2.paused = true;
      this.cameras.main.setBounds(0, 0, 1400 * 3 - 40, 560);
      this.physics.world.setBounds(this.worldsX, 30, 1400, 560);
      this.enemyWave = 3;
    }
    // can move to wave 4
    if (this.numEnemiesKilled >= 30 * difficulty && this.numEnemiesKilled < 40 * difficulty){
      this.poweruptimer3.paused = true;
      this.cameras.main.setBounds(0, 0, 1400 * 4 - 40, 560);
      this.physics.world.setBounds(this.worldsX, 30, 1400, 560);
      this.enemyWave = 4;
    }
    // can move to boss
    if (this.numEnemiesKilled >= 39 * difficulty && this.numEnemiesKilled < 40 * difficulty){
      this.poweruptimer4.paused = true;
      this.cameras.main.setBounds(0, 0, 1400 * 4 + 1000, 560);
      this.physics.world.setBounds(this.worldsX, 30, 1440, 560);
      this.enemyWave = 5;
    }

    // make waves attack only when player crosses line
    if (player.sprite.x >= 0 && this.numEnemiesCreated < 10 * difficulty){
      this.stage = 1;
      this.waveAttackTimer.paused = false;
      this.waveCreateTimer.paused = false;
      this.poweruptimer1.paused = false;
      this.worldsX = 0;
    }
    if (this.numEnemiesKilled >= 10 * difficulty && player.sprite.x >= 1400 - 40 && this.numEnemiesCreated < 20 * difficulty){
      this.stage = 2;
      this.waveAttackTimer.paused = false;
      this.waveCreateTimer.paused = false;
      this.poweruptimer2.paused = false;
      this.worldsX = 1400 - 40;
    }
    if (this.numEnemiesKilled >= 20 * difficulty && player.sprite.x >= 2800 - 40 && this.numEnemiesCreated < 30 * difficulty){
      this.stage = 3;
      this.waveAttackTimer.paused = false;
      this.waveCreateTimer.paused = false;
      this.poweruptimer3.paused = false;
      this.worldsX = 2800 - 40;
    }
    if (this.numEnemiesKilled >= 30 * difficulty && player.sprite.x >= 4200 - 40 && this.numEnemiesCreated < 40 * difficulty){
      this.stage = 4;
      this.waveAttackTimer.paused = false;
      this.waveCreateTimer.paused = false;
      this.poweruptimer4.paused = false;
      this.worldsX = 4200 - 40;
    }
    if (this.numEnemiesKilled >= 40 * difficulty && player.sprite.x >= 5600){
      this.stage = 5;
      this.worldsX = 5600;
      this.poweruptimer5.paused = false;
      this.bossHPText.setVisible(true);
      //this.levelText.setVisible(false);
    //this.numKillsText.setVisible(false);
    //this.powerupBarText.setVisible(false);
    //this.powerupBar.setVisible(false);
    //this.powerupIcon1.setVisible(false);
    //this.powerupIcon2.setVisible(false);
    //this.powerupIcon3.setVisible(false);
    //this.powerupIcon4.setVisible(false);
    //this.powerupText.setVisible(false);
    //this.powerupText2.setVisible(false);
    //this.powerupText3.setVisible(false);
    //this.powerupText4.setVisible(false);
    //this.hasteStackText.setVisible(false);
    }
    // make enemies respawn at wave start point if they leave camera view
    for (var i = 0; i < this.wave1.getChildren().length; i++) {
      var enemy = this.wave1.getChildren()[i];
      enemy.update();
      if (enemy.x <= this.physics.world.bounds.x){
        enemy.x = this.enemyx; // - 1400
      }
      if (enemy.y < this.enemyMinY || enemy.y > this.enemyMaxY){
        enemy.x = this.enemyx;
        enemy.y = Phaser.Math.Between(100, 500);
      }
    }



    // make player stay in boss area
    if (this.numEnemiesKilled >= 40 * difficulty && player.sprite.x > 5600){
      this.cameras.main.setBounds(5600, 0, 1300, 560);
      this.physics.world.setBounds(5600, 30, 1350, 560);
    }

    // spawns boss when player crosses threshold
    if (this.numEnemiesKilled >= 40 * difficulty && player.sprite.x + 17 > 5700) { //400 //6000
      this.startBoss = true;
      this.cameras.main.setBounds(5600, 0, 1300, 560);
      this.physics.world.setBounds(5600, 30, 1350, 560);
    }
    if (this.startBoss){
      player.healthBar.setVisible(true);
      boss.healthBar.setVisible(true);
      boss.sprite.setVisible(true);
      boss.sprite.x -= boss.speed * 2;
      if (difficulty != 3)
        this.timer.paused = false;
      if (difficulty == 3)
        this.yakuzaTimer.paused = false;
    }
    if (boss.sprite.x < 7000 + 150 && boss.sprite.x > 7000 + 140){ //this.sys.game.config.width
      this.dinogrowl.play();
    }
    if (boss.sprite.x <= boss.minX) {
      boss.speed = 0;
      boss.sprite.setCollideWorldBounds(true);
      this.barrier5.disableBody(true,true);
    }
    if (boss.health <= 0) {
      //this.dinodie.play();
      this.ability3.setMute(true);
      boss.isAlive = false;
      boss.sprite.disableBody(true, true);
      boss.sprite.setActive(false);
      boss.sprite.setVisible(false);
      if (difficulty != 3)
        this.timer.paused = true;
      if (difficulty == 3)
        this.yakuzaTimer.paused = true;
    }
    //ability three
    if (this.timer.getProgress().toString().substr(0,4) < 0.4){
      if (this.timer2.getProgress().toString().substr(0,4) >= 0.05 && this.timer2.getProgress().toString().substr(0,4) <= 0.25){
        this.physics.moveToObject(boss.sprite, player.sprite, 1600);
      }
      else if (this.timer2.getProgress().toString().substr(0,4) > 0.25 && this.timer2.getProgress().toString().substr(0,4) <= 0.5){
        this.physics.moveToObject(boss.sprite, this.treasure, 1600);
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
    else if (Phaser.Input.Keyboard.JustDown(this.qkey) && player.multishot == true && player.canMultishotAgain)
    {
      this.abilityTimer1.isPaused = false;
      player.canMultishotAgain = false;
      this.throwtriplestar.play();
      let playerx = player.sprite.x;
      let playery = player.sprite.y;
      let pbullet1 = this.playerbullets.create(playerx, playery - 25, 'star');
      let pbullet2 = this.playerbullets.create(playerx, playery, 'star');
      let pbullet3 = this.playerbullets.create(playerx, playery + 25, 'star');
      pbullet1.setVelocityX(850);
      pbullet1.setVelocityY(-150);
      pbullet2.setVelocityX(850);
      pbullet3.setVelocityX(850);
      pbullet3.setVelocityY(150);
    }
    //press x key to throw big piercing star
    else if (Phaser.Input.Keyboard.JustDown(this.wkey) && player.pierce == true && player.canPierceAgain)
    {
      this.abilityTimer2.isPaused = false;
      player.canPierceAgain = false;
      this.throwbigstar.play();
      let playerx = player.sprite.x;
      let playery = player.sprite.y;
      let pbullet = this.playerbigbullets.create(playerx, playery, 'starbig');
      pbullet.setVelocityX(800);
    }
    //t r a p c a r d
    else if (Phaser.Input.Keyboard.JustDown(this.ekey) && player.trap == true && player.canTrapAgain)
    {
      this.abilityTimer3.isPaused = false;
      player.canTrapAgain = false;
      let playerx = player.sprite.x;
      let playery = player.sprite.y;
      let ptrap = this.playertrap.create(playerx, playery, 'trap');
      }
    //press c key to teleport 100 pixels in direction of arrow key
    else if (Phaser.Input.Keyboard.JustDown(this.dkey) && player.canDashAgain == true)
    {
      if (this.cursors.right.isDown){
          player.sprite.x += 100;
          this.dashTimer.isPaused = false;
          player.canDashAgain = false;
          this.teleport.play();
      }
      else if (this.cursors.left.isDown){
          player.sprite.x -= 100;
          this.dashTimer.isPaused = false;
          player.canDashAgain = false;
          this.teleport.play();
      }
      else if (this.cursors.up.isDown){
          player.sprite.y -= 100;
          this.dashTimer.isPaused = false;
          player.canDashAgain = false;
          this.teleport.play();
      }
      else if (this.cursors.down.isDown){
          player.sprite.y += 100;
          this.dashTimer.isPaused = false;
          player.canDashAgain = false;
          this.teleport.play();
      }
    }
    //press v to heal - this should go somewhere else
    else if(Phaser.Input.Keyboard.JustDown(this.akey) && player.health < 100 && player.canHealAgain == true)
    {
      this.healTimer.isPaused = false;
      player.canHealAgain = false;
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
    else if(Phaser.Input.Keyboard.JustDown(this.skey) && !player.shielded)
    {
      this.shieldUp.play();
      player.shielded = true;
      player.sprite.setTexture('shield');
      console.log("player shield is active");
    }

    else if(Phaser.Input.Keyboard.JustDown(this.pkey) && bossScenePaused == false)
    {
        this.cursors.right.reset();
        this.cursors.left.reset();
        this.cursors.up.reset();
        this.cursors.down.reset();
        bossScenePaused = true;
        theme.pause();
        this.scene.pause("bossScene");
        this.scene.launch("pauseScene");
    }
    if (bossScenePaused == false){
        theme.resume();
    }
    /*
    else if(Phaser.Input.Keyboard.JustDown(this.pkey) && gamePaused == true)
    {
        this.theme.resume();
        game.scene.resume("bossScene");
    }
    */
    /*
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
 */



  }

  makeBar(x, y, color){
    //draw the bar
    let bar = this.add.graphics();
    //color the bar
    bar.fillStyle(color, 1);
    //fill the bar with a rectangle
    bar.fillRect(0, 0, this.sys.game.config.width - 300, 20); //122
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

  makePowerupBar(x, y, color){
    //draw the bar
    let bar = this.add.graphics();
    //color the bar
    bar.fillStyle(color, 1);
    //fill the bar with a rectangle
    bar.fillRect(0, 0, 300, 40);
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

  resetScene(){
    theme = this.sound.add('theme', {volume: 0.3});
    theme.setLoop(true);
    theme.play();
    player.shielded = false;
    player.multishot = false;
    player.pierce = false;
    player.trap = false;
    player.haste = 0;
    player.canMultishotAgain = false;
    player.canPierceAgain = false;
    player.canTrapAgain = false;
}

  //this can be one function
  createPowerup1() {
    let x = Phaser.Math.Between(0 + 50, 1400 - 50);
    let y = -100;
    var randNum = Math.random();
    if (randNum > 0 && randNum <= 0.30)
      this.powerup1.create(x, y, 'multishotPU');
      this.powerup1.setVelocityY(100);
    if (randNum > 0.30 && randNum <= 0.55)
      this.powerup2.create(x, y, 'piercePU');
      this.powerup2.setVelocityY(100);
     if (randNum > 0.55 && randNum <= 0.85)
      this.powerup3.create(x, y, 'trapPU');
      this.powerup3.setVelocityY(100);
     if (randNum > 0.85 && randNum <= 1.0)
      this.powerup4.create(x, y, 'hastePU');
      this.powerup4.setVelocityY(100);
  }
  createPowerup2() {
    let x = Phaser.Math.Between(1400 + 50, 2800 - 50);
    let y = -100;
    var randNum = Math.random();
    if (randNum > 0 && randNum <= 0.30)
      this.powerup1.create(x, y, 'multishotPU');
      this.powerup1.setVelocityY(100);
    if (randNum > 0.30 && randNum <= 0.55)
      this.powerup2.create(x, y, 'piercePU');
      this.powerup2.setVelocityY(100);
     if (randNum > 0.55 && randNum <= 0.85)
      this.powerup3.create(x, y, 'trapPU');
      this.powerup3.setVelocityY(100);
     if (randNum > 0.85 && randNum <= 1.0)
      this.powerup4.create(x, y, 'hastePU');
      this.powerup4.setVelocityY(100);
    }
  createPowerup3() {
    let x = Phaser.Math.Between(2800 + 50, 4200 - 50);
    let y = -100;
    var randNum = Math.random();
    if (randNum > 0 && randNum <= 0.30)
      this.powerup1.create(x, y, 'multishotPU');
      this.powerup1.setVelocityY(100);
    if (randNum > 0.30 && randNum <= 0.55)
      this.powerup2.create(x, y, 'piercePU');
      this.powerup2.setVelocityY(100);
     if (randNum > 0.55 && randNum <= 0.85)
      this.powerup3.create(x, y, 'trapPU');
      this.powerup3.setVelocityY(100);
     if (randNum > 0.85 && randNum <= 1.0)
      this.powerup4.create(x, y, 'hastePU');
      this.powerup4.setVelocityY(100);
  }
  createPowerup4() {
    let x = Phaser.Math.Between(4200 + 50, 5600 - 50);
    let y = -100;
    var randNum = Math.random();
    if (randNum > 0 && randNum <= 0.30)
      this.powerup1.create(x, y, 'multishotPU');
      this.powerup1.setVelocityY(100);
    if (randNum > 0.30 && randNum <= 0.55)
      this.powerup2.create(x, y, 'piercePU');
      this.powerup2.setVelocityY(100);
     if (randNum > 0.55 && randNum <= 0.85)
      this.powerup3.create(x, y, 'trapPU');
      this.powerup3.setVelocityY(100);
     if (randNum > 0.85 && randNum <= 1.0)
      this.powerup4.create(x, y, 'hastePU');
      this.powerup4.setVelocityY(100);
  }
  createPowerup5() {
    let x = Phaser.Math.Between(5600 + 50, 6400 - 50);
    let y = -100;
    var randNum = Math.random();
    if (randNum > 0 && randNum <= 0.30)
      this.powerup1.create(x, y, 'multishotPU');
      this.powerup1.setVelocityY(100);
    if (randNum > 0.30 && randNum <= 0.55)
      this.powerup2.create(x, y, 'piercePU');
      this.powerup2.setVelocityY(100);
     if (randNum > 0.55 && randNum <= 0.85)
      this.powerup3.create(x, y, 'trapPU');
      this.powerup3.setVelocityY(100);
     if (randNum > 0.85 && randNum <= 1.0)
      this.powerup4.create(x, y, 'hastePU');
      this.powerup4.setVelocityY(100);

  }

  ///<summary> All the stuff that controls creating waves and their respective attacks </summary>

  createWave() {
    for (var j = 100; j < 600; j += 100)
    {
      var randNum = Math.random();
      if (randNum > 0 && randNum <= 0.07)
          this.wave1.create(this.enemyx, j, 'enemy1');
      else if (randNum > 0.07 && randNum <= 0.14)
          this.wave1.create(this.enemyx, j, 'enemy2');
      else if (randNum > 0.14 && randNum <= 0.21)
          this.wave1.create(this.enemyx, j, 'enemy3');
      else if (randNum > 0.21 && randNum <= 0.28)
          this.wave1.create(this.enemyx, j, 'enemy4');
      else if (randNum > 0.28 && randNum <= 0.35)
          this.wave1.create(this.enemyx, j, 'enemy5');
      else if (randNum > 0.35 && randNum <= 0.42)
          this.wave1.create(this.enemyx, j, 'enemy6');
      else if (randNum > 0.42 && randNum <= 0.49)
          this.wave1.create(this.enemyx, j, 'enemy7');
      else if (randNum > 0.49 && randNum <= 0.56)
          this.wave1.create(this.enemyx, j, 'enemy8');
      else if (randNum > 0.56 && randNum <= 0.63)
          this.wave1.create(this.enemyx, j, 'enemy9');
      else if (randNum > 0.63 && randNum <= 0.70)
          this.wave1.create(this.enemyx, j, 'enemy10');
      else if (randNum > 0.70 && randNum <= 0.77)
          this.wave1.create(this.enemyx, j, 'enemy11');
      else if (randNum > 0.77 && randNum <= 0.84)
          this.wave1.create(this.enemyx, j, 'enemy12');
      else if (randNum > 0.84 && randNum <= 0.91)
          this.wave1.create(this.enemyx, j, 'enemy13');
      else if (randNum > 0.91 && randNum <= 1.0)
          this.wave1.create(this.enemyx, j, 'enemy14');
    }
    this.numEnemiesCreated += 5;

    if(this.numEnemiesCreated >= (10 * difficulty) * this.enemyWave)
    {
      this.enemyx += 1400;
    }
  }

  waveAttack()
  {
    switch(this.enemyWave) {
        case 1:
          //TODO: make this change enemy stats
            this.wave1Attack(this.wave1);
            break;
        case 2:
            this.wave2Attack(this.wave1);
            break;
        case 3:
            this.wave3Attack(this.wave1);
            break;
        case 4:
            this.wave4Attack(this.wave1);
            break;
        case 5:
            console.log("waves are over, proceed to boss");
            break;
          }
  }

  wave1Attack(wave)
  {
    for (var i = 0; i < wave.getChildren().length; i++) {
      var enemy = wave.getChildren()[i];
      enemy.update();
      if (enemy){
        let bullet = this.bullets.create(enemy.x, enemy.y, 'bullet');
        bullet.setVelocityX(Phaser.Math.Between(-300 - (25 * difficulty), -400 - (25 * difficulty))); //-450,-600
      }
      enemy.setVelocityX(Phaser.Math.Between(-100 - (25 * difficulty), -300 - (25 * difficulty))); //-50,-400
      enemy.setVelocityY(Phaser.Math.Between(-50,50)); //-50,50
    }
  }

  wave2Attack(wave)
  {
    for (var i = 0; i < wave.getChildren().length; i++) {
      var enemy = wave.getChildren()[i];
      enemy.update();
      if (enemy){
        let bullet = this.bullets.create(enemy.x, enemy.y, 'bullet');
        bullet.setVelocityX(Phaser.Math.Between(-300 - (25 * difficulty), -400 - (25 * difficulty))); //-500,-700
      }
      enemy.setVelocityX(Phaser.Math.Between(-100 - (25 * difficulty), -300 - (25 * difficulty))); //-100,-500
      enemy.setVelocityY(Phaser.Math.Between(-50,50)); //-75,75
    }
  }

  wave3Attack(wave)
  {
    for (var i = 0; i < wave.getChildren().length; i++) {
      var enemy = wave.getChildren()[i];
      enemy.update();
      if (enemy){
        let bullet = this.bullets.create(enemy.x, enemy.y, 'bullet');
        bullet.setVelocityX(Phaser.Math.Between(-300 - (25 * difficulty), -400 - (25 * difficulty))); //-600,-800
      }
      enemy.setVelocityX(Phaser.Math.Between(-100 - (25 * difficulty), -300 - (25 * difficulty))); //-200,-600
      enemy.setVelocityY(Phaser.Math.Between(-50,50)); //-100,100
    }
  }

  wave4Attack(wave)
  {
    for (var i = 0; i < wave.getChildren().length; i++) {
      var enemy = wave.getChildren()[i];
      enemy.update();
      if (enemy){
        let bullet = this.bullets.create(enemy.x - 50, enemy.y, 'bullet');
        bullet.setVelocityX(Phaser.Math.Between(-300 - (25 * difficulty), -400 - (25 * difficulty))); //-700,-900
      }
      enemy.setVelocityX(Phaser.Math.Between(-100 - (25 * difficulty), -300 - (25 * difficulty))); // -400,-700
      enemy.setVelocityY(Phaser.Math.Between(-50,50)); // //-125,125
    }
  }

  pickAbility()
  {
    var ability = Math.random(); //Math.floor(Math.random() * 3) + 1;
    //if(ability >= 0 && ability < 0.20)
        //this.text.setText("Boss is using ability: 1");
    //else if (ability >= 0.20 && ability < 0.40)
        //this.text.setText("Boss is using ability: 2");
    //else if (ability >= 0.40 && ability < 0.60)
        //this.text.setText("Boss is using ability: 3");
    //else if (ability >= 0.60 && ability < 0.80)
        //this.text.setText("Boss is using ability: 4");
    //else
        //this.text.setText("Boss is using ability: 5");
    this.useAbility(ability);
  }

  useAbility(ability){
    if (difficulty > 1){
        if(ability >= 0 && ability < 0.20)
        {
          this.abilityOne();
        }
        else if (ability >= 0.20 && ability < 0.40)
        {
          this.abilityTwo();
        }
        else if (ability >= 0.40 && ability < 0.60)
        {
          this.abilityThree();
        }
        else if (ability >= 0.60 && ability < 0.80)
        {
          this.abilityFour();
        }
        else {
          this.abilityFive();
        }
    }
    else{
        if(ability >= 0 && ability < 0.33)
        {
          this.abilityOne();
        }
        else if (ability >= 0.33 && ability < 0.67)
        {
          this.abilityTwo();
        }
        else
        {
          this.abilityThree();
        }
    }

  }

  useDash(){
      var dash = Math.random();
      if(dash > 0 && dash <= 0.5)
      {
        boss.sprite.y += 100;
      }
      else if (dash > 0.5 && dash <= 1.0)
      {
        boss.sprite.y -= 100;
      }
  }

  bossMove() {
      var move = Math.random();
      if(move > 0 && move <= 0.5)
      {
        boss.sprite.setVelocityY(Phaser.Math.Between(50,100));
      }
      else if (move > 0.5 && move <= 1.0)
      {
        boss.sprite.setVelocityY(Phaser.Math.Between(-50,-100));
      }
      if (boss.sprite.y < 100)
        boss.sprite.setVelocityY(Phaser.Math.Between(50,100));
      if (boss.sprite.y > 500)
        boss.sprite.setVelocityY(Phaser.Math.Between(-50,-100));
  }

  abilityOne() {
    this.ability1.play();
    console.log("using ability one");
    this.timer2.paused = true;
    this.ability3.setMute(true);
    for(let i = 0; i < 5; i++) //10
    {
      let x = boss.sprite.x;
      let y = Phaser.Math.Between(boss.sprite.y - 300, boss.sprite.y + 300); //can and should randomize this

      let bullet = this.bullets.create(x, y, 'bullet');
      bullet.setVelocityX(Phaser.Math.Between(-1000,-1500));
    }
  }

  abilityTwo(){
    //this.ability2.play();
    console.log("using ability two");
    this.timer2.paused = true;
    this.ability3.setMute(true);
    //TODO: switch out difficulty for a string w/ the selected (random) boss
    if (difficulty == 1 || difficulty == 5){
        this.ability2.play();
        for(let i = 0; i < 1; i++){
            let x = Phaser.Math.Between(5600, boss.sprite.x - 250);
            let y = -200;
            let laser = this.laser.create(x, y, 'laser');
            laser.setVelocityY(400);
        }
    }
    else if (difficulty == 2){
        this.ability2.play();
        var x = 0;
        var y = 0;
        var randNum = Math.random();
        if (randNum > 0 && randNum <= 0.125){
          x = boss.sprite.x + 150;
          y = boss.sprite.y - 150;
        }
        else if (randNum > 0.125 && randNum <= 0.25){
          x = boss.sprite.x - 225;
          y = boss.sprite.y;
        }
        else if (randNum > 0.25 && randNum <= 0.375){
          x = boss.sprite.x - 250;
          y = boss.sprite.y - 70;
        }
        else if (randNum > 0.375 && randNum <= 0.50){
          x = boss.sprite.x - 260;
          y = boss.sprite.y + 90;
        }
        else if (randNum > 0.50 && randNum <= 0.625){
          x = boss.sprite.x - 100;
          y = boss.sprite.y + 150;
        }
        else if (randNum > 0.625 && randNum <= 0.75){
          x = boss.sprite.x - 125;
          y = boss.sprite.y + 70;
        }
        else if (randNum > 0.75 && randNum <= 0.875){
          x = boss.sprite.x + 180;
          y = boss.sprite.y - 100;
        }
        else if (randNum > 0.875 && randNum <= 1.0){
          x = boss.sprite.x + 170;
          y = boss.sprite.y + 40;
        }
        for(let i = 0; i < 500; i++)
        {
          let bullet = this.bullets.create(x, y, 'octobeam');
          bullet.setVelocityX(Phaser.Math.Between(-400,-2000));
        }
    }
    else if (difficulty == 3){
      this.throwbigstar.play();
      let x = boss.sprite.x;
      let y = boss.sprite.y;
      let bullet = this.pierceBullets.create(x, y, 'starbig');
      bullet.setVelocityX(-800);
      //this.physics.moveToObject(bullet, this.player, 1600);
      this.bossMove();
    }
    else if (difficulty == 4){

        // skeleton army
        if (this.wave1.getLength() > 1){
          this.teleport.play();
          var randNum = Math.random();
          if (randNum > 0 && randNum <= 0.50){
            boss.sprite.y += 50;
          }
          else {
            boss.sprite.y -= 50;
          }
        }

        else{
          this.bonesound.play();
          var x = boss.sprite.x - 280;
          var y = boss.sprite.y - 180;
          for (var i = 0; i < 7; i++){
            let bullet = this.wave1.create(x, y, 'skeleton');
            y += 60;
          }
          x = boss.sprite.x - 350;
          y = boss.sprite.y - 180;
          for (var i = 0; i < 7; i++){
            let bullet = this.wave1.create(x, y, 'skeleton');
            y += 60;
          }
        }
    }

  }

  abilityThree() {
    if (difficulty != 3)    {
        this.ability3.play();
        console.log("using ability three");
        this.timer2.paused = false;
        this.ability3.setMute(false);
    }
    else {
        this.teleport.play();
        this.timer2.paused = true;
        this.ability3.setMute(true);
        this.useDash();
    }
  }

  abilityFour() {
    //this.firebreathsound2.play();
    console.log("using ability four");
    this.timer2.paused = true;
    this.ability3.setMute(true);
    if (difficulty == 1 || difficulty == 5){
        this.firebreathsound2.play();
        for(let i = 0; i < 800; i++)
        {
          let x = boss.sprite.x - 150;
          let y = boss.sprite.y - 150;
          let bullet = this.bullets.create(x, y, 'fireball');
          bullet.setVelocityX(Phaser.Math.Between(-1000,-200));
          bullet.setVelocityY(Phaser.Math.Between(200,1000));
        }
    }
    else if (difficulty == 2){
        this.firebreathsound2.play();
        var x = boss.sprite.x + 500;
        var y = boss.sprite.y + 45;
        let bullet = this.pierceBullets.create(x, y, 'tsunami');
        bullet.setVelocityX(-800);
    }

    else if (difficulty == 3){
      this.throwtriplestar.play();
      let x = boss.sprite.x; //boss.sprite.x
      let y = boss.sprite.y;
      let bullet1 = this.bullets.create(x, y - 25, 'star');
      let bullet2 = this.bullets.create(x, y, 'star');
      let bullet3 = this.bullets.create(x, y + 25, 'star');
      bullet1.setVelocityX(-800);
      bullet1.setVelocityY(-100);
      bullet2.setVelocityX(-800);
      bullet3.setVelocityX(-800);
      bullet3.setVelocityY(100);
      //this.physics.moveToObject(bullet1, this.player, 1600);
      //this.physics.moveToObject(bullet2, this.player, 1600);
      //this.physics.moveToObject(bullet3, this.player, 1600);
      this.bossMove();
    }

    else if (difficulty == 4){
        this.firebreathsound2.play();
                // firerain
        for(let i = 0; i < 5; i++){
            let x = Phaser.Math.Between(5600, boss.sprite.x - 250);
            let y = -200;
            let laser = this.laser.create(x, y, 'firerain');
            laser.setVelocityY(500);
        }
    }

  }

  abilityFive() {
    //this.beamsound.play();
    console.log("using ability five");
    this.timer2.paused = true;
    this.ability3.setMute(true);
    if (difficulty == 1 || difficulty == 5){
        this.beamsound.play();
        var x = boss.sprite.x - 180;
        var y = boss.sprite.y - 120;
        for(let i = 0; i < 500; i++)
        {
          let bullet = this.bullets.create(x, y, 'beam');
          bullet.setVelocityX(Phaser.Math.Between(-400,-2000));
        }
    }
    else if (difficulty == 2){
        this.beamsound.play();
        var x = boss.sprite.x + 140;
        var y = boss.sprite.y - 50;
        for(let i = 0; i < 100; i++)
        {
          let bullet = this.bullets.create(x, y, 'octobeam3');
          bullet.setVelocityX(Phaser.Math.Between(-500,-2000));
          let bullet2 = this.bullets.create(x, y, 'octobeam3');
          bullet2.setVelocityX(Phaser.Math.Between(-500,-2000));
          bullet2.setVelocityY(40);
          let bullet3 = this.bullets.create(x, y, 'octobeam3');
          bullet3.setVelocityX(Phaser.Math.Between(-500,-2000));
          bullet3.setVelocityY(-40);
          let bullet4 = this.bullets.create(x, y, 'octobeam3');
          bullet4.setVelocityX(Phaser.Math.Between(-500,-2000));
          bullet4.setVelocityY(20);
          let bullet5 = this.bullets.create(x, y, 'octobeam3');
          bullet5.setVelocityX(Phaser.Math.Between(-500,-2000));
          bullet5.setVelocityY(-20);
          let bullet6 = this.bullets.create(x, y, 'octobeam3');
          bullet6.setVelocityX(Phaser.Math.Between(-500,-2000));
          bullet6.setVelocityY(60);
          let bullet7 = this.bullets.create(x, y, 'octobeam3');
          bullet7.setVelocityX(Phaser.Math.Between(-500,-2000));
          bullet7.setVelocityY(-60);
          let bullet8 = this.bullets.create(x, y, 'octobeambottom');
          bullet8.setVelocityX(Phaser.Math.Between(-500,-2000));
          bullet8.setVelocityY(80);
          let bullet9 = this.bullets.create(x, y, 'octobeamtop');
          bullet9.setVelocityX(Phaser.Math.Between(-500,-2000));
          bullet9.setVelocityY(-80);
        }
    }

    else if (difficulty == 3){
        this.throwstar.play();
        // yakuza single star throw
      let x = boss.sprite.x;
      let y = boss.sprite.y;
      let bullet = this.bullets.create(x, y, 'star');
      bullet.setVelocityX(-800);
      //this.physics.moveToObject(bullet, this.player, 1600);
      this.bossMove();
    }
    else if (difficulty == 4){
        this.batsound.play();
      // horseman bat beam
      var x = boss.sprite.x - 180;
      var y = boss.sprite.y - 120;
      var vel = -300;
      for (var i = 0; i < 5; i++){
        let bullet = this.bullets.create(x, y, 'bat');
        bullet.setVelocityX(vel);
        x -= 70;
      }
    }



  }

  getHit(p, bullet)
  {
    bullet.disableBody(true,true);
    if(player.shielded)
    {
      player.shielded = false;
      player.sprite.setTexture('ninja');
      console.log("player had a shield");
      return;
    }
    player.health -= 10 + (difficulty*2);
    player.healthPercent -= 10 + (difficulty*2);
    this.setValue(player.healthBar, player.healthPercent);
    if(player.health <= 0) //things can happen, be safe and less than 0
    {
      this.gameOver();
    }
    console.log("player health is : " + player.health);
  }

  getHitPierce(p, bullet)
  {
    if(player.shielded)
    {
      player.shielded = false;
      player.sprite.setTexture('ninja');
      console.log("player had a shield");
      return;
    }
    player.health -= 2.5;
    player.healthPercent -= 2.5;
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
      player.sprite.setTexture('ninja');
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
    this.powerupIcon1.setVisible(true);
    this.powerupText.setVisible(true);
    if(player.health > 90)
    {
      player.health = 100;
      player.healthPercent = 100;
    } else {
      player.health += 10;
      player.healthPercent += 10;
    }
    this.setValue(player.healthBar, player.healthPercent);
  }
  powerupTwo(p, powerup2){
    powerup2.destroy();
    player.pierce = true;
    this.powerupIcon2.setVisible(true);
    this.powerupText2.setVisible(true);
    if(player.health > 90)
    {
      player.health = 100;
      player.healthPercent = 100;
    } else {
      player.health += 10;
      player.healthPercent += 10;
    }
    this.setValue(player.healthBar, player.healthPercent);
  }
  powerupThree(p, powerup3){
    powerup3.destroy();
    player.trap = true;
    this.powerupIcon3.setVisible(true);
    this.powerupText3.setVisible(true);
    if(player.health > 90)
    {
      player.health = 100;
      player.healthPercent = 100;
    } else {
      player.health += 10;
      player.healthPercent += 10;
    }
    this.setValue(player.healthBar, player.healthPercent);
  }
  powerupFour(p, powerup4){
    powerup4.destroy();
    this.hastesound.play();
    this.powerupIcon4.setVisible(true);
    this.powerupText4.setVisible(true);
    this.hasteStackText.setVisible(true);
    if (player.haste >= 1000){
      if(player.health > 90)
      {
        player.health = 100;
        player.healthPercent = 100;
      } else {
        player.health += 10;
        player.healthPercent += 10;
        console.log("player.haste is: ", player.haste)
      }
      this.setValue(player.healthBar, player.healthPercent);
    }else{
      player.haste += 100;
      console.log("player.haste is: ", player.haste)
      }
  }

  pauseAbilityTimer1(){
    this.abilityTimer1.isPaused = true;
    player.canMultishotAgain = true;
  }

  pauseAbilityTimer2(){
    this.abilityTimer2.isPaused = true;
    player.canPierceAgain = true;
  }

  pauseAbilityTimer3(){
    this.abilityTimer3.isPaused = true;
    player.canTrapAgain = true;
  }

  pauseDashTimer(){
    this.dashTimer.isPaused = true;
    player.canDashAgain = true;
  }

  pauseHealTimer(){
    this.healTimer.isPaused = true;
    player.canHealAgain = true;
  }

  hitPlayer(p, b)
  {
    if(player.shielded)
    {
      player.shielded = false;
      player.sprite.setTexture('ninja');
      console.log("player had a shield");
      return;
    }
    player.health -= 1 * difficulty;
    player.healthPercent -= 1 * difficulty;
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
    boss.healthPercent -= 33.33;
    this.setValue(boss.healthBar, boss.healthPercent);
    this.cameras.main.shake(400, 0.01); //duration, intensity
    boss.health -= 1;
    boss.sprite.x = 7150; //1550
    boss.speed = 2;
  }

  //why cant these be one function? its the same thing
  collide (barrier, pbullet)
  {
    pbullet.destroy();
  }

  collide (barrier, bullet)
  {
    bullet.destroy();
  }

  collideEnemy (enemy, pbullet)
  {
    //pbullet.disableBody(true,true);
    pbullet.destroy();
    //enemy.disableBody(true, true);
    enemy.destroy();
    this.numEnemiesKilled += 1;
  }
  meleeEnemy (enemy, ptrap)
  {
    ptrap.disableBody(true,true);
    this.trapsfx.play();
    enemy.destroy();
    this.numEnemiesKilled += 1;
    if (player.speed <= 19.95){
      player.speed += 0.05;
    }
  }

  pierceEnemy (enemy, pbullet)
  {
    enemy.destroy();
    this.numEnemiesKilled += 1;
  }

  collideBoss (b, pbullet)
  {
    pbullet.destroy();
    boss.healthPercent -= 0.5 + (difficulty/2);
    boss.health -= 0.5 + (difficulty/2);
    if (boss.health <= 0)
    {
        this.setValue(boss.healthBar, 0);
        boss.health = 0;
        player.sprite.tint = 0xFFC79D;
    }
    else
        this.setValue(boss.healthBar, boss.healthPercent);
    //this.cameras.main.shake(400, 0.01); //duration, intensity
  }

  pierceBoss (b, pbullet)
  {
    boss.healthPercent -= 0.05;
    boss.health -= 0.05;
    if (boss.health <= 0)
    {
        this.setValue(boss.healthBar, 0);
        boss.health = 0;
        player.sprite.tint = 0xFFC79D;
    }
    else
        this.setValue(boss.healthBar, boss.healthPercent);
  }

  gameOver()
  {
    player.sprite.tint = 0xFFC79D;
    this.deathSound.play();
    this.sound.stopAll();
    this.deathSound.play();
    this.scene.start("loseScene");
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

  endLevel()
  {
    difficulty += 1; //increase difficulty
    firstLevel = false;
    if(difficulty >= 6) //win condition && infiniteMode == false
    {
      this.sound.stopAll();
      this.scene.start("winScene");
    }
    else {
      this.scene.restart(); //start level over
    }
  }

}

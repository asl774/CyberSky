class Tutorial extends Phaser.Scene{
  constructor(){
    super("tutorialScene");
  }

  init()
  {
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
    this.playerbullets;
    this.playertrap;

      player.speed = 10;
      player.health = 80;
      player.isAlive = true;
      player.healthPercent = 100;
      player.healthBar = 0;
      player.shielded = false;
      player.multishot = false;
      player.pierce = false;
      player.trap = false;
      player.hasteCollected = false;
      this.haste = false;
      player.haste = 0;

    tutorialboss.speed = 2;
    tutorialboss.health = 100;
    tutorialboss.minX = 2500; //6700
    tutorialboss.healthPercent = 100;
    tutorialboss.healthBar = 0;

    this.enemyx = 1400;
    this.enemyWave = 1;
    this.worldsX = 0;

    this.createdPowerup1 = false;
    this.createdPowerup2 = false;
    this.createdPowerup3 = false;
    this.createdPowerup4 = false;
    this.createdPowerup5 = false;
    this.createdPowerup6 = false;

    this.firstSpacePressed = false;
    this.firstAPressed = false;
    this.firstSPressed = false;
    this.firstDPressed = false;
    this.firstQPressed = false;
    this.firstWPressed = false;
    this.firstEPressed = false;

    this.canGrabTreasure = false;
  }


  create()
  {
/*
    this.input.once('pointerup', function (event) {
      tutorialtheme.stop();
      firstLevel = true;
      this.scene.start('bossScene');
    }, this);
*/
    //local vars
    var sound = this.sound;
    var physics = this.physics;
    var addPhysics = this.physics.add;
    var mainCamera = this.cameras.main;
    var add = this.add;
    var keyboard = this.input.keyboard;
    var time = this.time;

    tutorialtheme = sound.add('tutorialtheme', {volume: 0.5});
    tutorialtheme.setLoop(true);
    tutorialtheme.play();
    this.ability1 = sound.add('ability1', {volume: 0.5});
    this.blocA = sound.add('blocA');
    this.blocC = sound.add('blocC');
    this.blocK = sound.add('blocK');
    this.throwstar = sound.add('throwstar');
    this.teleport = sound.add('teleport');
    this.throwtriplestar = sound.add('throwtriplestar');
    this.throwbigstar = sound.add('throwbigstar');
    this.healthUp = sound.add('heal');
    this.shieldUp = sound.add('shield');
    this.trapsfx = sound.add('trapsfx')
    //background
    mainCamera.setBounds(0, 0, 1400 - 40, 560);
    physics.world.setBounds(0, 30, 1400 - 40, 560);
    add.image(0, 0, 'background1').setOrigin(0);
    add.image(5600, 0, 'background2').setOrigin(0);
    // player
    player.sprite = addPhysics.sprite(20, this.sys.game.config.height / 2, 'ninja');
    player.sprite.setScale(0.5);
    player.sprite.setCollideWorldBounds(true); //can't run off screen
    player.healthBar = this.makeBar(40, 10, 0, 50, 0x2ecc71); //make player health bar
    this.setValue(player.healthBar,player.healthPercent);
    player.healthBar.setVisible(true);
    player.healthPercent = 100;
    mainCamera.startFollow(player.sprite, true, 0.1, 0.1); //start following player
    mainCamera.followOffset.set(-500, 0);
    this.playerbullets = addPhysics.group(); //create stars
    this.playerbigbullets = addPhysics.group(); //create stars
    this.playertrap = addPhysics.group(); //create melee
    //enemies
    this.stage1Enemies = addPhysics.group();
    this.tutorialWave = addPhysics.group();
    //powerups
    this.tutorialpowerup1 = addPhysics.group()
    this.tutorialpowerup2 = addPhysics.group();
    this.tutorialpowerup3 = addPhysics.group();
    this.tutorialpowerup4 = addPhysics.group();
    //hud
    this.hud = add.image(700, 50, "hud").setAlpha(0.80);
    this.abilityIcon1 = add.image(250, 34, "healAbility").setVisible(false);
    this.abilityIcon2 = add.image(300, 34, "shieldAbility").setVisible(false);
    this.abilityIcon3 = add.image(350, 34, "dashAbility").setVisible(false);
    this.powerupIcon1 = add.image(250, 34, "multishotPU").setVisible(player.multishot); //480
    this.powerupIcon2 = add.image(300, 34, "piercePU").setVisible(player.pierce);    //530
    this.powerupIcon3 = add.image(350, 37, "trapPU").setVisible(player.trap);      //580
    this.powerupIcon4 = add.image(400, 35, "hastePU").setVisible(player.haste > 0);     //630
    //boss health bar
    tutorialboss.healthBar = this.makeBar(this.sys.game.config.width - 300, 20, 250,50,0xe74c3c); //5600
    this.setValue(tutorialboss.healthBar, 100);
    tutorialboss.healthBar.setVisible(false);
    //barrier
    this.barrier = addPhysics.sprite(1400, 300, 'barrier');
    this.barrier2 = addPhysics.sprite(1400 * 2 - 40, 300, 'barrier');
    this.barrier3 = addPhysics.sprite(1400 * 3, 300, 'barrier');
    this.barrier4 = addPhysics.sprite(1400 * 4, 300, 'barrier');
    this.barrier5 = addPhysics.sprite(6470, 300, 'barrier'); //6470
    // goal / end of level
    this.tutorialtreasure = addPhysics.sprite(2800 - 70, this.sys.game.config.height / 2, 'treasure'); //7000
    this.tutorialtreasure.setScale(0.6).setVisible(false);
    //boss
    tutorialboss.sprite = addPhysics.sprite(2800 + 200,300, 'blocboss').setVisible(false); //7150
    this.bullets = addPhysics.group(); //create attack 1
    this.laser = addPhysics.group(); // create attack 2
    //colliders / triggers
    //player triggers
    addPhysics.overlap(player.sprite, this.bullets, this.getHit, null, this); //trigger b/w player & bullets
    addPhysics.overlap(player.sprite, this.tutorialtreasure, this.moveToGame, null, this); //trigger b/w player & treasure
    addPhysics.overlap(player.sprite, tutorialboss.sprite, this.hitPlayer, null, this); //trigger b/w player & boss
    addPhysics.overlap(player.sprite, this.tutorialpowerup1, this.powerupOne, null, this);
    addPhysics.overlap(player.sprite, this.tutorialpowerup2, this.powerupTwo, null, this);
    addPhysics.overlap(player.sprite, this.tutorialpowerup3, this.powerupThree, null, this);
    addPhysics.overlap(player.sprite, this.tutorialpowerup4, this.powerupFour, null, this);
    //boss triggers
    addPhysics.overlap(tutorialboss.sprite, this.playerbullets, this.collideBoss, null, this); //trigger b/w playerbullets & boss
    addPhysics.overlap(tutorialboss.sprite, this.playerbigbullets, this.pierceBoss, null, this); //trigger b/w playerbigbullets & boss
    //enemy triggers
    addPhysics.overlap(this.stage1Enemies, this.playerbullets, this.collideEnemy, null, this);
    addPhysics.overlap(this.tutorialWave, this.playertrap, this.meleeEnemy, null, this);
    addPhysics.overlap(this.tutorialWave, this.playerbullets, this.collideEnemy, null, this);
    addPhysics.overlap(this.tutorialWave, this.playerbigbullets, this.pierceEnemy, null, this);
    //barrier triggers
    addPhysics.overlap(this.barrier, this.playerbullets, this.collide, null, this); //trigger b/w playerbullets & barrier
    addPhysics.overlap(this.barrier, this.playerbigbullets, this.collide, null, this); //trigger b/w playerbigbullets & barrier
    addPhysics.overlap(this.barrier2, this.playerbullets, this.collide, null, this); //trigger b/w playerbullets & barrier
    addPhysics.overlap(this.barrier2, this.playerbigbullets, this.collide, null, this); //trigger b/w playerbigbullets & barrier
    addPhysics.overlap(this.barrier3, this.playerbullets, this.collide, null, this); //trigger b/w playerbullets & barrier
    addPhysics.overlap(this.barrier3, this.playerbigbullets, this.collide, null, this); //trigger b/w playerbigbullets & barrier
    addPhysics.overlap(this.barrier4, this.playerbullets, this.collide, null, this); //trigger b/w playerbullets & barrier
    addPhysics.overlap(this.barrier4, this.playerbigbullets, this.collide, null, this); //trigger b/w playerbigbullets & barrier
    addPhysics.overlap(this.barrier5, this.playerbullets, this.collide, null, this); //trigger b/w playerbullets & barrier
    addPhysics.overlap(this.barrier5, this.playerbigbullets, this.collide, null, this); //trigger b/w playerbigbullets & barrier
    //camera
    this.cameras.main.resetFX(); //reset cameras
    //keyboard input
    //create keyboard keys
    this.cursors = keyboard.createCursorKeys();
    this.spacebar = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.aKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.skey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.dkey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.qkey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.wkey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.ekey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.pkey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    this.aKey.enabled = false;
    this.skey.enabled = false;
    this.dkey.enabled = false;
    //timer testing
    this.timer = time.addEvent({delay : 5000, callback: this.pickAbility, callbackScope: this, loop: true, paused: true });
    this.timer2 = time.addEvent({delay : 5000, callback: this.abilityThree, callbackScope: this, loop: true, paused: true });
    this.waveAttackTimer = time.addEvent({delay : 5000, callback: this.checkWave, callbackScope: this, loop: true, paused: false });
    this.waveCreateTimer = time.addEvent({delay : 2500, callback: this.createWave, callbackScope: this, loop: true, paused: false });
    this.abilityTimer1 = time.addEvent({delay : 1000, callback: this.pauseAbilityTimer1, callbackScope: this, loop: true, paused: false });
    this.abilityTimer2 = time.addEvent({delay : 1000, callback: this.pauseAbilityTimer2, callbackScope: this, loop: true, paused: false });
    this.abilityTimer3 = time.addEvent({delay : 2000, callback: this.pauseAbilityTimer3, callbackScope: this, loop: true, paused: false });
    this.healTimer = time.addEvent({delay : 2000 - player.haste, callback: this.pauseHealTimer, callbackScope: this, loop: true, paused: false });

    //TODO: edit this into more specific stages, maybe just change the text instead
    this.stage1Text1 = add.text(550, 30, "Use ARROW KEYS to move", { fontFamily: 'Bitwise', fontSize: '20px', fill: '#00FFFF', align: "center" });
    this.stage1Text2 = add.text(550, 50, "Press SPACEBAR to Attack", { fontFamily: 'Bitwise', fontSize: '20px', fill: '#00FFFF', align: "center" });
    this.stage1Text3 = add.text(550, 30, "Press A to Heal after taking damage", { fontFamily: 'Bitwise', fontSize: '20px',fill: '#00FFFF', align: "center" }).setAlpha(0);
    this.stage1Text4 = add.text(550, 30, "Press S to Shield", { fontFamily: 'Bitwise', fontSize: '20px',fill: '#00FFFF', align: "center" }).setAlpha(0);
    this.stage1Text5 = add.text(550, 30, "Hold ARROW KEY + D to Dash", { fontFamily: 'Bitwise', fontSize: '20px',fill: '#00FFFF', align: "center" }).setAlpha(0);
    this.stage1Text6 = add.text(550, 30, "Take out the remaining enemies", { fontFamily: 'Bitwise', fontSize: '20px',fill: '#00FFFF', align: "center" }).setAlpha(0);
    this.stage1Text7 = add.text(550, 30, "Move right to the next stage -->", { fontFamily: 'Bitwise', fontSize: '20px',fill: '#00FFFF', align: "center" }).setAlpha(0);

    this.stage2Text1 = add.text(550, 30, "Collect the powerup", { fontFamily: 'Bitwise', fontSize: '20px',fill: '#00FFFF', align: "center" }).setAlpha(0);
    this.stage2Text1a = add.text(550, 30, "Collect next powerup", { fontFamily: 'Bitwise', fontSize: '20px',fill: '#00FFFF', align: "center" }).setAlpha(0);
    this.stage2Text2 = add.text(550, 50, "Press Q to use MULITISHOT ability", { fontFamily: 'Bitwise', fontSize: '20px',fill: '#00FFFF', align: "center" }).setAlpha(0);
    this.stage2Text2a = add.text(1650, 150, "---->", { fontFamily: 'Bitwise', fontSize: '20px',fill: '#00FFFF', align: "center" }).setAlpha(0);
    this.stage2Text2b = add.text(1800, 150, "<----", { fontFamily: 'Bitwise', fontSize: '20px',fill: '#00FFFF', align: "center" }).setAlpha(0);
    this.stage2Text3 = add.text(550, 50, "Press W to use PIERCE ability", { fontFamily: 'Bitwise', fontSize: '20px',fill: '#00FFFF', align: "center" }).setAlpha(0);
    this.stage2Text3a = add.text(1650, 250, "---->", { fontFamily: 'Bitwise', fontSize: '20px',fill: '#00FFFF', align: "center" }).setAlpha(0);
    this.stage2Text3b = add.text(1800, 250, "<----", { fontFamily: 'Bitwise', fontSize: '20px',fill: '#00FFFF', align: "center" }).setAlpha(0);
    this.stage2Text4 = add.text(550, 50, "Press E to use TRAP ability", { fontFamily: 'Bitwise', fontSize: '20px',fill: '#00FFFF', align: "center" }).setAlpha(0);
    this.stage2Text4a = add.text(1650, 350, "---->", { fontFamily: 'Bitwise', fontSize: '20px',fill: '#00FFFF', align: "center" }).setAlpha(0);
    this.stage2Text4b = add.text(1800, 350, "<----", { fontFamily: 'Bitwise', fontSize: '20px',fill: '#00FFFF', align: "center" }).setAlpha(0);
    this.stage2Text5 = add.text(550, 50, "The HASTE powerup reduces your ability cooldowns", { fontFamily: 'Bitwise', fontSize: '20px',fill: '#00FFFF', align: "center" }).setAlpha(0);
    this.stage2Text5a = add.text(1650, 450, "---->", { fontFamily: 'Bitwise', fontSize: '20px',fill: '#00FFFF', align: "center" }).setAlpha(0);
    this.stage2Text5b = add.text(1800, 450, "<----", { fontFamily: 'Bitwise', fontSize: '20px',fill: '#00FFFF', align: "center" }).setAlpha(0);
    this.stage2Text5c = add.text(550, 30, "Take out the remaining enemies", { fontFamily: 'Bitwise', fontSize: '20px',fill: '#00FFFF', align: "center" }).setAlpha(0);
    this.stage2Text6 = add.text(550, 30, "DEFEAT THE BLOC", { fontFamily: 'Bitwise', fontSize: '20px',fill: '#00FFFF', align: "center" }).setAlpha(0);
    this.stage2Text7 = add.text(550, 30, "Congrats! Touch the TREASURE CHEST to start main game", { fontFamily: 'Bitwise', fontSize: '20px',fill: '#00FFFF', align: "center" }).setAlpha(0);

    this.abilityBarText = add.text(100, 10, "Abilities: ", { fontFamily: 'Bitwise', fontSize: '20px',fill: '#00FFFF', align: "center" }).setAlpha(0);
    this.abilityText1 = add.text(247, 10, "A", { fontFamily: 'Bitwise', fontSize: '12px',fill: '#00FFFF', align: "center" }).setAlpha(0);
    this.abilityText2 = add.text(297, 10, "S", { fontFamily: 'Bitwise', fontSize: '12px',fill: '#00FFFF', align: "center" }).setAlpha(0);
    this.abilityText3 = add.text(348, 10, "D", { fontFamily: 'Bitwise', fontSize: '12px',fill: '#00FFFF', align: "center" }).setAlpha(0);
    this.powerupBarText = add.text(100, 10, "Powerups: ", { fontFamily: 'Bitwise', fontSize: '20px',fill: '#00FFFF', align: "center" }).setVisible(false); //100
    this.powerupText = add.text(248, 10, "Q", { fontFamily: 'Bitwise', fontSize: '12px',fill: '#00FFFF', align: "center" }).setVisible(player.multishot);    //248
    this.powerupText2 = add.text(299, 10, "W", { fontFamily: 'Bitwise', fontSize: '12px',fill: '#00FFFF', align: "center" }).setVisible(player.pierce);   //299
    this.powerupText3 = add.text(349, 10, "E", { fontFamily: 'Bitwise', fontSize: '12px',fill: '#00FFFF', align: "center" }).setVisible(player.trap);   //349
    this.powerupText4 = add.text(390, 10, "N/A", { fontFamily: 'Bitwise', fontSize: '12px',fill: '#00FFFF', align: "center" }).setVisible(player.haste > 0); //390
    this.hasteStackText = add.text(414, 39, "1", { fontFamily: 'Bitwise', fontSize: '12px',fill: '#00FFFF', align: "center" }).setVisible(player.haste > 0); //414
    this.bossHPText = add.text(100, 50, "Boss HP: " + tutorialboss.healthPercent, { fontFamily: 'Bitwise', fontSize: '20px',fill: '#00FFFF', align: "center" }).setVisible(false);

    this.createStage1();
  }

  update()
  {
    this.setHealthBarPosition(player.healthBar, player.sprite.x - 25, player.sprite.y - 40);
    this.bossHPText.setText("Boss HP: " + Math.ceil(tutorialboss.healthPercent));
    this.stopTextScroll();
    if (!player.isAlive) {
      this.gameOver();
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

    //stage 1 enemies
    this.updateTutorialText();

    if(this.numEnemiesKilled >= 4 && this.numEnemiesKilled < 10  && this.firstDPressed){
        this.cameras.main.setBounds(0, 0, 1400 * 2 - 10, 560);
        this.physics.world.setBounds(this.worldsX, 30, 1400, 560);
    }

    //able to move to stage 2
    if(this.numEnemiesCreated >= 5)
    {
      this.waveCreateTimer.paused = true;
    }

    //enemies attack after passing a point
    if (player.sprite.x >= 1400 && this.numEnemiesCreated < 10){
      this.waveAttackTimer.paused = false;
      this.worldsX = 1400;
    }
    // make enemies respawn at wave start point if they leave camera view
    for (var i = 0; i < this.tutorialWave.getChildren().length; i++) {
      var enemy = this.tutorialWave.getChildren()[i];
      enemy.update();
      if (enemy.x < this.physics.world.bounds.x){
        enemy.x = 2800;
      }
      if (enemy.y < this.enemyMinY || enemy.y > this.enemyMaxY){
        enemy.x = 2800;
        enemy.y = Phaser.Math.Between(100, 500);
      }
    }

    // spawns boss when player crosses threshold
    if (this.numEnemiesKilled == 9 && player.hasteCollected) { //400 //6000 player.sprite.x + 17 > 5700
      this.startBoss = true;
      console.log("boss started");
    }
    if (this.startBoss){
      tutorialboss.healthBar.setVisible(true);
      this.bossHPText.setVisible(true);
      tutorialboss.sprite.setVisible(true);
      tutorialboss.sprite.x -= tutorialboss.speed;
      this.timer.paused = false;
    }
    if (tutorialboss.sprite.x < 2800 + 150 && tutorialboss.sprite.x > 2800 + 140){ //this.sys.game.config.width //7000 + 150 // 7000 + 140
      this.randomBloc();
    }
    if (tutorialboss.sprite.x <= tutorialboss.minX) {
      tutorialboss.speed = 0;
    }
    if (tutorialboss.health <= 0) {
      tutorialboss.sprite.disableBody(true, true);
      this.timer.paused = true;
      this.barrier5.setVisible(false);
      this.tutorialtreasure.setVisible(true);
      this.canGrabTreasure = true;
    }
    this.checkInputs();
  }


 /////////////////////////////////////////ENEMY SECTION////
createStage1() {
    for (var j = 80; j < 600; j += 150)
    {
      this.pickEnemySprite(900, j, this.stage1Enemies);
    }
  }

  createWave() {
    for (var j = 100; j < 600; j += 100)
    {
      this.pickEnemySprite(2800, j, this.tutorialWave);
    }
    this.numEnemiesCreated += 5;
  }

  pickEnemySprite(x, y, wave) {
    var randNum = Math.random();
    if (randNum > 0 && randNum <= 0.07)
        wave.create(x, y, 'enemy1');
    else if (randNum > 0.07 && randNum <= 0.14)
        wave.create(x, y, 'enemy2');
    else if (randNum > 0.14 && randNum <= 0.21)
        wave.create(x, y, 'enemy3');
    else if (randNum > 0.21 && randNum <= 0.28)
        wave.create(x, y, 'enemy4');
    else if (randNum > 0.28 && randNum <= 0.35)
        wave.create(x, y, 'enemy5');
    else if (randNum > 0.35 && randNum <= 0.42)
        wave.create(x, y, 'enemy6');
    else if (randNum > 0.42 && randNum <= 0.49)
        wave.create(x, y, 'enemy7');
    else if (randNum > 0.49 && randNum <= 0.56)
        wave.create(x, y, 'enemy8');
    else if (randNum > 0.56 && randNum <= 0.63)
        wave.create(x, y, 'enemy9');
    else if (randNum > 0.63 && randNum <= 0.70)
        wave.create(x, y, 'enemy10');
    else if (randNum > 0.70 && randNum <= 0.77)
        wave.create(x, y, 'enemy11');
    else if (randNum > 0.77 && randNum <= 0.84)
        wave.create(x, y, 'enemy12');
    else if (randNum > 0.84 && randNum <= 0.91)
        wave.create(x, y, 'enemy13');
    else if (randNum > 0.91 && randNum <= 1.0)
        wave.create(x, y, 'enemy14');
  }

  checkWave()
  {
    switch(this.enemyWave) {
        case 1:
            this.waveAttack(this.stage1Enemies, 0, 0, 0, 0);
            break;
        case 2:
            this.waveAttack(this.tutorialWave, -50, -250, -20, -20);
            break;
        }
  }

  waveAttack(wave, vXB, vXT, vYB, vYT)
  {
    for (var i = 0; i < wave.getChildren().length; i++) {
      var enemy = wave.getChildren()[i];
      enemy.update();
      var newVelocityX = Phaser.Math.Between(vXB, vXT);
      var newVelocityY = Phaser.Math.Between(vYB, vYT);

      if (enemy){
        let bullet = this.bullets.create(enemy.x, enemy.y, 'bullet');
        bullet.setVelocityX(Phaser.Math.Between(-100,-200));
      }

      enemy.setVelocityX(newVelocityX);
      enemy.setVelocityY(newVelocityY);
    }
  }

  /////////////////////////////////////////BOSS SECTION////
  pickAbility()
  {
    var ability = 1; //normally randomized
    this.abilityOne();
  }

  abilityOne() {
    this.randomBloc();
    this.timer2.paused = true;
    let x = tutorialboss.sprite.x;
    let y = Phaser.Math.Between(tutorialboss.sprite.y - 100, tutorialboss.sprite.y + 100); //can and should randomize this
    let bullet = this.bullets.create(x, y, 'bullet');
    bullet.setVelocityX(-200);
  }

  randomBloc()
  {
    let num = Phaser.Math.Between(1,3);
    switch(num)
    {
      case 1:
        this.blocA.play();
        break;
      case 2:
        this.blocC.play();
        break;
      case 3:
        this.blocK.play();
        break;
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
    player.health -= 20;
    player.healthPercent -= 20;
    this.setValue(player.healthBar, player.healthPercent);
    if(player.health <= 0) //things can happen, be safe and less than 0
    {
      this.gameOver();
    }
    console.log("player health is : " + player.health);
  }

  /////////////////////////////////////////PLAYER SECTION////
  checkInputs()
  {
    //press spacebar to throw star
    if (Phaser.Input.Keyboard.JustDown(this.spacebar))
    {
      this.firstSpacePressed = true;
      this.throwstar.play();
      let playerx = player.sprite.x;
      let playery = player.sprite.y;
      let pbullet = this.playerbullets.create(playerx, playery, 'star');
      pbullet.setVelocityX(800);
    }
    //press q key to throw 3 stars
    else if (Phaser.Input.Keyboard.JustDown(this.qkey) && player.multishot == true && player.canMultishotAgain)
    {
      this.firstQPressed = true;
      this.abilityTimer1.isPaused = false;
      player.canMultishotAgain = false;
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
    //press w key to throw big piercing star
    else if (Phaser.Input.Keyboard.JustDown(this.wkey) && player.pierce == true && player.canPierceAgain)
    {
      this.firstWPressed = true;
      this.abilityTimer2.isPaused = false;
      player.canPierceAgain = false;
      this.throwbigstar.play();
      let playerx = player.sprite.x;
      let playery = player.sprite.y;
      let pbullet = this.playerbigbullets.create(playerx, playery, 'starbig');
      pbullet.setVelocityX(800);
    }
    //trap
    else if (Phaser.Input.Keyboard.JustDown(this.ekey) && player.trap == true && player.canTrapAgain)
    {
      this.firstEPressed = true;
      this.abilityTimer3.isPaused = false;
      player.canTrapAgain = false;
      let playerx = player.sprite.x;
      let playery = player.sprite.y;
      let ptrap = this.playertrap.create(playerx, playery, 'trap');
      }
    //press a to heal
    else if(Phaser.Input.Keyboard.JustDown(this.aKey) && player.health < 100 && player.canHealAgain)
    {
      this.firstAPressed = true;
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
    //press S to shield
    else if(Phaser.Input.Keyboard.JustDown(this.skey) && !player.shielded)
    {
      this.firstSPressed = true;
      this.shieldUp.play();
      player.shielded = true;
      player.sprite.setTexture('shield');
      console.log("player shield is active");
    }

    //press d key to teleport 100 pixels in direction of arrow key
    else if (Phaser.Input.Keyboard.JustDown(this.dkey))
    {
      if (this.cursors.right.isDown){
        this.teleport.play();
        this.firstDPressed = true;
        player.sprite.x += 100;
      }
      else if (this.cursors.left.isDown){
        this.teleport.play();
        this.firstDPressed = true;
        player.sprite.x -= 100;
      }
      else if (this.cursors.up.isDown){
        this.teleport.play();
        this.firstDPressed = true;
        player.sprite.y -= 100;
      }
      else if (this.cursors.down.isDown){
        this.teleport.play();
        this.firstDPressed = true;
        player.sprite.y += 100;
      }
    }
        else if(Phaser.Input.Keyboard.JustDown(this.pkey) && tutorialScenePaused == false)
    {
        this.cursors.right.reset();
        this.cursors.left.reset();
        this.cursors.up.reset();
        this.cursors.down.reset();
        tutorialScenePaused = true;
        tutorialtheme.pause();
        this.scene.pause("tutorialScene");
        this.scene.launch("pauseScene");
    }
  }

  powerupOne(p, powerup1){
      powerup1.destroy();
      player.multishot = true;
      this.powerupIcon1.setVisible(true);
      this.powerupText.setVisible(true);
  }
  powerupTwo(p, powerup2){
    powerup2.destroy();
    player.pierce = true;
    this.powerupIcon2.setVisible(true);
    this.powerupText2.setVisible(true);
  }
  powerupThree(p, powerup3){
    powerup3.destroy();
    player.trap = true;
    this.powerupIcon3.setVisible(true);
    this.powerupText3.setVisible(true);
  }
  powerupFour(p, powerup4){
    powerup4.destroy();
    player.hasteCollected = true;
    this.powerupIcon4.setVisible(true);
    this.powerupText4.setVisible(true);
    this.hasteStackText.setVisible(true);
    player.haste += 100;
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
  pauseHealTimer(){
    this.healTimer.isPaused = true;
    player.canHealAgain = true;
  }


  /////////////////////////////////////////COLLISON SECTION////
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
      //tutorialthemeplaying = false;
      this.gameOver();
    }
    console.log("player health is : " + player.health);
  }

  hitBoss(p, b)
  {
    tutorialboss.healthPercent -= 1;
    this.setValue(tutorialboss.healthBar, tutorialboss.healthPercent);
    //this.cameras.main.shake(400, 0.01); //duration, intensity
    tutorialboss.health -= 1;
    tutorialboss.sprite.x = 7150; //1550
    tutorialboss.speed = 2;
  }

  collide (barrier, bullet)
  {
    bullet.disableBody(true,true);
  }

  collideEnemy (enemy, pbullet)
  {
    pbullet.disableBody(true,true);
    enemy.destroy();
    this.numEnemiesKilled += 1;
  }
  meleeEnemy (enemy, ptrap)
  {
    ptrap.disableBody(true,true);
    this.trapsfx.play();
    enemy.destroy();
    this.numEnemiesKilled += 1;
    player.speed += 0.1;
  }

  pierceEnemy (enemy, pbullet)
  {
    enemy.destroy();
    this.numEnemiesKilled += 1;
  }

  collideBoss (b, pbullet)
  {
    pbullet.disableBody(true,true);
    tutorialboss.healthPercent -= 1;
    tutorialboss.health -= 1;
    this.setValue(tutorialboss.healthBar, tutorialboss.healthPercent);
  }

  pierceBoss (b, pbullet)
  {
    tutorialboss.healthPercent -= 0.1;
    tutorialboss.health -= 0.1;
    this.setValue(tutorialboss.healthBar, tutorialboss.healthPercent);
  }

  gameOver()
  {
    tutorialtheme.stop();
    this.sound.stopAll();
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
    if(this.canGrabTreasure){
        tutorialtheme.stop();
        firstLevel = true;
        this.scene.start('bossScene');
    }
  }

  ///////////////////////////////////////////////UI SECTION////
  makeBar(w, h, x, y, color){
    //draw the bar
    let bar = this.add.graphics();
    //color the bar
    bar.fillStyle(color, 1);
    //fill the bar with a rectangle + insert width , height
    bar.fillRect(0, 0, w, h);
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

  stopTextScroll()
  {
    this.powerupBarText.setScrollFactor(0,0);
    this.hud.setScrollFactor(0,0);
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
    this.abilityBarText.setScrollFactor(0,0);
    this.abilityText1.setScrollFactor(0,0);
    this.abilityText2.setScrollFactor(0,0);
    this.abilityText3.setScrollFactor(0,0);
    this.stage1Text7.setScrollFactor(0,0);
    this.stage2Text1.setScrollFactor(0,0);
    this.stage2Text1a.setScrollFactor(0,0);
    this.stage2Text2.setScrollFactor(0,0);
    this.stage2Text3.setScrollFactor(0,0);
    this.stage2Text4.setScrollFactor(0,0);
    this.stage2Text5.setScrollFactor(0,0);
    this.stage2Text5c.setScrollFactor(0,0);
    this.stage2Text6.setScrollFactor(0,0);
    this.stage2Text7.setScrollFactor(0,0);
    tutorialboss.healthBar.setScrollFactor(0,0);
    this.hasteStackText.setText(Math.ceil(player.haste / 150));
  }

  updateTutorialText()
  {
    if(this.firstSpacePressed){
        this.aKey.enabled = true;
        this.abilityIcon1.setVisible(true);
        this.tweens.add({
          targets: this.stage1Text1,
          alpha: 0,
          duration: 1000,
          ease: 'Power2' //https://rexrainbow.github.io/phaser3-rex-notes/docs/site/ease-function/
        });
        this.tweens.add({
          targets: this.stage1Text2,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage1Text3,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.abilityText1,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.abilityBarText,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
    }
    if(this.firstAPressed){
        this.skey.enabled = true;
        this.abilityIcon2.setVisible(true);
        this.tweens.add({
          targets: this.stage1Text3,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage1Text4,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.abilityText2,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
    }
    if(this.firstSPressed){
        this.dkey.enabled = true;
        this.abilityIcon3.setVisible(true);
        this.tweens.add({
          targets: this.stage1Text4,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage1Text5,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.abilityText3,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
    }
    if(this.firstDPressed)
    {
        this.tweens.add({
          targets: this.stage1Text5,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage1Text6,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
    }
    if(this.numEnemiesKilled >= 4 && this.firstDPressed){
        this.abilityIcon1.setVisible(false);
        this.abilityIcon2.setVisible(false);
        this.abilityIcon3.setVisible(false);
         this.tweens.add({
          targets: this.abilityText1,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.abilityText2,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.abilityText3,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.abilityBarText,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });
    }
    if(this.numEnemiesKilled == 4 && this.firstDPressed){

        this.tweens.add({
          targets: this.stage1Text6,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage1Text7,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });

    if(this.createdPowerup1 == false){
          this.enemyWave = 2;
          this.waveAttackTimer.paused = true;
          this.tutorialpowerup1.create(1750, 150, 'multishotPU');
          this.createdPowerup1 = true;
        this.tweens.add({
          targets: this.stage2Text2a,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage2Text2b,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
        }
    }
    if(player.multishot && this.createdPowerup2 == false)
    {
        this.tweens.add({
          targets: this.stage2Text1,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage2Text2,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage2Text2a,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage2Text2b,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });

        this.createdPowerup2 = true;
    }
    if(this.firstQPressed && this.createdPowerup3 == false)
    {
        this.tweens.add({
          targets: this.stage2Text1a,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage2Text2,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage2Text3a,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage2Text3b,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
        this.tutorialpowerup2.create(1750, 250, 'piercePU');
        this.createdPowerup3 = true;
    }
    if (player.pierce && this.createdPowerup4 == false){
        this.tweens.add({
          targets: this.stage2Text3,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage2Text3a,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage2Text3b,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });
    }
    if(this.firstWPressed && this.createdPowerup4 == false)
    {
        this.tweens.add({
          targets: this.stage2Text3,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage2Text4a,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage2Text4b,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
        this.tutorialpowerup3.create(1750, 350, 'trapPU');
        this.createdPowerup4 = true;
    }
    if (player.trap && this.createdPowerup5 == false){
        this.tweens.add({
          targets: this.stage2Text4,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage2Text4a,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage2Text4b,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });
    }
    if(this.firstEPressed && this.createdPowerup5 == false) //player.hasteCollected
    {
        this.tweens.add({
          targets: this.stage2Text4,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage2Text5,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage2Text5a,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage2Text5b,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
        this.tutorialpowerup4.create(1750, 450, 'hastePU');
        this.createdPowerup5 = true;
    }
    if(player.hasteCollected && this.createdPowerup6 == false){
        this.tweens.add({
          targets: this.stage2Text1a,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage2Text5,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage2Text5a,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage2Text5b,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage2Text5c,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
        this.createdPowerup6 = true;
    }
    if(this.numEnemiesKilled >= 9 && player.hasteCollected)
    {
        this.tweens.add({
          targets: this.stage2Text5c,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage2Text6,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
    }
    if(tutorialboss.health <= 0){
        this.tweens.add({
          targets: this.stage2Text6,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });
        this.tweens.add({
          targets: this.stage2Text7,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
    }
    if (player.sprite.x >= 1400 && player.multishot == false){
        this.tweens.add({
          targets: this.stage2Text1,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
    }
    if (player.sprite.x >= 1400 && this.numEnemiesKilled >= 4){
        this.tweens.add({
          targets: this.stage1Text7,
          alpha: 0,
          duration: 1000,
          ease: 'Power2'
        });
      this.powerupBarText.setVisible(true);
      this.waveAttackTimer.paused = false;
      this.worldsX = 1400;
    }
  }

}

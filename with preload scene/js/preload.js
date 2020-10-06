class PreloadScene extends Phaser.Scene{
  constructor(){
    super("preloadScene");
  }
  preload(){
      // load images
      this.load.image('background1', 'assets/cyberpunk-street3.png');
      this.load.image('background2', 'assets/cyberpunk-street.png');
      this.load.image('background3', 'assets/cyberpunk-street-sky.png');
      this.load.image('background4', 'assets/cyberpunk-street-sky-boss.png');
      this.load.image('background5', 'assets/cyberpunk-street-stars.png');
      this.load.image('background6', 'assets/cyberpunk-street-stars-boss.png');
      this.load.image('background7', 'assets/cyberpunk-street-UT.png');
      this.load.image('background8', 'assets/cyberpunk-street-UT-boss.png');
      this.load.image('player', 'assets/player.png');
      this.load.image('dragon', 'assets/dragon.png');
      this.load.image('treasure', 'assets/treasure.png');
      this.load.image('barrier', 'assets/finishline.png');

      //this.load.image('ninja', 'assets/blockninja2.png');
      this.load.image('ninja', 'assets/blockninja.png');
      //this.load.image('ninja', 'assets/blockninjaold.png');
      //this.load.image('enemy1', 'assets/blockninjaold2.png');
      //this.load.image('enemy2', 'assets/blockninja3.png');
      //this.load.image('enemy3', 'assets/blockninja4.png');
      this.load.image('enemy1', 'assets/enemy1.png');
      this.load.image('enemy2', 'assets/enemy2.png');
      this.load.image('enemy3', 'assets/enemy3.png');
      this.load.image('enemy4', 'assets/enemy4.png');
      this.load.image('enemy5', 'assets/enemy5.png');
      this.load.image('enemy6', 'assets/enemy6.png');
      this.load.image('enemy7', 'assets/enemy7.png');
      this.load.image('enemy8', 'assets/enemy8.png');
      this.load.image('enemy9', 'assets/enemy9.png');
      this.load.image('enemy10', 'assets/enemy10.png');
      this.load.image('enemy11', 'assets/enemy11.png');
      this.load.image('enemy12', 'assets/enemy12.png');
      this.load.image('enemy13', 'assets/enemy13.png');
      this.load.image('enemy14', 'assets/enemy14.png');

      this.load.image('star', 'assets/ninjastar3.png');
      this.load.image('starbig', 'assets/ninjastar.png');
      this.load.image('star1', 'assets/star1.png');
      this.load.image('star2', 'assets/star2.png');
      this.load.image('star3', 'assets/star3.png');
      this.load.image('star4', 'assets/star4.png');
      this.load.image('star5', 'assets/star5.png');
      this.load.image('star6', 'assets/star6.png');

      this.load.image('boss', 'assets/boss.png');
      //this.load.image('boss', 'assets/bossnew.png');

      this.load.image('bullet', 'assets/bullet.png');
      this.load.image('laser', 'assets/laser.png');

      this.load.image('piercePU', 'assets/piercepu.png');
      this.load.image('lightswordPU', 'assets/lightsword.png');
      this.load.image('multishotPU', 'assets/multishot.png');
      this.load.image('kaboomPU', 'assets/kaboom.png');

      this.load.setPath('assets');
      this.load.audio('ability1', [ 'fireball1.mp3' ]);
      this.load.audio('ability2', [ 'laser.mp3' ]);
      this.load.audio('ability3', [ 'stomp.mp3' ]);
      this.load.audio('dinogrowl', [ 'dinogrowl.mp3' ]);
      this.load.audio('throwstar', [ 'throwstar.mp3' ]);
      this.load.audio('teleport', [ 'teleport.mp3' ]);
      this.load.audio('throwtriplestar', [ 'throwtriplestar2.mp3' ]);
      this.load.audio('throwbigstar', [ 'throwbigstar.mp3' ]);
      this.load.audio('heal', ['healingSound.wav']);
      this.load.audio('shield', ['shieldSound.wav']);
    }
    create(){
      this.add.text(config.height/2,config.width/2,"Loading Game :)")


      this.scene.start("bossScene")
    }

  }

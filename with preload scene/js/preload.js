class PreloadScene extends Phaser.Scene{
  constructor(){
    super("preloadScene");
  }

  init(){
    var element = document.createElement('style');
    document.head.appendChild(element);
    var sheet = element.sheet;
    var styles = '@font-face { font-family: "Bitwise"; src: url("assets/Bitwise.ttf") format("opentype"); }\n';
    sheet.insertRule(styles,0);
  }
  preload(){

      var load = this.load;
      // load images
      //main menu
      load.image('background1', 'assets/cyberpunk-street3.png');
      load.image('background2', 'assets/cyberpunk-street.png');
      load.image('background3', 'assets/cyberpunk-street-sky.png');
      load.image('background4', 'assets/cyberpunk-street-sky-boss.png');
      load.image('background5', 'assets/cyberpunk-street-stars.png');
      load.image('background6', 'assets/cyberpunk-street-stars-boss.png');
      load.image('background7', 'assets/cyberpunk-street-UT.png');
      load.image('background8', 'assets/cyberpunk-street-UT-boss.png');
      load.image('background9', 'assets/cyberpunk-tokyo.png');
      load.image('background10', 'assets/cyberpunk-day.png');
      load.image('backgroun11', 'assets/recolor-street.png');
      load.image('background12', 'assets/cyberpunk-day3.png');
      load.image('background13', 'assets/cyberpunk-day3-boss.png');
      load.image('background14', 'assets/recolor-street3.png');
      load.image('background15', 'assets/recolor-street3-boss.png');
      load.image('background16', 'assets/cyberpunk-tokyo3.png');
      load.image('background17', 'assets/cyberpunk-tokyo3-boss.png');

      load.image('endBG', 'assets/dead.png');
      load.image('player', 'assets/player.png');
      load.image('treasure', 'assets/treasure.png');
      load.image('barrier', 'assets/finishline.png');
      load.image('bottombarrier', 'assets/bottombarrier.png');
      load.image('PUUI', 'assets/powerUPUI.png');
      load.image('hud', 'assets/hud8.png');
      load.image('ninja', 'assets/blockninja.png');
      load.image('shield', 'assets/blockninjashielded2.png');
      load.spritesheet('ninjaIM', 'assets/IMnssO2.png',{
        frameWidth: 76,
        frameHeight: 72
      });

      load.image('enemy1', 'assets/enemy1.png');
      load.image('enemy2', 'assets/enemy2.png');
      load.image('enemy3', 'assets/enemy3.png');
      load.image('enemy4', 'assets/enemy4.png');
      load.image('enemy5', 'assets/enemy5.png');
      load.image('enemy6', 'assets/enemy6.png');
      load.image('enemy7', 'assets/enemy7.png');
      load.image('enemy8', 'assets/enemy8.png');
      load.image('enemy9', 'assets/enemy9.png');
      load.image('enemy10', 'assets/enemy10.png');
      load.image('enemy11', 'assets/enemy11.png');
      load.image('enemy12', 'assets/enemy12.png');
      load.image('enemy13', 'assets/enemy13.png');
      load.image('enemy14', 'assets/enemy14.png');

      load.image('star', 'assets/ninjastar3.png');
      load.image('starbig', 'assets/ninjastar.png');
      load.image('star1', 'assets/star1.png');
      load.image('star2', 'assets/star2.png');
      load.image('star3', 'assets/star3.png');
      load.image('star4', 'assets/star4.png');
      load.image('star5', 'assets/star5.png');
      load.image('star6', 'assets/star6.png');
      load.image('goldStar','assets/stargold.png');
      load.image('trapGold','assets/trapgold.png');
      load.image('autoCyan','assets/autos.png');
      load.image('smallGold','assets/smallGold.png');

      load.image('blocboss', 'assets/bloc5.png');
      load.image('boss', 'assets/boss.png');
      load.image('octoboss', 'assets/octoboss2.png');
      load.image('yakuzaboss', 'assets/yakuza5.png');
      load.image('horsemanboss', 'assets/horseman2.png');

      load.image('bullet', 'assets/bullet.png');
      load.image('laser', 'assets/laser.png');
      load.image('beam', 'assets/beam3.png');
      load.image('fireball', 'assets/fireball4.png');
      load.image('tsunami', 'assets/tsunami5.png');
      load.image('octobeam', 'assets/octobeam.png');
      load.image('octobeam2', 'assets/octobeam2.png');
      load.image('octobeam3', 'assets/octobeam3.png');
      load.image('octobeamtop', 'assets/octobeamtop.png');
      load.image('octobeambottom', 'assets/octobeambottom.png');
      load.image('firerain', 'assets/firerain12.png');
      load.image('skeleton', 'assets/skeleton8.png');
      load.image('bat', 'assets/bat2.png');

      load.image('piercePU', 'assets/piercepu.png');
      load.image('trapPU', 'assets/trappu.png');
      load.image('multishotPU', 'assets/multishot.png');
      load.image('hastePU', 'assets/haste powerup.png');
      load.image('healAbility', 'assets/healAbility.png');
      load.image('shieldAbility', 'assets/shieldAbility.png');
      load.image('dashAbility', 'assets/dashAbility.png');

      load.image("trap", "assets/trap.png")

      load.setPath('assets');
      load.audio('ability1', [ 'fireball1.mp3' ]);
      load.audio('ability2', [ 'laser.mp3' ]);
      load.audio('ability3', [ 'stomp.mp3' ]);
      load.audio('dinogrowl', [ 'dinogrowl.mp3' ]);
      load.audio('bloc', [ 'bloc.wav' ]);
      load.audio('throwstar', [ 'throwstar.mp3' ]);
      load.audio('teleport', [ 'teleport.mp3' ]);
      load.audio('hastesfx', [ 'hastesfx.mp3' ]);
      load.audio('trapsfx', [ 'trapsound.mp3' ]);
      load.audio('throwtriplestar', [ 'throwtriplestar2.mp3' ]);
      load.audio('throwbigstar', [ 'throwbigstar.mp3' ]);
      load.audio('heal', ['healingSound.wav']);
      load.audio('shield', ['shieldSound.wav']);
      load.audio('theme', ['actionthemeloop.mp3']);
      load.audio('tutorialtheme', ['ninjabeats.ogg']);
      load.audio('beamsound', [ 'beam.mp3' ]);
      load.audio('firebreathsound', [ 'fire breath.mp3' ]);
      load.audio('firebreathsound2', [ 'fire breath2.ogg' ]);
      load.audio('batsound', [ 'bats2.mp3' ]);
      load.audio('bonesound', [ 'bones2.mp3' ]);
      load.audio('dinodie', [ 'dinodie.mp3' ]);
      load.audio('win', ['totalWin.wav']);
      load.audio('death', [ 'oofSound.mp3' ]);

    }
    create(){
      this.add.text(window.innerWidth/2, window.innerHeight/2, "Loading Game :)", { font: '20px Courier', fill: '#00ffff' });
      this.scene.start("mainMenu");
    }

  }

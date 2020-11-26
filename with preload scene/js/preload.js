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
      // load images
      //main menu
      this.load.image('mainmenubg', 'assets/mainmenu2.png');

      this.load.image('background1', 'assets/cyberpunk-street3.png');
      this.load.image('background2', 'assets/cyberpunk-street.png');
      this.load.image('background3', 'assets/cyberpunk-street-sky.png');
      this.load.image('background4', 'assets/cyberpunk-street-sky-boss.png');
      this.load.image('background5', 'assets/cyberpunk-street-stars.png');
      this.load.image('background6', 'assets/cyberpunk-street-stars-boss.png');
      this.load.image('background7', 'assets/cyberpunk-street-UT.png');
      this.load.image('background8', 'assets/cyberpunk-street-UT-boss.png');
      this.load.image('background9', 'assets/cyberpunk-tokyo.png');
      this.load.image('background10', 'assets/cyberpunk-day.png');
      this.load.image('backgroun11', 'assets/recolor-street.png');
      this.load.image('background12', 'assets/cyberpunk-day3.png');
      this.load.image('background13', 'assets/cyberpunk-day3-boss.png');
      this.load.image('background14', 'assets/recolor-street3.png');
      this.load.image('background15', 'assets/recolor-street3-boss.png');
      this.load.image('background16', 'assets/cyberpunk-tokyo3.png');
      this.load.image('background17', 'assets/cyberpunk-tokyo3-boss.png');
      this.load.image('endBG', 'assets/dead.png');
      this.load.image('player', 'assets/player.png');
      this.load.image('treasure', 'assets/treasure.png');
      this.load.image('barrier', 'assets/finishline.png');
      this.load.image('bottombarrier', 'assets/bottombarrier.png');
      this.load.image('PUUI', 'assets/powerUPUI.png');
      //this.load.image('hud', 'assets/hud4.png');
      this.load.image('hud', 'assets/hud8.png');


      //this.load.image('ninja', 'assets/blockninja2.png');
      this.load.image('ninja', 'assets/blockninja.png');
      this.load.image('shield', 'assets/blockninjashielded2.png');
      //this.load.spritesheet('ninjaIM', 'assets/IMnssO.png',{
        //frameWidth: 74,
        //frameHeight: 74
      //});
      this.load.spritesheet('ninjaIM', 'assets/IMnssO2.png',{
        frameWidth: 76,
        frameHeight: 72
      });
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
      this.load.image('goldStar','assets/stargold.png');
      this.load.image('trapGold','assets/trapgold.png');
      this.load.image('autoCyan','assets/autos.png');
      this.load.image('smallGold','assets/smallGold.png');

      this.load.image('blocboss', 'assets/bloc5.png');
      this.load.image('boss', 'assets/boss.png');
      this.load.image('octoboss', 'assets/octoboss2.png');
      this.load.image('yakuzaboss', 'assets/yakuza5.png');
      this.load.image('horsemanboss', 'assets/horseman2.png');
      //this.load.image('boss', 'assets/bossnew.png');

      this.load.image('bullet', 'assets/bullet.png');
      this.load.image('laser', 'assets/laser.png');
      this.load.image('beam', 'assets/beam3.png');
      this.load.image('fireball', 'assets/fireball4.png');
      this.load.image('tsunami', 'assets/tsunami5.png');
      this.load.image('octobeam', 'assets/octobeam.png');
      this.load.image('octobeam2', 'assets/octobeam2.png');
      this.load.image('octobeam3', 'assets/octobeam3.png');
      this.load.image('octobeamtop', 'assets/octobeamtop.png');
      this.load.image('octobeambottom', 'assets/octobeambottom.png');
      this.load.image('firerain', 'assets/firerain12.png');
      this.load.image('skeleton', 'assets/skeleton8.png');
      this.load.image('bat', 'assets/bat2.png');

      this.load.image('piercePU', 'assets/piercepu.png');
      this.load.image('trapPU', 'assets/trappu.png');
      this.load.image('multishotPU', 'assets/multishot.png');
      this.load.image('hastePU', 'assets/haste powerup.png');
      this.load.image('healAbility', 'assets/healAbility.png');
      this.load.image('shieldAbility', 'assets/shieldAbility.png');
      this.load.image('dashAbility', 'assets/dashAbility.png');

      //player sabre colors
      this.load.image("redsword", "assets/redsword.png")
      this.load.image("silversword", "assets/silversword.png")
      this.load.image("purpsword", "assets/purpsword.png")
      this.load.image("bluesword", "assets/bluesword.png")
      this.load.image("greensword", "assets/greensword.png")
      this.load.image("trap", "assets/trap.png")

      this.load.setPath('assets');
      this.load.audio('ability1', [ 'fireball1.mp3' ]);
      this.load.audio('ability2', [ 'laser.mp3' ]);
      this.load.audio('ability3', [ 'stomp.mp3' ]);
      this.load.audio('dinogrowl', [ 'dinogrowl.mp3' ]);
      this.load.audio('blocA', [ 'bloc.wav' ]);
      this.load.audio('blocC', [ 'blocC.mp3' ]);
      this.load.audio('blocK', [ 'blocK.mp3' ]);
      this.load.audio('bbbloc', [ 'bbbloc.mp3' ]);
      this.load.audio('throwstar', [ 'throwstar.mp3' ]);
      this.load.audio('teleport', [ 'teleport.mp3' ]);
      this.load.audio('hastesfx', [ 'hastesfx.mp3' ]);
      this.load.audio('trapsfx', [ 'trapsound.mp3' ]);
      this.load.audio('throwtriplestar', [ 'throwtriplestar2.mp3' ]);
      this.load.audio('throwbigstar', [ 'throwbigstar.mp3' ]);
      this.load.audio('heal', ['healingSound.wav']);
      this.load.audio('shield', ['shieldSound.wav']);
      this.load.audio('theme', ['actionthemeloop.mp3']);
      this.load.audio('tutorialtheme', ['ninjabeats.ogg']);
      this.load.audio('beamsound', [ 'beam.mp3' ]);
      this.load.audio('firebreathsound', [ 'fire breath.mp3' ]);
      this.load.audio('firebreathsound2', [ 'fire breath2.ogg' ]);
      this.load.audio('batsound', [ 'bats2.mp3' ]);
      this.load.audio('bonesound', [ 'bones2.mp3' ]);
      this.load.audio('dinodie', [ 'dinodie.mp3' ]);
      this.load.audio('win', ['totalWin.wav']);
      this.load.audio('death', [ 'oofSound.mp3' ]);
      this.load.audio('chargeUp', ['chargingup.wav']);

      //fonts :))
    }
    create(){
      this.add.text(window.innerWidth/2, window.innerHeight/2, "Loading Game :)", { font: '20px Courier', fill: '#00ffff' });
      this.scene.start("mainMenu");
    }

  }

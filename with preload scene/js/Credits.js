class Credits extends Phaser.Scene{
  constructor(){
    super("credits");
  }
  preload(){
    }

  create(){
/*
        this.add.text(window.innerWidth/2 - 300, window.innerHeight/2, 'CREDITS', { font: '50px Courier', fill: '#00ffff' });
        this.add.text(window.innerWidth/2 - 300, window.innerHeight/2 + 100, 'click anywhere to return to main menu', { font: '20px Courier', fill: '#00ffff' });
        this.input.once('pointerup', function (event) {
        this.scene.start('mainMenu');
        }, this);
*/
    var content = [
    "Credits",
    "",
      "Sprite Art          \t\t\tKorba via opengameart.org, Graphics RF via vecteezy.com",
      "Background Art      \tansimuz via opengameart.org",
      "Boss Art            \t\tAlbert Liang",
      "Enemy Art           \t\twarlloyd on opengameart.org",
      "Music               \t\t\tFoolBoyMedia, Matthus via freesound.org",
      "SFX                 \t\tMATRIXXX, JustInvoke, Mativve, Timbre, richardemoore, CGEffex, sonictechtonic,", 
                           "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\terickjohanzm, SilverIllusionist via freesound.org",
      "Programmers         \tAlbert Liang, Christopher Perry, Kat Byers",
      "Font                \t\t\tBitwise by Digital Graphics Lab",
    "",
    "Thank you for playing!"
    ];
this.creditsText = this.add.text(0, 0, content, { fontFamily: 'Bitwise', fontSize: 25, fill: '#ffffff'});
this.zone = this.add.zone(config.width/2, config.height + 200, config.width, config.height);
 
Phaser.Display.Align.In.Center(
  this.creditsText,
  this.zone
);
 

this.creditsTween = this.tweens.add({
  targets: this.creditsText,
  y: -500,
  ease: 'Power0',
  duration: 30000,
  delay: 1000,
  onComplete: function () {
    this.destroy;
    this.scene.start('mainMenu');
  }.bind(this)
});


    }

}

/* list of all the credits  we need to put in:
   background art - ansimuz.com via opengameart.org
   boss art - Albert Liang
   enemy art - warlloyd on opengameart.org
   music - tutorial + main screen
   sfx - MATRIXXX, JustInvoke, Mativve via freesound.org,
   programmers - Albert Liang, Christopher Perry, Kat Byers
   font - Bitwise by Digital Graphics Lab 
*/

/*



*/
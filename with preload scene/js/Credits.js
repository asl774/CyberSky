class Credits extends Phaser.Scene{
  constructor(){
    super("credits");
  }
  preload(){
    }

  create(){
        this.add.text(window.innerWidth/2 - 300, window.innerHeight/2, 'CREDITS', { font: '50px Courier', fill: '#00ffff' });
        this.add.text(window.innerWidth/2 - 300, window.innerHeight/2 + 100, 'click anywhere to return to main menu', { font: '20px Courier', fill: '#00ffff' });
        this.input.once('pointerup', function (event) {
        this.scene.start('mainMenu');
        }, this);
    }

}

/* list of all the credits  we need to put in:
   background art - ansimuz.com via opengameart.org
   boss art - Albert Liang
   enemy art - warlloyd on opengameart.org
   music - tutorial + main screen
   sfx - MATRIXXX, JustInvoke, Mativve via freesound.org,
   programmers - Albert Liang, Christopher Perry, Kat Byers
   font - Bitwise by Digital Graphics Lab */

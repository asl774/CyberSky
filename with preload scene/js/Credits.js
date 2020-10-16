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

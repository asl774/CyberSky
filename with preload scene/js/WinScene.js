class WinScene extends Phaser.Scene{
  constructor(){
    super("winScene");
  }
  preload(){
    }

  create(){
        this.add.text(window.innerWidth/2 - 300, window.innerHeight/2, 'WIN SCENE', { font: '50px Courier', fill: '#00ffff' });
        this.add.text(window.innerWidth/2 - 300, window.innerHeight/2 + 100, 'click anywhere to continue', { font: '20px Courier', fill: '#00ffff' });
        this.input.once('pointerup', function (event) {
        this.scene.start('credits');
        }, this);
    }

}

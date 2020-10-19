class LoseScene extends Phaser.Scene{
  constructor(){
    super("loseScene");
  }
  preload(){
        this.load.image('endBG', 'assets/dead.png');
    }

  create(){
        this.add.image(window.innerWidth/2 - 300, 0, 'endBG').setOrigin(0);
        this.add.text(window.innerWidth/2 - 300, window.innerHeight/2, 'LOSE SCENE', { font: '50px Courier', fill: '#00ffff' });
        this.add.text(window.innerWidth/2 - 300, window.innerHeight/2 + 100, 'click anywhere to continue', { font: '20px Courier', fill: '#00ffff' });
        this.input.once('pointerup', function (event) {
        this.scene.start('credits');
        }, this);
    }

}

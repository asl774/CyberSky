class LoseScene extends Phaser.Scene{
  constructor(){
    super("loseScene");
  }
  preload(){
        this.load.image('endBG', 'assets/dead.png');
    }

  create(){
        var add = this.add;

        add.image(0,0, currentBackground).setOrigin(0,0);
        add.image(window.innerWidth/2 - 300, 0, 'endBG').setOrigin(0,0).setScale(0.5);

        add.text(window.innerWidth/2 - 300, window.innerHeight/2, 'LOSE SCENE', { fontFamily: 'Bitwise', fontSize: 25, fill: '#ffffff' });
        add.text(window.innerWidth/2 - 300, window.innerHeight/2 + 100, 'click anywhere to continue', { fontFamily: 'Bitwise', fontSize: 25, fill: '#ffffff' });
        this.input.once('pointerup', function (event) {
        this.scene.start('credits');
        }, this);
    }

}

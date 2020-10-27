class PauseScene extends Phaser.Scene{
  constructor(){
    super("pauseScene");
  }
  preload(){
    this.load.image('bg', 'assets/background.png');
    }

  create(){
        /*
            this.input.once('pointerdown', function () {

            this.scene.resume("bossScene");

        }, this);
        */
        this.add.text(window.innerWidth/2, window.innerHeight/2, 'GAME PAUSED');
        this.cursors = this.input.keyboard.createCursorKeys();
        this.pkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

  }
  update(){
      if (Phaser.Input.Keyboard.JustDown(this.pkey))
      {
        this.scene.stop();
        gamePaused = false;
        this.scene.resume('bossScene');
      }
  }
}

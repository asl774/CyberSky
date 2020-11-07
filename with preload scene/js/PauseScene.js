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
        //var r0 = this.add.rectangle(window.innerWidth/2, window.innerHeight/2, 400, 400, 0x5C2C4F);
        //r0.setStrokeStyle(4, 0x37092C);

        this.add.text(window.innerWidth/2, window.innerHeight/2, 'GAME PAUSED');

        //var r1 = this.add.rectangle(window.innerWidth/2 + 100, window.innerHeight/2 + 100, 450, 50, 0x5C2C4F).setInteractive();
        //r1.setStrokeStyle(4, 0x37092C);
        var r1 = this.add.text(window.innerWidth/2 - 100, window.innerHeight/2 + 50, 'RETURN TO MAIN MENU', { fontFamily: 'Bitwise', fontSize: 25, fill: '#ffffff' }).setInteractive();
        r1.on('pointerup', function (event) {
          tutorialScenePaused = false;
          bossScenePaused = false;
          infiniteScenePaused = false;
          this.scene.stop('tutorialScene');
          this.scene.stop('bossScene');
          this.scene.stop('infiniteScene');
          //this.scene.stop('pauseScene');
          this.scene.start('mainMenu');
        }, this);



        this.cursors = this.input.keyboard.createCursorKeys();
        this.pkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

  }
  update(){
      if (Phaser.Input.Keyboard.JustDown(this.pkey))
      {
        if (infiniteScenePaused){
          console.log("got to this point");
          this.scene.stop();
          infiniteScenePaused = false;
          this.scene.resume('infiniteScene');
        }
        else if (bossScenePaused){
          this.scene.stop();
          bossScenePaused = false;
          this.scene.resume('bossScene');
        }
        else if (tutorialScenePaused){
          this.scene.stop();
          tutorialScenePaused = false;
          this.scene.resume('tutorialScene');
        }
      }


  }
}

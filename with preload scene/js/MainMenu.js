class MainMenu extends Phaser.Scene{
  constructor(){
    super("mainMenu");
  }
  preload(){
    }

  create(){

        //background image goes here

        this.add.text(window.innerWidth/2 - 300, window.innerHeight/2, 'MAIN MENU - title goes here', { font: '50px Courier', fill: '#00ffff' });

        // tutorial button
        var r1 = this.add.rectangle(600, 425, 500, 50, 0x9966ff).setInteractive();
        r1.setStrokeStyle(4, 0xefc53f);
        this.add.text(window.innerWidth/2 - 300, window.innerHeight/2 + 100, 'PLAY TUTORIAL', { font: '20px Courier', fill: '#00ffff' });

        // main game button
        var r2 = this.add.rectangle(600, 490, 500, 50, 0x9966ff).setInteractive();
        r2.setStrokeStyle(4, 0xefc53f);
        this.add.text(window.innerWidth/2 - 300, window.innerHeight/2 + 165, 'PLAY GAME', { font: '20px Courier', fill: '#00ffff' });
        
        // infinite mode button
        var r3 = this.add.rectangle(600, 555, 500, 50, 0x9966ff).setInteractive();
        r3.setStrokeStyle(4, 0xefc53f);
        this.add.text(window.innerWidth/2 - 300, window.innerHeight/2 + 230, 'PLAY INFINITE MODE', { font: '20px Courier', fill: '#00ffff' });

        r1.on('pointerup', function (event) {
        this.scene.start('tutorial');
        }, this);

        r2.on('pointerup', function (event) {
        this.scene.start('bossScene');
        }, this);

        /*
        this.input.once('pointerup', function (event) {
        this.scene.start('tutorial');
        }, this);
        */
    }

}

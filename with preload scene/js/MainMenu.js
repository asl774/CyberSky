class MainMenu extends Phaser.Scene{
  constructor(){
    super("mainMenu");
  }
  preload(){
    }

  create(){

        //background image goes here
        this.add.image(680, 310, 'mainmenubg');
        //this.add.text(550, 300, 'CYBERSKY', { font: '50px Courier', fill: '#00ffff' });

        // tutorial button
        var r1 = this.add.rectangle(703, 425, 450, 50, 0x5C2C4F).setInteractive();
        r1.setStrokeStyle(4, 0xefc53f);
        this.add.text(625, 420, 'PLAY TUTORIAL', { font: '20px Courier', fill: '#ffffff' });

        // main game button
        var r2 = this.add.rectangle(703, 490, 450, 50, 0x5C2C4F).setInteractive();
        r2.setStrokeStyle(4, 0xefc53f);
        this.add.text(625, 480, 'PLAY GAME', { font: '20px Courier', fill: '#ffffff' });
        
        // infinite mode button
        var r3 = this.add.rectangle(703, 555, 450, 50, 0x5C2C4F).setInteractive();
        r3.setStrokeStyle(4, 0xefc53f);
        this.add.text(625, 550, 'PLAY INFINITE MODE', { font: '20px Courier', fill: '#ffffff' });

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

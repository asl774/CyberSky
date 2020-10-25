class MainMenu extends Phaser.Scene{
  constructor(){
    super("mainMenu");
  }

  create(){
        var add = this.add;
        //background image goes here
        add.image(0,0, 'background2').setOrigin(0,0);

        var title = add.rectangle(700, 250, 700, 150, 0x5C2C4F);
        add.text(450,205, 'CYBERSKY', { fontFamily: 'Bitwise', fontSize: 100,fill: '#ffffff'});
        // tutorial button
        var r1 = add.rectangle(700, 425, 450, 50, 0x5C2C4F).setInteractive();
        r1.setStrokeStyle(4, 0xefc53f);
        add.text(600, 412, 'PLAY TUTORIAL', { fontFamily: 'Bitwise', fontSize: 25, fill: '#ffffff' });

        // main game button
        var r2 = add.rectangle(700, 490, 450, 50, 0x5C2C4F).setInteractive();
        r2.setStrokeStyle(4, 0xefc53f);
        add.text(630, 478, 'PLAY GAME', { fontFamily: 'Bitwise', fontSize: 25, fill: '#ffffff' });

        // infinite mode button
        var r3 = add.rectangle(700, 555, 450, 50, 0x5C2C4F).setInteractive();
        r3.setStrokeStyle(4, 0xefc53f);
        add.text(585, 542, 'PLAY INFINITE MODE', { fontFamily: 'Bitwise', fontSize: 25, fill: '#ffffff' });

        r1.on('pointerup', function (event) {
        this.scene.start('tutorial');
        }, this);

        r2.on('pointerup', function (event) {
        this.scene.start('bossScene');
        }, this);

        // this.add.text(128, 128, 'This is a test.', {
        //   fontFamily: 'Bitwise'
        // });

        /*
        this.input.once('pointerup', function (event) {
        this.scene.start('tutorial');
        }, this);
        */
    }

}

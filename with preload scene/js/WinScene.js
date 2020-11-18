class WinScene extends Phaser.Scene{
  constructor(){
    super("winScene");
  }
  preload(){
    }

  create(){
        var add = this.add;
        add.image(0,0, currentBackground).setOrigin(0,0);
        this.sound.stopAll();
        this.win = this.sound.add('win');
        this.win.play();

        var title = add.rectangle(650, 250, 2000, 150, 0x37092C);
        title.setStrokeStyle(4, 0x5C2C4F);
        add.text(445, 205, 'YOU WIN', { fontFamily: 'Bitwise', fontSize: 100,fill: '#ffffff'});

        var r1 = add.rectangle(650, 425, 450, 50, 0x37092C).setInteractive();
        r1.setStrokeStyle(4, 0x5C2C4F);
        add.text(590, 412, 'CONTINUE', { fontFamily: 'Bitwise', fontSize: 25, fill: '#ffffff' });

        var r3 = add.rectangle(650, 490, 450, 50, 0x37092C).setInteractive();
        r3.setStrokeStyle(4, 0x5C2C4F);
        this.infiniteCode = this.add.text(530, 478, 'INFINITE MODE CODE', { fontFamily: 'Bitwise', fontSize: 25, fill: '#ffffff' });

        r1.on('pointerover', () => this.enterHoverState(r1));
        r1.on('pointerout', () => this.enterRestState(r1));
        r1.on('pointerdown', () => this.enterDownState(r1));
        r1.on('pointerup', () => this.changeScenes('credits', false, false));

        // r2.on('pointerover', () => this.enterHoverState(r2));
        // r2.on('pointerout', () => this.enterRestState(r2));
        // r2.on('pointerdown', () => this.enterDownState(r2));
        // r2.on('pointerup', () => this.changeScenes('mainMenu', false, false));

        r3.on('pointerover', () => this.enterHoverState(r3));
        r3.on('pointerout', () => this.enterRestState(r3));
        r3.on('pointerdown', () => this.enterDownState(r3));
        r3.on('pointerup', () => this.showCode());
    }

    enterRestState(button)
    {
      button.fillColor = 0x37092C;
      button.setStrokeStyle(4, 0x5C2C4F);
    }

    enterHoverState(button)
    {
      button.fillColor = 0x501742;
      button.setStrokeStyle(4, 0xCECECE);
    }

    enterDownState(button)
    {
      button.fillColor = 0x0E000B;
    }

    changeScenes(sceneName, infinite, first)
    {
      infiniteMode = infinite;
      firstLevel = first;
      if(!infinite) {
        difficulty = 1;
      }
      else {
        difficulty = 5;
      }
      this.scene.start(sceneName);
    }

    showCode()
    {
      this.infiniteCode.setText("OHYNTRFB");
      this.infiniteCode.setPosition(585,478);
    }

}

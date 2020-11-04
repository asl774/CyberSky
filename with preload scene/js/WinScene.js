class WinScene extends Phaser.Scene{
  constructor(){
    super("winScene");
  }
  preload(){
    }

  create(){
        var add = this.add;

        add.image(0,0, 'background2').setOrigin(0,0);
        this.sound.stopAll();
        this.win = this.sound.add('win');
        this.win.play();

        var title = add.rectangle(650, 250, 2000, 150, 0x5C2C4F);
        title.setStrokeStyle(4, 0x37092C);
        add.text(445, 205, 'YOU WIN', { fontFamily: 'Bitwise', fontSize: 100,fill: '#ffffff'});

        var r1 = add.rectangle(650, 425, 450, 50, 0x5C2C4F).setInteractive();
        r1.setStrokeStyle(4, 0x37092C);
        add.text(595, 412, 'CREDITS', { fontFamily: 'Bitwise', fontSize: 25, fill: '#ffffff' });

        var r2 = add.rectangle(650, 490, 450, 50, 0x5C2C4F).setInteractive();
        r2.setStrokeStyle(4, 0x37092C);
        add.text(580, 478, 'MAIN MENU', { fontFamily: 'Bitwise', fontSize: 25, fill: '#ffffff' });

        var r3 = add.rectangle(650, 555, 450, 50, 0x5C2C4F).setInteractive();
        r3.setStrokeStyle(4, 0x37092C);
        this.infiniteCode = this.add.text(530, 542, 'INFINITE MODE CODE', { fontFamily: 'Bitwise', fontSize: 25, fill: '#ffffff' });

        r1.on('pointerover', () => this.enterHoverState(r1));
        r1.on('pointerout', () => this.enterRestState(r1));
        r1.on('pointerdown', () => this.enterDownState(r1));
        r1.on('pointerup', () => this.changeScenes('credits', false, false));

        r2.on('pointerover', () => this.enterHoverState(r2));
        r2.on('pointerout', () => this.enterRestState(r2));
        r2.on('pointerdown', () => this.enterDownState(r2));
        r2.on('pointerup', () => this.changeScenes('mainMenu', false, false));

        r3.on('pointerover', () => this.enterHoverState(r3));
        r3.on('pointerout', () => this.enterRestState(r3));
        r3.on('pointerdown', () => this.enterDownState(r3));
        r3.on('pointerup', () => this.showCode());
    }

    enterRestState(button)
    {
      button.fillColor = 0x5C2C4F;
      button.setStrokeStyle(4, 0x37092C);
    }

    enterHoverState(button)
    {
      button.fillColor = 0x7B456C;
      button.setStrokeStyle(4, 0xefc53f);
    }

    enterDownState(button)
    {
      button.fillColor = 0x37092C;
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
      this.infiniteCode.setPosition(585,542);
      //console.log("there should be a code here");
    }

}

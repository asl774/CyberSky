class MainMenu extends Phaser.Scene{
  constructor(){
    super("mainMenu");
  }

  create(){
        var add = this.add;
        //background image goes here
        add.image(0,0, 'background2').setOrigin(0,0);

        var title = add.rectangle(650, 250, 2000, 150, 0x5C2C4F);
        title.setStrokeStyle(4, 0x37092C);
        add.text(400,205, 'CYBERSKY', { fontFamily: 'Bitwise', fontSize: 100,fill: '#ffffff'});
        // tutorial button
        var r1 = add.rectangle(650, 425, 450, 50, 0x5C2C4F).setInteractive();
        r1.setStrokeStyle(4, 0x37092C);
        add.text(550, 412, 'PLAY TUTORIAL', { fontFamily: 'Bitwise', fontSize: 25, fill: '#ffffff' });

        // main game button
        var r2 = add.rectangle(650, 490, 450, 50, 0x5C2C4F).setInteractive();
        r2.setStrokeStyle(4, 0x37092C);
        add.text(580, 478, 'PLAY GAME', { fontFamily: 'Bitwise', fontSize: 25, fill: '#ffffff' });

        // infinite mode button
        var r3 = add.rectangle(650, 555, 450, 50, 0x5C2C4F).setInteractive();
        r3.setStrokeStyle(4, 0x37092C);
        add.text(535, 542, 'PLAY INFINITE MODE', { fontFamily: 'Bitwise', fontSize: 25, fill: '#ffffff' });

        tutorialthemeplaying = false;
        r1.on('pointerover', () => this.enterHoverState(r1));
        r1.on('pointerout', () => this.enterRestState(r1));
        r1.on('pointerdown', () => this.enterDownState(r1));
        r1.on('pointerup', () => this.changeScenes('tutorialScene', false, true));

        r2.on('pointerover', () => this.enterHoverState(r2));
        r2.on('pointerout', () => this.enterRestState(r2));
        r2.on('pointerdown', () => this.enterDownState(r2));
        r2.on('pointerup', () => this.changeScenes('bossScene', false, true));

        r3.on('pointerover', () => this.enterHoverState(r3));
        r3.on('pointerout', () => this.enterRestState(r3));
        r3.on('pointerdown', () => this.enterDownState(r3));
        r3.on('pointerup', () => this.changeScenes('codeScene', true, true));

        //for testing purposes :)
        // this.input.once('pointerup', function (event) {
        // this.scene.start('winScene');
        // }, this);
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

}

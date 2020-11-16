class LoseScene extends Phaser.Scene{
  constructor(){
    super("loseScene");
  }
  preload(){
        this.load.image('endBG', 'assets/dead.png');
    }

  create(){
        var add = this.add;
        
        add.image(500, 0, 'endBG').setOrigin(0,0).setScale(0.7);

        var r1 = add.rectangle(650, 450, 450, 150, 0x37092C).setInteractive();
        r1.setStrokeStyle(4, 0x5C2C4F);
        add.text(585,410, 'YOU LOSE', { fontFamily: 'Bitwise', fontSize: 25, fill: '#ffffff' });
        add.text(520,460, 'click here to continue', { fontFamily: 'Bitwise', fontSize: 25, fill: '#ffffff' });

        r1.on('pointerover', () => this.enterHoverState(r1));
        r1.on('pointerout', () => this.enterRestState(r1));
        r1.on('pointerdown', () => this.enterDownState(r1));
        r1.on('pointerup', () => this.changeScenes('credits', false, false));
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

}

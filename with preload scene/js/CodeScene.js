class CodeScene extends Phaser.Scene{
  constructor(){
    super("codeScene");
  }

    preload ()
    {
        this.load.html('nameform', 'assets/nameform3.html');
    }

    create ()
    {
        var add = this.add;
        var text = add.text(300, 10, ' ', { color: 'white', fontSize: '20px '});
        var element = add.dom(650, 0).createFromCache('nameform');

        var r1 = add.rectangle(650, 400, 450, 70, 0x37092C).setInteractive();
        r1.setStrokeStyle(4, 0x5C2C4F);
        add.text(500,385, 'RETURN TO MAIN MENU', { fontFamily: 'Bitwise', fontSize: 25, fill: '#ffffff' });

        r1.on('pointerover', () => this.enterHoverState(r1));
        r1.on('pointerout', () => this.enterRestState(r1));
        r1.on('pointerdown', () => this.enterDownState(r1));
        r1.on('pointerup', () => this.changeScenes('mainMenu'));

        element.addListener('click');
        element.on('click', function (event) {
            if (event.target.name === 'playButton')
            {
                var inputText = this.getChildByName('nameField');
                //  Have they entered anything?
                if (inputText.value == 'OHYNTRFB') //inputText.value !== ''
                {
                    //this.scene.start('infiniteScene');
                    //  Turn off the click events
                    this.removeListener('click');
                    //  Hide the login element
                    this.setVisible(false);
                    //  Populate the text with whatever they typed in
                    text.setText('ACCEPTED');
                    //this.scene.stop();
                    switchScene = true;
                    console.log("switch: " + switchScene);
                }
                else
                {
                    //  Flash the prompt
                    this.tweens.add({
                        targets: text,
                        alpha: 0.2,
                        duration: 250,
                        ease: 'Power3',
                        yoyo: true
                    });
                }
            }
        });

        this.tweens.add({
            targets: element,
            y: 300,
            duration: 2000,
            ease: 'Power3'
        });

    }

    update(){
        if (switchScene)
            this.scene.start('IMintroScene');
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

    changeScenes(sceneName)
    {
      this.scene.start(sceneName);
    }

}

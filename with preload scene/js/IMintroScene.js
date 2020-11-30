class IMintroScene extends Phaser.Scene{
    constructor(){
      super("IMintroScene");
    }
    create(){
        this.counter = 0;
        this.introPartOneText();
        this.introPartTwoText();
        this.introVisible(true);
        this.continueText = this.add.text(400, 400, "Click anywhere to continue",{ fontFamily: 'Bitwise', fontSize: 30, fill: '#ffffff', align: "center" });

        this.input.on('pointerup', function (event) {
          this.introVisible(false);
          this.counter+=1;
          if(this.counter >= 2)
            this.scene.start('infiniteScene');
        }, this);

    }


    introPartOneText()
    {
      this.text1a = this.add.text(350, 70, "In Infinite Mode you will face endless waves and bosses - ", {fontFamily: 'Bitwise', fontSize: 30, fill: '#ffffff', align: "center" });
      this.text1b = this.add.text(350, 100, "and get some new drip too ", { fontFamily: 'Bitwise', fontSize: 30, fill: '#ffffff', align: "center" });
      this.image1a = this.add.image(400, 250, "trapGold");
      this.image1b = this.add.image(500, 250, "smallGold");
      this.image1c = this.add.image(600, 250, "autoCyan");
      this.image1d = this.add.image(700, 250, "ninjaIM");
    }

    introPartTwoText()
    {
      this.text2a = this.add.text(350, 70, "Of course we had to make some changes!", { fontFamily: 'Bitwise', fontSize: 30, fill: '#ffffff', align: "center" });
      this.text2b = this.add.text(350, 100, "You can no longer stack Haste, but instead it - ", { fontFamily: 'Bitwise', fontSize: 30, fill: '#ffffff', align: "center" });
      this.text2c = this.add.text(350, 128, "gives unlimited powerup use for a short time.", { fontFamily: 'Bitwise', fontSize: 30, fill: '#ffffff', align: "center" });
      this.text2d = this.add.text(350, 162, "Also, you can now only hold ONE powerup ability at a time!", { fontFamily: 'Bitwise', fontSize: 30, fill: '#ffffff', align: "center" });
      this.image2a = this.add.image(400, 270, "hastePU").setScale(1.5);
    }

    introVisible(firstPart)
    {
      this.text1a.setVisible(firstPart);
      this.text1b.setVisible(firstPart);
      this.image1a.setVisible(firstPart);
      this.image1b.setVisible(firstPart);
      this.image1c.setVisible(firstPart);
      this.image1d.setVisible(firstPart);

      this.text2a.setVisible(!firstPart);
      this.text2b.setVisible(!firstPart);
      this.text2c.setVisible(!firstPart);
      this.text2d.setVisible(!firstPart);
      this.image2a.setVisible(!firstPart);

    }

}

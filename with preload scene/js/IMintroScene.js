class IMintroScene extends Phaser.Scene{
    constructor(){
      super("IMintroScene");
    }
    create(){
        
        this.Text2 = this.add.text(400, 50, "In Infinite Mode you will face endless waves and bosses - ", { fontSize: '20px', fill: '#00FF00', align: "center" });
        this.Text2 = this.add.text(400, 70, " and get some new drip too ", { fontSize: '20px', fill: '#00FF00', align: "center" });
        this.image1 = this.add.image(400, 200, "trapGold")
        this.image2 = this.add.image(500, 200, "smallGold")
        this.image3 = this.add.image(600, 200, "autoCyan")
        this.image4 = this.add.image(700, 200, "ninjaIM")
        this.Text4 = this.add.text(400, 400, "Press 'Spacebar' to continue",{ fontSize: '20px', fill: '#00FF00', align: "center" });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update(){
        if (this.spacebar.isDown){
            this.scene.start('IMintro2Scene');
        }
  }
}

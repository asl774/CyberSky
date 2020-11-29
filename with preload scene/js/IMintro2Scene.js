class IMintro2Scene extends Phaser.Scene{
    constructor(){
      super("IMintro2Scene");
    }
    create(){
        this.Text1 = this.add.text(400, 50, "Of course we had to make some changes!", { fontSize: '20px', fill: '#00FF00', align: "center" });
        this.Text2 = this.add.text(400, 70, "You can no longer stack Haste, but instead it - ", { fontSize: '20px', fill: '#00FF00', align: "center" });
        this.Text3 = this.add.text(400, 90, "gives unlimited powerup use for a short time.", { fontSize: '20px', fill: '#00FF00', align: "center" });
        this.Text3 = this.add.text(400, 110, "Also, you can now only hold ONE powerup ability at a time!", { fontSize: '20px', fill: '#00FF00', align: "center" });
        this.image1 = this.add.image(410, 250, "hastePU")
        this.Text4 = this.add.text(400, 400, "Press 'Spacebar' to continue",{ fontSize: '20px', fill: '#00FF00', align: "center" });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update(){
        if (this.spacebar.isDown){
            this.scene.start('infiniteScene');
        }
    }
}
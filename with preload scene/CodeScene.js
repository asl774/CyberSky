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
    
    var text = this.add.text(300, 10, 'Enter Code', { color: 'white', fontSize: '20px '});
    var element = this.add.dom(400, 0).createFromCache('nameform');
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
        duration: 3000,
        ease: 'Power3'
    });

}
update(){
    if (switchScene)
        this.scene.start('IMintroScene');
}
}
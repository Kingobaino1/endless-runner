import 'phaser';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  };
  preloader(){

  };

  create()
  {
    const play = this.add.text(400, 300, 'Start Game').setInteractive();
    play.on('pointerdown', function() {
      console.log('hello')
      // this.scene.start('Game');
    })
  }
}

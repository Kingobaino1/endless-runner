import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  };

  preload()
  {
    this.load.image('background', 'back.jpg');
    this.load.image('sky', 'sky.png');
    this.load.image('backdrop', 'backdrop.png');
  }

  create()
  {
    let background = this.add.image(0, 0, 'background');
    background.displayHeight = this.sys.game.config.height;
    background.scaleX = background.scaleY;
    background.y = this.sys.game.config.height/2;
    background.x = this.sys.game.config.width/2;
  }
}

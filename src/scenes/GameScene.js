import 'phaser';
// import image from '../assets/logo.png';
export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  };

  preload()
  {
    this.load.image('logo', 'success.jpg');
  }

  create()
  {
    this.add.text(400, 320, 'Game');
    this.add.image(400, 300, 'logo');
  }
}

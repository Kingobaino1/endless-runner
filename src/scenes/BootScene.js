import Phaser from 'phaser';

class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('star', 'star.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}

export default BootScene;

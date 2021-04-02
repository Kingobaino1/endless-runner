import 'phaser';

class BootScene extends Phaser.Scene {
  constructor(){
    super('Boot')
  };
  preload(){
    // this.load.image('logo', 'normal_walk.png');
  }
  create(){
    this.scene.start('Preloader');

  }
}

export default BootScene

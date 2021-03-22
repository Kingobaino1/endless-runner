export default class PreloaderScene extends Phaser.Scene {
  constructor(){
    super('Preloader')
  };

  preloader(){
    this.load.image('logo', '../assets/logo.png');
  };
  create(){
    // this.add.circle(400, 300, 10, 0xffffff, 1);
    this.add.image(400, 300, 'logo')
  }
}
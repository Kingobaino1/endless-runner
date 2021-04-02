import phaser from 'phaser';

class CreaditScene extends Phaser.Scene {
  constructor(){
    super('Credits');
  };

  create() {
    this.bgMusic = this.sound.add('bgMusic', { loop: true });
    this.bgMusic.play();
    this.backButton = this.add.image(390, 440, 'back').setScale(0.8);
    this.add.text(100, 240, 'Game Created by: Ibeh, Kingsley', { fontSize: '32px', fill: 'white' });
    this.backButton.setInteractive({ useHandCursor: true });

    this.backButton.on('pointerup', () => {
      this.bgMusic.stop();
      this.scene.stop();
      this.scene.start('Title');
    });
  };
}

export default CreaditScene;

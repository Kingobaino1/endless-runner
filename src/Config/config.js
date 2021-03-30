import 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'endless-runner',
  width: 800,
  height: 480,
  physics: {
    default: 'arcade',
    debug: true,
  }
};

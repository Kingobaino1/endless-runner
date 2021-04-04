import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'endless-runner',
  autoCenter: true,
  width: 800,
  height: 480,
  physics: {
    default: 'arcade',
    gravity: { y: 800 },
    debug: false,
  },
};

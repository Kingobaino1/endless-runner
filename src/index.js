import Phaser from 'phaser';
import config from './Config/config';
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';
import PreloaderScene from './scenes/PreloaderScene';
import TitleScene from './scenes/TitleScene';
import LeaderBoardScene from './scenes/LeaderBoardScene';
import CreditScene from './scenes/CreditScene';


class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Score', LeaderBoardScene);
    this.scene.add('Credits', CreditScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();

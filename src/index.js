import Phaser from 'phaser';
import config from './Config/config';
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';
import PreloaderScene from './scenes/PreloaderScene';
import TitleScene from './scenes/TitleScene';
import LeaderBoardScene from './scenes/LeaderBoardScene';

class Game extends Phaser.Game {
  constructor(){
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Score', LeaderBoardScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
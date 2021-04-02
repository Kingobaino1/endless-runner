import 'phaser';
import { fetchScores } from '../Config/leaderboardApi';


class LeaderBoardScene extends Phaser.Scene {
  constructor(){
    super('Score');
  }

  create() {
    this.backButton = this.add.image(390, 440, 'back').setScale(0.8);

    this.add.text(190, 50, '10 BEST SCORES', { fontSize: '48px', fill: 'white' });
    const print = this.add.text(250, 100, '', { fontSize: '25px', fill: 'white' });
    console.log(fetchScores(print));

    this.backButton.setInteractive({ useHandCursor: true });

    this.backButton.on('pointerup', () => {
      this.scene.stop();
      this.scene.start('Title');
    });
  }
}

export default LeaderBoardScene;

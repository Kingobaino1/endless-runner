import 'phaser';

class LeaderBoardScene extends Phaser.Scene {
  constructor(){
    super('Score');
  }

  preload()
  {
    
  }

  create()
  {
    this.add.text(400, 300, 'Scores: 30', '0xffffff')
  }
}

export default LeaderBoardScene;

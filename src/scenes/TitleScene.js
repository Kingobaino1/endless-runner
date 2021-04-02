import Phaser from 'phaser';

class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.bgMusic = this.sound.add('bgMusic', { loop: false });
    this.bgMusic.play();
    this.gameButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.centerButton(this.gameButton, 1);

    this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', ((_pointer) => {
      this.bgMusic.stop();
      this.scene.start('Game');
    }));

    this.input.on('pointerover', ((_event, gameObjects) => {
      gameObjects[0].setTexture('blueButton2');
    }));

    this.input.on('pointerout', ((_event, gameObjects) => {
      gameObjects[0].setTexture('blueButton1');
    }));

    this.optionsButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
    this.centerButton(this.optionsButton);

    this.optionsText = this.add.text(0, 0, 'Scores', { fontSize: '30px', fill: '#fff' });
    this.centerButtonText(this.optionsText, this.optionsButton);

    this.optionsButton.on('pointerdown', ((_pointer) => {
      this.bgMusic.stop();
      this.scene.start('Score');
    }));

    // Credits
    this.creditsButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
    this.centerButton(this.creditsButton, -1);

    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.creditsText, this.creditsButton);

    this.creditsButton.on('pointerdown', ((_pointer) => {
      this.bgMusic.stop();
      this.scene.start('Credits');
    }));

    this.input.on('pointerover', ((_event, gameObjects) => {
      gameObjects[0].setTexture('blueButton2');
    }));

    this.input.on('pointerout', ((_event, gameObjects) => {
      gameObjects[0].setTexture('blueButton1');
    }));
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(this.sys.game.config.width / 2,
        this.sys.game.config.height / 2 - offset * 100,
        this.sys.game.config.width,
        this.sys.game.config.height),
    );
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton,
    );
  }
}

export default TitleScene;

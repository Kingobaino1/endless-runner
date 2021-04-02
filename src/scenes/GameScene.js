import Phaser from 'phaser';
import { populateScore } from '../Config/leaderboardApi';


const gameOptions = {
  platformStartSpeed: 350,
  spawnRange: [100, 350],
  platformSizeRange: [50, 250],
  playerGravity: 900,
  jumpForce: 400,
  playerStartPosition: 200,
  jumps: 2,
  score: 0,
};

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.player = this.load.spritesheet('player',
      'normal_walk.png',
      { frameWidth: 60, frameHeight: 95 });
  }

  create() {
    this.playerMove = this.sound.add('playerMusic', { loop: false });
    this.playerMove.play();
    this.tileSprite = this.add.tileSprite(400, 240, 800, 480, 'background');
    this.sky = this.add.tileSprite(400, 240, 800, 480, 'sky');
    this.backdrop = this.add.tileSprite(400, 240, 800, 480, 'backdrop');
    this.water = this.add.tileSprite(400, 465, 800, 32, 'water').setScale(1);

    this.player = this.physics.add.sprite(gameOptions.playerStartPosition, this.sys.game.config.height / 2, 'player');
    this.player.setGravityY(gameOptions.playerGravity);
    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    // group with all active platforms.

    this.platformGroup = this.add.group({

      // once a platform is removed, it's added to the pool
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    // pool
    this.platformPool = this.add.group({

      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    // number of consecutive jumps made by the player
    this.playerJumps = 0;

    // adding a platform to the game, the arguments are platform width and x position
    this.addPlatform(this.sys.game.config.width, this.sys.game.config.width / 2);

    // adding the player;


    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player'),
      frameRate: 16,
    });

    // setting collisions between the player and the platform group
    this.physics.add.collider(this.player, this.platformGroup);


    // checking for input

    this.input.keyboard.on('keydown-UP', this.jump, this);

    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 5,
      setXY: {
        x: 420, y: 0, stepX: 100, stepY: 10,
      },
    });


    this.stars.children.iterate((child) => {
      child.setBounceY(0);
      child.setGravityY(100);
    });
    this.physics.add.collider(this.stars, this.platformGroup);
  


    function collectStar(_player, star) {
      star.destroy();
      gameOptions.score += 100;
      this.scoreText.setText(`Score: ${gameOptions.score}`);
    }

    this.physics.add.overlap(this.player, this.stars, collectStar, null, this);
  }


  // the core of the script: platform are added from the pool or created on the fly
  addPlatform(platformWidth, posX) {
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
    } else {
      platform = this.physics.add.sprite(posX, this.sys.game.config.height * 0.8, 'platform');
      platform.setImmovable(true);
      platform.setVelocityX(gameOptions.platformStartSpeed * -1);
      this.platformGroup.add(platform);
    }
    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0],
      gameOptions.spawnRange[1]);
  }

  // the player jumps when on the ground,
  // or once in the air as long as there are jumps left and
  // the first jump was on the ground
  jump() {
    if (this.player.body.touching.down
        || (this.playerJumps > 0
        && this.playerJumps < gameOptions.jumps)) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps += 1;
    }
  }

  update() {
    if (this.player.body.touching.down) {
      this.player.anims.play('run', true);
    }
    this.tileSprite.tilePositionX += 1;
    this.sky.tilePositionX += 0.25;
    this.water.tilePositionX += 0.5;
    this.backdrop.tilePositionX += 1;

    if (this.player.y > this.sys.game.config.height) {
      const name = prompt('Please enter your name', 'Ikechukwu');
      if (name === null) {
        gameOptions.score = 0;
        this.scene.stop();
        this.playerMove.stop();
        this.scene.start('Title');
      } else if (name !== '') {
        populateScore(name, gameOptions.score);
        gameOptions.score = 0;
        this.playerMove.stop();
        this.scene.start('Score');
      } else {
        alert('Please input a valid character');
      }
    }
    this.player.x = gameOptions.playerStartPosition;
    let minDistance = this.sys.game.config.width;
    this.platformGroup.getChildren().forEach(function (platform) {
      const platformDistance = this.sys.game.config.width - platform.x - platform.displayWidth / 2;
      minDistance = Math.min(minDistance, platformDistance);
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);
    if (minDistance > this.nextPlatformDistance) {
      const nextPlatformWidth = Phaser.Math.Between(
        gameOptions.platformSizeRange[0],
        gameOptions.platformSizeRange[1],
      );
      this.addPlatform(nextPlatformWidth, this.sys.game.config.width + nextPlatformWidth / 2);
    }
  }

  resize() {
    const canvas = document.querySelector('canvas');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowRatio = windowWidth / windowHeight;
    const gameRatio = this.sys.game.config.width / this.sys.game.config.height;
    if (windowRatio < gameRatio) {
      canvas.style.width = `${windowWidth}px`;
      canvas.style.height = `${windowWidth / gameRatio}px`;
    } else {
      canvas.style.width = `${windowHeight * gameRatio}px`;
      canvas.style.height = `${windowHeight}px`;
    }
  }
}

import 'phaser';

let gameOptions = {
    platformStartSpeed: 350,
    spawnRange: [100, 350],
    platformSizeRange: [50, 250],
    playerGravity: 900,
    jumpForce: 400,
    playerStartPosition: 200,
    jumps: 2
}

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  };

  preload()
  {
    this.load.image('background', 'bg.png');
    this.load.image('sky', 'sky.png');
    this.load.image('backdrop', 'backdrop.png');
    this.load.image("platform", "grass.png");
    this.load.image('water', 'water.png');
    this.player = this.load.spritesheet('player', 
        'normal_walk.png',
        { frameWidth: 60, frameHeight: 95 }
    );
  }

  create()
  {
    
    this.tileSprite = this.add.tileSprite(400, 240, 800, 480, 'background');
    this.sky = this.add.tileSprite(400, 240, 800, 480, 'sky');
    this.backdrop = this.add.tileSprite(400, 240, 800, 480, 'backdrop');
    this.water = this.add.tileSprite(400, 465, 800, 32, 'water').setScale(1);

    this.player = this.physics.add.sprite(gameOptions.playerStartPosition, this.sys.game.config.height / 2, "player");
    this.player.setGravityY(gameOptions.playerGravity);
    
      // group with all active platforms.


        
        this.platformGroup = this.add.group({
             
            // once a platform is removed, it's added to the pool
            removeCallback: function(platform){
                platform.scene.platformPool.add(platform)
            }
        });
 
        // pool
        this.platformPool = this.add.group({
 
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.platformGroup.add(platform);
            }
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
        // repeat: -1
    });
 
        // setting collisions between the player and the platform group
        this.physics.add.collider(this.player, this.platformGroup);

 
        // checking for input
       
        this.input.keyboard.on("keydown-UP", this.jump, this);
    }
 
    // the core of the script: platform are added from the pool or created on the fly
    addPlatform(platformWidth, posX){
        let platform;
        if(this.platformPool.getLength()){
            platform = this.platformPool.getFirst();
            platform.x = posX;
            platform.active = true;
            platform.visible = true;
            this.platformPool.remove(platform);
        }
        else{
            platform = this.physics.add.sprite(posX, this.sys.game.config.height * 0.8, "platform");
            platform.setImmovable(true);
            platform.setVelocityX(gameOptions.platformStartSpeed * -1);
            this.platformGroup.add(platform);
        }
        platform.displayWidth = platformWidth;
        this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
    }
 
    // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
    jump(){
        if(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)){
            if(this.player.body.touching.down){
                this.playerJumps = 0;
            }
            this.player.setVelocityY(gameOptions.jumpForce * -1);
            this.playerJumps ++;
        }
  }

  update()
  {
      
    if (this.player.body.touching.down) {
      this.player.anims.play('run', true);
    }


    this.tileSprite.tilePositionX += 1;
    this.sky.tilePositionX += 1;
    this.water.tilePositionX += 1;
    this.backdrop.tilePositionX += .25;

    if(this.player.y > this.sys.game.config.height){
        // this.scene.start('Game');
        this.add.text(400, 300, 'Game Over')
        // this.scene.start('Title')
        
    }
    this.player.x = gameOptions.playerStartPosition;

    // recycling platforms
    let minDistance = this.sys.game.config.width;
    this.platformGroup.getChildren().forEach(function(platform){
        let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
        minDistance = Math.min(minDistance, platformDistance);
        if(platform.x < - platform.displayWidth / 2){
            this.platformGroup.killAndHide(platform);
            this.platformGroup.remove(platform);
        }
    }, this);

    // adding new platforms
    if(minDistance > this.nextPlatformDistance){
        var nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
        this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2);
    }
    }

    resize(){
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
  }
}
